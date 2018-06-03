import React, { Component } from "react";
import firebase from 'firebase';
import QuizResult from './QuizResult';
import QuizQuestion from './QuizQuestion';

class Quiz extends Component {

    constructor(props) {
        super(props);
        this.state = {
            numberCorrect: 0,
            totalQuestions: 0,
            currentQuestionNum: 1,
            currentCorrectAnswer: "",
            currentAnswers: [],
            currentQuestion: "",
            selectedAnswer: "",
            showResult: false,
            showQuestion: true,
            showFinalResult: false,
            didScore: false,
            currentSource: ""
        };
    }

    render() {
        return(
            <div id="quiz-container">
            {this.state.showResult && (
                <QuizResult 
                selectedAnswer={this.state.selectedAnswer}
                currentCorrectAnswer={this.state.currentCorrectAnswer}
                totalQuestions={this.state.totalQuestions}
                currentQuestionNum={this.state.currentQuestionNum}
                nextQuestion={this.goToNextQuestion.bind(this)}
                didScore={this.state.didScore}
                finishQuiz={this.finishQuiz.bind(this)}
                source={this.state.currentSource}
            />
            )}
            {this.state.showQuestion && (
                <QuizQuestion 
                quizName={this.props.quizName}
                currentQuestion={this.state.currentQuestion}
                currentAnswers={this.state.currentAnswers}
                submitAnswer={(answer) => this.handleSubmitAnswer(answer)}
                />
            )}
            {this.state.showFinalResult && (
                <div id="quiz-final-results">
                    <p className="quiz-result-text">You got {this.state.numberCorrect} of {this.state.totalQuestions} questions correct!</p>
                    <button className="quiz-button" onClick={(e) => this.handleFinishQuiz(e)}>Done</button>
                </div>
            )}
            </div>
        );
    }

    componentDidMount() {
        this.getQuestionCount(this.props.quizName);
        this.setUpQuestion(this.props.quizName);
    }

    handleFinishQuiz(e) {
        // Save quiz results
        // Go back to quiz select screen
        this.props.goBackToQuizSelect();
    }

    finishQuiz() {
        this.setState({
            showQuestion: false,
            showResult: false,
            showFinalResult: true
        })
    }

    goToNextQuestion() {
        var questionNum = this.state.currentQuestionNum + 1
        this.setState({
            currentQuestionNum: questionNum,
        }, () => {
            this.setUpQuestion(this.props.quizName);
        });
        this.setState({
            showResult: false,
            showQuestion: true
        })
    }

    handleSubmitAnswer(answer) {
        this.setState({
            selectedAnswer: answer
        });
        console.log(answer);
        console.log(this.state.currentCorrectAnswer);
        if (answer == this.state.currentCorrectAnswer) {
            this.setState({
                numberCorrect: this.state.numberCorrect + 1,
                didScore: true
            })
        } else {
            this.setState({
                didScore: false
            })
        }
        this.setState({
            showResult: true,
            showQuestion: false
        });
    }

    // Sets up question
    setUpQuestion(quizTitle) {
        var quizRef = firebase.database().ref('/Quizzes/' + quizTitle + '/Question' 
            + this.state.currentQuestionNum);
        var question = "";
        var answers = [];
        var componentRef = this;
        quizRef.on('value', function(snapshot) {
            question = snapshot.val()["Question"];
            answers.push(snapshot.val()["Correct"]);
            answers.push(snapshot.val()["Wrong1"]);
            answers.push(snapshot.val()["Wrong2"]);
            componentRef.setState({
                currentQuestion: question,
                currentCorrectAnswer: snapshot.val()["Correct"],
                currentSource: snapshot.val()["Source"]
            })
        });

        for (let i = answers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [answers[i], answers[j]] = [answers[j], answers[i]];
        }
        this.setState({
            currentAnswers: answers
        })
    }

    // Gets number of questions in selected quiz
    getQuestionCount(quizTitle) {
        var quizRef = firebase.database().ref('/Quizzes/' + quizTitle);
        var count = 0;
        var componentRef = this;
        quizRef.on('value', function(snapshot) {
            snapshot.forEach(function(question) {
                count++;
            });
            componentRef.setState({
                totalQuestions: count
            });
        });
    }

}

export default Quiz;