import React from "react"
import { InputTask } from "../InputTask"

class AddTask extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showing: true
        }
        this.closeAdd = this.closeAdd.bind(this);
    }

    onAdd() {
        this.setState({showing: !this.state.showing});
    }

    closeAdd() {
        this.setState({showing: !this.state.showing});
    }

    render() {
        return (
            <div>
                <div>
                    <input id="addTask" value=" ＋ Add Task" onClick={() => this.onAdd()}
                    style={{ display: (this.state.showing ? '' : 'none')}}/>
                </div>
                <div id="inputTask" style={{ display: (this.state.showing ? 'none' : '')}}>
                    <InputTask closeAdd={this.closeAdd} />
                </div>
            </div>
        )
    }
}

export { AddTask }