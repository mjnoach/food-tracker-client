import React, { Component } from 'react';
import axios from 'axios';
import update from 'immutability-helper';
import { Container, ListGroup, Button, Form } from 'react-bootstrap';
import RecipeItem from './RecipeItem';
import RecipeForm from './RecipeForm';
import '../../stylesheets/recipes.css';

export default class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      displayForm: false
    };
  }

  componentDidMount() {
    axios.get('/recipes')
      .then(response => {
        this.setState({recipes: response.data});
      });
  }

  removeRecipe = (itemId) => {
    const recipes = this.state.recipes.filter(item => item.id !== itemId);
    this.setState({recipes: recipes});
  }

  updateRecipesList = (item) => {
    const recipes = update(this.state.recipes, {$push: [item]});
    this.setState({recipes: recipes.sort(function(a,b) {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    })});
  }

  displayForm = () => {
    this.setState({displayForm: true});
  }

  hideForm = () => {
    this.setState({displayForm: false});
  }

  render() {
    const recipes = this.state.recipes.map(item => 
      <RecipeItem key={item.id} id={item.id} name={item.name} description={item.description} removeRecipe={this.removeRecipe}/>
    );

    return this.state.displayForm
      ? <Container className="recipe-form">
          <RecipeForm hideForm={this.hideForm} updateRecipesList={this.updateRecipesList}/>
        </Container>
      : <Container className="recipes">
          <div className="action-bar">
            <Form>
              <Button variant="light" onClick={this.displayForm}>
                New Recipe
              </Button>  
            </Form>
          </div>
          <ListGroup variant="flush" className="list">
            {recipes}
          </ListGroup>
        </Container>
  }
}