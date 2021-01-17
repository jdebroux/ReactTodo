import React from "react"
import { Interface } from "readline";
import { PassThrough } from "stream";
import '../../../App.css';

function TodoItem(props: any) {

    const completedStyle = {
        fontStyle: "italic",
        color: "gray",
        textDecoration: "line-through"
    }

    const incompleteStyle = {
        color: "black",
    }

    return (
        <tr className="todo-item">
            <td className="first-table-column">
                <input
                    type="checkbox"
                    checked={props.item.completed}
                    onChange={() => props.completeTodo(props.item.id)}
                />
            </td>
            <td  className="second-table-column">
                {
                    !props.item.isNew
                    ? <p style={props.item.completed ? completedStyle : incompleteStyle}><strong>{props.item.task}</strong></p>

                    : <input type="text" value={props.item.task} />
                }
                  
            </td>          
            <td className="third-table-column">

            <button className="btn btn-danger btn-sm deleteTodo"
                        onClick={() => props.deleteTodo(props.item.id)}
                        >
                        X
                        </button>

                {/* {
                    !props.item.isNew
                    ?   <button className="btn btn-danger btn-sm deleteTodo"
                        onClick={() => props.deleteTodo(props.item.id)}
                        >
                        X
                        </button>

                    :   <button className="btn btn-primary btn-sm deleteTodo"
                        onClick={() => props.item.isNew = false}
                        >
                        +
                        </button>
                } */}
            </td>
        </tr>
    )
}

export default TodoItem