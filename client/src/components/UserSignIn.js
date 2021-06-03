import React, {useState, useContext, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import Header from './Header';
import {LoginContext} from '../LoginProvider';

/****
 * DISPLAYS A SIGN IN FORM
 ***/
function UserSignIn(){

    //access hook functionality
    const value = useContext(LoginContext);
    const history = useHistory();

    //store field data
    const [emailField, setEmailField] = useState("");
    const [passwordField, setPasswordField] = useState("");
    const [errors, setErrors] = useState(null);

    //submit form
    const handleSubmit = async(e) => {
        e.preventDefault();
        const user = await value.signIn(emailField, passwordField)
        .then(user => {
            if (user !== null){ //login successful
            history.push("/")
        }
            else{   //login not successful
            setErrors("Access denied")
            }
    })
        .catch(err => {
            console.log(err);
            history.push("/error")
        })
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