import React from "react";
import { Link } from "react-router-dom";
// import Navbar from "react-bootstrap/Navbar";
// import Nav from "react-bootstrap/Nav";
import "./nav.css";

// import HeaderLink from "./HeaderLink/HeaderLink";

import logo from "../../images/icons/logo-sm.png";
import search from "../../images/icons/search-icon-sm.png";
import cart from "../../images/icons/cart-sm.png";
import { Navbar, Nav, Container } from "react-bootstrap";


function Navigation() {
  return (
    <div className="nav-wrapper fixed-top navbar-toggleable-sm navbar-expand-md">
      <Container>
        <Navbar className="w-100" collapseOnSelect expand="lg" variant="dark">
          
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          
          <Navbar.Brand as={Link} to="/">
            <img src={logo} alt="Apple Logo" />
          </Navbar.Brand>

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="nav-justified w-100 nav-fill">
              <Nav.Link as={Link} to="/mac">Mac</Nav.Link>
              <Nav.Link as={Link} to="/iphone">iPhone</Nav.Link>
              <Nav.Link as={Link} to="/ipad">iPad</Nav.Link>
              <Nav.Link as={Link} to="/watch">Watch</Nav.Link>
              <Nav.Link as={Link} to="/tv">TV</Nav.Link>
              <Nav.Link as={Link} to="/music">Music</Nav.Link>
              <Nav.Link as={Link} to="/support">Support</Nav.Link>
              
              <Nav.Link as={Link} to="/search">
                <img src={search} alt="Search" />
              </Nav.Link>
              
              <Nav.Link as={Link} to="/cart">
                <img src={cart} alt="Cart" />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </div>
  );
}

export default Navigation;