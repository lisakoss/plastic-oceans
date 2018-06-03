import React from 'react';
import './index.css';
import firebase from 'firebase';

import { Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';

export default class ResetPasswordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: undefined,
      passwordConfirm: undefined,
    };

    // put optional this binding here
    this.handleFormChange = this.handleFormChange.bind(this);
  }

  // sign the user in with the details provided in the form
  resetPassword(event) {
    event.preventDefault(); //don't submit
    let fbCode = this.getParameterByName('oobCode')
    this.props.resetPasswordCallback(fbCode, this.state.password);
  }

  getParameterByName( name ){
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( window.location.href );
    if( results == null )
      return "";
    else
      return decodeURIComponent(results[1].replace(/\+/g, " "));
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

      // handle password confirmation
      if (validations.match) {
        if (this.state.password !== this.state.passwordConfirm) {
          errors.match = true;
          errors.isValid = false;
        }
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
    let passwordErrors = this.validateFields(this.state.password, { required: true, });
    let passwordConfirmErrors = this.validateFields(this.state.passwordConfirm, { required: true, match: true });

    let submitDisabled = false;
    let submitState = "primary";

    //set to secondary disabled when errors show
    //button validation
    let signInEnabled = (passwordErrors.isValid && passwordConfirmErrors.isValid);

    if (!signInEnabled) {
      submitDisabled = true;
      submitState = "secondary"
    }

    return (
      <div className="sign-up tinted" role="article">
        <div className="sign-up-container">
          <div className="sign-up-form">
            <h1 className="forgot-pass">reset password</h1>
            <Form>
              <FormGroup onChange={this.handleFormChange}>
                <ValidatedInput type="password" name="password" fieldName="New Password" id="password" onChange={this.handleFormChange} errors={passwordErrors} />
              </FormGroup>
              <FormGroup onChange={this.handleFormChange}>
                <ValidatedInput type="password" name="passwordConfirm" fieldName="Confirm Password" id="password-confirm" onChange={this.handleFormChange} errors={passwordConfirmErrors} />
              </FormGroup>
              <div className="forgot-button">
                <Button color={submitState} disabled={submitDisabled} onClick={(event) => this.resetPassword(event)}>Reset</Button>
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

    if (this.props.errors.required) {
      errorMessage = "This field is required.";
    } else {
      if (this.props.errors.match) {
        errorMessage += " Passwords do not match.";
      }
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
