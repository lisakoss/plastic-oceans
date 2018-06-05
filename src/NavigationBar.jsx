import React, { Component } from "react";
import firebase from 'firebase';

import { Link } from 'react-router-dom';

import Logout from './Logout';

import Avatar from '@material-ui/core/Avatar';
import MobileProfile from './mobile-profile.png'

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: false,
      width: 0,
      height: 0,
      userId: undefined,
      firstName: undefined,
      avatar: null,
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);

    // Add a listener and callback for authentication events
    this.unregister = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ userId: user.uid });
        var profileRef = firebase.database().ref('users/' + this.state.userId);
        profileRef.once("value")
          .then(snapshot => {
            this.setState({ firstName: snapshot.child("firstName").val() });
            this.setState({ avatar: snapshot.child("avatar").val() });
          });
      }
      else {
        this.setState({ userId: null }); // null out the saved state if not logged in
        this.setState({ firstName: null }); //null out the saved state
        this.setState({ avatar: null }); //null out the saved state
      }
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);

    if (this.unregister) {
      this.unregister();
    }
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });

    if (this.state.width <= 700) {
      this.setState({ isMenuOpen: false });
    }
  }

  handleClick(path) {
    window.location = path;
  }

  render() {
    let mobileNavBar = null;
    let navigation = null;
    let drawerContent = null;
    let img = null;

    if (this.state.avatar === null || this.state.avatar === "") {
      img = (<img id="profile-image" src="https://d30y9cdsu7xlg0.cloudfront.net/png/630729-200.png" alt="profile icon" />);
    } else {
      img = (<Avatar id="profile-custom" alt="profile icon" src={this.state.avatar} />);
    }

    if (this.state.userId !== null) {
      drawerContent = (
        <div>
          <div className="drawer-name-container">
          <h2 className="drawer-name">{this.state.firstName}</h2>
          </div>
          {img}
          <div className="drawer-links">
            <Link to={"/profile/" + this.state.userId}>Go to Profile</Link>
            <Link to="/settings">Settings</Link>
          </div>
          <Logout />
        </div>
      );
    } else {
      drawerContent = (
        <p>You are not signed in. <Link to="/signin">Please sign in here.</Link></p>
      )
    }

    if (this.state.width <= 700) {
      if (this.props.title === "Profile") {
        mobileNavBar = (
          <div id="mobile-nav">
            <p className="profile-header">{this.props.title}</p>
            <p className="settings-icon"><Link to="/settings"><svg height="20px" version="1.1" viewBox="0 0 20 20" width="20px">
              <g fill="none" fillRule="evenodd" id="Page-1" stroke="none" strokeWidth="1">
                <g fill="#ffffff" id="Core" transform="translate(-464.000000, -380.000000)"><g id="settings" transform="translate(464.000000, 380.000000)">
                  <path d="M17.4,11 C17.4,10.7 17.5,10.4 17.5,10 C17.5,9.6 17.5,9.3 17.4,9 L19.5,7.3 C19.7,7.1 19.7,6.9 19.6,6.7 L17.6,3.2 C17.5,3.1 17.3,3 17,3.1 L14.5,4.1 C14,3.7 13.4,3.4 12.8,3.1 L12.4,0.5 C12.5,0.2 12.2,0 12,0 L8,0 C7.8,0 7.5,0.2 7.5,0.4 L7.1,3.1 C6.5,3.3 6,3.7 5.4,4.1 L3,3.1 C2.7,3 2.5,3.1 2.3,3.3 L0.3,6.8 C0.2,6.9 0.3,7.2 0.5,7.4 L2.6,9 C2.6,9.3 2.5,9.6 2.5,10 C2.5,10.4 2.5,10.7 2.6,11 L0.5,12.7 C0.3,12.9 0.3,13.1 0.4,13.3 L2.4,16.8 C2.5,16.9 2.7,17 3,16.9 L5.5,15.9 C6,16.3 6.6,16.6 7.2,16.9 L7.6,19.5 C7.6,19.7 7.8,19.9 8.1,19.9 L12.1,19.9 C12.3,19.9 12.6,19.7 12.6,19.5 L13,16.9 C13.6,16.6 14.2,16.3 14.7,15.9 L17.2,16.9 C17.4,17 17.7,16.9 17.8,16.7 L19.8,13.2 C19.9,13 19.9,12.7 19.7,12.6 L17.4,11 L17.4,11 Z M10,13.5 C8.1,13.5 6.5,11.9 6.5,10 C6.5,8.1 8.1,6.5 10,6.5 C11.9,6.5 13.5,8.1 13.5,10 C13.5,11.9 11.9,13.5 10,13.5 L10,13.5 Z" id="Shape" />
                </g></g></g></svg></Link></p>
          </div>);
      } else {
        mobileNavBar = (
          <div id="mobile-nav">
            <p className="mobile-nav-header">{this.props.title}</p>
            <p className="settings-icon"><Link to={"/profile/" + this.state.userId}><img id="profile-nav" width="30px !important" src={MobileProfile} alt="profile icon" /></Link></p>
          </div>);
      }

      navigation = (
        <div ref="navBar" id="nav-bar">
          <div id="nav-buttons">
            <button ref="discoverButton" className={this.props.selected === "discover" ? "nav-button selected" : "nav-button"} id="Discover" onClick={() => this.handleClick('/discover')}><img src="https://image.flaticon.com/icons/png/512/44/44386.png" alt="earth icon" /><br />Discover</button>
            <button ref="footprintButton" className={this.props.selected === "footprint" ? "nav-button selected" : "nav-button"} id="Footprint" onClick={() => this.handleClick('/footprint')}><img src="https://upload.wikimedia.org/wikipedia/commons/3/39/Gnomelogo-footprint.svg" alt="footprint icon" /><br />Footprint</button>
            <button ref="quizzesButton" className={this.props.selected === "quizzes" ? "nav-button selected" : "nav-button"} id="Quizzes" onClick={() => this.handleClick('/quizzes')}><img src="https://image.flaticon.com/icons/png/512/36/36601.png" alt="question mark icon" /><br />Quizzes</button>
          </div>
        </div>);
    } else {
      navigation = (
        <div ref="navBar" id="nav-bar">
          <button id="menu" onClick={(e) => this.handleMenuClick(e)}><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1200px-Hamburger_icon.svg.png" alt="menu" /></button>
          <Link to="/">
            <img src="/logo.svg" alt="Plastic Oceans logo" id="logo" />
            <h1 id="app-title">Plastic Oceans</h1>
          </Link>
          <nav>
            <ul>
              <li ref="discoverButton" className={this.props.selected === "discover" ? "nav-button selected" : "nav-button"} onClick={() => this.handleClick('/discover')} id="Discover">Discover</li>
              <li ref="footprintButton" className={this.props.selected === "footprint" ? "nav-button selected" : "nav-button"} onClick={() => this.handleClick('/footprint')} id="Footprint">Footprint</li>
              <li ref="quizzesButton" className={this.props.selected === "quizzes" ? "nav-button selected" : "nav-button"} onClick={() => this.handleClick('/quizzes')} id="Quizzes">Quizzes</li>
            </ul>
          </nav>

          <div id="slide-menu" ref="slideMenu" className="close-menu">
            {drawerContent}
          </div>
        </div>);
    }

    return (
      <div>
        {mobileNavBar}
        {navigation}
      </div>
    );
  }

  /*// Toggle views of different sections (Discover, Footprint, Quizzes)
  handleButtonClick(e) {
    var screenID = e.target.id;
    this.props.changeScreen(screenID);
    var navButtons = document.getElementsByClassName("nav-button");
    for (var i = 0; i < navButtons.length; i++) {
      navButtons[i].classList.remove("selected");
    }
    e.target.classList.add("selected");
  }*/

  // Toggle hamburger menu
  handleMenuClick(e) {
    if (this.state.isMenuOpen) {
      this.refs.slideMenu.classList.remove("slide-in");
      this.refs.slideMenu.classList.remove("open-menu");
      this.refs.slideMenu.classList.add("slide-out");
      this.refs.slideMenu.classList.add("close-menu");
    } else {
      this.refs.slideMenu.classList.remove("slide-out");
      this.refs.slideMenu.classList.remove("close-menu");
      this.refs.slideMenu.classList.add("slide-in");
      this.refs.slideMenu.classList.add("open-menu");
    }
    var openMenu = !this.state.isMenuOpen;
    this.setState({ isMenuOpen: openMenu });
  }
}

export default NavigationBar;