import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class ToDo extends Component {
  state = {
    tasks: this.props.tasks,
    draft: ''
  }

  updateDraft = event => {
    this.setState({draft: event.target.value})
  }

  addThing = () => {
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
        {tasks.map(task => <div><p>{task}</p></div>)}
        <input type='text' onChange={this.updateDraft} value={draft} />
        <button onClick={this.addThing}>Submit</button>
      </div>
    )
  }
}

class App extends Component {
  myTab = [
    'Elo elo 3 2 0',
    'benc'
  ]

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>

        <p className="App-intro">
          <ToDo title="Siema siema o tej porze każdy wypić może" tasks={this.myTab} />
        </p>
      </div>
    );
  }
}

export default App;
