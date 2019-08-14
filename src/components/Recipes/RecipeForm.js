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
      description: this.props.description
    }
    this.nameInput = React.createRef();
    this.descriptionInput = React.createRef();
  }

  createRecipe = (e) => {
    e.preventDefault();
    let name = this.nameInput.value.charAt(0).toUpperCase() + this.nameInput.value.slice(1).toLowerCase();
    let description = this.descriptionInput.value
      ? this.descriptionInput.value.charAt(0).toUpperCase() + this.descriptionInput.value.slice(1).toLowerCase()
      : null;
    axios.post('/recipes', {
      name: name,
      description: description
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
      const name = this.nameInput;
      const description = this.descriptionInput;
      this.updateRecipe({
        [name.name]: name.value,
        [description.name]: description.value
      })
        .then(updated => {
          this.props.history.push('/app/recipes');
          // this.setState({editing: false});
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

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Label>Recipe name</Form.Label>
          <Form.Control type="text" name="name" ref={input => this.nameInput = input} defaultValue={this.props.name}
           onChange={this.handleInputChange}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Recipe description</Form.Label>
          <Form.Control as="textarea" rows="3" name="description" ref={input => this.descriptionInput = input} defaultValue={this.props.description}
          onChange={this.handleInputChange}/>
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