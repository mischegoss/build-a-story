import React from 'react'

const Step2TeamSetup = ({
  cxProjectData,
  cxOptions,
  setCxProjectData,
  setCurrentStep,
  agentStatuses,
  handlePersonaChange,
  addPersona,
  removePersona,
  handleCXToolChange,
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
  )
}

export default Step2TeamSetup
