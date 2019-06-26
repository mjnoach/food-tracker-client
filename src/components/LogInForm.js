import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

export default class LogInForm extends Component {
  handleSubmit(e) {
    e.preventDefault();
    axios.post(process.env.REACT_APP_API_URL + '/login', {
      email: this.email.value,
      password: this.password.value,
    })
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    return(
      <div>
        <Form inline onSubmit={e => this.handleSubmit(e)}>
          <Form.Control size="sm" type="email" placeholder="Enter email" ref={input => this.email = input} />
          <Form.Control size="sm" type="password" placeholder="Password" ref={input => this.password = input} />
          <Button size="sm" variant="outline-success" type="submit">Log In</Button>
        </Form>
      </div>
    )
  }
}