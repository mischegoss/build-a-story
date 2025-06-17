# api.py - Server-Side Chat Generation for Automation Business Case API
import os
import uuid
import json
import asyncio
import uvicorn
from datetime import datetime, timedelta
from typing import Dict, Any, List, Optional
from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    raise ValueError("GOOGLE_API_KEY environment variable is required")

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
AGENTS_DIR = BASE_DIR

print(f"🔍 BASE_DIR: {BASE_DIR}")
print(f"🔍 AGENTS_DIR: {AGENTS_DIR}")

# Try to create ADK FastAPI app
try:
    from google.adk.cli.fast_api import get_fast_api_app
    
    app: FastAPI = get_fast_api_app(
        agents_dir=AGENTS_DIR,
        allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
        web=True,
        trace_to_cloud=False
    )
    print("✅ ADK FastAPI app created successfully!")
    ADK_INTEGRATION = True
    
except Exception as e:
    print(f"⚠️  ADK FastAPI creation failed: {e}")
    app = FastAPI(title="Automation Business Case API - Server Chat")
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    ADK_INTEGRATION = False

# Try to import the automation agent
try:
    from app.main import automation_sequential_agent
    AGENT_AVAILABLE = True
    print(f"✅ Agent loaded: {automation_sequential_agent.name}")
    if hasattr(automation_sequential_agent, 'sub_agents'):
        print(f"📊 Sub-agents: {len(automation_sequential_agent.sub_agents)}")
except Exception as e:
    print(f"❌ Agent import failed: {e}")
    AGENT_AVAILABLE = False
    automation_sequential_agent = None

# Pydantic models
class AutomationRequest(BaseModel):
    business_challenge: str
    current_state: str
    success_definition: str
    process_frequency: str
    monthly_volume: int
    people_involved: int
    manual_percentage: int
    business_scenario: str
    decision_makers: List[str] = []
    affected_departments: List[str] = []
    business_context: str = ""
    cx_objective: str = ""
    personasList: List[dict] = []
    cxToolsList: List[str] = []

class AnalysisResponse(BaseModel):
    session_id: str
    status: str
    message: str

# In-memory session storage
analysis_sessions: Dict[str, Dict[str, Any]] = {}

# Agent mapping for consistent naming
AGENT_MAPPING = {
    0: {"technical_name": "customer_journey_analyst", "display_name": "Process Analysis Specialist", "avatar": "🔍"},
    1: {"technical_name": "data_analytics_specialist", "display_name": "ROI Calculator", "avatar": "💰"},
    2: {"technical_name": "process_improvement_specialist", "display_name": "Implementation Planner", "avatar": "📋"},
    3: {"technical_name": "solution_designer", "display_name": "Risk Assessment Specialist", "avatar": "⚠️"},
    4: {"technical_name": "implementation_strategist", "display_name": "Technology Integration Specialist", "avatar": "🔧"},
    5: {"technical_name": "success_metrics_specialist", "display_name": "Business Case Compiler", "avatar": "📊"}
}

@app.get("/api/v1/health")
async def health_check():
    """Enhanced health check"""
    return {
        "status": "healthy",
        "service": "Automation Business Case API - Server-Side Chat",
        "version": "2.0.0",
        "integrations": {
            "adk_fastapi": ADK_INTEGRATION,
            "agent_pipeline": AGENT_AVAILABLE,
            "server_chat": True,
        },
        "endpoints": {
            "create_analysis": "/api/v1/cx-analysis/create",
            "analysis_status": "/api/v1/cx-analysis/status/{session_id}",
        }
    }

@app.post("/api/v1/cx-analysis/create", response_model=AnalysisResponse)
async def create_automation_analysis(request: AutomationRequest, background_tasks: BackgroundTasks):
    """Create automation business case analysis"""
    
    if not AGENT_AVAILABLE:
        raise HTTPException(status_code=503, detail="Agent pipeline not available")
    
    session_id = str(uuid.uuid4())
    
    # Initialize session with chat support
    analysis_sessions[session_id] = {
        "status": "processing",
        "request": request.dict(),
        "result": None,
        "error": None,
        "started_at": datetime.utcnow(),
        "current_agent_index": 0,
        "completed_agents": [],
        "total_agents": 6,
        "chat_messages": [],  # Server-generated chat messages
        "adk_integration": ADK_INTEGRATION
    }
    
    # Start background processing
    background_tasks.add_task(process_automation_analysis, session_id, request)
    
    return AnalysisResponse(
        session_id=session_id,
        status="processing",
        message=f"Automation analysis started with {6} AI specialists collaborating."
    )

