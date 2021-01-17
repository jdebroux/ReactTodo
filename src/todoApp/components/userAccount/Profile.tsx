import { render } from '@testing-library/react';
import React, { Component } from 'react';

interface profileProps {
    setIsLoggedIn( isLoggedIn: boolean): void;
    isLoggedIn: boolean;
}

export default class Profile extends Component<profileProps, {}> {

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
                            <h3>Welcome, {}</h3>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}