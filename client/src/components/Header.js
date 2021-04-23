import React from 'react';

/****
 * DISPLAYS A NAV BAR AT THE TOP OF THE PAGE
 ***/
function Header(){
    return(
    <header>
        <div className="wrap header--flex">
            <h1 className="header--logo">
            <a href="index.html">Courses</a>
            </h1>
            <nav>
                <ul className="header--signedout">
                    <li><a href="sign-up.html">Sign Up</a></li>
                    <li><a href="sign-in.html">Sign In</a></li>
                </ul>
            </nav>
        </div>
    </header>
    )
}

export default Header