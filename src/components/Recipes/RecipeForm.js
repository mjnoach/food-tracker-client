import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

class RecipeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      description: this.props.description,
      foodItems: [],
      ingredients: this.props.ingredients || [],
    }
  }

  componentDidMount() {
    this.fetchFoodItems();
  }

  fetchFoodItems = () => {
    axios.get('/food_items')
      .then(response => this.setState({foodItems: response.data}));
  }

  inputData = () => {
    const data = {};
    data.name = this.name.value.charAt(0).toUpperCase() + this.name.value.slice(1).toLowerCase();
    data.description = this.description.value
      ? this.description.value.charAt(0).toUpperCase() + this.description.value.slice(1).toLowerCase()
      : null;
    data.ingredients = this.state.ingredients;
    return data;
  }

  createRecipe = () => {
    axios.post('/recipes', this.inputData())
      .then(recipe => {
        this.props.addRecipeToList(recipe.data);
        this.props.hideForm();
      })
  }

  updateRecipe = () => {
    axios.put(`/recipes/${this.props.id}`, this.inputData())
      .then(response => this.reloadPage());
  }

  reloadPage = () => {
    const url = window.location.pathname;
    this.props.history.push({ pathname: "/empty" });
    this.props.history.replace({ pathname: url });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.editing ? this.updateRecipe() : this.createRecipe();
  }

  handleClick = (e) => {
    let ingrArr = this.state.ingredients;
    const ingrId = e.target.value;
    if (ingrArr.includes(ingrId))
      ingrArr = ingrArr.filter(item => item !== ingrId);
    else
      ingrArr.push(ingrId);
    this.setState({ingredients: ingrArr});
  }

  handleInputChange = (e) => {
    if (this.props.editing)
      this.setState({
        [e.target.name]: e.target.value
      });
  }

  render() {
    const foodItems = this.state.foodItems.map((item) =>
      <option key={item.id} value={item.id} onClick={this.handleClick}>{item.name}</option>
    );

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Label>Recipe name</Form.Label>
          <Form.Control type="text" name="name" ref={input => this.name = input} 
          defaultValue={this.props.name} onChange={this.handleInputChange}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Recipe description</Form.Label>
          <Form.Control as="textarea" rows="3" name="description" ref={input => this.description = input} 
          defaultValue={this.props.description} onChange={this.handleInputChange}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Ingredients</Form.Label>
          <Form.Control as="select" multiple name="foodItems" value={this.state.ingredients} 
          onChange={e => e.preventDefault()} ref={input => this.foodItems = input}>
            {foodItems}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          {this.props.editing ? 'Apply changes' : 'Add recipe'}
        </Button>
      </Form>
    )
  }
} 

export default withRouter(RecipeForm);