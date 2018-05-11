import React from 'react';
import './index.css';

import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

export default class Opening extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {

    return (
      <div role="main" className="welcome-message">
        <h1>Welcome to Plastic Oceans!</h1>
          <div className="welcome-buttons">
            <Link to="/signup"><Button color="primary" size="lg">Sign Up</Button></Link>{' '}
            <Link to="/signin"><Button color="primary" size="lg">Sign In</Button></Link>
          </div>
      </div>
    )
  }
}
