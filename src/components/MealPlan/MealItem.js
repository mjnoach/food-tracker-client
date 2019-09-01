import React, { Component } from 'react';
import axios from 'axios';
import { ListGroup, Row, Col, Button } from 'react-bootstrap';

export default class MealItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mouseOver: false,
      className: "",
    }
  }

  deleteItem = (e) => {
    e.stopPropagation();
    axios.delete(`/meals/${this.props.id}`)
      .then(response => {
        this.props.removeMealItem(this.props.id);
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
      <ListGroup.Item className={"list-item " + this.state.className} 
      onMouseMove={this.toggleFocusedOn} onMouseLeave={this.toggleFocusedOff}>
        <Row className="align-items-center">
          <Col>
            <span className="name">
              {this.props.name}
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