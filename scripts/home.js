"use strict";

//lấy các thông tin button
const logoutBtn = document.getElementById("btn-logout");

//Lấy currentUser từ local
const currentUser = JSON.parse(getFromStorage("CURRENT_USER")) || {
  isLogin: false,
};

//Hàm kiểm tra có đang log in chưa
const checkLogin = (currentUser) => {
  if (currentUser.isLogin) {
    document.getElementById("login-modal").innerHTML = `
        <p>Welcome, ${currentUser.userName}!!</p>
    `;
  } else {
    document.getElementById("login-modal").innerHTML = `
        <p>Please Login or Register</p>
        <div class="row">
            <div class="col-md-3">
                <a href="./pages/login.html" class="btn btn-primary btn-block">Login123</a>
            </div>
            <div class="col-md-3">
                <a href="./pages/register.html" class="btn btn-primary btn-block">Register</a>
            </div>
        </div>
    `;
    document.getElementById("main-content").style.display = "none";
  }
};

checkLogin(currentUser);

// Hàm log out
const logout = () => {
  localStorage.removeItem("CURRENT_USER");
  checkLogin(
    JSON.parse(getFromStorage("CURRENT_USER")) || {
      isLogin: false,
    }
  );
};

logoutBtn.addEventListener("click", logout);
