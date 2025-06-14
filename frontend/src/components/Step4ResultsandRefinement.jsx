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
        <h2 className='module-title'>🤝 Human-AI Business Partnership</h2>
        <p className='module-subtitle'>
          Review AI recommendations, propose refinements, and see how AI adapts
          to your business judgment
        </p>
      </div>

      {/* Business Report Review */}
      <div className='business-continuation'>
        <h3 className='continuation-title'>
          Review AI Analysis & Propose Refinements
        </h3>
        <p className='continuation-description'>
          The AI team created comprehensive business recommendations. Now use
          your strategic insight to propose changes, set priorities, or add
          constraints. Watch how the AI Refinement Agent adapts the
          recommendations based on your input.
        </p>

        <div className='ai-report-section'>
          <h4>🤖 AI Team's Initial Analysis:</h4>
          <div className='ai-report-content'>
            <div className='report-section'>
              <strong>Executive Summary:</strong>
              <p>
                {generatedReport?.deliverables?.executive_summary ||
                  'Your AI-generated business analysis will appear here!'}
              </p>
            </div>

            {generatedReport?.deliverables?.pain_points && (
              <div className='report-section'>
                <strong>Key Pain Points Identified:</strong>
                <ul>
                  {generatedReport.deliverables.pain_points
                    .slice(0, 3)
                    .map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                </ul>
              </div>
            )}

            {generatedReport?.deliverables?.strategic_recommendations && (
              <div className='report-section'>
                <strong>Strategic Recommendations:</strong>
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
          <h4>💼 Your Turn: Propose Changes & Fine-tune Results:</h4>
          <p className='propose-description'>
            Based on your business experience, what would you change about these
            recommendations? The AI Refinement Agent will adapt the analysis
            based on your input.
          </p>

          <div className='change-examples'>
            <h5>💡 Example Business Refinements:</h5>
            <ul className='example-list'>
              <li>
                <strong>"Prioritize recommendations"</strong> - AI will reorder
                by business impact
              </li>
              <li>
                <strong>"Consider budget constraints"</strong> - AI will add
                cost-optimization approaches
              </li>
              <li>
                <strong>"Faster timeline needed"</strong> - AI will accelerate
                implementation phases
              </li>
              <li>
                <strong>"Add more metrics"</strong> - AI will expand success
                measurement framework
              </li>
            </ul>
          </div>

          <textarea
            value={proposedChanges}
            onChange={handleProposedChangesChange}
            placeholder='What business considerations should the AI team incorporate?

Examples:
• "We need to prioritize low-cost solutions due to budget constraints"
• "Implementation must be completed within 3 months" 
• "Focus on solutions that do not require additional staffing"
• "Add customer retention metrics to success criteria"
• "Consider seasonal business patterns in the timeline"

Your strategic input will help the AI Refinement Agent adjust the recommendations...'
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
                : '✨ Refine Recommendations'}
            </button>
            <p className='refine-note'>
              See how AI adapts recommendations based on your business judgment
            </p>
          </div>
        </div>

        {/* Show Refined Results */}
        {showRefinement && (
          <div className='refinement-results'>
            <h4>🎯 AI-Refined Business Recommendations:</h4>
            <p className='refinement-description'>
              Based on your input, the AI Refinement Agent has adapted the
              recommendations. Compare the changes below:
            </p>

            <div className='before-after-comparison'>
              <div className='comparison-section'>
                <h5>📋 Original Recommendations:</h5>
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
                <h5>✨ Refined Recommendations:</h5>
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
                  Adapted recommendations based on your business constraints
                </li>
                <li>Adjusted implementation timeline per your requirements</li>
                <li>
                  Enhanced ROI projection:{' '}
                  {refinedReport?.deliverables?.estimated_roi}
                </li>
                <li>
                  Incorporated your strategic priorities into the action plan
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Download and Actions */}
      <div className='final-deliverable'>
        <h3 className='deliverable-title'>📥 Your Professional Deliverable</h3>
        <p className='deliverable-description'>
          Download your complete customer experience optimization report,
          including both AI analysis and your strategic refinements.
        </p>

        <div className='download-section'>
          <div className='download-preview'>
            <h4>📋 Report Includes:</h4>
            <ul className='download-contents'>
              <li>Executive Summary with key findings</li>
              <li>Customer journey analysis and pain points</li>
              <li>
                {refinedReport ? 'Refined' : 'Original'} strategic
                recommendations
              </li>
              <li>Phase-by-phase implementation roadmap</li>
              <li>Success metrics and ROI projections</li>
              <li>AI collaboration methodology notes</li>
            </ul>
          </div>

          <button onClick={downloadReport} className='download-button'>
            📥 Download Business Analysis Report
          </button>
        </div>
      </div>

      <div className='module-actions centered-action'>
        <button onClick={resetApp} className='restart-button'>
          🔄 Analyze Another Business Scenario
        </button>
      </div>
    </div>
  )
}

export default Step4ResultsAndRefinement
