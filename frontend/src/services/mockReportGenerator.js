// Mock report generation services for CX optimization

// Mock generated CX optimization report
export const generateMockCXReport = cxData => {
  const scenario =
    cxData.business_scenario.split(' - ')[0] || 'the business scenario'
  const touchpoint = cxData.touchpoint || 'key customer touchpoints'
  const persona = cxData.personasList?.[0]?.name || 'target customers'
  const objective = cxData.cx_objective || 'customer experience optimization'
  const tools =
    cxData.cxToolsList?.slice(0, 3).join(', ') || 'advanced analytics tools'

  const mockReport = {
    executive_summary: `Our AI-powered analysis of ${scenario.toLowerCase()} reveals significant opportunities to enhance ${touchpoint.toLowerCase()} experiences for ${persona.toLowerCase()}. Through ${tools.toLowerCase()}, we've identified 3 critical pain points and developed a strategic roadmap to achieve ${objective.toLowerCase()}.`,

    journey_analysis: `Current ${touchpoint.toLowerCase()} experience analysis shows customers face friction at multiple touchpoints. ${persona} typically interact through ${touchpoint.toLowerCase()} with varying levels of satisfaction. Our analysis reveals inconsistent experiences across different stages of the customer journey.`,

    pain_points: [
      `${touchpoint} navigation complexity causing 35% task abandonment`,
      `Lack of real-time status updates leading to customer frustration`,
      `Inconsistent service delivery across different interaction channels`,
      `Limited personalization reducing engagement by 28%`,
    ],

    recommendations: [
      `Implement intelligent ${touchpoint.toLowerCase()} optimization using ${
        tools.split(',')[0] || 'analytics'
      }`,
      `Deploy real-time communication system for transparent status updates`,
      `Standardize service protocols across all customer touchpoints`,
      `Integrate personalization engine based on customer behavior patterns`,
    ],

    implementation_roadmap: {
      phase_1: {
        title: 'Quick Wins (Weeks 1-2)',
        actions: [
          'Implement basic analytics tracking',
          'Update customer communication templates',
          'Train staff on new service protocols',
        ],
        expected_impact: '15% improvement in customer satisfaction',
      },
      phase_2: {
        title: 'Process Improvements (Months 1-2)',
        actions: [
          `Redesign ${touchpoint.toLowerCase()} user experience`,
          'Deploy automated status notification system',
          'Integrate customer feedback loops',
        ],
        expected_impact: '25% reduction in support tickets',
      },
      phase_3: {
        title: 'Strategic Enhancements (Months 3-6)',
        actions: [
          'Launch advanced personalization features',
          'Implement predictive customer service',
          'Deploy cross-channel experience optimization',
        ],
        expected_impact: '40% increase in customer loyalty scores',
      },
    },

    success_metrics: [
      {
        metric: 'Customer Satisfaction Score',
        target: '+20%',
        timeframe: '3 months',
      },
      { metric: 'Task Completion Rate', target: '+35%', timeframe: '2 months' },
      {
        metric: 'Support Ticket Volume',
        target: '-30%',
        timeframe: '4 months',
      },
      {
        metric: 'Customer Retention Rate',
        target: '+15%',
        timeframe: '6 months',
      },
    ],
  }

  return {
    project_id: `CX-${new Date()
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, '')}-${Math.random().toString(36).substr(2, 6)}`,
    processing_time_seconds: 3.2,
    analysis_complete: true,
    quality_certification: {
      business_analysis_approved: 'CERTIFIED_FOR_IMPLEMENTATION',
      stakeholder_readiness_confirmed: true,
      roi_projection_validated: true,
    },
    deliverables: {
      executive_summary: mockReport.executive_summary,
      journey_analysis: mockReport.journey_analysis,
      pain_points: mockReport.pain_points,
      strategic_recommendations: mockReport.recommendations,
      implementation_roadmap: mockReport.implementation_roadmap,
      success_metrics: mockReport.success_metrics,
      estimated_roi: '250% ROI within 12 months',
      risk_assessment:
        'Low implementation risk with high business impact potential',
    },
    cx_analysis_details: {
      scenario_analyzed: scenario,
      primary_touchpoint: touchpoint,
      target_persona: persona,
      optimization_objective: objective,
      tools_utilized: cxData.cxToolsList || [],
      confidence_score: '92%',
    },
  }
}

// Generate refined recommendations based on user input
export const generateRefinedRecommendations = (originalReport, userInput) => {
  const refinedReport = JSON.parse(JSON.stringify(originalReport))

  // Mock refinement logic based on user input
  if (
    userInput.toLowerCase().includes('priority') ||
    userInput.toLowerCase().includes('priorit')
  ) {
    refinedReport.deliverables.strategic_recommendations = [
      '🔥 HIGH PRIORITY: ' +
        refinedReport.deliverables.strategic_recommendations[0],
      '⚡ MEDIUM PRIORITY: ' +
        refinedReport.deliverables.strategic_recommendations[1],
      '📋 FUTURE CONSIDERATION: ' +
        refinedReport.deliverables.strategic_recommendations[2],
      '💡 ADDITIONAL INSIGHT: Implement priority-based rollout to maximize impact',
    ]
  }

  if (
    userInput.toLowerCase().includes('budget') ||
    userInput.toLowerCase().includes('cost')
  ) {
    refinedReport.deliverables.strategic_recommendations =
      refinedReport.deliverables.strategic_recommendations.map(rec =>
        rec.includes('Implement') ? rec + ' (Budget-optimized approach)' : rec,
      )
    refinedReport.deliverables.estimated_roi =
      '300% ROI within 12 months (with cost optimization)'
  }

  if (
    userInput.toLowerCase().includes('timeline') ||
    userInput.toLowerCase().includes('faster')
  ) {
    refinedReport.deliverables.implementation_roadmap.phase_1.title =
      'Quick Wins (Week 1)'
    refinedReport.deliverables.implementation_roadmap.phase_2.title =
      'Process Improvements (Weeks 2-6)'
    refinedReport.deliverables.implementation_roadmap.phase_3.title =
      'Strategic Enhancements (Months 2-4)'
  }

  if (
    userInput.toLowerCase().includes('metrics') ||
    userInput.toLowerCase().includes('measure')
  ) {
    refinedReport.deliverables.success_metrics.push({
      metric: 'Implementation Progress',
      target: '100% milestone completion',
      timeframe: 'Monthly tracking',
    })
  }

  return refinedReport
}
