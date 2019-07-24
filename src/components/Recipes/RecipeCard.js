import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const borderStyles = [
  "primary",
  "success",
  "danger",
  "warning",
  "info",
];

export default class RecipeCard extends Component {
  render() {
    const desc = this.props.description;
    const shortDesc = desc && desc.length > 100 
      ? desc.substring(0, 100) + "..." 
      : desc;
    const style = borderStyles[Math.floor(Math.random() * borderStyles.length)];
    return (
      <Card border={style}>
        <Card.Body>
          <Card.Title>
            <Link to={`/app/recipes/${this.props.id}`}>{this.props.name}</Link>
          </Card.Title>
          <Card.Text>
            {shortDesc}
          </Card.Text>
        </Card.Body>          
      </Card>
    )
  }
} 