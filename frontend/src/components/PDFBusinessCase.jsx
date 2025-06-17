// PDFBusinessCase.jsx - Corporate Professional Styles
import React from 'react'
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  Font,
} from '@react-pdf/renderer'

// Corporate Professional PDF Styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 50,
    fontFamily: 'Helvetica',
    fontSize: 11,
    lineHeight: 1.5,
    color: '#0F2143', // Corporate cerulean blue for text
  },

  // Corporate Header and Title Styles
  header: {
    marginBottom: 35,
    borderBottom: 3,
    borderBottomColor: '#0F2143', // Cerulean blue
    paddingBottom: 20,
    position: 'relative',
  },

  corporateHeaderAccent: {
    position: 'absolute',
    bottom: -3,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#8B6212', // Yarrow gold accent
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0F2143', // Cerulean blue
    marginBottom: 8,
    letterSpacing: 0.5,
  },

  subtitle: {
    fontSize: 16,
    color: '#354E56', // Pacific blue
    marginBottom: 8,
    fontWeight: 500,
  },

  projectInfo: {
    fontSize: 10,
    color: '#5A6B73', // Lighter pacific blue
    marginTop: 12,
    lineHeight: 1.4,
  },

  // Corporate Section Styles
  section: {
    marginBottom: 28,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F2143', // Cerulean blue
    marginBottom: 12,
    borderBottom: 2,
    borderBottomColor: '#E8EDF5', // Light cerulean
    paddingBottom: 5,
    position: 'relative',
  },

  sectionTitleAccent: {
    position: 'absolute',
    bottom: -2,
    left: 0,
    width: 60,
    height: 2,
    backgroundColor: '#8B6212', // Yarrow gold
  },

  sectionContent: {
    fontSize: 11,
    lineHeight: 1.6,
    color: '#0F2143', // Cerulean blue
    marginTop: 5,
  },

  // Corporate Executive Summary
  executiveSummary: {
    backgroundColor: '#E8EDF5', // Light cerulean
    padding: 20,
    borderLeft: 4,
    borderLeftColor: '#0F2143', // Cerulean blue
    borderRadius: 3,
    marginBottom: 25,
    position: 'relative',
  },

  executiveSummaryAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#8B6212', // Yarrow gold
  },

  executiveText: {
    fontSize: 12,
    lineHeight: 1.7,
    color: '#0F2143', // Cerulean blue
    fontWeight: 'normal',
  },

  // Corporate List Styles
  listContainer: {
    marginLeft: 20,
    marginTop: 10,
  },

  listItem: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'flex-start',
  },

  bullet: {
    width: 18,
    fontSize: 12,
    color: '#8B6212', // Yarrow gold
    fontWeight: 'bold',
  },

  listText: {
    flex: 1,
    fontSize: 11,
    lineHeight: 1.5,
    color: '#0F2143', // Cerulean blue
  },

  // Corporate ROI and Metrics
  roiContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#E8EDF5', // Light cerulean
    padding: 20,
    borderRadius: 5,
    marginBottom: 20,
    border: 1,
    borderColor: '#0F2143', // Cerulean blue
    position: 'relative',
  },

  roiContainerAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#8B6212', // Yarrow gold
  },

  roiBox: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    marginHorizontal: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
    border: 1,
    borderColor: '#E1E8F0',
  },

  roiValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0F2143', // Cerulean blue
    marginBottom: 6,
  },

  roiLabel: {
    fontSize: 10,
    color: '#354E56', // Pacific blue
    textAlign: 'center',
    fontWeight: 500,
  },

  // Corporate Implementation Roadmap
  phaseContainer: {
    marginBottom: 18,
    backgroundColor: '#E8EDDA', // Light grass green
    padding: 15,
    borderRadius: 4,
    borderLeft: 4,
    borderLeftColor: '#43572E', // Grass green
    position: 'relative',
  },

  phaseContainerAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#43572E', // Grass green
  },

  phaseTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#43572E', // Grass green
    marginBottom: 10,
  },

  phaseAction: {
    fontSize: 10,
    color: '#0F2143', // Cerulean blue
    marginBottom: 4,
    paddingLeft: 12,
    lineHeight: 1.4,
  },

  phaseImpact: {
    fontSize: 10,
    color: '#43572E', // Grass green
    fontStyle: 'italic',
    marginTop: 8,
    fontWeight: 500,
  },

  // Corporate Success Metrics Table
  metricsTable: {
    marginTop: 12,
    border: 1,
    borderColor: '#E1E8F0',
    borderRadius: 3,
  },

  metricsHeader: {
    flexDirection: 'row',
    backgroundColor: '#354E56', // Pacific blue
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E8F0',
  },

  metricsHeaderText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 11,
  },

  metricsRow: {
    flexDirection: 'row',
    padding: 10,
    borderBottom: 1,
    borderBottomColor: '#E1E8F0',
    backgroundColor: '#FAFBFC',
  },

  metricColumn1: {
    flex: 2,
    fontSize: 10,
    fontWeight: 'bold',
    color: '#0F2143', // Cerulean blue
  },

  metricColumn2: {
    flex: 2,
    fontSize: 10,
    color: '#354E56', // Pacific blue
  },

  metricColumn3: {
    flex: 1,
    fontSize: 10,
    color: '#354E56', // Pacific blue
  },

  // Corporate Footer
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 50,
    right: 50,
    borderTop: 2,
    borderTopColor: '#E1E8F0',
    paddingTop: 12,
    fontSize: 9,
    color: '#5A6B73', // Light pacific blue
    textAlign: 'center',
    lineHeight: 1.4,
  },

  // Corporate Risk Assessment
  riskAssessment: {
    backgroundColor: '#F5E6B8', // Light yarrow gold
    padding: 15,
    borderLeft: 4,
    borderLeftColor: '#8B6212', // Yarrow gold
    borderRadius: 3,
    marginTop: 18,
    position: 'relative',
  },

  riskAssessmentAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#8B6212', // Yarrow gold
  },

  riskText: {
    fontSize: 11,
    color: '#6B4A0E', // Dark yarrow gold
    lineHeight: 1.5,
  },

  // Corporate Confidence Badge
  confidenceBadge: {
    position: 'absolute',
    top: 50,
    right: 50,
    backgroundColor: '#43572E', // Grass green
    color: '#FFFFFF',
    padding: 10,
    borderRadius: 15,
    fontSize: 11,
    fontWeight: 'bold',
    border: 2,
    borderColor: '#FFFFFF',
  },

  // Corporate Opportunities Section
  opportunitiesSection: {
    backgroundColor: '#F0F4FA', // Very light cerulean
    padding: 15,
    borderRadius: 4,
    border: 1,
    borderColor: '#E1E8F0',
    marginBottom: 20,
  },

  // Corporate Recommendations Section
  recommendationsSection: {
    backgroundColor: '#F5F7FA', // Light blue-gray
    padding: 15,
    borderRadius: 4,
    border: 1,
    borderColor: '#E1E8F0',
    marginBottom: 20,
  },

  // Corporate Analysis Methodology
  methodologySection: {
    backgroundColor: '#FAFBFC', // Subtle off-white
    padding: 18,
    borderRadius: 4,
    border: 1,
    borderColor: '#E1E8F0',
    marginTop: 20,
  },

  methodologyTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#354E56', // Pacific blue
    marginBottom: 12,
  },

  methodologyText: {
    fontSize: 10,
    color: '#0F2143', // Cerulean blue
    lineHeight: 1.5,
    marginBottom: 8,
  },

  methodologyLabel: {
    fontWeight: 'bold',
    color: '#354E56', // Pacific blue
  },

  // Corporate Page Break Styles
  pageBreak: {
    pageBreakBefore: 'always',
  },

  // Corporate Secondary Page Header
  secondaryPageHeader: {
    marginBottom: 30,
    borderBottom: 2,
    borderBottomColor: '#354E56', // Pacific blue
    paddingBottom: 15,
    position: 'relative',
  },

  secondaryPageHeaderAccent: {
    position: 'absolute',
    bottom: -2,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#8B6212', // Yarrow gold
  },

  secondaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#354E56', // Pacific blue
    marginBottom: 6,
  },

  secondarySubtitle: {
    fontSize: 14,
    color: '#5A6B73', // Light pacific blue
    fontWeight: 500,
  },
})

