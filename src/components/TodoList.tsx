import { render } from '@testing-library/react';
import React, { Component } from 'react';
import '../App.css';
import todosData from "../data/todosData.js"
import ButtonBar from './ButtonBar';
import TodoItem from "./TodoItem"

export default class TodoList extends Component<{todos: any}, { }> {

    constructor(props: any) {
        super(props);
        this.completeTodo = this.completeTodo.bind(this)
        this.deleteTodo = this.deleteTodo.bind(this)
        this.showCompleted = this.showCompleted.bind(this)
        this.showIncomplete = this.showIncomplete.bind(this)
        this.showAll = this.showAll.bind(this)
        this.addTodo = this.addTodo.bind(this)
        this.saveTodos = this.saveTodos.bind(this)
    }

    showCompleted() {
        let newTodos = this.props.todos.slice()
        newTodos = newTodos.map((item: {completed: boolean, id: number}) => {
            if (item.completed) {
                return item;
            }
        })
        this.setState({todos: newTodos.slice()})
      }
      
    showIncomplete = () => {
        console.log("IN INCOMPLETE")
    }

    addTodo = () => {
        console.log("IN ADD TODO")
    }

    saveTodos = () => {
        console.log("IN SAVE TODOS")
    }

    showAll = () => {
        console.log("IN SHOW ALL")
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
            let newTodos = this.props.todos.map ((item: {id: number, completed: boolean, deleted: boolean, text: string}) => {
                if (item.id === id){
                    item.deleted = true;
                }
                return item;
            })
            this.setState({todos: newTodos.slice()})
        }
    }

    render(){

        const style = "lineThroughText"

        
        const todoItems = this.props.todos.map(
            (item: { id: number, completed: boolean, deleted: boolean; }) => {
            if (!item.deleted) {
                return <TodoItem 
                key={item.id} item={item} completeTodo={this.completeTodo}
                deleteTodo={this.deleteTodo}/>
            }
        })
        
        return (
            <div className="todo-list">
                <div className="row">
                    <div className="col-lg-12">
                        <table className="table table-striped">
                            <thead className="thead-dark">
                                <tr>
                                    <th className="first-table-column">
                                        Completed
                                    </th>
                                    <th className="second-table-column">
                                        Note
                                    </th>
                                    <th  className="third-table-column">
                                        Delete
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {todoItems}
                            </tbody>
                            <tfoot className="tfoot-style">
                                <ButtonBar showCompleted={this.showCompleted} 
                                           showIncomplete={this.showIncomplete} 
                                           showAll={this.showAll}
                                           saveTodos={this.saveTodos}
                                           addTodo={this.addTodo}/>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}