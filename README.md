# 📄 Web Summarizer App

## 🌟 Project Overview

Web Summarizer is a full-stack application designed to extract and summarize web content intelligently. Leveraging advanced language models, it provides concise, readable summaries of web articles with a modern, user-friendly interface.

## 📂 Project Structure

```
web-summarizer-app/
│
├── backend/
│   ├── README.md
│   ├── requirements.txt
│   └── web_summarizer.py
│
└── web-summarizer/
    ├── README.md
    ├── src/
    │   └── app/
    │       ├── api/
    │       │   └── summarize/
    │       │       └── route.ts
    │       ├── globals.css
    │       ├── layout.tsx
    │       └── page.tsx
    │
    ├── package.json
    ├── tailwind.config.js
    └── tsconfig.json
```

## 🛠 Tech Stack

### Backend
- **Framework**: FastAPI
- **Language**: Python
- **Key Libraries**: 
  - Ollama
  - BeautifulSoup
  - Requests

### Frontend
- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS

## 🚀 Quick Start

### Backend Setup

1. Navigate to backend directory
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

2. Run the backend server
```bash
uvicorn web_summarizer:app --reload
```

### Frontend Setup

1. Navigate to frontend directory
```bash
cd web-summarizer
npm install
```

2. Run development server
```bash
npm run dev
```

## 🔧 Configuration

### Backend
- Configure language models in `web_summarizer.py`
- Set up environment variables as needed

### Frontend
- Update API endpoints in `.env` file
- Customize Tailwind configuration in `tailwind.config.js`

## 🌐 Key Features

- AI-powered web content summarization
- Responsive web interface
- Multiple model support
- URL-based content extraction

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request
