import React, {useContext} from 'react';
import {LoginContext} from './LoginProvider';
import {Redirect, Route} from 'react-router-dom';

/***
 * CONFIGURATION FOR PROTECTED ROUTES
 * based on an adapted code example from https://reactrouter.com/web/example/auth-workflow
 ***/
function PrivateRoute({ children}) {
    let value = useContext(LoginContext)
    return (
      <Route
        render={() =>
          value.authenticatedUser ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/signin"
              }}
            />
          )
        }
      />
    );
  }

  export default PrivateRoute
