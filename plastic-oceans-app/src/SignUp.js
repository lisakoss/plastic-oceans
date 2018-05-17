import React from 'react';
import './index.css';
import firebase from 'firebase';

import SignUpForm from './SignUpForm';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    // put optional this binding here
    this.createNewUser = this.createNewUser.bind(this);
  }

  // executed when the component appears on the screen
  componentDidMount() {
    // Add a listener and callback for authentication events
    this.unregister = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ userId: user.uid });
        this.props.history.push('/'); // redirect to home page
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
      firebase.database().ref('users/' + this.state.userId);
    }
  }

  createNewUser(firstName, lastName, username, email, location, password) {
    console.log("firstName", firstName);
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((firebaseUser) => {
        //create new entry in the Cloud DB (for others to reference)
        let userRef = firebase.database().ref('users/' + firebaseUser.user.uid);
        let userData = {
          firstName: firstName,
          lastName: lastName,
          username: username,
          email: email,
          location: location,
        }

        userRef.set(userData); //update entry in JOITC, return promise for chaining
      })
      .catch((error) => { //report any errors
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log("error", errorMessage);
        if (errorCode === 'auth/email-already-in-use') {
          this.setState({ error: 'The email address is already in use.' });
        } else if (errorCode === 'auth/invalid-email') {
          this.setState({ error: 'The email address is invalid' });
        } else if (errorCode === 'auth/operation-not-allowed') {
          this.setState({ error: 'Unable to create an account at this time, try again later.' });
        } else if (errorCode === 'auth/weak-password') {
          this.setState({ error: 'Password is not long enough' });
        } else {
          this.setState({ error: errorMessage });
        }
      });
  }

  render() {
    let content = null;

    // show user sign up form if logged out
    if (!this.state.userId) {
      content = (<div><SignUpForm signUpCallback={this.createNewUser} /></div>);
    }

    return (
      <div>{content}</div>
    );
  }
}
