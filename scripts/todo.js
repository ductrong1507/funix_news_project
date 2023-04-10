"use strict";

const todoArr = JSON.parse(getFromStorage("TASK_LIST")) || [];
console.log("todoArr", todoArr);

// lấy dữ liệu user đang đăng nhập
const currentUser = JSON.parse(getFromStorage("CURRENT_USER"));
console.log("currentUser", currentUser);

// lấy trường input và task list
const titleInput = document.getElementById("input-task");
const taskContainer = document.getElementById("todo-list");

// lấy nút add
const addBtn = document.getElementById("btn-add");

// Các hàm check validation
const checkEmpty = (input, idError, mess) => {
  if (input.value.trim() === "") {
    document.getElementById(idError).innerHTML = mess;
    return false;
  } else {
    document.getElementById(idError).innerHTML = "";
    return true;
  }
};

// Hàm validation tổng
const validation = () => {
  let isValid = false;
  isValid = checkEmpty(titleInput, "error-add-task", `Vui lòng nhập task!`);
  return isValid;
};

// hàm render task list
const renderTaskList = (taskArr) => {
  let htmlContent = "";
  taskContainer.innerHTML = "";
  taskArr
    .filter((task) => task.owner === currentUser.userName)
    .forEach((task) => {
      htmlContent += `
        <li onclick="toggleTask('${task.task}','${task.owner}')" class=${
        task.isDone ? "checked" : ""
      } >
            ${task.task}
            <span class="close" onclick="deleteTask('${task.task}','${
        task.owner
      }')">x</span>
        </li>
    `;
    });

  taskContainer.innerHTML = htmlContent;
};

// kiểm tra đã đăng nhập hay chưa
if (currentUser) {
  renderTaskList(todoArr);
} else {
  alert("Vui lòng đăng nhập!!");
  window.location.href = "../pages/login.html";
}

// Add task
const addTask = () => {
  if (validation()) {
    const task = new Task(titleInput.value.trim(), currentUser.userName, false);
    todoArr.push(task);
    console.log(todoArr);
  }
  saveToStorage("TASK_LIST", JSON.stringify(todoArr));
  renderTaskList(todoArr);
};

// delete task
const deleteTask = (taskName, owner) => {
  const taskList = JSON.parse(getFromStorage("TASK_LIST"));
  console.log("taskList delete", taskList);

  const index = taskList.findIndex(
    (task) => task.task === taskName && task.owner === owner
  );
  console.log("index delete", index);
  taskList.splice(index, 1);

  console.log("taskList deleted", taskList);

  saveToStorage("TASK_LIST", JSON.stringify(taskList));
  renderTaskList(taskList);
};

// Toggle Task
const toggleTask = (taskName, owner) => {
  const taskList = JSON.parse(getFromStorage("TASK_LIST"));
  console.log("taskList", taskList);

  const index = taskList.findIndex(
    (task) => task.task === taskName && task.owner === owner
  );
  console.log("index", index);
  if (taskList[index].isDone) {
    taskList[index].isDone = false;
    console.log("tesst");
  } else {
    taskList[index].isDone = true;
  }
  saveToStorage("TASK_LIST", JSON.stringify(taskList));
  renderTaskList(taskList);
};

// xử lý sự kiện ở nút Add
addBtn.addEventListener("click", addTask);
