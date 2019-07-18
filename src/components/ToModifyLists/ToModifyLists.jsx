import React from "react"
import { connect } from "react-redux"
import { ModifyList } from "../ModifyList"

class ConnectToModifyLists extends React.Component {
    render() {
        //先排序
        this.props.data
            .sort((f, s) => { return f.important < s.important ? -1 : 1 })
            .sort((f, s) => { return f.complete > s.complete ? 1 : -1 })
        console.log(this.props.data)
        //算次數
        let todoCount = 0
        let ModifyLists = this.props.data.map((item) => {
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

            return <ModifyList key={item.id} listData={item} />
        })

        return (
            <div>
                <div>
                    {ModifyLists}
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

const ToModifyLists = connect(mapStateToProps)(ConnectToModifyLists)


export { ToModifyLists }