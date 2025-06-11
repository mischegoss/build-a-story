
import datetime
import os
from zoneinfo import ZoneInfo

import google.auth
from google.adk.agents import Agent

from ..tools.intake_tools import (
    validate_student_form,
    create_project_id,
    route_to_research_agent,
    check_basic_educational_requirements
)
from ..prompts.intake_prompt import intake_instruction

# Configure Google Cloud settings (same as your original agent.py)
_, project_id = google.auth.default()
os.environ.setdefault("GOOGLE_CLOUD_PROJECT", project_id)
os.environ.setdefault("GOOGLE_CLOUD_LOCATION", "global")
os.environ.setdefault("GOOGLE_GENAI_USE_VERTEXAI", "True")


intake_agent = Agent(
    name="intake_coordinator",
    model="gemini-2.0-flash",
    instruction=intake_instruction,
    tools=[
        validate_student_form,
        create_project_id,
        route_to_research_agent,
        check_basic_educational_requirements
    ],
)