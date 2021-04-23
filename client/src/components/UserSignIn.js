import React from 'react';
import Header from './Header';
/****
 * DISPLAYS A SIGN IN FORM
 ***/
function UserSignIn(){
    return(
        <React.Fragment>
            <Header></Header>
            <main>
                <div className="form--centered">
                <h2>Sign In</h2>
                <form>
                <label for="emailAddress">Email Address</label>
                <input id="emailAddress" name="emailAddress" type="email" value=""></input>
                <label for="password">Password</label>
                <input id="password" name="password" type="password" value=""></input>
                <button className="button" type="submit">Sign In</button>
                <button className="button button-secondary">Cancel</button>
                </form>
                <p>Don't have a user account? Click here to <a href="sign-up.html"> sign up</a>!</p>
                </div>
            </main>
        </React.Fragment>
    )
}

export default UserSignIn