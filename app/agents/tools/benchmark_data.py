
import json
import os
from typing import Dict, List, Optional

def load_automation_benchmarks() -> Dict:
    """Load automation benchmarks from JSON file"""
    try:
        current_dir = os.path.dirname(os.path.abspath(__file__))
        benchmarks_path = os.path.join(current_dir, '..', '..', 'data', 'automation_benchmarks.json')
        
        with open(benchmarks_path, 'r') as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading automation benchmarks: {e}")
        return {}

def get_industry_standards(industry_type: str) -> Optional[Dict]:
    """
    Get industry automation standards
    industry_type: customer_service, finance_operations, sales_operations
    """
    benchmarks = load_automation_benchmarks()
    
    if not benchmarks:
        return None
    
    industry_standards = benchmarks.get("automation_benchmarks", {}).get("industry_standards", {})
    return industry_standards.get(industry_type)

def get_complexity_benchmarks(complexity_level: str) -> Optional[Dict]:
    """
    Get benchmarks for specific automation complexity level
    """
    benchmarks = load_automation_benchmarks()
    
    if not benchmarks:
        return None
    
    complexity_indicators = benchmarks.get("process_complexity_indicators", {})
    roi_expectations = benchmarks.get("roi_calculation_models", {}).get("roi_expectations_by_complexity", {})
    
    complexity_data = complexity_indicators.get(complexity_level, {})
    roi_data = roi_expectations.get(complexity_level, {})
    
    return {
        **complexity_data,
        **roi_data
    }

def get_automation_efficiency_rate(complexity_level: str) -> float:
    """
    Get automation efficiency rate for complexity level
    """
    benchmarks = load_automation_benchmarks()
    
    if not benchmarks:
        return 0.7  # Default fallback
    
    efficiency_rates = benchmarks.get("roi_calculation_models", {}).get("automation_efficiency_rates", {})
    return efficiency_rates.get(complexity_level, 0.7)

def get_labor_cost_benchmark(industry_type: str) -> Dict:
    """
    Get labor cost benchmarks for industry
    """
    # Standard industry labor costs
    labor_costs = {
        "customer_service": {"min": 45, "max": 65, "average": 55},
        "finance_operations": {"min": 65, "max": 85, "average": 75},
        "sales_operations": {"min": 75, "max": 95, "average": 85},
        "it_operations": {"min": 80, "max": 120, "average": 100}
    }
    
    return labor_costs.get(industry_type, {"min": 60, "max": 80, "average": 70})

def compare_to_industry_benchmark(
    user_metrics: Dict,
    industry_type: str,
    complexity_level: str
) -> Dict:
    """
    Compare user process metrics to industry benchmarks
    """
    industry_data = get_industry_standards(industry_type)
    complexity_data = get_complexity_benchmarks(complexity_level)
    
    if not industry_data or not complexity_data:
        return {"error": "Benchmark data not available"}
    
    comparison = {
        "industry_automation_rate": industry_data.get("typical_automation_rate", "N/A"),
        "industry_time_reduction": industry_data.get("average_time_reduction", "N/A"),
        "industry_error_reduction": industry_data.get("error_reduction", "N/A"),
        "expected_roi_range": complexity_data.get("roi_percentage", "N/A"),
        "expected_payback_period": complexity_data.get("payback_period", "N/A"),
        "implementation_timeline": complexity_data.get("implementation_timeline", "N/A"),
        "success_rate": complexity_data.get("success_rate", "N/A")
    }
    
    # Add competitive positioning
    if "current_time_minutes" in user_metrics and "automated_time_minutes" in user_metrics:
        time_reduction = ((user_metrics["current_time_minutes"] - user_metrics["automated_time_minutes"]) / 
                         user_metrics["current_time_minutes"]) * 100
        
        comparison["user_time_reduction"] = f"{time_reduction:.0f}%"
        comparison["vs_industry_time_reduction"] = "Above average" if time_reduction > 75 else "Average" if time_reduction > 50 else "Below average"
    
    return comparison

