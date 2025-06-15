# app/main.py (Updated with correct paths)
from google.adk.agents import SequentialAgent

# Import all agents from the automation subdirectory
from app.agents.automation.process_analyst import process_analyst_agent
from app.agents.automation.roi_calculator import roi_calculator_agent
from app.agents.automation.implementation_planner import implementation_planner_agent
from app.agents.automation.risk_assessor import risk_assessor_agent
from app.agents.automation.tech_integrator import tech_integrator_agent
from app.agents.automation.business_compiler import business_compiler_agent

# Create multi-agent pipeline
automation_sequential_agent = SequentialAgent(
    name="AutomationAnalysisPipeline",
    sub_agents=[
        process_analyst_agent,
        roi_calculator_agent,
        implementation_planner_agent,
        risk_assessor_agent,
        tech_integrator_agent,
        business_compiler_agent
    ],
    description="Comprehensive automation business case generation with multi-agent analysis"
)

# Required root agent for ADK
root_agent = automation_sequential_agent