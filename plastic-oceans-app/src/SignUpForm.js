import React from 'react';
import './index.css';


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
  }

  // create new user callback to transfer the data to the SignUp form
  createNewUser() {

  }

  // update the state for specific sign up form field
  // using javascript event
  handleFormChange(event) {
    let field = event.target.name;
    let value = event.target.value;
    let changes = {}; // object to hold changes in text fields

    

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
      <div>

      </div>
    );
  }
}
