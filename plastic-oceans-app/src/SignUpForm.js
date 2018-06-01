import React from 'react';
import './index.css';
import firebase from 'firebase';
import { Link } from 'react-router-dom';

import { Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';

import NavigationBar from './NavigationBar'

export default class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: undefined,
      lastName: undefined,
      username: undefined,
      email: undefined,
      password: undefined,
      passwordConfirm: undefined,
      location: undefined,
    };

    // put optional this binding here
    this.handleFormChange = this.handleFormChange.bind(this);
  }

  // create new user callback to transfer the data to the SignUp form
  createNewUser(event) {
    event.preventDefault(); //don't submit
    this.props.signUpCallback(this.state.firstName, this.state.lastName, this.state.username, this.state.email, this.state.location, this.state.password);
  }

  // update the state for specific sign up form field
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

    if (validations.usernameTaken) {
      let usernamesTaken = [];
      let usernameTakenResult = false;
      let usersKeyRef = firebase.database().ref('usernames');
      usersKeyRef.on('value', (snapshot) => {
        snapshot.forEach(function (child) {
          usernamesTaken.push(child.key.toLowerCase())
        })
        usernameTakenResult = usernamesTaken.includes((this.state.username + "").toLowerCase());
        if (usernameTakenResult) {
          errors.usernameTaken = true;
          errors.isValid = false;
        }
      });
    }



    if (value !== undefined) { //check validations
      //all fields are required
      if (validations.required && value === '') {
        errors.required = true;
        errors.isValid = false;
      }


      //handle email type
      if (validations.email) {
        //pattern comparison that works 99.99% of the time from
        //http://emailregex.com/ 
        let valid = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/.test(value);
        if (!valid) {
          errors.email = true;
          errors.isValid = false;
        }
      }

      //password minLength
      if (validations.minLength && value.length < validations.minLength) {
        errors.minLength = validations.minLength;
        errors.isValid = false;
      }

      //username maxLength
      if (validations.maxLength && value.length > validations.maxLength) {
        errors.maxLength = validations.maxLength;
        errors.isValid = false;
      }

      //invalid characters are not allowed in first name, last name, and usernames
      if (validations.invalidCharacters) {
        let valid = /^[a-zA-Z]+$/.test(value);
        if (!valid) {
          errors.invalidCharacters = true;
          errors.isValid = false;
        }
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
    // determine how each field should be validated... 
    // define the validationsObj for each text field here
    //field validation
    let firstNameErrors = this.validateFields(this.state.firstName, { required: true, invalidCharacters: true });
    let lastNameErrors = this.validateFields(this.state.lastName, { required: true, invalidCharacters: true });
    var usernameErrors = this.validateFields(this.state.username, { required: true, maxLength: 20, invalidCharacters: true, usernameTaken: true });
    let emailErrors = this.validateFields(this.state.email, { required: true, email: true, emailTaken: true });
    let locationErrors = this.validateFields(this.state.location, { required: true, });
    let passwordErrors = this.validateFields(this.state.password, { required: true, minLength: 8 });
    let passwordConfirmErrors = this.validateFields(this.state.passwordConfirm, { required: true, minLength: 8, match: true });
    let submitDisabled = false;
    let submitState = "primary";

    let emailExists = "";
    let errorAlert = (<div className="hidden"><p></p></div>);

    if(this.props.error !== undefined) {
      emailExists = this.props.error;
      errorAlert = (<div className="alert red-error"><p>{emailExists}</p></div>);
    } else if(this.props.error === undefined) {
      emailExists = null;
      errorAlert = (<div className="hidden"><p></p></div>);
    }

    //set to secondary disabled when errors show
    //button validation
    let signUpEnabled = (firstNameErrors.isValid && lastNameErrors.isValid && usernameErrors.isValid && emailErrors.isValid && locationErrors.isValid && passwordErrors.isValid && passwordConfirmErrors.isValid);

    if (!signUpEnabled) {
      submitDisabled = true;
      submitState = "secondary"
    }


    return (
      <div className="sign-up tinted" role="article">
        <NavigationBar title="Plastic Oceans" />
        <div className="sign-up-container">
          <div className="sign-up-form">
            <h1>sign up</h1>
            {errorAlert}
            <Form>
              <FormGroup onChange={this.handleFormChange}>
                <ValidatedInput type="text" name="firstName" fieldName="First Name" id="first-name" onChange={this.handleFormChange} errors={firstNameErrors} />
              </FormGroup>
              <FormGroup onChange={this.handleFormChange}>
                <ValidatedInput type="text" name="lastName" fieldName="Last Name" id="last-name" onChange={this.handleFormChange} errors={lastNameErrors} />
              </FormGroup>
              <FormGroup onChange={this.handleFormChange}>
                <ValidatedInput type="text" name="username" fieldName="Username" id="username" onChange={this.handleFormChange} errors={usernameErrors} />
              </FormGroup>
              <FormGroup onChange={this.handleFormChange}>
                <ValidatedInput type="email" name="email" fieldName="Email Address" id="email" onChange={this.handleFormChange} errors={emailErrors} />
              </FormGroup>
              <FormGroup onChange={this.handleFormChange}>
                <ValidatedInputLocation type="select" name="location" fieldName="Location" id="location" onChange={this.handleFormChange} errors={locationErrors} options={["", "Urban", "Suburban", "Rural"]} />
              </FormGroup>
              <FormGroup onChange={this.handleFormChange}>
                <ValidatedInput type="password" name="password" fieldName="Password" id="password" onChange={this.handleFormChange} errors={passwordErrors} />
              </FormGroup>
              <FormGroup onChange={this.handleFormChange}>
                <ValidatedInput type="password" name="passwordConfirm" fieldName="Confirm Password" id="password-confirm" onChange={this.handleFormChange} errors={passwordConfirmErrors} />
              </FormGroup>
              <div className="sign-up-button">
                <Button color={submitState} disabled={submitDisabled} onClick={(event) => this.createNewUser(event)}>Submit</Button>
                <p className="no-account">Already have an account? <Link to="/signin">Sign in here.</Link></p>
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
      if (this.props.errors.invalidCharacters) {
        errorMessage += `Invalid ${this.props.fieldName.toLowerCase()}.`;
      }
      if (this.props.errors.email) {
        errorMessage += "Invalid email address.";
      }
      if (this.props.errors.usernameTaken) {
        errorMessage += "Username already in use.";
      }
      if (this.props.errors.emailTaken) {
        errorMessage += "This email address already has an account.";
      }
      if (this.props.errors.maxLength) {
        errorMessage += `${this.props.fieldName} is too long.`;
      }
      if (this.props.errors.minLength) {
        errorMessage += `${this.props.fieldName} must be at least ${this.props.errors.minLength} characters long.`;
      }
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

class ValidatedInputLocation extends React.Component {
  render() {
    let errors = this.props.errors.style != "" ? "invalid" : "";
    let errorMessage = "";

    if (this.props.errors.required) {
      errorMessage = "This field is required.";
    }

    let options = (
      <Input type={this.props.type} name={this.props.name} id={this.props.id} invalid={errors != "" ? true : false}>
        <option>{this.props.options[0]}</option>
        <option>{this.props.options[1]}</option>
        <option>{this.props.options[2]}</option>
        <option>{this.props.options[3]}</option>
      </Input>
    );

    let field = (
      <span>
        <Label for={this.props.name}>{this.props.fieldName}</Label>
        {options}
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
