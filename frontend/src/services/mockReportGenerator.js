// Mock report generation services for CX optimization
import {
  mockCustomerBehaviorData,
  kpiInsights,
} from '../mockdata/customerBehaviorData'
import { mockVoiceOfCustomerData } from '../mockdata/voiceOfCustomerData.js'

// Generate audience-appropriate tone and content depth
const getAudienceStyle = audience => {
  const styles = {
    'Executive leadership': {
      tone: 'strategic',
      focus: 'business_impact',
      detail_level: 'high_level',
      metrics_emphasis: 'roi_focused',
    },
    'Product team': {
      tone: 'tactical',
      focus: 'feature_implementation',
      detail_level: 'detailed',
      metrics_emphasis: 'user_experience',
    },
    'Marketing team': {
      tone: 'customer_centric',
      focus: 'customer_journey',
      detail_level: 'detailed',
      metrics_emphasis: 'engagement',
    },
    'Customer support': {
      tone: 'operational',
      focus: 'pain_point_resolution',
      detail_level: 'very_detailed',
      metrics_emphasis: 'satisfaction',
    },
    'Cross-functional stakeholders': {
      tone: 'collaborative',
      focus: 'holistic_view',
      detail_level: 'balanced',
      metrics_emphasis: 'comprehensive',
    },
  }
  return styles[audience] || styles['Cross-functional stakeholders']
}

// Generate goal-specific recommendations
const getGoalFocusedContent = (goal, scenario, audienceStyle) => {
  const goalStrategies = {
    'Identify and fix pain points': {
      approach: 'diagnostic',
      primary_deliverable: 'pain_point_analysis',
      success_metric: 'issue_resolution_rate',
    },
    'Justify a product or CX investment': {
      approach: 'business_case',
      primary_deliverable: 'roi_analysis',
      success_metric: 'investment_return',
    },
    'Track progress toward a CX goal': {
      approach: 'progress_monitoring',
      primary_deliverable: 'kpi_dashboard',
      success_metric: 'goal_achievement',
    },
    'Inform design/feature changes': {
      approach: 'design_insights',
      primary_deliverable: 'feature_recommendations',
      success_metric: 'usability_improvement',
    },
    'Demonstrate AI reporting capability': {
      approach: 'showcase',
      primary_deliverable: 'comprehensive_analysis',
      success_metric: 'stakeholder_engagement',
    },
  }
  return goalStrategies[goal] || goalStrategies['Identify and fix pain points']
}

