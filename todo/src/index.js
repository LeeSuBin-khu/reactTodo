import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './App';
import './index.css';

let todoList = localStorage.getItem('todo')?JSON.parse(localStorage.getItem('todo')):[];

let initialState = {
  todoID: todoList.length!==0?todoList[todoList.length-1].id+1:1,
  add: false,
  edit: false,
  delete: false,
  complete: null,
  completeItem: [],
}

function reducer(state = initialState, action) {
  let tempState = {...state};
  switch (action.type) {
    case 'TODO_ID':
      tempState.todoID = action.data;
      break;
    case 'ADD':
      tempState.add = action.data;
      break;
    case 'EDIT':
      tempState.edit = action.data;
      break;
    case 'DELETE':
      tempState.delete = action.data;
      break;
    case 'COMPLETE_ITEM':
      tempState.completeItem = action.data;
      break;
    case 'COMPLETE':
      tempState.complete = action.data;
      break;
    default:
      break;
  }
  return tempState;
}

let store = createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);