import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch, Link } from 'react-router-dom';

import Opening from './Opening';
import NavigationBar from './NavigationBar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentScreen: "Opening",
      isUserLoggedIn: true
    }
  }

  render() {
    return (
      <div role="main">
        {/*<Switch>
          <Route exact path="/" component={Opening} />
        </Switch>*/}
        {this.state.isUserLoggedIn && (
          <NavigationBar 
          changeScreen={(screenID) => this.changeScreenState(screenID)}
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
