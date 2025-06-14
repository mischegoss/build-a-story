import React from 'react'
import '../styles/step2.css'

const Step2TeamSetup = ({
  cxProjectData,
  cxOptions,
  setCxProjectData,
  setCurrentStep,
  agentStatuses,
  handleDataSourceChange,
}) => {
  return (
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
      <div className='agent-input-section highlighted-input-card'>
        <h3 className='input-title'>
          Your Turn: Give Your AI Business Team Project Details
        </h3>
        <p className='input-description'>
          The information you provide will be analyzed by different agents for
          their specialized tasks. Watch how each agent interprets your input
          through their business expertise lens.
        </p>

        <div className='input-grid'>
          {/* 🧑‍💼 Audience & Goal Section */}
          <div className='form-section'>
            <h4 className='section-title'>🧑‍💼 Audience & Goal</h4>

            <div className='input-group'>
              <label className='input-label required'>
                Who is the intended audience for this report?
              </label>
              <select
                value={cxProjectData.report_audience}
                onChange={e =>
                  setCxProjectData({
                    ...cxProjectData,
                    report_audience: e.target.value,
                  })
                }
                className='business-input'
                required
              >
                <option value=''>Choose audience...</option>
                <option value='Executive leadership'>
                  Executive leadership
                </option>
                <option value='Product team'>Product team</option>
                <option value='Marketing team'>Marketing team</option>
                <option value='Customer support'>Customer support</option>
                <option value='Cross-functional stakeholders'>
                  Cross-functional stakeholders
                </option>
              </select>
              <div className='agent-use-note'>
                <strong>AI agents will use this:</strong> Report tone and depth
                will be tailored to your audience
              </div>
            </div>

            <div className='input-group'>
              <label className='input-label required'>
                What is the primary goal of this report?
              </label>
              <select
                value={cxProjectData.report_goal}
                onChange={e =>
                  setCxProjectData({
                    ...cxProjectData,
                    report_goal: e.target.value,
                  })
                }
                className='business-input'
                required
              >
                <option value=''>Choose goal...</option>
                <option value='Identify and fix pain points'>
                  Identify and fix pain points
                </option>
                <option value='Justify a product or CX investment'>
                  Justify a product or CX investment
                </option>
                <option value='Track progress toward a CX goal'>
                  Track progress toward a CX goal
                </option>
                <option value='Inform design/feature changes'>
                  Inform design/feature changes
                </option>
                <option value='Demonstrate AI reporting capability'>
                  Demonstrate AI reporting capability (demo/test)
                </option>
              </select>
              <div className='agent-use-note'>
                <strong>AI agents will use this:</strong> Analysis approach and
                recommendations will align with your goal
              </div>
            </div>

            <div className='input-group'>
              <label className='input-label'>
                Is the report focused on a specific customer segment?
              </label>
              <select
                value={cxProjectData.customer_segment}
                onChange={e =>
                  setCxProjectData({
                    ...cxProjectData,
                    customer_segment: e.target.value,
                  })
                }
                className='business-input'
              >
                <option value=''>Choose segment...</option>
                <option value='Parents'>Parents</option>
                <option value='New users'>New users</option>
                <option value='Returning customers'>Returning customers</option>
                <option value='High-value users'>High-value users</option>
                <option value='No specific segment'>No specific segment</option>
              </select>
            </div>
          </div>

          {/* 🎯 KPI Target Section */}
          <div className='form-section'>
            <h4 className='section-title'>🎯 KPI Target</h4>

            <div className='input-group'>
              <label className='input-label required'>
                What KPI are you trying to move?
              </label>
              <input
                type='text'
                placeholder='e.g., Task Abandonment Rate, NPS, App Rating, Conversion Rate'
                value={cxProjectData.target_kpi}
                onChange={e =>
                  setCxProjectData({
                    ...cxProjectData,
                    target_kpi: e.target.value,
                  })
                }
                className='business-input'
                required
              />
              <div className='agent-use-note'>
                <strong>AI agents will use this:</strong> Success Metrics
                Specialist will focus on this KPI
              </div>
            </div>

            <div className='input-group'>
              <label className='input-label required'>
                Describe what success looks like.
              </label>
              <input
                type='text'
                placeholder='e.g., Reduce abandonment by 15% in 3 months, Increase NPS from 7.2 to 8.0'
                value={cxProjectData.success_definition}
                onChange={e =>
                  setCxProjectData({
                    ...cxProjectData,
                    success_definition: e.target.value,
                  })
                }
                className='business-input'
                required
              />
              <div className='agent-use-note'>
                <strong>AI agents will use this:</strong> Implementation roadmap
                will target this specific outcome
              </div>
            </div>
          </div>

          {/* 📊 Data Sources Section */}
          <div className='form-section'>
            <h4 className='section-title'>📊 Data Sources</h4>

            <div className='input-group'>
              <label className='input-label required'>
                Select which data types to use in this report:
              </label>
              <div className='data-sources'>
                <label className='data-source-checkbox'>
                  <input
                    type='checkbox'
                    checked={(cxProjectData.dataSourcesList || []).includes(
                      'Customer Behavior Data',
                    )}
                    onChange={e =>
                      handleDataSourceChange(
                        'Customer Behavior Data',
                        e.target.checked,
                      )
                    }
                  />
                  <div className='data-source-option'>
                    <strong>Customer Behavior Data</strong>
                    <p>
                      Usage analytics, drop-off rates, feature adoption, funnel
                      metrics
                    </p>
                  </div>
                </label>
                <label className='data-source-checkbox'>
                  <input
                    type='checkbox'
                    checked={(cxProjectData.dataSourcesList || []).includes(
                      'Voice of Customer Data',
                    )}
                    onChange={e =>
                      handleDataSourceChange(
                        'Voice of Customer Data',
                        e.target.checked,
                      )
                    }
                  />
                  <div className='data-source-option'>
                    <strong>Voice of Customer / Feedback Data</strong>
                    <p>
                      Reviews, survey quotes, support ticket themes, user
                      feedback
                    </p>
                  </div>
                </label>
              </div>
              <div className='agent-use-note'>
                <strong>AI agents will use this:</strong> Data Analytics
                Specialist will focus on your selected data types
              </div>
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
            !cxProjectData.report_audience ||
            !cxProjectData.report_goal ||
            !cxProjectData.target_kpi ||
            !cxProjectData.success_definition ||
            !(
              cxProjectData.dataSourcesList &&
              cxProjectData.dataSourcesList.length > 0
            )
          }
          className='continue-button primary'
        >
          Watch AI Business Analysis →
        </button>
      </div>
    </div>
  )
}

export default Step2TeamSetup
