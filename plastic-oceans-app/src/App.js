import React, { Component } from 'react';
import logo from './logo.svg';
import { Route, Switch, Link } from 'react-router-dom';

import Opening from './Opening';
import SignUpForm from './SignUpForm';

class App extends Component {
  render() {
    return (
      <div role="main">
        <Switch>
          <Route exact path="/" component={Opening} />
          <Route exact path="/sign-up" component={SignUpForm}/>
        </Switch>
      </div>
    );
  }
}

export default App;
