import React from 'react';
import './index.css';
import firebase from 'firebase';

import { Button } from 'reactstrap'

export default class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}

    this.signOutUser = this.signOutUser.bind(this);
  }

  signOutUser() {
    firebase.auth().signOut();
    this.unregister = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ userId: user.uid }); // grabs user id
      } else { // redirects to home page once logged out
        this.setState({ userId: null }); // null out the saved state
      }
    });
  }

  render() {
    return (
      <div>
        <Button onClick={(event) => this.signOutUser(event)}>Sign Out</Button>
      </div>
    )
  }
}