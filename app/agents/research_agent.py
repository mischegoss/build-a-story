
from google.adk.agents import Agent

from ..prompts.research_prompt import research_agent_instruction
from ..tools.research_tools import (
    get_book_details,
    analyze_story_elements, 
    assess_adaptation_flexibility,
    create_adaptation_guidelines,
    prepare_compliance_handoff
)

# Create the Content Research Agent
content_research_agent = Agent(
    model="gemini-2.0-flash",
    name="content_researcher",
    instruction=research_agent_instruction,
    tools=[
        get_book_details,
        analyze_story_elements,
        assess_adaptation_flexibility, 
        create_adaptation_guidelines,
        prepare_compliance_handoff
    ]
)