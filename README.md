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
<img width="1920" height="1080" alt="Screenshot (10)" src="https://github.com/user-attachments/assets/09a94c11-aa4d-4e75-bee0-19ce8b6e54a5" />

Login Page
<img width="1920" height="1080" alt="Screenshot (9)" src="https://github.com/user-attachments/assets/6af8615a-6599-4e5f-a6f7-663308323b3a" />

All Sweets
<img width="1920" height="1080" alt="Screenshot (11)" src="https://github.com/user-attachments/assets/6b6efd19-4570-4668-b538-a02f7f8694f2" />

Search Sweets
<img width="1920" height="1080" alt="Screenshot (18)" src="https://github.com/user-attachments/assets/a02c7407-80fd-47f1-9a01-d71c300f5173" />
<img width="1920" height="1080" alt="Screenshot (19)" src="https://github.com/user-attachments/assets/def30bb1-1e89-45dc-9fc6-623958f117bb" />
<img width="1920" height="1080" alt="Screenshot (16)" src="https://github.com/user-attachments/assets/99565623-7452-4dc5-9194-61aa987259cb" />

Admin Dashboard
<img width="1920" height="1080" alt="Screenshot (14)" src="https://github.com/user-attachments/assets/5544ab76-d788-45ce-9fe9-91f7b83e870b" />
<img width="1920" height="1080" alt="Screenshot (15)" src="https://github.com/user-attachments/assets/810fee2e-a632-4554-90b1-fe17f4d27555" />



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


```

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
