# 🤖 Priyank AI Portfolio

An AI-powered full-stack developer portfolio built to provide recruiters, clients, and hiring managers with an interactive way to learn about my experience, projects, and technical expertise.

Instead of reading a traditional resume, visitors can simply chat with an AI assistant trained on my portfolio and project history.

---

## ✨ Key Highlight

> "Don't want to read my resume? Chat with my AI assistant."

The AI assistant can answer questions about:

* Technical Skills
* Work Experience
* Projects
* Education
* Achievements
* Technologies Used
* Development Process

---

## 🚀 Features

### 🤖 AI Recruiter Assistant

* Powered by Google Gemini AI
* Context-aware responses
* Project-specific explanations
* Portfolio knowledge base integration
* Conversation history support

### 💼 Portfolio Showcase

* Home Page
* About Section
* Experience Timeline
* Project Gallery
* Contact Page

### 📬 Contact Automation

* Email delivery using Nodemailer
* Contact form validation
* Automated inquiry handling

### 🔒 Security Features

* API rate limiting
* Request validation
* Error handling middleware
* Secure environment variable management

### 📈 SEO Optimization

* robots.txt
* sitemap.xml
* Metadata configuration
* Search engine friendly architecture

### ☁️ Production Deployment

* Vercel frontend deployment
* Render backend deployment
* Environment-based configuration
* Scalable API architecture

---

## 🛠 Tech Stack

### Frontend

* React 19
* Vite
* Tailwind CSS
* React Router
* Framer Motion
* Lenis Smooth Scroll

### Backend

* Node.js
* Express.js

### AI & Automation

* Google Gemini AI
* Prompt Engineering
* Context-Aware Responses

### Database

* MongoDB
* Mongoose

### Communication

* Nodemailer

### Security

* Helmet
* Express Rate Limit
* Validator

### Deployment

* Vercel
* Render

---

## 📂 Project Structure

```bash
src/
│
├── client/
│   ├── pages/
│   │   ├── Home
│   │   ├── About
│   │   ├── Experience
│   │   ├── Projects
│   │   └── Contact
│   │
│   ├── components/
│   │   ├── AIChatBot
│   │   ├── Navbar
│   │   ├── PageTransition
│   │   └── SmoothScroll
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   ├── prompts/
│   └── data/
│
└── data/
    └── portfolioContext.json
```

---

## 🤖 AI Capabilities

The AI assistant can:

### Answer Recruiter Questions

Examples:

```text
Tell me about Priyank.
```

```text
What technologies does Priyank work with?
```

```text
Explain the AI Plant Analysis Tool project.
```

```text
Which project best demonstrates full-stack development?
```

### Project Knowledge Base

The chatbot uses structured portfolio context to provide accurate answers and reduce hallucinations.

---

## 📡 API Endpoints

### AI Chat

```http
POST /api/ai/chat
```

### Project Explanation

```http
POST /api/ai/explain-project
```

### Contact Form

```http
POST /api/contact
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/Priyank910/priyank-ai-portfolio.git
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

```env
GEMINI_API_KEY=your_api_key

EMAIL_USER=your_email

EMAIL_PASS=your_app_password

MONGODB_URI=your_database_connection
```

### Run Frontend

```bash
npm run dev:client
```

### Run Backend

```bash
npm run dev:server
```

---

## 🎯 Learning Outcomes

* Full-Stack Development
* Generative AI Integration
* Prompt Engineering
* Context-Aware AI Systems
* API Development
* Secure Backend Architecture
* Email Automation
* MongoDB Integration
* Production Deployment

---

## 🚀 Future Improvements

* Voice AI Assistant
* Resume Upload Analysis
* Interview Simulation
* Recruiter Analytics Dashboard
* Multi-Language Support
* AI Career Advisor
* Personalized Project Recommendations
* OpenAI & Anthropic Model Support

---

## 📸 Screenshots

Add screenshots for:

### Home Page

### AI Chat Assistant

### Projects Page

### Experience Page

### Contact Page

---

## 👨‍💻 Author

Priyank Chavda

GitHub: https://github.com/Priyank910

---

## 📄 License

MIT License
