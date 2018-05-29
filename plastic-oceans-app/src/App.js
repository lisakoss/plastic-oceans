import React, { Component } from 'react';
import logo from './logo.svg';
import { Route, Switch, Link } from 'react-router-dom';

import Opening from './Opening';
import SignUp from './SignUp';

class App extends Component {
  render() {
    return (
      <div role="main">
        <Switch>
          <Route exact path="/" component={Opening} />
          <Route exact path="/signup" component={SignUp}/>
        </Switch>
      </div>
    );
  }
}

export default App;
