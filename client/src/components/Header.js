import React from 'react';
import {Link} from "react-router-dom";

/****
 * DISPLAYS A NAV BAR AT THE TOP OF THE PAGE
 ***/
function Header(){
    return(
    <header>
        <div className="wrap header--flex">
            <h1 className="header--logo">
            <Link to="/">Courses</Link>
            </h1>
            <nav>
                <ul className="header--signedout">
                    <li><Link to="/signup">Sign Up</Link></li>
                    <li><Link to="/signin">Sign In</Link></li>
                </ul>
            </nav>
        </div>
    </header>
    )
}

export default Header