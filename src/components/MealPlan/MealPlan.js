import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import Weekday from './Weekday';

export default class MealPlan extends Component {
  render() {
    return (
      <Container>
        <Weekday name="Monday" />
        <Weekday name="Teusday" />
        <Weekday name="Wednesday" />
        <Weekday name="Thursday" />
        <Weekday name="Friday" />
        <Weekday name="Saturday" />
        <Weekday name="Sunday" />
      </Container>
    )
  }
}