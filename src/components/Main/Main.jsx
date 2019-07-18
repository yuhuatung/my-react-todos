import React from "react"
import { Provider } from "react-redux"
import { HashRouter, Route } from "react-router-dom"
import { TopBlock } from "../TopBlock"
import { AddTasks } from "../AddTasks"
import { ModifyTask } from "../ModifyTask"
import { DeleteTask } from "../DeleteTask"
import { QueryTask } from "../QueryTask"
import { todoListStore } from "../../store"

class Main extends React.Component {
    render() {
        return (
            <Provider store={todoListStore}>
                <HashRouter>
                    <div class="alignCenter">
                        <TopBlock />
                        <Route exact path="/" component={AddTasks} />
                        <Route exact path="/modify" component={ModifyTask} />
                        <Route exact path="/delete" component={DeleteTask} />
                        <Route exact path="/query" component={QueryTask} />
                    </div>
                </HashRouter>
            </Provider>
        )
    }
}

window.store = todoListStore

export { Main }