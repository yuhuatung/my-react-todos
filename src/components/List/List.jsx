import React from "react"
import { connect } from "react-redux"
import { editTodoList } from "../../actions"

class ConnectList extends React.Component {

    constructor(props) {
        super(props)
        this.changeState = this.changeState.bind(this)
        this.updateTodolist = this.updateTodolist.bind(this)
        this.list = React.createRef()
        this.state = {important:this.props.listData.important
                        ,editTasks:null}

    }

    changeState(type) {

        switch (type) {
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
        updateList = {...updateList,important:this.state.important}
        this.props.editTodoList(updateList)
    }

    render() {

        //初始化組件
        return (
            <div class="listBlock">
                <div class={' list ' + (this.state.important == 'Y' ? ' important ' : '')} ref={this.list}>
                    <div class={this.state.important == 'Y' ?
                        ' fas fa-star fa-lg iconImportant icon' : ' far fa-star fa-lg icon'}
                        onClick={this.changeState.bind(this, 'important')}></div>
                    <div class={' listTitle ' +
                            (this.state.important ? ' important ' : '')}
                        >{this.props.listData.name} </div>
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

const List = connect(null, mapDispatchToProps)(ConnectList)

export { List }


