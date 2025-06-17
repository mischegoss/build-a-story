import React, { useState, useEffect, useCallback } from 'react'
import './styles/common.css'

// Import modular components
import ProgressBarHeader from './components/ProgressBarHeader'
import Step1ScenarioSelection from './components/Step1ScenarioSelection'
import Step2TeamSetup from './components/Step2TeamSetup'
import Step3AnalysisInProgress from './components/Step3AnalysisinProgress'
import Step4ResultsAndRefinement from './components/Step4ResultsandRefinement'

const BuildACXInterface = ({
  currentStep,
  cxProjectData,
  businessScenarios,
  cxOptions,
  generatedReport,
  refinedReport,
  loading,
  error,
  setCurrentStep,
  setCxProjectData,
  createCXAnalysis,
  resetApp,
  setError,
  isStepComplete,
  // AI Automation props
  aiBusinessMode,
  agentWorkflow,
  currentAgent,
  chatMessages, // Server-generated chat messages
  aiBusinessInsights,
  setAiBusinessMode,
  analysisReady,
  showRefinement,
  refineRecommendations,
  downloadReport,
}) => {
  const [proposedChanges, setProposedChanges] = useState('')

  // Smooth scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentStep])

  // SIMPLIFIED: Agent statuses now only for UI display, not chat generation
  const [agentStatuses, setAgentStatuses] = useState([
    {
      name: 'Process Analysis Specialist',
      technical_name: 'customer_journey_analyst',
      avatar: '🔍',
      status: 'waiting',
      ai_specialty:
        'Process automation opportunity identification and analysis',
      what_i_do:
        'I analyze business processes to identify automation opportunities and calculate potential efficiency gains.',
      learning_moment:
        'This shows how AI can analyze complex business processes and identify automation opportunities that humans might overlook.',
    },
    {
      name: 'ROI Calculator',
      technical_name: 'data_analytics_specialist',
      avatar: '💰',
      status: 'waiting',
      ai_specialty: 'Financial modeling and automation ROI projection',
      what_i_do:
        'I calculate cost savings, implementation costs, and ROI projections for automation investments.',
      learning_moment:
        'This demonstrates how AI can process financial data to create accurate ROI models and payback period calculations.',
    },
    {
      name: 'Implementation Planner',
      technical_name: 'process_improvement_specialist',
      avatar: '📋',
      status: 'waiting',
      ai_specialty: 'Automation deployment strategy and timeline planning',
      what_i_do:
        'I create detailed implementation roadmaps with phases, timelines, and resource requirements.',
      learning_moment:
        'This shows how AI can create comprehensive project plans considering technical constraints and organizational readiness.',
    },
    {
      name: 'Risk Assessment Specialist',
      technical_name: 'solution_designer',
      avatar: '⚠️',
      status: 'waiting',
      ai_specialty: 'Automation risk evaluation and mitigation planning',
      what_i_do:
        'I identify implementation risks, change management challenges, and create mitigation strategies.',
      learning_moment:
        'This demonstrates AI risk analysis - evaluating technical, operational, and human factors in automation projects.',
    },
    {
      name: 'Technology Integration Specialist',
      technical_name: 'implementation_strategist',
      avatar: '🔧',
      status: 'waiting',
      ai_specialty: 'Automation technology assessment and integration planning',
      what_i_do:
        'I evaluate automation technologies and create integration plans with existing systems.',
      learning_moment:
        'This shows how AI can assess technology compatibility and design integration architectures for automation solutions.',
    },
    {
      name: 'Business Case Compiler',
      technical_name: 'success_metrics_specialist',
      avatar: '📊',
      status: 'waiting',
      ai_specialty: 'Executive business case development and metrics framework',
      what_i_do:
        'I compile all analysis into executive-ready business cases with success metrics and KPI frameworks.',
      learning_moment:
        'This demonstrates how AI can synthesize complex analysis into professional business documents tailored for executive decision-making.',
    },
  ])

  // SIMPLIFIED: Update agent statuses based on server data only
  useEffect(() => {
    if (agentWorkflow && agentWorkflow.length > 0) {
      setAgentStatuses(prev =>
        prev.map(agent => {
          const isCompleted = agentWorkflow.includes(agent.technical_name)
          const isWorking = currentAgent === agent.technical_name

          return {
            ...agent,
            status: isCompleted
              ? 'complete'
              : isWorking
              ? 'working'
              : 'waiting',
          }
        }),
      )
    }

    // Mark all complete when analysis is done
    if (generatedReport && !loading) {
      setAgentStatuses(prev =>
        prev.map(agent => ({
          ...agent,
          status: 'complete',
        })),
      )
    }
  }, [agentWorkflow, currentAgent, generatedReport, loading])

  // Clear proposed changes when starting new analysis
  useEffect(() => {
    if (currentStep === 0) {
      setProposedChanges('')
    }
  }, [currentStep])

  const handleDataSourceChange = useCallback(
    (dataSource, isChecked) => {
      setCxProjectData(prev => {
        let newSources = [...(prev.dataSourcesList || [])]
        if (isChecked && !newSources.includes(dataSource)) {
          newSources.push(dataSource)
        } else if (!isChecked) {
          newSources = newSources.filter(s => s !== dataSource)
        }
        return { ...prev, dataSourcesList: newSources }
      })
    },
    [setCxProjectData],
  )

  const handleProposedChangesChange = useCallback(e => {
    setProposedChanges(e.target.value)
  }, [])

  // Render the appropriate step component
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <Step1ScenarioSelection
            cxProjectData={cxProjectData}
            businessScenarios={businessScenarios}
            setCxProjectData={setCxProjectData}
            setCurrentStep={setCurrentStep}
          />
        )
      case 1:
        return (
          <Step2TeamSetup
            cxProjectData={cxProjectData}
            cxOptions={cxOptions}
            setCxProjectData={setCxProjectData}
            setCurrentStep={setCurrentStep}
            agentStatuses={agentStatuses}
            handleDataSourceChange={handleDataSourceChange}
          />
        )
      case 2:
        return (
          <Step3AnalysisInProgress
            loading={loading}
            generatedReport={generatedReport}
            error={error}
            agentStatuses={agentStatuses}
            setCurrentStep={setCurrentStep}
            createCXAnalysis={createCXAnalysis}
            analysisReady={analysisReady}
            cxProjectData={cxProjectData}
            currentAgent={currentAgent}
            chatMessages={chatMessages} // Pass server-generated chat messages
          />
        )
      case 3:
        return (
          <Step4ResultsAndRefinement
            generatedReport={generatedReport}
            refinedReport={refinedReport}
            showRefinement={showRefinement}
            proposedChanges={proposedChanges}
            handleProposedChangesChange={handleProposedChangesChange}
            refineRecommendations={refineRecommendations}
            downloadReport={downloadReport}
            resetApp={resetApp}
            loading={loading}
          />
        )
      default:
        return (
          <Step1ScenarioSelection
            cxProjectData={cxProjectData}
            businessScenarios={businessScenarios}
            setCxProjectData={setCxProjectData}
            setCurrentStep={setCurrentStep}
          />
        )
    }
  }

  return (
    <div className='learning-lab-container'>
      <div className='learning-lab-content'>
        {/* Progress Bar and Header */}
        <ProgressBarHeader
          currentStep={currentStep}
          error={error}
          setError={setError}
        />

        {/* Current Step Component */}
        {renderCurrentStep()}
      </div>
    </div>
  )
}

export default React.memo(BuildACXInterface)
