import React, { Component } from "react";
import firebase from 'firebase';

class QuizResults extends Component {
    render() {
        return(
            <div id="quiz-final-results">
                <p className="quiz-result-text">You got {this.props.numberCorrect} of {this.props.totalQuestions} questions correct!</p>
                <button className="quiz-button" onClick={(e) => this.handleFinishQuiz(e)}>Done</button>
            </div>
        );
    }

    handleFinishQuiz(e) {
        // Save quiz results
        var uid = "";
        var currentRecord = 0;
        var componentRef = this;
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                uid = user.uid;
                var quizRecordRef = firebase.database().ref("/users/" + uid + "/QuizRecord/" + componentRef.props.quizName);
                quizRecordRef.once("value", function(snapshot) {
                    if (snapshot.val() != null) {
                        currentRecord = snapshot.val()["NumberCorrect"];
                    }
                    console.log("currentRecord : " + currentRecord);
                    console.log("total questions : " + componentRef.props.totalQuestions);
                    console.log("number correct : " + componentRef.props.numberCorrect);
                    if (currentRecord != componentRef.props.totalQuestions && componentRef.props.numberCorrect == componentRef.props.totalQuestions) {
                        var levelRef = firebase.database().ref("/users/" + uid + "/Level");
                        var currentLevel = 0;
                        levelRef.once("value", function(levelSnapshot) {
                            if (levelSnapshot.val() != null) {
                                currentLevel = levelSnapshot.val();
                            }
                            levelRef.set(currentLevel + 1);
                        })
                    }
                    if (currentRecord < componentRef.props.numberCorrect) {
                        quizRecordRef.set({
                            Total: componentRef.props.totalQuestions,
                            NumberCorrect: componentRef.props.numberCorrect
                        })
                    } 
                })
            }
        })
        this.props.exitResults();
    }
}

export default QuizResults