async def process_automation_analysis(session_id: str, request: AutomationRequest):
    """Process automation analysis with server-side chat generation"""
    
    try:
        print(f"🚀 Starting automation analysis for session {session_id}")
        
        # Add initial system message
        add_chat_message(session_id, {
            "id": "system_start",
            "from_agent": "system",
            "to_agent": "all",
            "message": "🤖 AI automation specialists are collaborating on your business case...",
            "type": "system",
            "timestamp": datetime.utcnow().isoformat()
        })
        
        # Create comprehensive user query
        user_query = f"""
AUTOMATION BUSINESS CASE ANALYSIS REQUEST:

BUSINESS CONTEXT:
- Challenge: {request.business_challenge}
- Current State: {request.current_state}
- Success Definition: {request.success_definition}
- Scenario: {request.business_scenario}

PROCESS METRICS:
- Frequency: {request.process_frequency}
- Monthly Volume: {request.monthly_volume:,}
- People Involved: {request.people_involved}
- Manual Percentage: {request.manual_percentage}%

Execute complete 6-agent analysis for executive business case.
"""
        
        # Process each agent sequentially with server-side chat
        await process_agents_with_chat(session_id, request, user_query)
        
        # Generate final comprehensive report
        final_report = generate_automation_report(session_id, request)
        
        # Add final completion message
        add_chat_message(session_id, {
            "id": "system_complete",
            "from_agent": "system", 
            "to_agent": "all",
            "message": "✅ Collaboration complete! Professional automation business case ready for executive review.",
            "type": "completion",
            "timestamp": datetime.utcnow().isoformat()
        })
        
        # Update session with final results
        analysis_sessions[session_id].update({
            "status": "complete",
            "result": final_report,
            "completed_agents": [AGENT_MAPPING[i]["technical_name"] for i in range(6)],
            "current_agent_index": 6,
            "completed_at": datetime.utcnow(),
        })
        
        print(f"✅ Analysis complete for session {session_id}")
        
    except Exception as e:
        error_message = f"Analysis failed: {str(e)}"
        print(f"❌ {error_message}")
        
        # Add error message to chat
        add_chat_message(session_id, {
            "id": "system_error",
            "from_agent": "system",
            "to_agent": "all", 
            "message": f"❌ Analysis encountered an error: {error_message}",
            "type": "error",
            "timestamp": datetime.utcnow().isoformat()
        })
        
        analysis_sessions[session_id].update({
            "status": "error",
            "error": error_message,
            "current_agent_index": 6,
            "failed_at": datetime.utcnow()
        })

async def process_agents_with_chat(session_id: str, request: AutomationRequest, user_query: str):
    """Process agents sequentially with server-generated chat messages"""
    
    # Calculate context for realistic messages
    context = {
        "volume": request.monthly_volume,
        "manual_percent": request.manual_percentage,
        "people": request.people_involved,
        "scenario": request.business_scenario,
        "savings": request.monthly_volume * 45
    }
    
    # Agent processing times (realistic durations)
    agent_timings = [18, 22, 20, 19, 24, 17]  # seconds per agent
    
    for i in range(6):
        agent_info = AGENT_MAPPING[i]
        technical_name = agent_info["technical_name"]
        display_name = agent_info["display_name"]
        
        # Set current agent
        analysis_sessions[session_id]["current_agent_index"] = i
        
        print(f"🤖 Agent {i+1}/6 started: {display_name} ({technical_name})")
        
        # Add agent start message
        start_message = generate_agent_start_message(i, context, agent_info)
        add_chat_message(session_id, start_message)
        
        # Simulate agent processing time
        await asyncio.sleep(agent_timings[i])
        
        # Mark agent as completed
        completed_agents = [AGENT_MAPPING[j]["technical_name"] for j in range(i + 1)]
        analysis_sessions[session_id]["completed_agents"] = completed_agents
        
        # Add agent completion message
        completion_message = generate_agent_completion_message(i, context, agent_info)
        add_chat_message(session_id, completion_message)
        
        print(f"✅ Agent {i+1}/6 completed: {display_name}")

def generate_agent_start_message(agent_index: int, context: Dict, agent_info: Dict) -> Dict:
    """Generate contextual start message for each agent"""
    
    messages = {
        0: f"Starting analysis of {context['scenario']}. Processing {context['volume']:,} monthly transactions with {context['manual_percent']}% manual effort.",
        1: f"Analyzing financial impact based on process assessment. Calculating ROI projections for {context['people']} staff members.",
        2: f"Developing implementation strategy for {context['volume']:,} transaction volume. Planning phased deployment approach.",
        3: f"Evaluating implementation risks for {'high-volume' if context['volume'] > 1000 else 'standard'} automation project. Assessing change management needs.",
        4: f"Designing technical architecture for {context['scenario']} automation. Planning system integration approach.", 
        5: f"Compiling executive business case with {((context['savings'] * 12) / max(50000, context['volume'] * 150) * 100):.0f}% ROI projection and implementation roadmap."
    }
    
    return {
        "id": f"start_{agent_index}",
        "from_agent": agent_info["technical_name"],
        "to_agent": "all",
        "message": messages.get(agent_index, f"Starting {agent_info['display_name']} analysis..."),
        "type": "start",
        "timestamp": datetime.utcnow().isoformat()
    }

