import React from "react"
import { connect } from "react-redux"
import { List } from "../List"
import { addTodoList } from "../../actions"

class ConnectTodoLists extends React.Component {

    constructor(props) {
        super(props)
        if (this.props.data) {
            this.state = this.props
        }
        else {
            this.state = { id: '', name: '', date: '', time: '',important: '', complete: false }
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        fetch(
            'https://www.googleapis.com/calendar/v3/calendars/adam.yh.dong%40gmail.com/events?timeMin=2019-07-03T10%3A00%3A00-07%3A00&key='
        ).then(res => res.json()).then(data => {
            let calendarListNum = data.items.length;
            {/* this.setState(preState => ({
                data: preState.data.concat({id:8,name:'Test setState',date:'2018-10-19',time:'20:00',important:'',complete:false})
            })) */}
            for(var i = 0; i < calendarListNum; i++){
                this.state = { id: '', name: data.items[i].summary,
                        date: data.items[i].start.dateTime.substring(0,10).replace(/\-/g, '/'),
                        time: data.items[0].start.dateTime.substr(11,5),
                        important: '', complete: false }
                this.props.addTodoList(this.state);
            }
        }).catch(e => console.log('error:', e))
    }

    render() {
        //先排序
        this.props.data
            .sort((f, s) => { return f.id < s.id ? 1 : -1 })
            .sort((f, s) => { return f.important < s.important ? 1 : -1 })
        //算次數
        let todoCount = 0
        let Lists = this.props.data.map((item) => {
            switch (this.props.page){
                case "progress":{
                    if(item.complete)
                        return null
                    break;
                }
                case "completed":{
                    if(!item.complete)
                        return null
                    break;
                }
            }

            //算數量
            if(this.props.page){
                todoCount++
            }
            else if(!item.complete){
                todoCount++
            }

            return <List key={item.id} listData={item} />
        })

        return (
            <div>
                <div class="listBlock">
                    <input type="button" class="calendarButton" value="Get data from Google Calendar" onClickCapture={this.handleClick.bind(this)} />
                </div>
                <div>
                    {Lists}
                </div>
                <div class="countText">
                    <span>{todoCount} tasks {this.props.page === "completed" ? "completed" : "left"}</span>
                </div>
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => {
    return {
        //使用dispatch操作store
        addTodoList: todoList => dispatch(addTodoList(todoList))
    }
}
const mapStateToProps = state => {
    return { data: state }
}
const ToAddLists = connect(mapStateToProps, mapDispatchToProps)(ConnectTodoLists)
export { ToAddLists }