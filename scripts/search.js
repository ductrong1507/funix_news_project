"use strict";

const API_KEY = "0849183979fa4863b4f85a5359a71440";

// Lấy các html ele cần để render
const searchInput = document.getElementById("input-query");
const newsContainer = document.getElementById("news-container");
const paginationList = document.getElementById("pagination_list");
const prevBtn = document.getElementById("btn-prev");
const nextBtn = document.getElementById("btn-next");

// lấy nút search
const searchBtn = document.getElementById("btn-submit");

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
    searchInput,
    "error-search-input",
    `Vui lòng nhập từ khóa muốn tìm kiếm!`
  );
  return isValid;
};

// hàm render News table
const renderNews = (newsArr) => {
  let htmlContent = "";
  const randomContent =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, molestiae maiores? Ut dolore distinctio, quia culpa assumenda aliquid, facilis tenetur in iure fugiat cumque accusamus aperiam ducimus, sequi neque at.";
  newsArr.forEach((item, index) => {
    htmlContent += `
            <div class="card flex-row flex-wrap">
              <div class="card mb-3">
                <div class="row no-gutters">
                  <div class="col-md-4">
                    <img
                      src="${item.urlToImage ? item.urlToImage : ""}"
                      class="card-img"
                      alt=${item.urlToImage ? "Image" : "ImageError"}
                    >
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">
                        ${item.title}
                      </h5>
                      <p class="card-text">
                        ${item.content ? item.content : randomContent}
                      </p>
                      <a href=${
                        item.url
                      } target="_blank" class="btn btn-primary">View ${
      index + 1
    }</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `;
  });
  newsContainer.innerHTML = htmlContent;
};

// hàm call API
const getNews = async (keyWord, page, pageSize) => {
  try {
    const res = await fetch(
      `https://newsapi.org/v2/everything?q=${keyWord}&pageSize=${pageSize}&page=${page}&apiKey=${API_KEY}`
    );
    const data = await res.json();

    console.log("res", res);
    console.log("data", data);

    //kiểm tra nếu có lỗi
    if (!res.ok) {
      alert(data.message);
      return;
    }

    // render bảng News
    renderNews(data.articles);

    // render Pagination
    paginationList.innerHTML = "";
    let paginationNumberHtml = "";
    const paginationAmount = 15;
    for (let i = 1; i <= paginationAmount; i++) {
      paginationNumberHtml += `
              <li class="pagination_item disabled 
              ${i === page ? "pagination_active" : ""}
              ">
                  <a class="page-link">${i}</a>
              </li>
        `;
    }
    paginationList.innerHTML = paginationNumberHtml;

    if (page === 1) {
      prevBtn.style.display = "none";
    } else if (page !== 1) {
      prevBtn.style.display = "block";
    }
  } catch (error) {
    console.log("error", error);
  }
};

// Hàm next page
const nextPage = () => {
  // lấy ra phần tử li trong thanh Pagination
  const currentPage = document.querySelectorAll(".pagination_item");
  // lấy số trang hiện tại
  let currentNumber =
    [...currentPage].findIndex((item) =>
      [...item.classList].includes("pagination_active")
    ) + 1;
  console.log("currentNumber next", currentNumber);
  // render lại bảng tin và ui Pagination
  getNews(searchInput.value, currentNumber + 1, 7);

  // ẩn nút next khi đến mức cuối
  if (currentNumber === currentPage.length - 1) {
    nextBtn.style.display = "none";
  }
};

// Hàm prev page
const prevPage = () => {
  const currentPage = document.querySelectorAll(".pagination_item");
  let currentNumber =
    [...currentPage].findIndex((item) =>
      [...item.classList].includes("pagination_active")
    ) + 1;

  console.log("currentNumber prev", currentNumber);

  nextBtn.style.display = "block";
  getNews(searchInput.value, currentNumber - 1, 7);
};

// hàm search
const searchFunc = () => {
  if (validation()) {
    getNews(searchInput.value, 1, 7);
  }
};

// xử lý sự kiện nút Search
searchBtn.addEventListener("click", searchFunc);

// xử lý sự kiện nút Next
nextBtn.addEventListener("click", nextPage);

// Xử lý sự kiện nut Prev
prevBtn.addEventListener("click", prevPage);
