import React from 'react';
import { Navbar, Nav, Container, Button, Form, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser, faSignInAlt, faSearch } from '@fortawesome/free-solid-svg-icons';

const MainNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="mb-3">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img 
            src="/logo.svg" 
            width="30" 
            height="30" 
            className="d-inline-block align-top me-2" 
            alt="CampusMart Logo" 
          />
          CampusMart
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/marketplace">Marketplace</Nav.Link>
            <Nav.Link as={Link} to="/books">Books</Nav.Link>
            <Nav.Link as={Link} to="/notes">Notes</Nav.Link>
            <Nav.Link as={Link} to="/gadgets">Gadgets</Nav.Link>
            <Nav.Link as={Link} to="/about">About Us</Nav.Link>
          </Nav>
          
          <Form className="d-flex mx-auto">
            <FormControl
              type="search"
              placeholder="Search products..."
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-light">
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </Form>
          
          <Nav>
            <Button as={Link} to="/sell" variant="success" className="me-2">
              Sell Your Items
            </Button>
            <Nav.Link as={Link} to="/cart">
              <FontAwesomeIcon icon={faShoppingCart} /> Cart
            </Nav.Link>
            <Nav.Link as={Link} to="/login">
              <FontAwesomeIcon icon={faSignInAlt} /> Login
            </Nav.Link>
            <Nav.Link as={Link} to="/profile">
              <FontAwesomeIcon icon={faUser} /> Profile
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;