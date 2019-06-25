import React from 'react';
import './App.css';
import Welcome from './components/Welcome';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <div>
      <Container>
        <Welcome />
      </Container>
    </div>
  );
}

export default App;
