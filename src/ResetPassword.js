import React from 'react';
import './index.css';
import firebase from 'firebase';

import ResetPasswordForm from './ResetPasswordForm';
import { auth } from './index';

export default class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: undefined,
    };

    // put optional this binding here
    this.resetPassword = this.resetPassword.bind(this);
  }

  // executed when the component appears on the screen
  componentDidMount() {
    // Add a listener and callback for authentication events
    this.unregister = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ userId: user.uid });
        this.props.history.push('/discover'); // redirect to home page
      }
      else {
        this.setState({ userId: null }); // null out the saved state if not logged in
      }
    });
  }

  // unregister saved funcs
  componentWillUnmount() {
    if (this.unregister) {
      this.unregister();
    }
  }

  //A callback function for logging in existing users
  resetPassword(actionCode, newPassword) {
    var accountEmail;
    // Verify the password reset code is valid.
    auth.verifyPasswordResetCode(actionCode).then(function(email) {
      var accountEmail = email;
  
      // TODO: Show the reset screen with the user's email and ask the user for
      // the new password.
  
      // Save the new password.
      auth.confirmPasswordReset(actionCode, newPassword).then(function(resp) {
        // Password reset has been confirmed and new password updated.
  
        // TODO: Display a link back to the app, or sign-in the user directly
        // if the page belongs to the same domain as the app:
        // auth.signInWithEmailAndPassword(accountEmail, newPassword);
  
        // TODO: If a continue URL is available, display a button which on
        // click redirects the user back to the app via continueUrl with
        // additional state determined from that URL's parameters.
      }).catch(function(error) {
        // Error occurred during confirmation. The code might have expired or the
        // password is too weak.
      });
    }).catch(function(error) {
      // Invalid or expired action code. Ask user to try to reset the password
      // again.
    });
  }


  render() {
    let content = null; //what main content to show

    if (!this.state.userId) { //if logged out, show forgot password
      content = (<div><ResetPasswordForm resetPasswordCallback={this.resetPassword} error={this.state.error} /></div>);
    }

    return (
      <div>
        {content}
      </div>
    );
  }
}
