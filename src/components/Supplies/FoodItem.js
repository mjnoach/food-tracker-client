import React, { Component } from 'react';
import axios from 'axios';
import { ListGroup, Row, Col, Button } from 'react-bootstrap';

export default class FoodItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mouseOver: false,
      name: this.props.name,
      quantity: this.props.quantity,
      className: "food-item",
      variant: ""
    }
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
    !this.props.focusLocked &&
    this.setState({
      mouseOver: true,
      className: "food-item food-item-hover"
    });
  }

  toggleFocusedOff = () => {
    !this.props.focusLocked &&
    this.setState({
      mouseOver: false,
      className: "food-item"
    });
  }

  updateFoodItem = (properties) => {
    return new Promise((resolve, reject) => {
      axios.put(`/food_items/${this.props.id}`, properties)
      .then(response => {
        this.setState({
          quantity: response.data.quantity
        });
        resolve(true);
      })
      .catch(error => {
        reject(Object.keys(properties));
      });
    });
  }

  lockItemFocus = () => {
    if (!this.props.focusLocked) {
      this.props.lockItemFocus();
    }
  }

  unlockItemFocus = () => {
    this.props.unlockItemFocus();
    this.setState({
      mouseOver: false,
      className: "food-item"
    });
  }

  handleKeyDown = (e) => {
    e.persist();
    if (e.key === 'Enter')
      this.submitEditedItem(e.target);
  }

  submitEditedItem = (target) => {
    this.updateFoodItem({[target.name]: target.value})
      .then(updated => {
        // this.toggleFocusedOff();
        this.flashUpdateStatus("success");
      })
      .catch(failedProps => {
        failedProps.forEach(item => {
          this.setState({[item]: [this.props[item]]});
        });
        // this.unlockItemFocus();
        this.flashUpdateStatus("error");
      })
      .finally(() => {
        this.unlockItemFocus();
        this.toggleFocusedOff();
      });
  }

  flashUpdateStatus = (type = "success") => {
    if (type === "error")
      type = "light";
    this.setState({variant: type});
    setTimeout(() => this.setState({variant: ""}), 300);
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <ListGroup.Item className={this.state.className} variant={this.state.variant}
      onMouseMove={this.toggleFocusedOn} 
      onMouseLeave={this.toggleFocusedOff}>
        <Row className="align-items-center">
          <Col>
            {this.state.mouseOver
              ? <input type="text" name="name" className="name" value={this.state.name} 
              onChange={this.handleInputChange}
              onFocus={this.lockItemFocus} onBlur={this.unlockItemFocus}
              onKeyDown={this.handleKeyDown}/>
              : <span className="name">
                  {this.state.name}
                </span>}
          </Col>
          <Col className="text-center">
            {this.state.mouseOver
              ? <input type="number" name="quantity" className="quantity" value={this.state.quantity} 
              onChange={this.handleInputChange}
              onFocus={this.lockItemFocus} onBlur={this.unlockItemFocus}
              onKeyDown={this.handleKeyDown}/>
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