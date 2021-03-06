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
      if (response.status === 500) { // server error
        throw new Error()
      } 
      else if (response.status === 200) {  //authenticated user
        return response.json().then(res => res);
    }
      else if (response.status === 401) { //no authentication
        return null;
    }
  }

  async createUser(user) {
    const response = await this.api('/users', 'POST', user)
    if (response.status === 400) {
      return response.json().then(res => res) // bad request
    }
    else if (response.status === 201){
      return null // user profile was created
    }
  }

  //lets an authenticated user create a course
  async createCourse(course, username, password) {
    const response = await this.api('/courses', 'POST', course, true, {username, password});
    if (response.status === 400 || response.status === 401) {
      return response.json().then(res => res) // bad request
    }
    else if (response.status === 201) {
      return null; //course created
    }
  }

  async updateCourse(path, course, username, password) {
    const response = await this.api(path, 'PUT', course, true, {username, password});
    if (response.status === 400) {
      return response.json().then(res => res) // bad request
    }
    else if (response.status === 204) {
      return null;
    }
  }
  async deleteCourse(path, username, password) {
    const response = await this.api(path, 'DELETE', null, true, {username, password});
    if (response.status === 500) {// server error
      return response.json().then(res => res) 
    }
    else if (response.status === 204) {
      return null;
    }
  }
}
