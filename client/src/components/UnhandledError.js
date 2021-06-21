//dependencies
import React from 'react';
import Header from './Header';
import {Link} from "react-router-dom";

/****
 * DISPLAYS AN ERROR IF THERE IS A PROBLEM WITH THE SERVER
 ***/

function UnhandledError(){
    return(
        <React.Fragment>
            <Header></Header>
            <main>
                <div className="wrap">
                    <h2>We are sorry. An error has occurred</h2>
                    <Link to="/">back to the main page </Link>
                </div>
            </main>
        </React.Fragment>
    )
}

export default UnhandledError