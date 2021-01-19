import { render } from '@testing-library/react';
import axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { User } from '../../interfaces/User';
import {
  baseUrl,
    login,
    updateCredentials} from "./Authentication"

interface loginState {
    goToPage: string;
    isLoggedIn: boolean;
    invalidLogin: string;
    username: string;
    password: string;
    email: string;
    message: string;
}

interface loginProps {
    setIsLoggedIn( isLoggedIn: boolean): void;
    isLoggedIn: boolean;
    page: String
}

export default class Login extends Component<loginProps, loginState> {

    constructor(props: any) {
        super(props);
        this.state = {
            goToPage: '',
            isLoggedIn: this.props.isLoggedIn,
            invalidLogin: '',
            username: '',
            password: '',
            email: '',
            message: ''
        }
    }

    componentDidUpdate = (preProps: any) => {
        if (preProps !== this.props) {
          this.setState({ isLoggedIn: this.props.isLoggedIn });
        }
    };

    register = (event: any) => {
      event.preventDefault();
      let isValid = event.target.checkValidity();
  
      if (isValid) {
  
        let user: User = { ...this.state };
  
        axios.post<User>(baseUrl + "register", user).then((response) => {
          if (response.data.username === "notUnique") {
            this.setState({ message: "Username Already In Use" });
          } else {
              login(user.username, user.password)
            
              .then((response) => {
                updateCredentials(user.username, user.password);
  
                this.props.setIsLoggedIn(true);
                this.setState({goToPage: 'notes'});
              })
              .catch((error) => {
                this.setState({
                  message: "There Was an Error",
                });
              });
          }
        });
  
      } else {
        event.target.reportValidity();
      }
    }

    login = (event: any) => {
        login(this.state.username, this.state.password)
          .then((res) => {
            updateCredentials(this.state.username, this.state.password);
    
            this.setState({ isLoggedIn: true }, () => {
              this.props.setIsLoggedIn(true);
            });
          })
          .catch((error) => {
            this.setState({
              invalidLogin: "Invalid Login. Try Again",
              isLoggedIn: false,
            });
            console.log(error);
          });
      };

      logout = () => {
        localStorage.removeItem("credentials");
    
        this.setState(
          {
            isLoggedIn: false,
            username: "",
            password: "",
            invalidLogin: "",
          },
          () => {
            this.props.setIsLoggedIn(false);
          }
        );
      };

      onUserName = (event: any) => {
        this.setState({ username: event.target.value});
      };

      onEmail = (event: any) => {
        this.setState({ email: event.target.value});
      };
    
      onPassword = (event: any) => {
        this.setState({ password: event.target.value});
      };
    
    
    render(){
      return (
        <div className="todo-list" style={{backgroundColor: "transparent"}}>
          {
            this.state.goToPage
              ? <Redirect to={"/" + this.state.goToPage} />
              : <div className="letter">
                  <div className="row">
                    <div className="col-lg-1"></div>
                      <div className="col-lg-10">
                        <form>
                          <h3 style={{paddingBottom: "60px", paddingTop: "40px"}}>
                            {
                              this.props.page == 'login'
                                ? "Sign In"
                                : "Register"
                            }
                          </h3>

                          {
                            this.props.page == 'register'
                              &&  <div className="form-group">
                                      <input type="text" className="form-control" 
                                        onChange={this.onEmail} placeholder="Enter Email"/>
                                  </div>
                          }
                                  
                          <div className="form-group">
                            <input type="text" className="form-control" 
                                   onChange={this.onUserName} placeholder="Enter Username"/>
                          </div>
                                  
                          <div className="form-group">
                            <input type="password" className="form-control" 
                                   onChange={this.onPassword} placeholder="Enter password"/>
                          </div>
                                  
                          <div className="form-group">
                            <div className="custom-control custom-checkbox" style={{textAlign: "left"}}>
                              <input type="checkbox" className="custom-control-input" />
                              <label className="custom-control-label">Remember me</label>
                            </div>
                          </div>
                                  
                            {
                              this.props.page == 'login'
                                ? <input type="button" className="btn btn-primary btn-block" 
                                         value="Login" onClick={this.login} />
                                  
                                : <input type="button" className="btn btn-primary btn-block" 
                                         value="Register" onClick={this.register} />
                            }
                            {
                              this.props.page == 'login' &&
                                <p className="forgot-password text-right">
                                Not signed up yet? <a href="/register">Register</a></p>
                            }
                        </form>
                      </div>
                    </div>
                  </div>
          }
        </div>
      )
    } 
}