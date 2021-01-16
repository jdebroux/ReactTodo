import React from "react"
import { Row } from "react-bootstrap";
import { Interface } from "readline";
import { PassThrough } from "stream";
import '../App.css';

function ButtonBar(props: any) {

    return (
        <tr className="button-bar">
            {/* <div className="row"> */}
                {/* <div className="col-lg-2"> */}
                   <td><button type="button" onClick={props.addTodo} className="btn btn-outline-light btn-md bottom-buttons">Add Todo</button></td>
                {/* </div> */}
                {/* <div className="col-lg-1"></div> */}
                {/* <div className="col-lg-2"> */}
                    <td><button type="button" onClick={props.showCompleted} className="btn btn-outline-light btn-md bottom-buttons">Completed</button></td>
                {/* </div> */}
                {/* <div className="col-lg-2"> */}
                    <td><button type="button" onClick={props.showIncomplete} className="btn btn-outline-light btn-md bottom-buttons">Incomplete</button></td>
                {/* </div> */}
                {/* <div className="col-lg-2"> */}
                    <td><button type="button" onClick={props.showAll} className="btn btn-outline-light btn-md bottom-buttons">Show All</button></td>
                {/* </div> */}
                {/* <div className="col-lg-1"></div> */}
                {/* <div className="col-lg-2"> */}
                    <td><button type="button" onClick={props.saveTodos} className="btn btn-outline-light btn-md bottom-buttons">Save</button></td>
                {/* </div> */}
            {/* </div> */}
        </tr>
    )
}

export default ButtonBar