// Main Corporate PDF Document Component
const BusinessCasePDF = ({ reportData, refinedData }) => {
  const currentReport = refinedData || reportData
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Document>
      <Page size='A4' style={styles.page}>
        {/* Corporate Confidence Badge */}
        <View style={styles.confidenceBadge}>
          <Text>
            {currentReport?.automation_analysis_details?.confidence_score ||
              '97%'}{' '}
            Confidence
          </Text>
        </View>

        {/* Corporate Header Section */}
        <View style={styles.header}>
          <View style={styles.corporateHeaderAccent} />
          <Text style={styles.title}>AI Automation Business Case</Text>
          <Text style={styles.subtitle}>
            {currentReport?.automation_analysis_details?.scenario_analyzed ||
              'Process Automation Analysis'}
          </Text>
          <Text style={styles.projectInfo}>
            Project ID: {currentReport?.project_id} | Generated: {currentDate} |
            Target Audience:{' '}
            {currentReport?.automation_analysis_details?.target_audience}
          </Text>
        </View>

        {/* Corporate Executive Summary */}
        <View style={styles.section}>
          <View style={styles.sectionTitle}>
            <Text>Executive Summary</Text>
            <View style={styles.sectionTitleAccent} />
          </View>
          <View style={styles.executiveSummary}>
            <View style={styles.executiveSummaryAccent} />
            <Text style={styles.executiveText}>
              {currentReport?.deliverables?.executive_summary ||
                'Executive summary will be generated based on your automation analysis.'}
            </Text>
          </View>
        </View>

        {/* Corporate Financial Impact Overview */}
        <View style={styles.section}>
          <View style={styles.sectionTitle}>
            <Text>Financial Impact Overview</Text>
            <View style={styles.sectionTitleAccent} />
          </View>
          <View style={styles.roiContainer}>
            <View style={styles.roiContainerAccent} />
            <View style={styles.roiBox}>
              <Text style={styles.roiValue}>
                {currentReport?.deliverables?.estimated_roi || 'N/A'}
              </Text>
              <Text style={styles.roiLabel}>Expected ROI</Text>
            </View>
            <View style={styles.roiBox}>
              <Text style={styles.roiValue}>
                {currentReport?.deliverables?.payback_period || 'N/A'}
              </Text>
              <Text style={styles.roiLabel}>Payback Period</Text>
            </View>
            <View style={styles.roiBox}>
              <Text style={styles.roiValue}>
                {currentReport?.automation_analysis_details?.confidence_score ||
                  '97%'}
              </Text>
              <Text style={styles.roiLabel}>Analysis Confidence</Text>
            </View>
          </View>
        </View>

        {/* Corporate Key Automation Opportunities */}
        {currentReport?.deliverables?.automation_opportunities && (
          <View style={styles.section}>
            <View style={styles.sectionTitle}>
              <Text>Key Automation Opportunities Identified</Text>
              <View style={styles.sectionTitleAccent} />
            </View>
            <View style={styles.opportunitiesSection}>
              <View style={styles.listContainer}>
                {currentReport.deliverables.automation_opportunities.map(
                  (opportunity, index) => (
                    <View key={index} style={styles.listItem}>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={styles.listText}>{opportunity}</Text>
                    </View>
                  ),
                )}
              </View>
            </View>
          </View>
        )}

        {/* Corporate Strategic Recommendations */}
        {currentReport?.deliverables?.strategic_recommendations && (
          <View style={styles.section}>
            <View style={styles.sectionTitle}>
              <Text>Strategic Recommendations</Text>
              <View style={styles.sectionTitleAccent} />
            </View>
            <View style={styles.recommendationsSection}>
              <View style={styles.listContainer}>
                {currentReport.deliverables.strategic_recommendations.map(
                  (recommendation, index) => (
                    <View key={index} style={styles.listItem}>
                      <Text style={styles.bullet}>{index + 1}.</Text>
                      <Text style={styles.listText}>{recommendation}</Text>
                    </View>
                  ),
                )}
              </View>
            </View>
          </View>
        )}
      </Page>

      {/* Corporate Second Page - Implementation Details */}
      <Page size='A4' style={[styles.page, styles.pageBreak]}>
        <View style={styles.secondaryPageHeader}>
          <View style={styles.secondaryPageHeaderAccent} />
          <Text style={styles.secondaryTitle}>
            Implementation Roadmap & Success Metrics
          </Text>
          <Text style={styles.secondarySubtitle}>
            Detailed execution plan and measurement framework
          </Text>
        </View>

        {/* Corporate Implementation Roadmap */}
        {currentReport?.deliverables?.implementation_roadmap && (
          <View style={styles.section}>
            <View style={styles.sectionTitle}>
              <Text>Phase-by-Phase Implementation Roadmap</Text>
              <View style={styles.sectionTitleAccent} />
            </View>

            {/* Corporate Phase 1 */}
            {currentReport.deliverables.implementation_roadmap.phase_1 && (
              <View style={styles.phaseContainer}>
                <View style={styles.phaseContainerAccent} />
                <Text style={styles.phaseTitle}>
                  {
                    currentReport.deliverables.implementation_roadmap.phase_1
                      .title
                  }
                </Text>
                {currentReport.deliverables.implementation_roadmap.phase_1.actions?.map(
                  (action, index) => (
                    <Text key={index} style={styles.phaseAction}>
                      • {action}
                    </Text>
                  ),
                )}
                <Text style={styles.phaseImpact}>
                  Expected Impact:{' '}
                  {
                    currentReport.deliverables.implementation_roadmap.phase_1
                      .expected_impact
                  }
                </Text>
              </View>
            )}

            {/* Corporate Phase 2 */}
            {currentReport.deliverables.implementation_roadmap.phase_2 && (
              <View style={styles.phaseContainer}>
                <View style={styles.phaseContainerAccent} />
                <Text style={styles.phaseTitle}>
                  {
                    currentReport.deliverables.implementation_roadmap.phase_2
                      .title
                  }
                </Text>
                {currentReport.deliverables.implementation_roadmap.phase_2.actions?.map(
                  (action, index) => (
                    <Text key={index} style={styles.phaseAction}>
                      • {action}
                    </Text>
                  ),
                )}
                <Text style={styles.phaseImpact}>
                  Expected Impact:{' '}
                  {
                    currentReport.deliverables.implementation_roadmap.phase_2
                      .expected_impact
                  }
                </Text>
              </View>
            )}

            {/* Corporate Phase 3 */}
            {currentReport.deliverables.implementation_roadmap.phase_3 && (
              <View style={styles.phaseContainer}>
                <View style={styles.phaseContainerAccent} />
                <Text style={styles.phaseTitle}>
                  {
                    currentReport.deliverables.implementation_roadmap.phase_3
                      .title
                  }
                </Text>
                {currentReport.deliverables.implementation_roadmap.phase_3.actions?.map(
                  (action, index) => (
                    <Text key={index} style={styles.phaseAction}>
                      • {action}
                    </Text>
                  ),
                )}
                <Text style={styles.phaseImpact}>
                  Expected Impact:{' '}
                  {
                    currentReport.deliverables.implementation_roadmap.phase_3
                      .expected_impact
                  }
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Corporate Success Metrics Framework */}
        {currentReport?.deliverables?.success_metrics && (
          <View style={styles.section}>
            <View style={styles.sectionTitle}>
              <Text>Success Metrics & KPI Framework</Text>
              <View style={styles.sectionTitleAccent} />
            </View>
            <View style={styles.metricsTable}>
              <View style={styles.metricsHeader}>
                <Text style={[styles.metricColumn1, styles.metricsHeaderText]}>
                  Success Metric
                </Text>
                <Text style={[styles.metricColumn2, styles.metricsHeaderText]}>
                  Target Achievement
                </Text>
                <Text style={[styles.metricColumn3, styles.metricsHeaderText]}>
                  Timeline
                </Text>
              </View>
              {currentReport.deliverables.success_metrics.map(
                (metric, index) => (
                  <View key={index} style={styles.metricsRow}>
                    <Text style={styles.metricColumn1}>{metric.metric}</Text>
                    <Text style={styles.metricColumn2}>{metric.target}</Text>
                    <Text style={styles.metricColumn3}>{metric.timeframe}</Text>
                  </View>
                ),
              )}
            </View>
          </View>
        )}

        {/* Corporate Risk Assessment */}
        {currentReport?.deliverables?.risk_assessment && (
          <View style={styles.section}>
            <View style={styles.sectionTitle}>
              <Text>Risk Assessment & Mitigation</Text>
              <View style={styles.sectionTitleAccent} />
            </View>
            <View style={styles.riskAssessment}>
              <View style={styles.riskAssessmentAccent} />
              <Text style={styles.riskText}>
                {currentReport.deliverables.risk_assessment}
              </Text>
            </View>
          </View>
        )}

        {/* Corporate Analysis Methodology */}
        <View style={styles.section}>
          <View style={styles.sectionTitle}>
            <Text>Analysis Methodology</Text>
            <View style={styles.sectionTitleAccent} />
          </View>
          <View style={styles.methodologySection}>
            <Text style={styles.methodologyTitle}>
              AI-Driven Automation Analysis
            </Text>

            <Text style={styles.methodologyText}>
              <Text style={styles.methodologyLabel}>Data Sources: </Text>
              {currentReport?.automation_analysis_details?.data_sources_used?.join(
                ', ',
              ) || 'Process analysis and industry benchmarks'}
            </Text>

            <Text style={styles.methodologyText}>
              <Text style={styles.methodologyLabel}>Methodology: </Text>
              {currentReport?.automation_analysis_details?.methodology ||
                'AI-driven analysis using industry automation standards and proven ROI calculation models'}
            </Text>

            <Text style={styles.methodologyText}>
              <Text style={styles.methodologyLabel}>Primary Goal: </Text>
              {currentReport?.automation_analysis_details?.primary_goal ||
                'Automation ROI and business case development'}
            </Text>
          </View>
        </View>

        {/* Corporate Footer */}
        <View style={styles.footer}>
          <Text>
            Generated by AI Automation Business Case Builder | Confidence Score:{' '}
            {currentReport?.automation_analysis_details?.confidence_score ||
              '97%'}{' '}
            | Analysis Date: {currentDate}
          </Text>
        </View>
      </Page>
    </Document>
  )
}

// Corporate Download Button Component
const PDFDownloadButton = ({
  reportData,
  refinedData,
  className = '',
  children,
}) => {
  const reportToUse = refinedData || reportData
  const fileName = `AI_Automation_Business_Case_${
    reportToUse?.project_id || 'Report'
  }.pdf`

  if (!reportToUse) {
    return (
      <button disabled className={`${className} disabled`}>
        {children || '📥 Download Business Case (No Data)'}
      </button>
    )
  }

  return (
    <PDFDownloadLink
      document={
        <BusinessCasePDF reportData={reportData} refinedData={refinedData} />
      }
      fileName={fileName}
      className={className}
    >
      {({ blob, url, loading, error }) => {
        if (loading) return 'Generating Corporate PDF...'
        if (error) return 'Error generating PDF'
        return children || '📥 Download Professional Business Case (PDF)'
      }}
    </PDFDownloadLink>
  )
}

// Export Corporate Components
export { BusinessCasePDF, PDFDownloadButton }
export default PDFDownloadButton
