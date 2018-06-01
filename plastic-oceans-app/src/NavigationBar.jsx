import React, { Component } from "react";
import Logout from './Logout';
import firebase from 'firebase';

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: false,
      width: 0,
      height: 0,
      userId: undefined,
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
        this.props.history.push('/'); // redirect to home page
      }
      else {
        this.setState({ userId: null }); // null out the saved state if not logged in
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

    if(this.state.width <= 700) {
      this.setState({ isMenuOpen: false });
    }
  }

  render() {
    console.log("WIDTH", this.state.width);
    let mobileNavBar = null;
    let navigation = null;

    if (this.state.width < 700) {
      mobileNavBar = (
        <div id="mobile-nav">
          <p>{this.props.title}</p>
        </div>
      );
      if (this.state.userId !== null) {
        navigation = (
          <div ref="navBar" id="nav-bar">
            <button id="menu" onClick={(e) => this.handleMenuClick(e)}><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1200px-Hamburger_icon.svg.png" alt="menu" /></button>
            <h1 id="app-title">Plastic Oceans</h1>
            <div id="nav-buttons">
              <button ref="discoverButton" className="nav-button selected" id="Discover" onClick={(e) => this.handleButtonClick(e)}><img src="https://image.flaticon.com/icons/png/512/44/44386.png" alt="earth icon" /><br />Discover</button>
              <button ref="footprintButton" className="nav-button" id="Footprint" onClick={(e) => this.handleButtonClick(e)}><img src="https://upload.wikimedia.org/wikipedia/commons/3/39/Gnomelogo-footprint.svg" alt="footprint icon" /><br />Footprint</button>
              <button ref="quizzesButton" className="nav-button" id="Quizzes" onClick={(e) => this.handleButtonClick(e)}><img src="https://image.flaticon.com/icons/png/512/36/36601.png" alt="question mark icon" /><br />Quizzes</button>
            </div>

            <div id="slide-menu" ref="slideMenu" className="close-menu">
              <h2>{this.props.userName}</h2>
              <img id="profile-image" src="https://d30y9cdsu7xlg0.cloudfront.net/png/630729-200.png" alt="profile icon" />
              <a href="">Go to Profile</a>
              <a href="">Settings</a>
              <Logout />
            </div>
          </div>);
      }
    } else {
      navigation = (
      <div ref="navBar" id="nav-bar">
        <button id="menu" onClick={(e) => this.handleMenuClick(e)}><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1200px-Hamburger_icon.svg.png" alt="menu" /></button>
        <h1 id="app-title">Plastic Oceans</h1>
        <nav>
        <ul>
          <li ref="discoverButton" className="nav-button selected" id="Discover" onClick={(e) => this.handleButtonClick(e)}>Discover</li>
          <li ref="footprintButton" className="nav-button" id="Footprint" onClick={(e) => this.handleButtonClick(e)}>Footprint</li>
          <li ref="quizzesButton" className="nav-button" id="Quizzes" onClick={(e) => this.handleButtonClick(e)}>Quizzes</li>
        </ul>
        </nav>

        <div id="slide-menu" ref="slideMenu" className="close-menu">
          <h2>{this.props.userName}</h2>
          <img id="profile-image" src="https://d30y9cdsu7xlg0.cloudfront.net/png/630729-200.png" alt="profile icon" />
          <a href="">Go to Profile</a>
          <a href="">Settings</a>
          <Logout />
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

  // Toggle views of different sections (Discover, Footprint, Quizzes)
  handleButtonClick(e) {
    var screenID = e.target.id;
    this.props.changeScreen(screenID);
    var navButtons = document.getElementsByClassName("nav-button");
    for (var i = 0; i < navButtons.length; i++) {
      navButtons[i].classList.remove("selected");
    }
    e.target.classList.add("selected");
  }

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