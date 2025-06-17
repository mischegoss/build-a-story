import React from 'react'
import '../styles/chat-interface.css'

const AgentChatInterface = ({
  agentStatuses,
  currentAgent,
  cxProjectData,
  loading,
  chatMessages, // Server-generated chat messages
  connectionError, // Add error state prop
}) => {
  // Agent avatar mapping
  const agentAvatars = {
    customer_journey_analyst: '🔍',
    data_analytics_specialist: '💰',
    process_improvement_specialist: '📋',
    solution_designer: '⚠️',
    implementation_strategist: '🔧',
    success_metrics_specialist: '📊',
  }

  // Determine which agents are completed based on chat messages or agent workflow
  const completedAgents = chatMessages
    .filter(msg => msg.type === 'completion' && msg.from_agent !== 'system')
    .map(msg => msg.from_agent)

  // Get agent status - completed, active, waiting, or connection error
  const getAgentStatus = agent => {
    // If there's a connection error, show error state for all agents
    if (connectionError) {
      return 'connection-error'
    }

    if (completedAgents.includes(agent.technical_name)) {
      return 'complete'
    }
    if (currentAgent === agent.technical_name && loading) {
      return 'active'
    }
    return 'waiting'
  }

  // Get agent insight from chat messages or use default
  const getAgentInsight = agent => {
    // Try to find insight from chat messages first
    const agentMessage = chatMessages.find(
      msg =>
        msg.from_agent === agent.technical_name &&
        msg.message &&
        msg.message.length > 50,
    )

    if (agentMessage) {
      return agentMessage.message
    }

    // Fallback to default learning moment
    return (
      agent.learning_moment ||
      agent.what_i_do ||
      'Processing automation analysis...'
    )
  }

  // Get current analysis description based on agent
  const getCurrentAnalysis = agent => {
    const descriptions = {
      customer_journey_analyst:
        'I analyze business processes to identify automation opportunities and calculate potential efficiency gains.',
      data_analytics_specialist:
        'I calculate cost savings, implementation costs, and ROI projections for automation investments.',
      process_improvement_specialist:
        'I create detailed implementation roadmaps with phases, timelines, and resource requirements.',
      solution_designer:
        'I identify implementation risks, change management challenges, and create mitigation strategies.',
      implementation_strategist:
        'I evaluate automation technologies and create integration plans with existing systems.',
      success_metrics_specialist:
        'I compile all analysis into executive-ready business cases with success metrics and KPI frameworks.',
    }

    return (
      descriptions[agent.technical_name] ||
      agent.what_i_do ||
      'Processing automation analysis...'
    )
  }

  return (
    <div className='agent-workflow-interface'>
      <div className='workflow-header'>
        {connectionError ? (
          <>
            <h3>⚠️ Connection Issue - Unable to Reach AI Services</h3>
            <p>
              Cannot connect to AI automation specialists right now. Please
              check your connection and retry.
            </p>
          </>
        ) : (
          <>
            <h3>🤖 AI Automation Specialists Collaboration</h3>
            <p>
              Watch our specialized agents build your business case step by step
            </p>
          </>
        )}
      </div>

      <div className='workflow-cards'>
        {agentStatuses.map((agent, index) => {
          const status = getAgentStatus(agent)
          const isCompleted = status === 'complete'
          const isActive = status === 'active'
          const isConnectionError = status === 'connection-error'
          const insight = getAgentInsight(agent)
          const currentAnalysis = getCurrentAnalysis(agent)

          return (
            <div key={agent.technical_name} className='workflow-card-container'>
              <div className={`workflow-card ${status}`}>
                <div className='agent-header'>
                  <div className='agent-avatar'>
                    {agentAvatars[agent.technical_name] || agent.avatar}
                  </div>
                  <div className='agent-info'>
                    <h4 className='agent-name'>{agent.name}</h4>
                    <div className='agent-status'>
                      {isCompleted && (
                        <span className='status-complete'>
                          ✅ Analysis Complete
                        </span>
                      )}
                      {isActive && (
                        <span className='status-active'>⚡ Working...</span>
                      )}
                      {isConnectionError && (
                        <span className='status-connection-error'>
                          ⚠️ Connection Issue
                        </span>
                      )}
                      {status === 'waiting' && !isConnectionError && (
                        <span className='status-waiting'>⏳ Waiting</span>
                      )}
                    </div>
                  </div>
                </div>

                {(isCompleted || isActive) && !isConnectionError && (
                  <div className='agent-content'>
                    <div className='current-analysis'>
                      <strong>Current Analysis:</strong> {currentAnalysis}
                    </div>

                    <div className='business-insight'>
                      <span className='insight-icon'>💡</span>
                      <strong>Business AI Insight:</strong> {insight}
                    </div>
                  </div>
                )}

                {isConnectionError && (
                  <div className='agent-content'>
                    <div className='connection-error-message'>
                      <span className='error-icon'>🔌</span>
                      <strong>
                        Unable to connect to AI automation services.
                      </strong>
                      <p>
                        Please check your internet connection and try again.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Show arrow between completed agents (except for the last one) */}
              {isCompleted &&
                index < agentStatuses.length - 1 &&
                !connectionError && <div className='workflow-arrow'>↓</div>}
            </div>
          )
        })}
      </div>

      <div className='workflow-footer'>
        <div className='progress-summary'>
          {connectionError ? (
            <span>⚠️ Connection issue - Please retry to continue</span>
          ) : (
            <>
              <span>
                📊 Progress: {completedAgents.length} of {agentStatuses.length}{' '}
                specialists completed
              </span>
              {loading && currentAgent && (
                <span className='current-agent'>
                  Currently:{' '}
                  {
                    agentStatuses.find(a => a.technical_name === currentAgent)
                      ?.name
                  }
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default AgentChatInterface
