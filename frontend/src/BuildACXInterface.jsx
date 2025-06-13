import React, { useState, useEffect, useCallback } from 'react'
import './BuildACX.css'

// Import modular components
import ProgressBarHeader from './components/ProgressBarHeader'
import Step1ScenarioSelection from './components/Step1ScenarioSelection'
import Step2TeamSetup from './components/Step2TeamSetup'
import Step3AnalysisInProgress from './components/Step3AnalysisinProgress'
import Step4ResultsAndRefinement from './components/Step4ResultsandRefinement'

// Simple ID generator for new personas
const generateId = () => {
  return 'persona_' + Math.random().toString(36).substr(2, 9)
}

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
  // AI Business props
  aiBusinessMode,
  agentWorkflow,
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

  // Enhanced agent statuses for business learning
  const [agentStatuses, setAgentStatuses] = useState([
    {
      name: 'Customer Journey Analyst',
      technical_name: 'customer_journey_analyst',
      avatar: '📋',
      status: 'waiting',
      ai_specialty: 'Customer experience mapping and journey analysis',
      what_i_do:
        'I map customer interactions across touchpoints and identify friction points in the experience.',
      learning_moment:
        'This shows how AI can analyze complex customer journeys across multiple touchpoints simultaneously.',
    },
    {
      name: 'Data & Analytics Specialist',
      technical_name: 'data_analytics_specialist',
      avatar: '📊',
      status: 'waiting',
      ai_specialty: 'Customer behavior analysis and metrics interpretation',
      what_i_do:
        'I process customer data to identify patterns, trends, and optimization opportunities.',
      learning_moment:
        'This demonstrates how AI can process thousands of customer data points to find insights humans might miss.',
    },
    {
      name: 'Process Improvement Specialist',
      technical_name: 'process_improvement_specialist',
      avatar: '🔧',
      status: 'waiting',
      ai_specialty: 'Business process optimization and efficiency analysis',
      what_i_do:
        'I identify bottlenecks and inefficiencies, then recommend process improvements.',
      learning_moment:
        'This shows how AI can simulate different process changes to predict outcomes before implementation.',
    },
    {
      name: 'Solution Designer',
      technical_name: 'solution_designer',
      avatar: '🎨',
      status: 'waiting',
      ai_specialty: 'Customer experience design and solution architecture',
      what_i_do:
        'I create comprehensive solutions that address identified pain points and achieve business objectives.',
      learning_moment:
        'This demonstrates AI creativity in business - generating innovative solutions within strategic constraints.',
    },
    {
      name: 'Implementation Strategist',
      technical_name: 'implementation_strategist',
      avatar: '🗂️',
      status: 'waiting',
      ai_specialty: 'Change management and implementation planning',
      what_i_do:
        'I develop realistic implementation roadmaps with timelines, resources, and success metrics.',
      learning_moment:
        'This shows how AI can create detailed project plans considering organizational constraints and capabilities.',
    },
    {
      name: 'Success Metrics Specialist',
      technical_name: 'success_metrics_specialist',
      avatar: '📈',
      status: 'waiting',
      ai_specialty: 'KPI development and performance measurement',
      what_i_do:
        'I establish measurable success criteria and create frameworks for tracking business impact.',
      learning_moment:
        'This demonstrates how AI can translate business objectives into specific, measurable outcomes.',
    },
  ])

  // Update agent statuses based on workflow
  useEffect(() => {
    if (agentWorkflow && agentWorkflow.length > 0) {
      setAgentStatuses(prev =>
        prev.map(agent => {
          const isCompleted = agentWorkflow.includes(agent.technical_name)
          return {
            ...agent,
            status: isCompleted ? 'complete' : agent.status,
          }
        }),
      )
    }

    if (generatedReport && !loading) {
      setAgentStatuses(prev =>
        prev.map(agent => ({
          ...agent,
          status: 'complete',
        })),
      )
    }
  }, [agentWorkflow, generatedReport, loading])

  // Clear proposed changes when starting new session
  useEffect(() => {
    if (currentStep === 0) {
      setProposedChanges('')
    }
  }, [currentStep])

  // Persona management functions
  const handlePersonaChange = useCallback(
    (index, field, value) => {
      setCxProjectData(prev => {
        const updatedPersonas = [...(prev.personasList || [])]
        updatedPersonas[index] = {
          ...updatedPersonas[index],
          [field]: value,
        }
        return { ...prev, personasList: updatedPersonas }
      })
    },
    [setCxProjectData],
  )

  const addPersona = useCallback(() => {
    setCxProjectData(prev => ({
      ...prev,
      personasList: [
        ...(prev.personasList || []),
        { id: generateId(), name: '', description: '' },
      ],
    }))
  }, [setCxProjectData])

  const removePersona = useCallback(
    index => {
      setCxProjectData(prev => ({
        ...prev,
        personasList: prev.personasList.filter((_, i) => i !== index),
      }))
    },
    [setCxProjectData],
  )

  const handleCXToolChange = useCallback(
    (tool, isChecked) => {
      setCxProjectData(prev => {
        let newTools = [...(prev.cxToolsList || [])]
        if (isChecked && !newTools.includes(tool)) {
          if (newTools.length < 4) {
            newTools.push(tool)
          }
        } else if (!isChecked) {
          newTools = newTools.filter(t => t !== tool)
        }
        return { ...prev, cxToolsList: newTools }
      })
    },
    [setCxProjectData],
  )

  // Handle proposed changes
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
            handlePersonaChange={handlePersonaChange}
            addPersona={addPersona}
            removePersona={removePersona}
            handleCXToolChange={handleCXToolChange}
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