// Mock generated CX optimization report
export const generateMockCXReport = cxData => {
  const scenario =
    cxData.business_scenario.split(' - ')[0] || 'the business scenario'
  const audienceStyle = getAudienceStyle(cxData.report_audience)
  const goalFocus = getGoalFocusedContent(
    cxData.report_goal,
    scenario,
    audienceStyle,
  )
  const segment = cxData.customer_segment || 'all customers'
  const dataSources = cxData.dataSourcesList || []

  // Get relevant mock data
  const behaviorData = mockCustomerBehaviorData[scenario] || {}
  const voiceData = mockVoiceOfCustomerData[scenario] || {}

  // Extract KPI-specific insights
  const kpiType =
    cxData.target_kpi?.toLowerCase().replace(/\s+/g, '_') || 'conversion_rate'
  const kpiData = kpiInsights[kpiType] || kpiInsights['conversion_rate']

  // Generate audience-appropriate executive summary
  const generateExecutiveSummary = () => {
    if (audienceStyle.tone === 'strategic') {
      return `Executive Summary: Our comprehensive analysis of ${scenario.toLowerCase()} reveals significant ROI opportunities through targeted customer experience optimization. Current ${
        cxData.target_kpi || 'performance metrics'
      } can be improved by ${
        kpiData.current_rate || '25%'
      } through strategic initiatives focused on ${segment}. Recommended investment of $150K-300K will deliver ${
        cxData.success_definition || 'substantial business impact'
      } within 6 months.`
    } else if (audienceStyle.tone === 'tactical') {
      return `Analysis Overview: User research and behavioral data analysis for ${scenario.toLowerCase()} identifies specific feature and design improvements to achieve ${
        cxData.success_definition || 'user experience goals'
      }. Key optimization areas include ${
        kpiData.key_factors?.join(', ') ||
        'user workflow, interface design, and feature discoverability'
      }. Implementation roadmap prioritizes high-impact, low-effort improvements for rapid ${
        cxData.target_kpi || 'metric'
      } improvement.`
    } else {
      return `Customer Experience Analysis: Multi-channel research across ${scenario.toLowerCase()} reveals critical insights about ${segment} behavior and satisfaction drivers. Current ${
        cxData.target_kpi || 'customer satisfaction metrics'
      } indicate opportunities for improvement through systematic addressing of identified pain points. Cross-functional implementation approach will deliver ${
        cxData.success_definition ||
        'measurable customer experience improvements'
      }.`
    }
  }

  // Generate data-source specific insights
  const generateDataInsights = () => {
    const insights = []

    if (dataSources.includes('Customer Behavior Data')) {
      const segmentData =
        behaviorData.user_segments?.[
          segment.toLowerCase().replace(/\s+/g, '_')
        ] ||
        behaviorData.user_segments?.new_users ||
        {}
      insights.push(
        `Behavioral Analysis: ${segment} segment shows ${
          segmentData.percentage || '35'
        }% of total traffic with ${
          segmentData.avg_session_duration || '4:23'
        } average engagement and ${
          segmentData.bounce_rate || '45%'
        } bounce rate.`,
      )
    }

    if (dataSources.includes('Voice of Customer Data')) {
      const supportThemes =
        voiceData.support_ticket_themes || voiceData.feedback_themes || []
      const topTheme = supportThemes[0]?.theme || 'user experience issues'
      insights.push(
        `Voice of Customer: Primary concern identified as "${topTheme}" with ${
          supportThemes[0]?.count || '234'
        } mentions and ${
          supportThemes[0]?.satisfaction || '7.2/10'
        } current satisfaction rating.`,
      )
    }

    return insights.join(' ')
  }

  // Generate audience-specific recommendations
  const generateRecommendations = () => {
    const baseRecommendations = kpiData.quick_wins || [
      'Optimize user workflow efficiency',
      'Enhance feature discoverability',
      'Improve response and load times',
      'Strengthen user onboarding process',
    ]

    if (audienceStyle.tone === 'strategic') {
      return baseRecommendations.map(
        rec =>
          `Strategic Initiative: ${rec} to drive competitive advantage and market share growth`,
      )
    } else if (audienceStyle.tone === 'tactical') {
      return baseRecommendations.map(
        rec =>
          `Product Enhancement: ${rec} through specific UI/UX improvements and feature refinements`,
      )
    } else {
      return baseRecommendations.map(
        rec =>
          `Cross-functional Implementation: ${rec} requiring coordinated effort across teams`,
      )
    }
  }

  // Generate goal-specific implementation phases
  const generateImplementationRoadmap = () => {
    if (goalFocus.approach === 'business_case') {
      return {
        phase_1: {
          title: 'ROI Foundation (Weeks 1-2)',
          actions: [
            'Establish baseline metrics and measurement framework',
            'Implement analytics tracking for investment justification',
            'Create stakeholder reporting dashboard',
          ],
          expected_impact: `15% improvement in ${
            cxData.target_kpi || 'key metrics'
          } to demonstrate initial ROI`,
        },
        phase_2: {
          title: 'Strategic Implementation (Months 1-2)',
          actions: [
            'Deploy high-impact optimizations identified in analysis',
            'Launch A/B testing program for continuous improvement',
            'Integrate customer feedback loop for ongoing insights',
          ],
          expected_impact: `30% progress toward ${
            cxData.success_definition || 'target goals'
          } with measurable business impact`,
        },
        phase_3: {
          title: 'Scale and Optimize (Months 3-6)',
          actions: [
            'Roll out successful optimizations across all touchpoints',
            'Implement advanced personalization and automation',
            'Establish long-term optimization and monitoring processes',
          ],
          expected_impact: `Achievement of ${
            cxData.success_definition || 'target objectives'
          } with sustainable improvement framework`,
        },
      }
    } else {
      return {
        phase_1: {
          title: 'Quick Wins (Weeks 1-2)',
          actions: [
            'Address critical pain points identified in voice of customer data',
            'Implement low-effort, high-impact UI improvements',
            'Optimize most problematic user workflow steps',
          ],
          expected_impact: `20% improvement in ${
            cxData.target_kpi || 'user satisfaction'
          } through immediate fixes`,
        },
        phase_2: {
          title: 'Core Optimizations (Months 1-2)',
          actions: [
            'Redesign key user journeys based on behavioral insights',
            'Deploy enhanced features addressing identified needs',
            'Implement comprehensive user feedback and monitoring system',
          ],
          expected_impact: `50% progress toward ${
            cxData.success_definition || 'experience goals'
          } with sustained improvement`,
        },
        phase_3: {
          title: 'Advanced Enhancements (Months 3-6)',
          actions: [
            'Launch personalized experience optimization',
            'Implement predictive user experience features',
            'Deploy cross-channel experience coordination',
          ],
          expected_impact: `Full achievement of ${
            cxData.success_definition || 'target metrics'
          } with ongoing optimization capability`,
        },
      }
    }
  }

  const roadmap = generateImplementationRoadmap()

  return {
    project_id: `CX-${new Date()
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, '')}-${Math.random().toString(36).substr(2, 6)}`,
    processing_time_seconds: 3.8,
    analysis_complete: true,
    quality_certification: {
      business_analysis_approved: 'CERTIFIED_FOR_IMPLEMENTATION',
      stakeholder_readiness_confirmed: true,
      roi_projection_validated: true,
      audience_alignment_verified: true,
    },
    deliverables: {
      executive_summary: generateExecutiveSummary(),
      data_insights: generateDataInsights(),
      pain_points: [
        `${cxData.target_kpi || 'Key performance metrics'} currently ${
          kpiData.current_rate || 'below benchmark'
        } vs industry standard of ${kpiData.industry_benchmark || '28%'}`,
        `${segment} segment experiencing friction in ${
          kpiData.key_factors?.[0] || 'core user workflows'
        } leading to ${kpiData.key_factors?.[1] || 'abandonment issues'}`,
        `Data analysis reveals ${
          kpiData.key_factors?.[2] || 'communication gaps'
        } causing user confusion and decreased satisfaction`,
        `Cross-channel experience inconsistencies impacting ${
          cxData.target_kpi || 'user journey completion'
        } rates`,
      ],
      strategic_recommendations: generateRecommendations(),
      implementation_roadmap: roadmap,
      success_metrics: [
        {
          metric: cxData.target_kpi || 'Customer Satisfaction Score',
          target: cxData.success_definition || '+25% improvement',
          timeframe: '3 months',
          measurement: 'Weekly tracking with automated reporting',
        },
        {
          metric:
            audienceStyle.metrics_emphasis === 'roi_focused'
              ? 'Revenue Impact'
              : 'User Engagement',
          target:
            audienceStyle.metrics_emphasis === 'roi_focused'
              ? '+$500K ARR'
              : '+40% task completion',
          timeframe: '6 months',
          measurement: 'Monthly business review integration',
        },
        {
          metric: 'Implementation Progress',
          target: '100% milestone completion',
          timeframe: 'Ongoing',
          measurement: 'Bi-weekly stakeholder updates',
        },
      ],
      estimated_roi:
        audienceStyle.tone === 'strategic'
          ? '320% ROI within 12 months'
          : '250% improvement in user experience metrics',
      risk_assessment:
        goalFocus.approach === 'business_case'
          ? 'Low implementation risk with high revenue impact potential and strong stakeholder buy-in'
          : 'Medium implementation complexity with high user satisfaction impact and manageable technical requirements',
    },
    analysis_details: {
      scenario_analyzed: scenario,
      target_audience: cxData.report_audience,
      primary_goal: cxData.report_goal,
      customer_segment: segment,
      data_sources_used: dataSources,
      kpi_focus: cxData.target_kpi,
      success_definition: cxData.success_definition,
      confidence_score: '94%',
      methodology: `Multi-source analysis combining ${dataSources
        .join(' and ')
        .toLowerCase()} with ${audienceStyle.detail_level} reporting for ${
        audienceStyle.tone
      } decision-making`,
    },
  }
}

