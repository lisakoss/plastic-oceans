import React from 'react';
import './index.css';
import { TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import MyFootprint from './MyFootprint.js';
import ActivePledges from './ActivePledges.js';
import classnames from 'classnames';
import firebase from 'firebase';

export default class Footprint extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      activeTab: '1',
      pledges: [],
      activePledges: [],
      user: {},
      avgFootprint: 1613.7,
      pledgesAvailable: true
    };

    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // Grab all pledges
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
              weight: pledge.weight,
              icon: pledge.icon
            });
          })
        });

        // Get current user
        const currUser = firebase.database().ref('users/' + user.uid);
        currUser.on('value', (snapshot) => {
          let userInfo = snapshot.val();

          // Save user id and all user info
          this.setState({
            user: userInfo,
            userID: user.uid,
          });

          // Get user's active pledges
          if (userInfo.pledges !== undefined) {
            this.setState({
              activePledges: userInfo.pledges.activePledges
            });
            // Remove active pledges from list of all pledges to get all pledges user can accept
            for (var i = 0; i < newState.length; i++) {
              for (var j = 0; j < this.state.activePledges.length; j++) {
                if (newState[i].id === this.state.activePledges[j].id) {
                  newState.splice(i, 1);
                  i--;
                  j = this.state.activePledges.length;
                }
              }
            }

            // if (newState.length === 0) {
            //   this.setState({
            //     pledgesAvailable: false
            //   })
            // } else {
            //   this.setState({
            //     pledgesAvailable: true
            //   })
            // }

            // Set list of pledges users can accept
            this.setState({
              pledges: newState
            });

          // If user has no active pledges, set list of pledges user can accept to all pledges
          } else {
            this.setState({
              pledges: newState
            });
          }

          // Calculate user's footprint
          this.calculateFootprint();
        }); 

      } else {
          // No user is signed in.
          console.log('There is no logged in user');
      }
    });
  }

  // Toggle between tabs at top of page
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    return (
      <div id="footprint">
        <Nav tabs id="footprint-tabs">
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
              userFootprint={this.state.userFootprint}
              avgFootprint={this.state.avgFootprint}
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


  calculateFootprint() {
    let plasticSaved = 0;
    this.state.activePledges.forEach((pledge) => {
      plasticSaved += pledge.footprintReduction
    })
    let userFootprint = Math.round((this.state.avgFootprint - plasticSaved) * 10) / 10;
    this.setState({
      userFootprint: userFootprint
    });
  }
}
