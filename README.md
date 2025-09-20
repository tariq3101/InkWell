# InkWell (Blogging Website)

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
Backend .env file:
PORT=5000
MONGO_URL=your_database_url
JWT_SECRET=your_secret
API_KEY=your_gemini_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
FRONTEND_URL=http://localhost:3000/ or configured

Frontend .env file:
REACT_APP_BACKEND_URL=http://localhost:5000
```

## 📦 Dependencies

### Backend
- Node.js
- Express
- Cloudinary
- Database client (e.g. MongoDB)

### Frontend

| Technology | Description | Link |
|------------|-------------|------|
| ![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js) | JavaScript runtime for backend | [Node.js](https://nodejs.org/) |
| ![Express.js](https://img.shields.io/badge/Express.js-4.x-black?logo=express) | Web framework for Node.js | [Express.js](https://expressjs.com/) |
| ![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?logo=mongodb) | NoSQL database | [MongoDB](https://www.mongodb.com/) |
| ![Mongoose](https://img.shields.io/badge/Mongoose-ODM-orange?logo=mongodb) | MongoDB object modeling for Node.js | [Mongoose](https://mongoosejs.com/) |
| ![CORS](https://img.shields.io/badge/CORS-2.8.5-lightgrey?logo=node.js) | Middleware for handling cross-origin requests | [CORS](https://www.npmjs.com/package/cors) |
| ![Dotenv](https://img.shields.io/badge/Dotenv-16.x-darkgreen?logo=node.js) | Load environment variables | [Dotenv](https://www.npmjs.com/package/dotenv) |
| ![BcryptJS](https://img.shields.io/badge/BcryptJS-2.4.3-yellow?logo=javascript) | Password hashing | [BcryptJS](https://www.npmjs.com/package/bcryptjs) |
| ![React](https://img.shields.io/badge/React-18.x-blue?logo=react) | Frontend UI library | [React](https://react.dev/) |
| ![React Router](https://img.shields.io/badge/React%20Router-6.x-green?logo=reactrouter) | Client-side routing | [React Router](https://reactrouter.com/) |
| ![Axios](https://img.shields.io/badge/Axios-HTTP%20Client-blue?logo=axios) | HTTP client for API calls | [Axios](https://axios-http.com/) |
| ![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-purple?logo=bootstrap) | CSS Framework | [Bootstrap](https://getbootstrap.com/) |


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
