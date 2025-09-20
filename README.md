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

[![Node.js](https://img.shields.io/badge/node.js-18.x-green?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/) 
[![Express.js](https://img.shields.io/badge/express.js-4.x-black?style=flat&logo=express&logoColor=%2361DAFB)](https://expressjs.com/) 
[![Mongoose](https://img.shields.io/badge/mongoose-orange?style=flat&logo=mongodb&logoColor=white)](https://mongoosejs.com/) 
[![MongoDB](https://img.shields.io/badge/mongodb-database-green?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/) 
[![JWT](https://img.shields.io/badge/json%20web%20token-9.x-blue?style=flat&logo=jsonwebtokens&logoColor=white)](https://www.npmjs.com/package/jsonwebtoken) 
[![BcryptJS](https://img.shields.io/badge/bcryptjs-2.4.3-yellow?style=flat&logo=javascript&logoColor=black)](https://www.npmjs.com/package/bcryptjs) 
[![CORS](https://img.shields.io/badge/cors-2.8.5-lightgrey?style=flat&logo=node.js&logoColor=white)](https://www.npmjs.com/package/cors) 
[![Dotenv](https://img.shields.io/badge/dotenv-16.x-darkgreen?style=flat&logo=node.js&logoColor=white)](https://www.npmjs.com/package/dotenv) 
[![Multer](https://img.shields.io/badge/multer-1.4.5--lts.1-red?style=flat&logo=node.js&logoColor=white)](https://www.npmjs.com/package/multer) 
[![Cloudinary](https://img.shields.io/badge/cloudinary-1.41.3-blue?style=flat&logo=cloudinary&logoColor=white)](https://cloudinary.com/) 
[![Multer Cloudinary](https://img.shields.io/badge/multer%20cloudinary-4.0.0-lightblue?style=flat&logo=cloudinary&logoColor=white)](https://www.npmjs.com/package/multer-storage-cloudinary) 
[![Axios](https://img.shields.io/badge/axios-blue?style=flat&logo=axios&logoColor=white)](https://axios-http.com/) 
[![Google Generative AI](https://img.shields.io/badge/google%20generative%20ai-0.19.0-orange?style=flat&logo=google&logoColor=white)](https://www.npmjs.com/package/@google/generative-ai) 
[![Path](https://img.shields.io/badge/path-0.12.7-grey?style=flat&logo=node.js&logoColor=white)](https://www.npmjs.com/package/path) 
[![Nodemon](https://img.shields.io/badge/nodemon-3.1.7-green?style=flat&logo=nodemon&logoColor=%23BBDEAD)](https://www.npmjs.com/package/nodemon)



### Frontend

![Node.js](https://img.shields.io/badge/node.js-18.x-green?style=flat&logo=node.js&logoColor=white) 
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=flat&logo=express&logoColor=%2361DAFB) 
![MongoDB](https://img.shields.io/badge/mongodb-%234ea94b.svg?style=flat&logo=mongodb&logoColor=white) 
![Mongoose](https://img.shields.io/badge/mongoose-orange?style=flat&logo=mongodb&logoColor=white) 
![CORS](https://img.shields.io/badge/cors-2.8.5-lightgrey?style=flat&logo=node.js&logoColor=white) 
![Dotenv](https://img.shields.io/badge/dotenv-16.x-darkgreen?style=flat&logo=node.js&logoColor=white) 
![BcryptJS](https://img.shields.io/badge/bcryptjs-2.4.3-yellow?style=flat&logo=javascript&logoColor=black) 
![React](https://img.shields.io/badge/react-18.x-blue?style=flat&logo=react&logoColor=white) 
![React Router](https://img.shields.io/badge/react_router-6.x-green?style=flat&logo=reactrouter&logoColor=white) 
![Axios](https://img.shields.io/badge/axios-blue?style=flat&logo=axios&logoColor=white) 
![Bootstrap](https://img.shields.io/badge/bootstrap-5.3-purple?style=flat&logo=bootstrap&logoColor=white)



---

## 👥 Contributors
- **tariq3101** – Creator & Maintainer  
- Contributions welcome! Submit a pull request or open an issue.

---
