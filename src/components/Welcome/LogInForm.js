import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { logIn, fetchUserData } from '../../user_session';
import { Form, Button } from 'react-bootstrap';

class LogInForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    logIn(this.email.value, this.password.value)
      .then(loggedIn => fetchUserData()
        .then(userData => this.props.history.push('/app')));
  }

  render() {
    return (
      <Form inline onSubmit={this.handleSubmit}>
        <Form.Text >
          <Form.Control size="sm" type="email" placeholder="Enter email" ref={input => this.email = input} defaultValue="test@mail.com" />
          <Form.Control size="sm" type="password" placeholder="Password" ref={input => this.password = input} defaultValue="password" />
          <Button size="sm" variant="primary" type="submit">Log In</Button>
        </Form.Text>
      </Form>
    )
  }
}

export default withRouter(LogInForm)