// Real industry automation benchmarks
export const automationBenchmarks = {
  industry_standards: {
    customer_service: {
      typical_automation_rate: '65-85%',
      average_time_reduction: '70-90%',
      error_reduction: '85-95%',
      roi_timeline: '3-6 months',
      common_processes: [
        {
          process: 'password_reset',
          manual_time_minutes: 15,
          automated_time_minutes: 2,
          monthly_volume_range: '200-1000',
          labor_cost_per_hour: 50,
          automation_complexity: 'low',
        },
        {
          process: 'ticket_routing',
          manual_time_minutes: 8,
          automated_time_minutes: 1,
          monthly_volume_range: '500-2000',
          labor_cost_per_hour: 45,
          automation_complexity: 'medium',
        },
        {
          process: 'customer_onboarding',
          manual_time_hours: 4,
          automated_time_hours: 0.5,
          monthly_volume_range: '50-300',
          labor_cost_per_hour: 55,
          automation_complexity: 'high',
        },
      ],
    },
    finance_operations: {
      typical_automation_rate: '70-90%',
      average_time_reduction: '75-95%',
      error_reduction: '90-98%',
      roi_timeline: '2-4 months',
      common_processes: [
        {
          process: 'invoice_processing',
          manual_time_hours: 2,
          automated_time_minutes: 15,
          monthly_volume_range: '100-500',
          labor_cost_per_hour: 65,
          automation_complexity: 'medium',
        },
        {
          process: 'expense_approval',
          manual_time_minutes: 20,
          automated_time_minutes: 2,
          monthly_volume_range: '200-800',
          labor_cost_per_hour: 70,
          automation_complexity: 'low',
        },
      ],
    },
    sales_operations: {
      typical_automation_rate: '60-80%',
      average_time_reduction: '60-85%',
      error_reduction: '80-90%',
      roi_timeline: '4-8 months',
      common_processes: [
        {
          process: 'lead_qualification',
          manual_time_hours: 2,
          automated_time_minutes: 30,
          monthly_volume_range: '100-500',
          labor_cost_per_hour: 75,
          automation_complexity: 'medium',
        },
        {
          process: 'quote_generation',
          manual_time_hours: 1.5,
          automated_time_minutes: 10,
          monthly_volume_range: '50-200',
          labor_cost_per_hour: 80,
          automation_complexity: 'low',
        },
      ],
    },
  },
  roi_calculation_models: {
    time_savings_formula: {
      current_monthly_time: '(monthly_volume * time_per_process_minutes)',
      automated_monthly_time:
        'current_monthly_time * (1 - automation_efficiency)',
      time_saved_monthly: 'current_monthly_time - automated_monthly_time',
      annual_time_saved: 'time_saved_monthly * 12',
    },
    cost_savings_formula: {
      current_monthly_cost: '(current_monthly_time / 60) * hourly_labor_cost',
      automated_monthly_cost:
        '(automated_monthly_time / 60) * hourly_labor_cost',
      monthly_savings: 'current_monthly_cost - automated_monthly_cost',
      annual_savings: 'monthly_savings * 12',
    },
    automation_efficiency_rates: {
      low_complexity: 0.7,
      medium_complexity: 0.8,
      high_complexity: 0.9,
    },
  },
  process_complexity_indicators: {
    low_complexity: {
      decision_points: '0-1',
      approval_steps: '0-1',
      systems_involved: '1-2',
      implementation_timeline: '2-6 weeks',
      success_rate: '90-95%',
    },
    medium_complexity: {
      decision_points: '2-3',
      approval_steps: '2-3',
      systems_involved: '3-4',
      implementation_timeline: '6-12 weeks',
      success_rate: '80-90%',
    },
    high_complexity: {
      decision_points: '4+',
      approval_steps: '4+',
      systems_involved: '5+',
      implementation_timeline: '12-24 weeks',
      success_rate: '70-80%',
    },
  },
  business_case_templates: {
    executive_summary_structure: {
      problem_statement:
        'Current {process_type} process creates {pain_points} affecting {stakeholders}',
      solution_overview:
        'Proposed {automation_type} will {key_benefits} within {timeline}',
      financial_impact:
        '{time_savings} time reduction, ${cost_savings} annual savings, {error_reduction}% error reduction',
      implementation_approach:
        '{complexity_level} implementation requiring {timeline} and {resources}',
    },
  },
}
