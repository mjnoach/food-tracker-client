import React, { Component } from 'react';
import axios from 'axios';
import update from 'immutability-helper';
import { Container, CardColumns } from 'react-bootstrap';
import RecipeCard from './RecipeCard';
import NewRecipe from './NewRecipe';
import './recipes.css';

export default class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    };
  }

  componentDidMount() {
    axios.get('/recipes')
      .then(response => {
        this.setState({recipes: response.data});
      })
      .catch(error => {});
  }

  updateRecipesList = (item) => {
    const recipes = update(this.state.recipes, {$push: [item]});
    this.setState({recipes: recipes.sort(function(a,b) {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    })});
  }

  render() {
    let recipes = this.state.recipes.map(item => (
      <RecipeCard key={item.id} id={item.id} name={item.name} description={item.description} />
    ));

    return (
      <Container>
        <CardColumns>
          {recipes}
        </CardColumns>
      </Container>
    )
  }
}