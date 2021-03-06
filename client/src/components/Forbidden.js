//dependencies
import React from 'react';
import Header from './Header';
import {Link} from "react-router-dom";

/****
 * DISPLAYS A PAGE THAT INFORMS THE USER THAT HE/SHE LACKS AUTHORIZATION
 ***/
function Forbidden(){
    return(
        <React.Fragment>
            <Header></Header>
            <main>
                <div className="wrap">
                    <h2>Sorry, you do no not have permission to access this content.</h2>
                    <Link to="/">back to the main page </Link>
                </div>
            </main>
        </React.Fragment>
    )
}

export default Forbidden