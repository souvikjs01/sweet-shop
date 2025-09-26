# 🍬 Sweet Shop Management System

A full-stack web application for managing sweets inventory, purchases, and admin operations.  
Built with **React.js (frontend)** and **Node.js + Express + Prisma (backend)**.

---

## 🚀 Features

- 🔐 User authentication (JWT based)  
- 🍭 View all available sweets  
- 🔎 Search sweets by name, category, or price range  
- 🛒 Purchase sweets (quantity updates automatically)  
- 🛠️ Admin features: Add, Update, Delete, Restock sweets  
- 🎨 Responsive UI built with Tailwind CSS  

---

## 🛠️ Tech Stack

**Frontend**
- React.js + TypeScript  
- Tailwind CSS  
- Axios  

**Backend**
- Node.js + Express  
- Prisma ORM  
- PostgreSQL  
- JWT Authentication  

---

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/souvikjs01/sweet-shop.git
cd sweet-shop

### 2. Backend setup

cd server
npm install

-- Configure .env file:

DATABASE_URL=postgresql://user:password@localhost:5432/sweetshop
JWT_SECRET=your_jwt_secret
PORT=8000

-- Run database migrations:

npx prisma migrate dev --name init

-- Start backend server:

npm run dev

### 3. Setup Frontend

cd client
npm install

server=http://localhost:8000

-- Start frontend
npm run dev


###📸 Screenshots

Login Page


All Sweets


Search Sweets


Admin Dashboard


### 🤖 My AI Usage

I used AI tools responsibly to assist my development workflow.

Tools Used

ChatGPT (OpenAI GPT-5)


How I Used Them

ChatGPT Helped debug TypeScript errors in various components Suggested how to correctly trackle those errors.

Guided me on building a flexible search API with optional query parameters

Helped structure the frontend components.


Reflection

Using AI significantly boosted my productivity by:

Speeding up debugging and refactoring.

Providing clean UI/UX pattern ideas.

Reducing time spent writing repetitive backend logic.

However, I ensured all AI-generated code was reviewed, tested, and customized to meet project requirements. AI was a helper, not a replacement for my own problem-solving.
