import React from 'react';
import './index.css';
import firebase from 'firebase';

import NavigationBar from './NavigationBar';
import Avatar from '@material-ui/core/Avatar';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: undefined,
      username: undefined,
      location: undefined,
      level: null,
      averageFootprint: undefined,
      userFootprint: undefined,
      pledgesSigned: undefined,
      avatar: null,
      pledgeCount: undefined,
    };
  }

  // executed when the component appears on the screen
  componentDidMount() {
    // Add a listener and callback for authentication events
    this.unregister = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ userId: user.uid });
        let pledges = null;
        var profileRef = firebase.database().ref('users/' + this.state.userId);
        profileRef.once("value")
        .then(snapshot => {
          this.setState({ username: snapshot.child("username").val() });
          this.setState({ location: snapshot.child("location").val() });
          this.setState({ level: snapshot.child("Level").val() });
          this.setState({ avatar: snapshot.child("avatar").val() });
          this.setState({ pledgesSigned: snapshot.child("pledges/activePledges").val() });
          this.setState({ pledgeCount: snapshot.child("pledges/activePledges").val() !== null ? snapshot.child("pledges/activePledges").val().length : 0 });
          pledges = snapshot.child("pledges/activePledges").val()

          var avgFootRef = firebase.database().ref('Average Footprint');
          avgFootRef.once("value")
            .then(snapshot => {
              let thisComponent = this;
              this.setState({ averageFootPrint: snapshot.val() });
              
              if (this.state.pledgeCount !== 0) {
                pledges.forEach(function (pledge) {
                  thisComponent.setState({ averageFootPrint: thisComponent.state.averageFootPrint - pledge.footprintReduction });
                });
              }
            });
        });
      }
      else {
        this.setState({ userId: null }); // null out the saved state if not logged in
        this.setState({ username: null });
        this.setState({ location: null });
        this.setState({ level: null });
        this.setState({ avatar: null });
        this.setState({ pledgesSigned: null });
        this.setState({ averageFootPrint: null });
        this.setState({ userFootPrint: null });
        this.props.history.push('/signin'); // redirect to home page
      }
    });
  }

  // unregister saved funcs
  componentWillUnmount() {
    if (this.unregister) {
      this.unregister();
    }
  }

  render() {
    let img = null;
    let level = null;

    if (this.state.avatar === null || this.state.avatar === "") {
      img = (<img id="profile-image profile-page" src="https://d30y9cdsu7xlg0.cloudfront.net/png/630729-200.png" alt="profile icon" />);
    } else {
      img = (<Avatar id="profile-custom" className="custom-avatar" alt="profile icon" src={this.state.avatar} />);
    }

    if (this.state.level === null) {
      level = 0;
    } else {
      level = this.state.level;
    }

    return (
      <div className="profile tinted-profile" role="article">
      <div className="profile-white">
        <NavigationBar title="Profile" selected="profile" />
        <div className="profile-container">
          <div className="row">
            <div className="column1">
              {img}
            </div>
            <div className="column2">
              <p>@{this.state.username}</p>
              <p>{this.state.location}</p>
              <p>level {level}</p>
            </div>
          </div>
        </div>

        <div className="profile-container">
          <h2>Footprint</h2>
          <p className="average-footprint">{this.state.averageFootPrint} g/</p><p className="week">week</p>
        </div>

        <div className="profile-container">
          <h2>Pledges Signed</h2>
          <p className="pledges">{this.state.pledgeCount}</p>
        </div>
        </div>
      </div>
    );
  }
}
