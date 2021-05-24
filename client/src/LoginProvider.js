import React, {useState, createContext} from 'react';
import Data from './Data';
export const LoginContext = createContext();

export function LoginProvider({children}){
    const data = new Data();
    const [authenticatedUser, setAuthenticatedUser] = useState(null);
    const [authenticatedPassword, setAuthenticatedPassword] = useState(null);

    async function signIn(username, password){
        const user = await data.getUser(username, password);
        setAuthenticatedUser(user);
        setAuthenticatedPassword(password);
        return user;
      }
    
      async function signOut(){
        setAuthenticatedUser(null);
        setAuthenticatedPassword(null)
        return null
      }

    return(
        <LoginContext.Provider
            value={{
                signIn,
                signOut,
                data,
                authenticatedUser
            }}
        >
            {children}
        </LoginContext.Provider>
    );
}

