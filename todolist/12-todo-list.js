const todoList = [{
  name: 'make dinner',
  dueDate: '2024-07-30'
}, {
  name: 'wash dishes',
  dueDate: '2024-07-31'
}
]

renderTodoList();

// Adding eventListener to the add button
const addButtonElement = document.querySelector('.js-add-button');
addButtonElement.addEventListener('click', () => {
  addTask();
})

function addTask() {
  const inputNameElement = document.querySelector('.js-name-input');
  const name = inputNameElement.value;

  const inputDateElement = document.querySelector('.js-due-date-input');
  const dueDate = inputDateElement.value;

  const taskObject = {
    //name: name,
    //dueDate: dueDate,
    name,
    dueDate
  };

  // Add item to the end of the array
  todoList.push(taskObject);

  renderTodoList();
  inputNameElement.value = '';
}

function renderTodoList() {
  let todoListHTML = '';

  // Arrow function
  todoList.forEach((todoObject, index) => {
    //const name = todoObject.name;
    //const dueDate = todoObject.dueDate;
    const {name, dueDate} = todoObject;
    
    todoListHTML += `
    <div class="name-display">
      ${name}
    </div>
    <div class="due-date-display">
      ${dueDate}
    </div>
    <button class="delete-button js-delete-button">Delete</button>`;
  })

  document.querySelector('.js-todo-list').innerHTML = todoListHTML;

  // querySelectorAll gives ys all the elements with the specified name as an array
  // We do this outside of the function because the element we want to delete is only added to the page after the function is finished
  document.querySelectorAll('.js-delete-button').forEach((deleteButton, index) => {
    deleteButton.addEventListener('click', () => {
      deleteTodo(index);
    });
  });
}



function deleteTodo(taskNumber) {
  todoList.splice(taskNumber, 1);
  renderTodoList();
}