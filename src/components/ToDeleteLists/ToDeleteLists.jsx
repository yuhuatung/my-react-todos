import React from "react"
import { connect } from "react-redux"
import { DeleteList } from "../DeleteList"

class ConnectToDeleteLists extends React.Component {
    render() {
        //先排序
        this.props.data
            .sort((f, s) => { return f.id < s.id ? 1 : -1 })
            .sort((f, s) => { return f.important < s.important ? 1 : -1 })
        console.log(this.props.data)
        //算次數
        let todoCount = 0
        let DeleteLists = this.props.data.map((item) => {
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

            return <DeleteList key={item.id} listData={item} />
        })

        return (
            <div>
                <div>
                    {DeleteLists}
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

const ToDeleteLists = connect(mapStateToProps)(ConnectToDeleteLists)


export { ToDeleteLists }