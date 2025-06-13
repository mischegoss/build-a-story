import React, { useState, useEffect } from 'react'
import BuildACXInterface from './BuildACXInterface'

// Mock business scenarios for CX optimization
const mockBusinessScenarios = {
  scenarios: [
    {
      title: 'E-commerce Customer Journey',
      industry: 'Retail',
      description:
        'Online shopping experience from product discovery to delivery',
      complexity: 'Medium',
      common_touchpoints: [
        'Website',
        'Mobile App',
        'Email',
        'Customer Service',
      ],
      typical_personas: [
        'Busy Parent',
        'Price-Conscious Shopper',
        'Tech-Savvy Millennial',
      ],
      key_metrics: [
        'Conversion Rate',
        'Cart Abandonment',
        'Customer Satisfaction',
      ],
      adaptable_elements: {
        touchpoint_flexibility: 'high',
        persona_flexibility: 'high',
        process_flexibility: 'high',
      },
    },
    {
      title: 'SaaS Customer Onboarding',
      industry: 'Technology',
      description: 'Software-as-a-Service user activation and feature adoption',
      complexity: 'High',
      common_touchpoints: [
        'Web App',
        'Email',
        'In-App Messages',
        'Support Chat',
      ],
      typical_personas: [
        'Business Professional',
        'Team Leader',
        'Individual Contributor',
      ],
      key_metrics: ['Time to Value', 'Feature Adoption', 'Activation Rate'],
      adaptable_elements: {
        touchpoint_flexibility: 'medium',
        persona_flexibility: 'medium',
        process_flexibility: 'high',
      },
    },
    {
      title: 'Restaurant Service Experience',
      industry: 'Hospitality',
      description: 'Dining experience from reservation to payment',
      complexity: 'Medium',
      common_touchpoints: ['Phone', 'Website', 'In-Person', 'Mobile App'],
      typical_personas: [
        'Date Night Couple',
        'Business Lunch',
        'Family Celebration',
      ],
      key_metrics: ['Wait Time', 'Service Quality', 'Repeat Visits'],
      adaptable_elements: {
        touchpoint_flexibility: 'medium',
        persona_flexibility: 'high',
        process_flexibility: 'medium',
      },
    },
    {
      title: 'Healthcare Patient Journey',
      industry: 'Healthcare',
      description:
        'Patient experience from appointment booking to follow-up care',
      complexity: 'High',
      common_touchpoints: ['Phone', 'Patient Portal', 'In-Person', 'Email'],
      typical_personas: [
        'Senior Patient',
        'Busy Professional',
        'Concerned Parent',
      ],
      key_metrics: ['Patient Satisfaction', 'Wait Time', 'Treatment Adherence'],
      adaptable_elements: {
        touchpoint_flexibility: 'low',
        persona_flexibility: 'medium',
        process_flexibility: 'medium',
      },
    },
  ],
}

const mockCXOptions = {
  touchpoints: [
    'Website',
    'Mobile App',
    'In-Store Experience',
    'Call Center',
    'Email Communications',
    'Social Media',
    'Live Chat',
    'Self-Service Portal',
  ],
  business_contexts: [
    'New Customers',
    'Returning Customers',
    'VIP/Premium',
    'At-Risk',
  ],
  cx_objectives: [
    'Reduce Friction',
    'Increase Satisfaction',
    'Boost Efficiency',
    'Improve Retention',
  ],
  cx_tools: [
    'Customer Surveys',
    'Analytics Review',
    'Process Mapping',
    'A/B Testing',
    'User Interviews',
    'Journey Mapping',
    'Sentiment Analysis',
    'Behavioral Tracking',
    'Voice of Customer',
    'Process Automation',
    'Personalization Engine',
    'Predictive Analytics',
  ],
}

