import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';

import { Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';

export default class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'email': undefined,
      'password': undefined
    };

    // put optional this binding here
    this.handleFormChange = this.handleFormChange.bind(this);
  }

  // sign the user in with the details provided in the form
  signInUser(event) {
    event.preventDefault(); //don't submit
    this.props.signInCallback(this.state.email, this.state.password);
  }

  // update the state for specific sign in form field
  // using javascript event
  handleFormChange(event) {
    let field = event.target.name;
    let value = event.target.value;
    let changes = {}; // object to hold changes in text fields

    changes[field] = value; //change this field
    this.setState(changes); //update state
  }

  // helper func to validate a value based on a hash of validations
  // first parameter is the value from the text field itself
  // second parameter has format e.g., {required: true, minLength: 5, email: true}
  // (for required field, with min length of 5, and valid email)
  validateFields(value, validations) {
    let errors = { isValid: true, style: '' };

    if (value !== undefined) { //check validations
      //all fields are required
      if (validations.required && value === '') {
        errors.required = true;
        errors.isValid = false;
      }
    }

    //display details
    if (!errors.isValid) { //if found errors
      errors.style = 'has-error';
    } else if (value !== undefined) { //valid and has input
      //errors.style = "no-error";
    } else { //valid and no input
      errors.isValid = false; //make false anyway
    }
    return errors; //return data object
  }

  render() {
    let emailErrors = this.validateFields(this.state.email, { required: true, });
    let passwordErrors = this.validateFields(this.state.password, { required: true, });
    let submitDisabled = false;
    let submitState = "primary";
    let incorrectCredentials = "";
    let errorAlert = (<div className="hidden"><p></p></div>);

    if(this.props.error !== undefined) {
      incorrectCredentials = this.props.error;
      errorAlert = (<div className="alert red-error"><p>{incorrectCredentials}</p></div>);
    } else if(this.props.error === undefined) {
      incorrectCredentials = null;
      errorAlert = (<div className="hidden"><p></p></div>);
    }

    //set to secondary disabled when errors show
    //button validation
    let signInEnabled = (emailErrors.isValid && passwordErrors.isValid);

    if (!signInEnabled) {
      submitDisabled = true;
      submitState = "secondary"
    }

    return (
      <div className="sign-up tinted" role="article">
        <div className="sign-up-container">
          <div className="sign-up-form">
            <h1>sign in</h1>
            {errorAlert}
            <Form>
              <FormGroup onChange={this.handleFormChange}>
                <ValidatedInput type="text" name="email" fieldName="Email Address" id="email" onChange={this.handleFormChange} errors={emailErrors} />
              </FormGroup>
              <FormGroup onChange={this.handleFormChange}>
                <ValidatedInput type="password" name="password" fieldName="Password" id="password" onChange={this.handleFormChange} errors={passwordErrors} />
              </FormGroup>
              <div className="sign-up-button">
                <Button color={submitState} disabled={submitDisabled} onClick={(event) => this.signInUser(event)}>Submit</Button>
                <p>Forgot password?</p>
                <p>Don't have an account? <Link to="/signup">Sign up here.</Link></p>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

//A component that displays an input form with validation styling
//props are: field, type, label, changeCallback, errors
class ValidatedInput extends React.Component {
  render() {
    let errors = this.props.errors.style != "" ? "invalid" : "";
    let errorMessage = "";

    console.log("RENDER ARROEERS", this.props.emailError);

    if (this.props.errors.required) {
      errorMessage = "This field is required.";
    }

    let field = (
      <span>
        <Label for={this.props.name}>{this.props.fieldName}</Label>
        <Input type={this.props.type} name={this.props.name} id={this.props.id} invalid={errors != "" ? true : false} />
        <FormFeedback>{errorMessage}</FormFeedback>
      </span>
    );
    return (
      <div>
        {field}
      </div>
    );
  }
}
