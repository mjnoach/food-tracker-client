import React, { Component } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';

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