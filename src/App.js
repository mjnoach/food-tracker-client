import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from 'axios';
import { logOut } from './user_session';
import Welcome from './components/Welcome';
import Home from './components/Home';
import Supplies from './components/Supplies';

require('dotenv').config();

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(
  config => {
    if (config.baseURL === process.env.REACT_APP_API_URL && !config.headers.Authorization) {
      const token = sessionStorage.getItem('token');
      if (token) {
        config.headers.Authorization = token;
      }
    }
    return config;
  }, null
);

axios.interceptors.response.use(response => {
    const path = response.config.url.replace(axios.defaults.baseURL, '');
    const method = response.config.method.toUpperCase();
    console.log(method, path, '\n', response);
    return response;
  },
  error => {
    const path = error.response.config.url.replace(axios.defaults.baseURL, '');
    const method = error.response.config.method.toUpperCase();
    console.log(method, path, '\n', error.response.data.errors);
    if(error.response.status === 401) {
      logOut('Your session has expired\nPlease log in');
    }
    return Promise.reject(error);
  }
);

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Welcome} />
        <Route path="/app" component={Home} />
        <Route path="/app/supplies" component={Supplies} />
      </div>
    </Router>
  )
}

export default App;