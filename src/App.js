import React, { useState, useEffect } from 'react';
import './App.css';
// Importing Components
import Form from './components/Form'
import TodoList from './components/TodoList'

function App() {
  // State
  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);
  // Run Once
  useEffect(() => {
    getLocalTodos();
  }, [])
  // UseEffect
  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status])

  // Functions
  const filterHandler = () => {
    switch (status) {
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true))
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false))
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  }
  // Save to Local
  const saveLocalTodos = () => {
    if (localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]));
    } else {
      localStorage.setItem('todos', JSON.stringify(todos))
    }
  }
  const getLocalTodos = () => {
    if (localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem('todos'));
      setTodos(todoLocal)
    }
  }
  return (
    <div className="App">
      <header>
        <h1>ToDo List </h1>
      </header>
      <Form inputText={inputText} setInputText={setInputText} todos={todos} setTodos={setTodos} setStatus={setStatus} />
      <TodoList todos={todos} inputText={inputText} setTodos={setTodos} filteredTodos={filteredTodos}/>
    </div>
  );
}

export default App;
