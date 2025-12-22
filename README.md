# 🌍 Udaan – Eradication of Child Labour System

Udaan is a **full-stack MERN application** built to help eradicate child labour by empowering citizens to report cases and enabling NGOs/Admins to manage, track, and analyze those cases effectively.

This project focuses on **social impact**, **transparency**, and **data-driven decision making**.

---

## 🚀 Features

### 👤 User Features
- User Signup & Login (JWT Authentication)
- Report child labour cases
- Receive a **unique Tracking ID**
- Track case status using Tracking ID
- View admin remarks and updates
- Secure and responsive UI

### 🛡️ Admin Features
- Secure Admin Login (fixed credentials)
- View all reported cases
- Update case status (Pending / Resolved)
- Add admin comments (visible to users)
- **Statistics Dashboard** (charts & analytics)
- **Heatmap View** (high-risk areas based on reports)

---

## 🧑‍💻 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router DOM
- Axios
- Chart.js
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- JWT Authentication
- bcrypt

---

## 📁 Project Structure

Udaan/
│
├── frontend/
│ ├── src/
│ │ ├── api/
│ │ ├── components/
│ │ ├── layouts/
│ │ ├── pages/
│ │ │ ├── user/
│ │ │ └── admin/
│ │ └── App.jsx
│ └── vite.config.js
│
├── backend/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── server.js
│ └── .env
│
└── README.md


---

## ⚙️ Prerequisites

To run this project locally, make sure you have:

- Node.js (v18 or above)
- npm
- MongoDB Atlas account (or MongoDB Compass)

---

## 🗄️ MongoDB Setup

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a **free cluster**
3. Create a **database user**
4. Whitelist IP address → `0.0.0.0/0`
5. Copy your connection string:



mongodb+srv://<username>:<password>@cluster.mongodb.net/udaan


---

## 🔐 Backend Setup

### Step 1: Navigate to backend folder
```bash
cd backend

Step 2: Install dependencies
npm install

Step 3: Create .env file
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/udaan
JWT_SECRET=your_secret_key
ADMIN_EMAIL=admin@ngo.org
ADMIN_PASSWORD=admin123

Step 4: Start backend server
node server.js


You should see:

MongoDB connected
Server running on port 5000

🎨 Frontend Setup
Step 1: Navigate to frontend folder
cd frontend

Step 2: Install dependencies
npm install

Step 3: Start frontend server
npm run dev


Frontend will run at:

http://localhost:5173