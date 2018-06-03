import React, { Component } from "react";

class QuizResult extends Component {
    render() {
        return (
            <div id="result-container">
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

export default QuizResult;