# tests/debug_step_by_step.py
# Let's debug exactly where the import fails

import sys
import os

# Add the app directory to Python path
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'app'))

def test_imports_step_by_step():
    print("🔍 STEP-BY-STEP IMPORT DEBUG")
    print("=" * 50)
    
    # Step 1: Test basic Google imports directly
    print("\n1️⃣ Testing Google imports directly...")
    try:
        import google
        print("✅ 'google' imported")
    except Exception as e:
        print(f"❌ 'google' failed: {e}")
        return False
    
    try:
        import google.auth
        print("✅ 'google.auth' imported")
    except Exception as e:
        print(f"❌ 'google.auth' failed: {e}")
        return False
    
    try:
        from google.adk.agents import Agent
        print("✅ 'google.adk.agents.Agent' imported")
    except Exception as e:
        print(f"❌ 'google.adk.agents.Agent' failed: {e}")
        return False
    
    # Step 2: Test app module imports
    print("\n2️⃣ Testing app module imports...")
    try:
        from tools.intake_tools import validate_student_form
        print("✅ 'tools.intake_tools' imported")
    except Exception as e:
        print(f"❌ 'tools.intake_tools' failed: {e}")
        return False
    
    try:
        from prompts.intake_prompt import intake_instruction
        print("✅ 'prompts.intake_prompt' imported")
    except Exception as e:
        print(f"❌ 'prompts.intake_prompt' failed: {e}")
        return False
    
    # Step 3: Test the actual agent import
    print("\n3️⃣ Testing intake_agent import...")
    try:
        from agents.intake_agent import intake_agent
        print("✅ 'agents.intake_agent' imported successfully!")
        print(f"📋 Agent name: {intake_agent.name}")
        print(f"🤖 Agent model: {intake_agent.model}")
        return True
    except Exception as e:
        print(f"❌ 'agents.intake_agent' failed: {e}")
        print(f"🔍 Error type: {type(e).__name__}")
        print(f"📁 Current working directory: {os.getcwd()}")
        print(f"🐍 Python path: {sys.path}")
        return False

def check_file_structure():
    print("\n4️⃣ Checking file structure...")
    
    base_path = os.path.join(os.path.dirname(__file__), '..')
    app_path = os.path.join(base_path, 'app')
    
    # Check if files exist
    files_to_check = [
        'app/agents/__init__.py',
        'app/agents/intake_agent.py',
        'app/tools/__init__.py', 
        'app/tools/intake_tools.py',
        'app/prompts/__init__.py',
        'app/prompts/intake_prompt.py',
        'app/data/books.json',
        'app/data/educational_standards.json'
    ]
    
    for file_path in files_to_check:
        full_path = os.path.join(base_path, file_path)
        if os.path.exists(full_path):
            print(f"✅ {file_path}")
        else:
            print(f"❌ {file_path} - MISSING!")

if __name__ == "__main__":
    success = test_imports_step_by_step()
    check_file_structure()
    
    if success:
        print("\n🎉 ALL IMPORTS SUCCESSFUL!")
    else:
        print("\n💥 Import failed - check the error details above")