# app/api.py - Dramatically simplified with SequentialAgent
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from .agents.story_sequential_agent import story_workflow_agent, create_story_with_workflow

app = FastAPI()

class StoryRequest(BaseModel):
    book_title: str
    setting: str = ""
    characters: str = ""
    time_period: str = ""
    theme: str = ""
    tone: str = ""
    genre: str = ""
    special_elements: str = ""

@app.post("/api/create-story")
async def create_story(request: StoryRequest):
    """
    Process story request through 6-agent sequential workflow
    
    This single endpoint now handles:
    1. Intake validation (Agent 1)
    2. Literary research (Agent 2) 
    3. Educational compliance (Agent 3)
    4. Creative writing (Agent 4)
    5. Quality assurance (Agent 5)
    6. Portfolio production (Agent 6)
    """
    try:
        # SequentialAgent automatically orchestrates all 6 agents
        result = await create_story_with_workflow(request.dict())
        
        # Extract final deliverable from last agent
        return {
            "story": result.story_starter,
            "original_title": request.book_title.split(" by ")[0],
            "original_author": request.book_title.split(" by ")[1] if " by " in request.book_title else "Unknown",
            "word_count": len(result.story_starter.split()),
            "educational_summary": result.educational_summary,
            "completion_status": result.completion_status
        }
        
    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))

@app.get("/api/workflow-status/{project_id}")
async def get_workflow_status(project_id: str):
    """
    Track which agent is currently processing the project
    (SequentialAgent provides this automatically)
    """
    # You can add workflow tracking here if needed
    pass

@app.get("/api/books")
async def get_books():
    """Keep your existing book endpoint unchanged"""
    # Your existing book loading code
    pass

@app.get("/api/story-options") 
async def get_story_options():
    """Keep your existing options endpoint unchanged"""
    # Your existing options code
    pass