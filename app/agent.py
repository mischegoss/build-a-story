# app/agent.py - Make sure this exports root_agent for ADK
from .main import automation_sequential_agent

# ADK requires an agent named 'root_agent'
root_agent = automation_sequential_agent