import React from "react"
import {AddTask} from "../AddTask"
import {ToAddLists} from "../ToAddLists"

class AddTasks extends React.Component{
    render(){
        return (
            <div class="inputTasksForm">
                <AddTask />
                <ToAddLists page="progress"/>
            </div>
        )
    }
}

export { AddTasks }