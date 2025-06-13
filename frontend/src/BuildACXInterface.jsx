import React, { useState, useEffect, useCallback } from 'react'
import './BuildACX.css'

// Simple ID generator for new personas
const generateId = () => {
  return 'persona_' + Math.random().toString(36).substr(2, 9)
}

// BUSINESS LEARNING MODULES - Step components for AI business education
const BusinessLearningModule1 = React.memo(
  ({
    cxProjectData,
    businessScenarios,
    setCxProjectData,
    setCurrentStep,
    aiBusinessMode,
    setAiBusinessMode,
  }) => (
    <div className='learning-module'>
      <div className='module-header'>
        <h2 className='module-title'>🤖 What are AI Business Teams?</h2>
        <p className='module-subtitle'>
          Discover how AI systems collaborate to solve complex business
          challenges
        </p>
      </div>

      {/* Educational Introduction */}
      <div className='concept-explanation'>
        <h3 className='concept-title'>
          Why Use Multiple AI Agents in Business?
        </h3>
        <div className='concept-grid'>
          <div className='concept-card'>
            <div className='concept-icon'>🎯</div>
            <h4>Expert Specialization</h4>
            <p>
              Each AI agent functions like a specialized business consultant.
              The Customer Journey Analyst acts like a McKinsey customer
              experience expert, while the Data Specialist works like a Deloitte
              analytics consultant. This multi-agent approach delivers deeper
              insights than single-AI solutions.
            </p>
          </div>
          <div className='concept-card'>
            <div className='concept-icon'>🔍</div>
            <h4>Comprehensive Analysis</h4>
            <p>
              Multiple AI agents analyze different aspects simultaneously,
              catching insights and opportunities that single AI systems might
              miss.
            </p>
          </div>
          <div className='concept-card'>
            <div className='concept-icon'>⚡</div>
            <h4>Faster Results</h4>
            <p>
              AI teams can process complex business scenarios in minutes that
              would take human consulting teams weeks to analyze.
            </p>
          </div>
        </div>
      </div>

      {/* Business Project Setup */}
      <div className='project-setup'>
        <h3 className='setup-title'>
          Your Turn: Your AI Business Analysis Project
        </h3>
        <p className='setup-description'>
          You'll direct a team of 6 AI business specialists to analyze a
          customer experience challenge. This gives you hands-on experience with
          how multi-agent AI transforms business operations.
        </p>

        <div className='scenario-selection'>
          <label className='input-label'>
            Choose a business scenario to analyze with AI:
          </label>
          <select
            value={cxProjectData.business_scenario}
            onChange={e =>
              setCxProjectData({
                ...cxProjectData,
                business_scenario: e.target.value,
              })
            }
            className='business-select'
          >
            <option value=''>Select a business scenario...</option>
            {businessScenarios.map((scenario, index) => (
              <option
                key={index}
                value={`${scenario.title} - ${scenario.industry}`}
              >
                {scenario.title} ({scenario.industry})
              </option>
            ))}
          </select>
        </div>

        {cxProjectData.business_scenario && (
          <div className='selection-confirmation'>
            <div className='confirmation-header'>
              <h4>Excellent Choice for AI Business Analysis!</h4>
              <p>
                You've selected{' '}
                <strong>
                  {cxProjectData.business_scenario.split(' - ')[0]}
                </strong>{' '}
                - a perfect scenario for our AI business team to analyze.
              </p>
            </div>

            <div className='next-preview'>
              <h5>What happens next?</h5>
              <ul className='preview-list'>
                <li>Meet your team of 6 specialized AI business analysts</li>
                <li>
                  Watch them analyze customer data and identify opportunities
                </li>
                <li>See how they collaborate like real consulting teams</li>
                <li>Learn about AI applications in business strategy</li>
              </ul>
            </div>

            <button
              onClick={() => setCurrentStep(1)}
              className='continue-button primary'
            >
              Meet Your AI Business Team →
            </button>
          </div>
        )}
      </div>
    </div>
  ),
)

