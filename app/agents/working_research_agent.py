# app/agents/working_research_agent.py
"""
Working Research Agent - Bypasses ADK complexity issues
Uses your research tools directly with simple prompt processing
"""

import asyncio
from typing import Dict, Any
from ..tools.research_tools import (
    get_book_details,
    analyze_story_elements,
    assess_adaptation_flexibility,
    create_adaptation_guidelines,
    prepare_compliance_handoff
)

class WorkingResearchAgent:
    """Simple research agent that calls tools directly with smart prompt processing"""
    
    def __init__(self):
        self.name = "content_researcher"
        self.model = "gemini-2.0-flash"
        self.instruction = "Literary Research Specialist for educational story adaptations"
        
    async def run_live(self, prompt: str):
        """Process a research request and yield response chunks"""
        try:
            # Process the prompt and generate response
            response = await self._process_research_request(prompt)
            
            # Yield response as chunks (simulating ADK streaming)
            class ResponseChunk:
                def __init__(self, content):
                    self.content = content
            
            # Split response into chunks for streaming effect
            chunk_size = 200
            for i in range(0, len(response), chunk_size):
                chunk_content = response[i:i + chunk_size]
                yield ResponseChunk(chunk_content)
                await asyncio.sleep(0.01)  # Small delay to simulate streaming
                
        except Exception as e:
            error_response = f"Error in research analysis: {str(e)}"
            yield ResponseChunk(error_response)
    
    async def _process_research_request(self, prompt: str) -> str:
        """Process a research request and return comprehensive analysis"""
        
        # Extract information from prompt
        analysis_info = self._parse_prompt(prompt)
        
        if not analysis_info['book_title']:
            return "Error: Could not identify book title in request. Please specify which classic book to analyze."
        
        try:
            # Execute research workflow using your tools
            
            # Step 1: Get book details
            book_details = get_book_details(analysis_info['book_title'])
            
            if book_details['status'] != 'found':
                return f"Error: Book '{analysis_info['book_title']}' not found in approved collection. Available books: {', '.join(book_details.get('available_books', [])[:3])}..."
            
            # Step 2: Analyze story elements
            analysis = analyze_story_elements(book_details, analysis_info['modifications'])
            
            if analysis['status'] != 'complete':
                return "Error: Could not complete literary analysis. Please check the book data and modifications."
            
            # Step 3: Assess adaptation flexibility
            flexibility = assess_adaptation_flexibility(analysis)
            
            if flexibility['status'] != 'complete':
                return "Error: Could not assess adaptation flexibility."
            
            # Step 4: Create adaptation guidelines
            guidelines = create_adaptation_guidelines({
                'literary_analysis': analysis['literary_analysis'],
                'flexibility_assessment': flexibility['flexibility_assessment']
            })
            
            if guidelines['status'] != 'complete':
                return "Error: Could not create adaptation guidelines."
            
            # Step 5: Prepare handoff for next agent
            handoff = prepare_compliance_handoff(analysis, guidelines)
            
            # Format comprehensive response
            response = self._format_research_response(
                book_details, analysis, flexibility, guidelines, handoff
            )
            
            return response
            
        except Exception as e:
            return f"Error in research workflow: {str(e)}. Please check your request and try again."
    
    def _parse_prompt(self, prompt: str) -> Dict[str, Any]:
        """Extract book title and modifications from prompt"""
        prompt_lower = prompt.lower()
        
        # Extract book title
        book_title = ""
        if "alice" in prompt_lower:
            book_title = "Alice's Adventures in Wonderland"
        elif "treasure island" in prompt_lower:
            book_title = "Treasure Island"
        elif "christmas carol" in prompt_lower:
            book_title = "A Christmas Carol"
        elif "wizard of oz" in prompt_lower:
            book_title = "The Wonderful Wizard of Oz"
        
        # Extract modifications
        modifications = {}
        
        if "space" in prompt_lower:
            modifications['setting'] = 'Space station in the future'
            modifications['time_period'] = 'Year 2150'
        elif "underwater" in prompt_lower:
            modifications['setting'] = 'Underwater research station'
            modifications['time_period'] = 'Near future'
        elif "modern" in prompt_lower:
            modifications['setting'] = 'Modern city'
            modifications['time_period'] = 'Present day'
        
        # Character modifications
        if "commander alice" in prompt_lower or "alice-7" in prompt_lower:
            modifications['characters'] = 'Alice becomes Commander Alice-7, a young space explorer'
        elif "marine biologist" in prompt_lower:
            modifications['characters'] = 'Jim becomes a marine biologist'
        
        # Special elements
        if "ai" in prompt_lower or "robot" in prompt_lower:
            modifications['special_elements'] = 'AI companions and robotic helpers'
        elif "submarine" in prompt_lower:
            modifications['special_elements'] = 'Advanced submarines and sea exploration'
        
        return {
            'book_title': book_title,
            'modifications': modifications
        }
    
    def _format_research_response(self, book_details, analysis, flexibility, guidelines, handoff) -> str:
        """Format a comprehensive research response"""
        
        book_data = book_details['book_data']
        compatibility = analysis['compatibility_analysis']
        
        response = f"""
LITERARY RESEARCH ANALYSIS COMPLETE

📚 BOOK ANALYZED: {book_data['title']} by {book_data['author']}
📖 Reading Level: {book_data.get('reading_level', 'Unknown')}
🎯 Primary Theme: {book_data.get('theme', 'Unknown')}

📊 ADAPTATION FEASIBILITY ASSESSMENT:
Overall Compatibility Score: {analysis['adaptation_score']}/100
Adaptation Readiness: {flexibility['adaptation_readiness']}
Recommended Approach: {flexibility['recommended_approach']}

🔍 COMPATIBILITY BREAKDOWN:
"""
        
        # Add detailed compatibility scores
        for element, comp in compatibility.items():
            if isinstance(comp, dict) and 'compatibility_score' in comp:
                score = comp['compatibility_score']
                if score >= 80:
                    status = "🎉 EXCELLENT"
                elif score >= 70:
                    status = "✅ APPROVED"
                elif score >= 50:
                    status = "⚠️ NEEDS REVIEW"
                else:
                    status = "❌ NOT RECOMMENDED"
                
                element_name = element.replace('_', ' ').title().replace('Modification', '')
                response += f"• {element_name}: {score}% {status}\n"
        
        # Add adaptation guidelines summary
        adaptation_guidelines = guidelines.get('adaptation_guidelines', {})
        preservation_rules = adaptation_guidelines.get('core_preservation_rules', [])
        
        if preservation_rules:
            response += f"\n🛡️ PRESERVATION REQUIREMENTS:\n"
            for rule in preservation_rules[:3]:  # Show top 3
                response += f"• {rule}\n"
        
        # Add creative opportunities
        safe_areas = adaptation_guidelines.get('safe_modification_areas', [])
        if safe_areas:
            response += f"\n✨ CREATIVE OPPORTUNITIES:\n"
            for area in safe_areas[:3]:  # Show top 3
                response += f"• {area}\n"
        
        # Add handoff information
        response += f"\n📤 HANDOFF TO EDUCATIONAL COMPLIANCE AGENT:\n"
        response += f"Status: {handoff['project_metadata']['status']}\n"
        response += f"Message: {handoff['handoff_message']}\n"
        
        # Add educational notes
        educational_notes = handoff.get('educational_compliance_notes', {})
        quality_checks = educational_notes.get('quality_checkpoints', [])
        if quality_checks:
            response += f"\n📋 QUALITY CHECKPOINTS FOR NEXT AGENT:\n"
            for check in quality_checks[:3]:  # Show top 3
                response += f"• {check}\n"
        
        response += f"\n✅ RESEARCH ANALYSIS COMPLETE - READY FOR EDUCATIONAL COMPLIANCE REVIEW"
        
        return response

# Create the working agent instance
working_research_agent = WorkingResearchAgent()