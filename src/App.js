import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Welcome from './components/Welcome';

require('dotenv').config()

function App() {
  return (
    <Router>
      <div>
        <Route path="/" component={Welcome} />
      </div>
    </Router>
  );
}

export default App;
