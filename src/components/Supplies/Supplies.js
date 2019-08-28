import React, { Component } from 'react';
import update from 'immutability-helper';
import axios from 'axios';
import { Container, ListGroup } from 'react-bootstrap';
import FoodItemForm from './FoodItemForm';
import FoodItem from './FoodItem';
import '../../stylesheets/supplies.css';

export default class Supplies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      supplies: [],
      focusLocked: false
    };
  }  

  componentDidMount() {
    this.fetchFoodItems();
  }

  fetchFoodItems = () => {
    axios.get('/food_items')
      .then(response => {
        this.setState({supplies: response.data})
      });
  }

  addNewItem = (itemName, quantity) => {
    return new Promise((resolve, reject) => {
      let name = itemName.charAt(0).toUpperCase() + itemName.slice(1).toLowerCase();
      axios.post('/food_items', {
        name: name,
        quantity: parseInt(quantity, 10)
      })
        .then(response => {
          this.updateSuppliesList(response.data);
          resolve(true);
        });
    });
  }

  removeFoodItem = (itemId) => {
    const supplies = this.state.supplies.filter(item => item.id !== itemId);
    this.setState({supplies: supplies});
  }

  updateSuppliesList = (item) => {
    const supplies = update(this.state.supplies, {$push: [item]});
    this.setState({supplies: supplies.sort(function(a,b) {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    })});
  }

  lockItemFocus = () => {
    this.setState({focusLocked: true});
  }

  unlockItemFocus = () => {
    this.setState({focusLocked: false});
  }

  render() {
    const foodItems = this.state.supplies.map(item =>
      <FoodItem key={item.id} name={item.name} quantity={item.quantity} id={item.id} removeFoodItem={this.removeFoodItem}
      lockItemFocus={this.lockItemFocus} unlockItemFocus={this.unlockItemFocus} focusLocked={this.state.focusLocked}/>
    );

    return (
      <Container className="supplies">
        <FoodItemForm addNewItem={this.addNewItem}/>
        <ListGroup variant="flush" className="list">
          {foodItems}
        </ListGroup>
      </Container>
    )
  }
}