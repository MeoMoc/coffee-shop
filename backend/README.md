# Coffee Shop Backend ☕

Spring Boot backend for Coffee Shop web application. 

---

## 🚀 Tech Stack

- Java 17
- Spring Boot
- Spring Security
- JWT (Authentication)
- SQL Server
- Maven

---

## 🔐 Features

- User registration & login
- JWT authentication
- Role-based authorization (ADMIN, STAFF, TEACHER)
- Swagger API documentation

---

## 📦 Installation

### 1. Clone project
Step1: Open folder that you want this repository locate by File Explorer.
Step2: Type 'cmd' in the address bar then hit Enter to open CMD window.
Step3: Type 'git clone https://github.com/ntt247/coffee-shop-web' into CMD window open before.
Note: In case any error about authentication of git happen here, please check carefully git's configuration on your machine.

### 2. Configure environment

Step1: Open SQL Server and create a database with name 'coffee_shop'.
Step2: Open file 'src/main/resources/application.properties'.
Step3: Change 'spring.datasource.url', 'spring.datasource.username', 'spring.datasource.password' to your database's identification.
Step4: Open folder 'backend' by File Explorer then Type 'cmd' in the address bar then hit Enter to open CMD window.
Step5: Type 'setx JWT_SECRET <your_secret_key>', with your_secret_key is a string has greater or equal 32 characters, hit Enter.
Step6: Type 'echo %JWT_SECRET%', hit Enter. If your_secret_key appear, continue next step.
---

### 3. Run application(Windows System)
Step1: Open folder 'backend' by NetBeans, right click into 'backend'. Select 'Clean and Build'.
        (Some errors about Java environment may occur here).
Step2: Open folder 'backend' by File Explorer then Type 'cmd' in the address bar then hit Enter to open CMD window.
Step2: Type 'mvn spring-boot:run' into the CMD window open before, hit Enter to run application.

---

## 📖 API Documentation

After run application, open browser and enter Swagger UI URL:
http://localhost:8080/swagger-ui/index.html

---

## 📌 Main Endpoints

| Method | Endpoint        | Description       |
|--------|----------------|--------------------|
| POST   | /auth/register | Register user      |
| POST   | /auth/login    | Login              |

---