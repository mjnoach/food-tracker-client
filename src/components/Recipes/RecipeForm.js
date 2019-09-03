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
      foodItems: [],
      ingredients: this.props.ingredients || [],
    }
  }

  componentDidMount() {
    this.fetchFoodItems();
  }

  createRecipe = () => {
    const name = this.name.value.charAt(0).toUpperCase() + this.name.value.slice(1).toLowerCase();
    const description = this.description.value
      ? this.description.value.charAt(0).toUpperCase() + this.description.value.slice(1).toLowerCase()
      : null;
    axios.post('/recipes', {
      name: name,
      description: description,
      ingredients: this.state.ingredients
    })
      .then(response => {
        this.props.addRecipeToList(response.data);
        this.props.hideForm();
      })
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

  handleEdit = () => {
    this.updateRecipe({
      name: this.name.value,
      description: this.description.value,
      ingredients: this.state.ingredients
    })
      .then(updated => {
        const url = window.location.pathname;
        this.props.history.push({ pathname: "/empty" });
        this.props.history.replace({ pathname: url });
      })
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

  fetchFoodItems = () => {
    axios.get('/food_items')
      .then(response => {
        this.setState({foodItems: response.data});
      })
  }

  handleChange = (e) => {
    e.preventDefault();
  }

  handleClick = (e) => {
    let selected = this.state.ingredients;
    const ingrId = e.target.value;
    if (selected.includes(ingrId)) {
      selected = selected.filter(item => item !== ingrId);
      this.setState({ingredients: selected});
    }
    else {
      selected.push(ingrId);
      this.setState({ingredients: selected});
    }
  }

  render() {
    const foodItems = this.state.foodItems.map((item) =>
      <option key={item.id} value={item.id} onClick={this.handleClick}>{item.name}</option>
    );

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
          <Form.Label>Ingredients</Form.Label>
          <Form.Control as="select" multiple name="foodItems" value={this.state.ingredients} onChange={this.handleChange} ref={input => this.foodItems = input}>
            {foodItems}
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