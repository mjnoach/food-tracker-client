import React from 'react';
import logOut from '../log_out';
import { withRouter, Redirect, Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

const Header = () =>

  sessionStorage.getItem('token')
  ?
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand>
          <Link to='/app' className="nav-link">
            <h1 className="brand">ft</h1>
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
  : 
    <Redirect to='/' />

export default withRouter(Header);