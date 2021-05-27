import React from 'react';
import Header from './Header';
import {Link} from "react-router-dom";

function NotFound(){
    return(
        <React.Fragment>
            <Header></Header>
            <main>
                <div className="wrap">
                    <h2>Sorry, we couldn't find the page you are looking for.</h2>
                    <Link to="/">back to the main page </Link>
                </div>
            </main>
        </React.Fragment>

    )
}

export default NotFound