import React, {useState, useContext} from 'react';
import Header from './Header';
import {useHistory} from 'react-router-dom';
import {LoginContext} from '../LoginProvider';

/****
 * DISPLAYS A SIGN UP FORM
 ***/
function UserSignUp(){

    const value = useContext(LoginContext);
    let history = useHistory();
    
    const [firstNameField, setFirstNameField] = useState("");
    const [lastNameField, setLastNameField] = useState("");
    const [emailField, setEmailField] = useState("");
    const [passwordField, setPasswordField] = useState("");
    const [confirmPasswordField, setConfirmPasswordField] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if(passwordField===confirmPasswordField){ //checks for typos
        const user = {
            "firstName": firstNameField,
            "lastName": lastNameField,
            "emailAddress": emailField,
            "password": passwordField
        }
        value.signUp(user);
        history.push('/');
        }
        else{history.push('/signup');}
    }

    return(
        <React.Fragment>
            <Header></Header>
            <main>
                <div className="form--centered">
                    <h2>Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <label for="firstName">First Name</label>
                        <input 
                            id="firstName" 
                            name="firstName" 
                            type="text" 
                            value={firstNameField}
                            onChange={e => setFirstNameField(e.target.value)}
                        />
                        <label for="lastName">Last Name</label>
                        <input 
                            id="lastName" 
                            name="lastName" 
                            type="text" 
                            value={lastNameField}
                            onChange={e => setLastNameField(e.target.value)}
                        />
                        <label for="emailAddress">Email Address</label>
                        <input 
                            id="emailAddress" 
                            name="emailAddress" 
                            type="email" 
                            value={emailField}
                            onChange={e => setEmailField(e.target.value)}
                        />
                        <label for="password">Password</label>
                        <input 
                            id="password" 
                            name="password" 
                            type="password" 
                            value={passwordField}
                            onChange={e => setPasswordField(e.target.value)}
                        />
                        <label for="confirmPassword">Confirm Password</label>
                        <input 
                            id="confirmPassword" 
                            name="confirmPassword" 
                            type="password" 
                            value={confirmPasswordField}
                            onChange={e => setConfirmPasswordField(e.target.value)}
                            />
                        <button className="button" type="submit">Sign Up</button><button className="button button-secondary">Cancel</button>
                    </form>
                    <p>Already have a user account? Click here to <a href="sign-in.html">sign in</a>!</p>
                </div>
            </main>
        </React.Fragment>
    )
}

export default UserSignUp