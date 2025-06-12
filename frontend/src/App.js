// 🚀 FIXED VERSION - Option A Implementation

import React, { useState, useEffect, useCallback } from 'react'
import BuildAStoryInterface from './BuildAStoryInterface'

// Simple ID generator for characters
const generateId = () => {
  return 'char_' + Math.random().toString(36).substr(2, 9)
}

// Mock data for testing UI
const mockBooks = [
  {
    title: "Alice's Adventures in Wonderland",
    author: 'Lewis Carroll',
    genre: "Fantasy/Children's Literature",
    theme: 'Curiosity and adventure',
    era: 'Victorian',
    description: 'A young girl falls down a rabbit hole into a fantasy world.',
  },
  {
    title: 'The Secret Garden',
    author: 'Frances Hodgson Burnett',
    genre: "Children's Literature",
    theme: 'Transformation and healing',
    era: 'Edwardian',
    description:
      'A spoiled girl discovers a hidden garden and learns about friendship.',
  },
  {
    title: 'Treasure Island',
    author: 'Robert Louis Stevenson',
    genre: 'Adventure',
    theme: 'Coming of age through adventure',
    era: 'Georgian',
    description: 'A young boy goes on a treasure hunt with pirates.',
  },
]

const mockStoryOptions = {
  settings: [
    'Space Station',
    'Modern City',
    'Underwater World',
    'Fantasy Realm',
    'Steampunk World',
  ],
  time_periods: [
    'Present Day',
    'Near Future',
    'Far Future',
    'Ancient Times',
    'Medieval Era',
  ],
  themes: [
    'Courage and bravery',
    'Friendship and loyalty',
    'Curiosity and exploration',
    'Kindness and empathy',
  ],
}

const mockGeneratedStory = {
  content_metrics: {
    story_content: {
      narrative_text: `Alex floated through the corridor of the space station, their magnetic boots clicking softly against the metal floor. Through the massive viewport, Earth hung like a blue marble against the star-filled darkness. The AI companion, ARIA, projected a holographic form beside them.

"The old stories spoke of curious young people who fell down rabbit holes," ARIA said, her digital voice warm with synthetic emotion. "But you, Alex, are about to fall up into something far more wondrous."

Alex pressed their face against the cool glass, watching the aurora dance across Earth's atmosphere. "What do you mean, ARIA? The mission briefing said we were just collecting samples from the asteroid field."

ARIA's holographic eyes sparkled with what could only be described as mischief. "Every great adventure begins with curiosity, Alex. And I have a feeling your curiosity is about to lead us somewhere the mission planners never imagined."

The space station shuddered gently as it adjusted course, and Alex felt that familiar flutter of excitement mixed with nervousness. Just like Alice before her tumble into Wonderland, Alex was standing at the edge of the unknown, ready to discover what wonders awaited among the stars.`,
      word_count: 178,
      reading_level: '7th Grade',
    },
  },
  project_id: 'STY-20250612-demo123',
}

