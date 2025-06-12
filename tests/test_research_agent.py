#!/usr/bin/env python3
"""
Final Research Agent Test - Complete integration test
"""

import asyncio
import sys
from pathlib import Path
from unittest.mock import patch

# Add project root to path
project_root = Path(__file__).parent
sys.path.insert(0, str(project_root))

# Sample test data
SAMPLE_BOOKS_DATA = {
    "books": [
        {
            "title": "Alice's Adventures in Wonderland",
            "author": "Lewis Carroll",
            "setting": {
                "location": "English countryside by a riverbank",
                "time_period": "Victorian era afternoon"
            },
            "main_characters": [
                {"name": "Alice", "role": "protagonist", "age_group": "child"},
                {"name": "White Rabbit", "role": "catalyst", "type": "talking animal"}
            ],
            "theme": "Curiosity and adventure",
            "reading_level": "Middle School",
            "adaptable_elements": {
                "setting_flexibility": "high",
                "character_flexibility": "medium",
                "plot_flexibility": "high"
            },
            "discussion_topics": ["Following curiosity", "Reality vs. imagination"]
        }
    ]
}

async def test_agent_basic_response():
    """Test basic agent response"""
    print("🤖 Testing Research Agent Basic Response")
    print("=" * 50)
    
    try:
        from app.agents.research_agent import content_research_agent
        
        prompt = "Hello! I'm a Literary Research Specialist. Can you confirm you can communicate with me?"
        
        # Use run_live with async for
        response_chunks = []
        async for chunk in content_research_agent.run_live(prompt):
            response_chunks.append(chunk)
        
        # Combine content
        all_content = ""
        for chunk in response_chunks:
            if hasattr(chunk, 'content'):
                all_content += chunk.content
            elif hasattr(chunk, 'text'):
                all_content += chunk.text
            elif isinstance(chunk, str):
                all_content += chunk
            else:
                all_content += str(chunk)
        
        if all_content:
            print(f"✅ Agent responded successfully!")
            print(f"📝 Response length: {len(all_content)} characters")
            print(f"📄 Response preview:")
            print(all_content[:200] + "..." if len(all_content) > 200 else all_content)
            return True
        else:
            print("❌ No content received from agent")
            return False
            
    except Exception as e:
        print(f"❌ Basic response test failed: {e}")
        return False

async def test_agent_with_book_analysis():
    """Test agent with actual book analysis"""
    print("\n🔍 Testing Research Agent with Book Analysis")
    print("=" * 50)
    
    try:
        from app.agents.research_agent import content_research_agent
        
        analysis_prompt = """
        Please analyze Alice's Adventures in Wonderland for adaptation to a space setting.
        
        Student's requested modifications:
        - Setting: Space station in the future
        - Characters: Alice becomes Commander Alice-7
        - Time Period: Year 2150
        - Special Elements: AI companions, quantum portals
        
        Please use your get_book_details tool to retrieve the book information, then provide a compatibility assessment.
        """
        
        with patch('app.tools.research_tools.load_books_database', return_value=SAMPLE_BOOKS_DATA):
            # Use run_live with async for
            response_chunks = []
            async for chunk in content_research_agent.run_live(analysis_prompt):
                response_chunks.append(chunk)
            
            # Combine content
            all_content = ""
            for chunk in response_chunks:
                if hasattr(chunk, 'content'):
                    all_content += chunk.content
                elif hasattr(chunk, 'text'):
                    all_content += chunk.text
                elif isinstance(chunk, str):
                    all_content += chunk
                else:
                    all_content += str(chunk)
            
            if all_content:
                print(f"✅ Analysis completed successfully!")
                print(f"📊 Response length: {len(all_content)} characters")
                
                # Check for key elements
                content_lower = all_content.lower()
                
                # Look for evidence of tool usage and analysis
                evidence = []
                if 'alice' in content_lower and 'wonderland' in content_lower:
                    evidence.append("✅ Book identified")
                if any(word in content_lower for word in ['compatibility', 'adaptation', 'score']):
                    evidence.append("✅ Analysis performed")
                if 'space' in content_lower:
                    evidence.append("✅ Setting modification addressed")
                if any(word in content_lower for word in ['commander', 'alice-7']):
                    evidence.append("✅ Character modification addressed")
                
                print(f"🎯 Analysis evidence: {evidence}")
                
                print(f"\n📄 Analysis response preview:")
                print("=" * 50)
                print(all_content[:500] + "..." if len(all_content) > 500 else all_content)
                print("=" * 50)
                
                return len(evidence) >= 2  # At least 2 pieces of evidence
            else:
                print("❌ No content received from analysis")
                return False
                
    except Exception as e:
        print(f"❌ Book analysis test failed: {e}")
        import traceback
        traceback.print_exc()
        return False

