import React from 'react';
import axios from 'axios';

const withUserSession = Component =>
  class extends React.Component {

    logIn = (email, password) => {
      return axios.post('/auth/login', {
      email: email,
      password: password
      })
        .then(response => {
          sessionStorage.setItem('token', response.data.token);
          sessionStorage.setItem('uid', response.data.uid);
        });
    }

    fetchUserData = () => {
      return axios.get('/users/' + sessionStorage.getItem('uid'))
        .then(response => {
          sessionStorage.setItem('user', JSON.stringify(response.data));
        });
    }

    render() {
      return (
        <Component {...this.props} logIn={this.logIn} fetchUserData={this.fetchUserData} logOut={this.logOut}/>
      )
    }
  }

export default withUserSession;