import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch, Link } from 'react-router-dom';

import Opening from './Opening';
<<<<<<< HEAD
import Footprint from './Footprint';
=======
import NavigationBar from './NavigationBar';
>>>>>>> NavBar

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
        <Switch>
          <Route exact path="/" component={Opening} />
          <Route exact path="/Footprint" component={Footprint}/>
        </Switch>
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
