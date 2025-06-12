#!/usr/bin/env python3
"""
Quick script to discover the correct ADK Agent API
"""

import sys
from pathlib import Path

# Add project root to path
project_root = Path(__file__).parent
sys.path.insert(0, str(project_root))

def discover_adk_api():
    """Find the correct methods available on ADK Agent"""
    print("🔍 Discovering ADK Agent API...")
    
    try:
        from app.agents.research_agent import content_research_agent
        
        print(f"✅ Agent imported successfully")
        print(f"📝 Agent type: {type(content_research_agent)}")
        print(f"📝 Agent class: {content_research_agent.__class__.__name__}")
        
        # List all available methods
        methods = [method for method in dir(content_research_agent) 
                  if not method.startswith('_') and callable(getattr(content_research_agent, method))]
        
        print(f"\n🔧 Available methods:")
        for method in sorted(methods):
            print(f"  - {method}")
        
        # Look for likely candidates
        likely_methods = [m for m in methods if any(keyword in m.lower() 
                         for keyword in ['run', 'generate', 'process', 'invoke', 'chat', 'response'])]
        
        print(f"\n🎯 Likely methods for running the agent:")
        for method in likely_methods:
            print(f"  - {method}")
        
        # Check if it has a specific method signature
        for method_name in ['run', 'generate', 'process', 'invoke', 'chat']:
            if hasattr(content_research_agent, method_name):
                method = getattr(content_research_agent, method_name)
                print(f"\n✅ Found method: {method_name}")
                print(f"   Signature: {method}")
                
                # Try to get help/docstring
                if method.__doc__:
                    print(f"   Docs: {method.__doc__[:100]}...")
        
        return content_research_agent
        
    except Exception as e:
        print(f"❌ Failed to import agent: {e}")
        return None

async def test_adk_methods():
    """Test different methods to find the right one"""
    print("\n🧪 Testing ADK methods...")
    
    agent = discover_adk_api()
    if not agent:
        return
    
    test_prompt = "Hello, can you help me analyze a book?"
    
    # Try different method names
    methods_to_try = ['run', 'generate', 'process', 'invoke', 'chat', 'generate_response']
    
    for method_name in methods_to_try:
        if hasattr(agent, method_name):
            print(f"\n🔄 Trying method: {method_name}")
            try:
                method = getattr(agent, method_name)
                
                # Try calling it
                if method_name in ['run', 'process', 'invoke']:
                    # These might be sync methods
                    try:
                        result = method(test_prompt)
                        print(f"  ✅ {method_name}() worked (sync)")
                        print(f"  📝 Result type: {type(result)}")
                        if hasattr(result, 'content'):
                            print(f"  📄 Has content: {len(result.content) if result.content else 0} chars")
                        return method_name, False  # False = sync
                    except Exception as sync_e:
                        print(f"  ❌ {method_name}() sync failed: {sync_e}")
                        
                        # Try async
                        try:
                            result = await method(test_prompt)
                            print(f"  ✅ {method_name}() worked (async)")
                            print(f"  📝 Result type: {type(result)}")
                            if hasattr(result, 'content'):
                                print(f"  📄 Has content: {len(result.content) if result.content else 0} chars")
                            return method_name, True  # True = async
                        except Exception as async_e:
                            print(f"  ❌ {method_name}() async failed: {async_e}")
                
            except Exception as e:
                print(f"  ❌ {method_name} failed: {e}")
    
    print(f"\n❌ No working method found")
    return None, None

if __name__ == "__main__":
    import asyncio
    
    print("🔍 ADK AGENT API DISCOVERY")
    print("=" * 50)
    
    # First discover the API
    agent = discover_adk_api()
    
    if agent:
        # Then test methods
        try:
            result = asyncio.run(test_adk_methods())
            if result[0]:
                method_name, is_async = result
                print(f"\n🎉 SUCCESS!")
                print(f"✅ Use method: {method_name}")
                print(f"⚡ Async: {is_async}")
                print(f"\n📋 Update your tests to use:")
                if is_async:
                    print(f"   response = await agent.{method_name}(prompt)")
                else:
                    print(f"   response = agent.{method_name}(prompt)")
            else:
                print(f"\n❌ No working method found")
        except Exception as e:
            print(f"\n❌ Testing failed: {e}")
    else:
        print(f"\n❌ Could not load agent")