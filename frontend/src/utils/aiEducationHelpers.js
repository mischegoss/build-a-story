// src/utils/aiEducationHelpers.js
// Utility functions for AI education features

/**
 * Format agent workflow for educational display
 */
export const formatAgentWorkflow = workflow => {
  const agentDescriptions = {
    enterprise_intake_coordinator: {
      name: 'Project Manager',
      action:
        'Validated your creative request for safety and educational standards',
      learning:
        'AI systems always validate inputs before processing - like a quality control checkpoint!',
    },
    literature_research_intelligence: {
      name: 'Book Expert',
      action:
        'Analyzed the original story to understand themes, characters, and adaptation possibilities',
      learning:
        'AI can analyze complex literature and identify patterns humans might miss!',
    },
    compliance_standards_validator: {
      name: 'Learning Coach',
      action:
        'Ensured your story meets educational standards and learning objectives',
      learning:
        'AI can automatically check content against thousands of educational requirements!',
    },
    enterprise_content_creator: {
      name: 'Story Writer',
      action:
        'Created your story beginning by combining research with your creative vision',
      learning:
        'This shows AI creativity - following rules while generating something completely new!',
    },
    educational_materials_engineer: {
      name: 'Materials Creator',
      action:
        'Designed discussion questions and learning activities tailored to your story',
      learning:
        'AI can create personalized educational experiences based on your specific content!',
    },
    enterprise_quality_assurance: {
      name: 'Quality Checker',
      action:
        'Reviewed everything to ensure it meets high standards for educational use',
      learning:
        'Multiple AI checkpoints ensure quality - like having several expert reviewers!',
    },
  }

  return workflow.map(
    agentTechnicalName =>
      agentDescriptions[agentTechnicalName] || {
        name: 'Unknown Agent',
        action: 'Completed processing',
        learning: 'AI systems work together in specialized teams!',
      },
  )
}

/**
 * Generate AI collaboration insights for student reflection
 */
export const generateCollaborationInsights = (
  storyData,
  generatedStory,
  agentWorkflow,
) => {
  return {
    collaboration_highlights: [
      `🎯 Your Vision: You wanted ${storyData.setting} with ${storyData.characters} - the AI team brought this to life!`,
      `📚 Literary Preservation: The AI kept the heart of the original story while adapting it to your setting.`,
      `🎓 Educational Value: Your story now teaches ${
        storyData.theme || 'important life lessons'
      } in a modern context.`,
      `✨ Creative Enhancement: The AI added professional storytelling techniques to your creative ideas.`,
    ],
    process_learning: [
      'Each AI agent specialized in different tasks - like a real professional team!',
      'Multiple quality checks ensured your story meets educational and creative standards.',
      'Your creativity directed the entire process - the AI tools followed YOUR vision.',
      'Human oversight and AI capability combined to create something neither could make alone.',
    ],
    critical_thinking_prompts: [
      'What surprised you most about how the AI team worked together?',
      'Which parts of the story feel most like "you" and which feel most like "AI"?',
      'How did the AI enhance your original ideas without replacing them?',
      'What would you want to direct differently in the AI process next time?',
    ],
  }
}

/**
 * Calculate AI literacy learning metrics
 */
export const calculateLearningMetrics = studentInteractions => {
  return {
    ai_collaboration_score: calculateCollaborationScore(studentInteractions),
    critical_thinking_engagement:
      calculateCriticalThinking(studentInteractions),
    creative_agency_maintained: calculateCreativeAgency(studentInteractions),
    ai_understanding_demonstrated:
      calculateAIUnderstanding(studentInteractions),
  }
}

// Helper functions for learning metrics
const calculateCollaborationScore = interactions => {
  // Based on how effectively student directed AI team
  let score = 0
  if (interactions.clear_instructions) score += 25
  if (interactions.appropriate_requests) score += 25
  if (interactions.iterative_feedback) score += 25
  if (interactions.final_satisfaction) score += 25
  return score
}

