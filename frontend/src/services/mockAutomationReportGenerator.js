// Mock automation business case generation services
import {
  mockAutomationProcessData,
  automationROIInsights,
} from '../mockdata/automationProcessData.js'
import { automationBenchmarks } from '../mockdata/automationBenchmarks.js'

// Generate audience-appropriate tone and business case depth
const getAudienceStyle = audience => {
  const styles = {
    'Executive leadership (C-Suite)': {
      tone: 'strategic',
      focus: 'roi_impact',
      detail_level: 'executive_summary',
      metrics_emphasis: 'financial_returns',
    },
    'Operations team': {
      tone: 'operational',
      focus: 'process_improvement',
      detail_level: 'detailed_analysis',
      metrics_emphasis: 'efficiency_gains',
    },
    'IT department': {
      tone: 'technical',
      focus: 'implementation_feasibility',
      detail_level: 'technical_specifications',
      metrics_emphasis: 'system_integration',
    },
    'Finance department': {
      tone: 'financial',
      focus: 'cost_benefit_analysis',
      detail_level: 'financial_modeling',
      metrics_emphasis: 'payback_period',
    },
    'Cross-functional stakeholders': {
      tone: 'collaborative',
      focus: 'holistic_automation',
      detail_level: 'balanced_view',
      metrics_emphasis: 'comprehensive_roi',
    },
  }
  return styles[audience] || styles['Cross-functional stakeholders']
}

// Generate goal-specific automation approaches
const getAutomationGoalFocus = (goal, scenario, audienceStyle) => {
  const goalStrategies = {
    'Justify automation investment to leadership': {
      approach: 'investment_justification',
      primary_deliverable: 'executive_business_case',
      success_metric: 'roi_achievement',
    },
    'Calculate ROI and payback period': {
      approach: 'financial_modeling',
      primary_deliverable: 'roi_analysis',
      success_metric: 'payback_timeline',
    },
    'Compare automation vendors/solutions': {
      approach: 'vendor_evaluation',
      primary_deliverable: 'solution_comparison',
      success_metric: 'vendor_selection',
    },
    'Plan automation implementation roadmap': {
      approach: 'implementation_planning',
      primary_deliverable: 'deployment_roadmap',
      success_metric: 'milestone_achievement',
    },
    'Demonstrate automation potential (demo/test)': {
      approach: 'proof_of_concept',
      primary_deliverable: 'automation_demonstration',
      success_metric: 'stakeholder_buy_in',
    },
  }
  return (
    goalStrategies[goal] ||
    goalStrategies['Justify automation investment to leadership']
  )
}

// Smart benchmark selection based on user input
const selectRelevantBenchmarks = businessScenario => {
  if (businessScenario.includes('Customer Service')) {
    return automationBenchmarks.industry_standards.customer_service
  }
  if (
    businessScenario.includes('Invoice') ||
    businessScenario.includes('Finance')
  ) {
    return automationBenchmarks.industry_standards.finance_operations
  }
  if (businessScenario.includes('Sales')) {
    return automationBenchmarks.industry_standards.sales_operations
  }
  // Default fallback
  return automationBenchmarks.industry_standards.customer_service
}

// Calculate realistic ROI using benchmark formulas
const calculateRealisticROI = (benchmarkData, userInputs) => {
  const efficiency =
    automationBenchmarks.roi_calculation_models.automation_efficiency_rates

  // Get most relevant process from benchmarks
  const relevantProcess =
    benchmarkData.common_processes.find(
      p => p.automation_complexity === 'medium', // Default to medium complexity
    ) || benchmarkData.common_processes[0]

  // Extract volume from user input (or use benchmark range)
  const monthlyVolume = extractVolumeFromInput(userInputs) || 500
  const timePerProcess = relevantProcess.manual_time_minutes || 30
  const hourlyRate = relevantProcess.labor_cost_per_hour || 60
  const automationRate = efficiency.medium_complexity

  // Calculate using real formulas
  const currentMonthlyTime = monthlyVolume * timePerProcess
  const automatedMonthlyTime = currentMonthlyTime * (1 - automationRate)
  const timeSavedMonthly = currentMonthlyTime - automatedMonthlyTime
  const currentMonthlyCost = (currentMonthlyTime / 60) * hourlyRate
  const automatedMonthlyCost = (automatedMonthlyTime / 60) * hourlyRate
  const monthlySavings = currentMonthlyCost - automatedMonthlyCost
  const annualSavings = monthlySavings * 12

  // Calculate ROI percentage
  const implementationCost = annualSavings * 0.3 // Assume 30% of annual savings
  const roiPercentage =
    ((annualSavings - implementationCost) / implementationCost) * 100

  return {
    monthly_savings: Math.round(monthlySavings),
    annual_savings: Math.round(annualSavings),
    implementation_cost: Math.round(implementationCost),
    roi_percentage: Math.round(roiPercentage),
    payback_months: Math.round(implementationCost / monthlySavings),
    time_reduction_percentage: Math.round(automationRate * 100),
    hours_saved_monthly: Math.round(timeSavedMonthly / 60),
  }
}

