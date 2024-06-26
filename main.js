// First declare all the varibales needed
let addTaskInput = document.querySelector("#input-task"),
  rmTaskBtn = document.querySelector("#remove-task"),
  newTask = document.querySelector("#new-task"),
  tasksContainer = document.querySelector("#task-container"),
  taskPopup = document.querySelector("#task-info"); // The task information popup

let myTasks = [];
// First add a function to create new task

let createTask = (taskName, status = false) => {
  let task = document.createElement("div");

  let taskContent = `
    <p>${taskName}</p>
  <button class="absolute text-xl font-bold right-3 top-0 text-green-950" id="task-setting">...</button>
    `;
  task.classList.add(
    "relative",
    "flex",
    "justify-between",
    "bg-green-500",
    "items-center",
    "border",
    "border-green-600",
    "px-2",
    "py-8",
    "rounded-md",
    "text-neutral-50",
    "text-lg"
  );
  class newTask {
    constructor(id, taskName, taskChecked) {
      this.id = id;
      this.taskName = taskName;
      this.taskChecked = taskChecked;
    }
  }
  task.innerHTML = taskContent;
  tasksContainer.appendChild(task);
  let id = new Date().getTime();
  let myTask = new newTask(id, taskName, status);
  if (status) {
    task.classList.remove("bg-green-500");
    task.classList.add("bg-green-900");
  }
  task.setAttribute("id", myTask.id);
  myTasks.push(myTask);
  trashButton();
  saveDataTo(myTasks);
};

// Retrive the tasks on window load

window.onload = () => {
  let taskArray = JSON.parse(window.localStorage.getItem("my tasks"));
  if (taskArray.length > 0) {
    for (let i = 0; i < taskArray.length; i++) {
      createTask(taskArray[i].taskName, taskArray[i].taskChecked);
    }
  }
};

// Events when clicking the new task button
newTask.addEventListener("click", () => {
  taskPopup.classList.remove("hidden");
  taskPopup.classList.add("grid");
  if (addTaskInput.value !== "") saveBtn.removeAttribute("disabled");
  else {
    saveBtn.setAttribute("disabled", true);
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

// Here add the psuedo element to delete the task on clicking the options button
let trashButton = () => {
  let option = document.querySelectorAll("#task-setting");
  option.forEach((opt) => {
    let optionContainer = document.createElement("div"),
      completed = document.createElement("button");
    let delBtn = document.createElement("button");
    opt.addEventListener("click", () => {
      let stylesList = [
        "text-sm",
        "text-red-500",
        "bg-neutral-50/50",
        "w-full",
        "flex",
        "items-center",
        "justify-center",
        "rounded-md",
      ];
      delBtn.classList.add("flex", "justify-center", "items-center", "gap-x-2");
      delBtn.innerHTML = `<i class="fa-regular fa-trash-can"></i> Delete`;
      optionContainer.appendChild(delBtn);
      optionContainer.appendChild(completed);
      completed.textContent = "Mark as completed";
      opt.appendChild(optionContainer);
      // If the button is clicked remove the task
      delBtn.classList.add(...stylesList);

      // Array of container styles
      let containerStyling = [
        "flex",
        "flex-col",
        "justify-center",
        "items-center",
        "gap-y-1",
        "bg-green-300",
        "text-sm",
        "absolute",
        "-top-5",
        "z-1",
        "right-1",
        "w-40",
        "p-1",
        "rounded-lg",
      ];
      optionContainer.classList.add(...containerStyling);

      // completed button styling
      completed.classList.add(
        "bg-neutral-50/50",
        "w-full",
        "text-green-950",
        "rounded-md"
      );

      // Now add event listner to the completed task
      completed.addEventListener("click", (e) => {
        e.stopPropagation();
        opt.parentElement.classList.remove("bg-green-500");
        opt.parentElement.classList.add("bg-green-900");
        checkedTask(opt.parentElement.getAttribute("id"));
      });
      delBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        deleteTask(optionContainer.parentElement.parentElement);
      });

      opt.addEventListener("blur", () => {
        hideDelBtn();
      });
    });

    delBtn.addEventListener("mousedown", (e) => {
      e.preventDefault();
    });

    completed.addEventListener("mousedown", (e) => {
      e.preventDefault();
    });

    let hideDelBtn = () => {
      if (opt.parentElement.contains(optionContainer)) {
        opt.removeChild(optionContainer);
      }
    };
  });
};

// Create a delete function

let deleteTask = (task) => {
  task.parentElement.removeChild(task);
  let index = myTasks.findIndex((task) => task.title === task.title);
  if (index !== -1) {
    myTasks.splice(index, 1);
    localStorage.setItem("my tasks", JSON.stringify(myTasks));
  }
};

// Show todays date on the screen

let todayParagraph = document.querySelector("#today-date"),
  myDate = new Date();

function days(day) {
  // for day of the week
  const daysOfTheWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return daysOfTheWeek[day];
}

// Function to get names of the months
function months(month) {
  const monthsOfTheYear = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return monthsOfTheYear[month];
}

todayParagraph.appendChild(document.createElement("p")).textContent =
  `${days(myDate.getDay())}`;
todayParagraph.textContent = `${myDate.getDate()} / ${months(myDate.getMonth())} / ${myDate.getFullYear()}`;

// Here add the completed section
let completedTasks = document.querySelector("#competed-tasks");
let checkedTask = (id) => {
  for (let i = 0; i < myTasks.length; i++) {
    if (myTasks[i].id == id) {
      myTasks[i].taskChecked == false ? (myTasks[i].taskChecked = true) : "";
    }
  }
  saveDataTo(myTasks);
};

// Create a function to save date

function saveDataTo(array) {
  localStorage.setItem("my tasks", JSON.stringify(array));
}
