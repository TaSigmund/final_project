import React, {useState, createContext} from 'react';
import Data from './Data';
import Cookies from 'js-cookie';

export const LoginContext = createContext();

/***
 * PROVIDER FOR USER AUTHENTICATION / CONTEXT API
 * based on an adapted code example from the book: Nils Hartmann and Oliver Zeigermann, React, dpunkt.verlag 2020,  page 205.
 ***/
export function LoginProvider({children}){
    const data = new Data(); //creates an instance of data
    const [authenticatedUser, setAuthenticatedUser] = useState(Cookies.getJSON('authenticatedUser') || null); //check for cookie as possible default value
    const [authenticatedPassword, setAuthenticatedPassword] = useState(null);

    async function signUp(user){
        await data.createUser(user);
        return null;
      }
    
    async function signIn(username, password){
      const user = await data.getUser(username, password);
          if(user !== null){
            setAuthenticatedUser(user);
            setAuthenticatedPassword(password);
            Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 }); //cookie name, stored user data, let expire after one day
        }
      return user 
    }
    
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

