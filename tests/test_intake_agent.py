# tests/test_intake_agent.py
# Save this in your tests/ directory

import asyncio
import json
import sys
import os

# Add the app directory to Python path (go up one level, then into app)
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'app'))

async def test_intake_agent():
    print("🤖 TESTING INTAKE AGENT")
    print("=" * 50)
    
    try:
        # Import the agent
        from agents.intake_agent import intake_agent
        print("✅ Successfully imported intake_agent")
        
        # Test prompt
        test_prompt = """
        A student has submitted a story adaptation request. Please validate this submission and prepare it for the research specialist.
        
        Student Form Data:
        {
            "book_title": "Alice's Adventures in Wonderland by Lewis Carroll",
            "setting": "Space station in the year 2150", 
            "characters": "Alice-7 is a young space explorer with her robot companion White-Bot",
            "time_period": "Far future",
            "theme": "Curiosity and discovery in unknown worlds",
            "tone": "Adventurous but wonder-filled",
            "genre": "Science fiction adventure",
            "special_elements": "Advanced technology, space travel, alien worlds"
        }
        
        Please:
        1. Validate the form for completeness and safety
        2. Check basic educational requirements  
        3. Create a project ID if validation passes
        4. Route to the research agent with proper handoff
        
        Use your tools to process this request step by step.
        """
        
        print("\n📤 Sending request to agent...")
        result = await intake_agent.generate_response(test_prompt)
        
        print("✅ Agent Response Received!")
        print(f"📝 Response: {result.content[:500]}...")
        print(f"💭 Response Length: {len(result.content)} characters")
        
        return True
        
    except ImportError as e:
        print(f"❌ Failed to import agent: {e}")
        print("🔧 Check your file structure and __init__.py files")
        return False
    except Exception as e:
        print(f"❌ Agent test failed: {e}")
        return False

if __name__ == "__main__":
    success = asyncio.run(test_intake_agent())
    if success:
        print("\n🎉 Intake agent test successful!")
    else:
        print("\n💥 Intake agent test failed - check setup")