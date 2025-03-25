# 📄 Webpage Summarizer

## 🌟 Overview

Webpage Summarizer is a powerful FastAPI-based web application designed to extract and summarize content from web pages using advanced language models. The application supports multiple summarization methods, currently implementing Ollama with an optional OpenAI integration.

## ✨ Features

- Web page content extraction
- URL validation
- Text summarization with multiple model support
- Flexible summarization methods
- CORS support for frontend integration
- Comprehensive error handling
- Detailed logging capabilities

## 🛠 Prerequisites

Before you begin, ensure you have the following installed:

- Python 3.8+
- pip (Python package manager)
- Ollama (recommended)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/atishayjain005/webpage-summarizer.git
cd webpage-summarizer
```

### 2. Create Virtual Environment

```bash
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

## 📦 Dependencies

- FastAPI
- Uvicorn
- Requests
- BeautifulSoup4
- Pydantic
- Validators
- Ollama
- (Optional) OpenAI

## 🔧 Configuration

### Ollama Setup

1. Install Ollama from [ollama.com](https://ollama.com)
2. Pull the desired language model:

```bash
ollama pull llama3.2
```

### OpenAI Configuration (Optional)

1. Uncomment OpenAI-related code in the script
2. Install OpenAI package: 
   ```bash
   pip install openai
   ```
3. Set your OpenAI API key:
   ```bash
   export OPENAI_API_KEY='your-api-key-here'
   ```

## 🖥 Running the Application

### Development Mode

```bash
uvicorn main:app --reload
```

### Production Deployment

```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

## 🌐 API Endpoint

### Summarize Webpage

- **Endpoint**: `/summarize`
- **Method**: POST
- **Request Body**:
  ```json
  {
      "url": "https://example.com/article"
  }
  ```

## 🛠 Customization

### Summarization Methods

- Modify `summarize_text()` function to change summarization logic
- Switch between Ollama and OpenAI by changing the `method` parameter

### Text Extraction

- Adjust `extract_text()` function to modify content extraction strategy

## 🚨 Error Handling

The application includes comprehensive error handling for:

- Invalid URLs
- Webpage fetch failures
- Text extraction issues
- Summarization errors

## 📋 Logging

Logs are configured with INFO level, tracking:

- Webpage fetch operations
- Text extraction
- Summarization processes
- Error scenarios

## 🔒 Security Considerations

- Use specific CORS origins in production
- Validate and sanitize all input URLs
- Implement rate limiting for production use

## 🐛 Troubleshooting

- Ensure all dependencies are installed
- Check network connectivity
- Verify Ollama/OpenAI model availability
- Review application logs for detailed error information

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## ⚠️ Disclaimer

Web scraping may be subject to legal and ethical constraints. Always respect website terms of service and robots.txt guidelines.

## 📞 Contact

Your Name - [your.email@example.com](mailto:your.email@example.com)

Project Link: [https://github.com/atishayjain005/webpage-summarizer](https://github.com/atishayjain005/webpage-summarizer)