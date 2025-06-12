#!/usr/bin/env python3
"""
Test correct ADK Agent invocation patterns
"""

import asyncio
import sys
from pathlib import Path

# Add project root to path
project_root = Path(__file__).parent
sys.path.insert(0, str(project_root))

async def test_adk_invocation_patterns():
    """Test different ways to invoke ADK agents"""
    print("🔍 Testing ADK Agent Invocation Patterns")
    print("=" * 50)
    
    try:
        from app.agents.research_agent import content_research_agent
        
        print("✅ Agent imported successfully")
        
        # Test simple string with run_live (might be simpler)
        print("\n🧪 Testing run_live method...")
        try:
            if hasattr(content_research_agent, 'run_live'):
                result = content_research_agent.run_live("Hello, can you help me?")
                print(f"✅ run_live worked!")
                print(f"📝 Result type: {type(result)}")
                
                # Check if it's a generator
                if hasattr(result, '__iter__') and not isinstance(result, str):
                    print("📦 Result is iterable, collecting chunks...")
                    chunks = list(result)
                    print(f"📊 Got {len(chunks)} chunks")
                    for i, chunk in enumerate(chunks[:3]):  # Show first 3
                        print(f"  Chunk {i+1}: {type(chunk)} - {str(chunk)[:100]}")
                else:
                    print(f"📄 Direct result: {str(result)[:200]}")
                
                return True
            else:
                print("❌ run_live method not found")
        except Exception as e:
            print(f"❌ run_live failed: {e}")
        
        # Test creating proper context for run_async
        print("\n🧪 Testing run_async with context...")
        try:
            # Try to import ADK context classes
            from google.adk.agents import InvocationContext
            
            # Create proper context
            context = InvocationContext(
                agent=content_research_agent,
                message="Hello, can you help me?"
            )
            
            result_chunks = []
            async for chunk in content_research_agent.run_async(context):
                result_chunks.append(chunk)
                print(f"📦 Chunk: {type(chunk)}")
            
            print(f"✅ run_async with context worked! Got {len(result_chunks)} chunks")
            return True
            
        except ImportError:
            print("❌ Could not import InvocationContext")
        except Exception as e:
            print(f"❌ run_async with context failed: {e}")
        
        # Test if there's a simpler way to create a message
        print("\n🧪 Testing with message object...")
        try:
            # Maybe we need to create a message object
            # Let's try to find what classes are available
            import google.adk.agents as adk_agents
            
            available_classes = [attr for attr in dir(adk_agents) 
                               if not attr.startswith('_') and attr[0].isupper()]
            print(f"🔍 Available ADK classes: {available_classes}")
            
            # Try different message patterns
            for class_name in ['Message', 'UserMessage', 'Request', 'Input']:
                if hasattr(adk_agents, class_name):
                    print(f"🔄 Trying {class_name}...")
                    msg_class = getattr(adk_agents, class_name)
                    try:
                        if class_name == 'Message':
                            msg = msg_class(content="Hello, can you help me?")
                        else:
                            msg = msg_class("Hello, can you help me?")
                        
                        # Try with this message
                        result_chunks = []
                        async for chunk in content_research_agent.run_async(msg):
                            result_chunks.append(chunk)
                        
                        print(f"✅ {class_name} worked! Got {len(result_chunks)} chunks")
                        return True
                        
                    except Exception as e:
                        print(f"❌ {class_name} failed: {e}")
            
        except Exception as e:
            print(f"❌ Message object test failed: {e}")
        
        # Try simpler approach - maybe there's a different method
        print("\n🧪 Testing other agent methods...")
        try:
            # Look for other methods that might work
            methods = [method for method in dir(content_research_agent) 
                      if not method.startswith('_') and callable(getattr(content_research_agent, method))]
            
            likely_methods = [m for m in methods if any(word in m.lower() 
                             for word in ['process', 'handle', 'respond', 'chat', 'invoke'])]
            
            print(f"🔍 Likely methods to try: {likely_methods}")
            
            for method_name in likely_methods:
                try:
                    method = getattr(content_research_agent, method_name)
                    print(f"🔄 Trying {method_name}...")
                    
                    # Try sync first
                    result = method("Hello")
                    print(f"✅ {method_name} (sync) worked: {type(result)}")
                    return True
                    
                except Exception as sync_e:
                    try:
                        # Try async
                        result = await method("Hello")
                        print(f"✅ {method_name} (async) worked: {type(result)}")
                        return True
                    except Exception as async_e:
                        print(f"❌ {method_name} failed both sync and async")
            
        except Exception as e:
            print(f"❌ Method exploration failed: {e}")
        
        return False
        
    except Exception as e:
        print(f"❌ Test setup failed: {e}")
        import traceback
        traceback.print_exc()
        return False

async def test_direct_tool_usage():
    """Test calling the agent tools directly"""
    print("\n🔧 Testing Direct Tool Usage")
    print("=" * 50)
    
    try:
        from app.tools.research_tools import get_book_details
        from unittest.mock import patch
        
        # Mock data
        sample_data = {
            "books": [{
                "title": "Alice's Adventures in Wonderland",
                "author": "Lewis Carroll"
            }]
        }
        
        with patch('app.tools.research_tools.load_books_database', return_value=sample_data):
            result = get_book_details("Alice")
            print(f"✅ Direct tool call worked!")
            print(f"📊 Result: {result['status']}")
            print(f"📚 Book: {result.get('book_data', {}).get('title', 'N/A')}")
            
            return True
    
    except Exception as e:
        print(f"❌ Direct tool test failed: {e}")
        return False

async def main():
    """Run all invocation tests"""
    print("🧪 ADK AGENT INVOCATION TESTS")
    print("=" * 60)
    
    # Test 1: Try different invocation patterns
    result1 = await test_adk_invocation_patterns()
    
    # Test 2: Direct tool usage
    result2 = await test_direct_tool_usage()
    
    print("\n" + "=" * 60)
    print("📊 INVOCATION TEST RESULTS:")
    print("=" * 60)
    print(f"Agent Invocation: {'✅ PASSED' if result1 else '❌ FAILED'}")
    print(f"Direct Tools:     {'✅ PASSED' if result2 else '❌ FAILED'}")
    
    if result1:
        print("\n🎉 Found working agent invocation pattern!")
    elif result2:
        print("\n⚠️  Agent invocation failed, but tools work directly.")
        print("💡 We might need to bypass the agent and call tools directly.")
    else:
        print("\n❌ Both agent and tools failed. Check setup.")

if __name__ == "__main__":
    asyncio.run(main())