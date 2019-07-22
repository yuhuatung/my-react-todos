import React from "react"

class InputTasksForm extends React.Component {
    render() {
        return (
            <div class="saveButtons">
                <div>
                    <button type="button" class="addButton saveButton" onClick={this.props.submitTodo}>Save</button>
                    <button type="button" class="addButton cancelButton" onClick={this.props.closeAdd}>Cancel</button>
                </div>
            </div>
        )
    }
}

export { InputTasksForm } 