import React from "react"
import {ToModifyLists} from "../ToModifyLists"

class ModifyTask extends React.Component{
    render(){
        return (
            <div class="InputTasksForm">
                <ToModifyLists page="progress" />
            </div>
        )
    }
}

export { ModifyTask }