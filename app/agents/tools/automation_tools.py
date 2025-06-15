
import json
import os
from typing import Dict, List, Optional, Tuple

def load_process_templates() -> Dict:
    """Load process templates from JSON file"""
    try:
        current_dir = os.path.dirname(os.path.abspath(__file__))
        templates_path = os.path.join(current_dir, '..', '..', 'data', 'process_templates.json')
        
        with open(templates_path, 'r') as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading process templates: {e}")
        return {}

def determine_process_complexity(
    decision_points: int,
    systems_involved: int,
    people_involved: int,
    manual_percentage: int,
    approval_steps: int = None
) -> str:
    """
    Determine automation complexity level based on process characteristics
    Returns: basic_automation, process_automation, integration_automation, or intelligent_automation
    """
    
    # Score each factor (1-4 scale)
    decision_score = 1 if decision_points <= 1 else 2 if decision_points <= 3 else 3 if decision_points <= 10 else 4
    systems_score = 1 if systems_involved <= 2 else 2 if systems_involved <= 4 else 3 if systems_involved <= 10 else 4
    people_score = 1 if people_involved <= 2 else 2 if people_involved <= 5 else 3 if people_involved <= 15 else 4
    manual_score = 1 if manual_percentage <= 40 else 2 if manual_percentage <= 70 else 3 if manual_percentage <= 80 else 4
    
    # Calculate average complexity score
    avg_score = (decision_score + systems_score + people_score + manual_score) / 4
    
    # Map to complexity levels
    if avg_score <= 1.5:
        return "basic_automation"
    elif avg_score <= 2.5:
        return "process_automation"
    elif avg_score <= 3.5:
        return "integration_automation"
    else:
        return "intelligent_automation"

def assess_automation_readiness(
    data_quality: int,
    system_integration: int,
    infrastructure_stability: int,
    security_framework: int,
    process_standardization: int,
    volume_frequency: int,
    rule_based_nature: int,
    exception_handling: int,
    executive_sponsorship: int,
    change_management: int,
    skills_resources: int,
    budget_timeline: int
) -> Dict:
    """
    Calculate automation readiness score based on assessment framework
    All inputs should be 1-10 scores
    """
    
    # Technical readiness (30% weight)
    technical_avg = (data_quality + system_integration + infrastructure_stability + security_framework) / 4
    technical_weighted = technical_avg * 0.30
    
    # Process readiness (35% weight)  
    process_avg = (process_standardization + volume_frequency + rule_based_nature + exception_handling) / 4
    process_weighted = process_avg * 0.35
    
    # Organizational readiness (35% weight)
    org_avg = (executive_sponsorship + change_management + skills_resources + budget_timeline) / 4
    org_weighted = org_avg * 0.35
    
    # Overall readiness score
    overall_score = technical_weighted + process_weighted + org_weighted
    
    # Determine readiness level
    if overall_score >= 8.0:
        readiness_level = "High"
    elif overall_score >= 6.0:
        readiness_level = "Medium"
    else:
        readiness_level = "Low"
    
    return {
        "overall_score": round(overall_score, 1),
        "readiness_level": readiness_level,
        "technical_score": round(technical_avg, 1),
        "process_score": round(process_avg, 1),
        "organizational_score": round(org_avg, 1),
        "recommendations": get_readiness_recommendations(overall_score, technical_avg, process_avg, org_avg)
    }

def get_readiness_recommendations(overall: float, technical: float, process: float, org: float) -> List[str]:
    """Generate specific recommendations based on readiness scores"""
    recommendations = []
    
    if technical < 6.0:
        recommendations.append("Improve data quality and system integration capabilities")
    if process < 6.0:
        recommendations.append("Standardize and document current processes")
    if org < 6.0:
        recommendations.append("Strengthen executive sponsorship and change management")
    if overall < 6.0:
        recommendations.append("Consider starting with a pilot project to build capabilities")
    
    return recommendations

