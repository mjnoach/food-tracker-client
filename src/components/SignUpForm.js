import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

export default class Welcome extends Component {
  handleSubmit(e) {
    axios.post(
      '/users'
    );    
  }

  render() {
    return(
      <div>
        <Form onSubmit={e => this.handleSubmit(e)}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group controlId="formBasicPasswordConfirm">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control type="password" placeholder="Confirm password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Sign Up
          </Button>
        </Form>
      </div>
    )
  }
}