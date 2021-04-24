//dependencies
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

//styles
import './reset.css';
import './global.css';

//components
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';

/****
 * HANDLES THE APP'S ROUTING
 ***/
function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Courses}/>
        <Route exact path="/courses/create" component={CreateCourse}/>
        <Route exact path="/courses/:id/update" component={UpdateCourse}/>
        <Route exact path="/courses/:id" component={CourseDetail}/>
        <Route exact path="/signin" component={UserSignIn}/>
        <Route exact path="/signup" component={UserSignUp}/>
        <Route exact path="/signout" component={UserSignOut}/>
      </Switch>
    </Router>
  );
}

export default App;
