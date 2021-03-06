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

  componentDidUpdate(prevProps) {
    if (this.props.meals !== prevProps.meals)
      this.setState({meals: this.props.meals});
  }

  removeMealFromList = (deletedId) => {
    const meals = this.state.meals.filter(item => item.id !== deletedId);
    this.setState({meals: meals});
  }

  render() {
    const meals = this.state.meals.map(meal => {
      return <MealItem key={meal.id} id={meal.id} name={meal.recipe.name} removeMealFromList={this.removeMealFromList}/>
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