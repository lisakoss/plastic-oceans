import React, { Component } from "react";
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import firebase from 'firebase';
import NavigationBar from './NavigationBar';

class Quizzes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quizList: [],
            quizResultsList: new Map()
        };
    }

    render() {
        return (
            <div id="quizzes-home">
                <NavigationBar title="Quizzes" selected="quizzes" />
                <ListGroup className="quiz-list">
                    {this.state.quizList.map((item, index) => {
                        return (
                            <ListGroupItem className="quiz-select" id={item} key={index} action onClick={(e) => this.handleQuizClick(e)}>
                                <img src="https://www.materialui.co/materialIcons/hardware/keyboard_arrow_right_black_192x192.png" alt="right arrow" />
                                <ListGroupItemHeading className="disable-click">{item}</ListGroupItemHeading>
                                <ListGroupItemText className="quiz-record disable-click">{this.state.quizResultsList.get(item) || ("Not Taken")}</ListGroupItemText>
                                <ListGroupItemText className="quiz-type disable-click"><img src="http://www.myiconfinder.com/uploads/iconsets/256-256-6096188ce806c80cf30dca727fe7c237.png" alt="map marker icon" /> Global</ListGroupItemText>
                            </ListGroupItem>
                        );
                    })}
                </ListGroup>
            </div>
        );
    }

    componentDidMount() {
        this.createListOfQuizzes((quizzesList, quizResultsArr) => {
            this.setState({ quizList: quizzesList });
            this.setState({ quizResultsList: quizResultsArr});
        });
    }

    createListOfQuizzes(callback) {
        var quizzesRef = firebase.database().ref('/Quizzes');
        var quizzesList = [];
        var componentRef = this;
        quizzesRef.on('value', function(snapshot) {
            snapshot.forEach(function (quiz) {
                quizzesList.push(quiz.key);
            });
        });

        var uid = "";
        var quizResultsArr = new Map();
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                uid = user.uid;
                var quizResultsRef = firebase.database().ref('/users/' + uid + '/QuizRecord');
                var count = 0;
                quizResultsRef.on('value', function(snapshot) { 
                    if (snapshot != null) {
                        snapshot.forEach(function(quizResult) {
                            quizResultsArr.set(quizResult.key, quizResult.val()["NumberCorrect"] + "/" + quizResult.val()["Total"] + " Correct");
                        })
                    }
                    callback(quizzesList, quizResultsArr);
                });
            }
        });
    }

    handleQuizClick(e) {
        var quizTitle = e.target.id;
        console.log(quizTitle);
        this.props.history.push('/quizzes/' + quizTitle);
    }

}

export default Quizzes;
