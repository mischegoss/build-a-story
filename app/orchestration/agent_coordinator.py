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

from typing import Dict, List, Any, Optional
from datetime import datetime
import json

# Import agents as they are built
from ..agents.intake_agent import intake_coordinator_agent
from ..agents.research_agent import content_research_agent
# Future imports:
# from ..agents.compliance_agent import educational_compliance_agent
# from ..agents.creative_agent import story_writer_agent
# from ..agents.qa_agent import quality_assurance_agent
# from ..agents.production_agent import portfolio_producer_agent

class AgentCoordinator:
    """
    Multi-agent workflow coordinator for BUILD-A-STORY system.
    Manages agent-to-agent communication and project state tracking.
    """
    
    def __init__(self):
        # Initialize available agents
        self.agents = {
            'intake': intake_coordinator_agent,
            'research': content_research_agent,
            # Add as agents are built:
            # 'compliance': educational_compliance_agent,
            # 'creative': story_writer_agent,
            # 'qa': quality_assurance_agent,
            # 'production': portfolio_producer_agent
        }
        
        # Track project workflow
        self.project_queue = []
        self.agent_communication_log = []
        self.active_projects = {}
        
        # Define workflow sequence
        self.workflow_sequence = [
            'intake',     # Validate form, create project brief
            'research',   # Analyze book, create adaptation guidelines
            'compliance', # Validate educational standards (coming next)
            'creative',   # Generate story content (coming next)
            'qa',         # Quality review (coming next)
            'production'  # Create final packages (coming next)
        ]
    
    async def process_student_request(self, student_form_data: Dict) -> Dict[str, Any]:
        """
        Process a complete student story request through the multi-agent workflow.
        
        Args:
            student_form_data: Raw form data from React frontend
            
        Returns:
            Final story package or error information
        """
        try:
            # Create project tracking
            project_id = f"STY-{datetime.now().strftime('%Y%m%d-%H%M%S')}"
            self.active_projects[project_id] = {
                'status': 'started',
                'current_agent': 'intake',
                'created_at': datetime.now().isoformat(),
                'student_data': student_form_data,
                'agent_results': {}
            }
            
            # Start workflow with intake agent
            current_data = {
                'project_id': project_id,
                'student_form_data': student_form_data,
                'workflow_position': 0
            }
            
            # Process through available agents
            for i, agent_name in enumerate(self.workflow_sequence):
                if agent_name not in self.agents:
                    # Agent not yet implemented, return partial result
                    return {
                        'status': 'partial_complete',
                        'project_id': project_id,
                        'completed_stages': self.workflow_sequence[:i],
                        'next_stage': agent_name,
                        'message': f'Completed through {self.workflow_sequence[i-1] if i > 0 else "start"}. Next: {agent_name}',
                        'current_data': current_data
                    }
                
                # Update project status
                self.active_projects[project_id]['current_agent'] = agent_name
                self.active_projects[project_id]['status'] = f'processing_{agent_name}'
                
                # Process with current agent
                agent_result = await self._process_with_agent(agent_name, current_data)
                
                # Log agent communication
                self._log_agent_interaction(project_id, agent_name, agent_result)
                
                # Store agent result
                self.active_projects[project_id]['agent_results'][agent_name] = agent_result
                
                # Check for errors
                if agent_result.get('status') == 'error':
                    return {
                        'status': 'error',
                        'project_id': project_id,
                        'failed_at_agent': agent_name,
                        'error_message': agent_result.get('message', 'Unknown error'),
                        'error_details': agent_result
                    }
                
                # Prepare data for next agent
                current_data = self._prepare_next_agent_data(agent_result, i + 1)
            
            # Workflow complete
            self.active_projects[project_id]['status'] = 'complete'
            self.active_projects[project_id]['completed_at'] = datetime.now().isoformat()
            
            return {
                'status': 'complete',
                'project_id': project_id,
                'final_result': current_data,
                'workflow_log': self.agent_communication_log[-len(self.workflow_sequence):],
                'processing_time': self._calculate_processing_time(project_id)
            }
            
        except Exception as e:
            return {
                'status': 'error',
                'project_id': project_id if 'project_id' in locals() else 'unknown',
                'error_message': f'Workflow error: {str(e)}',
                'error_type': 'coordinator_error'
            }
    
    async def _process_with_agent(self, agent_name: str, data: Dict) -> Dict:
        """Process data with a specific agent."""
        try:
            agent = self.agents[agent_name]
            
            # Create agent-specific prompt based on workflow position
            if agent_name == 'intake':
                prompt = self._create_intake_prompt(data)
            elif agent_name == 'research':
                prompt = self._create_research_prompt(data)
            # Add other agent prompts as they are built
            else:
                prompt = f"Process this data according to your role: {json.dumps(data, indent=2)}"
            
            # Call the agent - handle ADK async generator (using run_live which works)
            response_content = ""
            async for chunk in agent.run_live(prompt):
                if hasattr(chunk, 'content'):
                    response_content += chunk.content
                elif hasattr(chunk, 'text'):
                    response_content += chunk.text
                elif isinstance(chunk, str):
                    response_content += chunk
                else:
                    response_content += str(chunk)
            
            # Parse agent response (this would be more sophisticated in practice)
            return {
                'status': 'success',
                'agent': agent_name,
                'response': response_content,
                'timestamp': datetime.now().isoformat(),
                'data': data  # Pass through the data for next agent
            }
            
        except Exception as e:
            return {
                'status': 'error',
                'agent': agent_name,
                'message': f'Agent {agent_name} failed: {str(e)}',
                'timestamp': datetime.now().isoformat()
            }
    
    def _create_intake_prompt(self, data: Dict) -> str:
        """Create prompt for intake agent."""
        student_data = data.get('student_form_data', {})
        return f"""
        Please process this student story request:
        
        Project ID: {data.get('project_id')}
        
        Student Form Data:
        - Book Title: {student_data.get('book_title', 'Not specified')}
        - Setting: {student_data.get('setting', 'Not specified')}
        - Characters: {student_data.get('characters', 'Not specified')}
        - Time Period: {student_data.get('time_period', 'Not specified')}
        - Theme: {student_data.get('theme', 'Not specified')}
        - Tone: {student_data.get('tone', 'Not specified')}
        - Genre: {student_data.get('genre', 'Not specified')}
        - Special Elements: {student_data.get('special_elements', 'Not specified')}
        
        Please validate this request and create a project brief for the Content Research Agent.
        """
    
    def _create_research_prompt(self, data: Dict) -> str:
        """Create prompt for research agent."""
        # Extract the book title from the previous agent's work
        student_data = data.get('student_form_data', {})
        book_title = student_data.get('book_title', '')
        
        return f"""
        Please analyze this book for story adaptation:
        
        Project ID: {data.get('project_id')}
        
        Book to Analyze: {book_title}
        
        Student's Requested Modifications:
        - Setting: {student_data.get('setting', 'Keep original')}
        - Characters: {student_data.get('characters', 'Keep original')}
        - Time Period: {student_data.get('time_period', 'Keep original')}
        - Theme: {student_data.get('theme', 'Keep original')}
        - Tone: {student_data.get('tone', 'Keep original')}
        - Special Elements: {student_data.get('special_elements', 'None')}
        
        Please:
        1. Retrieve the book details using get_book_details
        2. Analyze story elements and compatibility using analyze_story_elements  
        3. Assess adaptation flexibility using assess_adaptation_flexibility
        4. Create adaptation guidelines using create_adaptation_guidelines
        5. Prepare handoff for compliance agent using prepare_compliance_handoff
        
        Return the complete analysis and guidelines for educational compliance review.
        """
    
    def _prepare_next_agent_data(self, agent_result: Dict, next_position: int) -> Dict:
        """Prepare data for the next agent in the workflow."""
        return {
            'project_id': agent_result.get('data', {}).get('project_id'),
            'previous_agent_result': agent_result,
            'workflow_position': next_position,
            'student_form_data': agent_result.get('data', {}).get('student_form_data', {}),
            'accumulated_data': agent_result  # Pass through all previous results
        }
    
    def _log_agent_interaction(self, project_id: str, agent_name: str, result: Dict):
        """Log agent interactions for transparency and debugging."""
        log_entry = {
            'project_id': project_id,
            'timestamp': datetime.now().isoformat(),
            'agent': agent_name,
            'status': result.get('status'),
            'handoff_summary': self._create_handoff_summary(agent_name, result),
            'next_agent': self._get_next_agent(agent_name),
            'data_keys': list(result.keys())
        }
        
        self.agent_communication_log.append(log_entry)
    
    def _create_handoff_summary(self, agent_name: str, result: Dict) -> str:
        """Create human-readable summary of agent handoff."""
        if result.get('status') == 'error':
            return f"{agent_name} encountered an error: {result.get('message', 'Unknown error')}"
        
        if agent_name == 'intake':
            return "Project validated and brief created for research agent"
        elif agent_name == 'research':
            return "Literary analysis complete, adaptation guidelines ready for compliance review"
        # Add other agents as they are built
        else:
            return f"{agent_name} processing complete"
    
    def _get_next_agent(self, current_agent: str) -> Optional[str]:
        """Get the next agent in the workflow sequence."""
        try:
            current_index = self.workflow_sequence.index(current_agent)
            if current_index + 1 < len(self.workflow_sequence):
                return self.workflow_sequence[current_index + 1]
        except ValueError:
            pass
        return None
    
    def _calculate_processing_time(self, project_id: str) -> float:
        """Calculate total processing time for a project."""
        project = self.active_projects.get(project_id, {})
        start_time = project.get('created_at')
        end_time = project.get('completed_at')
        
        if start_time and end_time:
            start_dt = datetime.fromisoformat(start_time)
            end_dt = datetime.fromisoformat(end_time)
            return (end_dt - start_dt).total_seconds()
        
        return 0.0
    
    def get_project_status(self, project_id: str) -> Dict:
        """Get current status of a project."""
        return self.active_projects.get(project_id, {'status': 'not_found'})
    
    def get_agent_communication_log(self, project_id: Optional[str] = None) -> List[Dict]:
        """Get agent communication log, optionally filtered by project."""
        if project_id:
            return [log for log in self.agent_communication_log if log.get('project_id') == project_id]
        return self.agent_communication_log.copy()
    
    def get_workflow_status(self) -> Dict:
        """Get overall workflow system status."""
        return {
            'available_agents': list(self.agents.keys()),
            'workflow_sequence': self.workflow_sequence,
            'active_projects': len(self.active_projects),
            'total_communications': len(self.agent_communication_log),
            'system_status': 'operational'
        }
    
        