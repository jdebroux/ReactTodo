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
                        <div className="col-lg-1"></div>
                        <NavLink style={white} to="/home">Home</NavLink>

                        <div className="col-lg-2"></div>

                        {
                          this.props.isLoggedIn 
                            ? <NavLink style={white} to="/profile">Profile</NavLink>
                            : <NavLink style={white} to="/login">Login</NavLink>
                        }

                        <div className="col-lg-2"></div>

                        {
                          this.props.isLoggedIn 
                            ? <NavLink style={white} to="/tasks">Tasks</NavLink>
                            : <NavLink style={white} to="/register">Register</NavLink>
                        }

                        <div className="col-lg-2"></div>

                        {
                          this.props.isLoggedIn 
                            && <NavLink style={white} to="/" onClick={() => this.props.setIsLoggedIn(false)}>Logout</NavLink>
                        }

                      </Nav>
                      { 
                        this.props.isLoggedIn
                          ? <Form inline>
                              <FormControl type="text" placeholder="Search Notes" className="mr-sm-2" />
                              <Button variant="outline-light">Search</Button>
                            </Form>
                          : <Form inline></Form>
                      }
                    </Navbar.Collapse>
                </Navbar>
        )
    }
}

export default NavBar;