import React, { useEffect } from 'react'
import '../styles/step3.css'

const Step3AnalysisInProgress = ({
  loading,
  generatedReport,
  error,
  agentStatuses,
  setCurrentStep,
  createCXAnalysis,
  analysisReady,
}) => {
  useEffect(() => {
    if (!loading && !generatedReport && !analysisReady) {
      createCXAnalysis()
    }
  }, [loading, generatedReport, analysisReady, createCXAnalysis])

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

      {/* Live Agent Collaboration */}
      <div className='collaboration-live'>
        <h3 className='collaboration-title'>
          Your AI Automation Team in Action
        </h3>

        <div className='agents-workflow'>
          {agentStatuses.map((agent, index) => (
            <div key={index} className={`agent-workflow-card ${agent.status}`}>
              <div className='agent-workflow-header'>
                <div className='agent-avatar'>{agent.avatar}</div>
                <div className='agent-info'>
                  <h4 className='agent-name'>{agent.name}</h4>
                  <div className='agent-status'>
                    {agent.status === 'complete' && '✅ Analysis Complete'}
                    {agent.status === 'working' && '⚡ Building Business Case'}
                    {agent.status === 'waiting' && '⏳ Standing By'}
                  </div>
                </div>
              </div>

              <div className='agent-task'>
                <strong>Current Analysis:</strong> {agent.what_i_do}
              </div>

              {agent.status === 'complete' && (
                <div className='agent-learning'>
                  <strong>💡 Automation AI Insight:</strong>{' '}
                  {agent.learning_moment}
                </div>
              )}

              {index < agentStatuses.length - 1 && (
                <div className='workflow-arrow'>↓</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Collaboration Summary - Moved from Module 4 */}
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

      {loading && (
        <div className='processing-status'>
          <div className='loading-indicator'></div>
          <h4>AI Automation Team Building Your Business Case...</h4>
          <p>
            This typically takes 3-4 minutes for comprehensive automation
            analysis. Each specialist needs time to provide enterprise-quality
            ROI calculations and implementation planning.
          </p>
        </div>
      )}

      {/* Results Ready Section */}
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
                  <strong>BONUS:</strong> Ability to refine recommendations
                  based on your business constraints
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

      {error && (
        <div className='error-status'>
          <h4>AI Automation Analysis Issue</h4>
          <p>{error}</p>
          <button onClick={createCXAnalysis} className='retry-button'>
            Restart AI Automation Analysis
          </button>
        </div>
      )}
    </div>
  )
}

export default Step3AnalysisInProgress