// Generate realistic executive summary using benchmark template
const generateBenchmarkExecutiveSummary = (
  automationData,
  benchmarkData,
  roiCalculation,
) => {
  const scenario = automationData.business_scenario
  const department = automationData.customer_segment || 'Operations'

  return `Executive Summary: Industry benchmark analysis of ${scenario.toLowerCase()} reveals significant automation ROI opportunities. Current ${
    automationData.target_kpi || 'operational efficiency'
  } can be improved by ${
    roiCalculation.time_reduction_percentage
  }% through strategic automation deployment in ${department}. Based on ${
    benchmarkData.typical_automation_rate
  } industry automation rates, recommended investment of $${roiCalculation.implementation_cost.toLocaleString()} will deliver $${roiCalculation.annual_savings.toLocaleString()} annual savings with ${
    roiCalculation.payback_months
  }-month payback period, achieving ${Math.round(
    roiCalculation.roi_percentage,
  )}% ROI within ${benchmarkData.roi_timeline}.`
}

// Generate process-specific insights using real benchmark data
const generateBenchmarkAutomationInsights = (
  benchmarkData,
  dataSources,
  roiCalculation,
) => {
  const insights = []

  if (dataSources.includes('Process Volume & Timing Data')) {
    const process = benchmarkData.common_processes[0]
    insights.push(
      `Process Analysis: Industry benchmarks show ${
        process.process
      } automation typically reduces processing time from ${
        process.manual_time_minutes || process.manual_time_hours * 60
      } minutes to ${
        process.automated_time_minutes || process.automated_time_hours * 60
      } minutes per transaction. Current monthly volume analysis indicates ${
        roiCalculation.hours_saved_monthly
      } hours monthly savings potential.`,
    )
  }

  if (dataSources.includes('Cost & Resource Data')) {
    insights.push(
      `Cost Analysis: Benchmark labor costs of $${
        benchmarkData.common_processes[0].labor_cost_per_hour
      }/hour combined with ${
        benchmarkData.error_reduction
      } error reduction rates project annual operational cost savings of $${roiCalculation.annual_savings.toLocaleString()} through automation implementation.`,
    )
  }

  return insights.join(' ')
}

// Generate recommendations based on process complexity
const generateComplexityBasedRecommendations = (
  automationData,
  benchmarkData,
) => {
  // Assess complexity based on user inputs (simplified)
  const complexity = assessProcessComplexity(automationData)
  const complexityData =
    automationBenchmarks.process_complexity_indicators[complexity]

  const baseRecommendations = [
    'Implement intelligent document processing automation',
    'Deploy workflow automation for approval processes',
    'Integrate AI-powered data validation systems',
    'Establish automated reporting dashboards',
  ]

  return baseRecommendations.map(
    rec =>
      `${
        complexity.charAt(0).toUpperCase() + complexity.slice(1)
      } Complexity Automation: ${rec} (${
        complexityData.implementation_timeline
      } timeline, ${complexityData.success_rate} success rate)`,
  )
}

// Assess process complexity based on user inputs
const assessProcessComplexity = automationData => {
  // Simple heuristic based on scenario type
  if (automationData.business_scenario.includes('Invoice'))
    return 'medium_complexity'
  if (automationData.business_scenario.includes('Sales'))
    return 'high_complexity'
  return 'low_complexity'
}

// Extract volume from user input text
const extractVolumeFromInput = userInputs => {
  // Try to extract numbers from success definition or target KPI
  const text = (
    userInputs.target_kpi +
    ' ' +
    userInputs.success_definition
  ).toLowerCase()
  const numberMatch = text.match(/(\d+)/)
  return numberMatch ? parseInt(numberMatch[1]) : null
}

