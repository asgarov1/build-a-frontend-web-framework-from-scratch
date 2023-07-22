const todos = ['Walk the dog', 'Water the plants', 'Sand the chairs']

const addTodoInput = document.getElementById('todo-input')
const addTodoButton = document.getElementById('add-todo-btn')
const todosList = document.getElementById('todos-list')

for (const todo of todos) {
    let liNode = renderTodoInReadMode(todo);
    console.log(`Created liNode ${liNode}`)
    todosList.append(liNode)
}

addTodoInput.addEventListener('input', () => {
    addTodoButton.disabled = addTodoInput.value.length < 3
})

addTodoInput.addEventListener('keydown', ({key}) => {
    if (key === 'Enter' && addTodoInput.value.length >= 3) {
        addTodo()
    }
})

addTodoButton.addEventListener('click', () => addTodo())


// Functions
function renderTodoInReadMode(todo) {
    const li = document.createElement('li')

    const span = document.createElement('span');
    span.textContent = todo
    span.addEventListener('dblclick', () => {
        const idx = todos.indexOf(todo)

        todosList.replaceChild(
            renderTodoInEditMode(todo),
            todosList.childNodes[idx]
        )
    })

    li.append(span)

    const button = document.createElement('button')
    button.textContent = 'Done'
    button.addEventListener('click', () => {
        const idx = todos.indexOf(todo)
        markTodoAsDone(idx)
    })
    li.append(button)

    return li;
}

function removeTodo(index) {
    todos.splice(index, 1)
    todosList.childNodes[index].remove()
}

function markTodoAsDone(index) {
    let liNode = todosList.childNodes[index];
    liNode.classList.add("done")
    liNode.removeChild(liNode.lastChild)
}

function addTodo() {
    const description = addTodoInput.value

    if (todos.some(todo => todo === description)) {
        window.alert(`Todo '${description}' already exists!`)
        return;
    }

    todos.push(description)
    const todo = renderTodoInReadMode(description);
    todosList.append(todo)

    addTodoInput.value = ''
    addTodoButton.disabled = true

    readTodo(description)
}

function readTodo(description) {
    const message = new SpeechSynthesisUtterance()
    message.text = description
    message.voice = speechSynthesis.getVoices()[0]
    speechSynthesis.speak(message)
}
function renderTodoInEditMode(todo) {
    const li = document.createElement('li')

    const input = document.createElement('input')
    input.type = 'text'
    input.value = todo
    li.append(input)

    const saveBtn = document.createElement('button')
    saveBtn.textContent = 'Save'
    saveBtn.addEventListener('click', () => {
        const idx = todos.indexOf(todo)
        updateTodo(idx, input.value)
    })
    li.append(saveBtn)

    const cancelBtn = document.createElement('button')
    cancelBtn.textContent = 'Cancel'
    cancelBtn.addEventListener('click', () => {
        const idx = todos.indexOf(todo)
        todosList.replaceChild(
            renderTodoInReadMode(todo),
            todosList.childNodes[idx]
        )
    })
    li.append(cancelBtn)

    return li
}

function updateTodo(index, description) {
    todos[index] = description
    const todo = renderTodoInReadMode(description)
    todosList.replaceChild(todo, todosList.childNodes[index])

}