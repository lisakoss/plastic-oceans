import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // bootstrap css
import App from './App';

import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyARk0V2zLTbb5TtSbKEiHx7g-yI6Cf2i80",
  authDomain: "plastic-oceans.firebaseapp.com",
  databaseURL: "https://plastic-oceans.firebaseio.com",
  projectId: "plastic-oceans",
  storageBucket: "plastic-oceans.appspot.com",
  messagingSenderId: "244318961535"
};

var app = firebase.initializeApp(config);
export var auth = app.auth();

// Render the application view
ReactDOM.render(
    <Router>
      <div>
          <Switch>
              <Route path="/" component={App}/>
          </Switch>
      </div>
    </Router>, 
    document.getElementById('root')
);
registerServiceWorker();
