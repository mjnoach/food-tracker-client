import React, { Component } from 'react';
import axios from 'axios';
import { Card, Nav, Dropdown, DropdownButton } from 'react-bootstrap';

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

  deleteRecipe = () => {
    axios.delete(`/recipes/${this.props.id}`)
      .then(response => {
        this.props.removeRecipe(this.props.id);
      })
      .catch(error => {});
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
            </Nav>
            <DropdownButton className="recipe-optioins-btn" variant="light" size="sm" title="Options">
              <Dropdown.Item href="#/action-1">Edit</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={this.deleteRecipe}>Delete</Dropdown.Item>
            </DropdownButton>
          </Card.Header> 
          <Card.Body>
            <Card.Title>{this.props.name}</Card.Title>
            <Card.Text>
              {this.props.description}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    )
  }
} 