import React from 'react';
import './index.css';
import firebase from 'firebase';
import { Redirect } from 'react-router'

import ForgotPasswordForm from './ForgotPasswordForm';

export default class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: undefined,
    };

    // put optional this binding here
    this.forgotPassword = this.forgotPassword.bind(this);
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
  forgotPassword(email) {
    var auth = firebase.auth();
    let thisComponent = this;

    auth.sendPasswordResetEmail(email).then(function() {
      // Email sent.
    }).catch(function(error) {
      // An error happened.
      let errorCode = error.code;
      let errorMessage = error.message;

      if (errorCode === 'auth/user-not-found') {
        thisComponent.setState({ error: 'This email address does not have an account.' });
      } 
    });
  }

  render() {
    let content = null; //what main content to show

    if (!this.state.userId) { //if logged out, show forgot password
      content = (<div><ForgotPasswordForm forgotPasswordCallback={this.forgotPassword} error={this.state.error} /></div>);
    }

    return (
      <div>
        {content}
      </div>
    );
  }
}
