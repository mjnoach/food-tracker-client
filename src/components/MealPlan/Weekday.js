import React, { Component } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default class Weekday extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meals: [],
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
      })
      .catch(error => {});
  }

  addMeal = () => {

  }

  render() {
    const recipes = this.state.recipes.map(item => {
      return <option>{item.name}</option>
    });

    return (
      <div>
        <h4>{this.props.name}</h4>
        <ul>
          <li></li>
          <li></li>
          <li></li>
        </ul> 
        <Button className="" variant="light" size="sm" onClick={this.addMeal}>
            Add meal
        </Button>
        <Form.Group>
          <Form.Label>Choose recipe</Form.Label>
          <Form.Control as="select">
            {recipes}
          </Form.Control>
        </Form.Group>
        <hr/>
      </div>
    )
  }
}

Weekday.propTypes = {
  name: PropTypes.string.isRequired,
}