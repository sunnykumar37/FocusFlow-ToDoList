# FocusFlow - Productivity & Task Management App

FocusFlow is a modern, full-stack productivity application designed to help users manage tasks efficiently while staying focused using a built-in Pomodoro timer. Built with the MERN stack, it features secure authentication, persistent data storage, and a premium glassmorphic UI.

## 🚀 Features

### 🔐 Authentication & Security
- **User Registration & Login**: Secure email/password authentication.
- **Google OAuth**: One-click sign-in using Google.
- **JWT Sessions**: Stateless authentication using JSON Web Tokens.
- **Password Encryption**: User passwords hashed with `bcryptjs`.
- **Route Protection**: Dashboard and API endpoints explicitly protected.

### ✅ Task Management
- **CRUD Operations**: Create, Read, Update, and Delete tasks.
- **User Scoping**: Tasks are private and linked specifically to the logged-in user.
- **Task Details**:
  - Priority levels (High/Medium/Low) with color coding.
  - Categories (Work, Personal, etc.).
  - Due Dates.
- **Progress Tracking**: Visual progress bar showing daily task completion.

### 🍅 Productivity Tools
- **Pomodoro Timer**: Integrated timer (25m Focus / 5m Break) to boost productivity.
- **Start/Pause/Reset**: Full control over timer sessions.

### 🎨 UI/UX Design
- **Premium Aesthetics**: Vibrant Indigo-Purple-Pink gradients.
- **Glassmorphism**: Modern frosted-glass card effects for all containers.
- **Responsive Layout**: optimized for desktop and mobile.
- **Live Feedback**: Loading states, error handling, and empty state prompts.

## 🛠️ Tech Stack

### Frontend
- **React.js** (Vite)
- **Tailwind CSS** (Styling)
- **Axios** (API Requests)
- **React Router DOM** (Navigation)
- **@react-oauth/google** (Social Auth)
- **React Icons**

### Backend
- **Node.js & Express.js**
- **MongoDB Atlas** (Database)
- **Mongoose** (ODM)
- **JsonWebToken** (Authentication)
- **Bcryptjs** (Security)

## 📂 Project Structure

```
FocusFlow/
├── backend/            # Express API Server
│   ├── config/         # DB Connection
│   ├── controllers/    # API Logic (Auth, Tasks)
│   ├── middleware/     # Auth Protection
│   ├── models/         # Mongoose Models (User, Task)
│   ├── routes/         # API Routes
│   └── server.js       # Entry Point
│
├── frontend/           # React Client
│   ├── src/
│   │   ├── api/        # Axios Config
│   │   ├── components/ # Reusable UI (Forms, Lists, Timer)
│   │   ├── context/    # Auth State Management
│   │   ├── pages/      # Views (Login, Register, Dashboard)
│   │   └── App.jsx     # Main Router
│   └── tailwind.config.js
```

## ⚡ Getting Started

### Prerequisites
- Node.js installed
- MongoDB Atlas URI
- Google Cloud Console Client ID

### 1. Clone the Repository
```bash
git clone https://github.com/sunnykumar37/FocusFlow-ToDoList.git
cd FocusFlow
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in `backend/`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
```
Start the server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```
Start the client:
```bash
npm run dev
```

## 📸 Screenshots
*(Add screenshots of your Dashboard and Login page here)*

---
Developed by Sunny Kumar
