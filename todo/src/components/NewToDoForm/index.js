import React from 'react';
import styled from 'styled-components'

const Button = styled.button`
  background: #232632;
  color: #00a7fa;
  width: 80px;
  height: 32px;
  font-size: 1.7em;
  border: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const TextInput = styled.input`
  padding: 5px;
  font-size: 1em;
  background: #232632;
  color: #d3d4d6;
  width: 100%;
  margin-right: 7px;
  border: 0px;
  -webkit-appearance: none;
`

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  border: 2px solid #343744;
  background: #232632;
  border-radius: 10px;
  padding: 5px;
  height: 50px;
  clear: both;
`

const Label = styled.label`
  display: flex;
  flex-direction: column;
  color: #777;
  font-size: 0.8em;
  margin-right: 50px;
  position: relative;
`

const NewToDoForm = ({onChange, draft, onSubmit}) => (
  <div><br/>
    <Container>
      <Label>Name</Label>
      <TextInput type='text' onChange={onChange} value={draft} />
    </Container>

    <Container>
      <Label>Bought_at</Label>
      <TextInput type='date' />
    </Container>

    <Container>
      <Label>Store</Label>
      <TextInput type='text' />
      <Button onClick={onSubmit}>+</Button>
    </Container>
  </div>
)

export default NewToDoForm
  