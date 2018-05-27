import React from 'react';
import './index.css';
import { TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import MyFootprint from './MyFootprint.js'
import ActivePledges from './ActivePledges.js'
import classnames from 'classnames';

import firebase from './firebase.js';

export default class Footprint extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      activeTab: '1',
      pledges: [],
      activePledges: [],
      user: {}
    };

    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const pledgesRef = firebase.database().ref('Pledges');
        let newState = [];
        pledgesRef.on('value', (snapshot) => {
          let pledges = snapshot.val();
    
          snapshot.forEach(function (child) {
            let pledge = child.val();
            newState.push({
              id: child.key,
              title: pledge.title,
              desc: pledge.desc,
              question: pledge.question,
              footprintDesc: pledge.footprintDesc,
              weight: pledge.weight
            });
          })
        });
        let uid = "wZNQMk1ikSUH3UmkfKI39nDBJot1"
        let currUser = firebase.database().ref('users/' + uid);
        console.log("current user: " + currUser);
        currUser.on('value', (snapshot) => {
          let userInfo = snapshot.val();
          this.setState({
            user: userInfo,
            userID: uid,
            activePledges: userInfo.pledges.activePledges
          });
          
          for (var i = 0; i < newState.length; i++) {
            for (var j = 0; j < this.state.activePledges.length; j++) {
              if (newState[i].id === this.state.activePledges[j].id) {
                newState.splice(i, 1);
                i--;
                j++;
              }
            }
          }
          this.setState({
            pledges: newState
          });
        })
        
      } else {
          // No user is signed in.
          console.log('There is no logged in user');
      }
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
              uid={this.uid}
              pledges={this.state.pledges}
              location={this.state.user.location}
              addPledge={(pledge) => this.addPledge(pledge)}
            />
          </TabPane>
          <TabPane tabId="2">
            <ActivePledges 
              pledges={this.state.activePledges}
              deletePledge={(pledge) => this.deletePledge(pledge)}
            />
          </TabPane>
        </TabContent>
      </div>
    )
  }

  addPledge(pledge) {
    this.state.activePledges.push(pledge);

    for (var i = 0; i < this.state.pledges.length; i++) {
      if (this.state.pledges[i] === pledge) {
        this.state.pledges.splice(i, 1);
      }
    }

    firebase.database().ref('users/' + this.state.userID + "/pledges").set({activePledges: this.state.activePledges});
  }

  deletePledge(pledge) {
    this.state.pledges.push(pledge);
    
    for (var i = 0; i < this.state.activePledges.length; i++) {
      if (this.state.activePledges[i] === pledge) {
        this.state.activePledges.splice(i, 1);
      }
    }
    firebase.database().ref('users/' + this.state.userID + "/pledges").set({activePledges: this.state.activePledges});
  }
}
