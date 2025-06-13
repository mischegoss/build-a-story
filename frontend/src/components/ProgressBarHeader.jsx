import React from 'react'

const ProgressBarHeader = ({ currentStep, error, setError }) => {
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

  return (
    <>
      {/* Header */}
      <div className='lab-header'>
        <h1 className='lab-title'>Multi-Agent AI Business Lab</h1>
        <p className='lab-subtitle'>
          Learn how AI teams solve complex business challenges through customer
          experience optimization
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
