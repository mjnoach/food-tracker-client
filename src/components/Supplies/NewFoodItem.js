import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

export default class NewFoodItem extends Component {
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
      <div className="new-food-item">
        <Form className="align-middle" onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Name" ref={input => this.name = input}/>
          <input type="number" placeholder="Quantity" className="quantity" ref={input => this.quantity = input} defaultValue='1'/>
          <Button size="sm" variant="light" type="submit">Add</Button>
        </Form>
      </div>
    )
  }
}