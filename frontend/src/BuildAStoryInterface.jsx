import React, { useState, useEffect } from 'react'
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
  }, [currentStep, storyData, generatedStory])

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

  const handleDownload = downloadType => {
    const completeStory =
      generatedStory?.story + '\n\n**Your Continuation:**\n\n' + studentWriting
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
    <div className='bg-white rounded-2xl p-8 shadow-2xl'>
      <h2 className='text-3xl font-bold mb-3 text-center'>
        📖 Choose Your Classic Story
      </h2>
      <p className='text-gray-600 text-lg mb-8 text-center'>
        Pick a classic book that you'd like to reimagine with your own awesome
        twist!
      </p>

      <div className='mb-8'>
        <label className='block text-lg font-bold mb-4 text-gray-800'>
          📚 Which classic story do you want to transform?
        </label>
        <select
          value={storyData.book_title}
          onChange={e =>
            setStoryData({ ...storyData, book_title: e.target.value })
          }
          className='w-full p-4 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:border-green-500 bg-gray-50'
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
        <div className='bg-green-50 rounded-2xl p-6 border-l-4 border-green-500 mb-8'>
          <h3 className='text-xl font-bold text-green-800 mb-4 flex items-center gap-2'>
            ✅ Awesome Choice!
          </h3>

          <div className='bg-white rounded-xl p-5 mb-4'>
            <h4 className='text-lg font-bold text-gray-800 mb-2'>
              📚 {selectedBookData.title} by {selectedBookData.author}
            </h4>
            <p className='text-gray-700 mb-4 leading-relaxed'>
              {selectedBookData.description ||
                `A classic tale of ${selectedBookData.theme.toLowerCase()} that's perfect for adaptation!`}
            </p>
            <div className='bg-blue-50 p-3 rounded-lg'>
              <p className='text-blue-800 font-semibold'>
                💡 Why this is perfect: Great for sci-fi, modern day, or fantasy
                adaptations!
              </p>
            </div>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-3 gap-4 mb-6'>
            <div className='bg-white p-4 rounded-xl text-center shadow-sm'>
              <div className='text-2xl mb-2'>🎭</div>
              <div className='font-bold text-gray-800 text-sm'>Genre</div>
              <div className='text-gray-600 text-sm'>
                {selectedBookData.genre}
              </div>
            </div>
            <div className='bg-white p-4 rounded-xl text-center shadow-sm'>
              <div className='text-2xl mb-2'>💡</div>
              <div className='font-bold text-gray-800 text-sm'>Theme</div>
              <div className='text-gray-600 text-sm'>
                {selectedBookData.theme}
              </div>
            </div>
            <div className='bg-white p-4 rounded-xl text-center shadow-sm'>
              <div className='text-2xl mb-2'>⏰</div>
              <div className='font-bold text-gray-800 text-sm'>
                Original Era
              </div>
              <div className='text-gray-600 text-sm'>
                {selectedBookData.era}
              </div>
            </div>
          </div>

          <div className='text-center'>
            <button
              onClick={() => setCurrentStep(1)}
              className='px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-bold text-lg hover:transform hover:-translate-y-1 hover:shadow-lg transition-all'
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
    <div className='bg-white rounded-2xl p-8 shadow-2xl'>
      <h2 className='text-3xl font-bold mb-3 text-center'>
        🎨 Customize Your Story
      </h2>
      <p className='text-gray-600 text-lg mb-8 text-center'>
        Make {storyData.book_title.split(' by ')[0]} your own by changing the
        setting, characters, and more!
      </p>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
        <div className='space-y-6'>
          <div>
            <label className='block text-lg font-bold mb-3 text-gray-800'>
              🏞️ Where should your story take place? *
            </label>
            <select
              value={storyData.setting}
              onChange={e =>
                setStoryData({ ...storyData, setting: e.target.value })
              }
              className='w-full p-4 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:border-green-500 bg-gray-50'
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

          <div>
            <label className='block text-lg font-bold mb-3 text-gray-800'>
              ⏰ When does your story happen?
            </label>
            <select
              value={storyData.time_period}
              onChange={e =>
                setStoryData({ ...storyData, time_period: e.target.value })
              }
              className='w-full p-4 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 bg-gray-50'
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

          <div>
            <label className='block text-lg font-bold mb-3 text-gray-800'>
              💡 What should your story teach?
            </label>
            <select
              value={storyData.theme}
              onChange={e =>
                setStoryData({ ...storyData, theme: e.target.value })
              }
              className='w-full p-4 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 bg-gray-50'
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
          <div>
            <label className='block text-lg font-bold mb-3 text-gray-800'>
              👥 Who are your main characters? *
            </label>
            <textarea
              value={storyData.characters}
              onChange={e =>
                setStoryData({ ...storyData, characters: e.target.value })
              }
              placeholder='Example: A curious astronaut named Alex and their AI robot companion who loves to explore...'
              rows='4'
              className='w-full p-4 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:border-green-500 bg-gray-50'
              required
            />
            <div className='text-right text-sm text-gray-500 mt-1'>
              {storyData.characters.length}/500 characters
            </div>
          </div>

          <div>
            <label className='block text-lg font-bold mb-3 text-gray-800'>
              ✨ Any special elements to include?
            </label>
            <textarea
              value={storyData.special_elements}
              onChange={e =>
                setStoryData({ ...storyData, special_elements: e.target.value })
              }
              placeholder='Example: talking robots, magic powers, time travel, alien creatures...'
              rows='3'
              className='w-full p-4 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 bg-gray-50'
            />
          </div>
        </div>
      </div>

      <div className='flex justify-center space-x-4'>
        <button
          onClick={() => setCurrentStep(0)}
          className='px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl font-bold hover:transform hover:-translate-y-1 hover:shadow-lg transition-all'
        >
          ⬅️ Back to Book Selection
        </button>
        <button
          onClick={() => setCurrentStep(2)}
          disabled={!storyData.setting || !storyData.characters.trim()}
          className={`px-8 py-3 rounded-xl font-bold hover:transform hover:-translate-y-1 hover:shadow-lg transition-all ${
            storyData.setting && storyData.characters.trim()
              ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          🤖 Create My Story Starter! →
        </button>
      </div>
    </div>
  )

  // Step 2: Create Starter (Agent Workflow)
  const StepCreateStarter = () => {
    useEffect(() => {
      if (currentStep === 2 && !loading && !generatedStory) {
        createStory()
      }
    }, [currentStep])

    return (
      <div className='bg-white rounded-2xl p-8 shadow-2xl'>
        <h2 className='text-3xl font-bold mb-3 text-center'>
          🤖 Your Expert Writing Team is Creating Your Story!
        </h2>
        <p className='text-gray-600 text-lg mb-8 text-center'>
          Our amazing AI team is working hard to create the perfect story
          starter just for you!
        </p>

        {/* Agent Status Display */}
        <div className='bg-gray-50 rounded-xl p-6 border-l-4 border-green-500 mb-8'>
          <h4 className='font-bold text-green-700 mb-4'>
            🤝 Your Expert Writing Team Status:
          </h4>
          <div className='space-y-3'>
            {agentStatuses.map((agent, index) => (
              <div
                key={index}
                className='flex items-center bg-white p-4 rounded-lg'
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-lg mr-4 ${
                    agent.status === 'complete'
                      ? 'bg-green-100'
                      : agent.status === 'working'
                      ? 'bg-blue-100'
                      : 'bg-gray-100'
                  }`}
                >
                  {agent.status === 'complete'
                    ? '✅'
                    : agent.status === 'working'
                    ? '🔄'
                    : agent.avatar}
                </div>
                <div className='flex-1'>
                  <div className='font-bold text-gray-800'>{agent.name}</div>
                  <div className='text-gray-600 text-sm italic'>
                    {agent.message}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {loading && (
          <div className='text-center'>
            <div className='inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mb-4'></div>
            <p className='text-lg font-semibold text-gray-700'>
              Creating your amazing story...
            </p>
            <p className='text-gray-600'>
              This usually takes 2-3 minutes. We're making sure it's perfect!
            </p>
          </div>
        )}

        {generatedStory && !loading && (
          <div className='text-center'>
            <div className='text-6xl mb-4'>🎉</div>
            <h3 className='text-2xl font-bold text-green-600 mb-4'>
              Your Story Starter is Ready!
            </h3>
            <button
              onClick={() => setCurrentStep(3)}
              className='px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-bold text-lg hover:transform hover:-translate-y-1 hover:shadow-lg transition-all'
            >
              ✍️ Let's Start Writing! →
            </button>
          </div>
        )}

        {error && (
          <div className='text-center bg-red-50 rounded-xl p-6 border-l-4 border-red-500'>
            <div className='text-4xl mb-2'>😅</div>
            <p className='text-red-700 font-semibold mb-4'>
              Oops! Something went wrong.
            </p>
            <p className='text-red-600 mb-4'>{error}</p>
            <button
              onClick={createStory}
              className='px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-bold hover:transform hover:-translate-y-1 hover:shadow-lg transition-all'
            >
              🔄 Try Again
            </button>
          </div>
        )}
      </div>
    )
  }

  // Step 3: Write & Learn
  const StepWriteAndLearn = () => (
    <div className='bg-white rounded-2xl p-8 shadow-2xl'>
      <h2 className='text-2xl font-bold mb-2'>✍️ Time to Write Your Story!</h2>
      <p className='text-gray-600 text-lg mb-6'>
        Our expert writing team created the perfect story starter for your
        adventure. Now it's your turn to continue the journey!
      </p>

      {/* Collaboration Flow */}
      <div className='bg-blue-50 rounded-xl p-5 mb-8 border-l-4 border-blue-500'>
        <h4 className='font-bold text-blue-700 mb-4'>
          🤝 How We're Working Together:
        </h4>
        <div className='space-y-3'>
          <div className='flex items-center bg-white p-3 rounded-lg'>
            <div className='w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mr-4 text-sm'>
              🤖
            </div>
            <div>
              <strong>Our Writing Team:</strong> We created your story starter
              with awesome characters, cool setup, and everything you need to
              learn!
            </div>
          </div>
          <div className='flex items-center bg-white p-3 rounded-lg'>
            <div className='w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mr-4 text-sm'>
              ✍️
            </div>
            <div>
              <strong>Your Turn:</strong> Continue the adventure with your
              creativity - our writing coach will help you make it amazing!
            </div>
          </div>
          <div className='flex items-center bg-white p-3 rounded-lg'>
            <div className='w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mr-4 text-sm'>
              📚
            </div>
            <div>
              <strong>Together:</strong> Create a complete story that's
              exciting, fun, and helps you rock your learning goals!
            </div>
          </div>
        </div>
      </div>

      {/* Story Workspace */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
        {/* AI-Generated Starter Section */}
        <div className='bg-gray-50 rounded-2xl p-6 border-l-4 border-green-500'>
          <h3 className='text-xl font-bold text-gray-800 mb-4 flex items-center gap-2'>
            🤖 Your Expert-Crafted Story Starter
          </h3>
          <div className='bg-white p-5 rounded-xl border-2 border-green-200 mb-4'>
            <div className='whitespace-pre-line text-gray-800 leading-relaxed'>
              {generatedStory?.story ||
                "Your amazing story starter will appear here once it's created!"}
            </div>
          </div>

          <div className='bg-blue-50 rounded-xl p-4 border-l-4 border-blue-500'>
            <h4 className='font-bold text-blue-700 mb-3'>
              🎯 What Our Writing Team Created For You:
            </h4>
            <div className='space-y-2'>
              <div className='flex items-start gap-2'>
                <div className='w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5'>
                  ✓
                </div>
                <div>
                  <strong>Cool Character:</strong> Your main character keeps the
                  best traits from the original but fits your awesome new
                  setting!
                </div>
              </div>
              <div className='flex items-start gap-2'>
                <div className='w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5'>
                  ✓
                </div>
                <div>
                  <strong>Awesome Twist:</strong> Classic elements transformed
                  for your chosen world - just as mysterious and exciting!
                </div>
              </div>
              <div className='flex items-start gap-2'>
                <div className='w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5'>
                  ✓
                </div>
                <div>
                  <strong>Epic Adventure Hook:</strong> The perfect setup for an
                  amazing adventure that you can continue!
                </div>
              </div>
              <div className='flex items-start gap-2'>
                <div className='w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5'>
                  ✓
                </div>
                <div>
                  <strong>Learning Fun:</strong> Everything is set up for you to
                  explore themes and ideas in the coolest way!
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Student Writing Section */}
        <div className='bg-yellow-50 rounded-2xl p-6 border-l-4 border-yellow-500'>
          <h3 className='text-xl font-bold text-yellow-700 mb-4 flex items-center gap-2'>
            ✍️ Continue Your Adventure
          </h3>

          <div className='bg-white p-4 rounded-xl border-l-4 border-yellow-500 mb-4'>
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
            onChange={e => setStudentWriting(e.target.value)}
            placeholder={`Continue your adventure here... 

What is your character thinking? What do they decide to do? What do they see, hear, or feel?

Remember to:
• Show your character's emotions and thoughts
• Describe the amazing setting you created
• Create exciting dialogue
• Build suspense about what happens next

Start writing: "The character hesitated for a moment, then..."`}
            className='w-full h-80 p-5 border-2 border-gray-200 rounded-xl text-lg leading-relaxed resize-none focus:outline-none focus:border-yellow-500 font-serif'
          />

          <div className='flex justify-between items-center mt-3 text-sm text-gray-600'>
            <span>
              Words written:{' '}
              <span
                className={`font-bold ${
                  wordCount > 50 ? 'text-green-600' : 'text-yellow-600'
                }`}
              >
                {wordCount}
              </span>
            </span>
            <span>Target: 200-400 words</span>
            <span>Reading level: 7th grade</span>
          </div>

          <div className='bg-blue-50 rounded-xl p-4 border-l-4 border-blue-500 mt-4'>
            <h4 className='font-bold text-blue-700 mb-3'>
              💡 Live Writing Coach Tips:
            </h4>
            <div className='space-y-2'>
              <div className='flex items-start gap-2'>
                <div className='w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5'>
                  1
                </div>
                <div>
                  <strong>Character Voice:</strong> Keep your character true to
                  their personality while they explore this new world!
                </div>
              </div>
              <div className='flex items-start gap-2'>
                <div className='w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5'>
                  2
                </div>
                <div>
                  <strong>Show Don't Tell:</strong> Instead of "They were
                  curious," write "Their heart raced as they stepped closer"
                </div>
              </div>
              <div className='flex items-start gap-2'>
                <div className='w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5'>
                  3
                </div>
                <div>
                  <strong>Dialogue:</strong> What would your character say to
                  themselves or others in this moment?
                </div>
              </div>
              <div className='flex items-start gap-2'>
                <div className='w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5'>
                  4
                </div>
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
      <div className='bg-gray-50 rounded-2xl p-6 mb-8 border-l-4 border-gray-500'>
        <h3 className='text-xl font-bold text-gray-800 mb-4'>
          📚 What You're Learning (Common Core Standards)
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='bg-white p-4 rounded-xl border-l-3 border-gray-500'>
            <div className='font-bold text-gray-800 mb-2'>
              W.7.3 - Narrative Writing
            </div>
            <div className='text-gray-600'>
              You're practicing continuing a narrative with consistent character
              voice, plot development, and descriptive details.
            </div>
          </div>
          <div className='bg-white p-4 rounded-xl border-l-3 border-gray-500'>
            <div className='font-bold text-gray-800 mb-2'>
              RL.7.3 - Character Analysis
            </div>
            <div className='text-gray-600'>
              You're analyzing how character traits transfer to new settings
              while maintaining core personality.
            </div>
          </div>
          <div className='bg-white p-4 rounded-xl border-l-3 border-gray-500'>
            <div className='font-bold text-gray-800 mb-2'>
              RL.7.2 - Theme Development
            </div>
            <div className='text-gray-600'>
              You're exploring how themes work in different settings and time
              periods.
            </div>
          </div>
          <div className='bg-white p-4 rounded-xl border-l-3 border-gray-500'>
            <div className='font-bold text-gray-800 mb-2'>
              L.7.5 - Language Use
            </div>
            <div className='text-gray-600'>
              You're adapting language and literary devices for new contexts.
            </div>
          </div>
        </div>
      </div>

      {/* Download Section */}
      <div className='bg-green-50 rounded-2xl p-6 text-center border-l-4 border-green-500'>
        <h3 className='text-xl font-bold text-green-800 mb-2'>
          📥 Save & Share Your Amazing Story
        </h3>
        <p className='text-green-700 mb-6'>
          Get your complete story adventure: Expert starter + your awesome
          writing + cool learning stuff!
        </p>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
          <div className='bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow'>
            <h4 className='font-bold text-gray-800 mb-2'>
              📄 My Story Portfolio
            </h4>
            <p className='text-gray-600 mb-4'>
              Your complete adventure with writing tips and questions to think
              about
            </p>
            <button
              onClick={() => handleDownload('📄 My Story Portfolio')}
              className='px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-bold transition-all hover:transform hover:-translate-y-1 hover:shadow-lg'
            >
              Download PDF
            </button>
          </div>
          <div className='bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow'>
            <h4 className='font-bold text-gray-800 mb-2'>👨‍🏫 For My Teacher</h4>
            <p className='text-gray-600 mb-4'>
              Special teacher version with learning goals and how awesome you
              did
            </p>
            <button
              onClick={() => handleDownload('👨‍🏫 For My Teacher')}
              className='px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-bold transition-all hover:transform hover:-translate-y-1 hover:shadow-lg'
            >
              Download PDF
            </button>
          </div>
        </div>

        <div className='space-x-4'>
          <button
            onClick={regenerateStory}
            disabled={loading}
            className='px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-bold hover:transform hover:-translate-y-1 hover:shadow-lg transition-all disabled:opacity-50'
          >
            {loading ? '🤖 Creating...' : '✨ Generate Another Story Starter'}
          </button>
          <button
            onClick={resetApp}
            className='px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-bold hover:transform hover:-translate-y-1 hover:shadow-lg transition-all'
          >
            📚 Try Different Classic Book
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-500 to-purple-600'>
      <div className='max-w-6xl mx-auto p-5'>
        {/* Header */}
        <div className='text-center text-white mb-8'>
          <h1 className='text-4xl font-bold mb-3 drop-shadow-lg'>
            📚✨ BUILD-A-STORY Writer ✨📚
          </h1>
          <p className='text-xl opacity-90'>
            Get the perfect story starter, then make it yours!
          </p>
        </div>

        {/* Progress Container */}
        <div className='bg-white rounded-2xl p-6 mb-8 shadow-2xl'>
          <div className='flex justify-between items-center mb-6'>
            {steps.map((step, index) => (
              <div
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`flex-1 text-center p-4 rounded-xl mx-1 transition-all duration-300 cursor-pointer ${
                  index < currentStep
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                    : index === currentStep
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white transform scale-105'
                    : isStepComplete(index - 1) || index === 0
                    ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                <div className='text-3xl mb-2'>{step.icon}</div>
                <div className='font-bold mb-1'>{step.title}</div>
                <div className='text-sm opacity-80'>{step.desc}</div>
              </div>
            ))}
          </div>

          {/* Agent Status Display - Only show during steps 1+ */}
          {currentStep >= 1 && (
            <div className='bg-gray-50 rounded-xl p-4 border-l-4 border-green-500'>
              <h4 className='font-bold text-green-700 mb-3'>
                🤝 Your Expert Writing Team Status:
              </h4>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                {agentStatuses.map((agent, index) => (
                  <div
                    key={index}
                    className='flex items-center bg-white p-3 rounded-lg'
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-lg mr-3 ${
                        agent.status === 'complete'
                          ? 'bg-green-100'
                          : agent.status === 'working'
                          ? 'bg-blue-100'
                          : 'bg-gray-100'
                      }`}
                    >
                      {agent.status === 'complete'
                        ? '✅'
                        : agent.status === 'working'
                        ? '🔄'
                        : agent.avatar}
                    </div>
                    <div className='flex-1'>
                      <div className='font-bold text-gray-800 text-sm'>
                        {agent.name}
                      </div>
                      <div className='text-gray-600 text-xs italic'>
                        {agent.message}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className='bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center justify-between'>
            <span className='text-red-700'>⚠️ {error}</span>
            <button
              onClick={() => setError(null)}
              className='text-red-500 hover:text-red-700 font-bold text-xl'
            >
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
