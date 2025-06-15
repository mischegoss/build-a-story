
import math
from typing import Dict, List, Tuple

def calculate_time_savings(
    monthly_volume: int,
    current_time_minutes: int,
    automation_efficiency: float
) -> Dict:
    """
    Calculate time savings from automation
    """
    
    # Current monthly time in hours
    current_monthly_hours = (monthly_volume * current_time_minutes) / 60
    
    # Automated time (reduced by efficiency rate)
    automated_monthly_hours = current_monthly_hours * (1 - automation_efficiency)
    
    # Time saved
    hours_saved_monthly = current_monthly_hours - automated_monthly_hours
    hours_saved_annually = hours_saved_monthly * 12
    
    # Percentage savings
    percentage_saved = automation_efficiency * 100
    
    return {
        "current_monthly_hours": round(current_monthly_hours, 1),
        "automated_monthly_hours": round(automated_monthly_hours, 1),
        "hours_saved_monthly": round(hours_saved_monthly, 1),
        "hours_saved_annually": round(hours_saved_annually, 1),
        "percentage_time_saved": round(percentage_saved, 1)
    }

def calculate_cost_savings(
    hours_saved_monthly: float,
    hourly_labor_cost: float,
    overhead_multiplier: float = 1.3
) -> Dict:
    """
    Calculate cost savings including overhead
    """
    
    # Direct labor savings
    direct_monthly_savings = hours_saved_monthly * hourly_labor_cost
    direct_annual_savings = direct_monthly_savings * 12
    
    # Include overhead (benefits, facilities, etc.)
    total_monthly_savings = direct_monthly_savings * overhead_multiplier
    total_annual_savings = total_monthly_savings * 12
    
    return {
        "direct_monthly_savings": round(direct_monthly_savings, 0),
        "direct_annual_savings": round(direct_annual_savings, 0),
        "total_monthly_savings": round(total_monthly_savings, 0),
        "total_annual_savings": round(total_annual_savings, 0),
        "overhead_multiplier": overhead_multiplier
    }

def calculate_roi_metrics(
    annual_savings: float,
    implementation_cost: float,
    annual_operating_cost: float = 0
) -> Dict:
    """
    Calculate comprehensive ROI metrics
    """
    
    # Net annual benefit
    net_annual_benefit = annual_savings - annual_operating_cost
    
    # ROI percentage
    roi_percentage = (net_annual_benefit / implementation_cost) * 100 if implementation_cost > 0 else 0
    
    # Payback period in months
    monthly_net_benefit = net_annual_benefit / 12
    payback_months = implementation_cost / monthly_net_benefit if monthly_net_benefit > 0 else float('inf')
    
    # NPV calculation (3 years, 10% discount rate)
    discount_rate = 0.10
    npv_3_years = sum([net_annual_benefit / ((1 + discount_rate) ** year) for year in range(1, 4)]) - implementation_cost
    
    return {
        "roi_percentage": round(roi_percentage, 1),
        "payback_months": round(payback_months, 1) if payback_months != float('inf') else "N/A",
        "payback_years": round(payback_months / 12, 1) if payback_months != float('inf') else "N/A",
        "net_annual_benefit": round(net_annual_benefit, 0),
        "npv_3_years": round(npv_3_years, 0),
        "break_even_point": f"{payback_months:.1f} months" if payback_months != float('inf') else "Never"
    }

def calculate_error_reduction_value(
    monthly_volume: int,
    current_error_rate: float,
    automated_error_rate: float,
    cost_per_error: float
) -> Dict:
    """
    Calculate financial value of error reduction
    """
    
    # Current errors per month
    current_errors_monthly = monthly_volume * (current_error_rate / 100)
    current_error_cost_monthly = current_errors_monthly * cost_per_error
    
    # Future errors per month
    future_errors_monthly = monthly_volume * (automated_error_rate / 100)
    future_error_cost_monthly = future_errors_monthly * cost_per_error
    
    # Error reduction value
    error_reduction_monthly = current_error_cost_monthly - future_error_cost_monthly
    error_reduction_annual = error_reduction_monthly * 12
    
    # Error rate improvement
    error_rate_improvement = current_error_rate - automated_error_rate
    error_reduction_percentage = (error_rate_improvement / current_error_rate) * 100 if current_error_rate > 0 else 0
    
    return {
        "current_errors_monthly": round(current_errors_monthly, 1),
        "future_errors_monthly": round(future_errors_monthly, 1),
        "errors_eliminated_monthly": round(current_errors_monthly - future_errors_monthly, 1),
        "error_cost_savings_monthly": round(error_reduction_monthly, 0),
        "error_cost_savings_annual": round(error_reduction_annual, 0),
        "error_reduction_percentage": round(error_reduction_percentage, 1)
    }

