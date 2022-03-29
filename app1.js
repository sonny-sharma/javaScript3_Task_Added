const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load All event Listeners
loadEventListeners();

function loadEventListeners() {
  // dom Load event
  document.addEventListener('DOMContentLoaded', getTasks);

  // Add Task
  form.addEventListener('submit', addTask);

  // Remover Task event
  taskList.addEventListener('click', removeTask);

  // clear all Tasks
  clearBtn.addEventListener('click', clearTasks);

  // filter tasks
  filter.addEventListener('keyup', filterTasks);
}

// add task

function addTask(e) {
  e.preventDefault();
  if (taskInput.value === '') {
    alert('Please enter Task');
  }
  // create Li element
  const li = document.createElement('li');
  li.className = 'collection-item';

  // create text node amd append to Li
  li.appendChild(document.createTextNode(taskInput.value));

  // create new Link element

  const link = document.createElement('a');

  // add class to link
  link.className = 'delete-item secondary-content';

  // Add Icon Html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // append link to li
  li.appendChild(link);

  // append li to ul
  taskList.appendChild(li);

  // Store in LocalStorage
  storeTaskInLocalStorage(taskInput.value);

  // clear Input
  taskInput.value = '';
}

// Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure you want to delete')) {
      let item = e.target.parentElement.parentElement;
      item.remove();

      // Remove from LocalStorage
      removeTaskFromLocalStorage(item);
    }
  }
}

// Remove from LocalStorage

function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach((task, index) => {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// clear All tasks
function clearTasks() {
  // taskList.innerHTML = '';

  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  clearTasksfromLocalStorage();
}

function clearTasksfromLocalStorage() {
  localStorage.clear();
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function (task) {
    const item = task.firstChild.textContent.toLowerCase();
    if (item.indexOf(text) !== -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}

function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// get tasks from localStorage
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach((task) => {
    // create Li element
    const li = document.createElement('li');
    li.className = 'collection-item';

    // create text node amd append to Li
    li.appendChild(document.createTextNode(task));

    // create new Link element

    const link = document.createElement('a');

    // add class to link
    link.className = 'delete-item secondary-content';

    // Add Icon Html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // append link to li
    li.appendChild(link);

    // append li to ul
    taskList.appendChild(li);
  });
}
