import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

export default class FoodItem extends Component {
  render() {
    return (
      <div>
        <Card>
          <Card.Body>
            <h4 className="float-left">{this.props.name}</h4>
            <h5 className="float-right">{this.props.quantity}</h5>
          </Card.Body>
        </Card>
      </div>
    )
  }
}