// First declare all the varibales needed
let addTaskInput = document.querySelector("#add-task"),
  rmTaskBtn = document.querySelector("#remove-task"),
  newTask = document.querySelector("#new-task"),
  tasksContainer = document.querySelector("#task-container"),
  completedTasks = document.querySelector("#competed-tasks"),
  taskPopup = document.querySelector("#task-info"); // The task information popup

// First add a function to create new task

let createTask = (taskName) => {
  let task = document.createElement("div");
  let taskContent = `
    
    <p>${taskName}</p>
    <input type="checkbox" name="done" >
    
    `;
  task.classList.add("flex", "justify-between");
  task.innerHTML = taskContent;
  document.body.appendChild(task);
};

// Events when clicking the button
newTask.addEventListener("click", () => {
  taskPopup.classList.remove("hidden");
  taskPopup.classList.add("grid");
});

newTask.addEventListener("blur", () => {
  taskPopup.classList.add("hidden");
  taskPopup.classList.remove("grid");
});
