import { render } from '@testing-library/react';
import React, { Component } from 'react';

export default class Home extends Component<{}, { count: number }> {

    constructor(props: any) {
        super(props);
        this.state = {
            count: 0
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.setState(prevState => {
            return {
                count: prevState.count + 1
            }
        })
    }
    
    render(){
        return (
            <div>
                <h1>{this.state.count}</h1>
                <button onClick={this.handleClick}>Change!</button>
            </div>
        )
    }
}