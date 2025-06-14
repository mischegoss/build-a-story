// Mock customer behavior data for different business scenarios
export const mockCustomerBehaviorData = {
  'E-commerce Customer Journey': {
    funnel_metrics: {
      homepage_visits: 125000,
      product_page_views: 87500,
      cart_additions: 35000,
      checkout_starts: 28000,
      completed_purchases: 21000,
      conversion_rate: '16.8%',
      cart_abandonment_rate: '25%',
    },
    user_segments: {
      new_users: {
        percentage: 45,
        avg_session_duration: '3:24',
        bounce_rate: '68%',
      },
      returning_customers: {
        percentage: 35,
        avg_session_duration: '5:47',
        bounce_rate: '42%',
      },
      high_value_users: {
        percentage: 12,
        avg_session_duration: '8:15',
        bounce_rate: '28%',
      },
      parents: {
        percentage: 28,
        avg_session_duration: '4:33',
        bounce_rate: '55%',
      },
    },
    drop_off_points: [
      { step: 'Product Search', drop_off_rate: '34%', users_affected: 42500 },
      { step: 'Add to Cart', drop_off_rate: '60%', users_affected: 52500 },
      { step: 'Checkout Process', drop_off_rate: '25%', users_affected: 7000 },
      { step: 'Payment Entry', drop_off_rate: '15%', users_affected: 4200 },
    ],
    feature_adoption: {
      search_filters: '67%',
      product_recommendations: '45%',
      wishlist: '23%',
      reviews_section: '78%',
      quick_checkout: '34%',
    },
    device_usage: {
      mobile: '58%',
      desktop: '35%',
      tablet: '7%',
    },
    peak_usage_times: ['12:00-13:00', '19:00-21:00', 'Saturday 14:00-16:00'],
  },

  'SaaS Customer Onboarding': {
    activation_metrics: {
      trial_signups: 8500,
      completed_onboarding: 6800,
      activated_users: 5100,
      converted_to_paid: 1785,
      activation_rate: '60%',
      trial_to_paid_rate: '21%',
    },
    user_segments: {
      new_users: {
        percentage: 52,
        time_to_value: '8.3 days',
        feature_adoption: '34%',
      },
      returning_customers: {
        percentage: 28,
        time_to_value: '2.1 days',
        feature_adoption: '78%',
      },
      high_value_users: {
        percentage: 15,
        time_to_value: '1.2 days',
        feature_adoption: '91%',
      },
      parents: {
        percentage: 22,
        time_to_value: '6.7 days',
        feature_adoption: '45%',
      },
    },
    onboarding_funnel: [
      { step: 'Account Creation', completion_rate: '94%', avg_time: '2:15' },
      { step: 'Profile Setup', completion_rate: '78%', avg_time: '4:32' },
      { step: 'First Feature Use', completion_rate: '65%', avg_time: '8:45' },
      { step: 'Integration Setup', completion_rate: '42%', avg_time: '15:23' },
      { step: 'Team Invitation', completion_rate: '38%', avg_time: '3:12' },
    ],
    feature_usage_30_days: {
      dashboard: '89%',
      reports: '67%',
      integrations: '34%',
      advanced_features: '23%',
      mobile_app: '45%',
    },
    support_interactions: {
      help_docs_views: 15600,
      chat_sessions: 2340,
      video_tutorials: 8900,
      support_tickets: 890,
    },
  },

  'Restaurant Service Experience': {
    service_metrics: {
      reservation_attempts: 4200,
      successful_bookings: 3780,
      walk_in_customers: 2100,
      total_covers: 5880,
      booking_success_rate: '90%',
      table_turnover_rate: '2.3x',
    },
    user_segments: {
      new_users: {
        percentage: 35,
        avg_wait_time: '18 mins',
        satisfaction: '7.2/10',
      },
      returning_customers: {
        percentage: 45,
        avg_wait_time: '12 mins',
        satisfaction: '8.4/10',
      },
      high_value_users: {
        percentage: 15,
        avg_wait_time: '8 mins',
        satisfaction: '9.1/10',
      },
      parents: {
        percentage: 30,
        avg_wait_time: '15 mins',
        satisfaction: '7.8/10',
      },
    },
    service_touchpoints: [
      {
        touchpoint: 'Online Reservation',
        usage: '68%',
        satisfaction: '8.1/10',
      },
      { touchpoint: 'Phone Booking', usage: '22%', satisfaction: '7.8/10' },
      { touchpoint: 'Walk-in', usage: '35%', satisfaction: '7.5/10' },
      { touchpoint: 'Mobile App', usage: '45%', satisfaction: '8.3/10' },
    ],
    wait_time_analysis: {
      average_wait: '14 minutes',
      peak_hours_wait: '22 minutes',
      off_peak_wait: '8 minutes',
      weekend_wait: '18 minutes',
    },
    payment_methods: {
      credit_card: '78%',
      mobile_payment: '15%',
      cash: '7%',
    },
  },

  'Healthcare Patient Journey': {
    patient_flow: {
      appointment_requests: 3200,
      scheduled_appointments: 2880,
      completed_visits: 2592,
      no_shows: 288,
      scheduling_success_rate: '90%',
      completion_rate: '81%',
    },
    user_segments: {
      new_users: {
        percentage: 25,
        avg_booking_time: '4.2 days',
        portal_usage: '34%',
      },
      returning_customers: {
        percentage: 55,
        avg_booking_time: '2.1 days',
        portal_usage: '67%',
      },
      high_value_users: {
        percentage: 12,
        avg_booking_time: '1.3 days',
        portal_usage: '89%',
      },
      parents: {
        percentage: 35,
        avg_booking_time: '3.8 days',
        portal_usage: '45%',
      },
    },
    digital_adoption: [
      { feature: 'Online Scheduling', adoption: '72%', satisfaction: '8.4/10' },
      { feature: 'Patient Portal', adoption: '58%', satisfaction: '7.9/10' },
      { feature: 'Telehealth', adoption: '34%', satisfaction: '8.7/10' },
      { feature: 'Mobile App', adoption: '41%', satisfaction: '8.1/10' },
    ],
    wait_times: {
      appointment_booking: '3.2 days average',
      check_in_process: '12 minutes',
      provider_wait: '18 minutes',
      checkout_process: '8 minutes',
    },
    communication_preferences: {
      email: '67%',
      text_message: '45%',
      phone_call: '23%',
      patient_portal: '38%',
    },
  },
}

