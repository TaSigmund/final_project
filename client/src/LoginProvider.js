import React, {useState, createContext} from 'react';
export const LoginContext = createContext();

export function LoginProvider({children}){
    const [loggedIn, setLoggedIn] = useState(false);

    function login(){
        setLoggedIn(true)
    }

    return(
        <LoginContext.Provider
            value={{
                loggedIn,
                login
            }}
        >
            {children}
        </LoginContext.Provider>
    );
}