// Mock generated automation business case report
export const generateMockAutomationReport = automationData => {
  const scenario =
    automationData.business_scenario.split(' - ')[0] || 'Automation Process'
  const audienceStyle = getAudienceStyle(automationData.report_audience)
  const goalFocus = getAutomationGoalFocus(
    automationData.report_goal,
    scenario,
    audienceStyle,
  )
  const department = automationData.customer_segment || 'Operations'
  const dataSources = automationData.dataSourcesList || []

  // Get real benchmark data for this scenario
  const benchmarkData = selectRelevantBenchmarks(scenario)

  // Calculate realistic ROI using benchmark formulas
  const roiCalculation = calculateRealisticROI(benchmarkData, automationData)

  // Generate realistic content using benchmarks
  const executiveSummary = generateBenchmarkExecutiveSummary(
    automationData,
    benchmarkData,
    roiCalculation,
  )
  const automationInsights = generateBenchmarkAutomationInsights(
    benchmarkData,
    dataSources,
    roiCalculation,
  )
  const recommendations = generateComplexityBasedRecommendations(
    automationData,
    benchmarkData,
  )

  // Get complexity assessment
  const complexityLevel = assessProcessComplexity(automationData)
  const complexityData =
    automationBenchmarks.process_complexity_indicators[complexityLevel]

  return {
    project_id: `AUTO-${new Date()
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, '')}-${Math.random().toString(36).substr(2, 6)}`,
    processing_time_seconds: 3.8,
    analysis_complete: true,
    automation_certification: {
      business_case_approved: 'CERTIFIED_FOR_EXECUTIVE_PRESENTATION',
      roi_analysis_validated: true,
      implementation_feasibility_confirmed: true,
      risk_assessment_completed: true,
      benchmark_verified: true,
    },
    deliverables: {
      executive_summary: executiveSummary,
      automation_insights: automationInsights,
      automation_opportunities: [
        `Process efficiency currently ${
          100 - roiCalculation.time_reduction_percentage
        }% manual vs industry automation benchmark of ${
          benchmarkData.typical_automation_rate
        }`,
        `${department} department manual bottlenecks consuming ${roiCalculation.hours_saved_monthly}+ hours monthly of manual effort`,
        `Error reduction potential of ${benchmarkData.error_reduction} through automated validation and quality control`,
        `Integration opportunities exist to achieve ${roiCalculation.time_reduction_percentage}% time reduction and $${roiCalculation.monthly_savings}/month cost savings`,
      ],
      strategic_recommendations: recommendations,
      implementation_roadmap: {
        phase_1: {
          title: `${complexityLevel
            .replace('_', ' ')
            .replace(/\b\w/g, l => l.toUpperCase())} Quick Wins (Weeks 1-4)`,
          actions: [
            'Establish baseline metrics using industry benchmark methodology',
            'Implement pilot automation proof-of-concept',
            'Validate benchmark assumptions with actual process data',
          ],
          expected_impact: `${Math.round(
            roiCalculation.time_reduction_percentage * 0.3,
          )}% initial improvement in ${
            automationData.target_kpi || 'process efficiency'
          } to demonstrate automation value`,
        },
        phase_2: {
          title: `Core Implementation (${
            complexityData.implementation_timeline.split('-')[0]
          } weeks)`,
          actions: [
            'Deploy automation solutions based on complexity assessment',
            'Implement change management per benchmark success factors',
            'Establish monitoring aligned with industry KPIs',
          ],
          expected_impact: `${Math.round(
            roiCalculation.time_reduction_percentage * 0.7,
          )}% achievement of automation targets with $${Math.round(
            roiCalculation.monthly_savings * 0.7,
          )}/month savings`,
        },
        phase_3: {
          title: `Optimization & Scale (Months 3-6)`,
          actions: [
            'Expand automation to additional process areas',
            'Implement advanced features for maximum ROI',
            'Establish continuous improvement framework',
          ],
          expected_impact: `Full ${roiCalculation.time_reduction_percentage}% automation achievement with sustained $${roiCalculation.monthly_savings}/month cost savings`,
        },
      },
      success_metrics: [
        {
          metric: automationData.target_kpi || 'Process Efficiency Score',
          target: `+${roiCalculation.time_reduction_percentage}% improvement`,
          timeframe: complexityData.implementation_timeline,
          measurement: 'Automated tracking with industry benchmark comparison',
        },
        {
          metric: 'Cost Savings Achievement',
          target: `$${roiCalculation.annual_savings.toLocaleString()} annual savings`,
          timeframe: '12 months',
          measurement: 'Monthly financial tracking with benchmark validation',
        },
        {
          metric: 'Implementation Success Rate',
          target: complexityData.success_rate,
          timeframe: 'Project completion',
          measurement: 'Milestone achievement tracking',
        },
      ],
      estimated_roi: `${roiCalculation.roi_percentage}% ROI within ${benchmarkData.roi_timeline}`,
      payback_period: `${roiCalculation.payback_months} months`,
      risk_assessment: `${complexityLevel
        .replace('_', ' ')
        .replace(/\b\w/g, l => l.toUpperCase())} implementation with ${
        complexityData.success_rate
      } industry success rate and ${
        benchmarkData.roi_timeline
      } proven payback timeline`,
    },
    automation_analysis_details: {
      scenario_analyzed: scenario,
      target_audience: automationData.report_audience,
      primary_goal: automationData.report_goal,
      department_focus: department,
      data_sources_used: dataSources,
      automation_metric_focus: automationData.target_kpi,
      success_definition: automationData.success_definition,
      confidence_score: '97%',
      benchmark_source:
        'Industry automation standards and ROI calculation models',
      methodology: `Benchmark-driven analysis using ${benchmarkData.typical_automation_rate} industry automation rates and proven ROI calculation formulas`,
    },
  }
}

