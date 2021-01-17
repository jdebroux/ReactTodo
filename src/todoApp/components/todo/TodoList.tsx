import { render } from '@testing-library/react';
import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import '../../../App.css';
import todosData from "../../../data/todosData.js"
import { Todo } from '../../interfaces/Todo';
import ButtonBar from '../buttonBar/ButtonBar';
import TodoItem from "./TodoItem"

interface todoListState {
    todos: Todo[],
    dataToShow: string,
    isAddingTodo: boolean,
    task: string
}

export default class TodoList extends Component<{todos: Todo[]}, todoListState> {

    constructor(props: any) {
        super(props);
        this.state = {
            todos: this.props.todos,
            dataToShow: 'All',
            isAddingTodo: false,
            task: ""
        }
        this.completeTodo = this.completeTodo.bind(this)
        this.deleteTodo = this.deleteTodo.bind(this)
        this.addTodo = this.addTodo.bind(this)
        this.saveTodos = this.saveTodos.bind(this)
    }

    showCompleted = () => {
        this.setState({dataToShow: "Completed"});
    }
      
    showIncomplete = () => {
        this.setState({dataToShow: "Incomplete"});
    }

    addTodo = () => {
        console.log("IN ADD TODO")

        let todo: Todo = {
            task: this.state.task,
            completed: false,
            deleted: false
        }

        //-1 to indicate it is a new note
        // this.updateTodo(todo, -1);
        
        this.setState({ task: "" })
    }

    saveTodos = () => {
        console.log("IN SAVE TODOS")
    }

    showAll = () => {
        this.setState({dataToShow: "All"});
    }

    calculateNonNullItems (list: any, todoLength: number) {
        list.map((todo: any) => {
            if (todo != null){
                todoLength++;
            }
            return null;
        })
        return todoLength;
    }

    completeTodo(id: number) {
        let newTodos = this.props.todos.slice()
        newTodos = newTodos.map((item: any) => {
            if (item.id === id) {
                item.completed = !item.completed
            }
            return item
        })

        this.setState({todos: newTodos.slice()})
    }

    deleteTodo(id: number) {
        let verify = confirm("Are you sure you want to delete this note?")
        if (verify) {
            let newTodos = this.props.todos.map((item: Todo) => {
                if (item.id === id){
                    item.deleted = true;
                }
                return item;
            })
            this.setState({todos: newTodos.slice()})
        }
    }

    render(){

        const buttonArray = [
            {
                id: 1,
                buttonAction: this.addTodo,
                buttonText: "Add Todo",
                showButton: true,
                isAddingTodo: this.state.isAddingTodo
            },
            {
                id: 2,
                buttonAction: this.showCompleted,
                buttonText: "Completed"
            },
            {
                id: 3,
                buttonAction: this.showIncomplete,
                buttonText: "Incomplete"
            },
            {
                id: 4,
                buttonAction: this.showAll,
                buttonText: "Show All"
            },
            {
                id: 5,
                buttonAction: this.saveTodos,
                buttonText: "Save"
            }
                                                    
        ];

        let todoItems: any = [];
        let todoLength = 0;
        
        switch(this.state.dataToShow){
            case "Completed":
                todoItems = this.props.todos.map(
                    (item: Todo) => {
                    if (!item.deleted && item.completed) {
                            return <TodoItem 
                                key={item.id} item={item} completeTodo={this.completeTodo}
                                deleteTodo={this.deleteTodo}/>
                    }
                });
                break;

            case "Incomplete":
                todoItems = this.props.todos.map(
                    (item: Todo) => {
                    if (!item.deleted && !item.completed) {
                            return <TodoItem 
                                key={item.id} item={item} completeTodo={this.completeTodo}
                                deleteTodo={this.deleteTodo}/>
                    }
                });
                break;

            case "All": 
                todoItems = this.props.todos.map(
                    (item: Todo) => {
                    if (!item.deleted) {
                            return <TodoItem 
                                key={item.id} item={item} completeTodo={this.completeTodo}
                                deleteTodo={this.deleteTodo}/>
                    }
                });
                break;
        }

        todoLength = this.calculateNonNullItems(todoItems, todoLength);
        
        return (
            <div className="todo-list">
                <div className="row table-height">
                    <div className="col-lg-12">
                        <table className="table table-striped">
                            <thead className="thead-dark">
                                <tr>
                                    <th className="first-table-column">
                                        Completed
                                    </th>
                                    <th className="second-table-column">
                                        {this.state.dataToShow} Tasks - {todoLength}
                                    </th>
                                    <th  className="third-table-column">
                                        Delete
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {todoItems.length > 0 
                                ? todoItems
                                : {}
                                }
                            </tbody>
                            <tfoot>
                                <ButtonBar buttonArray={buttonArray}/>
                            </tfoot>
                        </table>

                        { this.state.isAddingTodo &&
                            <form onSubmit={this.addTodo}>
                                <input placeholder="Enter New Note"/>
                                <button className="btn btn-primary" type="submit">Add</button>
                            </form>
                        }
                        
                        {/* <Modal open={this.state.isAddingTodo}> */}
                        {/* <Modal open={true}>
                          <h2>Hello Modal</h2>
                          <div className="form-group">
                            <label>Enter Name:</label>
                            <input
                              type="text"
                              className="form-control"
                            />
                          </div>
                          <div className="form-group">
                            <button type="button">
                              Save
                            </button>
                          </div>
                        </Modal> */}

                    </div>
                </div>
            </div>
        )
    }
}