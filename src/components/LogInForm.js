import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

class LogInForm extends Component {
  fetchUserData() {
    axios.get(process.env.REACT_APP_API_URL + '/users/' + sessionStorage.getItem('uid'), {
      headers: {
        Authorization: sessionStorage.getItem('token')
      }
    })
      .then(response => {
        console.log(response.data);
        sessionStorage.setItem('user', response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post(process.env.REACT_APP_API_URL + '/login', {
      email: this.email.value,
      password: this.password.value,
    })
      .then(response => {
        sessionStorage.setItem('token', response.data.token);
        sessionStorage.setItem('uid', response.data.uid);
        this.fetchUserData();
        this.props.history.push('/app');
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <Form inline onSubmit={this.handleSubmit}>
          <Form.Text >
            <Form.Control size="sm" type="email" placeholder="Enter email" ref={input => this.email = input} />
            <Form.Control size="sm" type="password" placeholder="Password" ref={input => this.password = input} />
            <Button size="sm" variant="outline-primary" type="submit">Log In</Button>
          </Form.Text>
        </Form>
      </div>
    )
  }
}

export default withRouter(LogInForm)