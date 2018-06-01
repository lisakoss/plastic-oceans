import React, { Component } from 'react';
import logo from './logo.svg';
import { Route, Switch, Link } from 'react-router-dom';

import Opening from './Opening';
import NavigationBar from './NavigationBar';

import SignUp from './SignUp';
import SignIn from './SignIn';
import ForgotPassword from './ForgotPassword';
import Discover from './Discover';

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
          <Route exact path="/signup" component={SignUp}/>
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/forgot" component={ForgotPassword} />
          <Route exact path="/discover" component={Discover} />
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
