import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { logOut } from '../user_session';
import { Redirect, Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

class Header extends Component {
  render() {
    if(sessionStorage.getItem('token'))
      return (
        <div>
          <Navbar expand="lg">
            <Container>
              <Navbar.Brand>
                <Link to='/app' className="nav-link">
                  <h1 className="brand">food tracker</h1>
                </Link>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <Navbar.Text>
                  <Nav className="mr-auto">
                    <Link to='/app/supplies' className="nav-link">Supplies</Link>
                    <Link to='/app/recipes' className="nav-link">Recipes</Link>
                    <Link to='/app/meal_plan' className="nav-link">Meal plan</Link>
                    <Link to='/app/shopping_list' className="nav-link">Shopping list</Link>
                    <NavDropdown id="basic-nav-dropdown" title={
                      JSON.parse(sessionStorage.getItem('user')).name || 
                      JSON.parse(sessionStorage.getItem('user')).email}>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={() => logOut()}>Log Out</NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                </Navbar.Text>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      )
    else
      return (
        <Redirect to='/' />
      )
  }
}

export default withRouter(Header)