import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import LogInForm from './LogInForm'

const HeaderWelcome = () =>

  <Navbar expand="lg">
    <Container>
      <Navbar.Brand href="#home">
        <h1 className="brand brand-large">ft</h1>
      </Navbar.Brand>
      <LogInForm />
    </Container>
  </Navbar>

export default HeaderWelcome;