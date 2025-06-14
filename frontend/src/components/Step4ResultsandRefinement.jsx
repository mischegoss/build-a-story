import React, { useState } from 'react'
import '../styles/step4.css'
import PDFDownloadButton from './PDFBusinessCase'

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
  // Local state for refinement section (following Step 2 pattern)
  const [showRefinementSection, setShowRefinementSection] = useState(false)
  const [proceedToDownload, setProceedToDownload] = useState(false)

  return (
    <div className='learning-module'>
      <div className='module-header'>
        <h2 className='module-title'>🤝 Human-AI Automation Partnership</h2>
        <p className='module-subtitle'>
          Review AI automation analysis, choose to proceed or refine, then
          download your professional business case
        </p>
      </div>

      {/* Business Case Review Section */}
      <div className='business-case-review'>
        <h3 className='review-title'>
          📊 AI Automation Business Case Complete
        </h3>
        <p className='review-description'>
          Your AI automation team has created a comprehensive business case with
          ROI projections, implementation roadmap, and success metrics. Review
          the analysis below and choose your next step.
        </p>

        <div className='ai-report-section'>
          <h4 className='report-header'>
            🤖 Professional Business Case Summary
          </h4>
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

            {/* ROI Highlights */}
            <div className='report-section roi-highlights'>
              <strong>Financial Impact:</strong>
              <div className='roi-summary'>
                <span className='roi-metric'>
                  <strong>Expected ROI:</strong>{' '}
                  {generatedReport?.deliverables?.estimated_roi || 'N/A'}
                </span>
                <span className='roi-metric'>
                  <strong>Payback Period:</strong>{' '}
                  {generatedReport?.deliverables?.payback_period || 'N/A'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Choose Next Step Section (Step 2 pattern) */}
      {!proceedToDownload && !showRefinementSection && (
        <div className='choose-next-step'>
          <h3 className='choice-title'>🎯 Choose Your Next Step</h3>
          <p className='choice-description'>
            The AI analysis is complete. You can proceed directly to download
            your professional business case, or refine the recommendations based
            on your operational constraints.
          </p>

          <div className='choice-actions'>
            <button
              onClick={() => setProceedToDownload(true)}
              className='continue-button primary large'
            >
              Analysis looks good → Proceed to Download
            </button>

            <button
              onClick={() => setShowRefinementSection(true)}
              className='customize-button secondary'
            >
              🔧 I want to refine this first
            </button>
          </div>
        </div>
      )}

      {/* Optional Refinement Section (only shows when user clicks refine) */}
      {showRefinementSection && (
        <div className='refinement-section'>
          <h3 className='refinement-title'>🔧 Refine Your Business Case</h3>
          <p className='refinement-description'>
            Use your operational expertise to customize the automation business
            case. The AI Refinement Agent will adapt the analysis based on your
            business constraints and priorities.
          </p>

          <div className='refinement-content'>
            {/* Business Refinement Input */}
            <div className='refinement-group'>
              <h4 className='refinement-label'>
                💼 What business considerations should be incorporated?
              </h4>

              <div className='change-examples'>
                <h5>💡 Example Business Refinements:</h5>
                <ul className='example-list'>
                  <li>
                    <strong>"Prioritize by budget impact"</strong> - AI will
                    reorder by cost-benefit ratio
                  </li>
                  <li>
                    <strong>"Consider implementation complexity"</strong> - AI
                    will add phased deployment approaches
                  </li>
                  <li>
                    <strong>"Faster ROI payback needed"</strong> - AI will focus
                    on quick-win automation opportunities
                  </li>
                  <li>
                    <strong>"Add risk mitigation"</strong> - AI will expand
                    change management and contingency planning
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
                className='refinement-textarea'
                rows={8}
                disabled={loading}
              />
            </div>
          </div>

          <div className='refinement-actions'>
            <button
              onClick={() => {
                refineRecommendations(proposedChanges)
                setProceedToDownload(true)
              }}
              disabled={!proposedChanges.trim() || loading}
              className='continue-button primary'
            >
              {loading
                ? '🔄 AI Refinement Agent Working...'
                : '✨ Apply Refinements & Proceed'}
            </button>
            <button
              onClick={() => setShowRefinementSection(false)}
              className='cancel-button'
            >
              Cancel Refinement
            </button>
          </div>

          <div className='refinement-note'>
            <p>
              The AI Refinement Agent will analyze your input and adapt the
              automation recommendations, ROI projections, and implementation
              timeline based on your operational constraints.
            </p>
          </div>
        </div>
      )}

      {/* Refinement Results (only shows after refinement is complete) */}
      {showRefinement && refinedReport && (
        <div className='refinement-results'>
          <h3 className='results-title'>
            🎯 AI-Refined Business Case Complete
          </h3>
          <p className='results-description'>
            The AI Refinement Agent has successfully adapted your automation
            business case. Compare the key changes below:
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
            <h5>🎯 Key Adaptations Made:</h5>
            <ul className='impact-list'>
              <li>
                Adapted automation priorities based on your business constraints
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

      {/* Original Download Section (shows when user proceeds to download) */}
      {proceedToDownload && (
        <div className='final-deliverable'>
          <h3 className='deliverable-title'>
            📥 Your Professional Automation Business Case
          </h3>
          <p className='deliverable-description'>
            Download your complete automation business case with ROI
            projections, including both AI analysis and{' '}
            {refinedReport
              ? 'your operational refinements'
              : 'professional recommendations'}
            .
          </p>

          <div className='download-section'>
            <div className='download-preview'>
              <h4>📋 Business Case Includes:</h4>
              <ul className='download-contents'>
                <li>
                  Executive Summary with automation ROI and payback period
                </li>
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

            <div className='download-buttons'>
              <PDFDownloadButton
                reportData={generatedReport}
                refinedData={refinedReport}
                className='download-button primary'
              >
                📥 Download Professional PDF
              </PDFDownloadButton>

              <button
                onClick={downloadReport}
                className='download-button secondary'
              >
                📄 Download Text Version
              </button>
            </div>
          </div>
        </div>
      )}

      <div className='module-actions centered-action'>
        <button onClick={resetApp} className='restart-button'>
          🔄 Analyze Another Automation Process
        </button>
      </div>
    </div>
  )
}

export default Step4ResultsAndRefinement
