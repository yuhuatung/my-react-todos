import React from "react"
import { connect } from "react-redux"
import { List } from "../List"

class ConnectToDeleteLists extends React.Component {

    constructor(props) {
        super(props)
        if (this.props.data) {
            this.state = this.props.data
        }
        else {
            this.state = { id: '', name: '', important: '', complete: false }
        }
        this.searchHandler = this.searchHandler.bind(this)
    }
    searchHandler(event) {
        let searcjQery = event.target.value.toLowerCase()
        if(this.state.searchList){
            delete this.state["searchList"];
        }
        let searchList = this.props.data.filter((el) => {
            let searchValue = el.name.toLowerCase();
            return searchValue.indexOf(searcjQery) !== -1;
        })
        this.setState({
            searchList: searchList
        })
    }

    render() {
        //先排序
        let contacts = this.state.searchList;
        this.props.data
            .sort((f, s) => { return f.important < s.important ? -1 : 1 })
            .sort((f, s) => { return f.complete > s.complete ? 1 : -1 })
        //算次數
        let todoCount = 0
        let QueryLists
        if(this.state.searchList){
            QueryLists = this.state.searchList.map((item) => {
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

        } else {
            QueryLists = this.props.data.map((item) => {
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
        }
        return (
            <div>
                <div>
                    <input type="text" className="search" onChange={this.searchHandler}/>
                    {QueryLists}
                </div>
                <div class="countText">
                    <span>{todoCount} tasks {this.props.page === "completed" ? "completed" : "left"}</span>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { data: state }
}

const ToQueryLists = connect(mapStateToProps)(ConnectToDeleteLists)

class QueryTask extends React.Component{
    render(){
        return (
            <div class="InputTasksForm">
                <ToQueryLists page="progress" />
            </div>
        )
    }
}

export { QueryTask }