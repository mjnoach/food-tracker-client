import React, { Component } from 'react';
import axios from 'axios';
import { ListGroup, Row, Col, Button } from 'react-bootstrap';
import withHover from '../withHover';

class MealItem extends Component {

  deleteItem = (e) => {
    e.stopPropagation();
    axios.delete(`/meals/${this.props.id}`)
      .then(response => this.props.removeMealFromList(this.props.id));
  }

  render() {
    return (
      <ListGroup.Item className={"list-item " + this.props.hoverStyle} 
      onMouseMove={this.props.toggleHoverOn} onMouseLeave={this.props.toggleHoverOff}>
        <Row className="align-items-center">
          <Col>
            <span className="name">
              {this.props.name}
            </span>
          </Col>
          <Col className="text-right">
            {this.props.mouseOver && 
            <Button size="sm" variant="danger" type="submit" onClick={this.deleteItem}>
              delete
            </Button>}
          </Col>
        </Row>
      </ListGroup.Item>
    )
  }
}

export default withHover(MealItem);