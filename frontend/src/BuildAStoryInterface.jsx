import React, { useState, useEffect, useCallback, useMemo } from 'react'
import './BuildAStory.css' // Import your CSS styles

const BuildAStoryInterface = ({
  currentStep,
  storyData,
  books,
  storyOptions,
  generatedStory,
  loading,
  error,
  setCurrentStep,
  setStoryData,
  createStory,
  regenerateStory,
  resetApp,
  setError,
  isStepComplete,
}) => {
  const [studentWriting, setStudentWriting] = useState('')
  const [wordCount, setWordCount] = useState(0)
  const [agentStatuses, setAgentStatuses] = useState([
    {
      name: 'Project Manager',
      avatar: '📋',
      status: 'waiting',
      message: 'Ready to help you create an amazing story adventure!',
    },
    {
      name: 'Book Expert',
      avatar: '📚',
      status: 'waiting',
      message: 'Standing by to analyze your chosen classic story!',
    },
    {
      name: 'Learning Coach',
      avatar: '🎓',
      status: 'waiting',
      message: 'Excited to make sure your story is fun AND educational!',
    },
    {
      name: 'Story Writer',
      avatar: '✍️',
      status: 'waiting',
      message: "Can't wait to create an epic story starter just for you!",
    },
    {
      name: 'Quality Checker',
      avatar: '🔍',
      status: 'waiting',
      message: 'Ready to make sure your story is absolutely awesome!',
    },
    {
      name: 'Package Creator',
      avatar: '📄',
      status: 'waiting',
      message: 'Standing by to create amazing downloads for you!',
    },
  ])

  const steps = [
    {
      icon: '📖',
      title: 'Choose Story',
      desc: storyData.book_title
        ? storyData.book_title.split(' by ')[0]
        : 'Pick your favorite',
    },
    {
      icon: '🎨',
      title: 'Customize',
      desc: storyData.setting ? 'Ready to customize!' : 'Make it yours',
    },
    {
      icon: '🤖',
      title: 'AI Starter',
      desc: generatedStory ? 'Story created!' : 'Expert beginning',
    },
    { icon: '✍️', title: 'Write & Learn', desc: 'Your creativity' },
  ]

  // Update agent statuses based on current step and story progress
  useEffect(() => {
    if (currentStep >= 1 && storyData.book_title) {
      setAgentStatuses(prev =>
        prev.map((agent, index) =>
          index === 0
            ? {
                ...agent,
                status: 'complete',
                message:
                  'Awesome! Your story project is officially started - our team is SO excited to help you!',
              }
            : agent,
        ),
      )
    }
    if (currentStep >= 1 && storyData.book_title) {
      setAgentStatuses(prev =>
        prev.map((agent, index) =>
          index === 1
            ? {
                ...agent,
                status: 'complete',
                message:
                  'YES! Your book choice is PERFECT for adaptation - this is going to be amazing!',
              }
            : agent,
        ),
      )
    }
    if (currentStep >= 2 && storyData.setting && storyData.characters) {
      setAgentStatuses(prev =>
        prev.map((agent, index) =>
          index === 2
            ? {
                ...agent,
                status: 'complete',
                message:
                  "Your creative ideas are brilliant! They're fun AND help you learn - exactly what we love to see!",
              }
            : agent,
        ),
      )
    }
    if (generatedStory) {
      setAgentStatuses(prev =>
        prev.map((agent, index) =>
          index === 3
            ? {
                ...agent,
                status: 'complete',
                message:
                  "Your story starter is ready and it's EPIC! This is going to blow your mind! 🚀",
              }
            : agent,
        ),
      )
      setAgentStatuses(prev =>
        prev.map((agent, index) =>
          index === 4
            ? {
                ...agent,
                status: 'complete',
                message:
                  "This story rocks! It's exciting, educational, and totally awesome - you're going to love it!",
              }
            : agent,
        ),
      )
    }
  }, [
    storyData.book_title,
    storyData.setting,
    storyData.characters,
    generatedStory,
  ]) // Only include specific values that matter

  useEffect(() => {
    const words = studentWriting
      .trim()
      .split(/\s+/)
      .filter(word => word.length > 0)
    setWordCount(words.length)
  }, [studentWriting])

  const selectedBookData = books.find(book =>
    storyData.book_title.includes(book.title),
  )

  // Optimize textarea handlers to prevent performance issues
  const handleCharactersChange = useCallback(
    e => {
      setStoryData(prev => ({ ...prev, characters: e.target.value }))
    },
    [setStoryData],
  )

  const handleSpecialElementsChange = useCallback(
    e => {
      setStoryData(prev => ({ ...prev, special_elements: e.target.value }))
    },
    [setStoryData],
  )

  const handleStudentWritingChange = useCallback(e => {
    setStudentWriting(e.target.value)
  }, [])

  const handleDownload = downloadType => {
    // Fixed: Removed unused completeStory variable
    alert(
      `📥 Downloading ${downloadType}...\n\nThis would generate a PDF containing:\n• Complete story (AI starter + your writing)\n• Educational analysis and insights\n• ${
        downloadType.includes('Teacher')
          ? 'Assessment rubric and standards alignment'
          : 'Reflection questions and portfolio format'
      }`,
    )
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <StepChooseStory />
      case 1:
        return <StepCustomize />
      case 2:
        return <StepCreateStarter />
      case 3:
        return <StepWriteAndLearn />
      default:
        return <StepChooseStory />
    }
  }

  // Step 0: Choose Story
  const StepChooseStory = () => (
    <div className='content-card'>
      <h2 className='text-3xl font-bold mb-3 text-center'>
        📖 Choose Your Classic Story
      </h2>
      <p className='text-gray-600 text-lg mb-8 text-center'>
        Pick a classic book that you'd like to reimagine with your own awesome
        twist!
      </p>

      <div className='form-group mb-8'>
        <label className='block text-lg font-bold mb-4 text-gray-800'>
          📚 Which classic story do you want to transform?
        </label>
        <select
          value={storyData.book_title}
          onChange={e =>
            setStoryData({ ...storyData, book_title: e.target.value })
          }
          className='book-select w-full'
        >
          <option value=''>Choose your adventure...</option>
          {books.map((book, index) => (
            <option key={index} value={`${book.title} by ${book.author}`}>
              📖 {book.title} by {book.author}
            </option>
          ))}
        </select>
      </div>

      {selectedBookData && (
        <div className='book-info-card'>
          <h3 className='book-info-title'>✅ Awesome Choice!</h3>

          <div className='bg-white rounded-xl p-5 mb-4'>
            <h4 className='text-lg font-bold text-gray-800 mb-2'>
              📚 {selectedBookData.title} by {selectedBookData.author}
            </h4>
            <p className='text-gray-700 mb-4 leading-relaxed'>
              {selectedBookData.description ||
                `A classic tale of ${selectedBookData.theme.toLowerCase()} that's perfect for adaptation!`}
            </p>
            <div className='info-box'>
              <p className='text-blue-800 font-semibold'>
                💡 Why this is perfect: Great for sci-fi, modern day, or fantasy
                adaptations!
              </p>
            </div>
          </div>

          <div className='book-details-grid'>
            <div className='book-detail-card'>
              <div className='book-detail-icon'>🎭</div>
              <div className='book-detail-label'>Genre</div>
              <div className='book-detail-value'>{selectedBookData.genre}</div>
            </div>
            <div className='book-detail-card'>
              <div className='book-detail-icon'>💡</div>
              <div className='book-detail-label'>Theme</div>
              <div className='book-detail-value'>{selectedBookData.theme}</div>
            </div>
            <div className='book-detail-card'>
              <div className='book-detail-icon'>⏰</div>
              <div className='book-detail-label'>Original Era</div>
              <div className='book-detail-value'>{selectedBookData.era}</div>
            </div>
          </div>

          <div className='text-center mt-6'>
            <button
              onClick={() => setCurrentStep(1)}
              className='btn-primary btn-large'
            >
              🎨 Let's Customize This Story! →
            </button>
          </div>
        </div>
      )}
    </div>
  )

  // Step 1: Customize
  const StepCustomize = () => (
    <div className='content-card'>
      <h2 className='text-3xl font-bold mb-3 text-center'>
        🎨 Customize Your Story
      </h2>
      <p className='text-gray-600 text-lg mb-8 text-center'>
        Make {storyData.book_title.split(' by ')[0]} your own by changing the
        setting, characters, and more!
      </p>

      <div className='form-grid grid-cols-1 md:grid-cols-2'>
        <div className='space-y-6'>
          <div className='form-group required'>
            <label className='block text-lg font-bold mb-3 text-gray-800'>
              🏞️ Where should your story take place?
            </label>
            <select
              value={storyData.setting}
              onChange={e =>
                setStoryData({ ...storyData, setting: e.target.value })
              }
              className='build-a-story-select w-full'
              required
            >
              <option value=''>Choose setting...</option>
              {(
                storyOptions.settings || [
                  'Space Station',
                  'Modern City',
                  'Underwater World',
                  'Fantasy Realm',
                  'Steampunk World',
                ]
              ).map((setting, index) => (
                <option key={index} value={setting}>
                  {setting}
                </option>
              ))}
            </select>
          </div>

          <div className='form-group'>
            <label className='block text-lg font-bold mb-3 text-gray-800'>
              ⏰ When does your story happen?
            </label>
            <select
              value={storyData.time_period}
              onChange={e =>
                setStoryData({ ...storyData, time_period: e.target.value })
              }
              className='build-a-story-select w-full'
            >
              <option value=''>Choose time period...</option>
              {(
                storyOptions.time_periods || [
                  'Present Day',
                  'Near Future',
                  'Far Future',
                  'Ancient Times',
                  'Medieval Era',
                ]
              ).map((period, index) => (
                <option key={index} value={period}>
                  {period}
                </option>
              ))}
            </select>
          </div>

          <div className='form-group'>
            <label className='block text-lg font-bold mb-3 text-gray-800'>
              💡 What should your story teach?
            </label>
            <select
              value={storyData.theme}
              onChange={e =>
                setStoryData({ ...storyData, theme: e.target.value })
              }
              className='build-a-story-select w-full'
            >
              <option value=''>Choose theme...</option>
              {(
                storyOptions.themes || [
                  'Courage and bravery',
                  'Friendship and loyalty',
                  'Curiosity and exploration',
                  'Kindness and empathy',
                ]
              ).map((theme, index) => (
                <option key={index} value={theme}>
                  {theme}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className='space-y-6'>
          <div className='form-group required'>
            <label className='block text-lg font-bold mb-3 text-gray-800'>
              👥 Who are your main characters?
            </label>
            <textarea
              value={storyData.characters}
              onChange={handleCharactersChange}
              placeholder='Example: A curious astronaut named Alex and their AI robot companion who loves to explore...'
              rows={4}
              className='build-a-story-textarea'
              required
            />
            <div className='character-count'>
              {storyData.characters.length}/500 characters
            </div>
          </div>

          <div className='form-group'>
            <label className='block text-lg font-bold mb-3 text-gray-800'>
              ✨ Any special elements to include?
            </label>
            <textarea
              value={storyData.special_elements}
              onChange={handleSpecialElementsChange}
              placeholder='Example: talking robots, magic powers, time travel, alien creatures...'
              rows={3}
              className='build-a-story-textarea'
            />
          </div>
        </div>
      </div>

      <div className='step-actions'>
        <button onClick={() => setCurrentStep(0)} className='btn-outline'>
          ⬅️ Back to Book Selection
        </button>
        <button
          onClick={() => setCurrentStep(2)}
          disabled={!storyData.setting || !storyData.characters.trim()}
          className={`btn ${
            storyData.setting && storyData.characters.trim()
              ? 'btn-primary'
              : ''
          } btn-large`}
        >
          🤖 Create My Story Starter! →
        </button>
      </div>
    </div>
  )

  // Step 2: Create Starter (Agent Workflow)
  const StepCreateStarter = () => {
    useEffect(() => {
      if (!loading && !generatedStory) {
        createStory()
      }
    }, []) // Removed dependencies that were causing the warning

    return (
      <div className='content-card'>
        <h2 className='text-3xl font-bold mb-3 text-center'>
          🎨 Creating Your Reimagined Story!
        </h2>
        <p className='text-gray-600 text-lg mb-8 text-center'>
          You've done amazing work choosing and customizing your story! Now
          we're bringing your creative vision to life.
        </p>

        {loading && (
          <div className='loading-message'>
            <div className='loading-spinner'></div>
            <p className='text-lg font-semibold text-gray-700'>
              Creating your reimagined story...
            </p>
            <p className='text-gray-600'>
              This usually takes 2-3 minutes. We're making sure it captures your
              vision perfectly!
            </p>
          </div>
        )}

        {generatedStory && !loading && (
          <div>
            <div className='text-center mb-6'>
              <div className='text-6xl mb-4'>🎉</div>
              <h3 className='text-2xl font-bold text-green-600 mb-4'>
                Your Reimagined Story is Ready!
              </h3>
            </div>

            {/* Story Display */}
            <div className='story-starter-section mb-6'>
              <h3 className='story-starter-title'>✨ Your Spin on a Classic</h3>
              <div className='story-starter-content'>
                {generatedStory.story}
              </div>
            </div>

            <div className='text-center'>
              <button
                onClick={() => setCurrentStep(3)}
                className='btn-primary btn-large'
              >
                ✍️ Time to Continue Writing! →
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className='error-container'>
            <div className='text-4xl mb-2'>😅</div>
            <p className='text-red-700 font-semibold mb-4'>
              Oops! Something went wrong.
            </p>
            <p className='text-red-600 mb-4'>{error}</p>
            <button onClick={createStory} className='btn-secondary'>
              🔄 Try Again
            </button>
          </div>
        )}
      </div>
    )
  }

  // Step 3: Write & Learn
  const StepWriteAndLearn = () => (
    <div className='content-card'>
      <h2 className='text-2xl font-bold mb-2'>✍️ Time to Write Your Story!</h2>
      <p className='text-gray-600 text-lg mb-6'>
        Amazing work! You've put your own creative spin on a classic story.
        You've reimagined the characters, setting, and world - now continue your
        unique adventure!
      </p>

      {/* Story Workspace */}
      <div className='story-workspace'>
        {/* AI-Generated Starter Section */}
        <div className='story-starter-section'>
          <h3 className='story-starter-title'>✨ Your Spin on a Classic</h3>
          <div className='story-starter-content'>
            {generatedStory?.story ||
              "Your amazing reimagined story will appear here once it's created!"}
          </div>

          <div className='coaching-box'>
            <h4 className='font-bold text-blue-700 mb-3'>
              🎯 What You've Created So Far:
            </h4>
            <div className='coaching-tips'>
              <div className='coaching-tip'>
                <div className='tip-number'>✓</div>
                <div>
                  <strong>Your Characters:</strong> You've taken classic
                  characters and made them your own, giving them new life in
                  your chosen setting!
                </div>
              </div>
              <div className='coaching-tip'>
                <div className='tip-number'>✓</div>
                <div>
                  <strong>Your World:</strong> You've transformed the original
                  story world into something completely new and exciting!
                </div>
              </div>
              <div className='coaching-tip'>
                <div className='tip-number'>✓</div>
                <div>
                  <strong>Your Adventure:</strong> You've set up the perfect
                  beginning for an amazing story that's uniquely yours!
                </div>
              </div>
              <div className='coaching-tip'>
                <div className='tip-number'>✓</div>
                <div>
                  <strong>Your Learning:</strong> You've explored how classic
                  themes work in new settings - that's real literary analysis!
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Student Writing Section */}
        <div className='story-writing-section'>
          <h3 className='story-writing-title'>✍️ Continue Your Adventure</h3>

          <div className='writing-prompt'>
            <div className='text-gray-800'>
              <strong>🚀 Your Writing Mission:</strong>
              <br />
              What happens next? How does your character react to this
              situation? What discoveries await? Remember: the best stories come
              from curiosity and brave choices!
            </div>
          </div>

          <textarea
            value={studentWriting}
            onChange={handleStudentWritingChange}
            placeholder={`Continue your adventure here... 

What is your character thinking? What do they decide to do? What do they see, hear, or feel?

Remember to:
• Show your character's emotions and thoughts
• Describe the amazing setting you created
• Create exciting dialogue
• Build suspense about what happens next

Start writing: "The character hesitated for a moment, then..."`}
            className='build-a-story-textarea'
            style={{ height: '320px', width: '100%' }}
          />

          <div className='writing-stats'>
            <span>
              Words written:{' '}
              <span
                className={`word-count ${wordCount > 50 ? 'good' : 'warning'}`}
              >
                {wordCount}
              </span>
            </span>
            <span>Target: 200-400 words</span>
            <span>Reading level: 7th grade</span>
          </div>

          <div className='coaching-box mt-4'>
            <h4 className='font-bold text-blue-700 mb-3'>
              💡 Live Writing Coach Tips:
            </h4>
            <div className='coaching-tips'>
              <div className='coaching-tip'>
                <div className='tip-number'>1</div>
                <div>
                  <strong>Character Voice:</strong> Keep your character true to
                  their personality while they explore this new world!
                </div>
              </div>
              <div className='coaching-tip'>
                <div className='tip-number'>2</div>
                <div>
                  <strong>Show Don't Tell:</strong> Instead of "They were
                  curious," write "Their heart raced as they stepped closer"
                </div>
              </div>
              <div className='coaching-tip'>
                <div className='tip-number'>3</div>
                <div>
                  <strong>Dialogue:</strong> What would your character say to
                  themselves or others in this moment?
                </div>
              </div>
              <div className='coaching-tip'>
                <div className='tip-number'>4</div>
                <div>
                  <strong>Setting Details:</strong> Use your amazing new setting
                  to create atmosphere and excitement!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Educational Insights */}
      <div className='educational-insights'>
        <h3 className='text-xl font-bold text-gray-800 mb-4'>
          📚 What You're Learning (Common Core Standards)
        </h3>
        <div className='insights-grid'>
          <div className='insight-card'>
            <div className='insight-standard'>W.7.3 - Narrative Writing</div>
            <div className='insight-description'>
              You're practicing continuing a narrative with consistent character
              voice, plot development, and descriptive details.
            </div>
          </div>
          <div className='insight-card'>
            <div className='insight-standard'>RL.7.3 - Character Analysis</div>
            <div className='insight-description'>
              You're analyzing how character traits transfer to new settings
              while maintaining core personality.
            </div>
          </div>
          <div className='insight-card'>
            <div className='insight-standard'>RL.7.2 - Theme Development</div>
            <div className='insight-description'>
              You're exploring how themes work in different settings and time
              periods.
            </div>
          </div>
          <div className='insight-card'>
            <div className='insight-standard'>L.7.5 - Language Use</div>
            <div className='insight-description'>
              You're adapting language and literary devices for new contexts.
            </div>
          </div>
        </div>
      </div>

      {/* Download Section */}
      <div className='download-section'>
        <h3 className='text-xl font-bold text-green-800 mb-2'>
          📥 Save & Share Your Amazing Story
        </h3>
        <p className='text-green-700 mb-6'>
          Get your complete story adventure: Your reimagined beginning + your
          awesome writing + reflection on your creative process!
        </p>

        <div className='download-options'>
          <div className='download-card'>
            <h4 className='font-bold text-gray-800 mb-2'>
              📄 My Story Portfolio
            </h4>
            <p className='text-gray-600 mb-4'>
              Your complete reimagined adventure with writing reflections and
              questions about your creative choices
            </p>
            <button
              onClick={() => handleDownload('📄 My Story Portfolio')}
              className='btn-primary'
            >
              Download PDF
            </button>
          </div>
          <div className='download-card'>
            <h4 className='font-bold text-gray-800 mb-2'>👨‍🏫 For My Teacher</h4>
            <p className='text-gray-600 mb-4'>
              Special teacher version with learning standards and assessment of
              your creative adaptation skills
            </p>
            <button
              onClick={() => handleDownload('👨‍🏫 For My Teacher')}
              className='btn-secondary'
            >
              Download PDF
            </button>
          </div>
        </div>

        <div className='action-row'>
          <button
            onClick={regenerateStory}
            disabled={loading}
            className='btn-primary btn-large'
          >
            {loading ? '🎨 Creating...' : '✨ Try Different Story Beginning'}
          </button>
          <button onClick={resetApp} className='btn-secondary btn-large'>
            📚 Start Over with New Classic
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className='build-a-story-container'>
      <div className='build-a-story-content'>
        {/* Header */}
        <div className='build-a-story-header'>
          <h1 className='text-4xl font-bold mb-3 drop-shadow-lg'>
            📚✨ BUILD-A-STORY Writer ✨📚
          </h1>
          <p className='text-xl opacity-90'>
            Get the perfect story starter, then make it yours!
          </p>
        </div>

        {/* Progress Container */}
        <div className='build-a-story-progress'>
          <div className='build-a-story-steps'>
            {steps.map((step, index) => (
              <div
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`build-a-story-step ${
                  index < currentStep
                    ? 'completed'
                    : index === currentStep
                    ? 'active'
                    : isStepComplete(index - 1) || index === 0
                    ? 'pending'
                    : 'pending'
                }`}
              >
                <div className='build-a-story-step-icon'>{step.icon}</div>
                <div className='build-a-story-step-title'>{step.title}</div>
                <div className='build-a-story-step-desc'>{step.desc}</div>
              </div>
            ))}
          </div>

          {/* Student Progress - Only show during steps 1+ */}
          {currentStep >= 1 && (
            <div className='agent-status-container'>
              <h4 className='agent-status-title'>
                📚 Your Story Creation Progress:
              </h4>
              <div className='agent-status-grid'>
                <div className='agent-status-item'>
                  <div
                    className={`agent-avatar ${
                      currentStep >= 1 ? 'complete' : 'waiting'
                    }`}
                  >
                    {currentStep >= 1 ? '✅' : '📖'}
                  </div>
                  <div className='flex-1'>
                    <div className='agent-name'>Story Selection</div>
                    <div className='agent-message'>
                      {currentStep >= 1
                        ? 'Perfect classic chosen!'
                        : 'Choose your favorite classic story'}
                    </div>
                  </div>
                </div>
                <div className='agent-status-item'>
                  <div
                    className={`agent-avatar ${
                      currentStep >= 2
                        ? 'complete'
                        : currentStep === 1
                        ? 'working'
                        : 'waiting'
                    }`}
                  >
                    {currentStep >= 2 ? '✅' : currentStep === 1 ? '🎨' : '⏳'}
                  </div>
                  <div className='flex-1'>
                    <div className='agent-name'>Creative Vision</div>
                    <div className='agent-message'>
                      {currentStep >= 2
                        ? 'Amazing customization complete!'
                        : currentStep === 1
                        ? 'Add your creative spin...'
                        : 'Waiting for story selection...'}
                    </div>
                  </div>
                </div>
                <div className='agent-status-item'>
                  <div
                    className={`agent-avatar ${
                      generatedStory
                        ? 'complete'
                        : currentStep >= 2
                        ? 'working'
                        : 'waiting'
                    }`}
                  >
                    {generatedStory ? '✅' : currentStep >= 2 ? '🔄' : '⏳'}
                  </div>
                  <div className='flex-1'>
                    <div className='agent-name'>Story Beginning</div>
                    <div className='agent-message'>
                      {generatedStory
                        ? 'Your reimagined story is ready!'
                        : currentStep >= 2
                        ? 'Creating your story beginning...'
                        : 'Waiting for your creative input...'}
                    </div>
                  </div>
                </div>
                <div className='agent-status-item'>
                  <div
                    className={`agent-avatar ${
                      currentStep >= 3 ? 'working' : 'waiting'
                    }`}
                  >
                    {currentStep >= 3 ? '✍️' : '⏳'}
                  </div>
                  <div className='flex-1'>
                    <div className='agent-name'>Your Writing</div>
                    <div className='agent-message'>
                      {currentStep >= 3
                        ? 'Time to continue your story!'
                        : 'Ready for your amazing writing...'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className='error-banner'>
            <span className='text-red-700'>⚠️ {error}</span>
            <button onClick={() => setError(null)} className='error-close'>
              ✕
            </button>
          </div>
        )}

        {/* Current Step Content */}
        {renderCurrentStep()}
      </div>
    </div>
  )
}

export default BuildAStoryInterface
