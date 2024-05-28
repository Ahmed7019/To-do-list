// First declare all the varibales needed
let addTaskInput = document.querySelector("#input-task"),
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
  if (addTaskInput.value !== "") saveBtn.removeAttribute("disabled");
  else {
    saveBtn.setAttribute("disabled");
  }
});

// When clicked hide the popup
let closeBtn = document.querySelector("#close-btn");
closeBtn.addEventListener("click", () => {
  taskPopup.classList.add("hidden");
  taskPopup.classList.remove("grid");
});

// The process of adding the new task
// [1] user hits the add button
// [2] the save button is disabled at first
// [3] when the user enters some text the button changes from the disabled to the normal state
// [4] If the user hits save a new task is saved

let saveBtn = document.querySelector("#save-btn");

if (taskPopup.classList.contains("grid")) {
  if (saveBtn.hasAttribute("disabled") && addTaskInput.value === "") "";
  else {
    saveBtn.removeAttribute("disabled");
  }
}

addTaskInput.addEventListener("input", () => {
  if (addTaskInput.value !== "") saveBtn.removeAttribute("disabled");
  else {
    addTaskInput.value === "";
    saveBtn.setAttribute("disabled", true);
  }
});
