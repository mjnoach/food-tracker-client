import React, { Component } from 'react';
import axios from 'axios';
import { Container, ListGroup, Button, Form } from 'react-bootstrap';
import RecipeItem from './RecipeItem';
import RecipeForm from './RecipeForm';
import withList from '../withList';
import '../../stylesheets/recipes.css';

class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      displayForm: false
    };
  }

  componentDidMount() {
    this.fetchRecipes();
  }

  fetchRecipes = () => {
    axios.get('/recipes')
      .then(data => this.setState({recipes: data}));
  }

  addRecipeToList = (recipe) => {
    const recipes = this.props.addItemToList(recipe, this.state.recipes);
    this.setState({recipes: recipes});
  }

  toggleDisplayForm = () => {
    this.setState({displayForm: !this.state.displayForm});
  }

  render() {
    const recipes = this.state.recipes.map(item => 
      <RecipeItem key={item.id} id={item.id} name={item.name} description={item.description}/>
    );

    return this.state.displayForm
      ? 
      <Container className="recipe-form">
        <RecipeForm hideForm={this.toggleDisplayForm} addRecipeToList={this.addRecipeToList}/>
      </Container>
      : 
      <Container className="recipes">
        <div className="action-bar">
          <Form>
            <Button variant="light" onClick={this.toggleDisplayForm}>
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

export default withList(Recipes);