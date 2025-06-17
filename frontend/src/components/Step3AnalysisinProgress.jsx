import React, { useEffect, useState } from 'react'
import '../styles/step3.css'
import AgentChatInterface from './AgentChatInterface'

const Step3AnalysisInProgress = ({
  loading,
  generatedReport,
  error,
  agentStatuses,
  setCurrentStep,
  createCXAnalysis, // This is now the bulletproof triggerAnalysis function
  analysisReady,
  cxProjectData,
  currentAgent,
  chatMessages,
}) => {
  const [showChat, setShowChat] = useState(true)
  const [buttonClicked, setButtonClicked] = useState(false)

  // BULLETPROOF: Single button click handler with debouncing
  const handleStartAnalysis = () => {
    if (buttonClicked || loading || generatedReport || analysisReady) {
      console.log(
        '🛑 Button click blocked - analysis already started or complete',
      )
      return
    }

    console.log('🎯 User clicked start analysis button')
    setButtonClicked(true)
    createCXAnalysis() // Call the bulletproof trigger function
  }

  // Reset button state when component unmounts or analysis completes
  useEffect(() => {
    if (analysisReady || error) {
      setButtonClicked(false)
    }
  }, [analysisReady, error])

  // Reset button state when user navigates away and back (new session)
  useEffect(() => {
    if (!loading && !generatedReport && !analysisReady && !buttonClicked) {
      setButtonClicked(false)
    }
  }, [loading, generatedReport, analysisReady, buttonClicked])

  // Determine if we should show the start button
  const showStartButton =
    !buttonClicked && !loading && !generatedReport && !analysisReady && !error

  // Determine if analysis is active (started but not complete)
  const analysisActive = buttonClicked || loading || chatMessages.length > 0

  return (
    <div className='learning-module'>
      <div className='module-header'>
        <h2 className='module-title'>⚡ AI Automation Analysis Live</h2>
        <p className='module-subtitle'>
          Watch specialized AI automation specialists build your business case
          in real-time
        </p>
      </div>

      {/* Business Collaboration Concept */}
      <div className='concept-explanation'>
        <h3 className='concept-title'>
          What You're Seeing: Enterprise Automation Analysis Workflow
        </h3>
        <div className='concept-content'>
          <p>
            The agents work sequentially because automation business cases
            require layered analysis. The Process Analysis Specialist must
            identify automation opportunities before the ROI Calculator can
            project financial returns.
          </p>
          <div className='concept-highlight'>
            <strong>Why Sequential for Automation?</strong> The Implementation
            Planner can't create deployment roadmaps until ROI is calculated.
            The Risk Assessment Specialist needs implementation plans before
            evaluating project risks.
          </div>
        </div>
      </div>

      {/* BULLETPROOF: Single Start Button - Only show when appropriate */}
      {showStartButton && (
        <div className='start-analysis-section'>
          <div className='start-analysis-card'>
            <h3>Ready to Start AI Automation Analysis</h3>
            <p>
              Your 6 AI automation specialists are ready to collaborate on
              building your comprehensive business case. This typically takes
              2-3 minutes.
            </p>
            <button
              onClick={handleStartAnalysis}
              className='start-analysis-button'
              disabled={buttonClicked || loading}
            >
              {buttonClicked || loading
                ? '🔄 Starting...'
                : '🚀 Start AI Collaboration'}
            </button>
            <div className='start-info'>
              <small>
                ✨ One click starts your complete automation business case
                analysis
              </small>
            </div>
          </div>
        </div>
      )}

      {/* Analysis Status - Only show when analysis is active */}
      {analysisActive && !analysisReady && (
        <div className='analysis-status-section'>
          <div className='analysis-status-card'>
            <h3>🤖 AI Automation Team Working</h3>
            <p>
              Your automation specialists are collaborating to build your
              business case...
            </p>
            {chatMessages.length > 0 && (
              <div className='progress-indicator'>
                <span>💬 {chatMessages.length} collaboration messages</span>
                <span>
                  ⚡ {agentStatuses.filter(a => a.status === 'complete').length}
                  /6 agents complete
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Live Agent Collaboration - Only show when analysis is active */}
      {analysisActive && (
        <div className='collaboration-live'>
          <h3 className='collaboration-title'>
            Your AI Automation Team in Action
          </h3>

          {/* REMOVED: Redundant agent workflow cards - now handled by AgentChatInterface */}

          {/* Agent Chat Interface - Show the workflow cards */}
          <AgentChatInterface
            agentStatuses={agentStatuses}
            currentAgent={currentAgent}
            cxProjectData={cxProjectData}
            loading={loading}
            chatMessages={chatMessages}
          />
        </div>
      )}

      {/* Chat Toggle - Only show when we have messages and want to show additional chat features */}
      {(chatMessages.length > 0 || loading) && (
        <div className='chat-section'>
          <div className='chat-toggle'>
            <button
              onClick={() => setShowChat(!showChat)}
              className={`chat-toggle-btn ${showChat ? 'active' : ''}`}
            >
              {showChat ? '👁️ Hide' : '👀 Show'} Detailed Messages
            </button>
            <span className='chat-description'>
              View raw collaboration messages between agents
            </span>
          </div>

          {/* Optional: Could show a different view here like raw chat messages */}
          {showChat && chatMessages.length > 0 && (
            <div className='raw-messages'>
              <h4>Raw Agent Messages:</h4>
              <div className='message-list'>
                {chatMessages.map((msg, index) => (
                  <div key={index} className='raw-message'>
                    <strong>{msg.from_agent}:</strong> {msg.message}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Quick Collaboration Summary - Only show when complete */}
      {analysisReady && !loading && (
        <div className='collaboration-analysis'>
          <h4>🤖 Quick Automation Analysis Summary:</h4>
          <ul className='analysis-points'>
            <li>
              <strong>Human Direction:</strong> You provided the process context
              and ROI targets that guided the entire automation business case
            </li>
            <li>
              <strong>AI Specialization:</strong> Each agent contributed
              automation-specific expertise you couldn't get from single AI
            </li>
            <li>
              <strong>Financial Rigor:</strong> Multiple agents ensured accurate
              ROI calculations, realistic timelines, and executive-ready
              projections
            </li>
            <li>
              <strong>Business Result:</strong> Professional automation business
              case combining your process knowledge with AI analytical power
            </li>
          </ul>
        </div>
      )}

      {/* Processing Status - Only show during active loading */}
      {loading && (
        <div className='processing-status'>
          <div className='loading-indicator'></div>
          <h4>AI Automation Team Building Your Business Case...</h4>
          <p>
            This typically takes 2-3 minutes for comprehensive automation
            analysis. Each specialist needs time to provide enterprise-quality
            ROI calculations and implementation planning.
          </p>
          {chatMessages.length > 0 && (
            <div className='live-chat-indicator'>
              <span>
                💬 {chatMessages.length} collaboration messages generated
              </span>
            </div>
          )}
        </div>
      )}

      {/* Results Ready Section - REDESIGNED with professional light blue styling */}
      {analysisReady && !loading && (
        <div className='collaboration-complete'>
          <div className='success-header'>
            <div className='success-icon'>🎯</div>
            <h3>AI Automation Business Case Complete!</h3>
            <p>
              Your AI automation team successfully analyzed the process
              opportunity and created a comprehensive, executive-ready business
              case with ROI projections and implementation roadmap.
            </p>
          </div>

          <div className='results-ready-section'>
            <div className='results-preview'>
              <h4>📋 Your Professional Business Case Includes:</h4>
              <ul className='results-preview-list'>
                <li>
                  Executive Summary with automation ROI and payback period
                </li>
                <li>
                  Process analysis identifying specific automation opportunities
                </li>
                <li>
                  Financial projections with cost savings and implementation
                  costs
                </li>
                <li>Phase-by-phase implementation roadmap with timelines</li>
                <li>Risk assessment and success metrics framework</li>
                <li>
                  <strong>BONUS:</strong> Real-time agent collaboration insights
                  showing how AI specialists worked together
                </li>
              </ul>
            </div>

            <div className='results-cta'>
              <button
                onClick={() => setCurrentStep(3)}
                className='results-ready-button'
              >
                🔍 View Your Automation Business Case
              </button>
              <p className='results-note'>
                Professional business case ready for executive presentation!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error Status - Only show on error */}
      {error && (
        <div className='error-status'>
          <h4>AI Automation Analysis Issue</h4>
          <p>{error}</p>
          <button
            onClick={() => {
              setButtonClicked(false)
              // Error handling is managed by parent component
            }}
            className='retry-button'
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  )
}

export default Step3AnalysisInProgress
