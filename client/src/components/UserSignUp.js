import React from 'react';
import Header from './Header';
import {useHistory} from 'react-router-dom'

/****
 * DISPLAYS A SIGN UP FORM
 ***/
function UserSignUp(){

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
                    <h2>Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <label for="firstName">First Name</label>
                        <input id="firstName" name="firstName" type="text" value=""/>
                        <label for="lastName">Last Name</label>
                        <input id="lastName" name="lastName" type="text" value=""/>
                        <label for="emailAddress">Email Address</label>
                        <input id="emailAddress" name="emailAddress" type="email" value=""/>
                        <label for="password">Password</label>
                        <input id="password" name="password" type="password" value=""/>
                        <label for="confirmPassword">Confirm Password</label>
                        <input id="confirmPassword" name="confirmPassword" type="password" value=""/>
                        <button className="button" type="submit">Sign Up</button><button className="button button-secondary">Cancel</button>
                    </form>
                    <p>Already have a user account? Click here to <a href="sign-in.html">sign in</a>!</p>
                </div>
            </main>
        </React.Fragment>
    )
}

export default UserSignUp