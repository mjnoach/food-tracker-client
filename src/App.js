import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Welcome from './components/Welcome';
import Home from './components/Home';
import Supplies from './components/Supplies';

require('dotenv').config()

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