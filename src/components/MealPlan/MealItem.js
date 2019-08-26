import React, { Component } from 'react';
import axios from 'axios';
import { ListGroup, Row, Col, Button } from 'react-bootstrap';

export default class MealItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mouseOver: false,
      name: this.props.name,
      className: "",
      variant: "",
    }
  }

  deleteItem = (e) => {
    e.stopPropagation();
    axios.delete(`/food_items/${this.props.id}`)
      .then(response => {
        this.props.removeFoodItem(this.props.id);
      });
  }

  toggleFocusedOn = () => {
    this.setState({
      mouseOver: true,
      className: "list-item-hover"
    });
  }

  toggleFocusedOff = () => {
    this.setState({
      mouseOver: false,
      className: ""
    });
  }

  render() {
    return (
      <ListGroup.Item className={"list-item " + this.state.className} variant={this.state.variant}
      onMouseMove={this.toggleFocusedOn} 
      onMouseLeave={this.toggleFocusedOff}>
        <Row className="align-items-center">
          <Col>
            <span className="name">
              {this.state.name}
            </span>
          </Col>
          <Col className="text-right">
            {this.state.mouseOver && 
            <Button size="sm" variant="danger" type="submit" onClick={this.deleteItem}>
              delete
            </Button>}
          </Col>
        </Row>
      </ListGroup.Item>
    )
  }
}