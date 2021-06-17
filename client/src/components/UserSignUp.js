//dependencies
import React, {useState, useContext} from 'react';
import Header from './Header';
import {Link, useHistory} from 'react-router-dom';
import {LoginContext} from '../LoginProvider';

/****
 * DISPLAYS A SIGN UP FORM
 ***/
function UserSignUp(){

    //context and history
    const value = useContext(LoginContext);
    let history = useHistory();
    
    //field data
    const [firstNameField, setFirstNameField] = useState("");
    const [lastNameField, setLastNameField] = useState("");
    const [emailField, setEmailField] = useState("");
    const [passwordField, setPasswordField] = useState("");
    const [confirmPasswordField, setConfirmPasswordField] = useState("");
    const [errors, setErrors] = useState(null);

    //submit form
    const handleSubmit = async(e) => {
        e.preventDefault();
        if(passwordField===confirmPasswordField){ //checks for typos
        const user = {
            "firstName": firstNameField,
            "lastName": lastNameField,
            "emailAddress": emailField,
            "password": passwordField
        }
        await value.signUp(user)
        .then(
            async (response) => 
            {
            if (response === null){ // signup successful
                await value.signIn(emailField, passwordField); // signs the user in
                history.push("/"); // redirect
            }
            else { //signup fails
                setErrors(response.message)
                history.push("/signup")
            }
            }
        )
        .catch(error => { //deals with server errors
            console.error(error);
            history.push("/error")
        })
    }}

    return(
        <React.Fragment>
            <Header></Header>
            <main>
                <div className="form--centered">
                    <h2>Sign Up</h2>
                    {
                    errors?
                    <div className="validation--errors">
                    <h3>Validation Errors</h3>

                        <p>{errors}</p>
                    </div>:
                    <React.Fragment></React.Fragment>
                    }
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="firstName">First Name</label>
                        <input 
                            id="firstName" 
                            name="firstName" 
                            type="text" 
                            value={firstNameField}
                            onChange={e => setFirstNameField(e.target.value)}
                        />
                        <label htmlFor="lastName">Last Name</label>
                        <input 
                            id="lastName" 
                            name="lastName" 
                            type="text" 
                            value={lastNameField}
                            onChange={e => setLastNameField(e.target.value)}
                        />
                        <label htmlFor="emailAddress">Email Address</label>
                        <input 
                            id="emailAddress" 
                            name="emailAddress" 
                            type="email" 
                            value={emailField}
                            onChange={e => setEmailField(e.target.value)}
                        />
                        <label htmlFor="password">Password</label>
                        <input 
                            id="password" 
                            name="password" 
                            type="password" 
                            value={passwordField}
                            onChange={e => setPasswordField(e.target.value)}
                        />
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input 
                            id="confirmPassword" 
                            name="confirmPassword" 
                            type="password" 
                            value={confirmPasswordField}
                            onChange={e => setConfirmPasswordField(e.target.value)}
                            />
                        <button className="button" type="submit">Sign Up</button><button className="button button-secondary">Cancel</button>
                    </form>
                    <p>Already have a user account? Click here to <Link to="/signin">sign in</Link>!</p>
                </div>
            </main>
        </React.Fragment>
    )
}

export default UserSignUp