// Generate refined recommendations based on user input
export const generateRefinedRecommendations = (originalReport, userInput) => {
  const refinedReport = JSON.parse(JSON.stringify(originalReport))
  const audienceStyle = getAudienceStyle(
    originalReport.analysis_details.target_audience,
  )

  // Enhanced refinement logic based on user input and audience
  if (
    userInput.toLowerCase().includes('priority') ||
    userInput.toLowerCase().includes('priorit')
  ) {
    if (audienceStyle.tone === 'strategic') {
      refinedReport.deliverables.strategic_recommendations = [
        '🔥 CRITICAL BUSINESS PRIORITY: ' +
          refinedReport.deliverables.strategic_recommendations[0],
        '⚡ HIGH ROI OPPORTUNITY: ' +
          refinedReport.deliverables.strategic_recommendations[1],
        '📋 STRATEGIC CONSIDERATION: ' +
          refinedReport.deliverables.strategic_recommendations[2],
        '💡 COMPETITIVE ADVANTAGE: Implement priority-based rollout to maximize market impact and revenue acceleration',
      ]
    } else {
      refinedReport.deliverables.strategic_recommendations = [
        '🔥 URGENT IMPLEMENTATION: ' +
          refinedReport.deliverables.strategic_recommendations[0],
        '⚡ HIGH IMPACT PRIORITY: ' +
          refinedReport.deliverables.strategic_recommendations[1],
        '📋 PLANNED ENHANCEMENT: ' +
          refinedReport.deliverables.strategic_recommendations[2],
        '💡 OPERATIONAL INSIGHT: Focus on high-priority items for maximum user experience improvement',
      ]
    }
  }

  if (
    userInput.toLowerCase().includes('budget') ||
    userInput.toLowerCase().includes('cost')
  ) {
    refinedReport.deliverables.strategic_recommendations =
      refinedReport.deliverables.strategic_recommendations.map(rec =>
        rec.includes('Strategic') || rec.includes('Implement')
          ? rec + ' (Cost-optimized approach with phased investment)'
          : rec,
      )
    refinedReport.deliverables.estimated_roi =
      audienceStyle.tone === 'strategic'
        ? '380% ROI within 12 months (with strategic cost optimization)'
        : '300% improvement in metrics (with budget-conscious implementation)'
  }

  if (
    userInput.toLowerCase().includes('timeline') ||
    userInput.toLowerCase().includes('faster')
  ) {
    refinedReport.deliverables.implementation_roadmap.phase_1.title =
      'Accelerated Quick Wins (Week 1)'
    refinedReport.deliverables.implementation_roadmap.phase_2.title =
      'Rapid Implementation (Weeks 2-4)'
    refinedReport.deliverables.implementation_roadmap.phase_3.title =
      'Fast-Track Optimization (Months 2-3)'

    // Update success metrics for faster timeline
    refinedReport.deliverables.success_metrics =
      refinedReport.deliverables.success_metrics.map(metric => ({
        ...metric,
        timeframe: metric.timeframe.includes('month')
          ? metric.timeframe.replace(/\d+/, num =>
              Math.max(1, parseInt(num) - 1),
            )
          : metric.timeframe,
      }))
  }

  if (
    userInput.toLowerCase().includes('metrics') ||
    userInput.toLowerCase().includes('measure')
  ) {
    refinedReport.deliverables.success_metrics.push(
      {
        metric: 'Advanced Analytics Tracking',
        target: 'Real-time dashboard with 15+ KPIs',
        timeframe: 'Continuous monitoring',
        measurement: 'Automated alerts and weekly executive reports',
      },
      {
        metric: 'Stakeholder Engagement',
        target: '95% positive feedback on reporting quality',
        timeframe: 'Monthly surveys',
        measurement: 'Quarterly stakeholder satisfaction assessment',
      },
    )
  }

  // Add refinement metadata
  refinedReport.refinement_applied = {
    user_input_analyzed: userInput,
    refinement_type: 'AI-guided optimization',
    audience_considerations: audienceStyle,
    modification_summary:
      'Report adapted based on stakeholder feedback and business constraints',
  }

  return refinedReport
}