def generate_scenario_analysis(
    base_annual_savings: float,
    base_implementation_cost: float,
    base_annual_operating_cost: float = 0
) -> Dict:
    """
    Generate conservative, likely, and optimistic scenarios
    """
    
    scenarios = {}
    
    # Conservative scenario (80% of benefits, 120% of costs)
    conservative_savings = base_annual_savings * 0.8
    conservative_cost = base_implementation_cost * 1.2
    conservative_operating = base_annual_operating_cost * 1.2
    
    scenarios["conservative"] = calculate_roi_metrics(
        conservative_savings, 
        conservative_cost, 
        conservative_operating
    )
    scenarios["conservative"]["scenario_name"] = "Conservative (80% benefits, 120% costs)"
    
    # Most likely scenario (base case)
    scenarios["most_likely"] = calculate_roi_metrics(
        base_annual_savings,
        base_implementation_cost,
        base_annual_operating_cost
    )
    scenarios["most_likely"]["scenario_name"] = "Most Likely (Base Case)"
    
    # Optimistic scenario (120% of benefits, 90% of costs)
    optimistic_savings = base_annual_savings * 1.2
    optimistic_cost = base_implementation_cost * 0.9
    optimistic_operating = base_annual_operating_cost * 0.9
    
    scenarios["optimistic"] = calculate_roi_metrics(
        optimistic_savings,
        optimistic_cost,
        optimistic_operating
    )
    scenarios["optimistic"]["scenario_name"] = "Optimistic (120% benefits, 90% costs)"
    
    return scenarios

def calculate_implementation_costs(
    complexity_level: str,
    monthly_volume: int,
    systems_involved: int,
    custom_factors: Dict = None
) -> Dict:
    """
    Estimate implementation costs based on complexity and scope
    """
    
    # Base cost ranges by complexity
    base_costs = {
        "basic_automation": {"min": 15000, "max": 50000},
        "process_automation": {"min": 25000, "max": 100000},
        "integration_automation": {"min": 75000, "max": 250000},
        "intelligent_automation": {"min": 150000, "max": 500000}
    }
    
    base_range = base_costs.get(complexity_level, {"min": 25000, "max": 100000})
    
    # Volume multiplier
    volume_multiplier = 1.0
    if monthly_volume > 1000:
        volume_multiplier = 1.2
    elif monthly_volume > 500:
        volume_multiplier = 1.1
    
    # Systems complexity multiplier
    systems_multiplier = 1.0 + (systems_involved - 1) * 0.1
    
    # Calculate estimated costs
    min_cost = base_range["min"] * volume_multiplier * systems_multiplier
    max_cost = base_range["max"] * volume_multiplier * systems_multiplier
    estimated_cost = (min_cost + max_cost) / 2
    
    # Add contingency (15-25%)
    contingency_rate = 0.20
    total_cost_with_contingency = estimated_cost * (1 + contingency_rate)
    
    # Breakdown
    development_cost = estimated_cost * 0.60
    integration_cost = estimated_cost * 0.25
    training_cost = estimated_cost * 0.15
    contingency_cost = estimated_cost * contingency_rate
    
    return {
        "estimated_implementation_cost": round(estimated_cost, 0),
        "total_cost_with_contingency": round(total_cost_with_contingency, 0),
        "cost_range": {
            "minimum": round(min_cost, 0),
            "maximum": round(max_cost, 0)
        },
        "cost_breakdown": {
            "development": round(development_cost, 0),
            "integration": round(integration_cost, 0),
            "training": round(training_cost, 0),
            "contingency": round(contingency_cost, 0)
        },
        "factors_applied": {
            "volume_multiplier": volume_multiplier,
            "systems_multiplier": systems_multiplier,
            "contingency_rate": contingency_rate
        }
    }

def generate_financial_summary(
    time_savings: Dict,
    cost_savings: Dict,
    roi_metrics: Dict,
    implementation_costs: Dict,
    error_reduction: Dict = None
) -> str:
    """
    Generate comprehensive financial summary
    """
    
    total_annual_benefits = cost_savings["total_annual_savings"]
    if error_reduction:
        total_annual_benefits += error_reduction["error_cost_savings_annual"]
    
    summary = f"""
**FINANCIAL ANALYSIS SUMMARY**

**Time Savings:**
- Monthly time saved: {time_savings['hours_saved_monthly']} hours
- Annual time saved: {time_savings['hours_saved_annually']} hours  
- Efficiency improvement: {time_savings['percentage_time_saved']}%

**Cost Savings:**
- Annual labor savings: ${cost_savings['total_annual_savings']:,.0f}
- Monthly savings: ${cost_savings['total_monthly_savings']:,.0f}
- Includes {cost_savings['overhead_multiplier']}x overhead factor

**Investment & ROI:**
- Implementation cost: ${implementation_costs['total_cost_with_contingency']:,.0f}
- Annual ROI: {roi_metrics['roi_percentage']}%
- Payback period: {roi_metrics['payback_months']} months
- 3-year NPV: ${roi_metrics['npv_3_years']:,.0f}

**Quality Impact:**"""
    
    if error_reduction:
        summary += f"""
- Errors eliminated: {error_reduction['errors_eliminated_monthly']}/month
- Error reduction value: ${error_reduction['error_cost_savings_annual']:,.0f}/year
- Error rate improvement: {error_reduction['error_reduction_percentage']}%"""
    else:
        summary += "\n• Error reduction analysis not performed"
    
    return summary.strip()