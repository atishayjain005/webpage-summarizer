import uvicorn
import logging
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, validator
import requests
from bs4 import BeautifulSoup
import ollama
import os
import validators  # Add this import for URL validation

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class URLRequest(BaseModel):
    url: str

    @validator('url')
    def validate_url(cls, v):
        if not validators.url(v):
            raise ValueError('Invalid URL')
        return v

app = FastAPI()

# Configure CORS to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Be more specific in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def fetch_webpage(url):
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        return response.text
    except requests.RequestException as e:
        logger.error(f"Error fetching webpage: {str(e)}")
        raise HTTPException(status_code=400, detail=f"Error fetching webpage: {str(e)}")

def extract_text(html_content):
    try:
        soup = BeautifulSoup(html_content, 'html.parser')
        
        # Remove script, style, and navigation elements
        for script in soup(["script", "style", "nav", "header", "footer"]):
            script.decompose()
        
        paragraphs = soup.find_all('p')
        text = ' '.join([p.get_text(strip=True) for p in paragraphs if p.get_text(strip=True)])
        
        # Limit text length to prevent overwhelming the summarization model
        return text[:5000]
    except Exception as e:
        logger.error(f"Error extracting text: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error extracting text: {str(e)}")

def summarize_text(text, method='ollama'):
    system_prompt = """You are a professional summarizer tasked with creating a clear, concise summary in markdown format. 

Follow these guidelines:
- Use markdown formatting to structure the summary
- Use appropriate headings (`##`, `###`) to organize key points
- Highlight important terms with **bold**
- Use bullet points (`-`) for lists
- Keep the summary between 250-500 words
- Preserve the most important information from the original text
- Maintain a neutral, objective tone

Summary format:
## Key Takeaways

### Main Topics
- Primary point 1
- Primary point 2

### Detailed Insights
- Specific details and supporting information

### Implications or Conclusions
- Significant outcomes or broader context"""

    if not text:
        raise HTTPException(status_code=400, detail="No text to summarize")

    if method == 'ollama':
        model = "llama3.2"  # Change to your preferred Ollama model
        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"Summarize the following text:\n{text}"}
        ]
        try:
            response = ollama.chat(model=model, messages=messages)
            return response["message"]["content"]
        except Exception as e:
            logger.error(f"Ollama summarization error: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Ollama summarization error: {str(e)}")
    
    raise HTTPException(status_code=400, detail="Invalid summarization method")

@app.post("/summarize")
async def summarize_webpage(request: URLRequest):
    try:
        # Fetch and process the webpage
        html_content = fetch_webpage(request.url)
        text = extract_text(html_content)
        
        # Generate summary
        summary = summarize_text(text)
        
        return {"summary": summary}
    except Exception as e:
        logger.error(f"Summarization error: {str(e)}")
        raise

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)