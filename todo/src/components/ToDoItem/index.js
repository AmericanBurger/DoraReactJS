import React, { Component } from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Item = styled.div`
  background: #343744;
  border-radius: 10px;
  padding: 14px;
  margin-bottom: 7px;
  color: ${props => props.done ? 'red' : 'auto'};
  text-decoration: ${props => props.done ? 'line-through': 'auto'}
`

const StyledLink = styled(Link)`
  color: lightgreen;
  text-decoration: none;
  margin-left: 5px;
  float: right;

  &:hover {
    color: #fff;
  }
`

const DeleteButton = styled.button`
  float: left;
`

class ToDoItem extends Component {
    static defaultProps = {
      done: false
    }
    state = {
      done: this.props.done
    }
  
    toggleDone = () => this.setState({done: !this.state.done})
    
    destroy = () => {
      this.props.destroy(this.props.id)
      this.setState({done: false})
    }
  
    render() {
      const { id, text } = this.props
      return(
        <Item done={this.state.done}>
          <DeleteButton onClick={this.destroy}>[x]</DeleteButton>
          <StyledLink to={`/todo_items/${id}`}>edit</StyledLink>
          <div onClick={this.toggleDone}>{text}</div>
        </Item>
      )
    }
  }

  export default ToDoItem
  