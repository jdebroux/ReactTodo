import { render } from '@testing-library/react';
import axios from 'axios';
import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import '../../../App.css';
import { Todo } from '../../interfaces/Todo';
import ButtonBar from '../buttonBar/ButtonBar';
import TodoItem from "./TodoItem"
import {getHttp, todoUrl } from "../userAccount/Authentication" 
import { notStrictEqual } from 'assert';
import todosData from '../../../data/todosData';

interface TodoListProps {
    isLoggedIn: boolean;
}

interface TodoListState {
    todos: Todo[],
    dataToShow: string,
    isAddingTodo: boolean,
    isEditingTodo: boolean,
    editingOrDeletingTodo: Todo,
    task: string
}

export default class TodoList extends Component<TodoListProps, TodoListState> {

    constructor(props: any) {
        super(props);
        this.state = {
            todos: [],
            dataToShow: 'All',
            isAddingTodo: false,
            isEditingTodo: false,
            editingOrDeletingTodo: {},
            task: ""
        }
        this.completeTodo = this.completeTodo.bind(this)
        this.deleteTodo = this.deleteTodo.bind(this)
        this.getTodos = this.getTodos.bind(this)
    }

    showCompleted = () => {
        this.setState({dataToShow: "Completed"});
    }
      
    showIncomplete = () => {
        this.setState({dataToShow: "Incomplete"});
    }

    onAddTodo = (event: any) => {
        this.setState({ task: event.target.value});
    }

    enterAddTodo = () => {
        this.setState({isAddingTodo: true})
    }

    componentDidMount = () => {
        if (this.props.isLoggedIn){
            this.getTodos()
        }
            
    }    

    addTodo = () => {
        let todos = this.state.todos.slice();

        let todo: Todo = {
            task: this.state.task,
            completed: false,
            deleted: false,
          };
      
        axios.post(todoUrl, todo, getHttp()).then((resp) => {
            todos.unshift(resp.data);
            this.setState({ todos: todos, task: "", isAddingTodo: false, dataToShow: "All" })
        })
    }

    enterEditTodo = (todo: Todo) => {
        this.setState({editingOrDeletingTodo: todo, isEditingTodo: true})
    }

    editTodo = (editedTodo: Todo, task: string) => {
        let allTodos = this.state.todos.slice()
        if (task){
            editedTodo.task = task
        }
        axios.put(todoUrl + "/" + editedTodo.id, editedTodo, getHttp()).then((resp) => {
            for (let i = 0; i < allTodos.length; i++){
                if (allTodos[i].id === editedTodo.id){
                    allTodos[i] = resp.data;
                    break;
                }
            }
            this.setState({todos: allTodos, isEditingTodo: false})
        });
    }

    getTodos = () => {
        if (!this.props.isLoggedIn) {
            console.error("Not Logged In!")
        } else {
            return axios.get<Todo[]>(todoUrl, getHttp()).then((resp) => {
                let todos = resp.data;
                this.setState({todos: todos})
            })
        }
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
        let newTodos = this.state.todos.slice()
        newTodos = newTodos.map((item: any) => {
            if (item.id === id) {
                item.completed = !item.completed
                this.editTodo(item, '')
            }
            return item
        })

        this.setState({todos: newTodos.slice()})
    }

    deleteTodo(id: number) {
        let verify = confirm("Are you sure you want to delete this task?")
        if (verify) {
            let i = 0;
            this.state.todos.map((item: Todo) => {
                if (item.id === id){
                    item.deleted = true;
                    this.deleteCall(id)
                }
            })
        }
    }

    deleteCall(id: number) {
        let allTodos = this.state.todos.slice()
        axios.delete(todoUrl + "/" + id, getHttp()).then((resp) => {
            if (resp.status == 204) {
                for (let i = 0; i < allTodos.length; i++) {
                    if (allTodos[i].id === id){
                        allTodos.splice(i, 1)
                        break;
                    }
                }
            }
            this.setState({todos: allTodos, isEditingTodo: false})
        });
    }

    render(){

        const buttonArray = [
            {
                id: 1,
                buttonAction: this.enterAddTodo,
                buttonText: "Add Todo",
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
            }                                  
        ];

        let todoItems: any = [];
        let todoLength = 0;
        
        switch(this.state.dataToShow){
            case "Completed":
                todoItems = this.state.todos.map(
                    (item: Todo) => {
                    if (!item.deleted && item.completed) {
                            return <TodoItem key={item.id} item={item} completeTodo={this.completeTodo}
                                             deleteTodo={this.deleteTodo} enterEditTodo={this.enterEditTodo}/>
                    }
                });
                break;

            case "Incomplete":
                todoItems = this.state.todos.map(
                    (item: Todo) => {
                    if (!item.deleted && !item.completed) {
                            return <TodoItem key={item.id} item={item} completeTodo={this.completeTodo}
                                             deleteTodo={this.deleteTodo} enterEditTodo={this.enterEditTodo}/>
                    }
                });
                break;

            case "All": 
                todoItems = this.state.todos.map(
                    (item: Todo) => {
                    if (!item.deleted) {
                            return <TodoItem key={item.id} item={item} completeTodo={this.completeTodo}
                                             deleteTodo={this.deleteTodo} enterEditTodo={this.enterEditTodo}/>
                    }
                });
                break;
        }

        todoLength = this.calculateNonNullItems(todoItems, todoLength);
        
        return (
            <div>
                <div className="todo-list">
                    <div className="row table-height">
                        <div className="col-lg-12">
                            <table className="table table-striped todo-table">
                                <thead className="thead-dark">
                                    <tr>
                                        <th className="first-table-column">
                                            Completed
                                        </th>
                                        <th className="second-table-column">
                                            {this.state.dataToShow} Tasks - {todoLength}
                                        </th>
                                        <th  className="third-table-column">
                                            Delete | Edit
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        todoItems.length > 0 
                                            && todoItems
                                    }
                                </tbody>
                                <tfoot>
                                    <ButtonBar buttonArray={buttonArray}/>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
                { 
                        this.state.isAddingTodo
                        ?   <form>
                                <input type="text" className="form-control" 
                                       onChange={this.onAddTodo} placeholder="Enter new note"/>
                                <input className="btn btn-primary" type="button" onClick={this.addTodo} value="Add"/>
                            </form>
                        : this.state.isEditingTodo
                            &&  <form>
                                    <input type="text" className="form-control" 
                                           onChange={this.onAddTodo} placeholder={this.state.editingOrDeletingTodo.task}/>
                                    <input className="btn btn-primary" type="button" onClick={() => this.editTodo(this.state.editingOrDeletingTodo, this.state.task)} value="Edit"/>
                                </form>
                    }
            </div>
        )
    }
}