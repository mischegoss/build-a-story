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
  )
}

export default Step1ScenarioSelection
