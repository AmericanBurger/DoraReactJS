import React, { Component } from 'react';
import ToDoItem from '../../components/ToDoItem'
import NewToDoForm from '../../components/NewToDoForm'
import styled from 'styled-components'
import * as toDoItemApi from '../../helpers/toDoItemApi'
import * as _ from 'ramda'

const Header = styled.h1`
  color: #fff;
  clear: both;
`

const ClearButton = styled.button`
  border-radius: 10px;
  background: red;
  padding: 5px;
  color: #fff;
  margin-bottom: 10px;
  float: left;
`

class ToDoList extends Component {
  componentDidMount = async () => {
    const tasks = await toDoItemApi.getAll()
    this.setState({tasks})
  }

  static defaultProps = {
      tasks: [
        {text: 'first task'},
        {text: 'second task'},
        {text: 'third task'},
        {text: 'fourth task'},
        {text: 'fifth task'},
        {text: 'sixth task'},
        {text: 'seventh task'},
        {text: 'eighth task'}
      ],
      title: "To do:"
  }

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
    list.push({text: draft, done: false})
    // const task = toDoItemApi.create({text: draft})

    this.setState({tasks: list, draft: ''})
    // this.setState({tasks: _.append(task, tasks), draft: ''})
  }

  findById = (id, arr) => {
    const index = _.findIndex(_.propEq('id', id))(arr)
    return { index, task: arr[index] }
  }

  destroyToDo = (id) => {
    const { tasks } = this.state
    toDoItemApi.destroy(id)
    const { index } = this.findById(id, tasks)

    this.setState({tasks: _.remove(index, 1, tasks)})
  }

  toggleDone = (id) => {
    const { tasks } = this.state
    const { index, task } = this.findById(id, tasks)
    const response = toDoItemApi.update(id, {done: !task.done})

    this.setState({tasks: _.update(index, response, tasks)})
  }

  removeAll = () => {
    this.setState({tasks: []})
  }

  render() {
    const { title } = this.props
    const { tasks, draft } = this.state
    return (
      <div>
        <ClearButton onClick={this.removeAll}>Remove all</ClearButton>
        <Header>{title}</Header>
        {tasks.map(task => 
          <ToDoItem 
            id={task.id}
            key={task.id}
            destroy={this.destroyToDo}
            text={task.text} 
            toggleDone={this.toggleDone}
            done={task.done} />)}
        <NewToDoForm 
          onSubmit={this.addToDo}
          onChange={this.updateDraft}
          draft={draft} />
      </div>
    )
  }
}

export default ToDoList
