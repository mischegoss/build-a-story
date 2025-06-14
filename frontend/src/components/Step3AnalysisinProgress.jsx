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
        <h2 className='module-title'>⚡ AI Business Collaboration Live</h2>
        <p className='module-subtitle'>
          Watch specialized AI business agents analyze customer experience in
          real-time
        </p>
      </div>

      {/* Business Collaboration Concept */}
      <div className='concept-explanation'>
        <h3 className='concept-title'>
          What You're Seeing: Enterprise AI Workflow
        </h3>
        <div className='concept-content'>
          <p>
            The agents work sequentially because business analysis requires
            layered insights. The Data Analyst must process customer data before
            the Process Improvement Specialist can identify optimization
            opportunities.
          </p>
          <div className='concept-highlight'>
            <strong>Why Sequential in Business?</strong> The Solution Designer
            can't create recommendations until pain points are identified. The
            Implementation Strategist needs solutions before creating rollout
            plans.
          </div>
        </div>
      </div>

      {/* Live Agent Collaboration */}
      <div className='collaboration-live'>
        <h3 className='collaboration-title'>Your AI Business Team in Action</h3>

        <div className='agents-workflow'>
          {agentStatuses.map((agent, index) => (
            <div key={index} className={`agent-workflow-card ${agent.status}`}>
              <div className='agent-workflow-header'>
                <div className='agent-avatar'>{agent.avatar}</div>
                <div className='agent-info'>
                  <h4 className='agent-name'>{agent.name}</h4>
                  <div className='agent-status'>
                    {agent.status === 'complete' && '✅ Analysis Complete'}
                    {agent.status === 'working' && '⚡ Analyzing Data'}
                    {agent.status === 'waiting' && '⏳ Standing By'}
                  </div>
                </div>
              </div>

              <div className='agent-task'>
                <strong>Current Analysis:</strong> {agent.what_i_do}
              </div>

              {agent.status === 'complete' && (
                <div className='agent-learning'>
                  <strong>💡 Business AI Insight:</strong>{' '}
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
          <h4>🤖 Quick Collaboration Summary:</h4>
          <ul className='analysis-points'>
            <li>
              <strong>Human Direction:</strong> You provided the business
              context and strategic focus that guided the entire analysis
            </li>
            <li>
              <strong>AI Specialization:</strong> Each agent contributed
              domain-specific business expertise you couldn't get from single AI
            </li>
            <li>
              <strong>Quality Assurance:</strong> Multiple agents ensured
              actionable, measurable, executive-ready recommendations
            </li>
            <li>
              <strong>Business Result:</strong> Enterprise-grade analysis
              combining your strategic vision with AI analytical power
            </li>
          </ul>
        </div>
      )}

      {loading && (
        <div className='processing-status'>
          <div className='loading-indicator'></div>
          <h4>AI Business Team Analyzing...</h4>
          <p>
            This typically takes 3-4 minutes for comprehensive business
            analysis. Each agent needs time to provide enterprise-quality
            insights.
          </p>
        </div>
      )}

      {/* Results Ready Section */}
      {analysisReady && !loading && (
        <div className='collaboration-complete'>
          <div className='success-header'>
            <div className='success-icon'>🎯</div>
            <h3>AI Business Analysis Complete!</h3>
            <p>
              Your AI business team successfully analyzed the customer
              experience scenario and created comprehensive, actionable
              recommendations ready for executive review.
            </p>
          </div>

          <div className='results-ready-section'>
            <div className='results-preview'>
              <h4>📋 What's Waiting for You:</h4>
              <ul className='results-preview-list'>
                <li>Executive Summary of key findings and opportunities</li>
                <li>Detailed pain point analysis with business impact</li>
                <li>
                  Strategic recommendations with implementation priorities
                </li>
                <li>Phase-by-phase implementation roadmap</li>
                <li>Success metrics and ROI projections</li>
                <li>
                  <strong>BONUS:</strong> Ability to fine-tune recommendations
                  based on your business insights
                </li>
              </ul>
            </div>

            <div className='results-cta'>
              <button
                onClick={() => setCurrentStep(3)}
                className='results-ready-button'
              >
                🔍 View Your Business Analysis Results
              </button>
              <p className='results-note'>
                Take control of your learning pace - review results when you're
                ready!
              </p>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className='error-status'>
          <h4>AI Business Analysis Issue</h4>
          <p>{error}</p>
          <button onClick={createCXAnalysis} className='retry-button'>
            Restart AI Business Analysis
          </button>
        </div>
      )}
    </div>
  )
}

export default Step3AnalysisInProgress
