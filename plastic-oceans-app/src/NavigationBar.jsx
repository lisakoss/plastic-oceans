import React, { Component } from "react";
import { Link } from 'react-router-dom';

class NavigationBar extends Component {
    render() {
        return(
            <div ref="navBar" id="nav-bar">
                <button ref="discoverButton" className="nav-button selected" id="Discover" onClick={(e) => this.handleButtonClick(e)}><img src="https://image.flaticon.com/icons/png/512/44/44386.png" alt="earth icon" /><br />Discover</button>
                <button ref="footprintButton" className="nav-button" id="Footprint" onClick={(e) => this.handleButtonClick(e)}><img src="https://upload.wikimedia.org/wikipedia/commons/3/39/Gnomelogo-footprint.svg" alt="footprint icon" /><br />Footprint</button>
                <button ref="quizzesButton" className="nav-button" id="Quizzes" onClick={(e) => this.handleButtonClick(e)}><img src="https://image.flaticon.com/icons/png/512/36/36601.png" alt="question mark icon" /><br />Quizzes</button>
            </div>
        );
    }

    handleButtonClick(e) {
        var screenID = e.target.id;
        this.props.changeScreen(screenID);
        var navButtons = this.refs.navBar.childNodes;
        for (var i = 0; i < navButtons.length; i++) {
            navButtons[i].classList.remove("selected");
        }
        e.target.classList.add("selected");
    }
}

export default NavigationBar;