// Generate refined automation recommendations based on user input
export const generateRefinedAutomationRecommendations = (
  originalReport,
  userInput,
) => {
  const refinedReport = JSON.parse(JSON.stringify(originalReport))
  const audienceStyle = getAudienceStyle(
    originalReport.automation_analysis_details.target_audience,
  )

  // Enhanced refinement logic based on user input and audience
  if (
    userInput.toLowerCase().includes('budget') ||
    userInput.toLowerCase().includes('cost')
  ) {
    if (audienceStyle.tone === 'strategic') {
      refinedReport.deliverables.strategic_recommendations = [
        '🔥 BUDGET-OPTIMIZED PRIORITY: ' +
          refinedReport.deliverables.strategic_recommendations[0],
        '⚡ COST-EFFECTIVE SOLUTION: ' +
          refinedReport.deliverables.strategic_recommendations[1],
        '📋 PHASED INVESTMENT: ' +
          refinedReport.deliverables.strategic_recommendations[2],
        '💡 FINANCIAL EFFICIENCY: Implement budget-conscious automation with accelerated payback periods and minimal upfront investment',
      ]
    } else {
      refinedReport.deliverables.strategic_recommendations = [
        '🔥 LOW-COST HIGH-IMPACT: ' +
          refinedReport.deliverables.strategic_recommendations[0],
        '⚡ BUDGET-FRIENDLY AUTOMATION: ' +
          refinedReport.deliverables.strategic_recommendations[1],
        '📋 COST-CONTROLLED DEPLOYMENT: ' +
          refinedReport.deliverables.strategic_recommendations[2],
        '💡 OPERATIONAL INSIGHT: Focus on automation solutions with minimal licensing costs and maximum process efficiency gains',
      ]
    }

    refinedReport.deliverables.estimated_roi =
      '385% ROI with budget-optimized implementation reducing initial investment by 40%'
    refinedReport.deliverables.payback_period =
      '6-8 months with cost-conscious deployment approach'
  }

  if (
    userInput.toLowerCase().includes('timeline') ||
    userInput.toLowerCase().includes('fast')
  ) {
    refinedReport.deliverables.implementation_roadmap.phase_1.title =
      'Rapid Automation Deployment (Week 1-2)'
    refinedReport.deliverables.implementation_roadmap.phase_2.title =
      'Accelerated Implementation (Weeks 3-6)'
    refinedReport.deliverables.implementation_roadmap.phase_3.title =
      'Fast-Track Optimization (Months 2-4)'

    // Update success metrics for faster timeline
    refinedReport.deliverables.success_metrics =
      refinedReport.deliverables.success_metrics.map(metric => ({
        ...metric,
        timeframe: metric.timeframe.includes('month')
          ? metric.timeframe.replace(/\d+/, num =>
              Math.max(1, parseInt(num) - 2),
            )
          : metric.timeframe,
      }))

    refinedReport.deliverables.payback_period =
      '4-6 months with accelerated deployment'
  }

  if (
    userInput.toLowerCase().includes('risk') ||
    userInput.toLowerCase().includes('change management')
  ) {
    refinedReport.deliverables.success_metrics.push(
      {
        metric: 'Change Management Success',
        target: '95% employee adoption rate',
        timeframe: 'Throughout implementation',
        measurement: 'Weekly training completion and user satisfaction surveys',
      },
      {
        metric: 'Risk Mitigation Effectiveness',
        target: 'Zero critical implementation risks',
        timeframe: 'Continuous monitoring',
        measurement: 'Daily risk assessment and mitigation tracking',
      },
    )

    refinedReport.deliverables.risk_assessment =
      'Comprehensive risk mitigation framework with enhanced change management, staff training programs, and phased rollback capabilities ensuring minimal operational disruption'
  }

  // Add refinement metadata
  refinedReport.refinement_applied = {
    user_input_analyzed: userInput,
    refinement_type: 'AI-guided automation optimization',
    audience_considerations: audienceStyle,
    modification_summary:
      'Automation business case adapted based on operational constraints and business priorities',
  }

  return refinedReport
}
