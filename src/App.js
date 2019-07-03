import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Welcome from './components/Welcome';
import Home from './components/Home';
import Supplies from './components/Supplies';

require('dotenv').config();

export const axiosInstance = axios.create({baseURL: process.env.REACT_APP_API_URL});

function checkIfLoggedIn() {
  axiosInstance.interceptors.response.use(null, error => {
    console.log('error.response', error.response);
    if(error.response.status === 401) {
      sessionStorage.clear();
      alert('Your session has expired\nPlease log in.');
      // window.location.replace('/');
    }
    return Promise.reject(error);
  });
}

checkIfLoggedIn();

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