import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Redirect, Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

class Header extends Component {
  handleLogout = () => {
    sessionStorage.clear();
    this.props.history.push('/');
  }

  render() {
    if (sessionStorage.getItem('token'))
      return (
        <div>
          <Navbar expand="lg">
            <Container>
              <Navbar.Brand href="#home">
                <h1 className="brand">food tracker</h1>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <Navbar.Text>
                  <Nav className="mr-auto">
                    <Link to='/supplies' className="nav-link">Supplies</Link>
                    <Link to='/recipes' className="nav-link">Recipes</Link>
                    <Link to='/meal_plan' className="nav-link">Meal plan</Link>
                    <Link to='/shopping_list' className="nav-link">Shopping list</Link>
                    <NavDropdown title="<USER_NAME>" id="basic-nav-dropdown">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={this.handleLogout}>Log Out</NavDropdown.Item>
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