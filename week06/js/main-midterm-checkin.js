//imports
import { qs, onTouch } from './toDo-module.js';
import ToDos from './toDo-class.js';

let todoList = [];

const myTodos = new ToDos('todo-list', 'todo');
window.onload = () => {
    myTodos.listTodos()
};

// SELECTORS
const todoButton = qs('#todoBtn')
const todosListDisplay = qs('#todo-list')
const filterTodosEl = qs('#select-todo')

// EVENT LISTENERS
onTouch(todoButton, (e) => {
    myTodos.addTodo(e)
})

onTouch(todosListDisplay, (e) => {
    const todoId = e.target.parentElement.childNodes[1].dataset['todoid'];
    const todo = e.target.parentElement

    switch (e.target.classList[0]) {
        case 'trash-btn': // Delete Button
            todo.classList.add('fall')
            todo.addEventListener('transitionend', function() {
                myTodos.removeTodo(todoId)
            })
            break;
        case 'complete-btn': // Complete Button
            myTodos.completeTodo(todoId);
            break;
        default:
            break;
    }
})

onTouch(filterTodosEl, (e) => {
    const filterTag = e.target.dataset['value']
    console.log(filterTag);
    myTodos.filterTodo(filterTag)
})