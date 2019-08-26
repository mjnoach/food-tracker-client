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
      className: "",
      variant: "",
      edited: false
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
    if (!this.props.focusLocked)
      this.setState({
        mouseOver: true,
        className: "list-item-hover"
      });
  }

  toggleFocusedOff = () => {
    if (!this.props.focusLocked)
      this.setState({
        mouseOver: false,
        className: ""
      });
  }

  lockItemFocus = () => {
    if (!this.props.focusLocked)
      this.props.lockItemFocus();
  }

  unlockItemFocus = () => {
    this.props.unlockItemFocus();
    this.setState({
      mouseOver: false,
      className: ""
    });
  }

  handleKeyDown = (e) => {
    if (e.key === 'Enter')
      this.submitEditedItem();
  }

  updateFoodItem = (obj) => {
    return new Promise((resolve, reject) => {
      axios.put(`/food_items/${this.props.id}`, obj)
      .then(response => {
        resolve(true);
      })
      .catch(error => {
        reject(Object.keys(obj));
      });
    });
  }

  submitEditedItem = () => {
    if (this.state.edited) {
      this.updateFoodItem({
        [this.name.name]: this.name.value,
        [this.quantity.name]: this.quantity.value
      })
        .then(updated => {
          this.flashUpdateStatus("success");
        })
        .catch(failedProps => {
          failedProps.forEach(item => {
            this.setState({[item]: [this.props[item]]});
          });
          this.flashUpdateStatus("error");
        })
        .finally(() => {
          this.unlockItemFocus();
          this.toggleFocusedOff();
          this.setState({edited: false});
        });
    }
    else {
      this.unlockItemFocus();
      this.toggleFocusedOff();
    } 
  }

  flashUpdateStatus = (type = "success") => {
    if (type === "error")
      type = "light";
    this.setState({variant: type});
    setTimeout(() => this.setState({variant: ""}), 300);                        // TODO
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      edited: true
    });
  }

  render() {
    return (
      <ListGroup.Item className={"list-item " + this.state.className} variant={this.state.variant}
      onMouseMove={this.toggleFocusedOn} 
      onMouseLeave={this.toggleFocusedOff}>
        <Row className="align-items-center">
          <Col>
            {this.state.mouseOver
              ? <input type="text" name="name" ref={input => this.name = input} className="name" value={this.state.name} 
                autoComplete="off" tabIndex='1' 
                onChange={this.handleInputChange} onKeyDown={this.handleKeyDown}
                onFocus={this.lockItemFocus} onBlur={this.unlockItemFocus}/>
              : <span className="name">
                  {this.state.name}
                </span>}
          </Col>
          <Col className="text-center">
            {this.state.mouseOver
              ? <input type="number" name="quantity" ref={input => this.quantity = input} className="quantity" value={this.state.quantity}  
                autoComplete="off" tabIndex='2'
                onChange={this.handleInputChange} onKeyDown={this.handleKeyDown}
                onFocus={this.lockItemFocus} onBlur={this.unlockItemFocus}/>
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