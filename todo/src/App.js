import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ToDoList from './containers/ToDoList'
import EditToDoForm from './components/EditToDoForm'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  background: #2b2e39;
  margin: 0 auto;
  width: 80%;
  max-width: 800px;
  padding: 14px;
  border-radius: 14px;
  margin-top: 14px;
`

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>

        <Router>
          <Container>
            <Route exact path='/todo_items' component={ToDoList} />
            <Route path='/todo_items/:itemId' component={EditToDoForm} />
          </Container>
        </Router>
      </div>
    );
  }
}

export default App;
