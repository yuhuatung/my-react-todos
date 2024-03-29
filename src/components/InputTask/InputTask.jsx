import React from "react"
import { connect } from "react-redux"
import { InputTasksForm } from "../InputTasksForm"
import { addTodoList } from "../../actions"


class ConnectInputTask extends React.Component {
    constructor(props) {
        super(props)
        if (this.props.listData) {
            this.state = this.props.listData
        }
        else {
            this.state = { id: '', name: '', important: '', complete: false }
        }
        this.changeState = this.changeState.bind(this)
        this.submitTodo = this.submitTodo.bind(this)
        this.tagImportant = this.tagImportant.bind(this)
        this.filebox = React.createRef()

        this.changeListState = type =>{
            if(this.props.changeState)
                this.props.changeState(type)
            else
                console.log('新增狀態所以沒有this.props.changeState')
        }
    }

    tagImportant() {
        //如果現在不是重要的就把它變重要的
        if (this.state.important === '') {
            this.setState({ important: 'Y' })
        }
        else {
            this.setState({ important: '' })
        }
        this.changeListState('important')
    }

    changeState(event) {
        let value = event.target.value
        if (event.target.name === 'file') {
            value = value.substring(value.lastIndexOf('\\') + 1)
        }
        else if (event.target.name === 'complete') {
            value = event.target.checked
            this.changeListState('complete')
        }
        this.setState({ [event.target.name]: value })
    }

    submitTodo() {
        //先檢查資料，至少要有名稱
        console.log(this.state)
        if (this.state.name === '') {
            alert('待辦事項名稱未輸入！')
        }
        else {
            if (this.state.id === '') {
                console.log(this.state)
                this.props.addTodoList(this.state)
                alert('成功新增！')
            }
            else {
                this.props.editTodoList(this.state)
                alert('編輯成功！')
            }
            this.setState({ id: '', name: '', important: '', complete: false })
            //不受控組件另外處理
            //this.filebox.current.value = ''
            //關閉新增畫面
            this.props.closeAdd()
        }
    }

    render() {
        return (
            <div>
                <div class={this.state.important == 'Y' ?
                    'important inputTaskTitle' : 'inputTaskTitle'}>
                    {/*替該name設定對應的state名稱，然後指定value為state中的值，和增加onChange事件，讓值改變時可以同時寫回`state`*/}
                    <input name="name" type="text" placeholder="Type Something Here…"
                        class={(this.state.important == 'Y' ?
                            'important taskTitle ' : 'taskTitle ') +
                            (this.state.complete ? 'complete' : '')}
                        value={this.state.name}
                        onChange={this.changeState} />
                    <i class={this.state.important == 'Y' ?
                        'fas fa-star fa-lg icon iconImportant' : 'far fa-star fa-lg icon'}
                        onClick={this.tagImportant} ></i>
                    <i class="fas fa-pen fa-lg icon icon_edit"></i>
                </div>
                <InputTasksForm closeAdd={this.props.closeAdd}
                    stateData={this.state}
                    changeState={this.changeState}
                    submitTodo={this.submitTodo}
                    filebox={this.filebox} />
            </div>)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        //使用dispatch操作store
        addTodoList: todoList => dispatch(addTodoList(todoList))
    }
}

const InputTask = connect(null, mapDispatchToProps)(ConnectInputTask)

export { InputTask }