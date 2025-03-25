import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ message: 'URL is required' }, { status: 400 });
    }

    // Validate URL format (basic check)
    try {
      new URL(url);
    } catch (error) {
      return NextResponse.json({ message: 'Invalid URL format' + error }, { status: 400 });
    }

    // Forward request to Python backend
    const pythonBackendUrl = process.env.PYTHON_BACKEND_URL || 'http://localhost:8000/summarize';
    
    const response = await axios.post(pythonBackendUrl, { url }, {
      timeout: 30000,  // 30 seconds timeout
      headers: {
        'Content-Type': 'application/json',
      }
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Summarization error:', error);
    
    // Detailed error handling
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        return NextResponse.json({ 
          message: 'Backend service error',
          details: error.response.data,
          status: error.response.status
        }, { status: error.response.status || 500 });
      } else if (error.request) {
        // The request was made but no response was received
        return NextResponse.json({ 
          message: 'No response received from backend service',
          status: 503
        }, { status: 503 });
      }
    }

    // Fallback error response
    return NextResponse.json({ 
      message: 'Unexpected error occurred',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Increase body parser size limit
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};