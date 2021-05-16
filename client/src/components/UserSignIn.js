import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import Header from './Header';


/****
 * DISPLAYS A SIGN IN FORM
 ***/
function UserSignIn(){

    let history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push('/');
    }

    return(
        <React.Fragment>
            <Header></Header>
            <main>
                <div className="form--centered">
                <h2>Sign In</h2>
                <form onSubmit={handleSubmit}>
                <label for="emailAddress">Email Address</label>
                <input id="emailAddress" name="emailAddress" type="email" value=""></input>
                <label for="password">Password</label>
                <input id="password" name="password" type="password" value=""></input>
                <button className="button" type="submit">Sign In</button>
                <Link to="/"><button className="button button-secondary">Cancel</button></Link>
                </form>
                <p>Don't have a user account? Click here to <Link to="/signup"> sign up</Link>!</p>
                </div>
            </main>
        </React.Fragment>
    )
}

export default UserSignIn