const BusinessLearningModule2 = React.memo(
  ({
    cxProjectData,
    cxOptions,
    setCxProjectData,
    setCurrentStep,
    agentStatuses,
    handlePersonaChange,
    addPersona,
    removePersona,
    handleCXToolChange,
  }) => (
    <div className='learning-module'>
      <div className='module-header'>
        <h2 className='module-title'>👥 Meet Your AI Business Team</h2>
        <p className='module-subtitle'>
          Discover how specialized AI business agents work together - each with
          unique expertise
        </p>
      </div>

      {/* Agent Team Introduction */}
      <div className='agent-team-intro'>
        <h3 className='team-title'>Your Multi-Agent AI Business Team</h3>
        <p className='team-description'>
          Each AI agent functions like a specialized business consultant. The
          Customer Journey Analyst acts like a McKinsey customer experience
          expert, while the Data Specialist works like a Deloitte analytics
          consultant. This multi-agent approach delivers deeper insights than
          single-AI solutions.
        </p>

        <div className='agents-grid'>
          {agentStatuses.map((agent, index) => (
            <div key={index} className='agent-intro-card'>
              <div className='agent-avatar'>{agent.avatar}</div>
              <div className='agent-info'>
                <h4 className='agent-name'>{agent.name}</h4>
                <p className='agent-specialty'>{agent.ai_specialty}</p>
                <p className='agent-description'>{agent.what_i_do}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Concept */}
      <div className='concept-explanation'>
        <h3 className='concept-title'>
          Key Concept: AI Business Specialization
        </h3>
        <div className='concept-content'>
          <p>
            Major corporations use AI agent teams for customer service, supply
            chain optimization, financial analysis, and strategic planning. Each
            agent focuses on what it does best, providing enterprise-grade
            insights.
          </p>
          <div className='concept-highlight'>
            <strong>Real-World Example:</strong> Amazon uses different AI agents
            for inventory management, price optimization, recommendation
            engines, and logistics - each specialized for maximum effectiveness.
          </div>
        </div>
      </div>

      {/* Business Project Customization */}
      <div className='agent-input-section'>
        <h3 className='input-title'>
          Your Turn: Give Your AI Business Team Project Details
        </h3>
        <p className='input-description'>
          The information you provide will be analyzed by different agents for
          their specialized tasks. Watch how each agent interprets your input
          through their business expertise lens.
        </p>

        <div className='input-grid'>
          <div className='input-group'>
            <label className='input-label required'>
              Primary touchpoint to optimize?
            </label>
            <select
              value={cxProjectData.touchpoint}
              onChange={e =>
                setCxProjectData({
                  ...cxProjectData,
                  touchpoint: e.target.value,
                })
              }
              className='business-input'
              required
            >
              <option value=''>Choose touchpoint...</option>
              {(cxOptions.touchpoints || []).map((touchpoint, index) => (
                <option key={index} value={touchpoint}>
                  {touchpoint}
                </option>
              ))}
            </select>
            <div className='agent-use-note'>
              <strong>AI agents will use this:</strong> Customer Journey Analyst
              will map all interactions through this touchpoint
            </div>
          </div>

          <div className='input-group'>
            <label className='input-label'>Customer segment focus?</label>
            <select
              value={cxProjectData.business_context}
              onChange={e =>
                setCxProjectData({
                  ...cxProjectData,
                  business_context: e.target.value,
                })
              }
              className='business-input'
            >
              <option value=''>Choose segment...</option>
              <option value='New Customers'>New Customers</option>
              <option value='Returning Customers'>Returning Customers</option>
              <option value='VIP/Premium'>VIP/Premium</option>
              <option value='At-Risk'>At-Risk</option>
            </select>
          </div>

          <div className='input-group'>
            <label className='input-label'>Main improvement goal?</label>
            <select
              value={cxProjectData.cx_objective}
              onChange={e =>
                setCxProjectData({
                  ...cxProjectData,
                  cx_objective: e.target.value,
                })
              }
              className='business-input'
            >
              <option value=''>Choose goal...</option>
              <option value='Reduce Friction'>Reduce Friction</option>
              <option value='Increase Satisfaction'>
                Increase Satisfaction
              </option>
              <option value='Boost Efficiency'>Boost Efficiency</option>
              <option value='Improve Retention'>Improve Retention</option>
            </select>
            <div className='agent-use-note'>
              <strong>AI agents will use this:</strong> Solution Designer will
              create recommendations specifically targeting this objective
            </div>
          </div>

          <div className='input-group'>
            <label className='input-label required'>
              Customer personas (Who are your key customer segments?)
            </label>
            <div className='personas-input'>
              {(cxProjectData.personasList || []).map((persona, index) => (
                <div
                  key={persona.id || `persona_${index}`}
                  className='persona-card'
                >
                  <div className='persona-card-header'>
                    <h5 className='persona-number'>Persona {index + 1}</h5>
                    {index > 0 && (
                      <button
                        onClick={() => removePersona(index)}
                        className='remove-persona-btn'
                      >
                        ✕ Remove
                      </button>
                    )}
                  </div>
                  <div className='persona-card-content'>
                    <div className='persona-field'>
                      <label className='persona-field-label'>
                        Customer Type:
                      </label>
                      <input
                        type='text'
                        placeholder='e.g., Busy Parent, Business Professional, Price-Conscious Shopper'
                        value={persona.name || ''}
                        onChange={e =>
                          handlePersonaChange(index, 'name', e.target.value)
                        }
                        className='persona-input-field'
                      />
                    </div>
                    <div className='persona-field'>
                      <label className='persona-field-label'>
                        Key Characteristics:
                      </label>
                      <input
                        type='text'
                        placeholder='e.g., time-sensitive, tech-savvy, budget-focused, quality-driven'
                        value={persona.description || ''}
                        onChange={e =>
                          handlePersonaChange(
                            index,
                            'description',
                            e.target.value,
                          )
                        }
                        className='persona-input-field'
                      />
                    </div>
                  </div>
                </div>
              ))}
              {(cxProjectData.personasList || []).length < 4 && (
                <button onClick={addPersona} className='add-persona-btn'>
                  + Add Another Persona (
                  {(cxProjectData.personasList || []).length}/4)
                </button>
              )}
            </div>
            <div className='agent-use-note'>
              <strong>AI agents will use this:</strong> Data Analytics
              Specialist will analyze behavior patterns for each persona type
            </div>
          </div>

          <div className='input-group'>
            <label className='input-label'>
              Preferred analysis methods (Choose up to 4)
            </label>
            <div className='cx-tools'>
              {[
                'Customer Surveys',
                'Analytics Review',
                'Process Mapping',
                'A/B Testing',
                'User Interviews',
                'Journey Mapping',
                'Sentiment Analysis',
                'Behavioral Tracking',
              ].map((tool, index) => (
                <label key={index} className='tool-checkbox'>
                  <input
                    type='checkbox'
                    checked={(cxProjectData.cxToolsList || []).includes(tool)}
                    onChange={e => handleCXToolChange(tool, e.target.checked)}
                    disabled={
                      (cxProjectData.cxToolsList || []).length >= 4 &&
                      !(cxProjectData.cxToolsList || []).includes(tool)
                    }
                  />
                  <span>{tool}</span>
                </label>
              ))}
            </div>
            <div className='agent-use-note'>
              <strong>AI agents will use this:</strong> Each agent will leverage
              relevant tools for their specialized analysis tasks
            </div>
          </div>
        </div>
      </div>

      <div className='module-actions'>
        <button onClick={() => setCurrentStep(0)} className='back-button'>
          ← Back to Scenario Selection
        </button>
        <button
          onClick={() => setCurrentStep(2)}
          disabled={
            !cxProjectData.touchpoint ||
            !(
              cxProjectData.personasList &&
              cxProjectData.personasList.some(
                persona => persona.name.trim() !== '',
              )
            )
          }
          className='continue-button primary'
        >
          Watch AI Business Analysis →
        </button>
      </div>
    </div>
  ),
)

const BusinessLearningModule3 = ({
  loading,
  generatedReport,
  error,
  agentStatuses,
  showProcessLearning,
  setShowProcessLearning,
  aiBusinessInsights,
  setCurrentStep,
  createCXAnalysis,
  analysisReady, // NEW: Control when to show results button
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

      {/* Deep Dive Business Learning */}
      <div className='process-learning'>
        <button
          onClick={() => setShowProcessLearning(!showProcessLearning)}
          className='learning-toggle'
        >
          {showProcessLearning
            ? '📚 Hide'
            : '🔍 Click to Learn More About How AI Agents Work'}
        </button>

        {showProcessLearning && (
          <div className='deep-learning-content'>
            <h4>Understanding Multi-Agent AI in Business</h4>

            <div className='learning-concepts'>
              <div className='learning-concept'>
                <h5>🔄 Data Flow Management</h5>
                <p>
                  Business AI agents share insights through structured data
                  pipelines. Each agent processes specific data types and passes
                  enriched insights to the next specialist in the workflow.
                </p>
              </div>

              <div className='learning-concept'>
                <h5>🎯 Domain Expertise</h5>
                <p>
                  Each agent is trained on different business domains. The
                  Customer Journey Analyst specializes in experience mapping,
                  while the Success Metrics Specialist focuses on KPI
                  optimization and measurement frameworks.
                </p>
              </div>

              <div className='learning-concept'>
                <h5>✅ Business Quality Assurance</h5>
                <p>
                  Multiple agents reviewing different aspects (feasibility, ROI,
                  implementation risk, measurability) provides comprehensive
                  business validation that single AI cannot achieve.
                </p>
              </div>

              <div className='learning-concept'>
                <h5>⚖️ Speed vs. Depth Trade-offs</h5>
                <p>
                  Sequential business analysis takes longer than single AI but
                  delivers enterprise-grade insights. This mirrors how real
                  consulting teams balance thoroughness with efficiency.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

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

      {/* NEW: Results Ready Section - No Auto-scroll */}
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

          <div className='collaboration-analysis'>
            <h4>🤖 Quick Collaboration Summary:</h4>
            <ul className='analysis-points'>
              <li>
                <strong>Human Direction:</strong> You provided the business
                context and strategic focus that guided the entire analysis
              </li>
              <li>
                <strong>AI Specialization:</strong> Each agent contributed
                domain-specific business expertise you couldn't get from single
                AI
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

const BusinessLearningModule4 = React.memo(
  ({
    generatedReport,
    refinedReport, // NEW: Refined report to show
    showRefinement, // NEW: Whether to show refinement
    proposedChanges, // NEW: User's proposed changes
    handleProposedChangesChange, // NEW: Handler for changes
    refineRecommendations, // NEW: Function to refine
    downloadReport, // NEW: Download function
    resetApp,
    loading, // NEW: Loading state for refinement
  }) => {
    const [showCareerContent, setShowCareerContent] = useState(false)

    return (
      <div className='learning-module'>
        <div className='module-header'>
          <h2 className='module-title'>🤝 Human-AI Business Partnership</h2>
          <p className='module-subtitle'>
            Review AI recommendations, propose refinements, and see how AI
            adapts to your business judgment
          </p>
        </div>

        {/* Partnership Concept */}
        <div className='concept-explanation'>
          <h3 className='concept-title'>
            The Future of Business is Human-AI Collaboration
          </h3>
          <div className='partnership-grid'>
            <div className='partner-role'>
              <h4>🤖 What AI Excels At</h4>
              <ul>
                <li>Processing vast amounts of customer data quickly</li>
                <li>
                  Identifying patterns across multiple touchpoints consistently
                </li>
                <li>Analyzing complex business metrics and KPIs</li>
                <li>
                  Generating comprehensive reports with structured insights
                </li>
                <li>
                  <strong>NEW:</strong> Adapting recommendations based on human
                  feedback
                </li>
              </ul>
            </div>
            <div className='partner-role'>
              <h4>🧠 What Humans Bring</h4>
              <ul>
                <li>Strategic vision and business context understanding</li>
                <li>Stakeholder relationships and organizational dynamics</li>
                <li>
                  Creative problem-solving for complex business challenges
                </li>
                <li>Executive decision-making and risk assessment</li>
                <li>
                  <strong>NEW:</strong> Implementation priorities and constraint
                  awareness
                </li>
              </ul>
            </div>
          </div>
          <div className='partnership-highlight'>
            <strong>Key Business Insight:</strong> The best AI systems don't
            just generate recommendations - they adapt and refine them based on
            human expertise. You'll see this iterative collaboration in action.
          </div>
        </div>

        {/* Business Report Review */}
        <div className='business-continuation'>
          <h3 className='continuation-title'>
            Review AI Analysis & Propose Refinements
          </h3>
          <p className='continuation-description'>
            The AI team created comprehensive business recommendations. Now use
            your strategic insight to propose changes, set priorities, or add
            constraints. Watch how the AI Refinement Agent adapts the
            recommendations based on your input.
          </p>

          <div className='ai-report-section'>
            <h4>🤖 AI Team's Initial Analysis:</h4>
            <div className='ai-report-content'>
              <div className='report-section'>
                <strong>Executive Summary:</strong>
                <p>
                  {generatedReport?.deliverables?.executive_summary ||
                    'Your AI-generated business analysis will appear here!'}
                </p>
              </div>

              {generatedReport?.deliverables?.pain_points && (
                <div className='report-section'>
                  <strong>Key Pain Points Identified:</strong>
                  <ul>
                    {generatedReport.deliverables.pain_points
                      .slice(0, 3)
                      .map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                  </ul>
                </div>
              )}

              {generatedReport?.deliverables?.strategic_recommendations && (
                <div className='report-section'>
                  <strong>Strategic Recommendations:</strong>
                  <ul>
                    {generatedReport.deliverables.strategic_recommendations
                      .slice(0, 3)
                      .map((rec, index) => (
                        <li key={index}>{rec}</li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* NEW: Propose Changes Section */}
          <div className='propose-changes-section'>
            <h4>💼 Your Turn: Propose Changes & Fine-tune Results:</h4>
            <p className='propose-description'>
              Based on your business experience, what would you change about
              these recommendations? The AI Refinement Agent will adapt the
              analysis based on your input.
            </p>

            <div className='change-examples'>
              <h5>💡 Example Business Refinements:</h5>
              <ul className='example-list'>
                <li>
                  <strong>"Prioritize recommendations"</strong> - AI will
                  reorder by business impact
                </li>
                <li>
                  <strong>"Consider budget constraints"</strong> - AI will add
                  cost-optimization approaches
                </li>
                <li>
                  <strong>"Faster timeline needed"</strong> - AI will accelerate
                  implementation phases
                </li>
                <li>
                  <strong>"Add more metrics"</strong> - AI will expand success
                  measurement framework
                </li>
              </ul>
            </div>

            <textarea
              value={proposedChanges}
              onChange={handleProposedChangesChange}
              placeholder='What business considerations should the AI team incorporate?

Examples:
• "We need to prioritize low-cost solutions due to budget constraints"
• "Implementation must be completed within 3 months" 
• "Focus on solutions that do not require additional staffing"
• "Add customer retention metrics to success criteria"
• "Consider seasonal business patterns in the timeline"

Your strategic input will help the AI Refinement Agent adjust the recommendations...'
              className='analysis-textarea propose-changes-textarea'
              disabled={loading}
            />

            <div className='propose-actions'>
              <button
                onClick={() => refineRecommendations(proposedChanges)}
                disabled={!proposedChanges.trim() || loading}
                className='refine-button'
              >
                {loading
                  ? '🔄 AI Refinement Agent Working...'
                  : '✨ Refine Recommendations'}
              </button>
              <p className='refine-note'>
                See how AI adapts recommendations based on your business
                judgment
              </p>
            </div>
          </div>

          {/* NEW: Show Refined Results */}
          {showRefinement && (
            <div className='refinement-results'>
              <h4>🎯 AI-Refined Business Recommendations:</h4>
              <p className='refinement-description'>
                Based on your input, the AI Refinement Agent has adapted the
                recommendations. Compare the changes below:
              </p>

              <div className='before-after-comparison'>
                <div className='comparison-section'>
                  <h5>📋 Original Recommendations:</h5>
                  <div className='comparison-content original'>
                    <ul>
                      {generatedReport?.deliverables?.strategic_recommendations
                        ?.slice(0, 3)
                        .map((rec, index) => (
                          <li key={index}>{rec}</li>
                        ))}
                    </ul>
                  </div>
                </div>

                <div className='comparison-arrow'>→</div>

                <div className='comparison-section'>
                  <h5>✨ Refined Recommendations:</h5>
                  <div className='comparison-content refined'>
                    <ul>
                      {refinedReport?.deliverables?.strategic_recommendations
                        ?.slice(0, 4)
                        .map((rec, index) => (
                          <li key={index}>{rec}</li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className='refinement-impact'>
                <h5>🎯 Key Changes Made by AI Refinement Agent:</h5>
                <ul className='impact-list'>
                  <li>
                    Adapted recommendations based on your business constraints
                  </li>
                  <li>
                    Adjusted implementation timeline per your requirements
                  </li>
                  <li>
                    Enhanced ROI projection:{' '}
                    {refinedReport?.deliverables?.estimated_roi}
                  </li>
                  <li>
                    Incorporated your strategic priorities into the action plan
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* NEW: Download and Actions */}
        <div className='final-deliverable'>
          <h3 className='deliverable-title'>
            📥 Your Professional Deliverable
          </h3>
          <p className='deliverable-description'>
            Download your complete customer experience optimization report,
            including both AI analysis and your strategic refinements.
          </p>

          <div className='download-section'>
            <div className='download-preview'>
              <h4>📋 Report Includes:</h4>
              <ul className='download-contents'>
                <li>Executive Summary with key findings</li>
                <li>Customer journey analysis and pain points</li>
                <li>
                  {refinedReport ? 'Refined' : 'Original'} strategic
                  recommendations
                </li>
                <li>Phase-by-phase implementation roadmap</li>
                <li>Success metrics and ROI projections</li>
                <li>AI collaboration methodology notes</li>
              </ul>
            </div>

            <button onClick={downloadReport} className='download-button'>
              📥 Download Business Analysis Report
            </button>
          </div>

          {/* NEW: Career Content Behind Button */}
          <div className='career-section'>
            <button
              onClick={() => setShowCareerContent(!showCareerContent)}
              className='learning-toggle'
              style={{ marginTop: '2rem' }}
            >
              {showCareerContent
                ? '📚 Hide'
                : '💼 Learn More About Human-AI Collaboration'}
            </button>

            {showCareerContent && (
              <div className='deep-learning-content'>
                <h4>Real-World Career Applications</h4>
                <div className='career-grid'>
                  <div className='career-card'>
                    <h4>Business Analyst</h4>
                    <p>
                      Direct AI agent teams to analyze processes, then refine
                      recommendations based on organizational constraints and
                      priorities
                    </p>
                  </div>
                  <div className='career-card'>
                    <h4>Strategy Consultant</h4>
                    <p>
                      Use AI for initial analysis, then apply human judgment to
                      adapt strategies for specific client contexts and
                      implementation realities
                    </p>
                  </div>
                  <div className='career-card'>
                    <h4>Product Manager</h4>
                    <p>
                      Leverage AI insights for customer experience analysis,
                      then refine product roadmaps based on business priorities
                      and resource constraints
                    </p>
                  </div>
                  <div className='career-card'>
                    <h4>Operations Manager</h4>
                    <p>
                      Use AI for process optimization analysis, then adapt
                      recommendations for real-world implementation considering
                      team capabilities and timelines
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className='module-actions'>
          <button onClick={resetApp} className='restart-button'>
            🔄 Analyze Another Business Scenario
          </button>
        </div>
      </div>
    )
  },
)

const BuildACXInterface = ({
  currentStep,
  cxProjectData,
  businessScenarios,
  cxOptions,
  generatedReport,
  refinedReport, // NEW: Refined report
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
  showProcessLearning,
  setAiBusinessMode,
  setShowProcessLearning,
  analysisReady, // NEW: Analysis ready state
  showRefinement, // NEW: Show refinement workflow
  refineRecommendations, // NEW: Refinement function
  downloadReport, // NEW: Download function
}) => {
  const [proposedChanges, setProposedChanges] = useState('') // NEW: Replace studentAnalysis

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

  const businessSteps = [
    {
      icon: '🏢',
      title: 'Choose Business Scenario',
      desc: 'Select challenge',
    },
    {
      icon: '👥',
      title: 'Meet AI Business Team',
      desc: 'Specialized agents',
    },
    {
      icon: '⚡',
      title: 'Watch Analysis',
      desc: 'Agents collaborating',
    },
    {
      icon: '🤝',
      title: 'Refine & Download',
      desc: 'Your final report',
    },
  ]

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

  // NEW: Handle proposed changes
  const handleProposedChangesChange = useCallback(e => {
    setProposedChanges(e.target.value)
  }, [])

  const renderCurrentModule = () => {
    switch (currentStep) {
      case 0:
        return (
          <BusinessLearningModule1
            cxProjectData={cxProjectData}
            businessScenarios={businessScenarios}
            setCxProjectData={setCxProjectData}
            setCurrentStep={setCurrentStep}
            aiBusinessMode={aiBusinessMode}
            setAiBusinessMode={setAiBusinessMode}
          />
        )
      case 1:
        return (
          <BusinessLearningModule2
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
          <BusinessLearningModule3
            loading={loading}
            generatedReport={generatedReport}
            error={error}
            agentStatuses={agentStatuses}
            showProcessLearning={showProcessLearning}
            setShowProcessLearning={setShowProcessLearning}
            aiBusinessInsights={aiBusinessInsights}
            setCurrentStep={setCurrentStep}
            createCXAnalysis={createCXAnalysis}
            analysisReady={analysisReady} // NEW: Pass analysis ready state
          />
        )
      case 3:
        return (
          <BusinessLearningModule4
            generatedReport={generatedReport}
            refinedReport={refinedReport} // NEW: Pass refined report
            showRefinement={showRefinement} // NEW: Pass refinement state
            proposedChanges={proposedChanges} // NEW: Pass proposed changes
            handleProposedChangesChange={handleProposedChangesChange} // NEW: Pass handler
            refineRecommendations={refineRecommendations} // NEW: Pass refinement function
            downloadReport={downloadReport} // NEW: Pass download function
            resetApp={resetApp}
            loading={loading} // NEW: Pass loading for refinement
          />
        )
      default:
        return <BusinessLearningModule1 />
    }
  }

  return (
    <div className='learning-lab-container'>
      <div className='learning-lab-content'>
        {/* Header */}
        <div className='lab-header'>
          <h1 className='lab-title'>Multi-Agent AI Business Lab</h1>
          <p className='lab-subtitle'>
            Learn how AI teams solve complex business challenges through
            customer experience optimization
          </p>
        </div>

        {/* Progress Tracker */}
        <div className='learning-progress'>
          <div className='progress-steps'>
            {businessSteps.map((step, index) => (
              <div
                key={index}
                className={`progress-step ${
                  index < currentStep
                    ? 'completed'
                    : index === currentStep
                    ? 'active'
                    : 'upcoming'
                }`}
              >
                <div className='step-icon'>{step.icon}</div>
                <div className='step-info'>
                  <div className='step-title'>{step.title}</div>
                  <div className='step-desc'>{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className='error-banner'>
            <span>⚠️ {error}</span>
            <button onClick={() => setError(null)} className='error-close'>
              ✕
            </button>
          </div>
        )}

        {/* Current Business Learning Module */}
        {renderCurrentModule()}
      </div>
    </div>
  )
}

export default React.memo(BuildACXInterface);
