import React, { useState, useEffect } from 'react'
import BuildACXInterface from './BuildACXInterface'

// Import mock data and services
import { mockBusinessScenarios } from './mockdata/mockBusinessScenarios'
import { mockCXOptions } from './mockdata/mockCXData'
import { mockAIBusinessInsights } from './mockdata/aiBusinessInsights.js'
import {
  generateMockCXReport,
  generateRefinedRecommendations,
} from './services/mockReportGenerator'

const API_BASE =
  process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8000'

function App() {
  // Core application state
  const [businessScenarios, setBusinessScenarios] = useState([])
  const [cxOptions, setCxOptions] = useState({})
  const [currentStep, setCurrentStep] = useState(0)
  const [cxProjectData, setCxProjectData] = useState({
    business_scenario: '',
    // New business-focused fields
    report_audience: '',
    report_goal: '',
    customer_segment: '',
    target_kpi: '',
    success_definition: '',
    dataSourcesList: [],
    // Legacy fields (may be used by other parts)
    tone: '',
    industry: '',
    special_requirements: '',
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
      report_audience: '',
      report_goal: '',
      customer_segment: '',
      target_kpi: '',
      success_definition: '',
      dataSourcesList: [],
      tone: '',
      industry: '',
      special_requirements: '',
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
          cxProjectData.report_audience !== '' &&
          cxProjectData.report_goal !== '' &&
          cxProjectData.target_kpi !== '' &&
          cxProjectData.success_definition !== '' &&
          cxProjectData.dataSourcesList &&
          cxProjectData.dataSourcesList.length > 0
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
