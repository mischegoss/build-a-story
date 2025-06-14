import React, { useState, useEffect } from 'react'
import BuildACXInterface from './BuildACXInterface'

// Import mock data and services
import { mockBusinessScenarios } from './mockdata/mockBusinessScenarios'
import { mockAIBusinessInsights } from './mockdata/aiBusinessInsights.js'
import {
  generateMockAutomationReport,
  generateRefinedAutomationRecommendations,
} from './services/mockAutomationReportGenerator'

const API_BASE =
  process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8000'

function App() {
  // Core application state
  const [businessScenarios, setBusinessScenarios] = useState([])
  const [currentStep, setCurrentStep] = useState(0)
  const [cxProjectData, setCxProjectData] = useState({
    business_scenario: '',
    // Automation business case focused fields
    report_audience: '',
    report_goal: '',
    customer_segment: '', // Now represents department/process area
    target_kpi: '', // Now automation metric
    success_definition: '', // Now automation ROI target
    dataSourcesList: [], // Now process data types
    // Legacy fields (may be used by other parts)
    tone: '',
    industry: '',
    special_requirements: '',
    enable_ai_business_mode: true, // Always enabled for automation analysis
  })

  // AI Automation Analysis state
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

  // Mock API call to get automation scenarios
  const fetchInitialData = async () => {
    try {
      console.log('🤖 Loading AI Automation Business Case Builder data...')

      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      setBusinessScenarios(mockBusinessScenarios.scenarios)

      console.log('✅ Automation analysis data loaded successfully')
    } catch (error) {
      console.error('Error loading automation analysis data:', error)
      setError(
        'Failed to load automation analysis data. Please refresh the page.',
      )
    }
  }

  // Enhanced mock API call for AI automation analysis collaboration
  const createCXAnalysis = async () => {
    setLoading(true)
    setError(null)
    setAgentWorkflow([])
    setCurrentAgent(null)
    setAiBusinessInsights(null)
    setAnalysisReady(false)

    try {
      console.log('🤖 Starting AI automation analysis session...')
      console.log('📊 Automation process input:', cxProjectData)

      // Simulate automation specialist workflow progression
      const agents = [
        'customer_journey_analyst', // Process Analysis Specialist
        'data_analytics_specialist', // ROI Calculator
        'process_improvement_specialist', // Implementation Planner
        'solution_designer', // Risk Assessment Specialist
        'implementation_strategist', // Technology Integration Specialist
        'success_metrics_specialist', // Business Case Compiler
      ]

      const agentNames = [
        'Process Analysis Specialist',
        'ROI Calculator',
        'Implementation Planner',
        'Risk Assessment Specialist',
        'Technology Integration Specialist',
        'Business Case Compiler',
      ]

      // Simulate automation specialists working with ROI-focused commentary
      for (let i = 0; i < agents.length; i++) {
        const agent = agents[i]
        const agentName = agentNames[i]

        console.log(
          `📈 ${agentName} (${agent}) analyzing automation opportunity...`,
        )
        setCurrentAgent(agent)

        // Automation analysis timing - 2.5-3.5 seconds per specialist
        await new Promise(resolve => setTimeout(resolve, 1200))

        console.log(`🔍 ${agentName} processing automation ROI data...`)
        await new Promise(resolve => setTimeout(resolve, 1500))

        console.log(
          `💼 ${agentName} demonstrates: AI specialization in automation analysis`,
        )
        await new Promise(resolve => setTimeout(resolve, 1000))

        setAgentWorkflow(prev => [...prev, agent])
        console.log(`✅ ${agentName} completed automation analysis task`)
        await new Promise(resolve => setTimeout(resolve, 300))
      }

      // Generate mock automation business case based on input
      const mockReport = generateMockAutomationReport(cxProjectData)
      console.log(
        '📋 Automation business case generated:',
        mockReport.deliverables.executive_summary.substring(0, 100) + '...',
      )

      setGeneratedReport(mockReport)
      setProjectId(mockReport.project_id)
      setAiBusinessInsights(mockAIBusinessInsights)
      setAnalysisReady(true)

      console.log('🎯 AI automation analysis completed successfully!')

      // DON'T auto-advance to next step - wait for user action
    } catch (error) {
      console.error('AI automation analysis failed:', error)
      setError(
        'AI automation analysis failed. Please check your inputs and try again.',
      )
    } finally {
      setLoading(false)
      setCurrentAgent(null)
    }
  }

  // Function to refine automation recommendations based on user input
  const refineRecommendations = async userInput => {
    if (!generatedReport || !userInput.trim()) return

    setLoading(true)
    setShowRefinement(true)

    try {
      console.log('🔄 AI Refinement Agent processing business constraints...')
      await new Promise(resolve => setTimeout(resolve, 2000))

      const refined = generateRefinedAutomationRecommendations(
        generatedReport,
        userInput,
      )
      setRefinedReport(refined)

      console.log(
        '✨ Automation business case refined based on operational input',
      )
    } catch (error) {
      console.error('Error refining automation recommendations:', error)
      setError('Error refining automation business case. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Download function for automation business case
  const downloadReport = () => {
    const reportToDownload = refinedReport || generatedReport
    if (!reportToDownload) return

    const reportContent = `
AUTOMATION BUSINESS CASE REPORT
===============================

PROJECT: ${reportToDownload.automation_analysis_details.scenario_analyzed}
DATE: ${new Date().toLocaleDateString()}
PROJECT ID: ${reportToDownload.project_id}

EXECUTIVE SUMMARY
${reportToDownload.deliverables.executive_summary}

KEY AUTOMATION OPPORTUNITIES IDENTIFIED
${reportToDownload.deliverables.automation_opportunities
  .map((opportunity, i) => `${i + 1}. ${opportunity}`)
  .join('\n')}

ROI RECOMMENDATIONS
${reportToDownload.deliverables.strategic_recommendations
  .map((rec, i) => `${i + 1}. ${rec}`)
  .join('\n')}

IMPLEMENTATION ROADMAP
Phase 1: ${reportToDownload.deliverables.implementation_roadmap.phase_1.title}
- ${reportToDownload.deliverables.implementation_roadmap.phase_1.actions.join(
      '\n- ',
    )}
Expected ROI Impact: ${
      reportToDownload.deliverables.implementation_roadmap.phase_1
        .expected_impact
    }

Phase 2: ${reportToDownload.deliverables.implementation_roadmap.phase_2.title}
- ${reportToDownload.deliverables.implementation_roadmap.phase_2.actions.join(
      '\n- ',
    )}
Expected ROI Impact: ${
      reportToDownload.deliverables.implementation_roadmap.phase_2
        .expected_impact
    }

Phase 3: ${reportToDownload.deliverables.implementation_roadmap.phase_3.title}
- ${reportToDownload.deliverables.implementation_roadmap.phase_3.actions.join(
      '\n- ',
    )}
Expected ROI Impact: ${
      reportToDownload.deliverables.implementation_roadmap.phase_3
        .expected_impact
    }

SUCCESS METRICS & ROI FRAMEWORK
${reportToDownload.deliverables.success_metrics
  .map(metric => `${metric.metric}: ${metric.target} (${metric.timeframe})`)
  .join('\n')}

ESTIMATED ROI: ${reportToDownload.deliverables.estimated_roi}
PAYBACK PERIOD: ${reportToDownload.deliverables.payback_period || '8-12 months'}

RISK ASSESSMENT: ${reportToDownload.deliverables.risk_assessment}

---
Generated by AI Automation Business Case Builder
Confidence Score: ${
      reportToDownload.automation_analysis_details.confidence_score
    }
    `

    const blob = new Blob([reportContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `Automation_Business_Case_${reportToDownload.project_id}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    console.log('📥 Automation business case downloaded successfully')
  }

  // Mock function to get AI automation insights
  const fetchBusinessInsights = async projectId => {
    try {
      console.log('🔍 Fetching AI automation insights for project:', projectId)
      await new Promise(resolve => setTimeout(resolve, 500))
      setAiBusinessInsights(mockAIBusinessInsights)
      console.log('💡 AI automation insights loaded')
    } catch (error) {
      console.error('Error fetching AI automation insights:', error)
    }
  }

  // Mock regenerate automation business case with same parameters
  const regenerateReport = async () => {
    setLoading(true)
    setError(null)

    try {
      console.log(
        '🔄 Regenerating automation business case with AI collaboration...',
      )
      await new Promise(resolve => setTimeout(resolve, 2500))

      const mockReport = generateMockAutomationReport(cxProjectData)
      // Add variation to the automation report
      mockReport.deliverables.executive_summary =
        mockReport.deliverables.executive_summary.replace(
          'significant automation opportunities',
          'substantial ROI potential',
        )

      setGeneratedReport(mockReport)
      setAiBusinessInsights(mockAIBusinessInsights)

      console.log('✨ Automation business case regenerated with variations')
    } catch (error) {
      console.error('Error regenerating automation business case:', error)
      setError('Error regenerating automation business case. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Reset the automation analysis for a new session
  const resetApp = () => {
    console.log('🔄 Resetting AI Automation Business Case Builder...')

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

    console.log('✅ Automation analysis reset complete')
  }

  // Step validation logic for automation analysis
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

  // Smart navigation for automation analysis
  const handleStepNavigation = stepIndex => {
    if (stepIndex <= 0 || isStepComplete(stepIndex - 1)) {
      setCurrentStep(stepIndex)
      console.log(`📊 Navigated to automation analysis step ${stepIndex + 1}`)
    }
  }

  // Toggle AI automation mode
  const toggleAiBusinessMode = () => {
    setAiBusinessMode(!aiBusinessMode)
    setCxProjectData(prev => ({
      ...prev,
      enable_ai_business_mode: !aiBusinessMode,
    }))
    console.log('🎯 AI Automation mode toggled:', !aiBusinessMode)
  }

  // Error boundary for initial data loading failures
  if (error && businessScenarios.length === 0) {
    return (
      <div className='error-app-container'>
        <div className='error-card'>
          <h2 className='error-title'>⚠️ Automation Analysis Loading Error</h2>
          <p className='error-message'>{error}</p>
          <button onClick={fetchInitialData} className='error-retry-btn'>
            🔄 Retry Loading
          </button>
        </div>
      </div>
    )
  }

  // Main render - pass everything to the automation interface
  return (
    <BuildACXInterface
      // Current state
      currentStep={currentStep}
      cxProjectData={cxProjectData}
      businessScenarios={businessScenarios}
      generatedReport={generatedReport}
      refinedReport={refinedReport}
      loading={loading}
      error={error}
      // AI Automation Analysis state
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
      // AI Automation Analysis setters
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
