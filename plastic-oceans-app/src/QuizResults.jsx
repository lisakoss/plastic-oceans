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
                quizRecordRef.on("value", function(snapshot) {
                    if (snapshot.val() != null) {
                        currentRecord = snapshot.val()["NumberCorrect"];
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


        // Go back to quiz select screen
        this.props.exitResults();
    }
}

export default QuizResults