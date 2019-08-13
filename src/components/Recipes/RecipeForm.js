import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

export default class RecipeForm extends Component {
  
  
  handleSubmit = (e) => {
    e.preventDefault();
    let name = this.name.value.charAt(0).toUpperCase() + this.name.value.slice(1).toLowerCase();
    let description = this.description.value
      ? this.description.value.charAt(0).toUpperCase() + this.description.value.slice(1).toLowerCase()
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

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Label>Recipe name</Form.Label>
          <Form.Control type="text" ref={input => this.name = input}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Recipe description</Form.Label>
          <Form.Control as="textarea" rows="3" ref={input => this.description = input}/>
        </Form.Group>
        <Button variant="primary" type="submit">
          Add recipe
        </Button>
      </Form>
    )
  }
} 