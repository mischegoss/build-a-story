import React, { useState, useEffect, useCallback } from 'react'
import BuildACXInterface from './BuildACXInterface'

// Import mock data and services
import { mockBusinessScenarios } from './mockdata/mockBusinessScenarios'
import { mockAIBusinessInsights } from './mockdata/aiBusinessInsights.js'
import { generateRefinedAutomationRecommendations } from './services/mockAutomationReportGenerator'

const API_BASE =
  process.env.NODE_ENV === 'production'
    ? 'https://your-production-api-url.com' // Update this later for production
    : 'http://localhost:8000'

// Helper function to ensure required fields for API
const ensureRequiredFields = cxProjectData => {
  return {
    // Map frontend form fields to API expected fields
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

    // Optional fields
    business_context: cxProjectData.business_context || '',
    cx_objective: cxProjectData.cx_objective || cxProjectData.report_goal || '',
    decision_makers: cxProjectData.decision_makers || [],
    affected_departments: cxProjectData.affected_departments || [],

    // Legacy compatibility
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
    // Automation business case focused fields
    report_audience: '',
    report_goal: '',
    customer_segment: '', // Now represents department/process area
    target_kpi: '', // Now automation metric
    success_definition: '', // Now automation ROI target
    dataSourcesList: [], // Now process data types
    // Additional required fields for API
    business_challenge: '',
    current_state: '',
    process_frequency: '',
    monthly_volume: '',
    people_involved: '',
    manual_percentage: '',
    decision_makers: [],
    affected_departments: [],
    business_context: '',
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
  const [sessionId, setSessionId] = useState(null) // Add this for tracking the real session ID
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

  // Real API polling function
  const pollAnalysisStatus = async sessionIdParam => {
    const maxAttempts = 80 // 4 minutes max (3 second intervals)
    let attempts = 0

    // Store the session ID for later use in refinement
    setSessionId(sessionIdParam)

    console.log(`🔄 Starting status polling for session: ${sessionIdParam}`)

    const poll = async () => {
      try {
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

        // Update frontend with real progress
        if (
          statusData.completed_agents &&
          statusData.completed_agents.length > 0
        ) {
          setAgentWorkflow(statusData.completed_agents)
          console.log(
            `✅ Agents completed: ${statusData.completed_agents.length}/6`,
          )
        }

        if (statusData.current_agent) {
          setCurrentAgent(statusData.current_agent)
          console.log(`🤖 Current agent: ${statusData.current_agent}`)
        }

        // Check if analysis is complete
        if (statusData.status === 'complete' && statusData.result) {
          console.log('🎉 Analysis complete! Processing results...')

          // Set the generated report
          setGeneratedReport(statusData.result)
          setProjectId(statusData.result.project_id || sessionIdParam)
          setAiBusinessInsights(mockAIBusinessInsights) // Keep mock insights for now
          setAnalysisReady(true)

          console.log('✅ Results processed successfully')
          console.log(`📋 Session ID stored: ${sessionIdParam}`)
          console.log(
            `📋 Project ID set: ${
              statusData.result.project_id || sessionIdParam
            }`,
          )
          return // Exit polling
        }

        // Check for errors
        if (statusData.status === 'error') {
          throw new Error(statusData.error || 'Analysis failed on server')
        }

        // Continue polling if still processing
        if (statusData.status === 'processing' && attempts < maxAttempts) {
          console.log(
            `⏳ Still processing... (${
              statusData.estimated_completion || 'calculating time remaining'
            })`,
          )
          setTimeout(poll, 3000) // Poll every 3 seconds
        } else if (attempts >= maxAttempts) {
          throw new Error('Analysis timeout - please try again')
        }
      } catch (error) {
        console.error('❌ Polling error:', error)
        setError(`Analysis failed: ${error.message}`)
      }
    }

    // Start polling immediately
    poll()
  }

  // Real API call for AI automation analysis
  const createCXAnalysis = useCallback(async () => {
    setLoading(true)
    setError(null)
    setAgentWorkflow([])
    setCurrentAgent(null)
    setAiBusinessInsights(null)
    setAnalysisReady(false)

    try {
      console.log('🤖 Starting REAL AI automation analysis...')

      // Ensure all required fields are present
      const apiData = ensureRequiredFields(cxProjectData)
      console.log('📊 Sending data to API:', apiData)

      // Call real API to create analysis
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

      // Store the session ID immediately for later use
      setSessionId(sessionIdFromAPI)
      setProjectId(sessionIdFromAPI) // Keep for compatibility

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
    } finally {
      setLoading(false)
      setCurrentAgent(null)
    }
  }, [cxProjectData])

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

      // Fallback to mock refinement if API fails
      try {
        console.log('🔄 Falling back to mock refinement...')
        const refined = generateRefinedAutomationRecommendations(
          generatedReport,
          userInput,
        )
        setRefinedReport(refined)
        console.log('✨ Mock refinement completed')
        setError(null) // Clear the error since fallback worked
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
ANNUAL SAVINGS: ${
      reportToDownload.deliverables.annual_savings ||
      'Significant cost reduction'
    }

RISK ASSESSMENT: ${reportToDownload.deliverables.risk_assessment}

---
Generated by AI Automation Business Case Builder
Confidence Score: ${
      reportToDownload.automation_analysis_details?.confidence_score || '95%'
    }
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

  // Mock regenerate automation business case with same parameters
  const regenerateReport = async () => {
    setLoading(true)
    setError(null)

    try {
      console.log('🔄 Regenerating automation business case...')

      // Try to call the real API again
      await createCXAnalysis()
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
    setAiBusinessInsights(null)
    setProjectId(null)
    setSessionId(null) // Clear the session ID
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
        // Check for the new required fields
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
    // Don't reset form data - let user try again
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
      sessionId={sessionId} // Pass session ID to child components if needed
      analysisReady={analysisReady}
      showRefinement={showRefinement}
      // State setters
      setCurrentStep={handleStepNavigation}
      setCxProjectData={setCxProjectData}
      setError={setError}
      // AI Automation Analysis setters
      setAiBusinessMode={toggleAiBusinessMode}
      setShowProcessLearning={setShowProcessLearning}
      // Real API actions
      createCXAnalysis={createCXAnalysis}
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
