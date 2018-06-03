import React from 'react';
import './index.css';
import firebase from 'firebase';

import NavigationBar from './NavigationBar';

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: undefined,
    };
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
      }
    });
  }

  // unregister saved funcs
  componentWillUnmount() {
    if (this.unregister) {
      this.unregister();
    }
  }

  render() {
    return (
      <div>
        <NavigationBar title="Settings" />
      </div>
    );
  }
}
