import React from 'react';
import axios from 'axios';

const withApi = Component =>
  class extends React.Component {

    getData = (endpoint) => {
      return axios.get(endpoint)
        .then(response => response.data);
    }

    postData = (endpoint, data) => {
      return axios.post(endpoint, data)
        .then(response => response.data);
    }

    render() {
      return (
        <Component {...this.props} getData={this.getData}/>
      )
    }
  }

export default withApi;