import React from 'react';
import './index.css';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: undefined,
      lastName: '',
      username: undefined,
      email: undefined,
      location: '',
      password: undefined,
      passwordConfirm: undefined,
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
  validateFields(formValue, validationsObj) {
    // required

    // min length

    // handle email 

    // handle password confirmation

    // determine errors to display on the form
  }

  render() {
    // determine how each field should be validated... 
    // define the validationsObj for each text field here
    return (
      <Form>
        <FormGroup onChange={this.handleFormChange}>
          <Label for="first-name">First Name</Label>
          <Input type="text" name="firstName" id="first-name" />
        </FormGroup>
        <FormGroup onChange={this.handleFormChange}>
          <Label for="last-name">Last Name</Label>
          <Input type="text" name="lastName" id="last-name" />
        </FormGroup>
        <FormGroup onChange={this.handleFormChange}>
          <Label for="username">Username</Label>
          <Input type="text" name="username" id="username" />
        </FormGroup>
        <FormGroup onChange={this.handleFormChange}>
          <Label for="email">Email</Label>
          <Input type="email" name="email" id="email" />
        </FormGroup>
        <FormGroup onChange={this.handleFormChange}>
          <Label for="select">Select General Location</Label>
          <Input type="select" name="location" id="select">
            <option></option>
            <option>Urban</option>
            <option>Suburban</option>
            <option>Rural</option>
          </Input>
        </FormGroup>
        <FormGroup onChange={this.handleFormChange}>
          <Label for="password">Password</Label>
          <Input type="password" name="password" id="password" />
        </FormGroup>
        <FormGroup onChange={this.handleFormChange}>
          <Label for="password-confirm">Confirm Password</Label>
          <Input type="password" name="passwordConfirm" id="password-confirm" />
        </FormGroup>
        <Button onClick={(event) => this.createNewUser(event)}>Submit</Button>
      </Form>
    );
  }
}
