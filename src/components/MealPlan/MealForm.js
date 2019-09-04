import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

export default class MealForm extends Component {
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
      .then(response => this.setState({recipes: response.data}));
  }

  addMeal = (e) => {
    e.preventDefault();
    axios.post('/meals', {
      day: this.day.value,
      recipe: this.recipe.value
    })
      .then(meal => this.props.addMealToList(meal.data));
  }

  render() {
    const recipes = this.state.recipes.map(item => 
      <option key={item.id} value={item.id}>{item.name}</option>
    );

    return (
      <div className="action-bar">
        <Form onSubmit={this.addMeal}>
          <Form.Group as="select" className="meal-dropdown" ref={input => this.day = input}>
            {this.props.days}
          </Form.Group>
          <Form.Group as="select" className="meal-dropdown" ref={input => this.recipe = input}>
            {recipes}
          </Form.Group>
          <Button type="submit" variant="light">
            Add Meal
          </Button>
        </Form>
      </div>
    )
  }
}