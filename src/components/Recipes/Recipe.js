import React, { Component } from 'react';
import axios from 'axios';
import { Container, Button } from 'react-bootstrap';
import RecipeForm from './RecipeForm';

export default class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      description: '',
      ingredients: [],
      displayForm: false
    };
  }

  componentDidMount() {
    axios.get(`/recipes/${this.props.match.params.id}`)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          description: response.data.description,
          ingredients: response.data.ingredients,
        })
      })
      .catch(error => {});
  }

  deleteRecipe = () => {
    axios.delete(`/recipes/${this.state.id}`)
      .then(response => {
        console.log('test');
        this.props.history.push('/app/recipes');
        this.props.removeRecipe(this.state.id);
      })
      .catch(error => {});
  }

  displayForm = () => {
    this.setState({displayForm: true});
  }

  hideForm = () => {
    this.setState({displayForm: false});
  }

  render() {
    const ingredientsIds = [];
    const ingredients = this.state.ingredients.map((item) => {
      ingredientsIds.push(item.id.toString());
      return <li key={item.id}>{item.name}</li>
    });

    return this.state.displayForm
      ? <Container>
          <RecipeForm hideForm={this.hideForm} editing={true} name={this.state.name} description={this.state.description} id={this.state.id}
          ingredients={ingredientsIds}/>
        </Container>
      : <Container>
          <div className="btn-wrapper">
            <Button className="recipe-btn" variant="light" onClick={this.displayForm}>
              Edit
            </Button>
            <Button className="recipe-btn" variant="light" onClick={this.deleteRecipe}>
              Delete
            </Button>
          </div>
          <h4>
            {this.state.name}
          </h4>
          <hr/>
          <h6>Ingredients:</h6>  
          <ul>{ingredients}</ul>
          <hr/>
          <h6>Description:</h6>  
          <p>
            {this.state.description}
          </p>
        </Container>
  }
}