//dependencies
import React, {useContext} from 'react';
import {LoginContext} from './LoginProvider';
import {Redirect, Route} from 'react-router-dom';

/***
 * CONFIGURATION FOR PROTECTED ROUTES
 * based on an adapted code example from https://reactrouter.com/web/example/auth-workflow
 ***/
function PrivateRoute({children, ...rest }) {//children = protected component, rest gives us access to location
    let value = useContext(LoginContext)
    return (
      <Route
        {...rest}
        render={({location}) =>
          value.authenticatedUser ? (
            children 
          ) : (
            <Redirect
              to={{
                pathname: "/signin",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

  export default PrivateRoute