const calculateCriticalThinking = interactions => {
  // Based on reflection responses and process questioning
  let score = 0
  if (interactions.reflection_responses?.length > 0) score += 30
  if (interactions.process_questions_asked > 0) score += 30
  if (interactions.ai_output_evaluation) score += 40
  return score
}

const calculateCreativeAgency = interactions => {
  // Based on how much student creativity vs AI generation
  let score = 0
  if (interactions.original_ideas_contributed) score += 40
  if (interactions.ai_suggestions_evaluated) score += 30
  if (interactions.personal_voice_maintained) score += 30
  return score
}

const calculateAIUnderstanding = interactions => {
  // Based on demonstrated understanding of AI capabilities
  let score = 0
  if (interactions.ai_limitations_recognized) score += 25
  if (interactions.ai_strengths_identified) score += 25
  if (interactions.collaborative_process_understood) score += 25
  if (interactions.ethical_considerations_discussed) score += 25
  return score
}

/**
 * Format story content for educational display
 */
export const formatStoryForEducation = (storyContent, metadata) => {
  return {
    narrative_text: storyContent,
    word_count: storyContent.split(' ').length,
    reading_level: metadata?.reading_level || 'Middle School',
    educational_elements: extractEducationalElements(storyContent),
    ai_contributions: identifyAIContributions(storyContent, metadata),
    student_opportunities: identifyStudentOpportunities(storyContent),
  }
}

const extractEducationalElements = content => {
  // Identify educational themes, vocabulary, discussion points
  return {
    themes: ['adventure', 'friendship', 'problem-solving'],
    vocabulary_words: extractAdvancedVocabulary(content),
    discussion_points: generateDiscussionPoints(content),
  }
}

const identifyAIContributions = (content, metadata) => {
  // Highlight what the AI contributed to the story
  return {
    story_structure: 'Professional narrative arc with clear beginning',
    literary_devices: 'Descriptive language and character development',
    educational_alignment: 'Content appropriate for 7th grade reading level',
    technical_quality: 'Grammar, pacing, and readability optimization',
  }
}

const identifyStudentOpportunities = content => {
  // Suggest where students can continue or modify
  return {
    character_development: 'Add more personality and backstory to characters',
    plot_advancement: 'Decide what happens next in the adventure',
    descriptive_details: 'Add sensory details about the setting',
    dialogue_creation: 'Write conversations between characters',
  }
}

// src/utils/apiHelpers.js
// API integration utilities

/**
 * Enhanced API request with AI education tracking
 */
