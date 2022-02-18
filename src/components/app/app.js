import React, {Component} from "react";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import TodoList from "../todo-list";
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from "../item-add-form";

import './app.css';


export default class App extends Component {

  maxId = 100;

  state = {
    todoData : [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch')
    ]
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    }
  };

  addItem = (text) => {
    //generate id
    const newItem = this.createTodoItem(text);

    this.setState(({todoData}) => {

      const newArr = [
        ...todoData,
        newItem
      ];

      return {
        todoData: newArr
      };

    });
  };

  deleteItem = (id) => {
  
    this.setState(({todoData}) => {
      const idx = todoData.findIndex((el) => el.id === id);

      // [a,b,c,d,e]
      // [a,b,  d,e]

      const before = todoData.slice(0, idx);
      const after = todoData.slice(idx + 1);
      const newArr = [...before, ...after];
    
      return {
        todoData: newArr
      };
    });

  };


  toggleProp(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);

    const oldItem = arr[idx];
    const newItem = {...oldItem, 
                    [propName]: !oldItem[propName]};
    return [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx + 1)
    ];

  }

  onToggleImportant = (id) => {
    this.setState(({todoData}) => {

      return {
        todoData: this.toggleProp(todoData, id, 'important')
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({todoData}) => {

      return {
        todoData: this.toggleProp(todoData, id, 'done')
      };
    });
  };

  render() {

    const {todoData} = this.state;
    const doneCount = todoData
                      .filter((el) => el.done).length;

    const todoCount = todoData.length - doneCount;                  
    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
        <SearchPanel />
        <ItemStatusFilter />
        </div>
        <TodoList todos={todoData} 
        onDeleted={this.deleteItem}
        onToggleDone={this.onToggleDone}
        onToggleImportant={this.onToggleImportant}
        />

        <ItemAddForm addItem={this.addItem} />
    </div>
    );
  }
};
