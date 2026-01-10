# 🎓 CampusMart - Student Marketplace

![CampusMart Banner](https://via.placeholder.com/1200x400?text=CampusMart+E-Commerce)
*(Add a real screenshot of the landing page here)*

## 🚀 Overview

**CampusMart** is a premier e-commerce platform tailored specifically for university campuses. It bridges the gap between students who need to buy and sell academic resources, electronics, and dorm essentials. With a secure environment and intuitive design, CampusMart ensures a seamless trading experience within the student community.

This project is a full-stack **MERN** (MongoDB, Express, React, Node.js) application, demonstrating modern web development practices, responsive UI, and secure authentication.

---

## ✨ Features

- **🔐 User Authentication**: Secure registration and login using JWT and bcrypt.
- **📦 Product Management**: Easy-to-use interface for listing items with details and images.
- **🔍 Smart Search & Fillers**: Find books, notes, and gadgets quickly with dynamic search.
- **📱 Responsive Design**: Fully responsive UI built with **React Bootstrap**, ensuring a perfect experience on mobile and desktop.
- **🛒 Shopping Cart**: Persistent cart functionality for seamless checkout (checkout logic simulated).
- **👤 User Dashboard**: Manage your listings and profile settings.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React](https://reactjs.org/) (Create React App)
- **Styling**: [React Bootstrap](https://react-bootstrap.github.io/) & Custom CSS
- **Routing**: React Router v6
- **State Management**: React Context API
- **Icons**: FontAwesome

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (using Mongoose ODM)
- **Authentication**: JSON Web Tokens (JWT)
- **Image Handling**: Multer (for file uploads)

---

## 🚀 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites
- **Node.js** (v14+)
- **MongoDB** (Local instance or MongoDB Atlas URI)

### 1. Clone the Repository
```bash
git clone https://github.com/Abhishek-Maheshwari-778/CampusMart_E-Commerce_Website.git
cd CampusMart_E-Commerce_Website
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_here
```
Start the server:
```bash
npm run dev
```
*Server will run on `http://localhost:5000`*

### 3. Frontend Setup
Open a new terminal:
```bash
cd frontend
npm install
```
Start the application:
```bash
npm start
```
*Application will open at `http://localhost:3000`*

---

## 🌍 Deployment

### Frontend (Vercel)
The frontend is optimized for deployment on Vercel.
1. Push your code to GitHub.
2. Import the project in Vercel.
3. Select the `frontend` directory as the Root Directory.
4. Build Command: `npm run build`
5. Output Directory: `build`

### Backend (Render/Railway)
1. Deploy the `backend` folder to a service like Render or Railway.
2. Add Environment Variables (`MONGO_URI`, `JWT_SECRET`).
3. Update the frontend API URL to point to your deployed backend.

---

## 👥 The Team

Developed with ❤️ by the CampusMart Team:
- **Abhishek Maheshwari** (Team Lead)
- Abhishek Verma
- Govind Gupta
- Khushi Gupta
- Prteek Gupta
- Vaishnavi Gupta
- Samina
- Rinku Chaudhary
- Soni
- Palak

**Mentor**: Salman Sir

---

## 📄 License

This project is licensed under the ISC License.
