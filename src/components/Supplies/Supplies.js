import React, { Component } from 'react';
import update from 'immutability-helper';
import axios from 'axios';
import FoodItem from './FoodItem';
import { Container, Form, Button } from 'react-bootstrap';

export default class Supplies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      supplies: []
    };
  }  

  componentDidMount() {
    axios.get('/food_items')
      .then(response => {
        this.setState({supplies: response.data})
      })
      .catch(error => {});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let name = this.name.value.charAt(0).toUpperCase() + this.name.value.slice(1).toLowerCase();
    axios.post('/food_items', {
      name: name,
      quantity: parseInt(this.quantity.value, 10)
    })
      .then(response => {
        this.updateSuppliesList(response.data);
      })
      .catch(error => {});
  }

  updateSuppliesList = (item) => {
    const supplies = update(this.state.supplies, {$push: [item]});
    this.setState({supplies: supplies.sort(function(a,b) {
      if(a.name < b.name) return -1;
      if(a.name > b.name) return 1;
      return 0;
    })});
  }

  render() {
    let items = this.state.supplies.map(item => {
      return (
        <FoodItem key={item.id} name={item.name} quantity={item.quantity} />
      )
    });

    return (
      <div>
        <Container>
          <Form inline onSubmit={this.handleSubmit}>
            <Form.Control size="sm" type="text" placeholder="name" ref={input => this.name = input} defaultValue="Test" />
            <Form.Control size="sm" type="number" placeholder="quantity" ref={input => this.quantity = input} defaultValue="1" />
            <Button size="sm" variant="light" type="submit">Add item</Button>
          </Form>
          <b>
            <div className="float-left">name</div>
            <div className="float-right">quantity</div>
          </b>
          <br/>
          { items }
        </Container>
      </div>
    )
  }
}