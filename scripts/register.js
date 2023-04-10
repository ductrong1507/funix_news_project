"use strict";

// lấy dữ liệu từ các trường input
const firstNameInput = document.getElementById("input-firstname");
const lastNameInput = document.getElementById("input-lastname");
const userNameInput = document.getElementById("input-username");
const passwordInput = document.getElementById("input-password");
const confirmPasswordInput = document.getElementById("input-password-confirm");

//lấy các nút
const regBtn = document.getElementById("btn-submit");

//mảng user lấy từ server
const userArr = JSON.parse(getFromStorage("USER_ARRAY")) || [];

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

const checkID = (input, idError, arr, mess) => {
  let status = true;
  for (let i = 0; i < arr.length; i++) {
    if (
      input.value.trim().split(" ").filter(String).join(" ") === arr[i].userName
    ) {
      status = false;
      break;
    }
  }
  if (status) {
    document.getElementById(idError).innerHTML = "";
    return true;
  }

  document.getElementById(idError).innerHTML = mess;
  return false;
};

const checkLength = (input, idError, min, max) => {
  if (input.value.length < min) {
    document.getElementById(
      idError
    ).innerHTML = `${input.name} must have at least ${min} characters.`;
    return false;
    // `${input.name} must have at least ${min} characters.`;
  } else if (input.value.length > max) {
    document.getElementById(
      idError
    ).innerHTML = `${input.name} can be no longer than ${max} characters`;
    return false;
  }
  document.getElementById(idError).innerHTML = "";
  return true;
};

const checkPassConfirm = (input, idError, inputCheck) => {
  if (input.value.trim() !== inputCheck.value.trim()) {
    document.getElementById(
      idError
    ).innerHTML = `${input.name} and ${inputCheck.name} do not match.`;
    return false;
  }
  document.getElementById(idError).innerHTML = "";
  return true;
};

// Hàm validation tổng
const validation = () => {
  let isValid = false;
  isValid =
    // check First Name
    checkEmpty(
      firstNameInput,
      "error-firstname",
      `${firstNameInput.name} không được để trống`
    ) &&
    // check Last Name
    checkEmpty(
      lastNameInput,
      "error-lastname",
      `${lastNameInput.name} không được để trống`
    ) &&
    // check Username
    checkEmpty(
      userNameInput,
      "error-username",
      `${userNameInput.name} không được để trống`
    ) &&
    checkID(
      userNameInput,
      "error-username",
      userArr,
      `${userNameInput.name} must unique!`
    ) &&
    // check password
    checkEmpty(
      passwordInput,
      "error-password",
      `${passwordInput.name} không được để trống`
    ) &&
    checkLength(passwordInput, "error-password", 8, 30) &&
    // check confirm Password
    checkEmpty(
      confirmPasswordInput,
      "error-password-confirm",
      `Vui lòng nhập ${confirmPasswordInput.name}`
    ) &&
    checkPassConfirm(
      confirmPasswordInput,
      "error-password-confirm",
      passwordInput
    );

  return isValid;
};

// hàm lưu
function parseUser(userData) {
  const user = new User(
    userData.firstname,
    userData.lastname,
    userData.username,
    userData.password
  );

  return user;
}

// Hàm Register user
const registerUser = () => {
  if (validation()) {
    const newUser = {
      firstName: firstNameInput.value.trim(),
      lastName: lastNameInput.value.trim(),
      userName: userNameInput.value.trim().split(" ").filter(String).join(" "),
      password: passwordInput.value.trim(),
    };
    userArr.push(newUser);
    saveToStorage("USER_ARRAY", JSON.stringify(userArr));
    window.location.href = "../pages/login.html";
  }
};

// xử lý nút regiter
regBtn.addEventListener("click", registerUser);
