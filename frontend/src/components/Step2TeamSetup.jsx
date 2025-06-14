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
        <h2 className='module-title'>🤖 Meet Your AI Automation Team</h2>
        <p className='module-subtitle'>
          Discover how specialized AI automation specialists work together -
          each with unique expertise in building business cases
        </p>
      </div>

      {/* Agent Team Introduction */}
      <div className='agent-team-intro'>
        <h3 className='team-title'>Your Multi-Agent AI Automation Team</h3>
        <p className='team-description'>
          Each AI agent functions like a specialized automation consultant. The
          Process Analysis Specialist works like a McKinsey operations expert,
          while the ROI Calculator acts like a Deloitte financial analyst. This
          multi-agent approach delivers comprehensive automation business cases
          worth $10K-$50K in consulting fees.
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
          Key Concept: AI Automation Specialization
        </h3>
        <div className='concept-content'>
          <p>
            Major corporations use AI specialist teams for automation ROI
            analysis, process optimization, implementation planning, and risk
            assessment. Each agent focuses on what it does best, providing
            enterprise-grade automation business cases.
          </p>
          <div className='concept-highlight'>
            <strong>Real-World Example:</strong> Tesla uses different AI
            specialists for manufacturing automation, supply chain optimization,
            quality control automation, and robotics integration - each
            specialized for maximum ROI.
          </div>
        </div>
      </div>

      {/* Business Project Customization */}
      <div className='agent-input-section highlighted-input-card'>
        <h3 className='input-title'>
          Your Turn: Give Your AI Automation Team Project Details
        </h3>
        <p className='input-description'>
          The information you provide will be analyzed by different specialists
          for their automation expertise. Watch how each agent builds your
          business case through their specialized lens.
        </p>

        <div className='input-grid'>
          {/* 🧑‍💼 Audience & Goal Section */}
          <div className='form-section'>
            <h4 className='section-title'>🧑‍💼 Audience & Goal</h4>

            <div className='input-group'>
              <label className='input-label required'>
                Who will receive this automation business case?
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
                  Executive leadership (C-Suite)
                </option>
                <option value='Operations team'>Operations team</option>
                <option value='IT department'>IT department</option>
                <option value='Finance department'>Finance department</option>
                <option value='Cross-functional stakeholders'>
                  Cross-functional stakeholders
                </option>
              </select>
              <div className='agent-use-note'>
                <strong>AI agents will use this:</strong> Business case language
                and financial depth will be tailored to your audience
              </div>
            </div>

            <div className='input-group'>
              <label className='input-label required'>
                What is the primary goal of this automation analysis?
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
                <option value='Justify automation investment to leadership'>
                  Justify automation investment to leadership
                </option>
                <option value='Calculate ROI and payback period'>
                  Calculate ROI and payback period
                </option>
                <option value='Compare automation vendors/solutions'>
                  Compare automation vendors/solutions
                </option>
                <option value='Plan automation implementation roadmap'>
                  Plan automation implementation roadmap
                </option>
                <option value='Demonstrate automation potential (demo/test)'>
                  Demonstrate automation potential (demo/test)
                </option>
              </select>
              <div className='agent-use-note'>
                <strong>AI agents will use this:</strong> Analysis depth and
                recommendations will align with your business goal
              </div>
            </div>

            <div className='input-group'>
              <label className='input-label'>
                Which department/process area is the focus?
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
                <option value=''>Choose department...</option>
                <option value='Customer Service'>Customer Service</option>
                <option value='Finance/Accounting'>Finance/Accounting</option>
                <option value='Sales/Marketing'>Sales/Marketing</option>
                <option value='Operations'>Operations</option>
                <option value='Cross-departmental'>Cross-departmental</option>
              </select>
            </div>
          </div>

          {/* 📊 ROI Target Section */}
          <div className='form-section'>
            <h4 className='section-title'>📊 ROI Target</h4>

            <div className='input-group'>
              <label className='input-label required'>
                What automation metric are you trying to improve?
              </label>
              <input
                type='text'
                placeholder='e.g., Processing Time, Cost per Transaction, Error Rate, FTE Hours'
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
                <strong>AI agents will use this:</strong> ROI Calculator will
                focus calculations on this specific metric
              </div>
            </div>

            <div className='input-group'>
              <label className='input-label required'>
                Describe your automation success target.
              </label>
              <input
                type='text'
                placeholder='e.g., Reduce processing time by 70%, Save 2 FTE hours daily, Cut errors by 90%'
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
                will target this specific automation outcome
              </div>
            </div>
          </div>

          {/* 📈 Process Data Section */}
          <div className='form-section'>
            <h4 className='section-title'>📈 Process Data</h4>

            <div className='input-group'>
              <label className='input-label required'>
                Select which process data to analyze for automation ROI:
              </label>
              <div className='data-sources'>
                <label className='data-source-checkbox'>
                  <input
                    type='checkbox'
                    checked={(cxProjectData.dataSourcesList || []).includes(
                      'Process Volume & Timing Data',
                    )}
                    onChange={e =>
                      handleDataSourceChange(
                        'Process Volume & Timing Data',
                        e.target.checked,
                      )
                    }
                  />
                  <div className='data-source-option'>
                    <strong>Process Volume & Timing Data</strong>
                    <p>
                      Transaction volumes, processing times, capacity metrics,
                      throughput analysis
                    </p>
                  </div>
                </label>
                <label className='data-source-checkbox'>
                  <input
                    type='checkbox'
                    checked={(cxProjectData.dataSourcesList || []).includes(
                      'Cost & Resource Data',
                    )}
                    onChange={e =>
                      handleDataSourceChange(
                        'Cost & Resource Data',
                        e.target.checked,
                      )
                    }
                  />
                  <div className='data-source-option'>
                    <strong>Cost & Resource Data</strong>
                    <p>
                      Labor costs, error rates, rework expenses, compliance
                      costs, operational overhead
                    </p>
                  </div>
                </label>
              </div>
              <div className='agent-use-note'>
                <strong>AI agents will use this:</strong> ROI Calculator will
                focus on your selected data types for financial projections
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='module-actions'>
        <button onClick={() => setCurrentStep(0)} className='back-button'>
          ← Back to Automation Selection
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
          Watch AI Automation Analysis →
        </button>
      </div>
    </div>
  )
}

export default Step2TeamSetup
