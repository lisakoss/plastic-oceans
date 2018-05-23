import React from 'react';
import './index.css';

import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

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
          <Label for="email">Email</Label>
          <Input type="text" name="email" id="email" />
        </FormGroup>
        <FormGroup onChange={this.handleFormChange}>
          <Label for="password">Password</Label>
          <Input type="password" name="password" id="password" />
        </FormGroup>
        <Button onClick={(event) => this.signInUser(event)}>Submit</Button>
      </Form>
    );
  }
}
