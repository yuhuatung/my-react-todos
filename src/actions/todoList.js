import {ADD_TODOLIST} from "../constants/todoAction-type.js"
import {EDIT_TODOLIST} from "../constants/todoAction-type.js"

export function addTodoList(todoList){
    return {
        type : ADD_TODOLIST,
        payload : todoList}
}

export const editTodoList = todoList => ({
    type : EDIT_TODOLIST,
    payload : todoList
})