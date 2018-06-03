import React, { Component } from 'react';
import logo from './logo.svg';
import { Route, Switch, Link } from 'react-router-dom';
import Opening from './Opening';
import Footprint from './Footprint';
import NavigationBar from './NavigationBar';

import SignUp from './SignUp';
import SignIn from './SignIn';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword'
import Profile from './Profile';
import Settings from './Settings';
import Quizzes from './Quizzes';
import QuizQuestion from './Quiz';
import Quiz from './Quiz';
import Discover from './Discover';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentScreen: "Opening",
      currentQuiz: "",
      isUserLoggedIn: false,
      userName: "Username",
    };
  }

  render() {
    console.log(this.state.currentScreen)
    return (
      <div role="main">
        <Switch>
          <Route exact path="/" component={Opening} />
          <Route exact path="/Footprint" component={Footprint}/>
          <Route exact path="/quizzes" component={Quizzes}/>
          <Route exact path="/quizzes/:quizID" component={Quiz}/>
          <Route exact path="/signup" component={SignUp}/>
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/forgot" component={ForgotPassword} />
          <Route exact path="/reset" component={ResetPassword} />
          <Route exact path="/profile/:profileID" component={Profile} />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/discover" component={Discover} />
        </Switch> 

        {(this.state.currentScreen == "Quizzes") && (
          <Quizzes 
          chooseQuiz={(screenID, quizTitle) => {
              this.changeScreenState(screenID);
              this.changeQuizState(quizTitle);
            }
          }
          />
        )}
        {(this.state.currentScreen == "Enter Quiz") && (
          <Quiz
            quizName={this.state.currentQuiz}
            goBackToQuizSelect={() => this.changeScreenState("Quizzes")}
          />
        )}
        {this.state.isUserLoggedIn && (
          <NavigationBar 
          changeScreen={(screenID) => this.changeScreenState(screenID)}
          userName={this.state.userName}
          />
        )}
      </div>
    );
  }

  changeScreenState(screenID) {
    this.setState( {currentScreen: screenID} );
    if (this.state.currentScreen != "Enter Quiz") {
      this.setState({currentQuiz: ""});
    }
  }

  changeQuizState(quizName) {
    this.setState( {currentQuiz: quizName} );
  }
}
export default App;
