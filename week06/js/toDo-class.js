import { qs, readFromLS, writeToLS } from './toDo-module.js';

let todoList = [];

export default class ToDos {
    constructor(parentElementId, key) {
        this.parentElement = document.getElementById(parentElementId)
        this.key = key
    }

    addTodo(e) {
        e.preventDefault()
        const todoInput = qs('.todo-input')
        const newTask = todoInput.value
        if (newTask) {
            saveTodo(newTask, this.key)
            this.listTodos()
            todoInput.value = ''
        }
    }

    listTodos() {
        renderTodoList(getTodos(this.key), this.parentElement)
        taskCounter()

    }

    completeTodo(todoId) {
        const completedTodo = todoList.find(({
            id
        }) => id === parseInt(todoId))
        completedTodo.completed = !completedTodo.completed
        writeToLS(this.key, todoList)
        this.listTodos()
    }

    removeTodo(todoId) {
        todoList = todoList.filter((id) => {
            return id.id != parseInt(todoId);
        });
        writeToLS(this.key, todoList)
        this.listTodos()
    }

    filterTodo(filter) {
        todoList = readFromLS(this.key)
        switch (filter) {
            case 'all':
                this.listTodos()
                break;
            case 'active':
                todoList = todoList.filter((state) => {
                    return state.completed === false;
                });
                renderTodoList(todoList, this.parentElement)
                break;
            case 'completed':
                todoList = todoList.filter((state) => {
                    return state.completed === true;
                });
                renderTodoList(todoList, this.parentElement)
                break;

            default:
                break;
        }
    }
}

function saveTodo(task, key) {
    const todo = {
        id: Date.now(),
        content: task,
        completed: false
    }
    getTodos(key)
    todoList.push(todo)
    writeToLS(key, todoList)
}

function getTodos(key) {
    if (todoList.length === 0) {
        todoList = readFromLS(key)
        if (todoList === null) {
            todoList = []
        }
    }
    return todoList
}

function renderTodoList(list, element) {
    element.innerHTML = ''
    list.forEach(todo => {
        // Create div
        const todoDiv = document.createElement('div')
        todoDiv.classList.add('todo')
            // Check mark button
        const completedButton = document.createElement('button')
        completedButton.innerHTML = '<i class="fa-check">&#10004</i>'
        completedButton.classList.add('complete-btn')
        todoDiv.appendChild(completedButton)
            // Create li
        const newTodo = document.createElement('li')
        newTodo.innerText = todo.content
        newTodo.classList.add('todo-item')
        newTodo.setAttribute('data-todoid', todo.id)
        newTodo.setAttribute('data-completed', todo.completed)
        todoDiv.appendChild(newTodo)
            // Check trash button
        const trashButton = document.createElement('button')
        trashButton.innerHTML = '<i class="fa-trash">&#128465</i>'
        trashButton.classList.add('trash-btn')
        todoDiv.appendChild(trashButton)
            // Append to list
        element.appendChild(todoDiv)
    });
}

function taskCounter() {
    const totalTodos = qs('.todo-left')
    let completed = todoList.filter((state) => {
        return state.completed === false;
    });
    const plural = completed.length > 1 ? 's' : ''
    totalTodos.innerText = `Task${plural} left: ${completed.length}`
    console.log(todoList);
}