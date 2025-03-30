# Project Name: Admin & Login Management System

## Introduction
This project is a full-stack **Admin & Login Management System** built using **React (Vite)** for the frontend and **Express.js** for the backend. It features user authentication via OTP-based login, admin user creation, and local storage management functionality. The frontend has a modern, glassmorphic UI, while the backend handles authentication and validation efficiently.

## Features
- **Login with OTP Verification**
- **Admin Panel to Create Users**
- **Local Storage Management functionality**
- **Modern, Responsive UI with Material Design**
- **Glassmorphism & Smooth Transitions**
- **REST API for Authentication & User Management**

---

## Tech Stack
### Frontend
- **Vite (React.js)** - Fast build tool for modern frontend development
- **React Router** - For navigation and routing
- **Tailwind CSS** - For styling and UI components
- **React Icons** - For adding icons to the UI

### Backend
- **Node.js & Express.js** - For building the REST API
- **Cors** - For handling cross-origin requests
- **Nodemon** - For automatic server restarts during development

---

## Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/admin-login-system.git
cd admin-login-system
```

### 2️⃣ Frontend Setup
```bash
cd frontend  # Navigate to the frontend directory
npm install  # Install dependencies
npm run dev  # Start the frontend (Vite)
```

### 3️⃣ Backend Setup
```bash
cd backend  # Navigate to the backend directory
npm install  # Install dependencies
npm start  # Start the backend on port 5000
```

---

## Running the Project
1. Start the backend server: `npm start` (Runs on **http://localhost:5000**)
2. Start the frontend: `npm run dev` (Runs on **http://localhost:5173** by default)
3. Open the browser and navigate to the frontend URL.
4. Login using OTP verification or navigate to the admin panel to create a user (OTP fetching will be automatically done).

---

## API Endpoints
- `POST /generateotp` - Sends OTP to the user
- `POST /validateotp` - Validates the entered OTP
- New User - UserName will be saved in Local Storage

---

## License
This project is licensed under the **MIT License**.

---

## Author
Developed by **Mohammad Tarique**

📧 Contact: [mohammadtarique661998@gmail.com]  
🔗 GitHub: (https://github.com/mohammadtarique6698)


