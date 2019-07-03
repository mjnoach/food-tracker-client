import React, { Component } from 'react';
import { axiosInstance } from '../App.js';
import { withRouter } from 'react-router-dom';
import { logIn, fetchUserData } from '../utils/user_session';
import { Form, Button } from 'react-bootstrap';

class SignUpForm extends Component {
  signUp = () => {
    return new Promise((resolve, reject) => {
      axiosInstance.post('/users', {
        name: this.name.value,
        email: this.email.value,
        password: this.password.value,
        password_confirmation: this.password_confirmation.value
      })
        .then(response => {
          console.log('SignUpForm\n', response);
          let data = JSON.parse(response.config.data);
          let email = data.email;
          let password = data.password;
          resolve([email, password]);
        })
        .catch(error => {
          console.log('SignUpForm\n', error.response.data.errors);
        });
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.signUp()
      .then(([email, password]) => logIn(email, password)
        .then(loggedIn => fetchUserData()
          .then(userData => this.props.history.push('/app'))));
  }

  render() {
    return (
      <div>
        <Form onSubmit={e => this.handleSubmit(e)}>
          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Name" ref={input => this.name = input} defaultValue="Test" />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" ref={input => this.email = input} defaultValue="test@mail.com" />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" ref={input => this.password = input} defaultValue="password" />
          </Form.Group>
          <Form.Group controlId="formBasicPasswordConfirm">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control type="password" placeholder="Confirm password" ref={input => this.password_confirmation = input} defaultValue="password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Sign Up
          </Button>
        </Form>
      </div>
    )
  }
}

export default withRouter(SignUpForm)