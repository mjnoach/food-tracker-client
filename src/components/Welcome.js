import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import HeaderWelcome from './HeaderWelcome';
import SignUpForm from './SignUpForm';

export default class Welcome extends Component {
  render() {
    return(
      <div>
        <Container>
          <HeaderWelcome />
          <SignUpForm />
        </Container>
      </div>
    )
  }
}