import React, { Component } from 'react';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';
import Day from './Day';
import '../../stylesheets/meal-plan.css';

export default class MealPlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    }
  }

  componentDidMount() {
    this.fetchRecipes();
  }

  fetchRecipes = () => {
    axios.get('/recipes')
      .then(response => {
        this.setState({recipes: response.data});
      });
  }

  addMeal = () => {
    axios.post('/meals', {
      day: this.day.value,
      recipe: this.day.value
    })
      .then(response => {
        this.props.updateRecipesList(response.data);
        this.props.hideForm();
      });
  }

  render() {
    const weekdays = ["Monday", "Teusday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    const days = weekdays.map(weekday => {
      return <option key={weekday}>{weekday}</option>
    });

    const mealPlan = weekdays.map(weekday => {
      return <Day key={weekday} day={weekday} />
    });

    const recipes = this.state.recipes.map(item => {
      return <option key={item.id}>{item.name}</option>
    });

    return (
      <Container className="meal-plan">
        <div className="action-bar">
          <Form>
            <Button variant="light" onClick={this.addMeal}>
              Add Meal
            </Button>
            <Form.Group as="select" className="meal-dropdown" ref={this.day}>
              {days}
            </Form.Group>
            <Form.Group as="select" className="meal-dropdown" ref={this.recipe}>
              {recipes}
            </Form.Group>
          </Form>
        </div>
        {mealPlan}
      </Container>
    )
  }
}