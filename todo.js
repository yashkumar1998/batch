let tasks = [];
const addTaskInput = document.getElementById("add-task");
const tasksCounter = document.getElementById("tasks-counter");
const tasksList = document.getElementById("list");

function addTaskstoDOM(task) {
  const li = document.createElement("li");
  li.innerHTML = `   
      <input type="checkbox" name="checklist" id="${task.id}" ${
    task.isCompleted ? "checked" : ""
  } class="custom-checkbox"/>
      <label for="${task.id}">${task.text}</label>
      <img src="bin.svg" class="delete" alt="delete" data-id="${task.id}"/>   
  `;

  tasksList.append(li);
}

function renderList() {
  tasksList.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    addTaskstoDOM(tasks[i]);
  }
  tasksCounter.innerHTML = tasks.length;
}

function toggleTask(taskId) {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    if (taskIndex !== -1) {
      tasks[taskIndex].isCompleted = !tasks[taskIndex].isCompleted;
      renderList();
      showNotification("Task toggled successfully");
    } else {
      showNotification("Could not toggle the task");
    }
  }

function deleteTask(taskId) {
  const newTasks = tasks.filter((task) => task.id !== taskId);
  tasks = newTasks;
  renderList();
  showNotification("Task deleted succesfully");
}

function addTask(task) {
  if (tasks) {
    tasks.push(task);
    renderList();
    showNotification("Task added succesfully");
  }
}

function showNotification(text) {
  alert(text);
}

function handleKeyPress(e) {
  if (e.key === "Enter") {
    const text = e.target.value;
    if (!text) {
      showNotification("Task text cannot be empty");
      return;
    }

    const task = {
      text,
      id: Date.now().toString(), // generate unique ID for each new task
      isCompleted: false,
    };

    e.target.value = "";
    addTask(task);
  }
}

function handleClickListener(e) {
    const target = e.target;
    if (target.className === "delete") {
      const taskId = target.dataset.id;
      deleteTask(taskId);
    } else if (target.className === "custom-checkbox") {
      const taskId = target.id;
      toggleTask(taskId);
    }
  }

function initializeApp() {
  addTaskInput.addEventListener("keyup", handleKeyPress);
  document.addEventListener("click", handleClickListener);
}

initializeApp();