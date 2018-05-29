import React from 'react';
import './index.css';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

export default class Opening extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div>
      <div role="main" id="home" className="tinted">
        <div className="welcome-message container-welcome">
          <h1>Plastic Oceans</h1>
          <h2>Help reduce your plastic footprint.</h2>
          <div className="welcome-buttons">
            <Link to="/signup"><Button outline color="primary" size="lg">Sign Up</Button></Link>{' '}
            <Link to="/signin"><Button color="primary" size="lg" className="sign-in-button">Sign In</Button></Link>
          </div>
          </div>
          </div>
      </div>
    )
  }
}
