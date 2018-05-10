import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyARk0V2zLTbb5TtSbKEiHx7g-yI6Cf2i80",
  authDomain: "plastic-oceans.firebaseapp.com",
  databaseURL: "https://plastic-oceans.firebaseio.com",
  projectId: "plastic-oceans",
  storageBucket: "plastic-oceans.appspot.com",
  messagingSenderId: "244318961535"
};
firebase.initializeApp(config);

// Render the application view
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
