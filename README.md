# 📦 Telegram Message Sender

A simple full-stack web app that allows users to send messages to any Telegram chat using a bot.  
Built with **React + Vite + MUI** on the frontend and **Express.js** on the backend.

---

## ⚙️ Requirements

- **Node.js** `v18.x+`
- **npm** `v9+`

---

## 📁 Monorepo Structure

```
telegram-message-sender/
├── apps/
│   ├── backend/        # Express.js backend
│   │   ├── index.js
│   │   ├── .env
│   │   └── package.json
│   │
│   └── frontend/       # React frontend
│       ├── src/
│       │   ├── App.jsx
│       │   ├── main.jsx
│       │   └── SendMessageForm.jsx
│       ├── .env
│       └── package.json
│
├── .gitignore
├── package.json         # npm workspaces configuration
├── README.md
└── .prettierrc          # Prettier config
```

---

## 🚀 Setup Instructions

### 1. Clone the repo

```
git clone https://github.com/smerch88/tg-bot-test.git
cd to folder
```

### 2. Install dependencies

```
npm install
```

### 3. Configure environment

Backend (apps/backend/.env):

```
TELEGRAM_BOT_TOKEN=your_bot_token_here
PORT=3001
```

Frontend (apps/frontend/.env):

```
VITE_API_URL=http://localhost:3001
```

### 4. Start servers

Run separately:

```
npm run dev:backend  # Starts backend in dev mode
npm run dev:frontend  # Starts frontend in dev mode
```

Or together:

```
npm run dev:all
```

Build together:

```
npm run start
```

## Features

Send messages via Telegram Bot API

Responsive MUI interface

Real-time feedback

Secure environment variables

Input validation

Error handling
