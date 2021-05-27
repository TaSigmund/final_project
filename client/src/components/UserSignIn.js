import React, {useState, useContext} from 'react';
import {Link, useHistory} from 'react-router-dom';
import Header from './Header';
import {LoginContext} from '../LoginProvider';

/****
 * DISPLAYS A SIGN IN FORM
 ***/
function UserSignIn(){

    const value = useContext(LoginContext);
    let history = useHistory();

    const [emailField, setEmailField] = useState("");
    const [passwordField, setPasswordField] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        value.signIn(emailField, passwordField);
        history.push("/");
    }

    return(
        <React.Fragment>
            <Header></Header>
            <main>
                <div className="form--centered">
                <h2>Sign In</h2>
                <form onSubmit={handleSubmit}>
                <label htmlFor="emailAddress">Email Address</label>
                <input 
                    id="emailAddress" 
                    name="emailAddress" 
                    type="email" 
                    value={emailField}
                    placeholder="Please provide an e-mail address."
                    onChange={e => setEmailField(e.target.value)}
                    ></input>
                <label htmlFor="password">Password</label>
                <input id="password"
                    name="password"
                    type="password"
                    value={passwordField}
                    placeholder="Please provide a password."
                    onChange={e => setPasswordField(e.target.value)}
                    ></input>
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