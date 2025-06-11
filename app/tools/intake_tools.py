# app/tools/intake_tools.py
import json
import uuid
import datetime
from typing import Dict, List, Any, Optional
from pathlib import Path

def load_educational_standards() -> Dict:
    """Load the educational standards JSON file."""
    standards_path = Path(__file__).parent.parent / "data" / "educational_standards.json"
    with open(standards_path, 'r') as f:
        return json.load(f)

def load_approved_books() -> Dict:
    """Load the approved books database."""
    books_path = Path(__file__).parent.parent / "data" / "books.json"
    with open(books_path, 'r') as f:
        return json.load(f)

def validate_student_form(form_data: str) -> str:
    """
    Validate the student form submission for completeness and basic safety.
    
    Args:
        form_data: JSON string containing student form submission
        
    Returns:
        JSON string with validation results and any issues found
    """
    try:
        # Parse the form data
        data = json.loads(form_data)
        
        validation_result = {
            "is_valid": True,
            "errors": [],
            "warnings": [],
            "project_ready": False
        }
        
        # Required fields validation
        required_fields = ["book_title", "setting", "characters"]
        for field in required_fields:
            if not data.get(field) or data[field].strip() == "":
                validation_result["errors"].append(f"Required field '{field}' is missing or empty")
                validation_result["is_valid"] = False
        
        # Book validation - check if it's in our approved list
        if data.get("book_title"):
            books = load_approved_books()
            book_found = False
            for book in books["books"]:
                if book["title"].lower() in data["book_title"].lower():
                    book_found = True
                    break
            
            if not book_found:
                validation_result["errors"].append(f"Book '{data['book_title']}' is not in our approved middle school collection")
                validation_result["is_valid"] = False
        
        # Basic content safety check
        inappropriate_keywords = [
            "violence", "death", "kill", "murder", "blood", "gore", 
            "scary", "horror", "nightmare", "terror", "weapon", "gun",
            "war", "battle", "fight", "attack", "dangerous"
        ]
        
        content_fields = ["setting", "characters", "special_elements", "theme"]
        for field in content_fields:
            if data.get(field):
                content = data[field].lower()
                flagged_words = [word for word in inappropriate_keywords if word in content]
                if flagged_words:
                    validation_result["warnings"].append(
                        f"Field '{field}' contains potentially inappropriate content: {', '.join(flagged_words)}"
                    )
        
        # Character count validation
        if data.get("characters") and len(data["characters"]) > 500:
            validation_result["warnings"].append("Character description is very long - consider shortening for better focus")
        
        # If no errors, mark as ready for next agent
        if validation_result["is_valid"] and len(validation_result["warnings"]) == 0:
            validation_result["project_ready"] = True
        elif validation_result["is_valid"] and len(validation_result["warnings"]) > 0:
            validation_result["project_ready"] = "needs_review"  # Will go to compliance agent
        
        return json.dumps(validation_result, indent=2)
        
    except json.JSONDecodeError:
        return json.dumps({
            "is_valid": False,
            "errors": ["Invalid JSON format in form data"],
            "warnings": [],
            "project_ready": False
        }, indent=2)
    except Exception as e:
        return json.dumps({
            "is_valid": False,
            "errors": [f"Validation error: {str(e)}"],
            "warnings": [],
            "project_ready": False
        }, indent=2)

def create_project_id(student_data: str) -> str:
    """
    Create a unique project ID and initialize project tracking.
    
    Args:
        student_data: JSON string containing validated student form data
        
    Returns:
        JSON string with project ID and initial project metadata
    """
    try:
        data = json.loads(student_data)
        
        # Generate unique project ID
        timestamp = datetime.datetime.now().strftime("%Y%m%d")
        unique_id = str(uuid.uuid4())[:8]
        project_id = f"STY-{timestamp}-{unique_id}"
        
        # Extract book title for project metadata
        book_title = data.get("book_title", "Unknown Book")
        if " by " in book_title:
            title_only = book_title.split(" by ")[0]
        else:
            title_only = book_title
        
        project_metadata = {
            "project_id": project_id,
            "created_at": datetime.datetime.now().isoformat(),
            "status": "intake_complete",
            "book_selected": title_only,
            "student_modifications": {
                "setting": data.get("setting", ""),
                "characters": data.get("characters", ""),
                "time_period": data.get("time_period", ""),
                "theme": data.get("theme", ""),
                "tone": data.get("tone", ""),
                "genre": data.get("genre", ""),
                "special_elements": data.get("special_elements", "")
            },
            "workflow_stage": "research_pending",
            "next_agent": "research_specialist"
        }
        
        return json.dumps(project_metadata, indent=2)
        
    except Exception as e:
        return json.dumps({
            "error": f"Failed to create project ID: {str(e)}",
            "project_id": None
        }, indent=2)

