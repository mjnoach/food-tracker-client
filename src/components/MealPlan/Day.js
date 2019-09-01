import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import MealItem from './MealItem';

export default class Day extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meals: this.props.meals
    };
  }

  componentWillReceiveProps(props) {
    this.setState({meals: props.meals });
  }

  removeMealItem = (deletedId) => {
    const meals = this.state.meals.filter(item => item.id !== deletedId);
    this.setState({meals: meals});
  }

  render() {
    const meals = this.state.meals.map(meal => {
      return <MealItem key={meal.id} id={meal.id} name={meal.recipe.name} removeMealItem={this.removeMealItem}/>
    });

    return (
      <div className="day">
        <h4 className="list-title">{this.props.day}</h4>
        <ListGroup variant="flush" className="list">
          {meals}
        </ListGroup>
      </div>
    )
  }
}