// Mock generated CX optimization report
const generateMockCXReport = cxData => {
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
const generateRefinedRecommendations = (originalReport, userInput) => {
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

const mockAIBusinessInsights = {
  ai_business_lessons: [
    'AI systems can analyze complex customer journeys across multiple touchpoints simultaneously',
    'Each AI agent specializes in different aspects of business analysis (data, process, strategy)',
    'Multi-agent AI systems provide comprehensive business insights that single AI cannot achieve',
    'AI collaboration enhances human business decision-making without replacing strategic thinking',
    'Real-time AI analysis enables rapid response to customer experience issues',
  ],
  business_thinking_points: [
    'How did each AI agent contribute unique business insights to the analysis?',
    'What aspects of customer experience analysis required human judgment vs AI processing?',
    'How did the AI team balance quantitative data with qualitative customer insights?',
    'Which AI agent provided the most actionable business recommendations?',
    'How can this multi-agent approach be applied to other business processes?',
  ],
  collaboration_skills: [
    'Learning to direct AI systems for complex business analysis and strategic planning',
    'Understanding how to evaluate and refine AI-generated business recommendations',
    'Developing skills for AI-augmented business process optimization and decision-making',
    'Recognizing when to accept AI insights vs when to apply human business judgment',
  ],
  business_applications: [
    'Customer Experience Optimization - like what you just experienced in this demo',
    'Market Research and Competitive Analysis using specialized AI research teams',
    'Product Development Strategy with AI agents handling different aspects of innovation',
    'Operations Optimization through AI-powered process analysis and improvement recommendations',
  ],
  process_breakdown: {
    total_agents: 6,
    analysis_time: '3-4 minutes',
    business_quality:
      'Enterprise-grade - ready for executive presentation and implementation',
    learning_value:
      'Students understand real-world AI applications in business strategy and operations',
  },
}

const API_BASE =
  process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8000'

function App() {
  // Core application state
  const [businessScenarios, setBusinessScenarios] = useState([])
  const [cxOptions, setCxOptions] = useState({})
  const [currentStep, setCurrentStep] = useState(0)
  const [cxProjectData, setCxProjectData] = useState({
    business_scenario: '',
    touchpoint: '',
    customer_personas: '',
    business_context: '',
    cx_objective: '',
    tone: '',
    industry: '',
    special_requirements: '',
    // Frontend-specific arrays
    personasList: [
      {
        id: 'persona_' + Math.random().toString(36).substr(2, 9),
        name: '',
        description: '',
      },
    ],
    cxToolsList: [],
    enable_ai_business_mode: true, // Always enabled for business lab
  })

  // AI Business Lab state
  const [generatedReport, setGeneratedReport] = useState(null)
  const [refinedReport, setRefinedReport] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [aiBusinessMode, setAiBusinessMode] = useState(true) // Always on
  const [agentWorkflow, setAgentWorkflow] = useState([])
  const [currentAgent, setCurrentAgent] = useState(null)
  const [aiBusinessInsights, setAiBusinessInsights] = useState(null)
  const [showProcessLearning, setShowProcessLearning] = useState(false)
  const [projectId, setProjectId] = useState(null)
  const [analysisReady, setAnalysisReady] = useState(false)
  const [showRefinement, setShowRefinement] = useState(false)

  // Load initial mock data when app starts
  useEffect(() => {
    fetchInitialData()
  }, [])

  // Mock API call to get business scenarios and CX options
  const fetchInitialData = async () => {
    try {
      console.log('🏢 Loading Multi-Agent AI Business Lab data...')

      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      setBusinessScenarios(mockBusinessScenarios.scenarios)
      setCxOptions(mockCXOptions)

      console.log('✅ Business lab data loaded successfully')
    } catch (error) {
      console.error('Error loading business lab data:', error)
      setError('Failed to load business lab data. Please refresh the page.')
    }
  }

  // Enhanced mock API call for AI business collaboration
  const createCXAnalysis = async () => {
    setLoading(true)
    setError(null)
    setAgentWorkflow([])
    setCurrentAgent(null)
    setAiBusinessInsights(null)
    setAnalysisReady(false)

    try {
      console.log('🤖 Starting AI business collaboration session...')
      console.log('📊 Business input:', cxProjectData)

      // Simulate agent workflow progression with business-focused timing
      const agents = [
        'customer_journey_analyst',
        'data_analytics_specialist',
        'process_improvement_specialist',
        'solution_designer',
        'implementation_strategist',
        'success_metrics_specialist',
      ]

      const agentNames = [
        'Customer Journey Analyst',
        'Data & Analytics Specialist',
        'Process Improvement Specialist',
        'Solution Designer',
        'Implementation Strategist',
        'Success Metrics Specialist',
      ]

      // Simulate agents working with business-focused commentary
      for (let i = 0; i < agents.length; i++) {
        const agent = agents[i]
        const agentName = agentNames[i]

        console.log(`📈 ${agentName} (${agent}) analyzing business data...`)
        setCurrentAgent(agent)

        // Business analysis timing - 2.5-3.5 seconds per agent
        await new Promise(resolve => setTimeout(resolve, 1200))

        console.log(`🔍 ${agentName} processing customer experience data...`)
        await new Promise(resolve => setTimeout(resolve, 1500))

        console.log(
          `💼 ${agentName} demonstrates: AI specialization in business analysis`,
        )
        await new Promise(resolve => setTimeout(resolve, 1000))

        setAgentWorkflow(prev => [...prev, agent])
        console.log(`✅ ${agentName} completed business analysis task`)
        await new Promise(resolve => setTimeout(resolve, 300))
      }

      // Generate mock CX report based on business input
      const mockReport = generateMockCXReport(cxProjectData)
      console.log(
        '📋 CX report generated:',
        mockReport.deliverables.executive_summary.substring(0, 100) + '...',
      )

      setGeneratedReport(mockReport)
      setProjectId(mockReport.project_id)
      setAiBusinessInsights(mockAIBusinessInsights)
      setAnalysisReady(true)

      console.log('🎯 AI business collaboration completed successfully!')

      // DON'T auto-advance to next step - wait for user action
    } catch (error) {
      console.error('AI business session failed:', error)
      setError(
        'AI business analysis failed. Please check your inputs and try again.',
      )
    } finally {
      setLoading(false)
      setCurrentAgent(null)
    }
  }

  // Function to refine recommendations based on user input
  const refineRecommendations = async userInput => {
    if (!generatedReport || !userInput.trim()) return

    setLoading(true)
    setShowRefinement(true)

    try {
      console.log('🔄 AI Refinement Agent processing user input...')
      await new Promise(resolve => setTimeout(resolve, 2000))

      const refined = generateRefinedRecommendations(generatedReport, userInput)
      setRefinedReport(refined)

      console.log('✨ Recommendations refined based on user input')
    } catch (error) {
      console.error('Error refining recommendations:', error)
      setError('Error refining recommendations. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Download function for final report
  const downloadReport = () => {
    const reportToDownload = refinedReport || generatedReport
    if (!reportToDownload) return

    const reportContent = `
CUSTOMER EXPERIENCE OPTIMIZATION REPORT
=======================================

PROJECT: ${reportToDownload.cx_analysis_details.scenario_analyzed}
DATE: ${new Date().toLocaleDateString()}
PROJECT ID: ${reportToDownload.project_id}

EXECUTIVE SUMMARY
${reportToDownload.deliverables.executive_summary}

KEY PAIN POINTS IDENTIFIED
${reportToDownload.deliverables.pain_points
  .map((point, i) => `${i + 1}. ${point}`)
  .join('\n')}

STRATEGIC RECOMMENDATIONS
${reportToDownload.deliverables.strategic_recommendations
  .map((rec, i) => `${i + 1}. ${rec}`)
  .join('\n')}

IMPLEMENTATION ROADMAP
Phase 1: ${reportToDownload.deliverables.implementation_roadmap.phase_1.title}
- ${reportToDownload.deliverables.implementation_roadmap.phase_1.actions.join(
      '\n- ',
    )}
Expected Impact: ${
      reportToDownload.deliverables.implementation_roadmap.phase_1
        .expected_impact
    }

Phase 2: ${reportToDownload.deliverables.implementation_roadmap.phase_2.title}
- ${reportToDownload.deliverables.implementation_roadmap.phase_2.actions.join(
      '\n- ',
    )}
Expected Impact: ${
      reportToDownload.deliverables.implementation_roadmap.phase_2
        .expected_impact
    }

Phase 3: ${reportToDownload.deliverables.implementation_roadmap.phase_3.title}
- ${reportToDownload.deliverables.implementation_roadmap.phase_3.actions.join(
      '\n- ',
    )}
Expected Impact: ${
      reportToDownload.deliverables.implementation_roadmap.phase_3
        .expected_impact
    }

SUCCESS METRICS
${reportToDownload.deliverables.success_metrics
  .map(metric => `${metric.metric}: ${metric.target} (${metric.timeframe})`)
  .join('\n')}

ESTIMATED ROI: ${reportToDownload.deliverables.estimated_roi}

---
Generated by Multi-Agent AI Business Lab
Confidence Score: ${reportToDownload.cx_analysis_details.confidence_score}
    `

    const blob = new Blob([reportContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `CX_Optimization_Report_${reportToDownload.project_id}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    console.log('📥 Report downloaded successfully')
  }

  // Mock function to get AI business insights
  const fetchBusinessInsights = async projectId => {
    try {
      console.log('🔍 Fetching AI business insights for project:', projectId)
      await new Promise(resolve => setTimeout(resolve, 500))
      setAiBusinessInsights(mockAIBusinessInsights)
      console.log('💡 AI business insights loaded')
    } catch (error) {
      console.error('Error fetching AI business insights:', error)
    }
  }

  // Mock regenerate report with same parameters
  const regenerateReport = async () => {
    setLoading(true)
    setError(null)

    try {
      console.log('🔄 Regenerating CX report with AI collaboration...')
      await new Promise(resolve => setTimeout(resolve, 2500))

      const mockReport = generateMockCXReport(cxProjectData)
      // Add variation to the report
      mockReport.deliverables.executive_summary =
        mockReport.deliverables.executive_summary.replace(
          'significant opportunities',
          'substantial potential',
        )

      setGeneratedReport(mockReport)
      setAiBusinessInsights(mockAIBusinessInsights)

      console.log('✨ CX report regenerated with variations')
    } catch (error) {
      console.error('Error regenerating report:', error)
      setError('Error regenerating report. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Reset the business lab for a new session
  const resetApp = () => {
    console.log('🔄 Resetting Multi-Agent AI Business Lab...')

    setCxProjectData({
      business_scenario: '',
      touchpoint: '',
      customer_personas: '',
      business_context: '',
      cx_objective: '',
      tone: '',
      industry: '',
      special_requirements: '',
      personasList: [
        {
          id: 'persona_' + Math.random().toString(36).substr(2, 9),
          name: '',
          description: '',
        },
      ],
      cxToolsList: [],
      enable_ai_business_mode: true,
    })

    setGeneratedReport(null)
    setRefinedReport(null)
    setCurrentStep(0)
    setError(null)
    setAgentWorkflow([])
    setCurrentAgent(null)
    setAiBusinessInsights(null)
    setProjectId(null)
    setShowProcessLearning(false)
    setAnalysisReady(false)
    setShowRefinement(false)

    console.log('✅ Business lab reset complete')
  }

  // Step validation logic
  const isStepComplete = step => {
    switch (step) {
      case 0:
        return cxProjectData.business_scenario !== ''
      case 1:
        return (
          cxProjectData.touchpoint !== '' &&
          cxProjectData.personasList.some(persona => persona.name.trim() !== '')
        )
      case 2:
        return isStepComplete(0) && isStepComplete(1)
      case 3:
        return generatedReport !== null
      default:
        return false
    }
  }

  // Smart navigation
  const handleStepNavigation = stepIndex => {
    if (stepIndex <= 0 || isStepComplete(stepIndex - 1)) {
      setCurrentStep(stepIndex)
      console.log(`📊 Navigated to step ${stepIndex + 1}`)
    }
  }

  // Toggle AI business mode
  const toggleAiBusinessMode = () => {
    setAiBusinessMode(!aiBusinessMode)
    setCxProjectData(prev => ({
      ...prev,
      enable_ai_business_mode: !aiBusinessMode,
    }))
    console.log('🎯 AI Business mode toggled:', !aiBusinessMode)
  }

  // Error boundary for initial data loading failures
  if (error && businessScenarios.length === 0) {
    return (
      <div className='error-app-container'>
        <div className='error-card'>
          <h2 className='error-title'>⚠️ Business Lab Loading Error</h2>
          <p className='error-message'>{error}</p>
          <button onClick={fetchInitialData} className='error-retry-btn'>
            🔄 Retry Loading
          </button>
        </div>
      </div>
    )
  }

  // Main render - pass everything to the business interface
  return (
    <BuildACXInterface
      // Current state
      currentStep={currentStep}
      cxProjectData={cxProjectData}
      businessScenarios={businessScenarios}
      cxOptions={cxOptions}
      generatedReport={generatedReport}
      refinedReport={refinedReport}
      loading={loading}
      error={error}
      // AI Business Lab state
      aiBusinessMode={aiBusinessMode}
      agentWorkflow={agentWorkflow}
      currentAgent={currentAgent}
      aiBusinessInsights={aiBusinessInsights}
      showProcessLearning={showProcessLearning}
      projectId={projectId}
      analysisReady={analysisReady}
      showRefinement={showRefinement}
      // State setters
      setCurrentStep={handleStepNavigation}
      setCxProjectData={setCxProjectData}
      setError={setError}
      // AI Business Lab setters
      setAiBusinessMode={toggleAiBusinessMode}
      setShowProcessLearning={setShowProcessLearning}
      // Mock API actions
      createCXAnalysis={createCXAnalysis}
      regenerateReport={regenerateReport}
      resetApp={resetApp}
      fetchBusinessInsights={fetchBusinessInsights}
      refineRecommendations={refineRecommendations}
      downloadReport={downloadReport}
      // Validation helpers
      isStepComplete={isStepComplete}
    />
  )
}

export default App
