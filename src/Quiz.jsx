import React, { Component } from "react";
import firebase from 'firebase';
import QuizResult from './QuizAnswer';
import QuizQuestion from './QuizQuestion';
import NavigationBar from './NavigationBar';
import QuizAnswer from "./QuizAnswer";
import QuizResults from "./QuizResults";

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
        return (
            <div id="quiz-container">
                <NavigationBar title="Quizzes" selected="quizzes" />
                    {this.state.showResult && (
                        <QuizAnswer 
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
                        <QuizResults 
                            numberCorrect={this.state.numberCorrect}
                            totalQuestions={this.state.totalQuestions}
                            exitResults={this.exitResults.bind(this)}
                            quizName={this.props.match.params.quizID}
                        />
                    )}
                </div>
        );
    }

    componentDidMount() {
        let quizName = this.props.match.params.quizID;
        this.getQuestionCount(quizName);
        this.setUpQuestion(quizName);

        this.setState({ quizName: quizName })
    }

    exitResults() {
        this.props.history.push(`/quizzes/`);
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
            this.setUpQuestion(this.state.quizName);
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
        quizRef.on('value', function (snapshot) {
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
        quizRef.on('value', function (snapshot) {
            snapshot.forEach(function (question) {
                count++;
            });
            componentRef.setState({
                totalQuestions: count
            });
        });
    }

}

export default Quiz;
