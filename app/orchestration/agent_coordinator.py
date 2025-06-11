# app/orchestration/agent_coordinator.py
"""
Demo of how the Intake Agent integrates with your existing React interface
"""

import json
import asyncio
from typing import Dict, Any

from ..agents.intake_agent import intake_agent

class AgentCoordinator:
    """Coordinates the multi-agent workflow for story creation."""
    
    def __init__(self):
        self.agents = {
            'intake': intake_agent,
            # Other agents will be added here as we build them
            # 'research': research_agent,
            # 'compliance': compliance_agent,
            # etc...
        }
        self.workflow_log = []
    
    async def process_student_request(self, student_form_data: Dict) -> Dict:
        """
        Process a student story request through the multi-agent workflow.
        
        This replaces your current single-agent processing in api.py
        """
        
        # Step 1: Route to Intake Agent for validation
        try:
            # Convert form data to format expected by intake agent
            form_json = json.dumps(student_form_data)
            
            # Create intake prompt for the agent
            intake_prompt = f"""
            A student has submitted a story adaptation request. Please validate this submission and prepare it for the research specialist.
            
            Student Form Data:
            {form_json}
            
            Please:
            1. Validate the form for completeness and safety
            2. Check basic educational requirements
            3. Create a project ID if validation passes
            4. Route to the research agent with proper handoff
            
            Use your tools to process this request step by step.
            """
            
            # Process with intake agent
            intake_result = await intake_agent.generate_response(intake_prompt)
            
            # Log the agent workflow step
            self.workflow_log.append({
                'agent': 'intake_coordinator',
                'status': 'completed',
                'timestamp': intake_result.timestamp if hasattr(intake_result, 'timestamp') else None,
                'message': 'Form validation and project creation completed'
            })
            
            # Extract project information from agent response
            # In a real implementation, this would parse the agent's tool results
            project_info = {
                'status': 'intake_complete',
                'next_agent': 'research_specialist',
                'workflow_stage': 1,
                'total_stages': 6,
                'message': 'Project validated and ready for literary analysis'
            }
            
            return {
                'success': True,
                'project_info': project_info,
                'agent_response': intake_result.content,
                'workflow_log': self.workflow_log,
                'next_step': 'Research Agent will analyze the selected book for adaptation potential'
            }
            
        except Exception as e:
            return {
                'success': False,
                'error': f'Intake validation failed: {str(e)}',
                'workflow_log': self.workflow_log
            }

# Modified API endpoint to use multi-agent system
# This goes in your app/api.py file

"""
# app/api.py (modified)
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from .orchestration.agent_coordinator import AgentCoordinator

class StoryRequest(BaseModel):
    book_title: str
    setting: str = ""
    characters: str = ""
    time_period: str = ""
    theme: str = ""
    tone: str = ""
    genre: str = ""
    special_elements: str = ""

app = FastAPI()

@app.post("/api/create-story")
async def create_story_multi_agent(request: StoryRequest):
    '''
    NEW: Multi-agent story creation workflow
    This replaces your single-agent approach
    '''
    
    # Initialize the agent coordinator
    coordinator = AgentCoordinator()
    
    # Process through multi-agent workflow
    result = await coordinator.process_student_request(request.dict())
    
    if result['success']:
        return {
            "status": "intake_complete",
            "project_info": result['project_info'],
            "agent_workflow": result['workflow_log'],
            "next_step": result['next_step'],
            "message": "Your project has been validated and is being processed by our expert AI team!"
        }
    else:
        raise HTTPException(status_code=400, detail=result['error'])

@app.get("/api/workflow-status/{project_id}")
async def get_workflow_status(project_id: str):
    '''
    NEW: Real-time workflow status for demo
    Shows which agent is currently working on the project
    '''
    
    # This would query your project tracking system
    return {
        "project_id": project_id,
        "current_agent": "research_specialist",
        "stage": "2 of 6",
        "status": "analyzing_literary_elements",
        "estimated_completion": "3 minutes",
        "completed_agents": ["intake_coordinator"],
        "pending_agents": ["compliance_validator", "creative_writer", "qa_reviewer", "portfolio_producer"]
    }
"""

# Test/Demo Function
async def demo_intake_agent():
    """
    Demo function showing how the intake agent processes a student request.
    """
    
    # Sample student form data (like from your React interface)
    sample_request = {
        "book_title": "Alice's Adventures in Wonderland by Lewis Carroll",
        "setting": "Space station in the year 2150",
        "characters": "Alice-7 is a young space explorer with her robot companion White-Bot",
        "time_period": "Far future",
        "theme": "Curiosity and discovery in unknown worlds",
        "tone": "Adventurous but wonder-filled",
        "genre": "Science fiction adventure",
        "special_elements": "Advanced technology, space travel, alien worlds"
    }
    
    # Process through agent coordinator
    coordinator = AgentCoordinator()
    result = await coordinator.process_student_request(sample_request)
    
    print("🤖 MULTI-AGENT WORKFLOW DEMO")
    print("=" * 50)
    print(f"Success: {result['success']}")
    if result['success']:
        print(f"Agent Response: {result['agent_response']}")
        print(f"Next Step: {result['next_step']}")
        print("\n📊 Workflow Log:")
        for log_entry in result['workflow_log']:
            print(f"  ✅ {log_entry['agent']}: {log_entry['message']}")
    else:
        print(f"Error: {result['error']}")

# Run the demo
if __name__ == "__main__":
    asyncio.run(demo_intake_agent())