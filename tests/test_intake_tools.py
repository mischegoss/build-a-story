# tests/test_intake_tools.py
# Save this in your tests/ directory

import json
import sys
import os

# Add the app directory to Python path (go up one level, then into app)
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'app'))

# Test the tools directly
from tools.intake_tools import (
    validate_student_form,
    create_project_id,
    check_basic_educational_requirements,
    route_to_research_agent
)

def test_intake_tools():
    print("🧪 TESTING INTAKE TOOLS")
    print("=" * 50)
    
    # Sample student form data
    test_form = {
        "book_title": "Alice's Adventures in Wonderland by Lewis Carroll",
        "setting": "Space station in the year 2150",
        "characters": "Alice-7 is a young space explorer with her robot companion White-Bot",
        "time_period": "Far future",
        "theme": "Curiosity and discovery in unknown worlds",
        "tone": "Adventurous but wonder-filled",
        "genre": "Science fiction adventure",
        "special_elements": "Advanced technology, space travel, alien worlds"
    }
    
    # Test 1: Form Validation
    print("\n1️⃣ Testing Form Validation...")
    try:
        validation_result = validate_student_form(json.dumps(test_form))
        validation_data = json.loads(validation_result)
        print(f"✅ Validation Result: {validation_data['is_valid']}")
        if validation_data['errors']:
            print(f"❌ Errors: {validation_data['errors']}")
        if validation_data['warnings']:
            print(f"⚠️ Warnings: {validation_data['warnings']}")
        print(f"📋 Project Ready: {validation_data['project_ready']}")
    except Exception as e:
        print(f"❌ Form validation failed: {e}")
    
    # Test 2: Project ID Creation
    print("\n2️⃣ Testing Project ID Creation...")
    try:
        project_result = create_project_id(json.dumps(test_form))
        project_data = json.loads(project_result)
        print(f"✅ Project ID: {project_data.get('project_id', 'None')}")
        print(f"📖 Book Selected: {project_data.get('book_selected', 'None')}")
        print(f"🏗️ Workflow Stage: {project_data.get('workflow_stage', 'None')}")
    except Exception as e:
        print(f"❌ Project ID creation failed: {e}")
    
    # Test 3: Educational Requirements Check
    print("\n3️⃣ Testing Educational Requirements...")
    try:
        edu_result = check_basic_educational_requirements(project_result)
        edu_data = json.loads(edu_result)
        print(f"✅ Educational Compliance: {edu_data.get('educational_compliance', 'None')}")
        print(f"🎯 Target Standards: {len(edu_data.get('target_standards', []))} standards")
        print(f"📚 Grade Recommendations: {edu_data.get('grade_recommendations', [])}")
    except Exception as e:
        print(f"❌ Educational requirements check failed: {e}")
    
    # Test 4: Research Agent Routing
    print("\n4️⃣ Testing Research Agent Routing...")
    try:
        routing_result = route_to_research_agent(project_result)
        routing_data = json.loads(routing_result)
        print(f"✅ Handoff Status: {routing_data.get('handoff_status', 'None')}")
        print(f"🔄 From Agent: {routing_data.get('from_agent', 'None')}")
        print(f"📤 To Agent: {routing_data.get('to_agent', 'None')}")
        print(f"💬 Message: {routing_data.get('handoff_message', 'None')[:100]}...")
    except Exception as e:
        print(f"❌ Research agent routing failed: {e}")
    
    print("\n🎉 Tool testing complete!")

if __name__ == "__main__":
    test_intake_tools()