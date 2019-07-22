import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import HeaderWelcome from './HeaderWelcome';
import SignUpForm from './SignUpForm';

export default class Welcome extends Component {
  render() {
    if (sessionStorage.getItem('token'))
      return (
        <Redirect to='/app' />
      )
    else 
      return (
        <div>
          <HeaderWelcome />
          <Container>
            <SignUpForm />
          </Container>
        </div>
      )
  }
}