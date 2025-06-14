// Mock automation business case generation services
import {
  mockAutomationProcessData,
  automationROIInsights,
} from '../mockdata/automationProcessData.js'

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

// Mock generated automation business case report
export const generateMockAutomationReport = automationData => {
  const scenario =
    automationData.business_scenario.split(' - ')[0] || 'the automation process'
  const audienceStyle = getAudienceStyle(automationData.report_audience)
  const goalFocus = getAutomationGoalFocus(
    automationData.report_goal,
    scenario,
    audienceStyle,
  )
  const department = automationData.customer_segment || 'Operations'
  const dataSources = automationData.dataSourcesList || []

  // Get relevant automation mock data
  const processData = mockAutomationProcessData[scenario] || {}

  // Extract automation metric insights
  const metricType =
    automationData.target_kpi?.toLowerCase().replace(/\s+/g, '_') ||
    'processing_time'
  const metricData =
    automationROIInsights[metricType] ||
    automationROIInsights['processing_time']

  // Generate audience-appropriate executive summary
  const generateExecutiveSummary = () => {
    if (audienceStyle.tone === 'strategic') {
      return `Executive Summary: Our comprehensive automation analysis of ${scenario.toLowerCase()} reveals significant ROI opportunities through intelligent process automation. Current ${
        automationData.target_kpi || 'operational metrics'
      } can be improved by ${
        metricData.improvement_potential || '70%'
      } through strategic automation deployment in ${department}. Recommended investment of $${
        metricData.investment_range || '75K-150K'
      } will deliver ${
        automationData.success_definition ||
        'substantial cost savings and efficiency gains'
      } with ${metricData.payback_period || '8-12 month'} payback period.`
    } else if (audienceStyle.tone === 'operational') {
      return `Automation Analysis: Detailed process evaluation for ${scenario.toLowerCase()} identifies specific automation opportunities to achieve ${
        automationData.success_definition || 'operational efficiency targets'
      }. Key optimization areas include ${
        metricData.key_processes?.join(', ') ||
        'data processing, workflow automation, and quality control'
      }. Implementation roadmap prioritizes high-impact, low-risk automations for rapid ${
        automationData.target_kpi || 'process improvement'
      } results.`
    } else if (audienceStyle.tone === 'financial') {
      return `Financial Analysis: ROI modeling for ${scenario.toLowerCase()} automation demonstrates ${
        metricData.roi_percentage || '285%'
      } return on investment with ${
        metricData.annual_savings || '$420K'
      } projected annual savings. Cost-benefit analysis shows ${
        metricData.payback_period || '9-month'
      } payback period and ${
        metricData.net_present_value || '$1.2M'
      } net present value over 3 years. Financial projections include comprehensive risk assessment and sensitivity analysis.`
    } else {
      return `Automation Opportunity Assessment: Multi-departmental analysis across ${scenario.toLowerCase()} reveals critical automation opportunities for ${department} operations. Current ${
        automationData.target_kpi || 'process efficiency metrics'
      } indicate potential for significant improvement through systematic automation deployment. Cross-functional implementation approach will deliver ${
        automationData.success_definition ||
        'measurable operational improvements and cost reductions'
      }.`
    }
  }

  // Generate data-source specific insights
  const generateAutomationInsights = () => {
    const insights = []

    if (dataSources.includes('Process Volume & Timing Data')) {
      const volumeData = processData.volume_metrics || {}
      insights.push(
        `Process Analysis: Current ${scenario.toLowerCase()} processes ${
          volumeData.monthly_volume || '2,500'
        } transactions monthly with ${
          volumeData.avg_processing_time || '45 minutes'
        } average processing time and ${
          volumeData.manual_effort_hours || '120 FTE hours'
        } manual effort weekly.`,
      )
    }

    if (dataSources.includes('Cost & Resource Data')) {
      const costData = processData.cost_metrics || {}
      insights.push(
        `Cost Analysis: Annual operational costs total ${
          costData.annual_cost || '$280K'
        } including ${costData.labor_cost || '$180K'} labor costs and ${
          costData.error_cost || '$45K'
        } error remediation expenses with ${
          costData.error_rate || '12%'
        } current error rate.`,
      )
    }

    return insights.join(' ')
  }

  // Generate audience-specific recommendations
  const generateAutomationRecommendations = () => {
    const baseRecommendations = metricData.automation_solutions || [
      'Implement intelligent document processing automation',
      'Deploy workflow automation for approval processes',
      'Integrate AI-powered data validation and quality control',
      'Establish automated reporting and dashboard systems',
    ]

    if (audienceStyle.tone === 'strategic') {
      return baseRecommendations.map(
        rec =>
          `Strategic Automation Initiative: ${rec} to drive competitive advantage and operational excellence`,
      )
    } else if (audienceStyle.tone === 'operational') {
      return baseRecommendations.map(
        rec =>
          `Process Optimization: ${rec} through systematic automation deployment and change management`,
      )
    } else if (audienceStyle.tone === 'financial') {
      return baseRecommendations.map(
        rec =>
          `ROI-Focused Implementation: ${rec} with detailed cost-benefit analysis and financial tracking`,
      )
    } else {
      return baseRecommendations.map(
        rec =>
          `Cross-Functional Automation: ${rec} requiring coordinated implementation across departments`,
      )
    }
  }

  // Generate goal-specific implementation phases
  const generateImplementationRoadmap = () => {
    if (goalFocus.approach === 'investment_justification') {
      return {
        phase_1: {
          title: 'Business Case Foundation (Weeks 1-3)',
          actions: [
            'Establish baseline process metrics and cost analysis',
            'Implement pilot automation proof-of-concept',
            'Create executive stakeholder presentation materials',
          ],
          expected_impact: `${
            metricData.phase1_improvement || '25%'
          } improvement in ${
            automationData.target_kpi || 'key process metrics'
          } to demonstrate automation value`,
        },
        phase_2: {
          title: 'Strategic Automation Deployment (Months 1-3)',
          actions: [
            'Deploy core automation solutions across identified processes',
            'Implement change management and staff training programs',
            'Establish automated monitoring and reporting systems',
          ],
          expected_impact: `${
            metricData.phase2_improvement || '60%'
          } progress toward ${
            automationData.success_definition || 'automation targets'
          } with measurable ROI demonstration`,
        },
        phase_3: {
          title: 'Scale and Optimization (Months 4-8)',
          actions: [
            'Expand automation to additional process areas',
            'Implement advanced AI and machine learning capabilities',
            'Establish continuous improvement and optimization framework',
          ],
          expected_impact: `Full achievement of ${
            automationData.success_definition || 'automation objectives'
          } with sustainable ${
            metricData.ongoing_savings || '$50K monthly'
          } cost savings`,
        },
      }
    } else {
      return {
        phase_1: {
          title: 'Automation Quick Wins (Weeks 1-2)',
          actions: [
            'Implement simple workflow automations with immediate impact',
            'Deploy automated data entry and validation systems',
            'Establish basic process monitoring and alerts',
          ],
          expected_impact: `${metricData.quick_wins || '30%'} reduction in ${
            automationData.target_kpi || 'manual processing time'
          } through immediate automation`,
        },
        phase_2: {
          title: 'Core Process Automation (Months 1-2)',
          actions: [
            'Deploy intelligent document processing systems',
            'Implement automated approval and routing workflows',
            'Integrate systems for seamless data flow automation',
          ],
          expected_impact: `${
            metricData.core_improvement || '70%'
          } achievement of ${
            automationData.success_definition || 'automation efficiency goals'
          } with sustained productivity gains`,
        },
        phase_3: {
          title: 'Advanced Automation & AI (Months 3-6)',
          actions: [
            'Deploy machine learning for predictive process optimization',
            'Implement advanced analytics and automated decision-making',
            'Establish enterprise-wide automation governance framework',
          ],
          expected_impact: `Complete realization of ${
            automationData.success_definition ||
            'automation transformation objectives'
          } with ongoing optimization capability delivering ${
            metricData.annual_value || '$500K annual value'
          }`,
        },
      }
    }
  }

  const roadmap = generateImplementationRoadmap()

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
    },
    deliverables: {
      executive_summary: generateExecutiveSummary(),
      automation_insights: generateAutomationInsights(),
      automation_opportunities: [
        `${
          automationData.target_kpi || 'Process efficiency metrics'
        } currently ${
          metricData.current_performance || 'below optimal'
        } vs industry automation benchmark of ${
          metricData.industry_benchmark || '85% automated'
        }`,
        `${department} department experiencing manual bottlenecks in ${
          metricData.key_processes?.[0] || 'data processing workflows'
        } leading to ${
          metricData.key_processes?.[1] || 'capacity constraints and errors'
        }`,
        `Analysis reveals ${
          metricData.key_processes?.[2] || 'repetitive task inefficiencies'
        } consuming ${
          metricData.manual_hours || '40+ hours weekly'
        } of manual effort`,
        `Integration opportunities exist to automate ${
          metricData.integration_potential || 'cross-system data flows'
        } and eliminate ${
          metricData.error_reduction || '90% of manual errors'
        }`,
      ],
      strategic_recommendations: generateAutomationRecommendations(),
      implementation_roadmap: roadmap,
      success_metrics: [
        {
          metric: automationData.target_kpi || 'Process Efficiency Score',
          target: automationData.success_definition || '+70% improvement',
          timeframe: '6 months',
          measurement: 'Automated tracking with real-time dashboards',
        },
        {
          metric:
            audienceStyle.metrics_emphasis === 'financial_returns'
              ? 'Cost Savings Achievement'
              : 'Operational Efficiency',
          target:
            audienceStyle.metrics_emphasis === 'financial_returns'
              ? '+$420K annual savings'
              : '+85% process automation',
          timeframe: '12 months',
          measurement: 'Monthly financial and operational review',
        },
        {
          metric: 'Automation Implementation Progress',
          target: '100% roadmap milestone completion',
          timeframe: 'Ongoing',
          measurement: 'Weekly automation team updates',
        },
      ],
      estimated_roi:
        audienceStyle.tone === 'strategic'
          ? `${metricData.roi_percentage || '285%'} ROI within 18 months`
          : `${
              metricData.efficiency_gain || '300%'
            } improvement in process efficiency metrics`,
      payback_period: metricData.payback_period || '8-12 months',
      risk_assessment:
        goalFocus.approach === 'investment_justification'
          ? 'Low implementation risk with high ROI potential and strong executive sponsorship alignment'
          : 'Medium technical complexity with high operational impact and manageable change management requirements',
    },
    automation_analysis_details: {
      scenario_analyzed: scenario,
      target_audience: automationData.report_audience,
      primary_goal: automationData.report_goal,
      department_focus: department,
      data_sources_used: dataSources,
      automation_metric_focus: automationData.target_kpi,
      success_definition: automationData.success_definition,
      confidence_score: '96%',
      methodology: `Multi-source automation analysis combining ${dataSources
        .join(' and ')
        .toLowerCase()} with ${
        audienceStyle.detail_level
      } business case development for ${audienceStyle.tone} decision-making`,
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

