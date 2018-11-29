import React, { Component } from 'react';
import { connect } from 'react-redux';

// import Input from '../InfoPage/Input';
import Select from "../InfoPage/Select";
// import Button from "../InfoPage/Button";



class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    email: '',
    organization: '',
    phone_number: '',
    is_facilitator: '', 
    is_admin: '',


    is_facilitator_options: [
      { value: false, label: 'False' },
      { value: true, label: 'True' },
    ],
    is_admin_options: [
      { value: false, label: 'False' },
      { value: true, label: 'True' },
    ]
  };

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          username: this.state.username,
          password: this.state.password,
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          email: this.state.email,
          organization: this.state.organization,
          phone_number: this.state.phone_number,
          is_facilitator: this.state.is_facilitator,
          is_admin: this.state.is_admin,
        },
      });
    } else {
      this.props.dispatch({ type: 'REGISTRATION_INPUT_ERROR' });
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }


  render() {
    return (
      <div>
        {this.props.errors.registrationMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.registrationMessage}
          </h2>
        )}
        <form onSubmit={this.registerUser}>
          <h1>Register User</h1>
          <div>
            <label htmlFor="username">
              Username:
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              Password:
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
            </label>
          </div>

          <div>
            <label htmlFor="first_name">
              First Name:
            <input
                type="text"
                name="first_name"
                value={this.state.first_name}
                onChange={this.handleInputChangeFor('first_name')}
              />
            </label>
          </div>

          <div>
            <label htmlFor="last_name">
              Last Name:
            <input
                type="text"
                name="last_name"
                value={this.state.last_name}
                onChange={this.handleInputChangeFor('last_name')}
              />
            </label>
          </div>

          <div>
            <label htmlFor="email">
              Email:
            <input
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChangeFor('email')}
              />
            </label>
          </div>

          <div>
            <label htmlFor="organization">
              Organization:
            <input
                type="text"
                name="organization"
                value={this.state.organization}
                onChange={this.handleInputChangeFor('organization')}
              />
            </label>
          </div>

          <div>
            <label htmlFor="phone_number">
              Phone Number:
            <input
                type="number"
                name="phone_number"
                value={this.state.phone_number}
                onChange={this.handleInputChangeFor('phone_number')}
              />
            </label>

          </div>

          <div>

            <label htmlFor="is_facilitator">
            <Select
                title={"Facilitator"}
                name={"is_facilitator"}
                options={this.state.is_facilitator_options}
                value={this.state.is_facilitator}
                placeholder={"True or False"}
                handleChange={this.handleInputChangeFor('is_facilitator')}
              />
            </label>

          </div>

          <div>

            <label htmlFor="is_admin">
            <Select
                title={"Administrator"}
                name={"is_admin"}
                options={this.state.is_admin_options}
                value={this.state.is_admin}
                placeholder={"True or False"}
                handleChange={this.handleInputChangeFor('is_admin')}
              />
             
            </label>

          </div>

          <div>
            <input
              className="register"
              type="submit"
              name="submit"
              value="Register"
            />
          </div>
        </form>
        {/* <center> */}
        <button
          type="button"
          // className="link-button"
          onClick={() => { this.props.dispatch({ type: 'SET_TO_LOGIN_MODE' }) }}
        >
          Login
          </button>
        {/* </center> */}
      </div >
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({errors});
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(RegisterPage);

