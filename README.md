# priyank.ai — Premium AI-Powered MERN Developer Portfolio

An elite, high-performance, single-repository full-stack MERN portfolio website designed for **Priyank Chavda**, specializing in Full Stack Development, e-commerce deployments, and Generative AI Integrations.

> **"Don't want to read my resume? Chat with my AI assistant."**

Designed with a premium dark SaaS aesthetic (inspired by OpenAI, Linear, and Vercel), this application features a production-ready **Recruiter Copilot** chatbot with prompt injection, historical conversational memory, and robust fallback pipelines.

---

## 🛠️ Unified Full-Stack Architecture

This project is built as a single, merged Express + Vite full-stack node module for easy distribution.
- **Frontend Engine**: React 19, Vite 6, Tailwind CSS (with custom Space Grotesk display variables), and Framer Motion.
- **Backend Routing**: Node.js & Express API servers.
- **Database Storage**: MongoDB (Mongoose schemas) with atomic failover hooks.

```
portfolio-ai/
├── src/
│   ├── client/
│   │   ├── components/      <- AIChatBot element and visual assets
│   │   ├── pages/           <- Home, About, Projects, Experience, Contact
│   │   ├── App.tsx          <- UI core and tab router state
│   │   └── main.tsx         <- React DOM entry point
│   │
│   ├── server/
│   │   ├── config/          <- Mongoose connectors and fallback system
│   │   ├── controllers/     <- AI response handshakes & Contacts logger
│   │   ├── data/            <- Structured portfolioContext Knowledge Base
│   │   ├── prompts/         <- System prompts with anti-hallucination blocks
│   │   ├── routes/          <- Router endpoints mappings
│   │   └── app.ts           <- Express server setup
│   │
│   └── shared/
│
├── .env.example
├── server.ts                <- Main Full stack launcher
├── tsconfig.json
├── package.json
└── README.md
```

---

## 🔒 Smart Database Connector & Failover Engine

To guarantee zero server crashes in varying sandbox environments:
- **With MongoDB configured**: Form submissions are stored directly in your live cluster collections.
- **Without MongoDB configured**: Fallback routines gracefully serialize inquiries locally in `/src/server/data/submissions.json`, meaning the portfolio is **100% operational** instantly without complex pre-configurations.

---

## 📋 API Documentation

### 1. Recruiter Chat Assistant
- **Endpoint**: `POST /api/ai/chat`
- **Payload**:
```json
{
  "message": "Summarize Priyank in 30 seconds",
  "history": [
    { "role": "user", "text": "Hi" },
    { "role": "model", "text": "Hello, ask me anything!" }
  ]
}
```
- **Response**:
```json
{
  "reply": "### Who is Priyank Chavda? \n..."
}
```

### 2. AI Tech Lead Project Explanation
- **Endpoint**: `POST /api/ai/explain-project`
- **Payload**:
```json
{
  "projectId": "gym-ai"
}
```
- **Response**:
```json
{
  "title": "Gym AI Personal Trainer",
  "explanation": "### Architectural Review \n..."
}
```

### 3. Contact Form (Email Delivery)
- **Endpoint**: `POST /api/contact`
- **Payload**:
```json
{
  "name": "Alex Mercer",
  "email": "alex@mercer-recruiting.com",
  "subject": "Senior Full Stack Dev position",
  "message": "We have an open role and loved your AI portfolio widget."
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Message sent successfully",
  "submission": { ... }
}
```

---

## ⚡ Deployment & Production Guide

This portfolio is fully optimized to run on modern PaaS hosts like **Render**, **Railway**, or standard VPS instances.

### 🌐 Environment Variables
Copy `.env.example` to `.env` and fill in:
```env
GEMINI_API_KEY="your-gemini-api-key"
EMAIL_USER="your.email@gmail.com"
EMAIL_PASS="your-gmail-app-password"
NODE_ENV=production
PORT=3000
MONGO_URI="your-mongodb-connection-string"  # optional
```

### 📦 Render Deployment
1. Import your repository into **Render Dashboard**.
2. Create a new **Web Service**.
3. Apply these settings:
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`
4. Set `NODE_ENV=production`, `GEMINI_API_KEY`, `EMAIL_USER`, and `EMAIL_PASS` in the host environment panel.

### 🚀 Railway Deployment
1. Connect GitHub to **Railway**.
2. Press "New Project" -> "Deploy from GitHub repo".
3. Railway automatically detects the `package.json` package scripts and launches.
