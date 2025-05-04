# 🛡️ Authentication & User Profile Microservices

This project implements a decoupled backend authentication system and a user profile service, designed as independent microservices.

## 🚀 Features

✅ Login with Google (OAuth 2.0)  
✅ Login with Facebook (OAuth 2.0)  
✅ Self-registration (email, username, password)  
✅ JWT-based authentication  
✅ UserProfile Service (view & update profile without logging in again)  
✅ MongoDB for persistence  

---

## 🏗️ Project Structure

| Service               |  Description                         |
|----------------------|--------------------------------------|
| Authentication API    | Handles login, registration, OAuth   |
| User Profile API       | Manages user profile data            |

Each service is independent and communicates via JWT tokens.

---

## 📂 Tech Stack

- Node.js
- Express.js
- MongoDB
- JWT (jsonwebtoken)
- bcrypt
- OAuth 2.0 (Google & Facebook APIs)

---

## 📦 Dependencies

### 🔐 Authentication Service

  "dependencies": {
    bcryptjs
    cors 
    dotenv
    express
    jsonwebtoken
    mongoose
}
