import React, { Component } from 'react';
import axios from 'axios';
import { ListGroup, Row, Col, Button } from 'react-bootstrap';

export default class FoodItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      incrementable: true,
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
      <ListGroup.Item className="food-item" onClick={this.state.incrementable && this.incrementQuantity}
      onMouseEnter={() => this.setState({active: true})}
      onMouseLeave={() => this.setState({active: false})}>
        <Row className="align-items-center">
          <Col>
            <span className="name" 
            onMouseEnter={() => this.setState({incrementable: false})}
            onMouseLeave={() => this.setState({incrementable: true})}>
              {this.props.name}
            </span>
          </Col>
          <Col className="text-center">
            <span className="quantity" 
            onMouseEnter={() => this.setState({incrementable: false})}
            onMouseLeave={() => this.setState({incrementable: true})}>
              {this.state.quantity}
            </span>
          </Col>
          <Col className="text-right">
            {this.state.active && 
            <Button size="sm" variant="danger" type="submit" onClick={this.deleteItem}
            onMouseEnter={() => this.setState({incrementable: false})}
            onMouseLeave={() => this.setState({incrementable: true})}>
              delete
            </Button>}
          </Col>
        </Row>
      </ListGroup.Item>
    )
  }
}