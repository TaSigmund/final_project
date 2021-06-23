//dependencies
import React, {useState, useContext} from 'react';
import {Link, useHistory} from 'react-router-dom';
import Header from './Header';
import {LoginContext} from '../LoginProvider';

/****
 * DISPLAYS A SIGN IN FORM
 ***/
function UserSignIn(props){

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
        await value.signIn(emailField, passwordField)
        .then(
            response => {
             if (response === null){ //login unsuccessful
                setErrors("Please provide credentials.");
                history.push("/signin")
            }
            else { //login successful
                history.goBack();
            }
                
        })
        .catch(error => { //deals with server errors
            console.error(error);
            history.push("/error")
        })
    }

    return(
        <React.Fragment>
            <Header></Header>
            <main>
                <div className="form--centered">
                <h2>Sign In</h2>
                {
                    errors?
                    <div className="validation--errors">
                    <h3>Validation Errors</h3>

                        <p>{errors}</p>
                    </div>:
                    <React.Fragment></React.Fragment>
                }
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