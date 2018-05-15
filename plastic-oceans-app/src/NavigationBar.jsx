import React, { Component } from "react";

class NavigationBar extends Component {
    render() {
        return(
            <div id="nav-bar">
                <button className="nav-button" id="Discover" onClick={(e) => this.handleButtonClick(e)}><img src="https://image.flaticon.com/icons/png/512/44/44386.png" alt="earth icon" /><br />Discover</button>
                <button className="nav-button" id="Footprint" onClick={(e) => this.handleButtonClick(e)}><img src="https://upload.wikimedia.org/wikipedia/commons/3/39/Gnomelogo-footprint.svg" alt="footprint icon" /><br />Footprint</button>
                <button className="nav-button" id="Quizzes" onClick={(e) => this.handleButtonClick(e)}><img src="https://image.flaticon.com/icons/png/512/36/36601.png" alt="question mark icon" /><br />Quizzes</button>
            </div>
        );
    }

    handleButtonClick(e) {
        var screenID = e.target.id;
        this.props.changeScreen(screenID);
    }
}

export default NavigationBar;