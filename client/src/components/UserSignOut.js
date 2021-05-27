import {useContext, useEffect} from 'react';
import {Redirect} from 'react-router-dom'
import {LoginContext} from '../LoginProvider';

/****
 * SIGNS THE USER OUT
 ***/

function UserSignOut(){
    const value = useContext(LoginContext);
    useEffect(()=> {value.signOut()});
    return <Redirect to="/" />
}

export default UserSignOut