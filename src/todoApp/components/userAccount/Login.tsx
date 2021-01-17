import { render } from '@testing-library/react';
import React, { Component } from 'react';

interface loginProps {
    setIsLoggedIn( isLoggedIn: boolean): void;
    isLoggedIn: boolean;
    page: String
}

export default class Login extends Component<loginProps, {}> {

    constructor(props: any) {
        super(props);
        this.state = {}
    }
    
    render(){
        return (
            <div className="todo-list" style={{backgroundColor: "transparent"}}>
                <div className="letter">
                    <div className="row">
                        <div className="col-lg-1"></div>
                        <div className="col-lg-10">
                            <form>
                                <h3 style={{paddingBottom: "40px", paddingTop: "40px"}}>
                                    {this.props.page == 'login'
                                        ? "Sign In"
                                        : "Register"
                                    }
                                </h3>

                                <div className="form-group">
                                    <label>Username</label>
                                    <input type="text" className="form-control" placeholder="Enter Username" />
                                </div>

                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" className="form-control" placeholder="Enter password" />
                                </div>

                                <div className="form-group">
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                                    </div>
                                </div>

                                <button type="submit" className="btn btn-primary btn-block">Submit</button>

                                {this.props.page =='login' &&
                                    <p className="forgot-password text-right">
                                    Not signed up yet? <a href="/register">Register</a></p>
                                }
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}