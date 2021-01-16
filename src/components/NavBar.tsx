import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, NavbarBrand } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

interface NavBarProps {
  setIsLoggedIn(isLoggedIn: boolean): void;
  isLoggedIn: boolean;
}

class NavBar extends Component <NavBarProps,{}>{

    render() {
        const white = {
            color: "white"
        };
        return (
                <Navbar bg="dark" expand="lg" className="navbar-opacity">
                    <NavbarBrand style={white} href="/home">To Do List</NavbarBrand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                      <Nav className="mr-auto">
                        <div className="col-lg-4"></div>
                        <NavLink style={white} to="/home">Home</NavLink>

                        <div className="col-lg-2"></div>

                        {this.props.isLoggedIn 
                          ? <NavLink style={white} to="/profile">Profile</NavLink>
                          : <NavLink style={white} to="/login">Login</NavLink>}

                        
                        {/* <NavDropdown style={white} title="Dropdown" id="basic-nav-dropdown">
                          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                          <NavDropdown.Divider />
                          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                          </NavDropdown> */}
                      </Nav>
                      <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-light">Search</Button>
                      </Form>
                    </Navbar.Collapse>
                </Navbar>
        )
    }
}

export default NavBar;