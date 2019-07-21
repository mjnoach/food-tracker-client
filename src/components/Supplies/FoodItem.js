import React, { Component } from 'react';
import axios from 'axios';
import { ListGroup, Row, Col, Button } from 'react-bootstrap';

export default class FoodItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mouseOver: false,
      quantity: '',
      className: "food-item"
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

  toggleFocusedOn = () => {
    this.setState({
      mouseOver: true,
      className: "food-item food-item-hover"
    });
  }

  toggleFocusedOff = () => {
    this.setState({
      mouseOver: false,
      className: "food-item"
    });
  }

  // incrementQuantity = () => {
  //   axios.put(`/food_items/${this.props.id}`, {
  //     quantity: this.state.quantity + 1
  //   })
  //     .then(response => {
  //       this.setState({
  //         quantity: response.data.quantity
  //       });
  //     })
  //     .catch(error => {});
  // }

  render() {
    return (
      <ListGroup.Item className={this.state.className} 
      onClick={null}
      onMouseEnter={this.toggleFocusedOn} 
      onMouseLeave={this.toggleFocusedOff}>
        <Row className="align-items-center">
          <Col>
            {this.state.mouseOver
              ? <input type="text" className="name" placeholder={this.props.name}/>
              : <span className="name">
                  {this.props.name}
                </span>}
          </Col>
          <Col className="text-center">
            {this.state.mouseOver
              ? <input type="number" className="quantity" placeholder={this.state.quantity}/>
              : <span className="quantity">
                  {this.state.quantity}
                </span>}
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