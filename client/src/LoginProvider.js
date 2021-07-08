//dependencies
import React, {useState, createContext} from 'react';
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

    //authentication data & check for cookies as possible default values
    const [authenticatedUser, setAuthenticatedUser] = useState(Cookies.getJSON('authenticatedUser') || null); 
    const [authenticatedPassword, setAuthenticatedPassword] = useState(Cookies.getJSON('authenticatedPassword') ||null);

    //signup
    async function signUp(user){
      return await data.createUser(user)
    }
    
    //signin
    async function signIn(username, password){
      const user = await data.getUser(username, password)
      if(user){
        setAuthenticatedUser(user);
        setAuthenticatedPassword(password);
        Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 }); //cookie name, stored user data, let expire after one day
        Cookies.set('authenticatedPassword', password, { expires: 1 }); //cookie name, stored password, let expire after one day
      }
      return user
    }
    
    //signout
    async function signOut(){
      setAuthenticatedUser(null);
      setAuthenticatedPassword(null);
      Cookies.remove('authenticatedUser');
      Cookies.remove('authenticatedPassword');
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

