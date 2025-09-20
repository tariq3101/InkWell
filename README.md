# InkWell (Blogging Website)

**InkWell** is an innovative blogging platform built with the **MERN stack**. It provides a modern, engaging experience for authors and readers with real-time updates, dynamic content handling, and a user-friendly interface.  

[🌐 Live Project](https://ink-welll.vercel.app/)

---

## 📑 Table of Contents
- [Introduction](#-introduction)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Usage](#-usage)
- [Configuration](#-configuration)
- [Dependencies](#-dependencies)
- [Contributors](#-contributors)

---

## 🚀 Introduction
**InkWell** is a **full-stack blogging application** with:

- **API (Backend)**: Handles authentication, data storage, and content management.
- **Client (Frontend)**: Web dashboard for authors, readers, and administrators to interact with posts and comments.

---

## ✨ Features
- Secure user registration and login
- Create, edit, and manage blogs in "Your Posts" section
- Comment on posts in the "Comment Section"
- Post summarization feature powered by AI
- Modern, responsive frontend built with React
- Scalable backend with REST API endpoints

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
cd api
npm start
```
Or
```
nodemon index.js
```

### Run Frontend
```bash
cd client
npm start
```

Frontend: http://localhost:3000 (or configured port)
Backend: http://localhost:5000 (or configured port)

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

| Technology | Description | Link |
|------------|-------------|------|
| ![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js) | JavaScript runtime for backend | [Node.js](https://nodejs.org/) |
| ![Express.js](https://img.shields.io/badge/Express.js-4.x-black?logo=express) | Web framework for Node.js | [Express.js](https://expressjs.com/) |
| ![Mongoose](https://img.shields.io/badge/Mongoose-ODM-orange?logo=mongodb) | MongoDB object modeling for Node.js | [Mongoose](https://mongoosejs.com/) |
| ![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?logo=mongodb) | NoSQL database | [MongoDB](https://www.mongodb.com/) |
| ![JWT](https://img.shields.io/badge/JSON%20Web%20Token-9.x-blue?logo=jsonwebtokens) | Authentication & Authorization | [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) |
| ![BcryptJS](https://img.shields.io/badge/BcryptJS-2.4.3-yellow?logo=javascript) | Password hashing | [bcryptjs](https://www.npmjs.com/package/bcryptjs) |
| ![CORS](https://img.shields.io/badge/CORS-2.8.5-lightgrey?logo=node.js) | Middleware for handling cross-origin requests | [CORS](https://www.npmjs.com/package/cors) |
| ![Dotenv](https://img.shields.io/badge/Dotenv-16.x-darkgreen?logo=node.js) | Load environment variables | [Dotenv](https://www.npmjs.com/package/dotenv) |
| ![Multer](https://img.shields.io/badge/Multer-1.4.5--lts.1-red?logo=node.js) | File upload middleware | [Multer](https://www.npmjs.com/package/multer) |
| ![Cloudinary](https://img.shields.io/badge/Cloudinary-1.41.3-blue?logo=cloudinary) | Cloud storage for images/videos | [Cloudinary](https://cloudinary.com/) |
| ![Multer Cloudinary](https://img.shields.io/badge/Multer%20Cloudinary-4.0.0-lightblue?logo=cloudinary) | Cloudinary integration with Multer | [multer-storage-cloudinary](https://www.npmjs.com/package/multer-storage-cloudinary) |
| ![Axios](https://img.shields.io/badge/Axios-HTTP%20Client-blue?logo=axios) | HTTP client for API calls | [Axios](https://axios-http.com/) |
| ![@google/generative-ai](https://img.shields.io/badge/Google%20Generative%20AI-0.19.0-orange?logo=google) | Google Gemini API SDK | [@google/generative-ai](https://www.npmjs.com/package/@google/generative-ai) |
| ![Path](https://img.shields.io/badge/Path-0.12.7-grey?logo=node.js) | Path utilities for Node.js | [path](https://www.npmjs.com/package/path) |
| ![Nodemon](https://img.shields.io/badge/Nodemon-3.1.7-green?logo=nodemon) | Auto-restart Node.js server | [Nodemon](https://www.npmjs.com/package/nodemon) |



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

## 👥 Contributors
- **tariq3101** – Creator & Maintainer  
- Contributions welcome! Submit a pull request or open an issue.

---
