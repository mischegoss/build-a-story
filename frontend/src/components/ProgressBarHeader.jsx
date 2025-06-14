import React from 'react'
import '../styles/progress-bar.css'

const ProgressBarHeader = ({ currentStep, error, setError }) => {
  const businessSteps = [
    {
      icon: '🔄',
      title: 'Choose Automation Process',
      desc: 'Select opportunity',
    },
    {
      icon: '🤖',
      title: 'Meet AI Analysis Team',
      desc: 'Automation specialists',
    },
    {
      icon: '📊',
      title: 'Watch AI Agent Workflow',
      desc: 'Building your case',
    },
    {
      icon: '📋',
      title: 'Get Business Case',
      desc: 'Download & present',
    },
  ]

  return (
    <>
      {/* Header */}
      <div className='lab-header'>
        <h1 className='lab-title'>AI Automation Business Case Builder</h1>
        <p className='lab-subtitle'>
          Learn automation opportunities by building a professional business
          case with AI analysis specialists
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
    </>
  )
}

export default ProgressBarHeader
