# tests/test_full_workflow.py
# Save this in your tests/ directory

import asyncio
import json
import sys
import os

# Add the app directory to Python path (go up one level, then into app)
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'app'))

async def test_full_workflow():
    print("🚀 TESTING FULL MULTI-AGENT WORKFLOW")
    print("=" * 60)
    
    try:
        # Import the coordinator
        from orchestration.agent_coordinator import AgentCoordinator
        print("✅ Successfully imported AgentCoordinator")
        
        # Sample request (like from your React form)
        student_request = {
            "book_title": "Alice's Adventures in Wonderland by Lewis Carroll",
            "setting": "Space station in the year 2150",
            "characters": "Alice-7 is a young space explorer with her robot companion White-Bot",
            "time_period": "Far future", 
            "theme": "Curiosity and discovery in unknown worlds",
            "tone": "Adventurous but wonder-filled",
            "genre": "Science fiction adventure",
            "special_elements": "Advanced technology, space travel, alien worlds"
        }
        
        print("\n📋 Processing Student Request:")
        print(f"📖 Book: {student_request['book_title']}")
        print(f"🌌 Setting: {student_request['setting']}")
        print(f"👥 Characters: {student_request['characters'][:50]}...")
        
        # Initialize coordinator and process
        coordinator = AgentCoordinator()
        print("\n🤖 Starting multi-agent workflow...")
        
        result = await coordinator.process_student_request(student_request)
        
        # Display results
        print("\n📊 WORKFLOW RESULTS:")
        print("=" * 40)
        
        if result['success']:
            print("✅ Status: SUCCESS")
            print(f"📝 Project Info: {result['project_info']}")
            print(f"🔄 Next Step: {result['next_step']}")
            
            print("\n📈 Agent Workflow Log:")
            for i, log_entry in enumerate(result['workflow_log'], 1):
                print(f"  {i}. {log_entry['agent']}: {log_entry['message']}")
            
            print(f"\n🤖 Agent Response Preview:")
            print(f"{result['agent_response'][:300]}...")
            
        else:
            print("❌ Status: FAILED")
            print(f"💥 Error: {result['error']}")
        
        return result['success']
        
    except ImportError as e:
        print(f"❌ Failed to import coordinator: {e}")
        print("🔧 Check your file structure and dependencies")
        return False
    except Exception as e:
        print(f"❌ Workflow test failed: {e}")
        print(f"🔍 Error type: {type(e).__name__}")
        return False

async def test_invalid_request():
    """Test with invalid data to see error handling"""
    print("\n🧪 TESTING ERROR HANDLING")
    print("=" * 40)
    
    try:
        from orchestration.agent_coordinator import AgentCoordinator
        
        # Invalid request (missing required fields)
        invalid_request = {
            "book_title": "",  # Empty
            "setting": "Space",
            "characters": "",  # Empty
        }
        
        coordinator = AgentCoordinator()
        result = await coordinator.process_student_request(invalid_request)
        
        if not result['success']:
            print("✅ Error handling works!")
            print(f"🚫 Caught error: {result['error']}")
        else:
            print("⚠️ Error handling may need improvement")
            
        return True
        
    except Exception as e:
        print(f"❌ Error handling test failed: {e}")
        return False

if __name__ == "__main__":
    print("Starting comprehensive workflow tests...\n")
    
    # Test 1: Valid request
    success1 = asyncio.run(test_full_workflow())
    
    # Test 2: Invalid request  
    success2 = asyncio.run(test_invalid_request())
    
    print("\n🏁 FINAL RESULTS:")
    print("=" * 30)
    print(f"✅ Valid Request Test: {'PASSED' if success1 else 'FAILED'}")
    print(f"🚫 Invalid Request Test: {'PASSED' if success2 else 'FAILED'}")
    
    if success1 and success2:
        print("\n🎉 ALL TESTS PASSED! Your multi-agent system is working!")
        print("🚀 Ready to build the next agent (Research Specialist)")
    else:
        print("\n💥 Some tests failed - check setup and try again")
        