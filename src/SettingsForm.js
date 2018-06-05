import React from 'react';
import './index.css';
import firebase from 'firebase';
import { Link } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';

import { Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';

import NavigationBar from './NavigationBar';
import Logout from './Logout';

export default class SettingsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      oldUsername: '',
      avatar: '',
      email: '',
      password: undefined,
      passwordConfirm: undefined,
      location: '',
      showLogout: window.innerWidth < 700 ? true : false, 
      width: 0,
    };

    // put optional this binding here
    this.handleFormChange = this.handleFormChange.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  // executed when the component appears on the screen
  componentDidMount() {
    // Add a listener and callback for authentication events
    window.addEventListener('resize', this.updateWindowDimensions);
    this.setState({ width: window.innerWidth });

    if (this.state.width <= 700) {
      this.setState({ showLogout: true });
    } else {
      this.setState({ showLogout: false });
    }

    this.unregister = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ userId: user.uid });
        var profileRef = firebase.database().ref('users/' + this.state.userId);
        profileRef.once("value")
          .then(snapshot => {
            this.setState({ firstName: snapshot.child("firstName").val() });
            this.setState({ lastName: snapshot.child("lastName").val() });
            this.setState({ username: snapshot.child("username").val() });
            this.setState({ oldUsername: snapshot.child("username").val() });
            if (snapshot.child("avatar").val() === null) {
              this.setState({ avatar: '' });
            } else {
              this.setState({ avatar: snapshot.child("avatar").val() });
            }
            this.setState({ email: snapshot.child("email").val() });
            this.setState({ location: snapshot.child("location").val() });

          });
      }
      else {
        this.setState({ userId: null }); // null out the saved state if not logged in
        this.setState({ firstName: null });
        this.setState({ lastName: null });
        this.setState({ username: null });
        this.setState({ avatar: null });
        this.setState({ email: null });
        this.setState({ location: null });
        this.setState({ password: null });
        this.setState({ passwordConfirm: null });
        this.props.history.push('/signin'); // redirect to home page
      }
    });
  }

  // unregister saved funcs
  componentWillUnmount() {
    firebase.database().ref('users/' + this.state.userId).off();
    if (this.unregister) {
      this.unregister();
    }
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });

    if (this.state.width <= 700) {
      this.setState({ showLogout: true });
    }
  }

  // create new user callback to transfer the data to the SignUp form
  updateProfile(event) {
    event.preventDefault(); //don't submit
    this.props.settingsCallback(this.state.firstName, this.state.lastName, this.state.username, this.state.avatar, this.state.email, this.state.location, this.state.password);
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
        if (usernameTakenResult && this.state.username !== this.state.oldUsername) {
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

      if (validations.avatar) {
        fetch(value)
          .then(response => response.blob())
          .then(blob => {
            if (blob.type !== ("image/gif" || "image/jpeg" || "image/png" || "image/svg+xml")) {
              errors.avatar = true;
              errors.isValid = false;
            }
          })

        //let valid = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/.test(value);
        // if (!valid && value !== "") {
        //errors.avatar = true;
        //errors.isValid = false;
        //}
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

      //invalid characters are not allowed in usernames
      if (validations.invalidCharacters) {
        let valid = /^[a-zA-Z]+$/.test(value);
        if (!valid) {
          errors.invalidCharacters = true;
          errors.isValid = false;
        }
      }

      //allows one space and hyphen in names
      if (validations.name) {
        let valid = /^[a-zA-Z]+[ -]*[a-zA-Z]+$/.test(value);
        if(!valid) {
          errors.name = true;
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
    let firstNameErrors = this.validateFields(this.state.firstName, { required: true, name: true });
    let lastNameErrors = this.validateFields(this.state.lastName, { required: true, name: true });
    var usernameErrors = this.validateFields(this.state.username, { required: true, maxLength: 20, invalidCharacters: true, usernameTaken: true });
    let emailErrors = this.validateFields(this.state.email, { required: true, email: true, emailTaken: true });
    let avatarErrors = this.validateFields(this.state.avatar, { avatar: true });
    let locationErrors = this.validateFields(this.state.location, { required: true, });
    let passwordErrors = this.validateFields(this.state.password, { required: true, minLength: 8 });
    let passwordConfirmErrors = this.validateFields(this.state.passwordConfirm, { required: true, minLength: 8, match: true });
    let submitDisabled = false;
    let submitState = "primary";
    let logout = null;

    let emailExists = "";
    let errorAlert = (<div className="hidden"><p></p></div>);

    if (this.props.error !== undefined) {
      emailExists = this.props.error;
      errorAlert = (<div className="alert red-error"><p>{emailExists}</p></div>);
    } else if (this.props.error === undefined) {
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

    let img = null;

    if (this.state.avatar === '' || this.state.avatar === null || this.state.avatar === undefined) {
      img = (<img className="settings-avatar" src="https://d30y9cdsu7xlg0.cloudfront.net/png/630729-200.png" alt="profile icon" />);
    } else {
      img = (<Avatar className="settings-avatar" width="150" alt="profile icon" src={this.state.avatar} />);
    }

    if (this.state.showLogout) {
      logout = <Logout />
    }

    return (
      <div className="settings tinted" role="article">
        <NavigationBar title="Settings" selected="settings" />
        <div className="settings-container">

          <div className="settings-form">


            <h1 className="settings-h1">manage account</h1>
            {errorAlert}
            <Form>
              {img}
              <FormGroup onChange={this.handleFormChange}>
                <ValidatedInput type="text" name="firstName" value={this.state.firstName} fieldName="First Name" id="first-name" onChange={this.handleFormChange} errors={firstNameErrors} />
              </FormGroup>
              <FormGroup onChange={this.handleFormChange}>
                <ValidatedInput type="text" name="lastName" value={this.state.lastName} fieldName="Last Name" id="last-name" onChange={this.handleFormChange} errors={lastNameErrors} />
              </FormGroup>
              <FormGroup onChange={this.handleFormChange}>
                <ValidatedInput type="text" name="username" value={this.state.username} fieldName="Username" id="username" onChange={this.handleFormChange} errors={usernameErrors} />
              </FormGroup>
              <FormGroup onChange={this.handleFormChange}>
                <ValidatedInput type="text" name="avatar" value={this.state.avatar} fieldName="Avatar" id="avatar" onChange={this.handleFormChange} errors={avatarErrors} />
              </FormGroup>
              <FormGroup onChange={this.handleFormChange}>
                <ValidatedInput type="email" name="email" value={this.state.email} fieldName="Email Address" id="email" onChange={this.handleFormChange} errors={emailErrors} />
              </FormGroup>
              <FormGroup onChange={this.handleFormChange}>
                <ValidatedInputLocation type="select" value={this.state.location} name="location" fieldName="Location" id="location" onChange={this.handleFormChange} errors={locationErrors} options={["", "Urban", "Suburban", "Rural"]} />
              </FormGroup>
              <FormGroup onChange={this.handleFormChange}>
                <ValidatedInput type="password" name="password" fieldName="Password" id="password" onChange={this.handleFormChange} errors={passwordErrors} />
              </FormGroup>
              <FormGroup onChange={this.handleFormChange}>
                <ValidatedInput type="password" name="passwordConfirm" fieldName="Confirm Password" id="password-confirm" onChange={this.handleFormChange} errors={passwordConfirmErrors} />
              </FormGroup>
              <div className="settings-btn">
                <Button color={submitState} disabled={submitDisabled} onClick={(event) => this.updateProfile(event)}>SAVE</Button>
                {logout}
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
      if (this.props.errors.invalidCharacters || this.props.errors.name) {
        errorMessage += `Invalid ${this.props.fieldName.toLowerCase()}.`;
      }
      if (this.props.errors.email) {
        errorMessage += "Invalid email address.";
      }
      if (this.props.errors.avatar) {
        errorMessage += "The avatar URL is invalid.";
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
        <Input type={this.props.type} value={this.props.value} name={this.props.name} id={this.props.id} invalid={errors != "" ? true : false} />
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
      <Input type={this.props.type} value={this.props.value} name={this.props.name} id={this.props.id} invalid={errors != "" ? true : false}>
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
