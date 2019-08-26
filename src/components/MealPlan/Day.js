import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'react-bootstrap';
import MealItem from './MealItem';

export default class Day extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meals: [
        {name: "Cake", id: 1}
      ]
    }
  }

  removeMealItem = (itemId) => {
    const supplies = this.state.meals.filter(item => item.id !== itemId);
    this.setState({meals: supplies});
  }

  render() {
    const mealItems = this.state.meals.map(item => {
      return (
        <MealItem key={item.id} name={item.name} id={item.id} removeMealItem={this.removeMealItem} />
      )
    });

    return (
      <div className="day">
        <h4 className="list-title">{this.props.day}</h4>
        <ListGroup variant="flush" className="list">
          {mealItems}
        </ListGroup>
      </div>
    )
  }
}

Day.propTypes = {
  day: PropTypes.string.isRequired,
}