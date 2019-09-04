import React, { Component } from 'react';
import axios from 'axios';
import { ListGroup, Row, Col, Button } from 'react-bootstrap';
import withHover from '../withHover';

class FoodItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      quantity: this.props.quantity,
      edited: false
    }
  }

  deleteItem = (e) => {
    e.stopPropagation();
    axios.delete(`/food_items/${this.props.id}`)
      .then(response => this.props.removeItemFromList(this.props.id));
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      edited: true
    });
  }

  handleKeyDown = (e) => {
    if (e.key === 'Enter')
      this.submitEditedItem();
  }

  updateFoodItem = (editedProps) => {
    return new Promise((resolve, reject) => {
      axios.put(`/food_items/${this.props.id}`, editedProps)
      .then(response => resolve(true))
      .catch(error => reject(Object.keys(editedProps)));
    });
  }

  inputData = () => {
    const data = {
      name: this.name.value,
      quantity: this.quantity.value
    }
    return data;
  }

  submitEditedItem = () => {
    if (this.state.edited) {
      this.updateFoodItem(this.inputData())
        .then(updated => this.flashUpdateStatus("success"))
        .catch(failedProps => {
          this.undoEdit(failedProps);
          this.flashUpdateStatus("error");
        });
    }
    this.setState({edited: false});
    this.props.unlockFocus();
    this.props.toggleHoverOff();
  }

  undoEdit = (failedProps) => {
    failedProps.forEach(item => 
      this.setState({[item]: this.props[item]}));
  }

  flashUpdateStatus = (type = "success") => {
    if (type === "error")
      type = "light";
    this.setState({variant: type});
    setTimeout(() => this.setState({variant: ""}), 300);                        // TODO
  }

  render() {
    return (
      <ListGroup.Item className={"list-item " + this.props.hoverStyle} variant={this.state.variant}
      onMouseMove={this.props.toggleHoverOn} onMouseLeave={this.props.toggleHoverOff}>
        <Row className="align-items-center">
          <Col>
            {this.props.mouseOver
              ? <input type="text" name="name" ref={input => this.name = input} className="name" value={this.state.name} 
                autoComplete="off" tabIndex='1' 
                onChange={this.handleInputChange} onKeyDown={this.handleKeyDown}
                onFocus={this.props.lockFocus} onBlur={this.props.unlockFocus}/>
              : <span className="name">
                  {this.state.name}
                </span>}
          </Col>
          <Col className="text-center">
            {this.props.mouseOver
              ? <input type="number" name="quantity" ref={input => this.quantity = input} className="quantity" value={this.state.quantity}  
                autoComplete="off" tabIndex='2'
                onChange={this.handleInputChange} onKeyDown={this.handleKeyDown}
                onFocus={this.props.lockFocus} onBlur={this.props.unlockFocus}/>
              : <span className="quantity">
                  {this.state.quantity}
                </span>}
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

export default withHover(FoodItem);