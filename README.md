# Chatbot Integration - Running Instructions

This project consists of two parts:
1. Frontend: A Docusaurus documentation site with an integrated chatbot widget
2. Backend: A FastAPI server that handles chatbot logic

## Prerequisites

- Node.js 18+ for the frontend
- Python 3.8+ for the backend
- API keys for Cohere, Qdrant, and Gemini (already configured in .env files)

## Running the Backend

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install fastapi uvicorn python-dotenv agents-sdk cohere qdrant-client
```

4. Run the backend server:
```bash
uvicorn chat_api:app --reload --port 8000
```

The backend API will be available at `http://localhost:8000`.

## Running the Frontend

1. Navigate to the Docusaurus directory:
```bash
cd physical-ai-robotics-docs
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run start
# or
yarn start
```

The frontend will be available at `http://localhost:3000`.

## Development Workflow

1. Start the backend server first
2. Then start the frontend server
3. The chat widget will be available on all pages of the documentation site

## Production Deployment

### Backend Deployment
The backend can be deployed to any platform that supports Python applications:
- Google Cloud Run
- AWS Lambda
- Railway
- Heroku
- Or any VPS

Make sure to update the `FRONTEND_URL` environment variable to match your production domain.

### Frontend Deployment
The Docusaurus site can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- Or any static hosting service

The Docusaurus site is already configured for deployment (as seen in the original sitemap URL).

## Environment Configuration

### Backend (.env file)
```
COHERE_API_KEY=your_cohere_api_key
QDRANT_API_KEY=your_qdrant_api_key
GEMINI_API_KEY=your_gemini_api_key
QDRANT_URL=your_qdrant_url
FRONTEND_URL=your_frontend_url
```

### Frontend (.env file)
```
REACT_APP_CHATBOT_API_URL=your_backend_api_url
```

## Troubleshooting

1. **CORS Issues**: Ensure the `FRONTEND_URL` in the backend .env matches the URL where your frontend is hosted.

2. **API Connection Issues**: 
   - Check that the backend server is running
   - Verify that the `REACT_APP_CHATBOT_API_URL` in the frontend .env is correct
   - Ensure ports 8000 (backend) and 3000 (frontend) are available

3. **Chat Widget Not Appearing**: 
   - Check that Root.js correctly imports and renders the ChatWidget component
   - Verify there are no JavaScript errors in the browser console