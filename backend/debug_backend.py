import os
import asyncio
from agents import Agent, Runner, OpenAIChatCompletionsModel, AsyncOpenAI, function_tool
import cohere
from qdrant_client import QdrantClient

# Enable logging
import logging
logging.basicConfig(level=logging.DEBUG)

# Initialize Cohere client and Qdrant
try:
    print("Initializing Cohere...")
    cohere_client = cohere.Client(os.getenv("COHERE_API_KEY", "z6KTrRHFsu9lAs9gMO7emo5uWsJMRashq3flBGe6"))
    print("Cohere initialized.")
except Exception as e:
    print(f"Cohere initialization failed: {e}")

try:
    print("Initializing Qdrant...")
    qdrant = QdrantClient(
        url=os.getenv("QDRANT_URL", "https://d54c832e-1701-4554-a71f-fd62178d4468.europe-west3-0.gcp.cloud.qdrant.io"),
        api_key=os.getenv("QDRANT_API_KEY", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIn0.QLG2zy6BxwWzcwTXgHZ3JXoCK76LllXlf0ttzNv3710")
    )
    print("Qdrant initialized.")
except Exception as e:
    print(f"Qdrant initialization failed: {e}")

gemini_api_key = os.getenv("GEMINI_API_KEY", "AIzaSyBYKIeWeCmbYnKDOrjVRIJR35yyJsmGH4M")
provider = AsyncOpenAI(
    api_key=gemini_api_key,
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)

model = OpenAIChatCompletionsModel(
    model="gemini-2.0-flash", # Changed from 2.5 to 2.0 as 2.5 might not exist or be public yet
    openai_client=provider
)

def get_embedding(text):
    """Get embedding vector from Cohere Embed v3"""
    try:
        response = cohere_client.embed(
            model="embed-english-v3.0",
            input_type="search_query",  # Use search_query for queries
            texts=[text],
        )
        return response.embeddings[0]  # Return the first embedding
    except Exception as e:
        print(f"Embedding failed: {e}")
        raise e

@function_tool
def retrieve(query: str):
    print(f"Retrieving for query: {query}")
    try:
        embedding = get_embedding(query)
        result = qdrant.query_points(
            collection_name="humanoid_ai_book",
            query=embedding,
            limit=5
        )
        return [point.payload["text"] for point in result.points]
    except Exception as e:
        print(f"Retrieval failed: {e}")
        raise e

agent = Agent(
    name="Assistant",
    instructions="You are an AI tutor.",
    model=model,
    tools=[retrieve]
)

async def main():
    print("Running agent...")
    try:
        result = await Runner.run(
            agent,
            input="hi",
        )
        print("Result:", result.final_output)
    except Exception as e:
        print(f"Agent execution failed: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(main())
