import React, { Component } from "react";
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import firebase from 'firebase';
import NavigationBar from './NavigationBar';

class Quizzes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quizList: [],
            quizResultsList: []
        };
    }

    render() {
        console.log(this.state.quizList);
        console.log(this.state.quizResultsList);
        return (
            <div id="quizzes-home">
                <NavigationBar title="Quizzes" selected="quizzes" />
                <ListGroup className="quiz-list">
                    {this.state.quizList.map((item, index) => {
                        return (
                            <ListGroupItem className="quiz-select" id={item} key={index} action onClick={(e) => this.handleQuizClick(e)}>
                                <ListGroupItemHeading className="disable-click">{item}</ListGroupItemHeading>
                                <ListGroupItemText className="disable-click">{this.state.quizResultsList[index] || ("Not Taken")}</ListGroupItemText>
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
        var quizResultsArr = []
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                uid = user.uid;
                var quizResultsRef = firebase.database().ref('/users/' + uid + '/QuizRecord');
                quizResultsRef.on('value', function(snapshot) { 
                    if (snapshot != null) {
                        console.log(snapshot.val());
                        snapshot.forEach(function(quizResult) {
                            quizResultsArr.push(quizResult.val()["NumberCorrect"] + "/" + quizResult.val()["Total"] + " Correct");
                        })
                    }
                    callback(quizzesList, quizResultsArr);
                });
            }
        });
    }

    handleQuizClick(e) {
        var quizTitle = e.target.id;
        this.props.history.push(`/quizzes/${quizTitle}`);
    }

}

export default Quizzes;
