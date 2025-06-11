from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import json
import os

# Create FastAPI app
app = FastAPI(title="BUILD-A-STORY API")

# Add CORS middleware - THIS FIXES THE CORS ERROR
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Request/Response models
class StoryRequest(BaseModel):
    book_title: str
    setting: str = ""
    characters: str = ""
    time_period: str = ""
    theme: str = ""
    tone: str = ""
    genre: str = ""
    special_elements: str = ""

class StoryResponse(BaseModel):
    story: str
    original_title: str
    original_author: str
    word_count: int

# Sample data for testing
SAMPLE_BOOKS = [
    {
        "title": "Alice's Adventures in Wonderland",
        "author": "Lewis Carroll",
        "genre": "Fantasy/Adventure",
        "theme": "Curiosity and growing up",
        "era": "Victorian",
        "description": "A curious girl falls down a rabbit hole into a magical world full of talking animals and impossible things!"
    },
    {
        "title": "Treasure Island",
        "author": "Robert Louis Stevenson", 
        "genre": "Adventure/Pirates",
        "theme": "Bravery and growing up",
        "era": "Golden Age of Piracy",
        "description": "A young boy goes on an epic treasure hunt with pirates and discovers courage he didn't know he had!"
    },
    {
        "title": "The Secret Garden",
        "author": "Frances Hodgson Burnett",
        "genre": "Coming of Age/Friendship", 
        "theme": "Healing and friendship",
        "era": "Edwardian",
        "description": "A lonely girl discovers a hidden magical garden and learns the power of friendship and nature!"
    },
    {
        "title": "The Wonderful Wizard of Oz",
        "author": "L. Frank Baum",
        "genre": "Fantasy/Adventure",
        "theme": "Home and belonging", 
        "era": "Turn of Century",
        "description": "Dorothy gets swept away to a magical land and goes on an amazing journey to find her way home!"
    },
    {
        "title": "Black Beauty",
        "author": "Anna Sewell",
        "genre": "Animal Story/Friendship",
        "theme": "Kindness to others",
        "era": "Victorian",
        "description": "The story told from a horse's point of view about kindness, friendship, and treating others well!"
    }
]

STORY_OPTIONS = {
    "settings": [
        "Space Station in Year 3000",
        "Modern Mega-City", 
        "Underwater World",
        "Enchanted Forest",
        "Steampunk Victorian World"
    ],
    "time_periods": [
        "Present Day",
        "Near Future (2050s)",
        "Far Future (Year 3000+)",
        "Ancient Times",
        "Medieval Era"
    ],
    "themes": [
        "Courage and bravery",
        "Friendship and loyalty", 
        "Curiosity and exploration",
        "Kindness and empathy",
        "Growing up and responsibility"
    ],
    "tones": [
        "Adventurous and exciting",
        "Funny and lighthearted",
        "Mysterious and intriguing", 
        "Inspiring and uplifting",
        "Thoughtful and reflective"
    ]
}

# API Endpoints
@app.get("/")
async def root():
    return {"message": "BUILD-A-STORY API is running!"}

@app.get("/api/books")
async def get_books():
    """Get list of approved classic books"""
    return {"books": SAMPLE_BOOKS}

@app.get("/api/story-options") 
async def get_story_options():
    """Get dropdown options for story customization"""
    return STORY_OPTIONS

@app.post("/api/create-story")
async def create_story(request: StoryRequest):
    """Create a story starter using multi-agent system"""
    
    # TODO: Replace this with your actual ADK agent call
    # For now, return a sample story for testing
    
    book_title = request.book_title.split(" by ")[0] if " by " in request.book_title else request.book_title
    author = request.book_title.split(" by ")[1] if " by " in request.book_title else "Unknown Author"
    
    # Sample story starter - replace with actual agent generation
    sample_story = f"""**{book_title} Adventure**

The story begins in {request.setting or 'a magical place'}, where our hero {request.characters or 'embarks on an incredible journey'}. 

{f"Set in {request.time_period}, " if request.time_period else ""}this adaptation maintains the spirit of the original {book_title} while exploring themes of {request.theme or 'adventure and discovery'}.

{f"With special elements including {request.special_elements}, " if request.special_elements else ""}the adventure is just beginning...

What happens next is up to you to continue!"""

    return StoryResponse(
        story=sample_story,
        original_title=book_title,
        original_author=author,
        word_count=len(sample_story.split())
    )

@app.post("/api/regenerate-story")
async def regenerate_story(request: StoryRequest):
    """Regenerate story with same parameters"""
    # For now, just call create_story with slight variation
    result = await create_story(request)
    result.story = result.story.replace("The story begins", "In this new version, the adventure starts")
    return result

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "BUILD-A-STORY API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)