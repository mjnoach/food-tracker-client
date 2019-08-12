import React, { Component } from 'react';
import axios from 'axios';
import { Card, Form } from 'react-bootstrap';

export default class RecipeCard extends Component {
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
        this.updateRecipesList(response.data);
      })
      .catch(error => {});
  }

  render() {
    return (
      <div className="new-recipe">

        <Form>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="name@example.com" />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Example select</Form.Label>
            <Form.Control as="select">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect2">
            <Form.Label>Example multiple select</Form.Label>
            <Form.Control as="select" multiple>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Example textarea</Form.Label>
            <Form.Control as="textarea" rows="3" />
          </Form.Group>
        </Form>

        <Card border="secondary">
          <form onSubmit={this.handleSubmit}>
            <Card.Body>
              <Card.Title>
                <input autoFocus className="new-recipe-name" type="text" placeholder="Name" ref={input => this.name = input}/>
                <button type="submit">
                  <i className="float-right new-recipe-add-icon">+</i>
                </button>
              </Card.Title>
              <Card.Text>
                <input className="new-recipe-description" type="text" placeholder="Description" ref={input => this.description = input}/>
              </Card.Text>
            </Card.Body>          
          </form>
        </Card>
      </div>
    )
  }
} 