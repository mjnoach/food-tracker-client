import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import SignUpForm from './SignUpForm';

export default class Welcome extends Component {
  render() {
    return(
      <div>
        <Container>
          <h1 className="brand-large">food tracker</h1>
          <SignUpForm />
        </Container>
      </div>
    )
  }
}