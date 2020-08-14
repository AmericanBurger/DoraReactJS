import React, { Component } from 'react'
import { get, update } from '../../helpers/toDoItemApi'
import { Formik } from 'formik'
import { withRouter } from 'react-router-dom'
import { 
    SubmitButton,
    TextInput,
    Label,
    Select,
    ErrorMsg,
    Check
} from '../../helpers/theme'
import * as _ from 'ramda'

class EditToDoForm extends Component {
    state = {
        toDoItem: null,
        fetched: false,
        disabled: false
    }

    itemId = () => this.props.match.params.itemId

    componentDidMount = async () => {
        const toDoItem = await get(this.itemId())
        this.setState({toDoItem, fetched: true})
    }

    render() {
        return(
            <div>
                Edit form for {this.props.match.params.itemId}
                <Formik
                    initialValues={{...this.state.toDoItem}}
                    onSubmit={(values) => {
                        update(this.itemId(), {...values})
                        this.props.history.push('/todo_items')
                    }}
                    validate={(values) => {
                        let errors = {}

                        if (!values.content) {
                            errors.content = "Required!"
                        }

                        if(_.isEmpty(errors)) {
                            this.setState({disabled: false})
                        } else {
                            this.setState({disabled: true})
                        }

                        return errors
                    }}
                    render={({
                        values,
                        errors,
                        touched,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                        isSubmitting
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <Label>
                                Content *
                                <ErrorMsg>{errors.content}</ErrorMsg>
                            </Label>
                            <TextInput 
                                name='content' 
                                onChange={handleChange}
                                value={values.content}
                            />
                            <br/><br/>
                            
                            <Label>
                                Priority
                                <Select name='priority' onChange={handleChange}
                                    value={values.priority}>
                                        <option value='low'>Low</option>
                                        <option value='high'>High</option>
                                        <option value='urgent'>Urgent</option>
                                </Select>
                            </Label>

                            <Label>
                                Done?
                                <Check type='checkbox' name='done' value={values.done}
                                    checked={values.done} onChange={handleChange} />
                            </Label>
                            <br/><br/><br/><br/>
                            
                            <SubmitButton type='submit' disabled={this.state.disabled}>
                                Update
                            </SubmitButton>
                        </form>
                    )}
                />
            </div>
        )
    }
}

export default withRouter(EditToDoForm)
