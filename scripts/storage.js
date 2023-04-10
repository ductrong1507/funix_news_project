"use strict";

// Hàm save dữ liệu vào local storage
const saveToStorage = (key, value) => {
  localStorage.setItem(key, value);
};

// Hàm lấy dữ liệu từ local storage
const getFromStorage = (key) => {
  return localStorage.getItem(key);
};
