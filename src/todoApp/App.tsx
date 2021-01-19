import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Row from "react-bootstrap/Nav";
import NavBar from './components/navbar/NavBar';
import Home from './components/todo/Home';
import TodoList from './components/todo/TodoList';
import "../App.css"
import ButtonBar from './components/buttonBar/ButtonBar';
// import todosData from '../data/todosData';
import Profile from './components/userAccount/Profile';
import Login from './components/userAccount/Login';

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
      todos: []
    };
    this.setIsLoggedIn = this.setIsLoggedIn.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    // this.searchTodos = this.searchTodos.bind(this);
  }

setIsLoggedIn(isLoggedIn: boolean) {
  this.setState({isLoggedIn});
}

// searchTodos = (search: String) => {
//   if (search === "" || search === null) {
//     this.getAllNotes().then((resp) => {
//       this.updateState(resp);
//     });
//   }else {

//     axios.get<Note[]>(noteUrl + "/search/" + search, getHttp()).then(response => {
//         let notes = sortNotes(response.data)
//         this.updateState(notes);
//       });
//   }
// }

  componentDidMount() {

    // fetch("")

    setTimeout(() => {
      this.setState({
        isLoading: false
      })
    }, 1500)
  }

  logoutUser() {
    localStorage.removeItem("credentials");
    this.setIsLoggedIn(false)
    console.log(this.state)
  }

  componentWillUnmount = () => {
    this.logoutUser();
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
          <Switch>
            <Route path="/tasks">
              {
                this.state.isLoggedIn
                  ? <div className="col-lg-6">
                      {
                        this.state.isLoading 
                          ? <h1 className="center-text todo-list center-loading">Loading...</h1> 
                          : <div className="row">
                              <div className="col-lg-12 text-center">
                                <TodoList isLoggedIn={this.state.isLoggedIn}/>
                              </div>
                            </div>
                      }
                    </div>
                  : <Redirect from="/tasks" to="/login" />
              }
            </Route>
            <Route path="/home">
              <div className="col-lg-6 text-center">
                <Home />
              </div>
            </Route>
            <Route path="/profile">
              {
                this.state.isLoggedIn
                  ? <div className="col-lg-6 text-center">
                      <Profile setIsLoggedIn={this.setIsLoggedIn} isLoggedIn={this.state.isLoggedIn}/>
                    </div>
                  : <Redirect from="/profile" to="/login" />
              }
            </Route>
            <Route path="/login">
              {
                this.state.isLoggedIn
                  ? <Redirect from="/login" to="/tasks" />
                  : <div className="col-lg-6 text-center">
                      <Login page={"login"} setIsLoggedIn={this.setIsLoggedIn} isLoggedIn={this.state.isLoggedIn}/>
                    </div>
              }
            </Route>
            <Route path="/register">
              {
                this.state.isLoggedIn
                  ? <Redirect from="/register" to="/profile" />
                  : <div className="col-lg-6 text-center">
                      <Login page={"register"} setIsLoggedIn={this.setIsLoggedIn} isLoggedIn={this.state.isLoggedIn}/>
                    </div>
              }
            </Route>
            <Route path="/logout">
              <div>
                {this.logoutUser}
              </div>
              <Redirect from="logout" to="/home" />
            </Route>
            <Redirect from="/" to="/home" />
          </Switch>
        </div>
        </Router>
      </div>
    );
  }
}
