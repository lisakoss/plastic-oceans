import React from 'react';
import './index.css';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

import Logout from './Logout';

export default class Opening extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
    }
  }

  /* Lifecycle callback:
executed when the component appears on the screen. */
  componentDidMount() {
    /* Add a listener and callback for authentication events */
    this.unregister = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ userId: user.uid });
      } else { // redircts user to login page if not logged in
        this.setState({ userId: null }); //null out the saved state
      }
    })
  }

  /* Unregister listerns. */
  componentWillUnmount() {
    if (this.unregister) {
      this.unregister();
    }
  }

  render() {
    let logoutBtn = null;

    if (this.state.userId !== null) {
      logoutBtn = (<Logout />);
    }

      return (
        <div>
          <div role="main" id="home" className="tinted">
            <div className="welcome-message container-welcome">
              <h1>Plastic Oceans</h1>
              <h2>Help reduce your plastic footprint.</h2>
              <div className="welcome-buttons">
                <Link to="/signup"><Button outline color="primary" size="lg">Sign Up</Button></Link>{' '}
                <Link to="/signin"><Button color="primary" size="lg" className="sign-in-button">Sign In</Button></Link>
                {logoutBtn}
              </div>
            </div>
          </div>
        </div>
      )
  }
}
