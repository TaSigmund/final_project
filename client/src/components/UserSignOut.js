import {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {LoginContext} from '../LoginProvider';

/****
 * SIGNS THE USER OUT
 ***/
function UserSignOut(){

    const value = useContext(LoginContext);
    let history = useHistory();
    value.signOut();
    history.push('/');
    return(null)
}

export default UserSignOut