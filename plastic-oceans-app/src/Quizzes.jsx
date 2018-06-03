import React, { Component } from "react";
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import firebase from 'firebase';

class Quizzes extends Component {
    constructor(props) {
        super(props);
        this.state = {
          quizList: []
        };
    }

    render() {
        return(
            <div id="quizzes-home">
                <ListGroup className="quiz-list">
                    {this.state.quizList.map((item, index) => {
                        return (
                            <ListGroupItem className="quiz-select" id={item} key={index} action onClick={(e) => this.handleQuizClick(e)}>
                                <ListGroupItemHeading className="disable-click">{item}</ListGroupItemHeading>
                                <ListGroupItemText className="disable-click">Not Taken</ListGroupItemText>
                            </ListGroupItem>
                        );
                    })}
                </ListGroup>
            </div>
        );
    }

    componentDidMount() {
        this.createListOfQuizzes((quizzesList) => {
            this.setState({quizList: quizzesList});
        });
    }

    createListOfQuizzes(callback) {
        var quizzesRef = firebase.database().ref('/Quizzes');
        var quizzesList = [];
        var componentRef = this;
        quizzesRef.on('value', function(snapshot) {
            snapshot.forEach(function(quiz) {
                quizzesList.push(quiz.key);
            });
            callback(quizzesList);
            componentRef.setState( {quizList: quizzesList} );
        });
    }

    handleQuizClick(e) {
        var quizTitle = e.target.id;
        this.props.chooseQuiz("Enter Quiz", quizTitle);
    }

}

export default Quizzes;