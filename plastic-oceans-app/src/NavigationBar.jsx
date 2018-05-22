import React, { Component } from "react";

class NavigationBar extends Component {
    render() {
        return(
            <div ref="navBar" id="nav-bar">
                <button id="menu"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1200px-Hamburger_icon.svg.png" alt="menu" /></button>
                <h1 id="app-title">Plastic Oceans</h1>
                <div id="nav-buttons">
                    <button ref="discoverButton" className="nav-button selected" id="Discover" onClick={(e) => this.handleButtonClick(e)}><img src="https://image.flaticon.com/icons/png/512/44/44386.png" alt="earth icon" /><br />Discover</button>
                    <button ref="footprintButton" className="nav-button" id="Footprint" onClick={(e) => this.handleButtonClick(e)}><img src="https://upload.wikimedia.org/wikipedia/commons/3/39/Gnomelogo-footprint.svg" alt="footprint icon" /><br />Footprint</button>
                    <button ref="quizzesButton" className="nav-button" id="Quizzes" onClick={(e) => this.handleButtonClick(e)}><img src="https://image.flaticon.com/icons/png/512/36/36601.png" alt="question mark icon" /><br />Quizzes</button>
                </div>
            </div>
        );
    }

    handleButtonClick(e) {
        var screenID = e.target.id;
        this.props.changeScreen(screenID);
        var navButtons = document.getElementsByClassName("nav-button");
        for (var i = 0; i < navButtons.length; i++) {
            navButtons[i].classList.remove("selected");
        }
        e.target.classList.add("selected");
    }
}

export default NavigationBar;