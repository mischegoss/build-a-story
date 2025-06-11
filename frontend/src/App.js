import React, { useState, useEffect } from 'react'
import axios from 'axios'
import BuildAStoryInterface from './BuildAStoryInterface'

const API_BASE =
  process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8000'

function App() {
  // State management - all the data your app needs
  const [books, setBooks] = useState([])
  const [storyOptions, setStoryOptions] = useState({})
  const [currentStep, setCurrentStep] = useState(0)
  const [storyData, setStoryData] = useState({
    book_title: '',
    setting: '',
    characters: '',
    time_period: '',
    theme: '',
    tone: '',
    genre: '',
    special_elements: '',
  })
  const [generatedStory, setGeneratedStory] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Load initial data when app starts
  useEffect(() => {
    fetchInitialData()
  }, [])

  // API call to get books and story options
  const fetchInitialData = async () => {
    try {
      const [booksResponse, optionsResponse] = await Promise.all([
        axios.get(`${API_BASE}/api/books`),
        axios.get(`${API_BASE}/api/story-options`),
      ])

      setBooks(booksResponse.data.books)
      setStoryOptions(optionsResponse.data)
    } catch (error) {
      console.error('Error fetching initial data:', error)
      setError('Failed to load app data. Please refresh the page.')
    }
  }

  // API call to create story starter (calls your multi-agent backend)
  const createStory = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await axios.post(
        `${API_BASE}/api/create-story`,
        storyData,
      )
      setGeneratedStory(response.data)
      setCurrentStep(3) // Go to write & learn step
    } catch (error) {
      console.error('Error creating story:', error)
      setError(
        error.response?.data?.detail ||
          'Error creating story. Please check your inputs and try again.',
      )
    } finally {
      setLoading(false)
    }
  }

  // API call to regenerate story with same parameters
  const regenerateStory = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await axios.post(
        `${API_BASE}/api/regenerate-story`,
        storyData,
      )
      setGeneratedStory(response.data)
    } catch (error) {
      console.error('Error regenerating story:', error)
      setError('Error regenerating story. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Reset everything to start over
  const resetApp = () => {
    setStoryData({
      book_title: '',
      setting: '',
      characters: '',
      time_period: '',
      theme: '',
      tone: '',
      genre: '',
      special_elements: '',
    })
    setGeneratedStory(null)
    setCurrentStep(0)
    setError(null)
  }

  // Step validation logic - prevents skipping required steps
  const isStepComplete = step => {
    switch (step) {
      case 0:
        return storyData.book_title !== ''
      case 1:
        return storyData.setting !== '' && storyData.characters !== ''
      case 2:
        return isStepComplete(0) && isStepComplete(1)
      case 3:
        return generatedStory !== null
      default:
        return false
    }
  }

  // Smart navigation - only allow valid step transitions
  const handleStepNavigation = stepIndex => {
    if (stepIndex <= 0 || isStepComplete(stepIndex - 1)) {
      setCurrentStep(stepIndex)
    }
  }

  // Error boundary for initial data loading failures
  if (error && books.length === 0) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center'>
        <div className='bg-white rounded-2xl p-8 shadow-2xl text-center max-w-md'>
          <h2 className='text-2xl font-bold text-red-600 mb-4'>
            ⚠️ Error Loading App
          </h2>
          <p className='text-gray-600 mb-6'>{error}</p>
          <button
            onClick={fetchInitialData}
            className='px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-bold hover:transform hover:-translate-y-1 hover:shadow-lg transition-all'
          >
            🔄 Try Again
          </button>
        </div>
      </div>
    )
  }

  // Main render - pass everything to the beautiful UI component
  return (
    <BuildAStoryInterface
      // Current state
      currentStep={currentStep}
      storyData={storyData}
      books={books}
      storyOptions={storyOptions}
      generatedStory={generatedStory}
      loading={loading}
      error={error}
      // State setters
      setCurrentStep={handleStepNavigation}
      setStoryData={setStoryData}
      setError={setError}
      // API actions
      createStory={createStory}
      regenerateStory={regenerateStory}
      resetApp={resetApp}
      // Validation helpers
      isStepComplete={isStepComplete}
    />
  )
}

export default App
