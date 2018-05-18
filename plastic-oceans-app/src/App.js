import React, { Component } from 'react';
import logo from './logo.svg';
import { Route, Switch, Link } from 'react-router-dom';

import Opening from './Opening';
import SignUp from './SignUp';
import SignIn from './SignIn';

class App extends Component {
  render() {
    return (
      <div role="main">
        <Switch>
          <Route exact path="/" component={Opening} />
          <Route exact path="/sign-up" component={SignUp}/>
          <Route exact path="/sign-in" component={SignIn} />
        </Switch>
      </div>
    );
  }
}

export default App;
