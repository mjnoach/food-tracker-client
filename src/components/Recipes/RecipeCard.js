import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { Card, Nav, Button } from 'react-bootstrap';

export default class RecipeCard extends Component {

  createBackdrop = () => {
    const backdrop = document.createElement("div");
    backdrop.classList.add("backdrop", "fade-in");
    document.body.appendChild(backdrop);
  }

  removeBackdrop = () => {
    const backdropCollection = document.getElementsByClassName("backdrop");
    const backdrop = backdropCollection[0];
    for (let i = 1; i < backdropCollection.length; i++)
      backdropCollection[i].remove();
    backdrop.classList.add("fade-out");
    backdrop.addEventListener("animationend", () => {
      if (backdrop.parentNode) 
        backdrop.parentNode.removeChild(backdrop);
    }, false);
  }

  render() {
    return (
      <div>
        <Card className="recipe" id={this.props.id}
        onMouseMove={this.toggleFocusedOn}
        onMouseLeave={this.toggleFocusedOff}>
          <Card.Header>
            <Nav variant="tabs" defaultActiveKey="#first">
              <Nav.Item>
                <Nav.Link as="div" href="#first" className="header-tab">
                  Description
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as="div" href="#second" className="header-tab">
                  Ingredients
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as="div" href="#third" className="header-tab">
                  Preparation
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <button type="button">∨</button>
          </Card.Header> 
          <Card.Body>
            <Card.Title>{this.props.name}</Card.Title>
            <Card.Text>
              {this.props.description}
            </Card.Text>
            <Button className="show-more" variant="link">
              Show more
            </Button>
          </Card.Body>
        </Card>
      </div>
    )
  }
} 