def identify_automation_opportunities(
    process_type: str,
    current_time_minutes: int,
    monthly_volume: int,
    error_rate_percentage: int,
    complexity_level: str
) -> Dict:
    """
    Identify specific automation opportunities based on process analysis
    """
    
    opportunities = []
    
    # Time-based opportunities
    if current_time_minutes > 60:
        opportunities.append("Significant time reduction through workflow automation")
    elif current_time_minutes > 30:
        opportunities.append("Moderate time savings through process streamlining")
    
    # Volume-based opportunities
    if monthly_volume > 500:
        opportunities.append("High-volume processing ideal for automation ROI")
    elif monthly_volume > 100:
        opportunities.append("Regular volume justifies automation investment")
    
    # Error reduction opportunities
    if error_rate_percentage > 10:
        opportunities.append("Error reduction through automated validation and processing")
    elif error_rate_percentage > 5:
        opportunities.append("Quality improvement through consistent automated execution")
    
    # Complexity-specific opportunities
    complexity_opportunities = {
        "basic_automation": [
            "Simple workflow automation with immediate impact",
            "Quick wins through platform-native tools"
        ],
        "process_automation": [
            "Cross-system integration and data synchronization",
            "Multi-step process orchestration"
        ],
        "integration_automation": [
            "Enterprise-wide process coordination",
            "Real-time event-driven automation"
        ],
        "intelligent_automation": [
            "AI-powered decision making and optimization",
            "Predictive analytics and adaptive processing"
        ]
    }
    
    opportunities.extend(complexity_opportunities.get(complexity_level, []))
    
    return {
        "automation_opportunities": opportunities,
        "complexity_level": complexity_level,
        "automation_coverage_estimate": get_automation_coverage(complexity_level),
        "implementation_priority": get_implementation_priority(monthly_volume, current_time_minutes, error_rate_percentage)
    }

def get_automation_coverage(complexity_level: str) -> str:
    """Estimate automation coverage percentage by complexity"""
    coverage_map = {
        "basic_automation": "70-85%",
        "process_automation": "60-75%", 
        "integration_automation": "50-65%",
        "intelligent_automation": "40-55%"
    }
    return coverage_map.get(complexity_level, "50-70%")

def get_implementation_priority(volume: int, time_minutes: int, error_rate: int) -> str:
    """Calculate implementation priority based on impact factors"""
    
    # Score each factor
    volume_score = 3 if volume > 500 else 2 if volume > 200 else 1
    time_score = 3 if time_minutes > 120 else 2 if time_minutes > 30 else 1
    error_score = 3 if error_rate > 15 else 2 if error_rate > 5 else 1
    
    total_score = volume_score + time_score + error_score
    
    if total_score >= 8:
        return "High Priority"
    elif total_score >= 6:
        return "Medium Priority"
    else:
        return "Low Priority"

def get_process_template_by_type(process_type: str, specific_process: str = None) -> Optional[Dict]:
    """
    Get specific process template from templates database
    """
    templates = load_process_templates()
    
    if not templates:
        return None
    
    automation_templates = templates.get("automation_process_templates", {})
    
    if process_type in automation_templates:
        if specific_process and specific_process in automation_templates[process_type]:
            return automation_templates[process_type][specific_process]
        else:
            return automation_templates[process_type]
    
    return None

def generate_process_analysis_summary(
    complexity_level: str,
    readiness_score: float,
    opportunities: List[str],
    implementation_priority: str
) -> str:
    """
    Generate a comprehensive process analysis summary
    """
    
    summary = f"""
**Process Complexity Assessment:**
Classification: {complexity_level.replace('_', ' ').title()}
Automation Readiness Score: {readiness_score}/10
Implementation Priority: {implementation_priority}

**Key Automation Opportunities:**
{chr(10).join([f"• {opp}" for opp in opportunities[:5]])}

**Recommended Approach:**
Based on the {complexity_level.replace('_', ' ')} classification, this process is suitable for {"immediate implementation" if readiness_score >= 7 else "phased implementation with preparation"}.
"""
    
    return summary.strip()