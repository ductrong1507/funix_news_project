# Ứng dụng đọc tin tức

**GitHub:** https://github.com/ductrong1507/funix_news_project

**Deloy:** https://ductrong1507.github.io/funix_news_project/

## Tổng quan dự án

Ứng dụng đọc tin tức. Dữ liệu về các tin tức sẽ được lấy từ new API . Đồng thời, ứng dụng cũng tính năng Login/Register để quản lý thông tin, to-do list của người dùng. Lưu ý: API chỉ hoạt động khi lấy dữ iệu từ môi trường development, khi deloy thì API sẽ không hoạt động.

> new API: _Một API giúp lấy dữ liệu về các bài viết theo từng danh mục khác nhau_
>
> > https://newsapi.org/

#### Trang chủ (_Index_):

- **Đường dẫn:** "/index.html".
- **Feature:** Hiển thị đầu tiên khi người dùng truy cập vào ứng dụng, bao gồm 2 chế độ: _chưa đăng nhập_ và _đã đăng nhập_.
- **Thành phần:**
  - Sidebar
  - Homepage
    ![Trang chủ](https://firebasestorage.googleapis.com/v0/b/funix-way.appspot.com/o/xSeries%2FPRF192x%2FASM_Image%2FASM3_H%C6%B0%E1%BB%9Bng%20d%E1%BA%ABn%20d%E1%BB%B1%20%C3%A1n_H%C3%ACnh%203.png?alt=media&token=fd37f368-c84a-4ce5-b649-9091f645c1d0)

#### Đăng ký (_Register_):

- **Đường dẫn:** "/register.html".
- **Feature:** Tạo người dùng mới.
- **Thành phần:**

  - Sidebar
  - Form đăng ký
    ![Register](https://firebasestorage.googleapis.com/v0/b/funix-way.appspot.com/o/xSeries%2FPRF192x%2FASM_Image%2FASM3_H%C6%B0%E1%BB%9Bng%20d%E1%BA%ABn%20d%E1%BB%B1%20%C3%A1n_H%C3%ACnh%201.png?alt=media&token=b6e46857-a5dc-4bac-8d75-8fd3fbfd0c97)

#### Đăng nhập (_Login_):

- **Đường dẫn:** "/login.html".
- **Feature:** Người dùng đăng nhập vào trang web.
- **Thành phần:**

  - Sidebar
  - Form đăng nhập
    ![Login](https://firebasestorage.googleapis.com/v0/b/funix-way.appspot.com/o/xSeries%2FPRF192x%2FASM_Image%2FASM3_H%C6%B0%E1%BB%9Bng%20d%E1%BA%ABn%20d%E1%BB%B1%20%C3%A1n_H%C3%ACnh%202.png?alt=media&token=fe19222d-d768-498f-b3c2-c06be4c24c7e)

#### Trang tin tức (_News_):

- **Đường dẫn:** "/news.html".
- **Feature:** Hiển thị danh sách tin tức theo những danh mục sau: _country, category, phân trang, số lượng bài mỗi trang_. Các danh mục sẽ được cài đặt ở trang settings.
- **Thành phần:**
  - Sidebar
  - Danh sách tin tức
    ![News](https://firebasestorage.googleapis.com/v0/b/funix-way.appspot.com/o/xSeries%2FPRF192x%2FASM_Image%2FASM3_H%C6%B0%E1%BB%9Bng%20d%E1%BA%ABn%20d%E1%BB%B1%20%C3%A1n_H%C3%ACnh%205.png?alt=media&token=6cf0e6f5-0e7d-4c1a-8a7e-7075b6fe55e8)

#### Trang tìm kiếm tin theo từ khóa (_Search_):

- **Đường dẫn:** "/search.html".
- **Feature:** cho phép người dùng tìm các bài viết theo từ khóa, bao gồm những tính năng sau: _phân trang, chuyển trang, số lượng bài mỗi trang_. Các danh mục sẽ được cài đặt ở trang settings.
- **Thành phần:**
  - Sidebar
  - Danh sách tin tức
    ![News](https://firebasestorage.googleapis.com/v0/b/funix-way.appspot.com/o/xSeries%2FPRF192x%2FASM_Image%2FASM3_H%C6%B0%E1%BB%9Bng%20d%E1%BA%ABn%20d%E1%BB%B1%20%C3%A1n_H%C3%ACnh%209.png?alt=media&token=f5d4a9e8-cd0d-4717-af9e-257bc2a2a9a3)

#### Trang Todo List (_ToDoList_):

- **Đường dẫn:** "/todo.html".
- **Feature:** Ứng dụng còn có thể cho người dùng tạo Todo List cho bản thân. Các tính năng: thêm task, xóa task, toggle Task.
- **Thành phần:**
  - Sidebar
  - To-do List
    ![To-do List](https://firebasestorage.googleapis.com/v0/b/funix-way.appspot.com/o/xSeries%2FPRF192x%2FASM_Image%2FASM3_H%C6%B0%E1%BB%9Bng%20d%E1%BA%ABn%20d%E1%BB%B1%20%C3%A1n_H%C3%ACnh%207.png?alt=media&token=5922b921-bb39-4e33-8757-d33ddab3960c)

#### Trang settings (_Settings_):

- **Đường dẫn:** "/setting.html".
- **Feature:** Người dùng có thể điều chỉnh category, News per page
- **Thành phần:**
  - Sidebar
  - Form settings
    ![Settings](https://firebasestorage.googleapis.com/v0/b/funix-way.appspot.com/o/xSeries%2FPRF192x%2FASM_Image%2FASM3_H%C6%B0%E1%BB%9Bng%20d%E1%BA%ABn%20d%E1%BB%B1%20%C3%A1n_H%C3%ACnh%208.png?alt=media&token=4d17f3bb-42ca-4642-9192-b257907b5c58)
