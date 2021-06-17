//dependencies
import {useContext, useEffect} from 'react';
import {Redirect, useHistory} from 'react-router-dom'
import {LoginContext} from '../LoginProvider';

/****
 * SIGNS THE USER OUT
 ***/

function UserSignOut(){

    //context and history
    const value = useContext(LoginContext);
    const history = useHistory();
    
    //signs the user out
    useEffect(()=> {
        value.signOut()
        .catch(error => { //deals with server errors
            console.error(error);
            history.push("/error")
        })
    });
    return <Redirect to="/" />
}

export default UserSignOut