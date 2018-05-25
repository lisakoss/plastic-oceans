import React, { Component } from 'react';
import logo from './logo.svg';
import { Route, Switch, Link } from 'react-router-dom';
import firebase, { auth } from './firebase.js';

import Opening from './Opening';
import Footprint from './Footprint';
import NavigationBar from './NavigationBar';
import Quizzes from './Quizzes';
import SignUp from './SignUp';
import SignIn from './SignIn';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentScreen: "Opening",
      isUserLoggedIn: false,
      userName: ""
    }
  }

  render() {
    return (
      <div role="main">
        <Switch>
          <Route exact path="/" component={Opening} />
          <Route exact path="/Footprint" component={Footprint}/>
          <Route exact path="/Quizzes" component={Quizzes}/>
          <Route exact path="/signup" component={SignUp}/>
          <Route exact path="/signin" component={SignIn} />
        </Switch>
        {this.state.isUserLoggedIn && (
          <NavigationBar 
          changeScreen={(screenID) => this.changeScreenState(screenID)}
          userName={this.state.userName}
          />
        )}
      </div>
    );
  }

  changeScreenState(screenID) {
    this.setState( {currentScreen: screenID} );
  }
}
export default App;
