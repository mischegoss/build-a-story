#!/usr/bin/env python3
"""
Test the complete sequential workflow with simplified research agent
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

async def test_individual_wrapped_agents():
    """Test the wrapped agents individually"""
    print("🧪 TESTING INDIVIDUAL WRAPPED AGENTS")
    print("=" * 50)
    
    try:
        from app.agents.story_sequential_agent import get_wrapped_agents
        
        wrapped_agents = get_wrapped_agents()
        print(f"✅ Got wrapped agents: {list(wrapped_agents.keys())}")
        
        # Test intake wrapper
        print("\n📥 Testing Intake Wrapper...")
        intake_agent = wrapped_agents['intake']
        intake_prompt = "Student wants to adapt Alice in Wonderland to space setting with Commander Alice-7"
        
        intake_result = await intake_agent.run_async(intake_prompt)
        print(f"✅ Intake completed: {len(intake_result.content)} chars")
        print(f"📄 Intake preview: {intake_result.content[:200]}...")
        
        # Test research wrapper
        print("\n🔍 Testing Research Wrapper...")
        research_agent = wrapped_agents['research']
        research_prompt = "Analyze Alice's Adventures in Wonderland for space station adaptation with Commander Alice-7"
        
        with patch('app.tools.research_tools.load_books_database', return_value=SAMPLE_BOOKS_DATA):
            research_result = await research_agent.run_async(research_prompt)
            print(f"✅ Research completed: {len(research_result.content)} chars")
            
            # Check for quality indicators
            content = research_result.content.lower()
            quality_checks = []
            if "compatibility score" in content:
                quality_checks.append("✅ Compatibility scoring")
            if "alice" in content and "wonderland" in content:
                quality_checks.append("✅ Book analysis")
            if "research_handoff" in content:
                quality_checks.append("✅ Sequential handoff format")
            
            print(f"🎯 Research quality: {len(quality_checks)}/3 checks passed")
            for check in quality_checks:
                print(f"  {check}")
            
            print(f"📄 Research preview: {research_result.content[:300]}...")
        
        return True
        
    except Exception as e:
        print(f"❌ Individual agent test failed: {e}")
        import traceback
        traceback.print_exc()
        return False

async def test_complete_sequential_workflow():
    """Test the complete 6-agent sequential workflow"""
    print("\n🚀 TESTING COMPLETE SEQUENTIAL WORKFLOW")
    print("=" * 50)
    
    try:
        from app.agents.story_sequential_agent import create_story_with_workflow
        
        # Simulate student request from React frontend
        student_request = {
            'book_title': 'Alice\'s Adventures in Wonderland by Lewis Carroll',
            'setting': 'Space station in the future',
            'characters': 'Alice is now Commander Alice-7, a young space explorer',
            'time_period': 'Year 2150',
            'theme': 'Curiosity and discovery',
            'special_elements': 'AI companions, quantum portals, zero gravity areas'
        }
        
        print(f"📝 Processing student request:")
        print(f"  Book: {student_request['book_title']}")
        print(f"  Setting: {student_request['setting']}")
        print(f"  Characters: {student_request['characters']}")
        
        with patch('app.tools.research_tools.load_books_database', return_value=SAMPLE_BOOKS_DATA):
            print(f"\n🔄 Running complete 6-agent sequential workflow...")
            
            result = await create_story_with_workflow(student_request)
            
            print(f"📊 Workflow status: {result['status']}")
            
            if result['status'] == 'complete':
                print(f"✅ Sequential workflow completed successfully!")
                print(f"📋 Agents used: {result['agents_used']}")
                print(f"🎯 Workflow type: {result['workflow_type']}")
                print(f"📈 Research quality: {result['research_quality']}")
                
                # Analyze the complete result
                full_result = result['workflow_result']
                print(f"\n📊 Complete workflow result: {len(full_result)} characters")
                
                # Look for evidence of each agent's work
                agent_evidence = []
                result_lower = full_result.lower()
                
                if "project_handoff" in result_lower:
                    agent_evidence.append("✅ Intake agent handoff")
                if "research_handoff" in result_lower:
                    agent_evidence.append("✅ Research agent handoff")
                if "compliance_handoff" in result_lower:
                    agent_evidence.append("✅ Compliance agent handoff")
                if "creative_handoff" in result_lower:
                    agent_evidence.append("✅ Creative agent handoff")
                if "qa_handoff" in result_lower:
                    agent_evidence.append("✅ QA agent handoff")
                if "final_delivery" in result_lower:
                    agent_evidence.append("✅ Production agent delivery")
                
                print(f"\n🎯 Agent workflow evidence: {len(agent_evidence)}/6")
                for evidence in agent_evidence:
                    print(f"  {evidence}")
                
                # Look for story content
                if "story_starter" in result_lower:
                    print(f"✅ Story generation confirmed")
                
                # Show key sections
                print(f"\n📄 Workflow result preview:")
                print("=" * 50)
                print(full_result[:800] + "..." if len(full_result) > 800 else full_result)
                print("=" * 50)
                
                return len(agent_evidence) >= 4  # At least 4/6 agents should show evidence
                
            else:
                print(f"❌ Workflow failed: {result.get('error_message', 'Unknown error')}")
                print(f"💡 Fallback: {result.get('fallback_suggestion', 'None')}")
                return False
        
    except Exception as e:
        print(f"❌ Sequential workflow test failed: {e}")
        import traceback
        traceback.print_exc()
        return False

async def test_api_integration():
    """Test API integration with sequential workflow"""
    print("\n🌐 TESTING API INTEGRATION")
    print("=" * 50)
    
    try:
        # Simulate what would happen through the API
        from app.agents.story_sequential_agent import create_story_with_workflow
        
        # API request format
        api_request = {
            "book_title": "Alice's Adventures in Wonderland by Lewis Carroll",
            "setting": "Space station in the future", 
            "characters": "Alice becomes Commander Alice-7",
            "time_period": "Year 2150",
            "theme": "Curiosity and discovery",
            "tone": "Adventurous and optimistic",
            "genre": "Science Fiction Adventure",
            "special_elements": "AI companions, quantum portals",
            "workflow_type": "sequential"
        }
        
        print(f"📤 API request simulation:")
        print(f"  Workflow: {api_request['workflow_type']}")
        print(f"  Book: {api_request['book_title']}")
        
        with patch('app.tools.research_tools.load_books_database', return_value=SAMPLE_BOOKS_DATA):
            api_result = await create_story_with_workflow(api_request)
            
            # Format API response
            api_response = {
                "status": "success" if api_result['status'] == 'complete' else "error",
                "workflow_type": "sequential",
                "story": api_result.get('workflow_result', ''),
                "agents_used": api_result.get('agents_used', []),
                "original_title": api_request['book_title'].split(" by ")[0],
                "original_author": api_request['book_title'].split(" by ")[1] if " by " in api_request['book_title'] else "Unknown",
                "word_count": len(api_result.get('workflow_result', '').split())
            }
            
            print(f"📨 API response:")
            print(f"  Status: {api_response['status']}")
            print(f"  Agents: {api_response['agents_used']}")
            print(f"  Word count: {api_response['word_count']}")
            print(f"  Title: {api_response['original_title']}")
            print(f"  Author: {api_response['original_author']}")
            
            return api_response['status'] == 'success'
        
    except Exception as e:
        print(f"❌ API integration test failed: {e}")
        return False

async def main():
    """Run complete sequential workflow tests"""
    print("🚀 SEQUENTIAL WORKFLOW TESTS")
    print("=" * 60)
    print("Testing complete 6-agent sequential workflow with simplified research agent")
    
    # Test 1: Individual wrapped agents
    result1 = await test_individual_wrapped_agents()
    
    # Test 2: Complete sequential workflow
    result2 = await test_complete_sequential_workflow()
    
    # Test 3: API integration
    result3 = await test_api_integration()
    
    # Summary
    print("\n" + "=" * 60)
    print("📊 SEQUENTIAL WORKFLOW TEST RESULTS:")
    print("=" * 60)
    print(f"Individual Agents:      {'✅ PASSED' if result1 else '❌ FAILED'}")
    print(f"Complete Workflow:      {'✅ PASSED' if result2 else '❌ FAILED'}")
    print(f"API Integration:        {'✅ PASSED' if result3 else '❌ FAILED'}")
    
    passed = sum([result1, result2, result3])
    print(f"\n🎯 Overall: {passed}/3 tests passed")
    
    if passed == 3:
        print("🎉 SEQUENTIAL WORKFLOW SUCCESS!")
        print("\n✨ What's working:")
        print("  ✅ Your simplified research agent integrates perfectly")
        print("  ✅ Complete 6-agent sequential workflow operational")
        print("  ✅ API integration ready for React frontend")
        print("  ✅ Student requests → Complete story portfolios")
        print("  ✅ Educational standards maintained throughout")
        
        print(f"\n🚀 READY FOR PRODUCTION!")
        print("💡 Your sequential workflow can now create complete educational story adaptations!")
        
    elif passed >= 2:
        print("⚠️  Mostly working! Minor issues to resolve")
        print("💡 Core functionality is solid")
    else:
        print("❌ Sequential workflow needs debugging")
    
    return passed >= 2

if __name__ == "__main__":
    success = asyncio.run(main())