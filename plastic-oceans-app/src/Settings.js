import React from 'react';
import './index.css';
import firebase from 'firebase';

import SettingsForm from './SettingsForm';

export default class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: undefined,
      firstName: undefined,
      lastName: undefined,
      username: undefined,
      avatar: null,
      email: undefined,
      location: undefined,
      password: undefined,
      confirmPassword: undefined,
    };
    
    // put optional this binding here
    this.updateProfile = this.updateProfile.bind(this);
  }

  // executed when the component appears on the screen
  componentDidMount() {
    // Add a listener and callback for authentication events
    this.unregister = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ userId: user.uid });
      }
      else {
        this.setState({ userId: null }); // null out the saved state if not logged in
        this.props.history.push('/signin'); // redirect to home page
      }
    });
  }

  // unregister saved funcs
  componentWillUnmount() {
    if (this.unregister) {
      this.unregister();
    }
  }

  updateProfile(firstName, lastName, username, avatar, email, location, password) {
    let user = firebase.auth().currentUser; //grabs the logged in user's' info

    let userRef = firebase.database().ref('users/' + user.uid); //finds the logged in user in the database
    userRef.child('firstName').set(firstName); //sets their first name
    userRef.child('lastName').set(lastName); //sets their last name
    userRef.child('username').set(username); 
    userRef.child('avatar').set(avatar); 
    userRef.child('email').set(email);
    userRef.child('location').set(location); 



    user.updateEmail(email)
      .catch(function (error) {
      });

    user.updatePassword(password)
      .catch(function (error) {
      });
  }

  render() {
    let content = null;

    if (this.state.userId) {
      content = (<div><SettingsForm settingsCallback={this.updateProfile} error={this.state.error} /></div>);
    }

    return (
      <div>{content}</div>
    );
  }
}