def check_basic_educational_requirements(project_data: str) -> str:
    """
    Check basic educational requirements using the standards file.
    
    Args:
        project_data: JSON string containing project metadata
        
    Returns:
        JSON string with educational compliance check results
    """
    try:
        project = json.loads(project_data)
        standards = load_educational_standards()
        
        compliance_check = {
            "educational_compliance": "preliminary_pass",
            "target_standards": [],
            "grade_recommendations": [],
            "potential_learning_outcomes": []
        }
        
        # Determine target grade levels based on selected book
        target_grades = standards["common_core_standards"]["metadata"]["target_grades"]
        compliance_check["grade_recommendations"] = target_grades
        
        # Identify applicable standards based on the project
        writing_standards = standards["common_core_standards"]["grade_levels"]["6-8"]["writing"]["standards"]
        reading_standards = standards["common_core_standards"]["grade_levels"]["6-8"]["reading_literature"]["standards"]
        
        # This project will definitely hit narrative writing standards
        for grade in target_grades:
            writing_code = f"W.{grade}.3"
            if writing_code in writing_standards:
                compliance_check["target_standards"].append({
                    "code": writing_code,
                    "title": writing_standards[writing_code]["title"],
                    "support_level": "high"
                })
        
        # And reading literature analysis standards
        for grade in target_grades:
            reading_codes = [f"RL.{grade}.2", f"RL.{grade}.3"]
            for code in reading_codes:
                if code in reading_standards:
                    compliance_check["target_standards"].append({
                        "code": code,
                        "title": reading_standards[code]["title"],
                        "support_level": "high"
                    })
        
        # Potential learning outcomes based on modifications
        modifications = project.get("student_modifications", {})
        if modifications.get("setting"):
            compliance_check["potential_learning_outcomes"].append("Setting analysis and adaptation")
        if modifications.get("characters"):
            compliance_check["potential_learning_outcomes"].append("Character development and voice")
        if modifications.get("theme"):
            compliance_check["potential_learning_outcomes"].append("Theme exploration and development")
        
        return json.dumps(compliance_check, indent=2)
        
    except Exception as e:
        return json.dumps({
            "educational_compliance": "error",
            "error": f"Failed to check educational requirements: {str(e)}"
        }, indent=2)

def route_to_research_agent(project_data: str) -> str:
    """
    Prepare project handoff to the Research Agent.
    
    Args:
        project_data: JSON string containing complete project metadata
        
    Returns:
        JSON string with routing information and handoff message
    """
    try:
        project = json.loads(project_data)
        
        handoff_package = {
            "from_agent": "intake_coordinator",
            "to_agent": "research_specialist",
            "handoff_status": "ready",
            "project_id": project.get("project_id"),
            "handoff_message": f"Project {project.get('project_id')} validated and ready for literary analysis. Student wants to adapt '{project.get('book_selected')}' with new setting: '{project.get('student_modifications', {}).get('setting', 'not specified')}'",
            "routing_data": {
                "book_to_analyze": project.get("book_selected"),
                "student_modifications": project.get("student_modifications"),
                "educational_targets": project.get("target_standards", []),
                "priority_level": "standard",
                "expected_completion": "5_minutes"
            },
            "next_action": "begin_literary_analysis",
            "timestamp": datetime.datetime.now().isoformat()
        }
        
        return json.dumps(handoff_package, indent=2)
        
    except Exception as e:
        return json.dumps({
            "handoff_status": "error",
            "error": f"Failed to route to research agent: {str(e)}"
        }, indent=2)
    