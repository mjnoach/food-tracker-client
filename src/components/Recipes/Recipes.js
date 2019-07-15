import React, { Component } from 'react';
import update from 'immutability-helper';
import axios from 'axios';
import { Container, Form, Button, Card } from 'react-bootstrap';

export default class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    };
  }  

  componentDidMount() {
    axios.get('/recipes')
      .then(response => {
        this.setState({recipes: response.data})
      })
      .catch(error => {});
  }

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

  updateRecipesList = (item) => {
    const recipes = update(this.state.recipes, {$push: [item]});
    this.setState({recipes: recipes.sort(function(a,b) {
      if(a.name < b.name) return -1;
      if(a.name > b.name) return 1;
      return 0;
    })});
  }

  render() {
    let recipes = this.state.recipes.map(item => {
      return (
        <Card key={item.id}>
          <Card.Body>
            <h4 className="float-left">{item.name}</h4>
            <h5 className="float-right">{item.description}</h5>
          </Card.Body>
        </Card>
      )
    });

    return (
      <div>
        <Container>
          <Form inline onSubmit={this.handleSubmit}>
            <Form.Control size="sm" type="text" placeholder="name" ref={input => this.name = input} defaultValue="Recipe name" />
            <Form.Control size="sm" type="number" placeholder="description" ref={input => this.description = input} defaultValue="Recipe description" />
            <Button size="sm" variant="light" type="submit">Add item</Button>
          </Form>
          <b>
            <div className="float-left">name</div>
            <div className="float-right">description</div>  
          </b>
          <br/>
          { recipes }
        </Container>
      </div>
    )
  }
}