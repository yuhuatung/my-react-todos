import React from "react"
import { connect } from "react-redux"
import { InputTask } from "../InputTask"
import { editTodoList } from "../../actions"

class ConnectList extends React.Component {

    constructor(props) {
        super(props)
        this.changeState = this.changeState.bind(this)
        this.updateTodolist = this.updateTodolist.bind(this)
        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)

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

    openEdit(event) {
        if (event.target.className.indexOf('icon') === -1 &&
            event.target.className.indexOf('taskChk') === -1) {
            this.list.current.style.display = 'none'
            console.log(this.props);
            this.setState({editTasks:(<InputTask closeAdd={this.closeEdit}
                listData={this.props.listData}
                changeState={this.changeState.bind(this)}
                editTodoList={this.props.editTodoList} />)})

        }
    }

    closeEdit() {
        this.list.current.style.display = ''
        this.setState({editTasks:null})
    }


    render() {

        //初始化組件
        return (
            <div class="listBlock">
                <div class={' list ' + (this.state.important == 'Y' ? ' important ' : '')}
                    onClick={this.openEdit}
                    ref={this.list}>

                    <input type="text"
                        class={' taskTitle ' +
                            (this.state.complete ? ' complete ' : '') +
                            (this.state.important ? ' important ' : '')}
                        value={this.props.listData.name} />

                    <i class={this.state.important == 'Y' ?
                        ' fas fa-star fa-lg iconImportant icon' : ' far fa-star fa-lg icon'}
                        onClick={this.changeState.bind(this, 'important')}></i>

                    <i class="fas fa-pen fa-lg icon"></i>
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

const ModifyList = connect(null, mapDispatchToProps)(ConnectList)

export { ModifyList }


