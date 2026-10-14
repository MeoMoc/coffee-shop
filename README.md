# ☕ Coffee Shop

Hệ thống quản lý quán cà phê được xây dựng cho bài tập môn Lập trình Web.
Ứng dụng hỗ trợ quản lý sản phẩm, xem menu của quán thông qua giao diện web.
Thêm, sửa, xóa sản phẩm, thêm, sửa nhân viên thông qua giao diện trang quản trị.

---

## 🛠 Công nghệ sử dụng

* **Frontend:** ReactJS, ReactTS
* **Backend:** Spring Boot

---

## 📂 Cấu trúc project

```
coffee-shop-management
│
├── backend      # API Spring Boot
├── frontend     # Giao diện trang web giới thiệu quán cà phê
├── admin        # Giao diện trang quản trị
└── README.md
```

---

## ⚙️ Hướng dẫn cài đặt

### 1. Clone project

```
git clone https://github.com/ntt247/coffee-shop-web.git
cd coffee-shop-web
```

### 2. Cài đặt database

Tạo database với tên coffee_shop trong SQL Server

### 3. Chạy Backend

```
cd backend
mvn spring-boot:run
```

Backend chạy tại:

```
http://localhost:8080/swagger-ui/index.html
```

### 4. Chạy Frontend

```
cd frontend
npm install
npm start
```

Frontend chạy tại:

```
http://localhost:3000
```

### 5. Chạy Admin

```
cd admin
npm install
npm run start
```

Admin chạy tại:

```
http://localhost:5173
```

---

## 🌿 Quy tắc làm việc với Git

Mỗi thành viên làm việc trên **branch riêng**, ví dụ:

```
git checkout -b frontend
git checkout -b backend
git checkout -b admin
```

Sau khi hoàn thành:

```
git add .
git commit -m "mô tả thay đổi"
git push origin <branch-name>
```

Sau đó tạo **Pull Request** để merge vào branch `develop`.


