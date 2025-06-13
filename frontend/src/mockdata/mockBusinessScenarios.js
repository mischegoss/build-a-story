// Mock business scenarios for CX optimization
export const mockBusinessScenarios = {
  scenarios: [
    {
      title: 'E-commerce Customer Journey',
      industry: 'Retail',
      description:
        'Online shopping experience from product discovery to delivery',
      complexity: 'Medium',
      common_touchpoints: [
        'Website',
        'Mobile App',
        'Email',
        'Customer Service',
      ],
      typical_personas: [
        'Busy Parent',
        'Price-Conscious Shopper',
        'Tech-Savvy Millennial',
      ],
      key_metrics: [
        'Conversion Rate',
        'Cart Abandonment',
        'Customer Satisfaction',
      ],
      adaptable_elements: {
        touchpoint_flexibility: 'high',
        persona_flexibility: 'high',
        process_flexibility: 'high',
      },
    },
    {
      title: 'SaaS Customer Onboarding',
      industry: 'Technology',
      description: 'Software-as-a-Service user activation and feature adoption',
      complexity: 'High',
      common_touchpoints: [
        'Web App',
        'Email',
        'In-App Messages',
        'Support Chat',
      ],
      typical_personas: [
        'Business Professional',
        'Team Leader',
        'Individual Contributor',
      ],
      key_metrics: ['Time to Value', 'Feature Adoption', 'Activation Rate'],
      adaptable_elements: {
        touchpoint_flexibility: 'medium',
        persona_flexibility: 'medium',
        process_flexibility: 'high',
      },
    },
    {
      title: 'Restaurant Service Experience',
      industry: 'Hospitality',
      description: 'Dining experience from reservation to payment',
      complexity: 'Medium',
      common_touchpoints: ['Phone', 'Website', 'In-Person', 'Mobile App'],
      typical_personas: [
        'Date Night Couple',
        'Business Lunch',
        'Family Celebration',
      ],
      key_metrics: ['Wait Time', 'Service Quality', 'Repeat Visits'],
      adaptable_elements: {
        touchpoint_flexibility: 'medium',
        persona_flexibility: 'high',
        process_flexibility: 'medium',
      },
    },
    {
      title: 'Healthcare Patient Journey',
      industry: 'Healthcare',
      description:
        'Patient experience from appointment booking to follow-up care',
      complexity: 'High',
      common_touchpoints: ['Phone', 'Patient Portal', 'In-Person', 'Email'],
      typical_personas: [
        'Senior Patient',
        'Busy Professional',
        'Concerned Parent',
      ],
      key_metrics: ['Patient Satisfaction', 'Wait Time', 'Treatment Adherence'],
      adaptable_elements: {
        touchpoint_flexibility: 'low',
        persona_flexibility: 'medium',
        process_flexibility: 'medium',
      },
    },
  ],
}