// Mock data insights based on KPI focus
export const kpiInsights = {
  task_abandonment: {
    current_rate: '35%',
    industry_benchmark: '28%',
    key_factors: [
      'Complex navigation',
      'Too many form fields',
      'Unclear next steps',
    ],
    quick_wins: [
      'Simplify checkout flow',
      'Add progress indicators',
      'Reduce required fields',
    ],
  },
  nps_score: {
    current_score: '7.2',
    industry_benchmark: '8.1',
    key_factors: [
      'Response time',
      'Feature usability',
      'Customer support quality',
    ],
    quick_wins: [
      'Improve response times',
      'Streamline key features',
      'Enhance help documentation',
    ],
  },
  conversion_rate: {
    current_rate: '16.8%',
    industry_benchmark: '22.3%',
    key_factors: ['Cart abandonment', 'Payment friction', 'Trust indicators'],
    quick_wins: [
      'Optimize checkout',
      'Add security badges',
      'Implement exit-intent popups',
    ],
  },
  app_rating: {
    current_rating: '4.2',
    industry_benchmark: '4.6',
    key_factors: ['App crashes', 'Feature discovery', 'Loading speeds'],
    quick_wins: [
      'Fix stability issues',
      'Improve onboarding',
      'Optimize performance',
    ],
  },
}
