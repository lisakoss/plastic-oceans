import React from 'react';
import './index.css';
import firebase from 'firebase';

import { Button } from 'reactstrap'

import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

export default class Opening extends React.Component {
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
        <p>This is the opening screen. Will have sign up + sign in buttons.</p>
        <Button onClick={(event) => this.signOutUser(event)}>Sign Out</Button>
      <div role="main" id="home" className="tinted">
        <div className="welcome-message container-welcome">
          <h1>Plastic Oceans</h1>
          <h2>Help reduce your plastic footprint.</h2>
          <div className="welcome-buttons">
            <Link to="/signup"><Button outline color="primary" size="lg">Sign Up</Button></Link>{' '}
            <Link to="/signin"><Button color="primary" size="lg" className="sign-in-button">Sign In</Button></Link>
          </div>
          </div>
          </div>
      </div>
    )
  }
}
