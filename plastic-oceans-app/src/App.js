import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch, Link } from 'react-router-dom';

import Opening from './Opening';
import Footprint from './Footprint';

class App extends Component {
  render() {
    return (
      <div role="main">
        <Switch>
          <Route exact path="/" component={Opening} />
          <Route exact path="/" component={Footprint}/>
        </Switch>
      </div>
    );
  }
}

export default App;
