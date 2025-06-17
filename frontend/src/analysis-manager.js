// analysisManager.js - Global singleton to prevent any multiple requests
class AnalysisManager {
  constructor() {
    this.isAnalysisActive = false
    this.activeSessionId = null
    this.requestInProgress = false

    // Persist state across component remounts
    this.loadState()

    // Listen for storage changes (multiple tabs)
    window.addEventListener('storage', this.handleStorageChange.bind(this))
  }

  loadState() {
    try {
      const saved = sessionStorage.getItem('automation_analysis_state')
      if (saved) {
        const state = JSON.parse(saved)
        this.isAnalysisActive = state.isAnalysisActive || false
        this.activeSessionId = state.activeSessionId || null
        this.requestInProgress = state.requestInProgress || false

        console.log('📱 Loaded analysis state:', state)
      }
    } catch (error) {
      console.log('No saved analysis state found')
    }
  }

  saveState() {
    const state = {
      isAnalysisActive: this.isAnalysisActive,
      activeSessionId: this.activeSessionId,
      requestInProgress: this.requestInProgress,
      timestamp: Date.now(),
    }

    sessionStorage.setItem('automation_analysis_state', JSON.stringify(state))
  }

  handleStorageChange(event) {
    if (event.key === 'automation_analysis_state') {
      this.loadState()
    }
  }

  canStartAnalysis() {
    // Check if any analysis is active globally
    if (this.isAnalysisActive || this.requestInProgress) {
      console.log('🛑 GLOBAL GUARD: Analysis already active', {
        isAnalysisActive: this.isAnalysisActive,
        requestInProgress: this.requestInProgress,
        activeSessionId: this.activeSessionId,
      })
      return false
    }

    return true
  }

  startAnalysis(sessionId) {
    if (!this.canStartAnalysis()) {
      throw new Error('Analysis already in progress')
    }

    console.log('🚀 GLOBAL: Starting analysis', sessionId)
    this.isAnalysisActive = true
    this.requestInProgress = true
    this.activeSessionId = sessionId
    this.saveState()
  }

  completeAnalysis() {
    console.log('✅ GLOBAL: Analysis complete')
    this.isAnalysisActive = false
    this.requestInProgress = false
    this.saveState()
  }

  errorAnalysis() {
    console.log('❌ GLOBAL: Analysis error, resetting')
    this.isAnalysisActive = false
    this.requestInProgress = false
    this.activeSessionId = null
    this.saveState()
  }

  resetAnalysis() {
    console.log('🔄 GLOBAL: Manual reset')
    this.isAnalysisActive = false
    this.requestInProgress = false
    this.activeSessionId = null
    sessionStorage.removeItem('automation_analysis_state')
  }

  getStatus() {
    return {
      isAnalysisActive: this.isAnalysisActive,
      requestInProgress: this.requestInProgress,
      activeSessionId: this.activeSessionId,
    }
  }
}

// Global singleton instance
const analysisManager = new AnalysisManager()

export default analysisManager
