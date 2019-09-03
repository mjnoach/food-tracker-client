import React from 'react';
import axios from 'axios';

const withApi = Component =>
  class extends React.Component {

    fetchData = (endpoint) => {
      axios.get(endpoint)
        .then(response => response.data);
    }

    render() {
      return (
        <Component {...this.props} fetchData={this.fetchData}/>
      )
    }
  }

export default withApi;