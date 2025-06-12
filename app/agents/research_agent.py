# Copyright 2025 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# Import both the ADK agent (for future use) and working agent (for current use)
try:
    from google.adk.agents import Agent
    from ..prompts.research_prompt import research_agent_instruction
    from ..tools.research_tools import (
        get_book_details,
        analyze_story_elements, 
        assess_adaptation_flexibility,
        create_adaptation_guidelines,
        prepare_compliance_handoff
    )

    # Create the ADK Agent (has context issues currently)
    adk_research_agent = Agent(
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
    
except Exception as e:
    print(f"⚠️ ADK Agent creation failed: {e}")
    adk_research_agent = None

# Import the working agent
from .working_research_agent import working_research_agent

# Export the working agent as the main one
content_research_agent = working_research_agent

# Also keep the ADK agent available for future debugging
adk_agent = adk_research_agent
