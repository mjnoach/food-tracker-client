import React, { Component } from 'react';
import axios from 'axios';

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

  render() {
    return (
      <div>
        <h2 className="">{this.state.name}</h2>
        <br/>
        lista składników
        <br/>
        opis
        <br/>
        przepis
      </div>
    )
  }
} 