def get_real_world_examples(complexity_level: str, industry_type: str = None) -> List[Dict]:
    """
    Get real-world automation success examples
    """
    benchmarks = load_automation_benchmarks()
    
    if not benchmarks:
        return []
    
    examples = benchmarks.get("real_world_benchmarks", {})
    customer_results = examples.get("automation_customer_results", {})
    enterprise_benchmarks = examples.get("enterprise_automation_benchmarks", {})
    
    relevant_examples = []
    
    # Filter examples by complexity level
    for example_name, example_data in customer_results.items():
        if example_data.get("automation_type") == complexity_level:
            relevant_examples.append({
                "company": example_name.replace("_", " ").title(),
                "industry": example_data.get("industry", "Various"),
                "result": example_data.get("roi_percentage") or example_data.get("improvement"),
                "timeframe": example_data.get("timeframe", "Not specified"),
                "type": "Customer Success"
            })
    
    # Add enterprise benchmarks
    for study_name, study_data in enterprise_benchmarks.items():
        if study_data.get("automation_type") == complexity_level:
            relevant_examples.append({
                "company": "Enterprise Study",
                "industry": "Multi-Industry",
                "result": f"{study_data.get('roi_percentage')} ROI",
                "timeframe": study_data.get("timeframe"),
                "additional_benefits": study_data.get("productivity_improvement"),
                "type": "Industry Study"
            })
    
    return relevant_examples

def get_implementation_cost_estimates(complexity_level: str, platform_type: str = "platform_native") -> Dict:
    """
    Get implementation cost estimates based on complexity and platform
    """
    benchmarks = load_automation_benchmarks()
    
    if not benchmarks:
        return {}
    
    implementation_costs = benchmarks.get("implementation_costs", {})
    
    if platform_type in implementation_costs:
        platform_costs = implementation_costs[platform_type]
        
        # Find tools suitable for complexity level
        suitable_tools = {}
        for tool_name, tool_data in platform_costs.items():
            if complexity_level in tool_data.get("complexity_suitability", []):
                suitable_tools[tool_name] = tool_data
        
        return suitable_tools
    
    return {}

def get_risk_factors_by_complexity(complexity_level: str) -> Dict:
    """
    Get risk factors and mitigation strategies for complexity level
    """
    benchmarks = load_automation_benchmarks()
    
    if not benchmarks:
        return {}
    
    # Get success factors
    success_factors = benchmarks.get("success_factors", {})
    
    # Get complexity-specific success rates
    complexity_data = get_complexity_benchmarks(complexity_level)
    success_rate = complexity_data.get("success_rate", "70-80%") if complexity_data else "70-80%"
    
    return {
        "success_rate": success_rate,
        "high_success_indicators": success_factors.get("high_success_indicators", []),
        "risk_factors": success_factors.get("risk_factors", []),
        "mitigation_strategies": success_factors.get("mitigation_strategies", [])
    }

def generate_benchmark_comparison_summary(
    user_process: Dict,
    industry_type: str,
    complexity_level: str
) -> str:
    """
    Generate a comprehensive benchmark comparison summary
    """
    industry_data = get_industry_standards(industry_type)
    complexity_data = get_complexity_benchmarks(complexity_level)
    examples = get_real_world_examples(complexity_level)
    
    if not industry_data or not complexity_data:
        return "Benchmark data not available for comparison."
    
    summary = f"""
**Industry Benchmark Comparison ({industry_type.replace('_', ' ').title()}):**
- Typical automation rate: {industry_data.get('typical_automation_rate', 'N/A')}
- Average time reduction: {industry_data.get('average_time_reduction', 'N/A')}
- Error reduction potential: {industry_data.get('error_reduction', 'N/A')}
- ROI timeline: {industry_data.get('roi_timeline', 'N/A')}

**Complexity Level Benchmarks ({complexity_level.replace('_', ' ').title()}):**
- Expected ROI: {complexity_data.get('roi_percentage', 'N/A')}
- Payback period: {complexity_data.get('payback_period', 'N/A')}
- Implementation timeline: {complexity_data.get('implementation_timeline', 'N/A')}
- Success rate: {complexity_data.get('success_rate', 'N/A')}

**Real-World Examples:**
{chr(10).join([f"• {ex['company']} ({ex['industry']}): {ex['result']} in {ex['timeframe']}" for ex in examples[:3]])}
"""
    
    return summary.strip()