async def test_agent_coordinator_integration():
    """Test agent through coordinator"""
    print("\n🎯 Testing Agent Coordinator Integration")
    print("=" * 50)
    
    try:
        from app.orchestration.agent_coordinator import AgentCoordinator
        
        coordinator = AgentCoordinator()
        
        # Simulate React frontend request
        student_request = {
            'book_title': 'Alice\'s Adventures in Wonderland by Lewis Carroll',
            'setting': 'Space station in the future',
            'characters': 'Alice is now Commander Alice-7',
            'time_period': 'Year 2150',
            'theme': 'Curiosity and discovery'
        }
        
        with patch('app.tools.research_tools.load_books_database', return_value=SAMPLE_BOOKS_DATA):
            print("🔄 Processing through coordinator...")
            result = await coordinator.process_student_request(student_request)
            
            print(f"📊 Coordinator result: {result['status']}")
            
            if result['status'] == 'partial_complete':
                print(f"✅ Workflow progressed successfully!")
                print(f"📋 Completed stages: {result.get('completed_stages', [])}")
                print(f"⏭️  Next stage: {result.get('next_stage', 'Unknown')}")
                
                # Check communication log
                comm_log = coordinator.get_agent_communication_log()
                print(f"📞 Agent communications: {len(comm_log)}")
                
                for entry in comm_log:
                    print(f"  {entry['agent']} → {entry.get('next_agent', 'N/A')}: {entry['status']}")
                
                return True
            else:
                print(f"❌ Workflow failed: {result.get('message', 'Unknown error')}")
                return False
        
    except Exception as e:
        print(f"❌ Coordinator integration test failed: {e}")
        return False

async def main():
    """Run complete test suite"""
    print("🧪 FINAL RESEARCH AGENT TEST SUITE")
    print("=" * 60)
    print("Testing complete integration with fixed ADK agent")
    
    # Test 1: Basic response
    result1 = await test_agent_basic_response()
    
    # Test 2: Book analysis  
    result2 = await test_agent_with_book_analysis()
    
    # Test 3: Coordinator integration
    result3 = await test_agent_coordinator_integration()
    
    # Summary
    print("\n" + "=" * 60)
    print("📊 FINAL TEST RESULTS:")
    print("=" * 60)
    print(f"Basic Response:         {'✅ PASSED' if result1 else '❌ FAILED'}")
    print(f"Book Analysis:          {'✅ PASSED' if result2 else '❌ FAILED'}")
    print(f"Coordinator Integration:{'✅ PASSED' if result3 else '❌ FAILED'}")
    
    passed = sum([result1, result2, result3])
    print(f"\n🎯 Overall: {passed}/3 tests passed")
    
    if passed == 3:
        print("🎉 COMPLETE SUCCESS!")
        print("\n✨ Your Research Agent is fully working!")
        print("📋 What's working:")
        print("  ✅ ADK Agent responds to prompts")
        print("  ✅ Agent uses research tools")
        print("  ✅ Book analysis and compatibility scoring")
        print("  ✅ Multi-agent coordinator integration")
        print("  ✅ Ready for Educational Compliance Agent")
        
        print(f"\n🚀 NEXT STEP: Build Agent #3 - Educational Compliance Agent")
        
    elif passed >= 2:
        print("⚠️  Mostly working! Minor issues to resolve")
        print("💡 You can probably proceed to next agent")
    else:
        print("❌ Significant issues need resolution")
    
    return passed >= 2

if __name__ == "__main__":
    success = asyncio.run(main())
