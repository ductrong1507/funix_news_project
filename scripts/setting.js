"use strict";

// Lấy các trường input
const newsAmount = document.getElementById("input-page-size");
const newsCategory = document.getElementById("input-category");

// lấy nút save
const saveBtn = document.getElementById("btn-submit");

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
  isValid = checkEmpty(
    newsAmount,
    "error-news-size",
    `Vui lòng nhập số lượng News muốn hiển thị!`
  );
  return isValid;
};

// hàm save setting
const saveSetting = () => {
  if (validation()) {
    const saveData = {
      pageSize: +newsAmount.value.trim(),
      newsCategory: newsCategory.value.toLowerCase(),
    };
    console.log("saveData", saveData);
    saveToStorage("NEWS_SETTING", JSON.stringify(saveData));
  }
};

// xử lý nút save
saveBtn.addEventListener("click", saveSetting);
