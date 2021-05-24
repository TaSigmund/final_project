import React, {useContext} from 'react';
import {LoginContext} from './LoginProvider';
import {Redirect, Route} from 'react-router-dom';

function PrivateRoute({ children, ...rest }) {
    let value = useContext(LoginContext)
    return (
      <Route
        {...rest}
        render={({ location }) =>
          value.authenticatedUser ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

  export default PrivateRoute
