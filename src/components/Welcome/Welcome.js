import React from 'react';
import { Redirect } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import HeaderWelcome from './HeaderWelcome';
import SignUpForm from './SignUpForm';

const Welcome = () =>

  sessionStorage.getItem('token')
  ? 
    <Redirect to='/app' />
  : 
    <div>
      <HeaderWelcome />
      <Container>
        <SignUpForm />
      </Container>
    </div>

export default Welcome;