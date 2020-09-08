import React, { Component } from 'react';
import ToDoItem from '../../components/ToDoItem'
import NewToDoForm from '../../components/NewToDoForm'
import styled from 'styled-components'
import * as toDoItemApi from '../../helpers/toDoItemApi'
import * as _ from 'ramda'
import uniqid from 'uniqid'

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
        {id: 0, text: 'PC'},
        {id: 1, text: 'TV'},
        {id: 2, text: 'Mobile'},
        {id: 3, text: 'Tablet'},
      ],
      title: "Thing List:"
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
    
    if(draft !== ''){
      list.push({id: uniqid(), text: draft, done: false})
      this.setState({tasks: list, draft: ''})
    }
    
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
