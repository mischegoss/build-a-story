import React, { useState, useEffect, useCallback, useRef } from 'react'
import BuildACXInterface from './BuildACXInterface'
import analysisManager from './analysis-manager.js' // Global singleton protection

// Import mock data and services
import { mockBusinessScenarios } from './mockdata/mockBusinessScenarios'
import { mockAIBusinessInsights } from './mockdata/aiBusinessInsights.js'
import { generateRefinedAutomationRecommendations } from './services/mockAutomationReportGenerator'

const API_BASE =
  process.env.NODE_ENV === 'production'
    ? 'https://your-production-api-url.com'
    : 'http://localhost:8000'

// Helper function to ensure required fields for API
const ensureRequiredFields = cxProjectData => {
  return {
    business_challenge:
      cxProjectData.business_challenge ||
      cxProjectData.target_kpi ||
      'Process optimization needed',
    current_state:
      cxProjectData.current_state ||
      `Current ${
        cxProjectData.business_scenario || 'process'
      } requires manual effort`,
    success_definition:
      cxProjectData.success_definition ||
      `Improve ${cxProjectData.target_kpi || 'efficiency'} significantly`,
    process_frequency: cxProjectData.process_frequency || 'Daily',
    monthly_volume: parseInt(cxProjectData.monthly_volume) || 200,
    people_involved: parseInt(cxProjectData.people_involved) || 3,
    manual_percentage: parseInt(cxProjectData.manual_percentage) || 75,
    business_scenario: cxProjectData.business_scenario || 'Process Automation',
    business_context: cxProjectData.business_context || '',
    cx_objective: cxProjectData.cx_objective || cxProjectData.report_goal || '',
    decision_makers: cxProjectData.decision_makers || [],
    affected_departments: cxProjectData.affected_departments || [],
    personasList: cxProjectData.personasList || [],
    cxToolsList: cxProjectData.cxToolsList || [],
  }
}

