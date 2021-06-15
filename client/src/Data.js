import config from './config';
export default class Data {
  
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path;
  
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {    
      const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);
  }
  async getUser(username, password){
      const response = await this.api(`/users`, 'GET', null, true, { username, password })
      if (response.status === 200) {
        return response.json().then(data => data);
    }
       else if (response.status === 401) { 
        return null;
    }
        else {
        throw new Error();
    }
  }

  async createUser(user) {
    const response = await this.api('/users', 'POST', user)
    if (response.status === 400) {
      response.json().then(res => res.message) // bad request
    }
    else if (response.status === 201){
      return null // user profile was created
    }
    else {
      throw new Error();
    }
  }

  //lets an authenticated user create a course
  async createCourse(course, username, password) {
    const response = await this.api('/courses', 'POST', course, true, {username, password});
    if (response.status === 201) {
      return null;
    }
  }

  async updateCourse(path, course, username, password) {
    const response = await this.api(path, 'PUT', course, true, {username, password});
    if (response.status === 204) {
      return null;
    }
    else {
      return response.json().then(data => {
        return data.errors;
      });
    }
  }
  async deleteCourse(path, username, password) {
    const response = await this.api(path, 'DELETE', null, true, {username, password});
    if (response.status === 204) {
      return null;
    }
    else {
      return response.json().then(data => {
        return data.errors;
      });
    }
  }
}
