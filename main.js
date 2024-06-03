// First declare all the varibales needed
let addTaskInput = document.querySelector("#input-task"),
  rmTaskBtn = document.querySelector("#remove-task"),
  newTask = document.querySelector("#new-task"),
  tasksContainer = document.querySelector("#task-container"),
  completedTasks = document.querySelector("#competed-tasks"),
  taskPopup = document.querySelector("#task-info"); // The task information popup

let myTasks = [];
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
      class="inline-block w-5 h-5 border-2 border-white relative cursor-pointer after:content-[''] after:absolute after:top-2/4 after:left-2/4 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[10px] after:h-[10px] after:bg-[#cfcfcf] after:rounded-[2px] after:opacity-0 peer-checked:after:opacity-100"
    ></span>
  </label>
  </div>
  <button class="absolute text-xl font-bold right-3 top-0 text-neutral-300" id="task-setting">...</button>
    `;
  task.classList.add(
    "relative",
    "flex",
    "justify-between",
    "bg-gradient-to-tr",
    "from-neutral-500",
    "via-neutral-700",
    "to-neutral-900",
    "items-center",
    "px-2",
    "py-8",
    "rounded-md",
    "text-neutral-300",
    "text-lg"
  );
  task.innerHTML = taskContent;
  tasksContainer.appendChild(task);
  trashButton();
  let obj = {
    task: taskName,
    checked: false,
  };
  myTasks.push(obj);
  window.localStorage.setItem("my tasks", JSON.stringify(myTasks));
};

// Retrive the tasks on window load

window.onload = () => {
  let tasksArray = JSON.parse(window.localStorage.getItem("my tasks"));
  if (tasksArray.length > 0) {
    for (let i = 0; i < tasksArray.length; i++) {
      createTask(tasksArray[i].task);
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
    let delBtn = document.createElement("button");
    opt.addEventListener("click", () => {
      let stylesList = [
        "text-sm",
        "text-red-500",
        "absolute",
        "-top-5",
        "z-1",
        "right-2",
        "bg-white",
        "px-3",
        "py-1",
        "w-10",
        "flex",
        "items-center",
        "justify-center",
        "rounded-md",
      ];
      delBtn.innerHTML = `<i class="fa-regular fa-trash-can"></i>`;
      opt.parentElement.appendChild(delBtn);
      // If the button is clicked remove the task
      delBtn.classList.add(...stylesList);
      opt.addEventListener("dblclick", () => {
        delBtn.classList.remove(...stylesList);
        opt.parentElement.removeChild(delBtn);
      });
    });
    delBtn.addEventListener("click", () => {
      deleteTask(opt.parentElement);
    });
  });
};

// Create a delete function

let deleteTask = (task) => {
  task.parentElement.removeChild(task);
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

todayParagraph.textContent = `${days(myDate.getDay())} / ${months(myDate.getMonth())} / ${myDate.getFullYear()}`;
