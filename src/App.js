import React from 'react';
import axios from 'axios';
import logOut from './log_out';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Welcome from './components/Welcome/Welcome';
import Home from './components/Home';
import Supplies from './components/Supplies/Supplies';
import Recipes from './components/Recipes/Recipes';
import Recipe from './components/Recipes/Recipe';
import MealPlan from './components/MealPlan/MealPlan';
import ShoppingList from './components/ShoppingList/ShoppingList';

require('dotenv').config();

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(
  config => {
    if (config.baseURL === process.env.REACT_APP_API_URL && !config.headers.Authorization) {
      const token = sessionStorage.getItem('token');
      if (token)
        config.headers.Authorization = token;
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
    console.log(method, path, '\n', error);
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
        <Route exact path="/app/recipes" component={Recipes} />
        <Route path="/app/recipes/:id" component={Recipe} />
        <Route path="/app/meal_plan" component={MealPlan} />
        <Route path="/app/shopping_list" component={ShoppingList} />
      </div>
    </Router>
  )
}

export default App;