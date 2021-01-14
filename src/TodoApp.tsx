import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Row from "react-bootstrap/Nav";
import './App.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './components/Home';

function TodoApp() {
  return (
    <div className="TodoApp">
      <Router>
      <div>
        <Row>
          <div className="col-lg-12" style={{padding: "0px"}}>
            <NavBar></NavBar>
          </div>
        </Row>
      </div>
        <Home />
        <Footer />
      </Router>
    </div>
  );
}

export default TodoApp;
