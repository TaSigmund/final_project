import React, {useState, createContext} from 'react';
import Data from './Data';
export const LoginContext = createContext();

export function LoginProvider({children}){
    const data = new Data();
    const [authenticatedUser, setAuthenticatedUser] = useState(null);

    async function signIn(username, password){
        const user = await data.getUser(username, password);
        setAuthenticatedUser(user);
        return user;
      }

    return(
        <LoginContext.Provider
            value={{
                signIn,
                data,
                authenticatedUser
            }}
        >
            {children}
        </LoginContext.Provider>
    );
}

