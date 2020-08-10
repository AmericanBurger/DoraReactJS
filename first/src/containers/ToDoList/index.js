import React, { Component } from 'react';
import ToDoItem from '../../components/ToDoItem'
import NewToDoForm from '../../components/NewToDoForm'
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
    static defaultProps = {
        tasks: [
            {text: 'first task'},
            {text: 'second task'}
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
    this.setState({tasks: list, draft: ''})
  }

  removeAll = () => {
    this.setState({tasks: []})
  }

  render() {
    const { title } = this.props
    const { tasks, draft } = this.state
    return (
      <Container>
        <ClearButton onClick={this.removeAll}>Remove all</ClearButton>
        <Header>{title}</Header>
        {tasks.map(task => <ToDoItem text={task.text} done={task.done} />)}
        <NewToDoForm 
          onSubmit={this.addToDo}
          onChange={this.updateDraft}
          draft={draft} />
      </Container>
    )
  }
}

export default ToDoList
