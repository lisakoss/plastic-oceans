import React from 'react';
import './index.css';
import {Tabs, Tab, PageHeader} from 'react-bootstrap'
import MyFootprint from './MyFootprint.js'
import ActivePledges from './ActivePledges.js'

export default class Footprint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {

    return (
      <div>
        <PageHeader>
          Footprint
        </PageHeader>
        <Tabs defaultActiveKey={1} id="tabs-bar">
          <Tab eventKey={1} title="My Footprint">
            <MyFootprint />
          </Tab>
          <Tab eventKey={2} title="Active Pledges">
            <ActivePledges />
          </Tab>
        </Tabs>
      </div>
    )
  }
}
