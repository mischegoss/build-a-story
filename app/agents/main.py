from google.adk.agents import SequentialAgent

# Import all 6 automation specialist agents
from .automation.process_analyst import process_analyst_agent
from .automation.roi_calculator import roi_calculator_agent
from .automation.implementation_planner import implementation_planner_agent
from .automation.risk_assessor import risk_assessor_agent
from .automation.tech_integrator import tech_integrator_agent
from .automation.business_compiler import business_compiler_agent


# Create Sequential Agent that orchestrates all 6 automation specialists
automation_sequential_agent = SequentialAgent(
    name="Sequential Agent",
    sub_agents=[
        process_analyst_agent,      # Agent 1: Maps automation opportunities
        roi_calculator_agent,       # Agent 2: Generates financial projections  
        implementation_planner_agent, # Agent 3: Creates deployment roadmaps
        risk_assessor_agent,        # Agent 4: Evaluates implementation risks
        tech_integrator_agent,      # Agent 5: Assesses technical feasibility
        business_compiler_agent     # Agent 6: Compiles final business case
    ],
    description="Sequential multi-agent automation business case analysis pipeline. Processes business automation requests through 6 specialized agents to generate comprehensive ROI analysis and implementation recommendations."
)

# Required root agent for ADK compatibility
root_agent = automation_sequential_agent
