# 🍰 Food 2 Go - Ber's Bakery

A full-stack premium bakery e-commerce website built using modern web technologies. This project includes both frontend and backend with authentication, cart, and order management features.

---

## 🚀 Features

* 🏠 Homepage with featured cakes & categories
* 🛍️ Product listing with filters & search
* 📄 Product detail page with reviews
* 🛒 Cart system with add/remove items
* 💳 Checkout & order confirmation
* 🔐 User authentication (Login / Register)
* 📦 Orders page for users
* 📱 Fully responsive design

---

## 🛠️ Tech Stack

### Frontend

* React + Vite
* Tailwind CSS
* React Query
* Wouter (Routing)

### Backend

* Node.js
* Express.js
* JWT Authentication
* In-memory database

---

## 📂 Project Structure

artifacts/
├── api-server (Backend - Express API)
└── cake-shop (Frontend - React App)

lib/
├── api-client-react
├── api-spec

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repo

git clone https://github.com/Pinkidalal1010/Food-To-Go-BER-S-Bakery.git
cd Food-To-Go-BER-S-Bakery

---

### 2️⃣ Install dependencies

pnpm install

---

### 3️⃣ Run backend

cd artifacts/api-server
$env:PORT=3000
pnpm run build
pnpm run start

---

### 4️⃣ Run frontend

cd artifacts/cake-shop
$env:PORT=5173
$env:BASE_PATH="/"
pnpm run dev

---

## 🌐 Environment Variables

Create a `.env` file inside `cake-shop` folder:

PORT=5173
BASE_PATH=/
VITE_API_URL=http://localhost:3000

---

## 💡 Future Improvements

* Admin dashboard
* Payment integration (Stripe)
* Database integration (MongoDB / PostgreSQL)
* Order tracking system

---

## 👩‍💻 Author
Harshita Arora
Pinky Dalal

---

## ⭐ Don't forget to star the repo!
