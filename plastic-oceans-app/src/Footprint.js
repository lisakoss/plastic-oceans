import React from 'react';
import './index.css';
import { TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import MyFootprint from './MyFootprint.js'
import ActivePledges from './ActivePledges.js'
import classnames from 'classnames';

import firebase, { auth } from './firebase.js';

export default class Footprint extends React.Component {
  constructor(props) {
    super(props);
    
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
      pledges: [],
    };
  }

  componentDidMount() {
    const pledgesRef = firebase.database().ref('Pledges');
    pledgesRef.on('value', (snapshot) => {
        let pledges = snapshot.val();
        let newState = [];

        snapshot.forEach(function (child) {
          let pledge = child.val();
          newState.push({
            id: child.key,
            title: pledge.title,
            desc: pledge.desc,
            question: pledge.question,
          });
        })
        this.setState({
          pledges: newState
        });
      });
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {

    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              My Footprint
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Active Pledges
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <MyFootprint 
              pledges={this.state.pledges}
            />
          </TabPane>
          <TabPane tabId="2">
            <ActivePledges 
              pledges={this.state.pledges}
            />
          </TabPane>
        </TabContent>
      </div>
    )
  }
}
