import React from "react"
import { connect } from "react-redux"
import { InputTask } from "../InputTask"
import { editTodoList } from "../../actions"

class ConnectList extends React.Component {

    constructor(props) {
        super(props)
        this.changeState = this.changeState.bind(this)
        this.updateTodolist = this.updateTodolist.bind(this)
        this.list = React.createRef()

        this.state = {important:this.props.listData.important
                        ,complete:this.props.listData.complete
                        ,editTasks:null}

    }

    changeState(type) {

        switch (type) {
            case "complete": {
                this.setState({ complete: window.event.target.checked },this.updateTodolist)
                break;
            }
            case "important": {
                if (this.state.important === '')
                    this.setState({ important: 'Y' },this.updateTodolist)
                else
                    this.setState({ important: '' },this.updateTodolist)
                break;
            }
        }
    }

    updateTodolist(){
        let updateList = Object.assign({},this.props.listData)
        updateList = {...updateList,complete:this.state.complete,important:this.state.important}
        this.props.editTodoList(updateList)
    }

    render() {

        //初始化組件
        return (
            <div class="listBlock">
                <div class={' list ' + (this.state.important == 'Y' ? ' important ' : '')} ref={this.list}>

                    <div class="inputDelete">
                        <input type="checkbox" class="taskChk"
                        checked={this.state.complete}
                        onChange={this.changeState.bind(this, 'complete')} />
                        </div>

                    <div class={' listTitle ' +
                            (this.state.important ? ' important ' : '')}
                        >{this.props.listData.name} </div>
                </div>

                <div>
                    {this.state.editTasks}
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        editTodoList: todoList => dispatch(editTodoList(todoList))
    }
}

const DeleteList = connect(null, mapDispatchToProps)(ConnectList)

export { DeleteList }