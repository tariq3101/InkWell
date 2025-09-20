# 📘 School Payment

**InkWell** aims to provide an innovative and engaging blogging experience by leveraging the power of the **MERN stack**. With its user-friendly interface, dynamic content handling, and real-time updates, **InkWell** stands out as a modern, robust platform for both authors and readers.
---

## 📑 Table of Contents
- [Introduction](#-introduction)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Usage](#-usage)
- [Configuration](#-configuration)
- [Dependencies](#-dependencies)
- [Troubleshooting](#-troubleshooting)
- [Contributors](#-contributors)

---

---
Project URL: https://ink-welll.vercel.app/
---

## 🚀 Introduction
This project provides a **full-stack application** to manage blogs. It consists of:
- **api (API)**: Handles authentication, payment processing, and data storage.
- **client (UI)**: A web-based dashboard for students, staff, and administrators to interact with the system.

---

## ✨ Features
- Secure user registration
- Manage all blogs in YOUR POST section
- Users can comments on COMMENT SECTION of each posts
- Unique Post summarization feature
- Modern frontend built with javascript
- Scalable backend with API endpoints

---

## 📂 Project Structure
```
root/
│── api/                         # Backend (Node.js + Express + MongoDB)
│   │── middleware/              # Authentication, logging, error handling, etc.
│   │── models/                  # Mongoose models (User, Post, etc.)
│   │── routes/                  # Express routes (API endpoints)
│   │── index.js                 # Entry point for backend server
│   │── package.json             # Backend dependencies
│   │── package-lock.json
│
│── client/                      # Frontend (React)
│   │── public/                  # Static assets (favicon, index.html, etc.)
│   │── src/
│   │   │── components/          # Reusable UI components (Comment, Header etc.)
│   │   │── context/             # Context API / State management
│   │   │── images/              # Image assets
│   │   │── pages/               # Page components (Login, Home, etc.)
│   │   │── App.js               # Main React component
│   │   │── index.js             # React entry point
│   │
│   │── package.json             # Frontend dependencies
│   │── package-lock.json
│   │── README.md                # Frontend documentation
│
│── .gitignore                   # Ignore files for git (node_modules, build, etc.)

```

## ⚙️ Installation

### 1. Clone the Repository
```bash
git clone https://github.com/tariq3101/InkWell.git
cd InkWell
```

### 2. Install Dependencies

#### Backend
```bash
cd api
npm install
```

#### Frontend
```bash
cd client
npm install
```

---

## ▶️ Usage

### Run Backend
```bash
cd backend
npm run start
```
Or
```
nodemon index.js
```

### Run Frontend
```bash
cd frontend
npm run dev
```
Or
```
npm start
```

The frontend should now be available at `http://localhost:3000` (or configured port).  
The backend will run on `http://localhost:5000` (or configured port).

---

## 🔧 Configuration
Both backend and frontend may require environment variables. Create a `.env` file in each directory with values like:

```
PORT=5000
MONGO_URL=your_database_url
JWT_SECRET=your_secret
API_KEY=your_gemini_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
FRONTEND_URL=http://localhost:3000/ or configured
```

*(Update based on actual configuration in code.)*

---

## 📦 Dependencies

### Backend
- Node.js
- Express
- Cloudinary
- Database client (e.g. MongoDB)

### Frontend
- React 
- CSS  
- Axios for API calls

*(Exact list comes from `package.json` files.)*

---

## 🛠 Troubleshooting
- **App not starting?** Check Node.js version (`>=16` recommended).
- **Database connection error?** Ensure your `.env` contains the correct `MONGO_URL`.
- **CORS issues?** Confirm backend CORS policy allows frontend origin.

---

## 👥 Contributors
- **tariq3101** – Creator & Maintainer  
- Contributions welcome! Submit a pull request or open an issue.

---
