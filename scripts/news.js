"use strict";

// lấy dữ liệu từ local storage và API key
const newsSetting = JSON.parse(getFromStorage("NEWS_SETTING")) || {
  newsCategory: "general",
  pageSize: 5,
};

const API_KEY = "0849183979fa4863b4f85a5359a71440";

// Hàm chứa thông tin call api
let apiData = {};

// Lấy các html ele cần để render
const testEle = document.getElementById("page-num");
const newsContainer = document.getElementById("news-container");
const paginationList = document.getElementById("pagination_list");
const prevBtn = document.getElementById("btn-prev");
const nextBtn = document.getElementById("btn-next");

// hàm call Api
const getNews = async (category, page, pageSize) => {
  try {
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&pageSize=${pageSize}&page=${page}&category=${category}&apiKey=${API_KEY}`
    );
    const data = await res.json();

    //kiểm tra nếu có lỗi
    if (!res.ok) {
      alert(data.message);
      return;
    }
    console.log("new data", data);
    // render bảng News
    renderNews(data.articles);

    // render Pagination
    paginationList.innerHTML = "";
    let paginationNumberHtml = "";
    const paginationAmount = Number.isInteger(data.totalResults / pageSize)
      ? data.totalResults / pageSize
      : Math.floor(data.totalResults / pageSize) + 1;
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

getNews(newsSetting.newsCategory, 1, newsSetting.pageSize);

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
                    <a href=${item.url} target="_blank" class="btn btn-primary">
                      View ${index + 1}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
      `;
  });
  newsContainer.innerHTML = htmlContent;
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
  getNews(newsSetting.newsCategory, currentNumber + 1, newsSetting.pageSize);

  // ẩn nút next khi đến mức cuối
  if (currentNumber === currentPage.length - 1) {
    nextBtn.style.display = "none";
  }
};

// Hàm prev page
const prevPage = () => {
  const currentPage = document.querySelectorAll(".pagination_item ");
  let currentNumber =
    [...currentPage].findIndex((item) =>
      [...item.classList].includes("pagination_active")
    ) + 1;
  console.log("currentNumber prev", currentNumber);

  nextBtn.style.display = "block";

  getNews(newsSetting.newsCategory, currentNumber - 1, newsSetting.pageSize);
};

// xử lý sự kiện nút Next
nextBtn.addEventListener("click", nextPage);

// Xử lý sự kiện nut Prev
prevBtn.addEventListener("click", prevPage);
