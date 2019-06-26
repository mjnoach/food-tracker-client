import React, { Component } from 'react';
import { Navbar, Container } from 'react-bootstrap';
import LogInForm from './LogInForm'

export default class HeaderWelcome extends Component {
  render() {
    return (
      <div>
        <Navbar expand="lg">
          <Container>
            <Navbar.Brand href="#home">
              <h1 className="brand brand-large">food tracker</h1>
            </Navbar.Brand>
            <LogInForm />
          </Container>
        </Navbar>
      </div>
    )
  }
}