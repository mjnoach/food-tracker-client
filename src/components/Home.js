import React, { Component } from 'react';
import Header from './Header';
import Dashboard from './Dashboard';

export default class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <Dashboard />
      </div>
    )
  }
}