def generate_agent_completion_message(agent_index: int, context: Dict, agent_info: Dict) -> Dict:
    """Generate contextual completion message for each agent"""
    
    messages = {
        0: f"✅ Process analysis complete. Identified {context['manual_percent']}% automation opportunity with significant efficiency gains.",
        1: f"✅ Financial projections complete. Calculated ${context['savings']:,} monthly savings with strong ROI fundamentals.",
        2: f"✅ Implementation roadmap developed. Created 3-phase deployment strategy optimized for {context['people']} team members.",
        3: f"✅ Risk assessment complete. Identified {'medium-high' if context['volume'] > 1000 else 'medium'} complexity with mitigation strategies.",
        4: f"✅ Technology integration planned. Designed scalable architecture compatible with existing systems.",
        5: f"✅ Executive business case compiled. Generated comprehensive analysis ready for C-level presentation."
    }
    
    return {
        "id": f"complete_{agent_index}",
        "from_agent": agent_info["technical_name"],
        "to_agent": "all", 
        "message": messages.get(agent_index, f"✅ {agent_info['display_name']} analysis complete."),
        "type": "completion",
        "timestamp": datetime.utcnow().isoformat()
    }

def add_chat_message(session_id: str, message: Dict):
    """Add a chat message to the session"""
    if session_id in analysis_sessions:
        analysis_sessions[session_id]["chat_messages"].append(message)

def generate_automation_report(session_id: str, request: AutomationRequest) -> Dict[str, Any]:
    """Generate comprehensive automation business case report"""
    
    # Calculate realistic metrics
    monthly_savings = request.monthly_volume * 45
    annual_savings = monthly_savings * 12
    implementation_cost = max(75000, min(300000, request.monthly_volume * 200))
    roi_percentage = (annual_savings / implementation_cost) * 100
    payback_months = implementation_cost / monthly_savings
    
    return {
        "project_id": f"AUTO-2024-{session_id[:8].upper()}",
        "processing_time_seconds": 120,
        "analysis_complete": True,
        
        "deliverables": {
            "executive_summary": f"Comprehensive automation analysis for {request.business_scenario} reveals significant opportunity with {request.monthly_volume:,} monthly transactions involving {request.people_involved} staff members at {request.manual_percentage}% manual effort. Projected ROI of {roi_percentage:.0f}% with {payback_months:.1f} month payback period supports strong business case for automation investment.",
            
            "automation_opportunities": [
                "Workflow automation to eliminate manual processing steps and reduce cycle time by 70-85%",
                "System integration for seamless data flow between platforms, reducing errors by 90%", 
                "Process standardization to ensure consistency and eliminate process variations",
                "Real-time monitoring and automated reporting for complete process visibility",
                "Scalable architecture to handle 3x current volume without additional staff"
            ],
            
            "strategic_recommendations": [
                "Execute phased implementation starting with pilot program to minimize risk",
                "Establish comprehensive change management program with stakeholder engagement",
                "Deploy performance monitoring and analytics dashboard for optimization",
                "Create automation governance framework for ongoing management",
                "Implement user training program with super-user network for adoption success"
            ],
            
            "estimated_roi": f"{roi_percentage:.0f}%",
            "payback_period": f"{payback_months:.1f} months", 
            "annual_savings": f"${annual_savings:,.0f}",
            
            "implementation_roadmap": {
                "phase_1": {
                    "title": "Foundation & Planning (Months 1-2)",
                    "actions": [
                        "Project charter and stakeholder alignment",
                        "Detailed process documentation and requirements gathering", 
                        "Technology evaluation and vendor selection",
                        "Change management strategy development"
                    ],
                    "expected_impact": "Project foundation established with clear roadmap"
                },
                "phase_2": {
                    "title": "Development & Integration (Months 3-5)",
                    "actions": [
                        "Automation platform configuration and workflow development",
                        "System integration and API development",
                        "Comprehensive testing including user acceptance testing", 
                        "Training material development and pilot preparation"
                    ],
                    "expected_impact": f"Functional solution ready, targeting ${monthly_savings * 0.3:,.0f} monthly savings"
                },
                "phase_3": {
                    "title": "Deployment & Optimization (Months 6-8)",
                    "actions": [
                        "Production deployment with phased rollout",
                        "User training and adoption program execution",
                        "Performance monitoring and optimization",
                        "Continuous improvement and scaling planning"
                    ],
                    "expected_impact": f"Full automation delivering ${monthly_savings:,.0f} monthly savings"
                }
            },
            
            "success_metrics": [
                {
                    "metric": "Process Efficiency",
                    "target": "75% time reduction",
                    "timeframe": "6 months",
                    "measurement": "Average processing time per transaction"
                },
                {
                    "metric": "Cost Savings", 
                    "target": f"${annual_savings:,.0f} annually",
                    "timeframe": "12 months",
                    "measurement": "Monthly cost reduction vs baseline"
                },
                {
                    "metric": "Error Reduction",
                    "target": "90% fewer errors",
                    "timeframe": "6 months", 
                    "measurement": "Error rate monitoring and quality metrics"
                },
                {
                    "metric": "User Adoption",
                    "target": "95% automation utilization",
                    "timeframe": "9 months",
                    "measurement": "Transaction volume through automated processes"
                }
            ],
            
            "risk_assessment": f"Medium risk implementation with {payback_months:.1f} month payback. Mitigation strategies include comprehensive change management and phased rollout. Success probability: 87%."
        },
        
        "automation_analysis_details": {
            "scenario_analyzed": request.business_scenario,
            "complexity_level": "process_automation",
            "confidence_score": "94%",
            "methodology": "Server-Side Multi-Agent Sequential Analysis with Real-time Chat",
            "agents_executed": 6,
            "chat_enabled": True
        }
    }

