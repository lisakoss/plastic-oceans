import React from 'react';
import './index.css';

import Avatar from './Avatar';

export default class Opening extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {

    return (
      <div>
        <p>This is the opening screen. Will have sign up + sign in buttons.</p>
        <Avatar />
      </div>
    )
  }
}
