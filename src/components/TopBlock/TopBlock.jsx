import React from "react"
import {BookMark} from "../BookMark"

class TopBlock extends React.Component{
    render(){
        return(
            <div id="topBlock">
                <BookMark to="/" name="Add Task" />
                <BookMark to="/modify" name="Modify Task" />
                <BookMark to="/delete" name="Delete Task" />
                <BookMark to="/query" name="Search" />
            </div>
        )
    }
}

export {TopBlock}