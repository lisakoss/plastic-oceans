import React from 'react';
import './index.css';
import firebase from 'firebase';

import SignInForm from './SignInForm';

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: undefined,
    };

    // put optional this binding here
    this.signInUser = this.signInUser.bind(this);
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
    }
  }

  //A callback function for logging in existing users
  signInUser(email, password) {
    // Sign in the user 
    let thisComponent = this;
    firebase.auth().signInWithEmailAndPassword(email, password) //logs in user with email and password
      .catch(function (error) { //displays an error if there is a mistake with logging a user in
        thisComponent.setState({ error: 'You provided incorrect credentials.' });
      });
  }

  render() {
    let content = null; //what main content to show

    if (!this.state.userId) { //if logged out, show signup form
      content = (<div><SignInForm signInCallback={this.signInUser} error={this.state.error} /></div>);
    }

    return (
      <div>
        {content}
      </div>
    );
  }
}
