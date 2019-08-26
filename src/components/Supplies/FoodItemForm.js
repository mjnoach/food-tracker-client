import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

export default class FoodItemForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addNewItem(this.name.value, this.quantity.value)
      .then(itemAdded => {
        this.name.value = '';
        this.quantity.value = '1';    
      });
  }

  render() {
    return (
      <div className="action-bar">
        <Form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Name" ref={input => this.name = input}/>
          <input type="number" placeholder="Quantity" className="quantity" ref={input => this.quantity = input} defaultValue='1'/>
          <Button variant="light" type="submit">Add</Button>
        </Form>
      </div>
    )
  }
}