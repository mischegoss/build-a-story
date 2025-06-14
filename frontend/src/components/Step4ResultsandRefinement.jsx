import React from 'react'
import '../styles/step4.css'

const Step4ResultsAndRefinement = ({
  generatedReport,
  refinedReport,
  showRefinement,
  proposedChanges,
  handleProposedChangesChange,
  refineRecommendations,
  downloadReport,
  resetApp,
  loading,
}) => {
  return (
    <div className='learning-module'>
      <div className='module-header'>
        <h2 className='module-title'>🤝 Human-AI Automation Partnership</h2>
        <p className='module-subtitle'>
          Review AI automation analysis, propose business refinements, and see
          how AI adapts to your operational constraints
        </p>
      </div>

      {/* Business Report Review */}
      <div className='business-continuation'>
        <h3 className='continuation-title'>
          Review Automation Analysis & Propose Business Refinements
        </h3>
        <p className='continuation-description'>
          The AI automation team created a comprehensive business case with ROI
          projections. Now use your operational insight to propose changes, set
          budget priorities, or add implementation constraints. Watch how the AI
          Refinement Agent adapts the business case based on your input.
        </p>

        <div className='ai-report-section'>
          <h4>🤖 AI Team's Automation Business Case:</h4>
          <div className='ai-report-content'>
            <div className='report-section'>
              <strong>Executive Summary:</strong>
              <p>
                {generatedReport?.deliverables?.executive_summary ||
                  'Your AI-generated automation business case will appear here!'}
              </p>
            </div>

            {generatedReport?.deliverables?.automation_opportunities && (
              <div className='report-section'>
                <strong>Key Automation Opportunities Identified:</strong>
                <ul>
                  {generatedReport.deliverables.automation_opportunities
                    .slice(0, 3)
                    .map((opportunity, index) => (
                      <li key={index}>{opportunity}</li>
                    ))}
                </ul>
              </div>
            )}

            {generatedReport?.deliverables?.strategic_recommendations && (
              <div className='report-section'>
                <strong>ROI Recommendations:</strong>
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

        {/* Propose Changes Section */}
        <div className='propose-changes-section'>
          <h4>💼 Your Turn: Propose Changes & Fine-tune Business Case:</h4>
          <p className='propose-description'>
            Based on your operational experience, what would you change about
            this automation business case? The AI Refinement Agent will adapt
            the analysis based on your business constraints and priorities.
          </p>

          <div className='change-examples'>
            <h5>💡 Example Business Refinements:</h5>
            <ul className='example-list'>
              <li>
                <strong>"Prioritize by budget impact"</strong> - AI will reorder
                by cost-benefit ratio
              </li>
              <li>
                <strong>"Consider implementation complexity"</strong> - AI will
                add phased deployment approaches
              </li>
              <li>
                <strong>"Faster ROI payback needed"</strong> - AI will focus on
                quick-win automation opportunities
              </li>
              <li>
                <strong>"Add risk mitigation"</strong> - AI will expand change
                management and contingency planning
              </li>
            </ul>
          </div>

          <textarea
            value={proposedChanges}
            onChange={handleProposedChangesChange}
            placeholder='What business considerations should the AI automation team incorporate?

Examples:
- "We need to prioritize automations with under 6-month payback periods"
- "Implementation must work with our existing ERP system" 
- "Focus on solutions that require minimal staff training"
- "Add detailed change management for employee adoption"
- "Consider our Q4 budget freeze in the timeline"

Your operational input will help the AI Refinement Agent adjust the business case...'
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
                : '✨ Refine Business Case'}
            </button>
            <p className='refine-note'>
              See how AI adapts automation recommendations based on your
              business constraints
            </p>
          </div>
        </div>

        {/* Show Refined Results */}
        {showRefinement && (
          <div className='refinement-results'>
            <h4>🎯 AI-Refined Automation Business Case:</h4>
            <p className='refinement-description'>
              Based on your input, the AI Refinement Agent has adapted the
              automation business case. Compare the changes below:
            </p>

            <div className='before-after-comparison'>
              <div className='comparison-section'>
                <h5>📋 Original ROI Recommendations:</h5>
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
                <h5>✨ Refined ROI Recommendations:</h5>
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
                  Adapted automation priorities based on your budget constraints
                </li>
                <li>
                  Adjusted implementation timeline per your operational
                  requirements
                </li>
                <li>
                  Enhanced ROI projection:{' '}
                  {refinedReport?.deliverables?.estimated_roi}
                </li>
                <li>
                  Incorporated your operational priorities into the automation
                  roadmap
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Download and Actions */}
      <div className='final-deliverable'>
        <h3 className='deliverable-title'>
          📥 Your Professional Automation Business Case
        </h3>
        <p className='deliverable-description'>
          Download your complete automation business case with ROI projections,
          including both AI analysis and your operational refinements.
        </p>

        <div className='download-section'>
          <div className='download-preview'>
            <h4>📋 Business Case Includes:</h4>
            <ul className='download-contents'>
              <li>Executive Summary with automation ROI and payback period</li>
              <li>
                Process analysis and automation opportunity identification
              </li>
              <li>
                {refinedReport ? 'Refined' : 'Original'} financial projections
                and cost-benefit analysis
              </li>
              <li>Phase-by-phase implementation roadmap with timelines</li>
              <li>Risk assessment and success metrics framework</li>
              <li>AI automation analysis methodology notes</li>
            </ul>
          </div>

          <button onClick={downloadReport} className='download-button'>
            📥 Download Automation Business Case
          </button>
        </div>
      </div>

      <div className='module-actions centered-action'>
        <button onClick={resetApp} className='restart-button'>
          🔄 Analyze Another Automation Process
        </button>
      </div>
    </div>
  )
}

export default Step4ResultsAndRefinement
