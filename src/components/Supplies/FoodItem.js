import React, { Component } from 'react';
import axios from 'axios';
import { ListGroup, Row, Col, Button } from 'react-bootstrap';

export default class FoodItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showButtons: false,
      quantity: ''
    }
  }

  componentDidMount() {
    this.setState({
      quantity: this.props.quantity
    });
  }

  incrementQuantity = () => {
    axios.put(`/food_items/${this.props.id}`, {
      quantity: this.state.quantity + 1
    })
      .then(response => {
        this.setState({
          quantity: response.data.quantity
        });
      })
      .catch(error => {});
  }

  deleteItem = (e) => {
    e.stopPropagation();
    axios.delete(`/food_items/${this.props.id}`)
      .then(response => {
        this.props.removeFoodItem(this.props.id);
      })
      .catch(error => {});
  }

  render() {
    return (
      <ListGroup.Item className="food-item" onClick={this.incrementQuantity}
        onMouseEnter={() => this.setState({showButtons: true})}
        onMouseLeave={() => this.setState({showButtons: false})}>
        <Row className="align-items-center">
          <Col>
            <span className="name">{this.props.name}</span>
          </Col>
          <Col className="text-center">
            <span className="quantity">{this.state.quantity}</span>
          </Col>
          <Col className="text-right">
            {this.state.showButtons && 
            <Button size="sm" variant="danger" type="submit" onClick={this.deleteItem}>delete</Button>}
          </Col>
        </Row>
      </ListGroup.Item>
    )
  }
}