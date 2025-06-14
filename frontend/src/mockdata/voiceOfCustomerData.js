// Mock voice of customer data for different business scenarios
export const mockVoiceOfCustomerData = {
  'E-commerce Customer Journey': {
    customer_reviews: [
      {
        rating: 2,
        comment:
          'Checkout process is way too complicated. Took me 10 minutes just to buy one item.',
        segment: 'new_users',
        theme: 'checkout_friction',
      },
      {
        rating: 5,
        comment:
          'Love the product recommendations! Found exactly what I needed for my kids.',
        segment: 'parents',
        theme: 'personalization',
      },
      {
        rating: 1,
        comment:
          'Website crashed during payment. Lost my entire cart and had to start over.',
        segment: 'returning_customers',
        theme: 'technical_issues',
      },
      {
        rating: 4,
        comment:
          'Great selection but wish the search was better. Hard to find specific items.',
        segment: 'new_users',
        theme: 'search_functionality',
      },
      {
        rating: 5,
        comment:
          'VIP checkout is amazing - so fast and easy. Worth the membership fee.',
        segment: 'high_value_users',
        theme: 'premium_experience',
      },
      {
        rating: 3,
        comment:
          'Good products but the mobile site is terrible. Desktop works fine though.',
        segment: 'parents',
        theme: 'mobile_experience',
      },
    ],
    survey_responses: [
      {
        question: 'What frustrates you most about shopping here?',
        response: 'Too many steps to checkout',
        sentiment: 'negative',
        frequency: 234,
      },
      {
        question: 'What do you love about our service?',
        response: 'Fast shipping and good prices',
        sentiment: 'positive',
        frequency: 567,
      },
      {
        question: 'What would improve your experience?',
        response: 'Better mobile app',
        sentiment: 'neutral',
        frequency: 189,
      },
      {
        question: 'How likely are you to recommend us?',
        response: 'Very likely - great customer service',
        sentiment: 'positive',
        frequency: 445,
      },
      {
        question: 'What almost made you leave our site?',
        response: 'Confusing navigation menu',
        sentiment: 'negative',
        frequency: 156,
      },
    ],
    support_ticket_themes: [
      {
        theme: 'Checkout Issues',
        count: 342,
        avg_resolution: '2.3 hours',
        satisfaction: '6.8/10',
      },
      {
        theme: 'Payment Problems',
        count: 267,
        avg_resolution: '1.8 hours',
        satisfaction: '7.2/10',
      },
      {
        theme: 'Product Questions',
        count: 189,
        avg_resolution: '45 minutes',
        satisfaction: '8.4/10',
      },
      {
        theme: 'Shipping Inquiries',
        count: 156,
        avg_resolution: '1.2 hours',
        satisfaction: '8.1/10',
      },
      {
        theme: 'Account Issues',
        count: 98,
        avg_resolution: '3.1 hours',
        satisfaction: '6.5/10',
      },
    ],
    sentiment_analysis: {
      overall_sentiment: '68% positive, 22% neutral, 10% negative',
      trending_topics: [
        'fast shipping',
        'checkout problems',
        'mobile issues',
        'great customer service',
      ],
      emotion_breakdown: {
        satisfaction: '45%',
        frustration: '28%',
        delight: '15%',
        confusion: '12%',
      },
    },
  },

  'SaaS Customer Onboarding': {
    customer_reviews: [
      {
        rating: 2,
        comment:
          'Onboarding was overwhelming. Too many features thrown at me at once.',
        segment: 'new_users',
        theme: 'onboarding_complexity',
      },
      {
        rating: 5,
        comment:
          'Perfect for our team! The collaboration features are exactly what we needed.',
        segment: 'high_value_users',
        theme: 'team_collaboration',
      },
      {
        rating: 3,
        comment:
          'Good software but took forever to figure out the basics. Needs better tutorials.',
        segment: 'new_users',
        theme: 'learning_curve',
      },
      {
        rating: 4,
        comment:
          'Love the automation features but the setup was confusing initially.',
        segment: 'returning_customers',
        theme: 'feature_complexity',
      },
      {
        rating: 1,
        comment:
          "Tried for 2 weeks and still can't get basic workflows working. Too complicated.",
        segment: 'new_users',
        theme: 'usability_issues',
      },
      {
        rating: 5,
        comment:
          'Game-changer for busy parents like me. Saves hours of manual work every week.',
        segment: 'parents',
        theme: 'time_saving',
      },
    ],
    survey_responses: [
      {
        question: 'What was hardest about getting started?',
        response: 'Understanding which features to use first',
        sentiment: 'negative',
        frequency: 156,
      },
      {
        question: 'What made you stick with our product?',
        response: 'Excellent customer support team',
        sentiment: 'positive',
        frequency: 289,
      },
      {
        question: 'What would make onboarding easier?',
        response: 'Step-by-step guided setup',
        sentiment: 'neutral',
        frequency: 201,
      },
      {
        question: 'How do you feel about the learning curve?',
        response: 'Steep but worth it once you get it',
        sentiment: 'neutral',
        frequency: 178,
      },
      {
        question: 'What almost made you cancel?',
        response: "Couldn't find the features I needed",
        sentiment: 'negative',
        frequency: 134,
      },
    ],
    support_ticket_themes: [
      {
        theme: 'Feature Setup',
        count: 445,
        avg_resolution: '4.2 hours',
        satisfaction: '7.8/10',
      },
      {
        theme: 'Integration Help',
        count: 298,
        avg_resolution: '6.1 hours',
        satisfaction: '8.2/10',
      },
      {
        theme: 'Account Configuration',
        count: 234,
        avg_resolution: '2.8 hours',
        satisfaction: '7.5/10',
      },
      {
        theme: 'Training Requests',
        count: 167,
        avg_resolution: '1.5 hours',
        satisfaction: '8.9/10',
      },
      {
        theme: 'Billing Questions',
        count: 89,
        avg_resolution: '1.1 hours',
        satisfaction: '8.4/10',
      },
    ],
    user_interviews: [
      {
        quote:
          'I wish someone had told me about the quick setup wizard on day one',
        role: 'Product Manager',
        company_size: '50-100',
      },
      {
        quote:
          'The advanced features are powerful but the basics should be more obvious',
        role: 'Marketing Director',
        company_size: '10-50',
      },
      {
        quote:
          'Our team loves it now, but the first month was really frustrating',
        role: 'Operations Lead',
        company_size: '100-500',
      },
    ],
  },

  'Restaurant Service Experience': {
    customer_reviews: [
      {
        rating: 5,
        comment:
          'Perfect date night spot! Great ambiance and the online booking system works perfectly.',
        segment: 'high_value_users',
        theme: 'booking_experience',
      },
      {
        rating: 2,
        comment:
          'Had a reservation but still waited 25 minutes. Very frustrating with hungry kids.',
        segment: 'parents',
        theme: 'wait_times',
      },
      {
        rating: 4,
        comment:
          'Food was excellent but the ordering process was confusing. Server was helpful though.',
        segment: 'new_users',
        theme: 'ordering_process',
      },
      {
        rating: 1,
        comment:
          'Tried calling for 20 minutes to make a reservation. Phone system is terrible.',
        segment: 'new_users',
        theme: 'phone_booking',
      },
      {
        rating: 5,
        comment:
          'Always a great experience. Love that they remember our usual table and preferences.',
        segment: 'returning_customers',
        theme: 'personalized_service',
      },
      {
        rating: 3,
        comment:
          'Good food but paying took forever. Need better payment options.',
        segment: 'parents',
        theme: 'payment_experience',
      },
    ],
    survey_responses: [
      {
        question: 'What would improve your dining experience?',
        response: 'Faster seating even with reservations',
        sentiment: 'negative',
        frequency: 167,
      },
      {
        question: 'How was your reservation process?',
        response: 'Easy online booking, worked great',
        sentiment: 'positive',
        frequency: 234,
      },
      {
        question: 'What frustrated you during your visit?',
        response: 'Long wait times despite booking ahead',
        sentiment: 'negative',
        frequency: 145,
      },
      {
        question: 'What do you love about dining here?',
        response: 'Excellent food and friendly staff',
        sentiment: 'positive',
        frequency: 289,
      },
      {
        question: 'How likely are you to return?',
        response: 'Definitely, but hoping wait times improve',
        sentiment: 'neutral',
        frequency: 178,
      },
    ],
    feedback_themes: [
      {
        theme: 'Wait Time Issues',
        mentions: 234,
        sentiment: 'negative',
        impact: 'high',
      },
      {
        theme: 'Food Quality',
        mentions: 445,
        sentiment: 'positive',
        impact: 'high',
      },
      {
        theme: 'Service Quality',
        mentions: 312,
        sentiment: 'positive',
        impact: 'medium',
      },
      {
        theme: 'Booking Experience',
        mentions: 156,
        sentiment: 'positive',
        impact: 'medium',
      },
      {
        theme: 'Payment Process',
        mentions: 89,
        sentiment: 'negative',
        impact: 'low',
      },
    ],
    online_reviews_summary: {
      google_rating: '4.2/5 (1,245 reviews)',
      yelp_rating: '4.0/5 (892 reviews)',
      opentable_rating: '4.3/5 (567 reviews)',
      common_complaints: [
        'long wait times',
        'noisy environment',
        'expensive prices',
      ],
      common_praises: ['excellent food', 'great service', 'perfect atmosphere'],
    },
  },

  'Healthcare Patient Journey': {
    patient_feedback: [
      {
        rating: 5,
        comment:
          'Online scheduling is a lifesaver! No more phone tag to book appointments.',
        segment: 'returning_customers',
        theme: 'digital_convenience',
      },
      {
        rating: 2,
        comment:
          'Portal is confusing and I can never find my test results. Need better organization.',
        segment: 'new_users',
        theme: 'portal_usability',
      },
      {
        rating: 4,
        comment:
          'Great care but the check-in process takes forever. Too much paperwork.',
        segment: 'parents',
        theme: 'check_in_process',
      },
      {
        rating: 1,
        comment:
          'Waited 3 weeks for an appointment then doctor was 45 minutes late. Unacceptable.',
        segment: 'new_users',
        theme: 'wait_times',
      },
      {
        rating: 5,
        comment:
          'Telehealth visits are perfect for quick consultations. Saves so much time.',
        segment: 'high_value_users',
        theme: 'telehealth_experience',
      },
      {
        rating: 3,
        comment:
          'Good medical care but communication about treatment plans could be clearer.',
        segment: 'returning_customers',
        theme: 'communication',
      },
    ],
    survey_responses: [
      {
        question: "What's most frustrating about scheduling?",
        response: 'Limited appointment availability',
        sentiment: 'negative',
        frequency: 203,
      },
      {
        question: 'How do you prefer to communicate with us?',
        response: 'Text messages for reminders and updates',
        sentiment: 'neutral',
        frequency: 234,
      },
      {
        question: 'What would improve your experience?',
        response: 'Shorter wait times in the office',
        sentiment: 'negative',
        frequency: 189,
      },
      {
        question: 'How satisfied are you with our digital tools?',
        response: 'Portal is helpful but could be more user-friendly',
        sentiment: 'neutral',
        frequency: 156,
      },
      {
        question: 'What do you value most about our care?',
        response: 'Thorough and compassionate doctors',
        sentiment: 'positive',
        frequency: 345,
      },
    ],
    patient_complaints: [
      {
        category: 'Scheduling Issues',
        count: 156,
        resolution_time: '24 hours',
        satisfaction: '6.8/10',
      },
      {
        category: 'Wait Times',
        count: 134,
        resolution_time: 'immediate',
        satisfaction: '5.9/10',
      },
      {
        category: 'Billing Problems',
        count: 89,
        resolution_time: '72 hours',
        satisfaction: '7.2/10',
      },
      {
        category: 'Portal Access',
        count: 67,
        resolution_time: '4 hours',
        satisfaction: '8.1/10',
      },
      {
        category: 'Communication',
        count: 45,
        resolution_time: '12 hours',
        satisfaction: '7.8/10',
      },
    ],
    satisfaction_scores: {
      overall_satisfaction: '7.8/10',
      provider_quality: '8.9/10',
      appointment_scheduling: '6.5/10',
      office_wait_times: '5.8/10',
      staff_friendliness: '8.4/10',
      facility_cleanliness: '8.7/10',
    },
  },
}

// Common feedback patterns across all scenarios
export const feedbackPatterns = {
  pain_point_indicators: [
    'frustrated',
    'confusing',
    'complicated',
    'took forever',
    'terrible',
    'awful',
    'waste of time',
    'gave up',
    'almost left',
    'disappointed',
    'annoying',
  ],
  delight_indicators: [
    'amazing',
    'perfect',
    'love it',
    'exactly what I needed',
    'game-changer',
    'exceeded expectations',
    'highly recommend',
    'fantastic',
    'brilliant',
  ],
  urgency_indicators: [
    'critical',
    'urgent',
    'immediately',
    'ASAP',
    'blocking',
    "can't continue",
    'show-stopper',
    'major issue',
    'seriously considering leaving',
  ],
}
