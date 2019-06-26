import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Welcome from './components/Welcome';
import Home from './components/Home';

require('dotenv').config()

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Welcome} />
        <Route path="/app" component={Home} />
      </div>
    </Router>
  )
}

export default App;