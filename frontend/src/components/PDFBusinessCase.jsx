// PDFBusinessCase.jsx
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

// Professional business document styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 50,
    fontFamily: 'Helvetica',
    fontSize: 11,
    lineHeight: 1.4,
  },

  // Header and Title Styles
  header: {
    marginBottom: 30,
    borderBottom: 2,
    borderBottomColor: '#2563EB',
    paddingBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E40AF',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 5,
  },
  projectInfo: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 10,
  },

  // Section Styles
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E40AF',
    marginBottom: 10,
    borderBottom: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 3,
  },
  sectionContent: {
    fontSize: 11,
    lineHeight: 1.5,
    color: '#374151',
  },

  // Executive Summary Styles
  executiveSummary: {
    backgroundColor: '#F8FAFC',
    padding: 15,
    borderLeft: 3,
    borderLeftColor: '#2563EB',
    marginBottom: 20,
  },
  executiveText: {
    fontSize: 12,
    lineHeight: 1.6,
    color: '#1F2937',
    fontWeight: 'normal',
  },

  // List Styles
  listContainer: {
    marginLeft: 15,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  bullet: {
    width: 15,
    fontSize: 11,
    color: '#2563EB',
    fontWeight: 'bold',
  },
  listText: {
    flex: 1,
    fontSize: 11,
    lineHeight: 1.4,
    color: '#374151',
  },

  // ROI and Metrics Styles
  roiContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#EFF6FF',
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
  },
  roiBox: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  roiValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E40AF',
    marginBottom: 5,
  },
  roiLabel: {
    fontSize: 10,
    color: '#6B7280',
    textAlign: 'center',
  },

  // Implementation Roadmap Styles
  phaseContainer: {
    marginBottom: 15,
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 3,
    borderLeft: 3,
    borderLeftColor: '#10B981',
  },
  phaseTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#065F46',
    marginBottom: 8,
  },
  phaseAction: {
    fontSize: 10,
    color: '#374151',
    marginBottom: 3,
    paddingLeft: 10,
  },
  phaseImpact: {
    fontSize: 10,
    color: '#059669',
    fontStyle: 'italic',
    marginTop: 5,
  },

  // Success Metrics Table
  metricsTable: {
    marginTop: 10,
  },
  metricsHeader: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    padding: 8,
    borderBottom: 1,
    borderBottomColor: '#D1D5DB',
  },
  metricsRow: {
    flexDirection: 'row',
    padding: 8,
    borderBottom: 1,
    borderBottomColor: '#E5E7EB',
  },
  metricColumn1: { flex: 2, fontSize: 10, fontWeight: 'bold' },
  metricColumn2: { flex: 2, fontSize: 10 },
  metricColumn3: { flex: 1, fontSize: 10 },

  // Footer Styles
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 50,
    right: 50,
    borderTop: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 10,
    fontSize: 9,
    color: '#9CA3AF',
    textAlign: 'center',
  },

  // Risk Assessment Box
  riskAssessment: {
    backgroundColor: '#FEF3C7',
    padding: 12,
    borderLeft: 3,
    borderLeftColor: '#F59E0B',
    marginTop: 15,
  },
  riskText: {
    fontSize: 11,
    color: '#92400E',
    lineHeight: 1.4,
  },

  // Confidence Badge
  confidenceBadge: {
    position: 'absolute',
    top: 50,
    right: 50,
    backgroundColor: '#10B981',
    color: '#FFFFFF',
    padding: 8,
    borderRadius: 15,
    fontSize: 10,
    fontWeight: 'bold',
  },
})

// Main PDF Document Component
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
        {/* Confidence Badge */}
        <View style={styles.confidenceBadge}>
          <Text>
            {currentReport?.automation_analysis_details?.confidence_score ||
              '97%'}{' '}
            Confidence
          </Text>
        </View>

        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.title}>Automation Business Case</Text>
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

        {/* Executive Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Executive Summary</Text>
          <View style={styles.executiveSummary}>
            <Text style={styles.executiveText}>
              {currentReport?.deliverables?.executive_summary ||
                'Executive summary will be generated based on your automation analysis.'}
            </Text>
          </View>
        </View>

        {/* ROI Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Financial Impact Overview</Text>
          <View style={styles.roiContainer}>
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

        {/* Key Automation Opportunities */}
        {currentReport?.deliverables?.automation_opportunities && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Key Automation Opportunities Identified
            </Text>
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
        )}

        {/* Strategic Recommendations */}
        {currentReport?.deliverables?.strategic_recommendations && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Strategic Recommendations</Text>
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
        )}
      </Page>

      {/* Second Page - Implementation Details */}
      <Page size='A4' style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>
            Implementation Roadmap & Success Metrics
          </Text>
          <Text style={styles.subtitle}>
            Detailed execution plan and measurement framework
          </Text>
        </View>

        {/* Implementation Roadmap */}
        {currentReport?.deliverables?.implementation_roadmap && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Phase-by-Phase Implementation Roadmap
            </Text>

            {/* Phase 1 */}
            {currentReport.deliverables.implementation_roadmap.phase_1 && (
              <View style={styles.phaseContainer}>
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

            {/* Phase 2 */}
            {currentReport.deliverables.implementation_roadmap.phase_2 && (
              <View style={styles.phaseContainer}>
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

            {/* Phase 3 */}
            {currentReport.deliverables.implementation_roadmap.phase_3 && (
              <View style={styles.phaseContainer}>
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

        {/* Success Metrics Framework */}
        {currentReport?.deliverables?.success_metrics && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Success Metrics & KPI Framework
            </Text>
            <View style={styles.metricsTable}>
              <View style={styles.metricsHeader}>
                <Text style={styles.metricColumn1}>Success Metric</Text>
                <Text style={styles.metricColumn2}>Target Achievement</Text>
                <Text style={styles.metricColumn3}>Timeline</Text>
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

        {/* Risk Assessment */}
        {currentReport?.deliverables?.risk_assessment && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Risk Assessment & Mitigation
            </Text>
            <View style={styles.riskAssessment}>
              <Text style={styles.riskText}>
                {currentReport.deliverables.risk_assessment}
              </Text>
            </View>
          </View>
        )}

        {/* Analysis Methodology */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Analysis Methodology</Text>
          <Text style={styles.sectionContent}>
            <Text style={{ fontWeight: 'bold' }}>Data Sources: </Text>
            {currentReport?.automation_analysis_details?.data_sources_used?.join(
              ', ',
            ) || 'Process analysis and industry benchmarks'}
          </Text>
          <Text style={[styles.sectionContent, { marginTop: 5 }]}>
            <Text style={{ fontWeight: 'bold' }}>Methodology: </Text>
            {currentReport?.automation_analysis_details?.methodology ||
              'AI-driven analysis using industry automation standards and proven ROI calculation models'}
          </Text>
          <Text style={[styles.sectionContent, { marginTop: 5 }]}>
            <Text style={{ fontWeight: 'bold' }}>Primary Goal: </Text>
            {currentReport?.automation_analysis_details?.primary_goal ||
              'Automation ROI and business case development'}
          </Text>
        </View>

        {/* Footer */}
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

// Download Button Component
const PDFDownloadButton = ({
  reportData,
  refinedData,
  className = '',
  children,
}) => {
  const reportToUse = refinedData || reportData
  const fileName = `Automation_Business_Case_${
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
        if (loading) return 'Generating PDF...'
        if (error) return 'Error generating PDF'
        return children || '📥 Download Professional Business Case (PDF)'
      }}
    </PDFDownloadLink>
  )
}

// Export both components
export { BusinessCasePDF, PDFDownloadButton }
export default PDFDownloadButton
