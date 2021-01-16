import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Row from "react-bootstrap/Nav";
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './components/Home';
import TodoList from './components/TodoList';
import "./App.css"
import ButtonBar from './components/ButtonBar';
import todosData from './data/todosData';

interface AppState {
  isLoggedIn: boolean,
  isLoading: boolean,
  todos: any
}


export default class App extends Component<{}, AppState> {

  constructor(props: any) {
    super(props)
    this.state = {
      isLoggedIn: false,
      isLoading: true,
      todos: todosData
    };
    this.setIsLoggedIn = this.setIsLoggedIn.bind(this);
  }

setIsLoggedIn(isLoggedIn: boolean) {
  this.setState({isLoggedIn});
}

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isLoading: false
      })
    }, 1500)
  }

  componentWillUnmount = () => {
    localStorage.removeItem("credentials");
  }

  render() {
    return (
      <div className="main-body">
        <Router>
        <div>
          <Row>
            <div className="col-lg-12" style={{padding: "0px"}}>
              <NavBar 
                setIsLoggedIn = {this.setIsLoggedIn}
                isLoggedIn = {this.state.isLoggedIn}
              >
              </NavBar>
            </div>
          </Row>
        </div>

        <div className="row">
          <div className="col-lg-12 top-div-height"></div>
        </div>

        <div className="row">
          <div className="col-lg-3"></div>
          <div className="col-lg-6">
            {this.state.isLoading 
              ? <h1 className="center-text">Loading...</h1> 
              : <div className="row">
                  <div className="col-lg-12 text-center">
                    <TodoList todos={this.state.todos}/>
                    {/* <ButtonBar /> */}
                  </div>
                  <br/>
                  <div>

                  </div>
                </div>}
          </div>
        </div>
        </Router>
      </div>
    );
  }
}
