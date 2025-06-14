import React from 'react'
import '../styles/step1.css'

const Step1ScenarioSelection = ({
  cxProjectData,
  businessScenarios,
  setCxProjectData,
  setCurrentStep,
}) => {
  return (
    <div className='learning-module'>
      <div className='module-header'>
        <h2 className='module-title'>🤖 What are AI Automation Specialists?</h2>
        <p className='module-subtitle'>
          Discover how AI analysis teams build professional automation business
          cases
        </p>
      </div>

      {/* Educational Introduction */}
      <div className='concept-explanation'>
        <h3 className='concept-title'>
          Why Use Multiple AI Agents for Automation Analysis?
        </h3>
        <div className='concept-grid'>
          <div className='concept-card'>
            <div className='concept-icon'>🎯</div>
            <h4>Specialized Expertise</h4>
            <p>
              Each AI agent functions like a specialized automation consultant.
              The Process Analysis Specialist works like a McKinsey operations
              expert, while the ROI Calculator acts like a Deloitte financial
              analyst. This multi-agent approach delivers comprehensive
              automation assessments worth $10K-$50K in consulting fees.
            </p>
          </div>
          <div className='concept-card'>
            <div className='concept-icon'>🔍</div>
            <h4>Complete ROI Analysis</h4>
            <p>
              Multiple AI agents analyze cost savings, implementation risks,
              timeline projections, and success metrics simultaneously, creating
              a bulletproof business case for automation investments.
            </p>
          </div>
          <div className='concept-card'>
            <div className='concept-icon'>⚡</div>
            <h4>Professional Speed</h4>
            <p>
              AI specialist teams can create executive-ready automation business
              cases in minutes that would take human consulting teams weeks to
              research and develop.
            </p>
          </div>
        </div>
      </div>

      {/* Business Project Setup */}
      <div className='project-setup'>
        <h3 className='setup-title'>
          Your Turn: Build Your Automation Business Case
        </h3>
        <p className='setup-description'>
          You'll direct a team of 6 AI automation specialists to analyze a
          process automation opportunity. Get hands-on experience with how AI
          builds professional business cases while learning automation
          opportunities for your organization.
        </p>

        <div className='scenario-selection'>
          <label className='input-label'>
            Choose an automation process to analyze with AI specialists:
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
            <option value=''>Select an automation opportunity...</option>
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
              <h4>Excellent Choice for Automation Analysis!</h4>
              <p>
                You've selected{' '}
                <strong>
                  {cxProjectData.business_scenario.split(' - ')[0]}
                </strong>{' '}
                - a high-impact automation opportunity perfect for our AI
                specialist team to analyze.
              </p>
            </div>

            <div className='next-preview'>
              <h5>What happens next?</h5>
              <ul className='preview-list'>
                <li>Meet your team of 6 specialized AI automation analysts</li>
                <li>
                  Watch them calculate ROI, risks, and implementation timelines
                </li>
                <li>See how they collaborate like real consulting teams</li>
                <li>
                  Download a professional business case for your organization
                </li>
              </ul>
            </div>

            <button
              onClick={() => setCurrentStep(1)}
              className='continue-button primary'
            >
              Meet Your AI Automation Team →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Step1ScenarioSelection
