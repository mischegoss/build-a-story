import React, { useState } from 'react'
import '../styles/step2.css'

const Step2TeamSetup = ({
  cxProjectData,
  cxOptions,
  setCxProjectData,
  setCurrentStep,
  agentStatuses,
  handleDataSourceChange,
}) => {
  const [showCustomization, setShowCustomization] = useState(false)

  // Get automation type from step 1 for smart defaults
  const automationType =
    cxProjectData.business_scenario || 'Customer Service Automation'

  // Smart defaults based on automation type
  const getSmartDefaults = type => {
    const defaults = {
      'Customer Service Automation': {
        report_audience: 'Operations team',
        report_goal: 'Calculate ROI and payback period',
        customer_segment: 'Customer Service Department',
        target_kpi: 'Ticket resolution time reduction',
        success_definition:
          'Reduce ticket resolution from 4 hours to 30 minutes with 65% cost savings',
        dataSourcesList: [
          'Process Volume & Timing Data',
          'Cost & Resource Data',
        ],
        decision_makers: [
          'C-Level executives',
          'Department heads',
          'IT leadership',
        ],
        affected_departments: ['Customer Service', 'IT', 'Operations'],
        typical_complexity: 'Medium (3-4 systems, 2-3 approval steps)',
        implementation_timeline: '6-12 weeks',
        investment_range: '$75K-150K',
        projected_roi: '65% time savings, $8,400 monthly savings',
        risk_factors: [
          'Change management',
          'User adoption',
          'System integration',
        ],
      },
      'Invoice Processing Automation': {
        report_audience: 'Finance department',
        report_goal: 'Justify automation investment to leadership',
        customer_segment: 'Finance & Accounting Department',
        target_kpi: 'Invoice processing time reduction',
        success_definition:
          'Reduce invoice processing from 2 hours to 15 minutes with 75% cost savings',
        dataSourcesList: [
          'Process Volume & Timing Data',
          'Cost & Resource Data',
          'Compliance & Quality Data',
        ],
        decision_makers: [
          'Finance team',
          'C-Level executives',
          'IT leadership',
        ],
        affected_departments: ['Finance', 'Accounting', 'Operations', 'IT'],
        typical_complexity: 'Medium-High (4-5 systems, 3-4 approval steps)',
        implementation_timeline: '8-16 weeks',
        investment_range: '$50K-200K',
        projected_roi: '75% time savings, $12,000 monthly savings',
        risk_factors: [
          'Compliance requirements',
          'Integration complexity',
          'Data accuracy',
        ],
      },
      'Sales Process Automation': {
        report_audience: 'Executive leadership (C-Suite)',
        report_goal: 'Plan automation implementation roadmap',
        customer_segment: 'Sales & Revenue Operations',
        target_kpi: 'Lead qualification speed improvement',
        success_definition:
          'Reduce lead qualification from 2 hours to 30 minutes with 60% efficiency gains',
        dataSourcesList: [
          'Process Volume & Timing Data',
          'Performance Metrics',
        ],
        decision_makers: [
          'Sales leadership',
          'C-Level executives',
          'Revenue operations',
        ],
        affected_departments: ['Sales', 'Marketing', 'Customer Success', 'IT'],
        typical_complexity: 'Medium (2-3 systems, 1-2 approval steps)',
        implementation_timeline: '4-10 weeks',
        investment_range: '$25K-125K',
        projected_roi: '60% time savings, $6,200 monthly savings',
        risk_factors: [
          'Sales team adoption',
          'CRM integration',
          'Lead quality',
        ],
      },
    }
    return defaults[type] || defaults['Customer Service Automation']
  }

  const smartDefaults = getSmartDefaults(automationType)

  // Helper functions for customization overrides
  const handleDecisionMakerChange = (maker, isChecked) => {
    const currentMakers =
      cxProjectData.decision_makers || smartDefaults.decision_makers
    let newMakers = [...currentMakers]

    if (isChecked && !newMakers.includes(maker)) {
      newMakers.push(maker)
    } else if (!isChecked) {
      newMakers = newMakers.filter(m => m !== maker)
    }

    setCxProjectData({
      ...cxProjectData,
      decision_makers: newMakers,
    })
  }

  const handleDepartmentChange = (dept, isChecked) => {
    const currentDepts =
      cxProjectData.affected_departments || smartDefaults.affected_departments
    let newDepts = [...currentDepts]

    if (isChecked && !newDepts.includes(dept)) {
      newDepts.push(dept)
    } else if (!isChecked) {
      newDepts = newDepts.filter(d => d !== dept)
    }

    setCxProjectData({
      ...cxProjectData,
      affected_departments: newDepts,
    })
  }

  // Auto-populate required fields with smart defaults when not customizing
  const ensureRequiredFields = () => {
    const updates = {}

    if (!cxProjectData.report_audience) {
      updates.report_audience = smartDefaults.report_audience
    }
    if (!cxProjectData.report_goal) {
      updates.report_goal = smartDefaults.report_goal
    }
    if (!cxProjectData.customer_segment) {
      updates.customer_segment = smartDefaults.customer_segment
    }
    if (!cxProjectData.target_kpi) {
      updates.target_kpi = smartDefaults.target_kpi
    }
    if (!cxProjectData.success_definition) {
      updates.success_definition = smartDefaults.success_definition
    }
    if (
      !cxProjectData.dataSourcesList ||
      cxProjectData.dataSourcesList.length === 0
    ) {
      updates.dataSourcesList = smartDefaults.dataSourcesList
    }

    if (Object.keys(updates).length > 0) {
      setCxProjectData(prev => ({ ...prev, ...updates }))
    }
  }

  return (
    <div className='learning-module'>
      <div className='module-header'>
        <h2 className='module-title'>🤖 Meet Your AI Automation Team</h2>
        <p className='module-subtitle'>
          Discover how specialized AI automation specialists work together -
          each with unique expertise in building professional business cases
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

      {/* Core Assessment - Required Questions */}
      <div className='agent-input-section highlighted-input-card'>
        <h3 className='input-title'>Core Automation Assessment</h3>
        <p className='input-description'>
          Complete these 6 essential questions to generate your professional
          automation business case. Our AI specialists will use industry
          benchmarks to fill in additional details.
        </p>

        <div className='core-assessment'>
          {/* Core Question 1: Business Challenge */}
          <div className='input-group'>
            <label className='input-label required'>
              1. What is the primary business challenge driving this automation
              need?
            </label>
            <select
              value={cxProjectData.business_challenge || ''}
              onChange={e =>
                setCxProjectData({
                  ...cxProjectData,
                  business_challenge: e.target.value,
                })
              }
              className='business-input'
              required
            >
              <option value=''>Choose business challenge...</option>
              <option value='Cost reduction pressure'>
                Cost reduction pressure
              </option>
              <option value='Compliance requirements'>
                Compliance requirements
              </option>
              <option value='Customer experience issues'>
                Customer experience issues
              </option>
              <option value='Staff productivity concerns'>
                Staff productivity concerns
              </option>
              <option value='Error reduction needs'>
                Error reduction needs
              </option>
              <option value='Scalability challenges'>
                Scalability challenges
              </option>
              <option value='Other'>Other</option>
            </select>
          </div>

          {/* Core Question 2: Business Outcome → maps to success_definition */}
          <div className='input-group'>
            <label className='input-label required'>
              2. What specific business outcome must this automation achieve?
            </label>
            <textarea
              value={cxProjectData.success_definition || ''}
              onChange={e =>
                setCxProjectData({
                  ...cxProjectData,
                  success_definition: e.target.value,
                })
              }
              placeholder="Be specific with measurable outcomes. Examples: 'Reduce password reset time from 15 minutes to 2 minutes' or 'Eliminate 80% of manual invoice processing errors'"
              className='business-textarea'
              rows={4}
              required
            />
          </div>

          {/* Core Question 3: Current State */}
          <div className='input-group'>
            <label className='input-label required'>
              3. How does this process work today?
            </label>
            <textarea
              value={cxProjectData.current_state || ''}
              onChange={e =>
                setCxProjectData({
                  ...cxProjectData,
                  current_state: e.target.value,
                })
              }
              placeholder='Example: Takes 4 hours per invoice, involves 3 people, requires 5 approval steps'
              className='business-textarea'
              rows={3}
              required
            />
          </div>

          {/* Core Question 4: Process Frequency & Volume → influences target_kpi */}
          <div className='input-grid'>
            <div className='input-group'>
              <label className='input-label required'>
                4a. How often does this process run?
              </label>
              <select
                value={cxProjectData.process_frequency || ''}
                onChange={e => {
                  const frequency = e.target.value
                  setCxProjectData({
                    ...cxProjectData,
                    process_frequency: frequency,
                    target_kpi:
                      frequency === 'Multiple times daily'
                        ? 'Process efficiency improvement'
                        : frequency === 'Daily'
                        ? 'Daily processing time reduction'
                        : 'Process cycle time improvement',
                  })
                }}
                className='business-input'
                required
              >
                <option value=''>Choose frequency...</option>
                <option value='Multiple times daily'>
                  Multiple times daily
                </option>
                <option value='Daily'>Daily</option>
                <option value='Weekly'>Weekly</option>
                <option value='Monthly'>Monthly</option>
                <option value='Quarterly'>Quarterly</option>
                <option value='As needed/irregular'>As needed/irregular</option>
              </select>
            </div>

            <div className='input-group'>
              <label className='input-label required'>
                4b. Monthly volume (how many times per month)?
              </label>
              <input
                type='number'
                value={cxProjectData.monthly_volume || ''}
                onChange={e =>
                  setCxProjectData({
                    ...cxProjectData,
                    monthly_volume: e.target.value,
                  })
                }
                placeholder='e.g., 200'
                className='business-input'
                required
              />
            </div>
          </div>

          {/* Core Question 5: People Involved */}
          <div className='input-group'>
            <label className='input-label required'>
              5. How many people are involved in this process?
            </label>
            <input
              type='number'
              value={cxProjectData.people_involved || ''}
              onChange={e =>
                setCxProjectData({
                  ...cxProjectData,
                  people_involved: e.target.value,
                })
              }
              className='business-input'
              min='1'
              required
            />
            <div className='helper-text'>
              Count everyone who touches this process from start to finish
            </div>
          </div>

          {/* Core Question 6: Manual Percentage Slider */}
          <div className='input-group'>
            <label className='input-label required'>
              6. How much of this process is currently manual?
            </label>
            <div className='slider-container'>
              <input
                type='range'
                min='0'
                max='100'
                value={cxProjectData.manual_percentage || 50}
                onChange={e =>
                  setCxProjectData({
                    ...cxProjectData,
                    manual_percentage: parseInt(e.target.value),
                  })
                }
                className='percentage-slider'
              />
              <div className='slider-value'>
                {cxProjectData.manual_percentage || 50}% Manual
              </div>
              <div className='slider-labels'>
                <span>0% (Fully automated)</span>
                <span>100% (Completely manual)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Smart Estimates Display */}
      <div className='smart-estimates-section'>
        <h3 className='estimates-title'>📊 Industry Benchmark Estimates</h3>
        <p className='estimates-description'>
          Based on <strong>{automationType}</strong> projects, here's what we
          estimate for your analysis:
        </p>

        <div className='estimates-grid'>
          <div className='estimate-card'>
            <h4 className='estimate-category'>Target Audience</h4>
            <p className='estimate-value'>{smartDefaults.report_audience}</p>
          </div>

          <div className='estimate-card'>
            <h4 className='estimate-category'>Analysis Goal</h4>
            <p className='estimate-value'>{smartDefaults.report_goal}</p>
          </div>

          <div className='estimate-card'>
            <h4 className='estimate-category'>Department Focus</h4>
            <p className='estimate-value'>{smartDefaults.customer_segment}</p>
          </div>

          <div className='estimate-card'>
            <h4 className='estimate-category'>Key Metric</h4>
            <p className='estimate-value'>{smartDefaults.target_kpi}</p>
          </div>

          <div className='estimate-card'>
            <h4 className='estimate-category'>Process Data Sources</h4>
            <ul className='estimate-list'>
              {smartDefaults.dataSourcesList.map((source, index) => (
                <li key={index}>{source}</li>
              ))}
            </ul>
          </div>

          <div className='estimate-card'>
            <h4 className='estimate-category'>Projected ROI</h4>
            <p className='estimate-value'>{smartDefaults.projected_roi}</p>
          </div>
        </div>

        <div className='estimates-actions'>
          <button
            onClick={() => {
              ensureRequiredFields()
              setCurrentStep(2)
            }}
            className='continue-button primary large'
          >
            These estimates look right → Continue to AI Analysis
          </button>

          <button
            onClick={() => setShowCustomization(true)}
            className='customize-button secondary'
          >
            🔧 Customize these estimates
          </button>
        </div>
      </div>

      {/* Optional Customization Section */}
      {showCustomization && (
        <div className='customization-section'>
          <h3 className='customization-title'>🔧 Customize Your Analysis</h3>
          <p className='customization-description'>
            Override any estimates that don't match your specific situation:
          </p>

          <div className='customization-content'>
            {/* Target Audience Override */}
            <div className='customization-group'>
              <h4 className='customization-label'>
                ❓ Different target audience for this business case?
              </h4>
              <select
                value={
                  cxProjectData.report_audience || smartDefaults.report_audience
                }
                onChange={e =>
                  setCxProjectData({
                    ...cxProjectData,
                    report_audience: e.target.value,
                  })
                }
                className='business-input-small'
              >
                <option value='Executive leadership (C-Suite)'>
                  Executive leadership (C-Suite)
                </option>
                <option value='Operations team'>Operations team</option>
                <option value='IT department'>IT department</option>
                <option value='Finance department'>Finance department</option>
                <option value='Cross-functional stakeholders'>
                  Cross-functional stakeholders
                </option>
              </select>
            </div>

            {/* Analysis Goal Override */}
            <div className='customization-group'>
              <h4 className='customization-label'>
                ❓ Different analysis goal than estimated?
              </h4>
              <select
                value={cxProjectData.report_goal || smartDefaults.report_goal}
                onChange={e =>
                  setCxProjectData({
                    ...cxProjectData,
                    report_goal: e.target.value,
                  })
                }
                className='business-input-small'
              >
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
            </div>

            {/* Department Focus Override */}
            <div className='customization-group'>
              <h4 className='customization-label'>
                ❓ Different department or process area focus?
              </h4>
              <input
                type='text'
                value={
                  cxProjectData.customer_segment ||
                  smartDefaults.customer_segment
                }
                onChange={e =>
                  setCxProjectData({
                    ...cxProjectData,
                    customer_segment: e.target.value,
                  })
                }
                placeholder='e.g., Finance & Accounting Department'
                className='business-input-small'
              />
            </div>

            {/* Key Metric Override */}
            <div className='customization-group'>
              <h4 className='customization-label'>
                ❓ Different key automation metric to focus on?
              </h4>
              <input
                type='text'
                value={cxProjectData.target_kpi || smartDefaults.target_kpi}
                onChange={e =>
                  setCxProjectData({
                    ...cxProjectData,
                    target_kpi: e.target.value,
                  })
                }
                placeholder='e.g., Processing time reduction'
                className='business-input-small'
              />
            </div>

            {/* Process Data Sources Override */}
            <div className='customization-group'>
              <h4 className='customization-label'>
                ❓ Different process data sources available?
              </h4>
              <div className='multi-select-checkboxes'>
                {[
                  'Process Volume & Timing Data',
                  'Cost & Resource Data',
                  'Performance Metrics',
                  'Compliance & Quality Data',
                  'Customer Feedback Data',
                  'System Integration Data',
                  'Historical Process Data',
                  'Benchmarking Data',
                ].map(source => (
                  <label key={source} className='checkbox-option'>
                    <input
                      type='checkbox'
                      checked={(
                        cxProjectData.dataSourcesList ||
                        smartDefaults.dataSourcesList
                      ).includes(source)}
                      onChange={e =>
                        handleDataSourceChange(source, e.target.checked)
                      }
                    />
                    <span>{source}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Success Definition Override */}
            <div className='customization-group'>
              <h4 className='customization-label'>
                ❓ Different success definition than projected?
              </h4>
              <textarea
                value={
                  cxProjectData.success_definition ||
                  smartDefaults.success_definition
                }
                onChange={e =>
                  setCxProjectData({
                    ...cxProjectData,
                    success_definition: e.target.value,
                  })
                }
                placeholder='Describe your specific automation success criteria'
                className='business-textarea-small'
                rows={3}
              />
            </div>
          </div>

          <div className='customization-actions'>
            <button
              onClick={() => {
                ensureRequiredFields()
                setCurrentStep(2)
              }}
              className='continue-button primary'
            >
              Continue with Custom Settings → AI Analysis
            </button>
            <button
              onClick={() => setShowCustomization(false)}
              className='cancel-button'
            >
              Cancel Customization
            </button>
          </div>
        </div>
      )}

      <div className='module-actions'>
        <button onClick={() => setCurrentStep(0)} className='back-button'>
          ← Back to Automation Selection
        </button>
      </div>
    </div>
  )
}

export default Step2TeamSetup
