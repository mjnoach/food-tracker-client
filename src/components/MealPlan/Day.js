import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'react-bootstrap';
import MealItem from './MealItem';

export default class Day extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meals: this.props.meals || []
    }
  }

  removeMealItem = (itemId) => {
    const meals = this.state.meals.filter(item => item.id !== itemId);
    this.setState({meals: meals});
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