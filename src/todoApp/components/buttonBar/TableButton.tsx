import React from "react"
import { Row } from "react-bootstrap";
import { Interface } from "readline";
import { PassThrough } from "stream";
import '../../../App.css';

function TableButton(props: any) {

    return (
        <td className="remove-top-bottom-padding">

            <button type="button" onClick={props.button.buttonAction} 
                    className="btn btn-outline-light btn-md bottom-buttons"
            >
                {props.button.buttonText}
            </button>

            {/* {props.button.buttonText == 'Add Todo'
                ?   props.button.isAddingTodo
                    ?   <button type="button" disabled={true} onClick={props.button.buttonAction} className="btn bg-transparent bottom-buttons">
                            {!props.button.isAddingTodo ? props.button.buttonText : "`"}
                        </button>

                    :   <button type="button" onClick={props.button.buttonAction} className="btn btn-outline-light btn-md bottom-buttons">
                            {props.button.buttonText}
                        </button>

                :   <button type="button" onClick={props.button.buttonAction} className="btn btn-outline-light btn-md bottom-buttons">
                        {props.button.buttonText}
                    </button>
            } */}
        </td>
    )
}

export default TableButton