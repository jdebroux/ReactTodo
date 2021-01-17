import React, { Component } from "react"
import { Row } from "react-bootstrap";
import { Interface } from "readline";
import { PassThrough } from "stream";
import TableButton from "./TableButton"
import '../../../App.css';

export default class ButtonBar extends Component<{buttonArray: any}, { }> {


    render() {
        const buttons = this.props.buttonArray.map(
            (item: {id: number, buttonText: string}) => {
                return <TableButton key={item.id} button={item}/>
            })

        return (
            <tr className="button-bar">
                {buttons}
            </tr>
        )
    }
}