import React, { useState, useEffect, useCallback } from 'react'
import './BuildAStory.css' // Import your CSS styles

// Simple ID generator for new characters
const generateId = () => {
  return 'char_' + Math.random().toString(36).substr(2, 9)
}

// FIXED: Step components moved OUTSIDE of BuildAStoryInterface to prevent remounting
// Using React.memo to prevent unnecessary re-renders

// Step 0: Choose Story (Enhanced with AI learning preview)
const StepChooseStory = React.memo(({ 
  storyData, 
  books, 
  setStoryData, 
  setCurrentStep, 
  aiEducationMode, 
  setAiEducationMode, 
  agentStatuses 
}) => (
  <div className='content-card'>
    <h2 className='text-3xl font-bold mb-3 text-center'>
      📖 Choose Your Classic Story for AI Collaboration
    </h2>
    <p className='text-gray-600 text-lg mb-4 text-center'>
      Pick a classic book that you'd like to reimagine by working together
      with our AI team of specialists!
    </p>

    {/* NEW: AI Education Introduction */}
    <div className='ai-education-intro'>
      <h3 className='ai-intro-title'>
        🤖 What You'll Learn About AI Collaboration
      </h3>
      <div className='ai-intro-content'>
        <div className='ai-intro-point'>
          <div className='ai-intro-icon'>🧠</div>
          <div>
            <strong>How AI Teams Work:</strong> You'll see 6 different AI
            specialists collaborate to help create your story, just like
            humans work in teams!
          </div>
        </div>
        <div className='ai-intro-point'>
          <div className='ai-intro-icon'>🔍</div>
          <div>
            <strong>AI Decision Making:</strong> Watch how each AI agent makes
            different types of decisions and see their reasoning process.
          </div>
        </div>
        <div className='ai-intro-point'>
          <div className='ai-intro-icon'>💡</div>
          <div>
            <strong>Human-AI Partnership:</strong> Learn how to direct AI
            effectively while keeping your creativity central to the process.
          </div>
        </div>
      </div>
    </div>

    {/* AI Education Mode Toggle */}
    <div className='ai-education-toggle'>
      <label className='toggle-label'>
        <input
          type='checkbox'
          checked={aiEducationMode}
          onChange={setAiEducationMode}
          className='toggle-checkbox'
        />
        <span className='toggle-slider'></span>
        <span className='toggle-text'>
          🎓 Show AI Learning Process (Recommended for understanding how AI
          works!)
        </span>
      </label>
    </div>

    <div className='form-group mb-8'>
      <label className='block text-lg font-bold mb-4 text-gray-800'>
        📚 Which classic story do you want to transform with AI collaboration?
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

    {storyData.book_title && (
      <div className='book-info-card'>
        <h3 className='book-info-title'>
          ✅ Perfect Choice for AI Collaboration!
        </h3>

        {(() => {
          const selectedBookData = books.find(book =>
            storyData.book_title.includes(book.title),
          );
          
          if (!selectedBookData) return null;
          
          return (
            <>
              <div className='bg-white rounded-xl p-5 mb-4'>
                <h4 className='text-lg font-bold text-gray-800 mb-2'>
                  📚 {selectedBookData.title} by {selectedBookData.author}
                </h4>
                <p className='text-gray-700 mb-4 leading-relaxed'>
                  {selectedBookData.description ||
                    `A classic tale of ${selectedBookData.theme.toLowerCase()} that's perfect for creative adaptation with AI!`}
                </p>
                <div className='info-box'>
                  <p className='text-blue-800 font-semibold'>
                    🤖 Why our AI team loves this book: Rich characters and themes
                    that can be brilliantly adapted to any setting while preserving
                    the story's heart!
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
            </>
          );
        })()}

        <div className='text-center mt-6'>
          <button
            onClick={() => setCurrentStep(1)}
            className='btn-primary btn-large'
          >
            🎨 Let's Design This with AI! →
          </button>
        </div>
      </div>
    )}
  </div>
),

// Step 1: Customize (Enhanced with AI collaboration preview)
const StepCustomize = React.memo(({ 
  storyData, 
  storyOptions, 
  setStoryData, 
  setCurrentStep, 
  aiEducationMode, 
  agentStatuses,
  handleCharacterChange,
  addCharacter,
  removeCharacter,
  handleSpecialElementChange
}) => (
  <div className='content-card'>
    <h2 className='text-3xl font-bold mb-3 text-center'>
      🎨 Design Your Story with AI Guidance
    </h2>
    <p className='text-gray-600 text-lg mb-6 text-center'>
      Tell our AI team your creative vision for{' '}
      {storyData.book_title.split(' by ')[0]} and they'll help bring it to
      life!
    </p>

    {/* NEW: AI Collaboration Preview */}
    {aiEducationMode && (
      <div className='ai-collaboration-preview'>
        <h3 className='ai-preview-title'>
          🤖 Meet Your AI Collaboration Team
        </h3>
        <p className='ai-preview-desc'>
          These AI specialists will work together to create your story. Each
          has a different job to ensure quality and educational value!
        </p>
        <div className='ai-team-preview'>
          {agentStatuses.slice(0, 3).map((agent, index) => (
            <div key={index} className='ai-agent-preview'>
              <div className='agent-preview-avatar'>{agent.avatar}</div>
              <div className='agent-preview-info'>
                <div className='agent-preview-name'>{agent.name}</div>
                <div className='agent-preview-specialty'>
                  {agent.ai_specialty}
                </div>
              </div>
            </div>
          ))}
          <div className='ai-agent-preview'>
            <div className='agent-preview-avatar'>➕</div>
            <div className='agent-preview-info'>
              <div className='agent-preview-name'>And 3 More!</div>
              <div className='agent-preview-specialty'>
                Working together as a team
              </div>
            </div>
          </div>
        </div>
      </div>
    )}

    <div className='form-grid grid-cols-1 md:grid-cols-2'>
      <div className='space-y-6'>
        <div className='form-group required'>
          <label className='block text-lg font-bold mb-3 text-gray-800'>
            🏞️ Where should your story take place?
            {aiEducationMode && (
              <span className='ai-hint'>
                (Our Book Expert will analyze how this setting affects the
                story!)
              </span>
            )}
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
            {aiEducationMode && (
              <span className='ai-hint'>
                (Time period affects character motivations and story
                possibilities!)
              </span>
            )}
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
            {aiEducationMode && (
              <span className='ai-hint'>
                (Our Learning Coach ensures educational value!)
              </span>
            )}
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
            {aiEducationMode && (
              <span className='ai-hint'>
                (Our Story Writer will preserve their personalities while
                adapting them!)
              </span>
            )}
          </label>

          {/* FIXED: Character Input Fields with proper array handling */}
          <div className='character-inputs'>
            {(storyData.charactersList || []).map((character, index) => (
              <div key={character.id || `char_${index}`} className='character-input-group'>
                <div className='character-input-header'>
                  <h5>Character {index + 1}</h5>
                  {index > 0 && (
                    <button
                      type='button'
                      onClick={e => {
                        e.preventDefault()
                        removeCharacter(index)
                      }}
                      className='remove-character-btn'
                    >
                      ✕
                    </button>
                  )}
                </div>
                <div className='character-input-fields'>
                  <input
                    type='text'
                    placeholder='Character name'
                    value={character.name || ''}
                    onChange={e =>
                      handleCharacterChange(index, 'name', e.target.value)
                    }
                    className='character-name-input'
                  />
                  <input
                    type='text'
                    placeholder='Brief description (curious astronaut, brave knight, etc.)'
                    value={character.description || ''}
                    onChange={e =>
                      handleCharacterChange(
                        index,
                        'description',
                        e.target.value,
                      )
                    }
                    className='character-description-input'
                  />
                </div>
              </div>
            ))}

            {(storyData.charactersList || []).length < 4 && (
              <button
                type='button'
                onClick={e => {
                  e.preventDefault()
                  addCharacter()
                }}
                className='add-character-btn'
              >
                + Add Another Character
              </button>
            )}
          </div>
        </div>

        <div className='form-group'>
          <label className='block text-lg font-bold mb-3 text-gray-800'>
            ✨ Special elements to include? (Choose up to 3)
            {aiEducationMode && (
              <span className='ai-hint'>
                (Our Quality Checker ensures everything fits together
                perfectly!)
              </span>
            )}
          </label>

          {/* Special Elements Checkboxes */}
          <div className='special-elements-grid'>
            {[
              'Talking Animals',
              'Magic Powers',
              'Time Travel',
              'Robots/AI Companions',
              'Flying Vehicles',
              'Underwater Exploration',
              'Space Adventure',
              'Ancient Mysteries',
              'Invisible Objects',
              'Shape-shifting',
              'Telepathy/Mind Reading',
              'Magical Creatures',
            ].map((element, index) => (
              <label key={index} className='special-element-checkbox'>
                <input
                  type='checkbox'
                  checked={(storyData.specialElementsList || []).includes(
                    element,
                  )}
                  onChange={e =>
                    handleSpecialElementChange(element, e.target.checked)
                  }
                  disabled={
                    (storyData.specialElementsList || []).length >= 3 &&
                    !(storyData.specialElementsList || []).includes(element)
                  }
                />
                <span className='checkbox-label'>{element}</span>
              </label>
            ))}
          </div>

          {storyData.specialElementsList &&
            storyData.specialElementsList.length > 0 && (
              <div className='selected-elements'>
                <strong>Selected:</strong>{' '}
                {storyData.specialElementsList.join(', ')}
                {storyData.specialElementsList.length >= 3 && (
                  <span className='max-reached'> (Maximum reached)</span>
                )}
              </div>
            )}
        </div>
      </div>
    </div>

    <div className='step-actions'>
      <button onClick={() => setCurrentStep(0)} className='btn-outline'>
        ⬅️ Back to Book Selection
      </button>
      <button
        onClick={() => setCurrentStep(2)}
        disabled={
          !storyData.setting ||
          !(
            storyData.charactersList &&
            storyData.charactersList.some(char => char.name.trim() !== '')
          )
        }
        className={`btn ${
          storyData.setting &&
          storyData.charactersList &&
          storyData.charactersList.some(char => char.name.trim() !== '')
            ? 'btn-primary'
            : ''
        } btn-large`}
      >
        🤖 Start AI Collaboration! →
      </button>
    </div>
  </div>
)

// Step 2: AI Collaboration (NEW - Shows the multi-agent process)
const StepAiCollaboration = ({ 
  loading, 
  generatedStory, 
  error, 
  aiEducationMode, 
  agentStatuses, 
  showProcessLearning, 
  setShowProcessLearning, 
  showAiInsights, 
  setShowAiInsights, 
  aiCollaborationInsights, 
  setCurrentStep, 
  createStory 
}) => {

  useEffect(() => {
    if (!loading && !generatedStory) {
      createStory()
    }
  }, [loading, generatedStory, createStory])

  return (
    <div className='content-card'>
      <h2 className='text-3xl font-bold mb-3 text-center'>
        🤖 AI Team Collaboration in Action!
      </h2>
      <p className='text-gray-600 text-lg mb-6 text-center'>
        Watch our AI specialists work together to bring your creative vision
        to life. Each agent has a special job to ensure your story is amazing!
      </p>

      {/* Real-time Agent Status Display */}
      {aiEducationMode && (
        <div className='ai-collaboration-live'>
          <h3 className='collaboration-title'>
            👥 Your AI Collaboration Team
          </h3>
          <div className='ai-agents-grid'>
            {agentStatuses.map((agent, index) => (
              <div key={index} className={`ai-agent-card ${agent.status}`}>
                <div className='ai-agent-header'>
                  <div className='ai-agent-avatar'>{agent.avatar}</div>
                  <div className='ai-agent-info'>
                    <div className='ai-agent-name'>{agent.name}</div>
                    <div className='ai-agent-status'>
                      {agent.status === 'complete'
                        ? '✅ Complete'
                        : agent.status === 'working'
                        ? '⚡ Working'
                        : '⏳ Waiting'}
                    </div>
                  </div>
                </div>
                <div className='ai-agent-description'>
                  <strong>What I do:</strong> {agent.what_i_do}
                </div>
                {agent.status === 'complete' && (
                  <div className='ai-agent-learning'>
                    <strong>💡 Learning moment:</strong>{' '}
                    {agent.learning_moment}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Process Learning Section */}
          <div className='process-learning-section'>
            <button
              onClick={() => setShowProcessLearning(!showProcessLearning)}
              className='process-learning-toggle'
            >
              {showProcessLearning ? '📚 Hide' : '🔍 Show'} How AI
              Collaboration Works
            </button>

            {showProcessLearning && (
              <div className='process-learning-content'>
                <h4>🧠 Understanding AI Teamwork</h4>
                <div className='learning-points'>
                  <div className='learning-point'>
                    <strong>🔄 Sequential Processing:</strong> Each AI agent
                    waits for the previous one to finish, just like a relay
                    race! This ensures quality and consistency.
                  </div>
                  <div className='learning-point'>
                    <strong>🎯 Specialization:</strong> Each agent is trained
                    for specific tasks - the Book Expert knows literature, the
                    Learning Coach knows education standards.
                  </div>
                  <div className='learning-point'>
                    <strong>🤝 Collaboration:</strong> Agents share
                    information through a common "state" - like passing notes
                    in a group project!
                  </div>
                  <div className='learning-point'>
                    <strong>✅ Quality Control:</strong> Multiple agents check
                    the work for different criteria - safety, education value,
                    and creative quality.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {loading && (
        <div className='loading-message'>
          <div className='loading-spinner'></div>
          <p className='text-lg font-semibold text-gray-700'>
            🤖 AI Team Collaborating on Your Story...
          </p>
          <p className='text-gray-600'>
            {aiEducationMode
              ? 'Watch the agents work together! Each specialist contributes their expertise to create something amazing.'
              : "This usually takes 2-3 minutes. We're making sure it captures your vision perfectly!"}
          </p>
        </div>
      )}

      {generatedStory && !loading && (
        <div>
          <div className='text-center mb-6'>
            <div className='text-6xl mb-4'>🎉</div>
            <h3 className='text-2xl font-bold text-green-600 mb-4'>
              AI Collaboration Complete - Your Story is Ready!
            </h3>
          </div>

          {/* Story Display with AI Insights */}
          <div className='ai-story-result'>
            <div className='story-starter-section mb-6'>
              <h3 className='story-starter-title'>
                ✨ Your AI-Collaborative Story Beginning
              </h3>
              <div className='story-starter-content'>
                {generatedStory.content_metrics?.story_content
                  ?.narrative_text ||
                  generatedStory.story ||
                  'Your amazing AI-collaborative story will appear here!'}
              </div>

              {aiEducationMode && aiCollaborationInsights && (
                <div className='ai-insights-summary'>
                  <button
                    onClick={() => setShowAiInsights(!showAiInsights)}
                    className='ai-insights-toggle'
                  >
                    {showAiInsights ? '🔽' : '▶️'} See How the AI Team Created
                    This
                  </button>

                  {showAiInsights && (
                    <div className='ai-insights-content'>
                      <h4>🔍 AI Collaboration Breakdown:</h4>
                      <div className='collaboration-breakdown'>
                        <div className='breakdown-item'>
                          <strong>📋 Project Manager:</strong> Validated your
                          request met safety and educational standards
                        </div>
                        <div className='breakdown-item'>
                          <strong>📚 Book Expert:</strong> Analyzed themes and
                          characters from the original story
                        </div>
                        <div className='breakdown-item'>
                          <strong>🎓 Learning Coach:</strong> Ensured
                          alignment with 7th grade learning objectives
                        </div>
                        <div className='breakdown-item'>
                          <strong>✍️ Story Writer:</strong> Crafted narrative
                          that blends your vision with story structure
                        </div>
                        <div className='breakdown-item'>
                          <strong>📖 Materials Creator:</strong> Prepared
                          discussion questions and learning activities
                        </div>
                        <div className='breakdown-item'>
                          <strong>🔍 Quality Checker:</strong> Verified
                          everything meets high standards for publication
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className='text-center'>
            <button
              onClick={() => setCurrentStep(3)}
              className='btn-primary btn-large'
            >
              ✍️ Now Add Your Writing & Reflect on AI! →
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className='error-container'>
          <div className='text-4xl mb-2'>😅</div>
          <p className='text-red-700 font-semibold mb-4'>
            Oops! The AI team hit a snag.
          </p>
          <p className='text-red-600 mb-4'>{error}</p>
          <button onClick={createStory} className='btn-secondary'>
            🔄 Restart AI Collaboration
          </button>
        </div>
      )}
    </div>
  )
)


// Step 3: Write & Reflect (Enhanced with AI education reflection)
const StepWriteAndReflect = React.memo(({ 
  generatedStory, 
  aiEducationMode, 
  studentWriting, 
  handleStudentWritingChange, 
  wordCount, 
  handleDownload, 
  regenerateStory, 
  resetApp, 
  loading 
}) => (
  <div className='content-card'>
    <h2 className='text-2xl font-bold mb-2'>
      ✍️ Continue Your Story & Reflect on AI Collaboration!
    </h2>
    <p className='text-gray-600 text-lg mb-6'>
      Amazing work! You've successfully collaborated with an AI team to create
      a story beginning. Now continue the story yourself and reflect on what
      you learned about working with AI!
    </p>

    {/* AI Collaboration Reflection */}
    {aiEducationMode && (
      <div className='ai-collaboration-reflection'>
        <h3 className='reflection-title'>
          🤔 Critical Thinking: Reflect on Your AI Collaboration
        </h3>
        <div className='reflection-questions'>
          <div className='reflection-question'>
            <strong>🎯 Quality Assessment:</strong> How well did the AI team
            capture your creative vision? What did they understand perfectly,
            and what might you adjust?
          </div>
          <div className='reflection-question'>
            <strong>🔍 Process Observation:</strong> Which AI agent's
            contribution was most important to the final result? Why do you
            think having multiple specialists was better than one general AI?
          </div>
          <div className='reflection-question'>
            <strong>🤝 Collaboration Skills:</strong> How did you learn to
            communicate your ideas effectively to the AI team? What would you
            do differently next time?
          </div>
          <div className='reflection-question'>
            <strong>🚀 Creative Control:</strong> How did working with AI
            enhance your creativity rather than replace it? What parts of the
            story creation process do you think humans should always control?
          </div>
        </div>
      </div>
    )}

    {/* Story Workspace */}
    <div className='story-workspace'>
      {/* AI-Generated Starter Section */}
      <div className='story-starter-section'>
        <h3 className='story-starter-title'>
          🤖 AI Team's Collaborative Beginning
        </h3>
        <div className='story-starter-content'>
          {generatedStory?.content_metrics?.story_content?.narrative_text ||
            generatedStory?.story ||
            "Your amazing AI-collaborative story will appear here once it's created!"}
        </div>

        <div className='coaching-box'>
          <h4 className='font-bold text-blue-700 mb-3'>
            🎯 What You & the AI Team Created Together:
          </h4>
          <div className='coaching-tips'>
            <div className='coaching-tip'>
              <div className='tip-number'>✓</div>
              <div>
                <strong>Human Creativity:</strong> YOU provided the original
                vision, character ideas, and creative direction that made this
                story unique!
              </div>
            </div>
            <div className='coaching-tip'>
              <div className='tip-number'>✓</div>
              <div>
                <strong>AI Expertise:</strong> The AI team provided literary
                analysis, educational alignment, and professional writing
                techniques!
              </div>
            </div>
            <div className='coaching-tip'>
              <div className='tip-number'>✓</div>
              <div>
                <strong>Collaborative Result:</strong> Together you created
                something neither human nor AI could have made alone - that's
                the power of collaboration!
              </div>
            </div>
            <div className='coaching-tip'>
              <div className='tip-number'>✓</div>
              <div>
                <strong>Learning Achievement:</strong> You've experienced
                authentic AI collaboration while developing your own
                storytelling skills!
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Student Writing Section */}
      <div className='story-writing-section'>
        <h3 className='story-writing-title'>✍️ Your Creative Continuation</h3>

        <div className='writing-prompt'>
          <div className='text-gray-800'>
            <strong>🚀 Your Writing Mission:</strong>
            <br />
            Now it's your turn! Continue the story in your own voice. What
            happens next? Remember: the AI gave you a great beginning, but the
            rest is YOUR creativity!
          </div>
        </div>

        <textarea
          value={studentWriting}
          onChange={handleStudentWritingChange}
          placeholder={`Continue your adventure here... 

What happens next in YOUR version of the story? How does your character react? What do they discover?

Remember to:
• Keep your character's personality consistent with the AI's beginning
• Add your own creative ideas and plot twists
• Show what YOU think should happen next
• Use your own writing style and voice

Start writing: "The character paused, considering what to do next..."`}
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
          <span>Your voice + AI collaboration</span>
        </div>

        {/* AI Collaboration Writing Coach */}
        <div className='coaching-box mt-4'>
          <h4 className='font-bold text-blue-700 mb-3'>
            💡 Human-AI Writing Collaboration Tips:
          </h4>
          <div className='coaching-tips'>
            <div className='coaching-tip'>
              <div className='tip-number'>1</div>
              <div>
                <strong>Build on AI Strengths:</strong> The AI provided good
                structure and educational elements - use that foundation to
                launch your creativity!
              </div>
            </div>
            <div className='coaching-tip'>
              <div className='tip-number'>2</div>
              <div>
                <strong>Add Human Emotion:</strong> AI is good at plot, but
                YOU bring the emotional depth and personal connection to
                characters!
              </div>
            </div>
            <div className='coaching-tip'>
              <div className='tip-number'>3</div>
              <div>
                <strong>Question AI Choices:</strong> If the AI made a
                decision you'd change, go ahead and change it! You're the
                creative director.
              </div>
            </div>
            <div className='coaching-tip'>
              <div className='tip-number'>4</div>
              <div>
                <strong>Keep Learning:</strong> Notice what the AI did well
                that you can learn from, and what you do better than AI!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* AI Literacy Learning Outcomes */}
    <div className='ai-literacy-outcomes'>
      <h3 className='text-xl font-bold text-gray-800 mb-4'>
        🎓 AI Literacy Skills You're Developing
      </h3>
      <div className='insights-grid'>
        <div className='insight-card'>
          <div className='insight-standard'>AI Collaboration</div>
          <div className='insight-description'>
            Learning to work WITH AI systems as creative partners while
            maintaining human agency and creativity.
          </div>
        </div>
        <div className='insight-card'>
          <div className='insight-standard'>Critical AI Evaluation</div>
          <div className='insight-description'>
            Developing skills to assess AI outputs, understand AI capabilities
            and limitations, and make informed decisions about AI suggestions.
          </div>
        </div>
        <div className='insight-card'>
          <div className='insight-standard'>AI Communication</div>
          <div className='insight-description'>
            Learning how to communicate effectively with AI systems through
            clear instructions and iterative feedback.
          </div>
        </div>
        <div className='insight-card'>
          <div className='insight-standard'>Ethical AI Use</div>
          <div className='insight-description'>
            Understanding responsible AI collaboration, giving proper credit,
            and maintaining human creativity in AI-assisted work.
          </div>
        </div>
      </div>
    </div>

    {/* Enhanced Download Section */}
    <div className='download-section'>
      <h3 className='text-xl font-bold text-green-800 mb-2'>
        📥 Save Your AI Collaboration Journey
      </h3>
      <p className='text-green-700 mb-6'>
        Get your complete AI collaboration experience: AI team beginning +
        your writing + reflection on AI literacy learning!
      </p>

      <div className='download-options'>
        <div className='download-card'>
          <h4 className='font-bold text-gray-800 mb-2'>
            📄 My AI Collaboration Portfolio
          </h4>
          <p className='text-gray-600 mb-4'>
            Your complete story with AI collaboration insights, reflection
            questions about working with AI, and AI literacy self-assessment
          </p>
          <button
            onClick={() => handleDownload('📄 My AI Collaboration Portfolio')}
            className='btn-primary'
          >
            Download PDF
          </button>
        </div>
        <div className='download-card'>
          <h4 className='font-bold text-gray-800 mb-2'>👨‍🏫 For My Teacher</h4>
          <p className='text-gray-600 mb-4'>
            Special educator version with AI literacy standards assessment,
            collaboration skills rubric, and curriculum alignment
            documentation
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
          {loading
            ? '🤖 AI Team Working...'
            : '✨ Try Different AI Collaboration'}
        </button>
        <button onClick={resetApp} className='btn-secondary btn-large'>
          📚 Start New AI Project
        </button>
      </div>
    </div>
  </div>
))

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
  // NEW: AI Education props
  aiEducationMode,
  agentWorkflow,
  currentAgent,
  aiCollaborationInsights,
  showProcessLearning,
  projectId,
  setAiEducationMode,
  setShowProcessLearning,
  fetchAiInsights,
}) => {
  const [studentWriting, setStudentWriting] = useState('')
  const [wordCount, setWordCount] = useState(0)
  const [showAiInsights, setShowAiInsights] = useState(false)

  // NEW: Enhanced agent statuses with educational focus
  const [agentStatuses, setAgentStatuses] = useState([
    {
      name: 'Project Manager',
      technical_name: 'enterprise_intake_coordinator',
      avatar: '📋',
      status: 'waiting',
      message:
        'Ready to validate your creative request and ensure it meets educational standards!',
      what_i_do:
        'I check that your story idea is safe, educational, and technically possible to create.',
      ai_specialty:
        'Request validation, safety assessment, and project planning',
      learning_moment:
        'This is how AI systems validate inputs before processing - like a quality control checkpoint!',
    },
    {
      name: 'Book Expert',
      technical_name: 'literature_research_intelligence',
      avatar: '📚',
      status: 'waiting',
      message:
        'Standing by to analyze your chosen classic and find the best ways to adapt it!',
      what_i_do:
        'I study the original book deeply to understand what makes it special and how to preserve that in your adaptation.',
      ai_specialty:
        'Literary analysis, theme identification, and adaptation strategy',
      learning_moment:
        'This shows how AI can analyze complex literature and understand storytelling patterns!',
    },
    {
      name: 'Learning Coach',
      technical_name: 'compliance_standards_validator',
      avatar: '🎓',
      status: 'waiting',
      message:
        'Excited to make sure your story meets all educational standards and learning goals!',
      what_i_do:
        'I verify that your adapted story will help you learn and meet important educational standards.',
      ai_specialty:
        'Educational standards compliance and learning objective alignment',
      learning_moment:
        'This demonstrates how AI can ensure content meets specific requirements and guidelines!',
    },
    {
      name: 'Story Writer',
      technical_name: 'enterprise_content_creator',
      avatar: '✍️',
      status: 'waiting',
      message:
        "Can't wait to create an amazing story beginning that captures your vision perfectly!",
      what_i_do:
        'I take all the research and requirements and write a compelling story beginning just for you.',
      ai_specialty:
        'Creative writing, narrative development, and content generation',
      learning_moment:
        'This is where AI creativity shines - combining rules with imagination to create something new!',
    },
    {
      name: 'Materials Creator',
      technical_name: 'educational_materials_engineer',
      avatar: '📖',
      status: 'waiting',
      message:
        'Ready to design awesome learning activities and discussion questions for your story!',
      what_i_do:
        'I create educational materials like discussion questions and vocabulary activities to enhance your learning.',
      ai_specialty:
        'Educational content design, assessment creation, and learning support',
      learning_moment:
        'This shows how AI can create personalized learning experiences tailored to your needs!',
    },
    {
      name: 'Quality Checker',
      technical_name: 'enterprise_quality_assurance',
      avatar: '🔍',
      status: 'waiting',
      message:
        'Standing by to make sure everything is perfect and ready for you to use!',
      what_i_do:
        'I review all the work from other agents to ensure quality, consistency, and educational value.',
      ai_specialty: 'Quality assurance, final review, and package preparation',
      learning_moment:
        'This demonstrates how AI systems use multiple checkpoints to ensure high-quality results!',
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
      title: 'AI Collaboration',
      desc: generatedStory ? 'Story created!' : 'Work with AI team',
    },
    {
      icon: '✍️',
      title: 'Write & Reflect',
      desc: 'Your creativity + AI learning',
    },
  ]

  // Update agent statuses based on workflow progress
  useEffect(() => {
    if (agentWorkflow && agentWorkflow.length > 0) {
      setAgentStatuses(prev =>
        prev.map(agent => {
          const isCompleted = agentWorkflow.includes(agent.technical_name)
          return {
            ...agent,
            status: isCompleted ? 'complete' : agent.status,
            message: isCompleted
              ? `✅ Completed! ${agent.what_i_do}`
              : agent.message,
          }
        }),
      )
    }
  }, [agentWorkflow])

  useEffect(() => {
    const words = studentWriting
      .trim()
      .split(/\s+/)
      .filter(word => word.length > 0)
    setWordCount(words.length)
  }, [studentWriting])

  // FIXED: Character management functions with useCallback and proper dependencies
  const handleCharacterChange = useCallback((index, field, value) => {
    setStoryData(prev => {
      const updatedCharacters = [...(prev.charactersList || [])];
      updatedCharacters[index] = {
        ...updatedCharacters[index],
        [field]: value,
      };
  
      return {
        ...prev,
        charactersList: updatedCharacters,
      };
    });
  }, [setStoryData]);

  // FIXED: Add character function with useCallback
  const addCharacter = useCallback(() => {
    setStoryData(prev => ({
      ...prev,
      charactersList: [
        ...(prev.charactersList || []),
        { id: generateId(), name: '', description: '' }
      ]
    }));
  }, [setStoryData]);

  // FIXED: Remove character function with useCallback
  const removeCharacter = useCallback((index) => {
    setStoryData(prev => ({
      ...prev,
      charactersList: prev.charactersList.filter((_, i) => i !== index)
    }));
  }, [setStoryData]);
  
  const handleSpecialElementChange = useCallback((element, isChecked) => {
    setStoryData(prev => {
      let newElements = [...(prev.specialElementsList || [])];
  
      if (isChecked && !newElements.includes(element)) {
        if (newElements.length < 3) {
          newElements.push(element);
        }
      } else if (!isChecked) {
        newElements = newElements.filter(el => el !== element);
      }
  
      return {
        ...prev,
        specialElementsList: newElements,
      };
    });
  }, [setStoryData]);
  
  const handleStudentWritingChange = useCallback(e => {
    setStudentWriting(e.target.value);
  }, []);

  const handleDownload = useCallback(downloadType => {
    alert(
      `📥 Downloading ${downloadType}...\n\nThis would generate a PDF containing:\n• Complete story (AI collaboration + your writing)\n• AI literacy learning insights\n• ${
        downloadType.includes('Teacher')
          ? 'AI education assessment rubric and standards alignment'
          : 'Reflection questions about AI collaboration and creative process'
      }`,
    )
  }, [])

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <StepChooseStory 
          storyData={storyData}
          books={books}
          setStoryData={setStoryData}
          setCurrentStep={setCurrentStep}
          aiEducationMode={aiEducationMode}
          setAiEducationMode={setAiEducationMode}
          agentStatuses={agentStatuses}
        />
      case 1:
        return <StepCustomize 
          storyData={storyData}
          storyOptions={storyOptions}
          setStoryData={setStoryData}
          setCurrentStep={setCurrentStep}
          aiEducationMode={aiEducationMode}
          agentStatuses={agentStatuses}
          handleCharacterChange={handleCharacterChange}
          addCharacter={addCharacter}
          removeCharacter={removeCharacter}
          handleSpecialElementChange={handleSpecialElementChange}
        />
      case 2:
        return <StepAiCollaboration 
          loading={loading}
          generatedStory={generatedStory}
          error={error}
          aiEducationMode={aiEducationMode}
          agentStatuses={agentStatuses}
          showProcessLearning={showProcessLearning}
          setShowProcessLearning={setShowProcessLearning}
          showAiInsights={showAiInsights}
          setShowAiInsights={setShowAiInsights}
          aiCollaborationInsights={aiCollaborationInsights}
          setCurrentStep={setCurrentStep}
          createStory={createStory}
        />
      case 3:
        return <StepWriteAndReflect 
          generatedStory={generatedStory}
          aiEducationMode={aiEducationMode}
          studentWriting={studentWriting}
          handleStudentWritingChange={handleStudentWritingChange}
          wordCount={wordCount}
          handleDownload={handleDownload}
          regenerateStory={regenerateStory}
          resetApp={resetApp}
          loading={loading}
        />
      default:
        return <StepChooseStory 
          storyData={storyData}
          books={books}
          setStoryData={setStoryData}
          setCurrentStep={setCurrentStep}
          aiEducationMode={aiEducationMode}
          setAiEducationMode={setAiEducationMode}
          agentStatuses={agentStatuses}
        />
    }
  }

  return (
    <div className='build-a-story-container'>
      <div className='build-a-story-content'>
        {/* Enhanced Header with AI Education Focus */}
        <div className='build-a-story-header'>
          <h1 className='text-4xl font-bold mb-3 drop-shadow-lg'>
            📚🤖 BUILD-A-STORY: AI Collaboration Lab 🤖📚
          </h1>
          <p className='text-xl opacity-90'>
            Learn AI literacy by collaborating with an AI team to create amazing
            stories!
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

          {/* AI Collaboration Progress - Show during steps 1+ */}
          {currentStep >= 1 && aiEducationMode && (
            <div className='ai-collaboration-progress'>
              <h4 className='ai-progress-title'>
                🤖 AI Team Collaboration Progress:
              </h4>
              <div className='ai-progress-grid'>
                {agentStatuses.slice(0, 4).map((agent, index) => (
                  <div key={index} className='ai-progress-item'>
                    <div className={`ai-progress-avatar ${agent.status}`}>
                      {agent.status === 'complete'
                        ? '✅'
                        : agent.status === 'working'
                        ? '⚡'
                        : agent.avatar}
                    </div>
                    <div className='flex-1'>
                      <div className='ai-progress-name'>{agent.name}</div>
                      <div className='ai-progress-message'>
                        {agent.status === 'complete'
                          ? '✅ Contribution complete!'
                          : agent.status === 'working'
                          ? '⚡ Working on your story...'
                          : 'Standing by for collaboration...'}
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

export default React.memo(BuildAStoryInterface)
