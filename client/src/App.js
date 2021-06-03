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
import NotFound from './components/NotFound';
import Forbidden from './components/Forbidden';
import UnhandledError from './components/Error';
import PrivateRoute from './PrivateRoute';


/****
 * HANDLES THE APP'S ROUTING
 ***/
function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Courses}/>
        <PrivateRoute path="/courses/create">
          <Route component={CreateCourse}/>
        </PrivateRoute>
        <PrivateRoute path="/courses/:id/update">
          <Route  component={UpdateCourse}/>
        </PrivateRoute>
        <Route exact path="/courses/:id" component={CourseDetail}/>
        <Route exact path="/signin" component={UserSignIn}/>
        <Route exact path="/signup" component={UserSignUp}/>
        <Route exact path="/signout" component={UserSignOut}/>
        <Route exact path="/forbidden" component={Forbidden}/>
        <Route exact path="/error" component={UnhandledError}/>
        <Route component={NotFound}/>
      </Switch>
    </Router>
  );
}

export default App;
