import React, { Component } from 'react';
import axios from 'axios';
import { Container, ListGroup } from 'react-bootstrap';
import FoodItemForm from './FoodItemForm';
import FoodItem from './FoodItem';
import withList from '../withList';
import '../../stylesheets/supplies.css';

class Supplies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      supplies: [],
    };
  }

  componentDidMount() {
    this.fetchFoodItems();
  }

  fetchFoodItems = () => {
    axios.get('/food_items')
      .then(response => this.setState({supplies: response.data}));
  }

  createNewFoodItem = (itemName, quantity) => {
    let name = itemName.charAt(0).toUpperCase() + itemName.slice(1).toLowerCase();
    return axios.post('/food_items', {
      name: name,
      quantity: parseInt(quantity)
    })
      .then(foodItem => this.addItemToList(foodItem.data));
  }

  addItemToList = (item) => {
    const supplies = this.props.addItemToList(item, this.state.supplies);
    this.setState({supplies: supplies});
  }

  removeItemFromList = (deletedId) => {
    const supplies = this.state.supplies.filter(item => item.id !== deletedId);
    this.setState({supplies: supplies});
  }

  render() {
    const foodItems = this.state.supplies.map(item =>
      <FoodItem key={item.id} name={item.name} quantity={item.quantity} id={item.id} 
      toggleItemFocus={this.props.toggleItemFocus} focusLocked={this.props.focusLocked}
      removeItemFromList={this.removeItemFromList}/>
    );

    return (
      <Container className="supplies">
        <FoodItemForm createNewFoodItem={this.createNewFoodItem}/>
        <ListGroup variant="flush" className="list">
          {foodItems}
        </ListGroup>
      </Container>
    )
  }
}

export default withList(Supplies);