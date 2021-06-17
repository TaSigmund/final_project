//dependencies
import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {LoginContext} from '../LoginProvider';

/****
 * DISPLAYS A NAV BAR AT THE TOP OF THE PAGE
 ***/
function Header(){

    const value = useContext(LoginContext);
    const authUser = value.authenticatedUser;

    return(
    <header>
        <div className="wrap header--flex">
            <h1 className="header--logo">
            <Link to="/">Courses</Link>
            </h1>
            <nav>
                <ul className="header--signedout">
                    {
                    authUser ?
                    <React.Fragment>
                    <li>{authUser.firstName} {authUser.lastName}</li>
                    <li><Link to="/signout">Sign Out</Link></li> 
                    </React.Fragment> :
                    <React.Fragment>
                    <li><Link to="/signup">Sign Up</Link></li> 
                    <li><Link to="/signin">Sign In</Link></li>
                    </React.Fragment>
                    }
                </ul>
            </nav>
        </div>
    </header>
    )
}

export default Header