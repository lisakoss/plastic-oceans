import React, { Component } from "react";
import firebase from 'firebase';

class QuizAnswer extends Component {
    componentWillMount() {
        // Add a listener and callback for authentication events
        this.unregister = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({ userId: user.uid });
            }
            else {
                this.setState({ userId: null }); // null out the saved state if not logged in
                this.props.history.push('/signin'); // redirect to home page
            }
        });
    }
    
    // unregister saved funcs
    componentWillUnmount() {
        if (this.unregister) {
            this.unregister();
        }
    }
    
    render() {
        return (
            <div id="answer-container">
                {this.props.didScore ? (
                    <div>
                    <h2>Correct!</h2>
                    <p>{this.props.selectedAnswer} is the correct answer.</p>
                    <a href={this.props.source} target="_blank">Learn More</a>
                </div>
                ) : (
                    <div>
                        <h2>Incorrect!</h2>
                        <p>{this.props.selectedAnswer} is not the right answer. {this.props.currentCorrectAnswer} is the correct answer.</p>
                        <a href={this.props.source} target="_blank">Learn More</a>
                    </div>
                )}
                {(this.props.currentQuestionNum != this.props.totalQuestions) ? (
                    <button onClick={(e) => this.handleNextButtonClick(e)} className="quiz-button">Next</button>) 
                : (
                    <button onClick={(e) => this.handleDoneButtonClick(e)} className="quiz-button">Done</button>
                )
                } 
            </div>
        );
    }

    handleDoneButtonClick(e) {
        this.props.finishQuiz();
    }

    handleNextButtonClick(e) {
        this.props.nextQuestion();
    }
}

export default QuizAnswer;