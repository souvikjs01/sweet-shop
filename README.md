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

###📸 Screenshots

Register Page
<img width="1920" height="1080" alt="Screenshot (4)" src="https://github.com/user-attachments/assets/d424c500-d131-4578-85e3-115ace2e507f" />

Login Page
<img width="1920" height="1080" alt="Screenshot (3)" src="https://github.com/user-attachments/assets/06cf540e-5e0a-47f9-a374-ebcdbd618c80" />

All Sweets
<img width="1920" height="1080" alt="Screenshot (5)" src="https://github.com/user-attachments/assets/cabc8229-19a0-4ac8-8b8c-94759fd676aa" />

Search Sweets
<img width="1920" height="1080" alt="Screenshot (7)" src="https://github.com/user-attachments/assets/73c30cc1-32b3-4757-91d4-bbd3680018a8" />
<img width="1920" height="1080" alt="Screenshot (8)" src="https://github.com/user-attachments/assets/bd8c119b-b6cc-406e-af85-7487203edd9f" />

Admin Dashboard
<img width="1920" height="1080" alt="Screenshot (6)" src="https://github.com/user-attachments/assets/5ab9324d-e9ac-4c65-ac50-37e5701759d5" />
<img width="1899" height="1013" alt="Screenshot 2025-09-26 113833" src="https://github.com/user-attachments/assets/5621c359-621d-4594-b55b-27f3f8f9e74b" />
<img width="1909" height="1026" alt="Screenshot 2025-09-26 113929" src="https://github.com/user-attachments/assets/dfd87ad3-6be1-4b30-8e88-5e41ee33c693" />



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