function App() {
  // State management - FIXED with Option A structure
  const [books, setBooks] = useState([])
  const [storyOptions, setStoryOptions] = useState({})
  const [currentStep, setCurrentStep] = useState(0)
  const [storyData, setStoryData] = useState({
    book_title: '',
    setting: '',
    characters: '', // Backend format (will be generated from charactersList)
    // FIXED: Use charactersList array instead of individual fields
    charactersList: [
      {
        id: generateId(),
        name: '',
        description: '',
      },
    ],
    time_period: '',
    theme: '',
    tone: '',
    genre: '',
    special_elements: '', // Backend format (will be generated from specialElementsList)
    specialElementsList: [], // Array of selected special elements
    enable_ai_education_mode: true,
  })
  const [generatedStory, setGeneratedStory] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // AI Education state
  const [aiEducationMode, setAiEducationMode] = useState(true)
  const [agentWorkflow, setAgentWorkflow] = useState([])
  const [currentAgent, setCurrentAgent] = useState(null)
  const [aiCollaborationInsights, setAiCollaborationInsights] = useState(null)
  const [showProcessLearning, setShowProcessLearning] = useState(false)
  const [projectId, setProjectId] = useState(null)

  // Load mock data immediately (simulating API call)
  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      setBooks(mockBooks)
      setStoryOptions(mockStoryOptions)
    }, 1000)
  }, [])

  // FIXED: Helper function to prepare backend format
  const prepareBackendData = storyData => {
    // Convert charactersList to backend format
    const characters = storyData.charactersList
      .filter(char => char.name.trim() !== '')
      .map(char => `${char.name.trim()}: ${char.description?.trim() || ''}`)
      .join('; ')

    // Convert specialElementsList to backend format
    const special_elements = storyData.specialElementsList.join(', ')

    return {
      ...storyData,
      characters,
      special_elements,
    }
  }

  // FIXED: Mock API call to create story - wrapped in useCallback
  const createStory = useCallback(async () => {
    setLoading(true)
    setError(null)
    setAgentWorkflow([])
    setCurrentAgent(null)

    // Simulate AI agents working one by one
    const agents = [
      'enterprise_intake_coordinator',
      'literature_research_intelligence',
      'compliance_standards_validator',
      'enterprise_content_creator',
      'educational_materials_engineer',
      'enterprise_quality_assurance',
    ]

    // Simulate agents working over time
    for (let i = 0; i < agents.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1500)) // 1.5 sec per agent
      setCurrentAgent(agents[i])
      setAgentWorkflow(prev => [...prev, agents[i]])
    }

    // Simulate final result
    await new Promise(resolve => setTimeout(resolve, 1000))

    setGeneratedStory(mockGeneratedStory)
    setProjectId(mockGeneratedStory.project_id)

    // Set mock AI insights
    setAiCollaborationInsights({
      ai_literacy_lessons: [
        'AI specialists work in teams with different expertise areas',
        'Each AI agent has specific capabilities and limitations',
        'Human creativity guides the entire AI collaboration process',
      ],
      critical_thinking_points: [
        'How did each AI agent contribute something unique?',
        "What aspects required human creativity that AI couldn't provide?",
        'How did the AI team balance your vision with story structure?',
      ],
    })

    setCurrentStep(3)
    setLoading(false)
    setCurrentAgent(null)
  }, [
    setLoading,
    setError,
    setAgentWorkflow,
    setCurrentAgent,
    setGeneratedStory,
    setProjectId,
    setAiCollaborationInsights,
    setCurrentStep,
  ])

  // FIXED: Mock regenerate story - wrapped in useCallback
  const regenerateStory = useCallback(async () => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 3000))

    // Create slight variation in mock story
    const newStory = {
      ...mockGeneratedStory,
      content_metrics: {
        story_content: {
          ...mockGeneratedStory.content_metrics.story_content,
          narrative_text:
            mockGeneratedStory.content_metrics.story_content.narrative_text.replace(
              'Alex floated through',
              'Alex drifted through',
            ),
        },
      },
    }

    setGeneratedStory(newStory)
    setLoading(false)
  }, [setLoading, setGeneratedStory])

  // FIXED: Reset everything - wrapped in useCallback
  const resetApp = useCallback(() => {
    setStoryData({
      book_title: '',
      setting: '',
      characters: '',
      // FIXED: Reset with proper array structure
      charactersList: [
        {
          id: generateId(),
          name: '',
          description: '',
        },
      ],
      time_period: '',
      theme: '',
      tone: '',
      genre: '',
      special_elements: '',
      specialElementsList: [],
      enable_ai_education_mode: aiEducationMode,
    })
    setGeneratedStory(null)
    setCurrentStep(0)
    setError(null)
    setAgentWorkflow([])
    setCurrentAgent(null)
    setAiCollaborationInsights(null)
    setProjectId(null)
  }, [
    aiEducationMode,
    setStoryData,
    setGeneratedStory,
    setCurrentStep,
    setError,
    setAgentWorkflow,
    setCurrentAgent,
    setAiCollaborationInsights,
    setProjectId,
  ])

  // FIXED: Step validation logic - wrapped in useCallback
  const isStepComplete = useCallback(
    step => {
      switch (step) {
        case 0:
          return storyData.book_title !== ''
        case 1:
          return (
            storyData.setting !== '' &&
            storyData.charactersList.some(char => char.name.trim() !== '')
          )
        case 2:
          return isStepComplete(0) && isStepComplete(1)
        case 3:
          return generatedStory !== null
        default:
          return false
      }
    },
    [
      storyData.book_title,
      storyData.setting,
      storyData.charactersList,
      generatedStory,
    ],
  )

  // FIXED: Smart navigation - wrapped in useCallback
  const handleStepNavigation = useCallback(
    stepIndex => {
      if (stepIndex <= 0 || isStepComplete(stepIndex - 1)) {
        setCurrentStep(stepIndex)
      }
    },
    [isStepComplete, setCurrentStep],
  )

  // FIXED: Toggle AI education mode - wrapped in useCallback
  const toggleAiEducationMode = useCallback(() => {
    setAiEducationMode(!aiEducationMode)
    setStoryData(prev => ({
      ...prev,
      enable_ai_education_mode: !aiEducationMode,
    }))
  }, [aiEducationMode, setAiEducationMode, setStoryData])

  // FIXED: Mock fetch AI insights - wrapped in useCallback
  const fetchAiInsights = useCallback(async projectId => {
    console.log('Mock: Fetching AI insights for project', projectId)
  }, [])

  // Error boundary for initial data loading failures
  if (error && books.length === 0) {
    return (
      <div className='error-app-container'>
        <div className='error-card'>
          <h2 className='error-title'>⚠️ Error Loading App</h2>
          <p className='error-message'>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className='error-retry-btn'
          >
            🔄 Try Again
          </button>
        </div>
      </div>
    )
  }

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
      // AI Education state
      aiEducationMode={aiEducationMode}
      agentWorkflow={agentWorkflow}
      currentAgent={currentAgent}
      aiCollaborationInsights={aiCollaborationInsights}
      showProcessLearning={showProcessLearning}
      projectId={projectId}
      // State setters
      setCurrentStep={handleStepNavigation}
      setStoryData={setStoryData}
      setError={setError}
      // AI Education setters
      setAiEducationMode={toggleAiEducationMode}
      setShowProcessLearning={setShowProcessLearning}
      // API actions (mocked)
      createStory={createStory}
      regenerateStory={regenerateStory}
      resetApp={resetApp}
      fetchAiInsights={fetchAiInsights}
      // Validation helpers
      isStepComplete={isStepComplete}
    />
  )
}

export default App
