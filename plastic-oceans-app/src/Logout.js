import React from 'react';
import './index.css';
import firebase from 'firebase';
import  { Redirect } from 'react-router-dom'

import { Button } from 'reactstrap'

export default class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
    }

    this.signOutUser = this.signOutUser.bind(this);
  }

  	//Lifecycle callback executed when the component appears on the screen.
	componentDidMount() {
		// Add a listener and callback for authentication events 
		this.unregister = firebase.auth().onAuthStateChanged(user => {
			if(user) {
				this.setState({userId:user.uid}); //grabs user id
			} else { //redirects to home page once logged out
				this.setState({userId: null}); //null out the saved state
			}
		});
  }

	//when component will be removed
  componentWillUnmount() {
    if(this.unregister){ //if have a function to unregister with
      this.unregister(); //call that function!
    }
}

  signOutUser() {
    firebase.auth().signOut();
  }

  render() {
    return (
      <div className="logout-btn">
        <Button color="primary" onClick={(event) => this.signOutUser(event)}>Logout</Button>
      </div>
    )
  }
}
