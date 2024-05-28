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
    <div class="flex justify-center items-center">
  <label class="container">
    <input
      class="peer cursor-pointer hidden after:opacity-100"
      type="checkbox"
    />
    <span
      class="inline-block w-5 h-5 border-2 border-black relative cursor-pointer after:content-[''] after:absolute after:top-2/4 after:left-2/4 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[10px] after:h-[10px] after:bg-[#333] after:rounded-[2px] after:opacity-0 peer-checked:after:opacity-100"
    ></span>
  </label>
  </div>
  <button class="absolute text-xl font-bold right-3 top-0 text-black">...</button>
    `;
  task.classList.add(
    "relative",
    "flex",
    "justify-between",
    "bg-teal-400",
    "items-center",
    "px-2",
    "py-8",
    "rounded-md",
    "text-neutral-200",
    "text-lg"
  );
  task.innerHTML = taskContent;
  tasksContainer.appendChild(task);
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

// the plus button functionality
addTaskInput.addEventListener("input", () => {
  if (addTaskInput.value !== "") {
    // Add the new task to the container
    saveBtn.removeAttribute("disabled");
  } else {
    addTaskInput.value === "";
    saveBtn.setAttribute("disabled", true);
  }
});

// Add the task to the body of the website on clicking save
saveBtn.addEventListener("click", () => {
  if (addTaskInput.value !== "") {
    createTask(addTaskInput.value);
  }
  addTaskInput.value = "";
  saveBtn.setAttribute("disabled", true);
});
