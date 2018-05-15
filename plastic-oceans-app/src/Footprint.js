import React from 'react';
import './index.css';
import {Tabs, Tab} from 'react-bootstrap'

export default class Footprint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {

    return (
      <div>
        <Tabs defaultActiveKey={1} id="tabs-bar">
          <Tab eventKey={1} title="My Footprint">
            my footprint content
          </Tab>
          <Tab eventKey={2} title="Active Pledges">
            active pledges content
          </Tab>
        </Tabs>
        <p>This is the footprint screen.</p>
      </div>
    )
  }
}
