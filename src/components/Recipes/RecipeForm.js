import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

class RecipeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: !!this.props.editing,
      name: this.props.name,
      description: this.props.description,
      ingredients: []
    }
    this.name = React.createRef();
    this.description = React.createRef();
  }

  componentDidMount() {
    this.fetchIngredients();
  }

  createRecipe = () => {
    const name = this.name.value.charAt(0).toUpperCase() + this.name.value.slice(1).toLowerCase();
    const description = this.description.value
      ? this.description.value.charAt(0).toUpperCase() + this.description.value.slice(1).toLowerCase()
      : null;
    const collection = this.ingredients.selectedOptions;
    const ingredients = [];
    for (let i = 0; i < collection.length; i++) {
      ingredients.push(collection[i].getAttribute("id"));
    }
    axios.post('/recipes', {
      name: name,
      description: description,
      ingredients: ingredients
    })
      .then(response => {
        this.props.updateRecipesList(response.data);
        this.props.hideForm();
      })
      .catch(error => {});
  }

  updateRecipe = (obj) => {
    return new Promise((resolve, reject) => {
      axios.put(`/recipes/${this.props.id}`, obj)
      .then(response => {
        resolve(true);
      })
      .catch(error => {
        reject(Object.keys(obj));
      });
    });
  }

  recipeWasEdited = () => {
    return (this.state.name !== this.props.name) || (this.state.description !== this.props.description);
  }

  handleEdit = () => {
    if (this.recipeWasEdited()) {
      const name = this.name;
      const description = this.description;
      this.updateRecipe({
        [name.name]: name.value,
        [description.name]: description.value
      })
        .then(updated => {
          this.props.history.push('/app/recipes');
        })
        .catch({});
    }
  }

  handleInputChange = (e) => {
    if (this.state.editing)
      this.setState({
        [e.target.name]: e.target.value
      });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.state.editing
      ? this.handleEdit()
      : this.createRecipe()
  }

  fetchIngredients = () => {
    axios.get('/food_items')
      .then(response => {
        this.setState({ingredients: response.data});
      })
      .catch(error => {});
  }

  render() {
    const ingredients = this.state.ingredients.map((ingredient) => {
      return (
        <option key={ingredient.id} id={ingredient.id}>{ingredient.name}</option>
      )
    });

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Label>Recipe name</Form.Label>
          <Form.Control type="text" name="name" ref={input => this.name = input} defaultValue={this.props.name}
           onChange={this.handleInputChange}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Recipe description</Form.Label>
          <Form.Control as="textarea" rows="3" name="description" ref={input => this.description = input} defaultValue={this.props.description}
          onChange={this.handleInputChange}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Ingredients (select multiple with 'Ctrl + click')</Form.Label>
          <Form.Control as="select" multiple name="ingredients" ref={input => this.ingredients = input}>
            {ingredients}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          {this.state.editing
            ? 'Apply changes'
            : 'Add recipe'}
        </Button>
      </Form>
    )
  }
} 

export default withRouter(RecipeForm);