import React from "react"
import { Interface } from "readline";
import { PassThrough } from "stream";
import '../App.css';

function TodoItem(props: any) {

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
                <p style={{textDecorationLine: props.item.completed && "line-through"}}><strong>{props.item.text}</strong></p>  
            </td>          
            <td className="third-table-column">
                <button className="btn btn-danger btn-sm deleteTodo"
                onClick={() => props.deleteTodo(props.item.id)}
                >
                X
                </button>
            </td>
        </tr>
    )
}

export default TodoItem