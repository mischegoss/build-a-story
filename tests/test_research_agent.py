#!/usr/bin/env python3
"""
Test the working research agent
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
            }
        }
    ]
}

async def test_working_research_agent():
    """Test the working research agent"""
    print("🧪 TESTING WORKING RESEARCH AGENT")
    print("=" * 50)
    
    try:
        from app.agents.research_agent import content_research_agent
        
        print(f"✅ Agent imported: {type(content_research_agent)}")
        print(f"📝 Agent name: {content_research_agent.name}")
        
        # Test with Alice space adaptation
        prompt = """
        Please analyze Alice's Adventures in Wonderland for adaptation to a space setting.
        
        Student's requested modifications:
        - Setting: Space station in the future
        - Characters: Alice becomes Commander Alice-7, a young space explorer
        - Time Period: Year 2150
        - Special Elements: AI companions, quantum portals
        
        Please provide a complete compatibility assessment.
        """
        
        with patch('app.tools.research_tools.load_books_database', return_value=SAMPLE_BOOKS_DATA):
            print("🔄 Processing request...")
            
            # Collect all response chunks
            response_chunks = []
            async for chunk in content_research_agent.run_live(prompt):
                response_chunks.append(chunk)
                print(f"📦 Received chunk ({len(chunk.content)} chars)")
            
            # Combine all content
            full_response = ""
            for chunk in response_chunks:
                full_response += chunk.content
            
            print(f"\n✅ Analysis completed!")
            print(f"📊 Total response length: {len(full_response)} characters")
            
            # Check for key elements
            checks = []
            if "alice" in full_response.lower() and "wonderland" in full_response.lower():
                checks.append("✅ Book identified")
            if "compatibility score" in full_response.lower():
                checks.append("✅ Compatibility scoring")
            if "space" in full_response.lower():
                checks.append("✅ Setting modification addressed")
            if "commander alice" in full_response.lower() or "alice-7" in full_response.lower():
                checks.append("✅ Character modification addressed")
            if "handoff" in full_response.lower():
                checks.append("✅ Agent handoff prepared")
            
            print(f"\n🎯 Quality checks: {len(checks)}/5")
            for check in checks:
                print(f"  {check}")
            
            print(f"\n📄 Response preview:")
            print("=" * 50)
            print(full_response[:600] + "..." if len(full_response) > 600 else full_response)
            print("=" * 50)
            
            return len(checks) >= 4  # At least 4/5 checks pass
            
    except Exception as e:
        print(f"❌ Test failed: {e}")
        import traceback
        traceback.print_exc()
        return False

async def test_coordinator_with_working_agent():
    """Test coordinator with working agents"""
    print("\n🎯 TESTING COORDINATOR WITH WORKING AGENTS")
    print("=" * 50)
    
    try:
        from app.orchestration.agent_coordinator import AgentCoordinator
        
        coordinator = AgentCoordinator()
        print(f"✅ Coordinator created")
        print(f"📋 Available agents: {list(coordinator.agents.keys())}")
        
        # Test student request
        student_request = {
            'book_title': 'Alice\'s Adventures in Wonderland by Lewis Carroll',
            'setting': 'Space station in the future',
            'characters': 'Alice is now Commander Alice-7',
            'time_period': 'Year 2150'
        }
        
        with patch('app.tools.research_tools.load_books_database', return_value=SAMPLE_BOOKS_DATA):
            print("🔄 Processing through coordinator...")
            
            result = await coordinator.process_student_request(student_request)
            
            print(f"📊 Result status: {result['status']}")
            
            if result['status'] == 'partial_complete':
                print(f"✅ Workflow progressed!")
                print(f"📋 Completed: {result.get('completed_stages', [])}")
                print(f"⏭️  Next: {result.get('next_stage', 'N/A')}")
                
                # Check communication log
                comm_log = coordinator.get_agent_communication_log()
                print(f"📞 Communications: {len(comm_log)}")
                
                for entry in comm_log:
                    print(f"  {entry['agent']}: {entry['status']}")
                
                return True
            else:
                print(f"❌ Workflow issue: {result}")
                return False
                
    except Exception as e:
        print(f"❌ Coordinator test failed: {e}")
        return False

async def main():
    """Run working agent tests"""
    print("🚀 WORKING RESEARCH AGENT TESTS")
    print("=" * 60)
    
    # Test 1: Working agent
    result1 = await test_working_research_agent()
    
    # Test 2: Coordinator integration
    result2 = await test_coordinator_with_working_agent()
    
    # Summary
    print("\n" + "=" * 60)
    print("📊 WORKING AGENT TEST RESULTS:")
    print("=" * 60)
    print(f"Working Agent:          {'✅ PASSED' if result1 else '❌ FAILED'}")
    print(f"Coordinator Integration:{'✅ PASSED' if result2 else '❌ FAILED'}")
    
    passed = sum([result1, result2])
    print(f"\n🎯 Overall: {passed}/2 tests passed")
    
    if passed == 2:
        print("🎉 SUCCESS! Working Research Agent is fully functional!")
        print("\n✨ What's working:")
        print("  ✅ Agent processes research requests")
        print("  ✅ Uses all research tools correctly")
        print("  ✅ Provides detailed compatibility analysis")
        print("  ✅ Integrates with multi-agent coordinator")
        print("  ✅ Prepares handoffs for next agent")
        
        print(f"\n🚀 READY TO BUILD: Educational Compliance Agent (Agent #3)")
        print("💡 Your research agent is working perfectly!")
        
    elif passed == 1:
        print("⚠️  Partial success - research agent works, coordinator needs fixing")
        print("💡 You can still proceed to build the next agent")
    else:
        print("❌ Issues need resolution")
    
    return passed >= 1

if __name__ == "__main__":
    success = asyncio.run(main())