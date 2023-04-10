"use strict";

// lấy dữ liệu từ các trường input
const userNameInput = document.getElementById("input-username");
const passwordInput = document.getElementById("input-password");

//lấy các thông tin button
const loginBtn = document.getElementById("btn-login");

//Lấy danh sách user để so sánh
const userArr = JSON.parse(getFromStorage("USER_ARRAY"));

// tạo biến currentUser kiểm tra có user đăng nhập chưa hoặc lưu dữ liệu xuống local
const currentUser = JSON.parse(getFromStorage("CURRENT_USER")) || {
  userName: "",
  password: "",
  isLogin: false,
};

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
  isValid =
    checkEmpty(
      userNameInput,
      "error-username",
      `${userNameInput.name} không được để trống`
    ) &&
    checkEmpty(
      passwordInput,
      "error-password",
      `${passwordInput.name} không được để trống`
    );
  return isValid;
};

// hàm kiểm tra đăng nhập chưa để bảo vệ router
const checkLogin = (currentUser) => {
  if (currentUser.isLogin) {
    alert("Bạn đang đăng nhập!!!");
    window.location.href = "../index.html";
  }
};
checkLogin(currentUser);

// hàm log in
const login = () => {
  if (validation()) {
    // lấy thông tin đăng nhập
    currentUser.userName = userNameInput.value.trim();
    currentUser.password = passwordInput.value.trim();

    // tìm username có tồn tại
    const index = userArr.findIndex((user) => {
      return user.userName === currentUser.userName;
    });

    // kiểm tra thông tin đăng nhập
    if (index === -1) {
      // trường hợp ko đúng userName
      document.getElementById("error-username").innerHTML =
        "Username does not exist!!";
    } else if (
      index !== -1 &&
      userArr[index].password === currentUser.password
    ) {
      // trường hợp đúng user và pass
      currentUser.isLogin = true;
      alert("đăng nhập thành công");
      saveToStorage("CURRENT_USER", JSON.stringify(currentUser));
      window.location.href = "../index.html";
    } else {
      // trường hợp sai pass
      document.getElementById("error-password").innerHTML = "Wrong password!!";
    }
  }
};

//xử lý sự kiện nút log in
loginBtn.addEventListener("click", login);
