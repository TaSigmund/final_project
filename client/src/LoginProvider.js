//dependencies
import React, {useState, createContext} from 'react';
import {useHistory} from "react-router-dom"
import Data from './Data';
import Cookies from 'js-cookie';

export const LoginContext = createContext();

/***
 * PROVIDER FOR USER AUTHENTICATION / CONTEXT API
 * based on an adapted code example from the book: Nils Hartmann and Oliver Zeigermann, React, dpunkt.verlag 2020,  page 205.
 * The example can also be found here: https://github.com/reactbuch/vote-example-v2/blob/master/schritte/09d_react_context/src/components/LoginProvider.js
 ***/
export function LoginProvider({children}){
    //creates an instance of data
    const data = new Data(); 

    //authentication data
    const [authenticatedUser, setAuthenticatedUser] = useState(Cookies.getJSON('authenticatedUser') || null); //check for cookie as possible default value
    const [authenticatedPassword, setAuthenticatedPassword] = useState(null);

    //history
    const history = useHistory();

    //signup
    async function signUp(user){
        return await data.createUser(user)
        .catch(error => { //deals with server errors
          console.error(error);
          history.push("/error")
        });
      }
    
    //signin
    async function signIn(username, password){
      const user = await data.getUser(username, password)
      .then(user => {
        if(user !== null){
          setAuthenticatedUser(user);
          setAuthenticatedPassword(password);
          Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 }); //cookie name, stored user data, let expire after one day
        }
        return user} 
      )
      .catch(error => { //deals with server errors
        console.error(error);
        history.push("/error")
      })
    }
    
    //signout
    async function signOut(){
      setAuthenticatedUser(null);
      setAuthenticatedPassword(null);
      Cookies.remove('authenticatedUser');
      return null
    }

    return(
        <LoginContext.Provider
            value={{
                signUp,
                signIn,
                signOut,
                data,
                authenticatedUser,
                authenticatedPassword
            }}
        >
            {children}
        </LoginContext.Provider>
    );
}

