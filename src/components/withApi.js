import React from 'react';
import axios from 'axios';

const withApi = (Component, componentClass) =>
  class withApi extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        supplies: [],
        recipes: [],
        meals: [],
        groceries: [],
      }
    }

    apiGet = (endpoint) => {
      return axios.get(endpoint)
        .then(response => response.data);
    }

    apiPost = (endpoint, data) => {
      return axios.post(endpoint, data)
        .then(response => response.data);
    }

    apiDelete = (endpoint, id) => {
      return axios.delete(`${endpoint}/${id}`)
        // .then(response => true);
    }

    apiUpdate = (endpoint, id, data) => {
      return axios.put(`${endpoint}/${id}`, data)
        // .then(response => true);
    }

    render() {
      const extraProps = {};
      switch(componentClass) {
        case 'Supplies':
          extraProps.supplies = this.state.supplies;
          break;
        case 'Recipes':
          extraProps.recipes = this.state.recipes;
          break;
        case 'Meals':
          extraProps.meals = this.state.meals;
          break;
        case 'ShoppingList':
          extraProps.groceries = this.state.groceries;
          break;
        default: ;
      }
      return (
        <Component {...this.props} {...extraProps} apiGet={this.apiGet} apiPost={this.apiPost}/>
      )
    }
  }

export default withApi;