function App() {
  // Core application state
  const [businessScenarios, setBusinessScenarios] = useState([])
  const [currentStep, setCurrentStep] = useState(0)
  const [cxProjectData, setCxProjectData] = useState({
    business_scenario: '',
    report_audience: '',
    report_goal: '',
    customer_segment: '',
    target_kpi: '',
    success_definition: '',
    dataSourcesList: [],
    business_challenge: '',
    current_state: '',
    process_frequency: '',
    monthly_volume: '',
    people_involved: '',
    manual_percentage: '',
    decision_makers: [],
    affected_departments: [],
    business_context: '',
    tone: '',
    industry: '',
    special_requirements: '',
    enable_ai_business_mode: true,
  })

  // AI Automation Analysis state
  const [generatedReport, setGeneratedReport] = useState(null)
  const [refinedReport, setRefinedReport] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [aiBusinessMode, setAiBusinessMode] = useState(true)
  const [agentWorkflow, setAgentWorkflow] = useState([])
  const [currentAgent, setCurrentAgent] = useState(null)
  const [chatMessages, setChatMessages] = useState([])
  const [aiBusinessInsights, setAiBusinessInsights] = useState(null)
  const [showProcessLearning, setShowProcessLearning] = useState(false)
  const [projectId, setProjectId] = useState(null)
  const [sessionId, setSessionId] = useState(null)
  const [analysisReady, setAnalysisReady] = useState(false)
  const [showRefinement, setShowRefinement] = useState(false)

  // Ref for polling cleanup
  const pollingRef = useRef(null)

  // Load initial mock data when app starts
  useEffect(() => {
    fetchInitialData()

    // Check if there's an active analysis on mount
    const status = analysisManager.getStatus()
    if (status.isAnalysisActive && status.activeSessionId) {
      console.log('📱 Found active analysis on mount:', status.activeSessionId)
      setSessionId(status.activeSessionId)
      setLoading(true)
      pollAnalysisStatus(status.activeSessionId)
    }
  }, [])

  const fetchInitialData = async () => {
    try {
      console.log('🤖 Loading AI Automation Business Case Builder data...')
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

  // ULTIMATE polling function with global singleton protection
  const pollAnalysisStatus = useCallback(async sessionIdParam => {
    // Clear any existing polling
    if (pollingRef.current) {
      clearTimeout(pollingRef.current)
      pollingRef.current = null
    }

    const maxAttempts = 60
    let attempts = 0

    setSessionId(sessionIdParam)
    console.log(`🔄 Starting status polling for session: ${sessionIdParam}`)

    const poll = async () => {
      try {
        // Check if this session is still valid globally
        const globalStatus = analysisManager.getStatus()
        if (globalStatus.activeSessionId !== sessionIdParam) {
          console.log('🛑 Session no longer active globally, stopping polling')
          return
        }

        attempts++
        console.log(`📡 Polling attempt ${attempts}/${maxAttempts}`)

        const response = await fetch(
          `${API_BASE}/api/v1/cx-analysis/status/${sessionIdParam}`,
        )

        if (!response.ok) {
          throw new Error(`Status check failed: ${response.status}`)
        }

        const statusData = await response.json()
        console.log(`📊 Status update:`, statusData)

        // Update agent workflow from server
        if (
          statusData.completed_agents &&
          statusData.completed_agents.length > 0
        ) {
          setAgentWorkflow(statusData.completed_agents)
          console.log(
            `✅ Agents completed: ${statusData.completed_agents.length}/6`,
          )
        }

        // Update current agent from server
        if (statusData.current_agent) {
          setCurrentAgent(statusData.current_agent)
          console.log(`🤖 Current agent: ${statusData.current_agent}`)
        } else {
          setCurrentAgent(null)
        }

        // Update chat messages from server
        if (statusData.chat_messages && statusData.chat_messages.length > 0) {
          setChatMessages(statusData.chat_messages)
          console.log(`💬 Chat messages: ${statusData.chat_messages.length}`)
        }

        // Check if analysis is complete
        if (statusData.status === 'complete' && statusData.result) {
          console.log('🎉 Analysis complete! Processing results...')

          // Clear polling
          if (pollingRef.current) {
            clearTimeout(pollingRef.current)
            pollingRef.current = null
          }

          // Mark as complete globally
          analysisManager.completeAnalysis()

          setGeneratedReport(statusData.result)
          setProjectId(statusData.result.project_id || sessionIdParam)
          setAiBusinessInsights(mockAIBusinessInsights)
          setAnalysisReady(true)
          setCurrentAgent(null)
          setLoading(false)

          console.log('✅ Results processed successfully')
          return
        }

        // Check for errors
        if (statusData.status === 'error') {
          throw new Error(statusData.error || 'Analysis failed on server')
        }

        // Continue polling if still processing
        if (statusData.status === 'processing' && attempts < maxAttempts) {
          console.log(
            `⏳ Still processing... (attempt ${attempts}/${maxAttempts})`,
          )
          pollingRef.current = setTimeout(poll, 5000)
        } else if (attempts >= maxAttempts) {
          throw new Error('Analysis timeout - please try again')
        }
      } catch (error) {
        console.error('❌ Polling error:', error)
        setError(`Analysis failed: ${error.message}`)
        setCurrentAgent(null)
        setLoading(false)

        // Mark as error globally
        analysisManager.errorAnalysis()

        if (pollingRef.current) {
          clearTimeout(pollingRef.current)
          pollingRef.current = null
        }
      }
    }

    poll()
  }, [])

  // ULTIMATE single request function with global singleton protection
  const createCXAnalysis = useCallback(async () => {
    console.log('🎯 createCXAnalysis called')
    console.log('🔍 Global manager status:', analysisManager.getStatus())

    // ULTIMATE GUARD: Global singleton check
    if (!analysisManager.canStartAnalysis()) {
      console.log('🛑 ULTIMATE GUARD: Global manager blocked request')
      return
    }

    // Additional local guards for extra safety
    if (loading || generatedReport || analysisReady) {
      console.log('🛑 LOCAL GUARD: Component state blocked request')
      return
    }

    try {
      console.log('🚀 ULTIMATE: Starting single request with global protection')

      // Generate session ID first
      const tempSessionId = `temp-${Date.now()}`

      // Register with global manager BEFORE making request
      analysisManager.startAnalysis(tempSessionId)

      // Set local loading state
      setLoading(true)
      setError(null)
      setAgentWorkflow([])
      setCurrentAgent(null)
      setChatMessages([])
      setAiBusinessInsights(null)
      setAnalysisReady(false)

      console.log('🤖 Starting REAL AI automation analysis...')

      const apiData = ensureRequiredFields(cxProjectData)
      console.log('📊 Sending data to API:', apiData)

      const response = await fetch(`${API_BASE}/api/v1/cx-analysis/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.detail || `API Error: ${response.status}`)
      }

      const data = await response.json()
      const sessionIdFromAPI = data.session_id

      // Update global manager with real session ID
      analysisManager.activeSessionId = sessionIdFromAPI
      analysisManager.saveState()

      setSessionId(sessionIdFromAPI)
      setProjectId(sessionIdFromAPI)

      console.log(`📋 Analysis session started: ${sessionIdFromAPI}`)
      console.log(`🎯 ${data.message}`)

      // Start polling for results
      await pollAnalysisStatus(sessionIdFromAPI)
    } catch (error) {
      console.error('❌ AI automation analysis failed:', error)
      setError(
        error.message ||
          'AI automation analysis failed. Please check your inputs and try again.',
      )

      // Reset global manager on error
      analysisManager.errorAnalysis()
      setLoading(false)
      setCurrentAgent(null)
    }
  }, [cxProjectData, pollAnalysisStatus])

  // ULTIMATE manual trigger function with all protections
  const triggerAnalysis = useCallback(() => {
    console.log('🎯 Manual trigger called')

    const globalStatus = analysisManager.getStatus()
    console.log('🔍 Global status:', globalStatus)
    console.log('🔍 Local loading:', loading)
    console.log('🔍 Has results:', !!generatedReport)

    // Check both global and local state
    if (
      !analysisManager.canStartAnalysis() ||
      loading ||
      generatedReport ||
      analysisReady
    ) {
      console.log(
        '🛑 ULTIMATE GUARD: Request blocked by global or local guards',
      )
      return
    }

    console.log('✅ All guards clear, proceeding with analysis')
    createCXAnalysis()
  }, [createCXAnalysis, loading, generatedReport, analysisReady])

  // Real API function to refine automation recommendations
  const refineRecommendations = async userInput => {
    if (!generatedReport || !userInput.trim()) {
      console.log('⚠️ No report to refine or empty input')
      return
    }

    if (!sessionId) {
      console.log('⚠️ No session ID available for refinement')
      setError(
        'Unable to refine - session expired. Please generate a new analysis.',
      )
      return
    }

    setLoading(true)
    setShowRefinement(true)

    try {
      console.log('🔄 Sending refinement request to AI...')
      console.log(`📋 Using session ID: ${sessionId}`)

      const response = await fetch(
        `${API_BASE}/api/v1/cx-analysis/refine/${sessionId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            refinement_input: userInput,
          }),
        },
      )

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(
          errorData.detail || `Refinement failed: ${response.status}`,
        )
      }

      const refinementData = await response.json()
      setRefinedReport(refinementData.refined_analysis)

      console.log('✨ Automation recommendations refined successfully')
    } catch (error) {
      console.error('❌ Refinement error:', error)
      setError(
        error.message ||
          'Error refining automation recommendations. Please try again.',
      )

      // Fallback to mock refinement
      try {
        console.log('🔄 Falling back to mock refinement...')
        const refined = generateRefinedAutomationRecommendations(
          generatedReport,
          userInput,
        )
        setRefinedReport(refined)
        console.log('✨ Mock refinement completed')
        setError(null)
      } catch (fallbackError) {
        console.error('❌ Fallback refinement also failed:', fallbackError)
      }
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

PROJECT: ${
      reportToDownload.automation_analysis_details?.scenario_analyzed ||
      'Automation Project'
    }
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

ESTIMATED ROI: ${reportToDownload.deliverables.estimated_roi}
PAYBACK PERIOD: ${reportToDownload.deliverables.payback_period || '8-12 months'}
ANNUAL SAVINGS: ${
      reportToDownload.deliverables.annual_savings ||
      'Significant cost reduction'
    }

---
Generated by AI Automation Business Case Builder
Session ID: ${sessionId || 'N/A'}
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

  // Regenerate automation business case with complete reset
  const regenerateReport = async () => {
    console.log('🔄 Regenerating automation business case...')

    // COMPLETE GLOBAL RESET
    analysisManager.resetAnalysis()

    if (pollingRef.current) {
      clearTimeout(pollingRef.current)
      pollingRef.current = null
    }

    setLoading(false)
    setError(null)
    setGeneratedReport(null)
    setAnalysisReady(false)
    setAgentWorkflow([])
    setCurrentAgent(null)
    setChatMessages([])

    // Small delay to ensure state is reset
    setTimeout(() => {
      console.log('🚀 Triggering regeneration after complete reset')
      triggerAnalysis()
    }, 100)
  }

  // COMPLETE RESET function with global cleanup
  const resetApp = () => {
    console.log('🔄 Resetting AI Automation Business Case Builder...')

    // Clear polling
    if (pollingRef.current) {
      clearTimeout(pollingRef.current)
      pollingRef.current = null
    }

    // COMPLETE GLOBAL RESET
    analysisManager.resetAnalysis()

    setCxProjectData({
      business_scenario: '',
      report_audience: '',
      report_goal: '',
      customer_segment: '',
      target_kpi: '',
      success_definition: '',
      dataSourcesList: [],
      business_challenge: '',
      current_state: '',
      process_frequency: '',
      monthly_volume: '',
      people_involved: '',
      manual_percentage: '',
      decision_makers: [],
      affected_departments: [],
      business_context: '',
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
    setChatMessages([])
    setAiBusinessInsights(null)
    setProjectId(null)
    setSessionId(null)
    setShowProcessLearning(false)
    setAnalysisReady(false)
    setShowRefinement(false)
    setLoading(false)

    console.log('✅ Complete reset finished - all guards cleared globally')
  }

  // Step validation logic
  const isStepComplete = step => {
    switch (step) {
      case 0:
        return cxProjectData.business_scenario !== ''
      case 1:
        const hasBasicFields = !!(
          (cxProjectData.business_challenge || cxProjectData.target_kpi) &&
          (cxProjectData.success_definition || cxProjectData.report_goal) &&
          (cxProjectData.current_state || cxProjectData.business_scenario)
        )
        const hasMetrics = !!(
          cxProjectData.process_frequency &&
          cxProjectData.monthly_volume &&
          cxProjectData.people_involved
        )
        return hasBasicFields && hasMetrics
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

  // Handle retry for analysis errors
  const handleRetry = () => {
    setError(null)
    setLoading(false)
    setAgentWorkflow([])
    setCurrentAgent(null)
    setChatMessages([])

    // Reset global manager
    analysisManager.errorAnalysis()
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (pollingRef.current) {
        clearTimeout(pollingRef.current)
      }
      // Note: Don't reset global manager on unmount - let it persist
    }
  }, [])

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
      chatMessages={chatMessages}
      aiBusinessInsights={aiBusinessInsights}
      showProcessLearning={showProcessLearning}
      projectId={projectId}
      sessionId={sessionId}
      analysisReady={analysisReady}
      showRefinement={showRefinement}
      // State setters
      setCurrentStep={handleStepNavigation}
      setCxProjectData={setCxProjectData}
      setError={setError}
      // AI Automation Analysis setters
      setAiBusinessMode={toggleAiBusinessMode}
      setShowProcessLearning={setShowProcessLearning}
      // ULTIMATE API actions with global protection
      createCXAnalysis={triggerAnalysis}
      regenerateReport={regenerateReport}
      resetApp={resetApp}
      fetchBusinessInsights={fetchBusinessInsights}
      refineRecommendations={refineRecommendations}
      downloadReport={downloadReport}
      // Validation helpers
      isStepComplete={isStepComplete}
      // Error handling
      handleRetry={handleRetry}
    />
  )
}

export default App