export const createStoryWithEducation = async (storyData, apiBase) => {
  const requestData = {
    ...storyData,
    enable_ai_education_mode: true,
    priority: 'STANDARD', // Could be EXPEDITED for demo purposes
    requestor_id: generateUniqueRequestorId(),
  }

  try {
    const response = await fetch(`${apiBase}/api/v1/enterprise/create-story`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    return {
      success: true,
      story: data.enterprise_response,
      projectId: data.enterprise_response?.project_id,
      aiInsights: data.ai_collaboration_education,
      workflowAudit: data.workflow_audit,
      processingTime: data.enterprise_response?.processing_time_seconds,
    }
  } catch (error) {
    console.error('Story creation failed:', error)
    return {
      success: false,
      error: error.message,
    }
  }
}

/**
 * Fetch AI collaboration insights for educational display
 */
export const fetchAIInsights = async (projectId, apiBase) => {
  try {
    const response = await fetch(
      `${apiBase}/api/v1/enterprise/ai-education/insights/${projectId}`,
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return {
      success: true,
      insights: data.ai_collaboration_learning,
      educationalValue: data.educational_value,
    }
  } catch (error) {
    console.error('Failed to fetch AI insights:', error)
    return {
      success: false,
      error: error.message,
    }
  }
}

/**
 * Get enterprise health and metrics
 */
export const getEnterpriseHealth = async apiBase => {
  try {
    const response = await fetch(`${apiBase}/api/v1/enterprise/health`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Health check failed:', error)
    return { status: 'unhealthy', error: error.message }
  }
}

/**
 * Expected API response structure for frontend integration
 */
export const EXPECTED_API_STRUCTURE = {
  enterprise_response: {
    project_id: 'STY-20250612-abc12345',
    processing_time_seconds: 45.2,
    quality_certification: 'CERTIFIED_FOR_DEPLOYMENT',
    stakeholder_packages: {
      student_package: {
        adapted_story_content: 'Story text here...',
        interactive_learning_activities: ['Activity 1', 'Activity 2'],
        self_assessment_resources: ['Reflection questions'],
        vocabulary_development_support: ['Term definitions'],
      },
      educator_package: {
        complete_content_suite: 'Full story and materials',
        implementation_methodology: ['Teaching strategies'],
        assessment_and_evaluation_tools: ['Rubrics'],
        curriculum_integration_guidance: ['Standards alignment'],
        professional_development_support: ['Training materials'],
      },
    },
    content_metrics: {
      story_content: {
        narrative_text: 'The adapted story text...',
        word_count: 287,
        reading_level: 'Middle School',
        educational_elements: ['Character development', 'Setting analysis'],
      },
    },
  },
  ai_collaboration_education: {
    ai_literacy_lessons: ['How AI teams work', 'Specialization benefits'],
    critical_thinking_points: ['Evaluation criteria', 'Process analysis'],
    collaboration_skills: ['Communication', 'Direction-giving'],
    ethical_considerations: ['Attribution', 'Human creativity'],
  },
  workflow_audit: {
    agents_executed: [
      'enterprise_intake_coordinator',
      'literature_research_intelligence',
      'compliance_standards_validator',
      'enterprise_content_creator',
      'educational_materials_engineer',
      'enterprise_quality_assurance',
    ],
    processing_priority: 'STANDARD',
    compliance_validated: true,
    enterprise_certified: true,
    ai_education_insights_provided: true,
  },
}

// Utility functions
const generateUniqueRequestorId = () => {
  return `student_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

const extractAdvancedVocabulary = content => {
  // Simple vocabulary extraction - in real implementation, use NLP
  const words = content.split(' ')
  return words.filter(word => word.length > 6).slice(0, 10)
}

const generateDiscussionPoints = content => {
  // Generate discussion questions based on content
  return [
    'What motivates the main character in this story?',
    "How does the setting affect the story's mood?",
    'What challenges do you think the character will face?',
  ]
}

// src/components/AIEducationComponents.js
// Reusable components for AI education features

import React from 'react'

export const AIProcessExplainer = ({ agentName, explanation, isActive }) => (
  <div className={`ai-process-explainer ${isActive ? 'active' : ''}`}>
    <h4>🤖 {agentName} at Work</h4>
    <p>{explanation}</p>
    {isActive && <div className='thinking-indicator'>💭 Thinking...</div>}
  </div>
)

export const LearningMomentCard = ({ title, content, icon }) => (
  <div className='learning-moment-card'>
    <div className='learning-icon'>{icon}</div>
    <div className='learning-content'>
      <h5>{title}</h5>
      <p>{content}</p>
    </div>
  </div>
)

export const ReflectionPrompt = ({ question, onResponse }) => (
  <div className='reflection-prompt'>
    <h5>🤔 Think About This:</h5>
    <p>{question}</p>
    <textarea
      placeholder='Share your thoughts...'
      onChange={e => onResponse(question, e.target.value)}
      className='reflection-textarea'
    />
  </div>
)

export const AICollaborationTimeline = ({ steps }) => (
  <div className='ai-timeline'>
    <h4>🔄 How We Collaborated:</h4>
    <div className='timeline-steps'>
      {steps.map((step, index) => (
        <div key={index} className='timeline-step'>
          <div className='step-number'>{index + 1}</div>
          <div className='step-content'>
            <strong>{step.agent}:</strong> {step.action}
          </div>
        </div>
      ))}
    </div>
  </div>
)

// Export everything for easy import
export {
  formatAgentWorkflow,
  generateCollaborationInsights,
  calculateLearningMetrics,
  formatStoryForEducation,
  createStoryWithEducation,
  fetchAIInsights,
  getEnterpriseHealth,
  EXPECTED_API_STRUCTURE,
}
