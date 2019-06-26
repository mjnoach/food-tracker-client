import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import LogInForm from './LogInForm'

export default class HeaderWelcome extends Component {
  render() {
    return(
      <div>
        <Container>
          <Row>
            <Col md={4}>
              <h1 className="brand-large">food tracker</h1>
            </Col>
            <Col md={{ span: 6, offset: 2 }}>
              <LogInForm />
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}