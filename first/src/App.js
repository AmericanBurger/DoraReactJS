import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class ToDoItem extends Component {
  static defaultProps = {
    done: false
  }
  state = {
    done: this.props.done
  }

  toggleDone = () => {
    this.setState({done: !this.state.done})
  }

  render() {
    const { text } = this.props
    return(
      <div onClick={this.toggleDone} className={this.state.done ? 'doneToDo' : ''}>
        <p>{text}</p>
      </div>
    )
  }
}

class ToDoList extends Component {
  state = {
    tasks: this.props.tasks,
    draft: ''
  }

  updateDraft = event => {
    this.setState({draft: event.target.value})
  }

  addToDo = () => {
    const { tasks, draft } = this.state
    const list = tasks
    list.push(draft)
    this.setState({tasks: list, draft: ''})
  }

  render() {
    const { title } = this.props
    const { tasks, draft } = this.state
    return (
      <div>
        <h1>{title}</h1>
        {tasks.map(task => <ToDoItem text={task.text} done={task.done} />)}
        <input type='text' onChange={this.updateDraft} value={draft} />
        <button onClick={this.addToDo}>Submit</button>
      </div>
    )
  }
}

class App extends Component {
  myTab = [
    {text: 'Elo elo 3 2 0'},
    {text: 'benc'}
  ]

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>

        <p className="App-intro">
          <ToDoList title="Siema siema o tej porze każdy wypić może" tasks={this.myTab} />
        </p>
      </div>
    );
  }
}

export default App;
