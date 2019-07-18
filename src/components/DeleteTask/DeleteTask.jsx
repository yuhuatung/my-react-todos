import React from "react"
import {ToDeleteLists} from "../ToDeleteLists"

class DeleteTask extends React.Component{
    render(){
        return (
            <div class="InputTasksForm">
                <ToDeleteLists page="progress" />
            </div>
        )
    }
}

export { DeleteTask }