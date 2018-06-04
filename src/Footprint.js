import React from 'react';
import './index.css';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import MyFootprint from './MyFootprint.js';
import ActivePledges from './ActivePledges.js';
import classnames from 'classnames';
import firebase from 'firebase';
import NavigationBar from './NavigationBar';

export default class Footprint extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: '1',
      pledges: [],
      activePledges: [],
      user: {},
      avgFootprint: 0,
      pledgesAvailable: true
    };

    this.toggle = this.toggle.bind(this);
  }

  componentWillMount() {

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

        var avgFootRef = firebase.database().ref('Average Footprint');
        avgFootRef.once("value")
          .then(snapshot => {
            this.setState({ avgFootprint: snapshot.val() });
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
          }
          // Calculate the user's footprint
          this.calculateFootprint();

          // Pledges user can accept
          this.setState({
            pledges: newState
          });
        });

      } else {
        // No user is signed in.
        this.props.history.push('/'); // Redirect to opening page
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
        <NavigationBar title="Footprint" selected="footprint" />
        <div className="container">
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
      </div>
    )
  }

  // Adds a pledge to active pledges
  addPledge(pledge) {
    this.state.activePledges.push(pledge);

    for (var i = 0; i < this.state.pledges.length; i++) {
      if (this.state.pledges[i] === pledge) {
        this.state.pledges.splice(i, 1);
      }
    }

    firebase.database().ref('users/' + this.state.userID + "/pledges").set({ activePledges: this.state.activePledges });
  }

  // Deletes a pledge from active pledges
  deletePledge(pledge) {
    for (var i = 0; i < this.state.activePledges.length; i++) {
      if (this.state.activePledges[i] === pledge) {
        this.state.activePledges.splice(i, 1);
      }
    }
    firebase.database().ref('users/' + this.state.userID + "/pledges").set({ activePledges: this.state.activePledges });

    const pledgesRef = firebase.database().ref('Pledges');
    let newState = [];
    pledgesRef.on('value', (snapshot) => {
      let pledges = snapshot.val();

      snapshot.forEach(function (child) {
        let currPledge = child.val();
        newState.push({
          id: child.key,
          title: currPledge.title,
          desc: currPledge.desc,
          question: currPledge.question,
          footprintDesc: currPledge.footprintDesc,
          weight: currPledge.weight,
          icon: currPledge.icon
        });
      });
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

    // Pledges user can accept
    this.setState({
      pledges: newState
    });
  }

  // Calculates the user's footprint
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
