import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';

import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

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
