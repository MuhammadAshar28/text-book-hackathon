from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import uuid
from datetime import datetime
import os
from agents import Agent, Runner, OpenAIChatCompletionsModel, AsyncOpenAI
from agents import set_tracing_disabled, function_tool
from agents import enable_verbose_stdout_logging
import cohere
from qdrant_client import QdrantClient

# Enable logging and disable tracing
enable_verbose_stdout_logging()
set_tracing_disabled(disabled=True)

# Initialize FastAPI app
app = FastAPI(title="Chatbot API", version="1.0.0")

# Add CORS middleware
frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class ChatRequest(BaseModel):
    message: str
    sessionId: Optional[str] = None

class ChatResponse(BaseModel):
    response: str
    sessionId: str
    timestamp: str

class ErrorResponse(BaseModel):
    error: str
    code: str

# Initialize Cohere client and Qdrant
cohere_client = cohere.Client(os.getenv("COHERE_API_KEY", "z6KTrRHFsu9lAs9gMO7emo5uWsJMRashq3flBGe6"))
qdrant = QdrantClient(
    url=os.getenv("QDRANT_URL", "https://d54c832e-1701-4554-a71f-fd62178d4468.europe-west3-0.gcp.cloud.qdrant.io"),
    api_key=os.getenv("QDRANT_API_KEY", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIn0.QLG2zy6BxwWzcwTXgHZ3JXoCK76LllXlf0ttzNv3710")
)

gemini_api_key = os.getenv("GEMINI_API_KEY", "AIzaSyBYKIeWeCmbYnKDOrjVRIJR35yyJsmGH4M")
provider = AsyncOpenAI(
    api_key=gemini_api_key,
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)

model = OpenAIChatCompletionsModel(
    model="gemini-2.5-flash",
    openai_client=provider
)

def get_embedding(text):
    """Get embedding vector from Cohere Embed v3"""
    response = cohere_client.embed(
        model="embed-english-v3.0",
        input_type="search_query",  # Use search_query for queries
        texts=[text],
    )
    return response.embeddings[0]  # Return the first embedding

@function_tool
def retrieve(query):
    embedding = get_embedding(query)
    result = qdrant.query_points(
        collection_name="humanoid_ai_book",
        query=embedding,
        limit=5
    )
    return [point.payload["text"] for point in result.points]

agent = Agent(
    name="Assistant",
    instructions="""
You are an AI tutor for the Physical AI & Humanoid Robotics textbook.
To answer the user question, first call the tool `retrieve` with the user query.
Use ONLY the returned content from `retrieve` to answer.
If the answer is not in the retrieved content, say "I don't know".
""",
    model=model,
    tools=[retrieve]
)

@app.post("/api/chat", response_model=ChatResponse, responses={
    400: {"model": ErrorResponse},
    500: {"model": ErrorResponse}
})
async def chat_endpoint(request: ChatRequest):
    try:
        # Generate new session ID if not provided
        session_id = request.sessionId or str(uuid.uuid4())
        
        # Get response from the agent
        result = Runner.run_sync(
            agent,
            input=request.message,
        )
        
        response_text = result.final_output if result.final_output else "I couldn't process that request."
        
        return ChatResponse(
            response=response_text,
            sessionId=session_id,
            timestamp=datetime.utcnow().isoformat()
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)