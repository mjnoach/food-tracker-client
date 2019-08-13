import React, { Component } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';

export default class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: ''
    };
  }

  componentDidMount() {
    axios.get(`/recipes/${this.props.match.params.id}`)
      .then(response => {
        this.setState({
          name: response.data.name,
          description: response.data.description,
        })
      })
      .catch(error => {});
  }

  deleteRecipe = () => {
    axios.delete(`/recipes/${this.props.id}`)
      .then(response => {
        this.props.removeRecipe(this.props.id);
      })
      .catch(error => {});
  }

  render() {
    return (
      <Container>
        <h4>
          {this.state.name}
        </h4>
        <br/>
        <p>
          {this.state.description}
        </p>
      </Container>
    )
  }
}