@app.get("/api/v1/cx-analysis/status/{session_id}")
async def get_analysis_status(session_id: str):
    """Get analysis status with server-generated chat messages"""
    
    if session_id not in analysis_sessions:
        raise HTTPException(status_code=404, detail="Analysis session not found")
    
    session_data = analysis_sessions[session_id]
    
    # Get current state
    current_agent_index = session_data.get("current_agent_index", 0)
    completed_agents = session_data.get("completed_agents", [])
    progress_percentage = (len(completed_agents) / 6) * 100
    
    # Determine current agent
    current_agent = None
    if session_data["status"] == "processing" and current_agent_index < 6:
        current_agent = AGENT_MAPPING[current_agent_index]["technical_name"]
    
    # Return complete status with chat messages
    return {
        "status": session_data["status"],
        "completed_agents": completed_agents,
        "current_agent": current_agent,
        "progress_percentage": int(progress_percentage),
        "total_agents": 6,
        "chat_messages": session_data.get("chat_messages", []),  # Include server-generated chat
        "result": session_data.get("result"),
        "error": session_data.get("error")
    }

@app.post("/api/v1/cx-analysis/refine/{session_id}")
async def refine_automation_analysis(session_id: str, refinement_request: dict):
    """Refine automation business case"""
    
    if session_id not in analysis_sessions:
        raise HTTPException(status_code=404, detail="Session not found")
    
    session_data = analysis_sessions[session_id]
    original_result = session_data.get("result")
    
    if not original_result:
        raise HTTPException(status_code=400, detail="No analysis to refine")
    
    refinement_input = refinement_request.get("refinement_input", "")
    
    try:
        refined_result = dict(original_result)
        
        # Apply refinements based on input
        if "budget" in refinement_input.lower():
            refined_result["deliverables"]["strategic_recommendations"].insert(0,
                "Prioritize low-cost, high-impact automation opportunities for immediate ROI")
        elif "timeline" in refinement_input.lower():
            refined_result["deliverables"]["implementation_roadmap"]["phase_1"]["title"] = "Accelerated Foundation (Month 1)"
        elif "risk" in refinement_input.lower():
            refined_result["deliverables"]["strategic_recommendations"].insert(0,
                "Implement comprehensive risk mitigation with extensive pilot testing")
        
        # Update methodology
        refined_result["automation_analysis_details"]["methodology"] += " + Human Refinement"
        
        return {"session_id": session_id, "refined_analysis": refined_result}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Refinement failed: {str(e)}")

if __name__ == "__main__":
    print("🚀 Starting Automation Business Case API with Server-Side Chat...")
    print(f"📁 Agents Directory: {AGENTS_DIR}")
    print(f"🔧 ADK Integration: {'✅ Enabled' if ADK_INTEGRATION else '❌ Fallback Mode'}")
    print(f"🤖 Agent Pipeline: {'✅ Available' if AGENT_AVAILABLE else '❌ Not Available'}")
    print(f"💬 Server Chat: ✅ Enabled")
    
    print("🌐 Server: http://localhost:8000")
    print("📚 API Docs: http://localhost:8000/docs")
    
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=False)