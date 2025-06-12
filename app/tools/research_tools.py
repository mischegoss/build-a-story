
import json
from typing import Dict, List, Optional, Any
from datetime import datetime
import os

def load_books_database():
    """Load the approved books database"""
    try:
        books_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'books.json')
        with open(books_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        return {"books": []}

def get_book_details(book_title: str) -> Dict[str, Any]:
    """
    Tool: Retrieve complete information about a book from approved collection.
    
    Args:
        book_title: Title of the book to retrieve (can be partial match)
        
    Returns:
        Complete book data including all literary elements and metadata
    """
    books_data = load_books_database()
    
    # Search for book by title (case-insensitive, partial match)
    for book in books_data.get('books', []):
        if book_title.lower() in book['title'].lower():
            return {
                'status': 'found',
                'book_data': book,
                'retrieval_timestamp': datetime.now().isoformat(),
                'analysis_ready': True
            }
    
    # If exact match not found, try author search
    for book in books_data.get('books', []):
        if book_title.lower() in f"{book['title']} by {book['author']}".lower():
            return {
                'status': 'found',
                'book_data': book,
                'retrieval_timestamp': datetime.now().isoformat(),
                'analysis_ready': True
            }
    
    return {
        'status': 'not_found',
        'error': f"Book '{book_title}' not found in approved collection",
        'available_books': [f"{book['title']} by {book['author']}" for book in books_data.get('books', [])]
    }

def analyze_story_elements(book_data: Dict, student_modifications: Dict) -> Dict[str, Any]:
    """
    Tool: Perform detailed literary analysis and modification compatibility check.
    
    Args:
        book_data: Complete book information from get_book_details
        student_modifications: Student's requested changes (setting, characters, etc.)
        
    Returns:
        Comprehensive analysis of story elements and modification compatibility
    """
    if book_data.get('status') != 'found':
        return {'status': 'error', 'message': 'Invalid book data provided'}
    
    book = book_data['book_data']
    
    # Core literary element analysis
    literary_analysis = {
        'original_elements': {
            'setting': {
                'location': book.get('setting', {}).get('location', 'Unknown'),
                'time_period': book.get('setting', {}).get('time_period', 'Unknown'),
                'environment': book.get('setting', {}).get('environment', 'Unknown'),
                'importance_to_plot': _assess_setting_importance(book)
            },
            'characters': {
                'main_characters': book.get('main_characters', []),
                'character_types': _analyze_character_types(book.get('main_characters', [])),
                'character_development_potential': _assess_character_development(book)
            },
            'themes': {
                'primary_theme': book.get('theme', 'Unknown'),
                'educational_themes': _extract_educational_themes(book),
                'theme_flexibility': _assess_theme_flexibility(book)
            },
            'narrative_elements': {
                'voice': book.get('narrative_voice', 'Unknown'),
                'tone': book.get('tone', 'Unknown'),
                'mood': book.get('mood', 'Unknown'),
                'conflict_type': book.get('conflict_type', 'Unknown')
            },
            'educational_value': {
                'reading_level': book.get('reading_level', 'Unknown'),
                'vocabulary_focus': book.get('vocabulary_focus', []),
                'discussion_topics': book.get('discussion_topics', []),
                'literary_devices': book.get('key_literary_devices', [])
            }
        }
    }
    
    # Modification compatibility analysis
    compatibility_analysis = {
        'setting_modification': _analyze_setting_compatibility(
            book.get('adaptable_elements', {}), 
            student_modifications.get('setting', '')
        ),
        'character_modification': _analyze_character_compatibility(
            book.get('main_characters', []),
            student_modifications.get('characters', '')
        ),
        'time_period_modification': _analyze_time_period_compatibility(
            book.get('setting', {}),
            student_modifications.get('time_period', '')
        ),
        'theme_modification': _analyze_theme_compatibility(
            book.get('theme', ''),
            student_modifications.get('theme', '')
        ),
        'tone_modification': _analyze_tone_compatibility(
            book.get('tone', ''),
            student_modifications.get('tone', '')
        )
    }
    
    # Overall adaptation assessment
    adaptation_score = _calculate_adaptation_score(compatibility_analysis)
    
    return {
        'status': 'complete',
        'analysis_timestamp': datetime.now().isoformat(),
        'book_title': book.get('title', 'Unknown'),
        'book_author': book.get('author', 'Unknown'),
        'literary_analysis': literary_analysis,
        'compatibility_analysis': compatibility_analysis,
        'adaptation_score': adaptation_score,
        'recommended_modifications': _generate_modification_recommendations(compatibility_analysis),
        'preservation_requirements': _identify_preservation_requirements(book)
    }

def assess_adaptation_flexibility(story_elements: Dict) -> Dict[str, Any]:
    """
    Tool: Evaluate which elements can be safely modified while preserving story value.
    
    Args:
        story_elements: Analysis results from analyze_story_elements
        
    Returns:
        Detailed flexibility assessment for each story component
    """
    if story_elements.get('status') != 'complete':
        return {'status': 'error', 'message': 'Invalid story elements provided'}
    
    flexibility_assessment = {
        'highly_flexible': [],
        'moderately_flexible': [],
        'minimally_flexible': [],
        'must_preserve': [],
        'adaptation_opportunities': [],
        'creative_enhancement_areas': []
    }
    
    # Assess each element's flexibility
    literary_analysis = story_elements['literary_analysis']['original_elements']
    compatibility = story_elements['compatibility_analysis']
    
    # Setting flexibility
    setting_flexibility = _evaluate_setting_flexibility(literary_analysis['setting'])
    flexibility_assessment[setting_flexibility['category']].append({
        'element': 'setting',
        'rationale': setting_flexibility['rationale'],
        'modification_potential': setting_flexibility['potential']
    })
    
    # Character flexibility
    character_flexibility = _evaluate_character_flexibility(literary_analysis['characters'])
    flexibility_assessment[character_flexibility['category']].append({
        'element': 'characters',
        'rationale': character_flexibility['rationale'],
        'modification_potential': character_flexibility['potential']
    })
    
    # Theme flexibility
    theme_flexibility = _evaluate_theme_flexibility(literary_analysis['themes'])
    flexibility_assessment[theme_flexibility['category']].append({
        'element': 'themes',
        'rationale': theme_flexibility['rationale'],
        'modification_potential': theme_flexibility['potential']
    })
    
    # Identify creative opportunities
    flexibility_assessment['adaptation_opportunities'] = _identify_creative_opportunities(
        literary_analysis, compatibility
    )
    
    flexibility_assessment['creative_enhancement_areas'] = _identify_enhancement_areas(
        literary_analysis, compatibility
    )
    
    return {
        'status': 'complete',
        'assessment_timestamp': datetime.now().isoformat(),
        'flexibility_assessment': flexibility_assessment,
        'adaptation_readiness': _calculate_adaptation_readiness(flexibility_assessment),
        'recommended_approach': _recommend_adaptation_approach(flexibility_assessment)
    }

def create_adaptation_guidelines(analysis_results: Dict) -> Dict[str, Any]:
    """
    Tool: Generate specific guidelines for creative adaptation.
    
    Args:
        analysis_results: Combined results from story analysis and flexibility assessment
        
    Returns:
        Detailed guidelines for safe and effective story adaptation
    """
    guidelines = {
        'core_preservation_rules': [],
        'safe_modification_areas': [],
        'creative_enhancement_suggestions': [],
        'character_adaptation_guide': {},
        'setting_adaptation_guide': {},
        'theme_preservation_guide': {},
        'educational_value_maintenance': {},
        'quality_checkpoints': []
    }
    
    # Extract key data
    if 'literary_analysis' in analysis_results:
        literary_data = analysis_results['literary_analysis']['original_elements']
        guidelines['core_preservation_rules'] = _create_preservation_rules(literary_data)
        guidelines['educational_value_maintenance'] = _create_educational_guidelines(literary_data)
    
    if 'flexibility_assessment' in analysis_results:
        flexibility_data = analysis_results['flexibility_assessment']
        guidelines['safe_modification_areas'] = _create_modification_guidelines(flexibility_data)
        guidelines['creative_enhancement_suggestions'] = _create_enhancement_guidelines(flexibility_data)
    
    # Character adaptation guidelines
    guidelines['character_adaptation_guide'] = {
        'voice_consistency': 'Maintain character personality traits and speaking patterns',
        'motivation_preservation': 'Keep core character motivations and goals intact',
        'relationship_dynamics': 'Preserve important character relationships and conflicts',
        'growth_arc_maintenance': 'Ensure character development opportunities remain'
    }
    
    # Setting adaptation guidelines
    guidelines['setting_adaptation_guide'] = {
        'atmosphere_preservation': 'Maintain the mood and atmosphere of the original setting',
        'plot_relevance': 'Ensure new setting supports the same plot developments',
        'cultural_sensitivity': 'Be respectful when adapting cultural or historical elements',
        'logical_consistency': 'Make sure setting changes are internally consistent'
    }
    
    # Theme preservation guidelines
    guidelines['theme_preservation_guide'] = {
        'core_message': 'Primary theme must remain central to the adapted story',
        'age_appropriateness': 'All themes must remain suitable for middle school students',
        'educational_value': 'Maintain or enhance the educational lessons of the original',
        'universal_relevance': 'Ensure themes remain relatable to contemporary students'
    }
    
    # Quality checkpoints for other agents
    guidelines['quality_checkpoints'] = [
        'Character voices remain consistent with original personality',
        'Plot structure supports same character development',
        'Setting enhances rather than distracts from core themes',
        'Educational value is maintained or improved',
        'Reading level remains appropriate for target audience',
        'Content remains safe and appropriate for school use'
    ]
    
    return {
        'status': 'complete',
        'guidelines_timestamp': datetime.now().isoformat(),
        'adaptation_guidelines': guidelines,
        'implementation_priority': _prioritize_guidelines(guidelines),
        'success_metrics': _define_success_metrics(guidelines)
    }

def prepare_compliance_handoff(analysis_data: Dict, guidelines: Dict) -> Dict[str, Any]:
    """
    Tool: Format analysis for educational compliance review.
    
    Args:
        analysis_data: Results from analyze_story_elements
        guidelines: Results from create_adaptation_guidelines
        
    Returns:
        Formatted package for educational compliance agent
    """
    handoff_package = {
        'project_metadata': {
            'analysis_timestamp': datetime.now().isoformat(),
            'from_agent': 'content_researcher',
            'to_agent': 'educational_compliance',
            'status': 'analysis_complete',
            'next_action': 'validate_educational_compliance'
        },
        'literary_analysis_summary': {
            'book_title': analysis_data.get('book_title', 'Unknown'),
            'book_author': analysis_data.get('book_author', 'Unknown'),
            'reading_level': analysis_data.get('literary_analysis', {}).get('original_elements', {}).get('educational_value', {}).get('reading_level', 'Unknown'),
            'primary_theme': analysis_data.get('literary_analysis', {}).get('original_elements', {}).get('themes', {}).get('primary_theme', 'Unknown'),
            'educational_themes': analysis_data.get('literary_analysis', {}).get('original_elements', {}).get('themes', {}).get('educational_themes', [])
        },
        'adaptation_feasibility': {
            'adaptation_score': analysis_data.get('adaptation_score', 0),
            'recommended_modifications': analysis_data.get('recommended_modifications', []),
            'preservation_requirements': analysis_data.get('preservation_requirements', [])
        },
        'educational_compliance_notes': {
            'core_preservation_rules': guidelines.get('adaptation_guidelines', {}).get('core_preservation_rules', []),
            'educational_value_maintenance': guidelines.get('adaptation_guidelines', {}).get('educational_value_maintenance', {}),
            'quality_checkpoints': guidelines.get('adaptation_guidelines', {}).get('quality_checkpoints', [])
        },
        'creative_guidelines': {
            'safe_modification_areas': guidelines.get('adaptation_guidelines', {}).get('safe_modification_areas', []),
            'character_adaptation_guide': guidelines.get('adaptation_guidelines', {}).get('character_adaptation_guide', {}),
            'setting_adaptation_guide': guidelines.get('adaptation_guidelines', {}).get('setting_adaptation_guide', {}),
            'theme_preservation_guide': guidelines.get('adaptation_guidelines', {}).get('theme_preservation_guide', {})
        },
        'handoff_message': f"Literary analysis complete for '{analysis_data.get('book_title', 'Unknown')}'. Adaptation guidelines created with {analysis_data.get('adaptation_score', 0)}/100 feasibility score. Ready for educational compliance validation.",
        'data_keys': ['literary_analysis_summary', 'adaptation_feasibility', 'educational_compliance_notes', 'creative_guidelines']
    }
    
    return handoff_package

# Helper functions for analysis

def _assess_setting_importance(book: Dict) -> str:
    """Assess how important the setting is to the plot"""
    setting_flexibility = book.get('adaptable_elements', {}).get('setting_flexibility', 'medium')
    if setting_flexibility == 'high':
        return 'low_importance'
    elif setting_flexibility == 'medium':
        return 'moderate_importance'
    else:
        return 'high_importance'

def _analyze_character_types(characters: List[Dict]) -> List[str]:
    """Analyze the types of characters in the story"""
    character_types = []
    for character in characters:
        char_type = character.get('type', character.get('role', 'unknown'))
        character_types.append(char_type)
    return character_types

def _assess_character_development(book: Dict) -> str:
    """Assess character development potential"""
    conflict_type = book.get('conflict_type', '')
    if 'vs. Self' in conflict_type:
        return 'high_internal_development'
    elif 'vs. Society' in conflict_type:
        return 'high_external_development'
    else:
        return 'moderate_development'

def _extract_educational_themes(book: Dict) -> List[str]:
    """Extract educational themes from book data"""
    themes = []
    if book.get('discussion_topics'):
        themes.extend(book['discussion_topics'])
    if book.get('theme'):
        themes.append(book['theme'])
    return list(set(themes))

def _assess_theme_flexibility(book: Dict) -> str:
    """Assess how flexible the themes are for adaptation"""
    theme = book.get('theme', '').lower()
    if any(keyword in theme for keyword in ['universal', 'timeless', 'friendship', 'courage', 'growth']):
        return 'high_flexibility'
    elif any(keyword in theme for keyword in ['specific', 'historical', 'cultural']):
        return 'low_flexibility'
    else:
        return 'moderate_flexibility'

def _analyze_setting_compatibility(adaptable_elements: Dict, new_setting: str) -> Dict:
    """Analyze compatibility of new setting with story"""
    setting_flexibility = adaptable_elements.get('setting_flexibility', 'medium')
    
    compatibility_score = 50  # Base score
    if setting_flexibility == 'high':
        compatibility_score += 30
    elif setting_flexibility == 'low':
        compatibility_score -= 20
    
    return {
        'compatibility_score': compatibility_score,
        'flexibility_level': setting_flexibility,
        'recommended': compatibility_score >= 60,
        'notes': f"Setting change to '{new_setting}' has {compatibility_score}% compatibility"
    }

def _analyze_character_compatibility(original_characters: List[Dict], new_characters: str) -> Dict:
    """Analyze compatibility of new characters with story"""
    character_flexibility = 'medium'  # Default
    
    # Check if original characters are specific types that are hard to change
    specific_types = ['animal', 'historical figure', 'mythical']
    has_specific = any(char.get('type', '').lower() in specific_types for char in original_characters)
    
    if has_specific:
        character_flexibility = 'low'
        compatibility_score = 40
    else:
        character_flexibility = 'high'
        compatibility_score = 80
    
    return {
        'compatibility_score': compatibility_score,
        'flexibility_level': character_flexibility,
        'recommended': compatibility_score >= 60,
        'notes': f"Character change to '{new_characters}' has {compatibility_score}% compatibility"
    }

def _analyze_time_period_compatibility(original_setting: Dict, new_time_period: str) -> Dict:
    """Analyze compatibility of new time period"""
    original_period = original_setting.get('time_period', '').lower()
    
    # If original is timeless or vague, high compatibility
    if any(word in original_period for word in ['timeless', 'any', 'various']):
        compatibility_score = 90
    else:
        compatibility_score = 70  # Most stories can be time-shifted
    
    return {
        'compatibility_score': compatibility_score,
        'recommended': compatibility_score >= 60,
        'notes': f"Time period change to '{new_time_period}' has {compatibility_score}% compatibility"
    }

def _analyze_theme_compatibility(original_theme: str, new_theme: str) -> Dict:
    """Analyze compatibility of theme changes"""
    if not new_theme:  # No theme change requested
        return {
            'compatibility_score': 100,
            'recommended': True,
            'notes': 'No theme change requested - original theme preserved'
        }
    
    # Themes should generally be preserved, but related themes can work
    compatibility_score = 60  # Moderate by default
    
    return {
        'compatibility_score': compatibility_score,
        'recommended': compatibility_score >= 60,
        'notes': f"Theme change to '{new_theme}' requires careful implementation"
    }

def _analyze_tone_compatibility(original_tone: str, new_tone: str) -> Dict:
    """Analyze compatibility of tone changes"""
    if not new_tone:  # No tone change requested
        return {
            'compatibility_score': 100,
            'recommended': True,
            'notes': 'No tone change requested - original tone preserved'
        }
    
    compatibility_score = 75  # Tone is usually adaptable
    
    return {
        'compatibility_score': compatibility_score,
        'recommended': compatibility_score >= 60,
        'notes': f"Tone change to '{new_tone}' is generally compatible"
    }

def _calculate_adaptation_score(compatibility_analysis: Dict) -> int:
    """Calculate overall adaptation feasibility score"""
    scores = []
    for analysis in compatibility_analysis.values():
        if isinstance(analysis, dict) and 'compatibility_score' in analysis:
            scores.append(analysis['compatibility_score'])
    
    return int(sum(scores) / len(scores)) if scores else 50

def _generate_modification_recommendations(compatibility_analysis: Dict) -> List[str]:
    """Generate specific recommendations based on compatibility analysis"""
    recommendations = []
    
    for element, analysis in compatibility_analysis.items():
        if isinstance(analysis, dict) and analysis.get('compatibility_score', 0) < 60:
            recommendations.append(f"Consider revising {element} - compatibility score: {analysis.get('compatibility_score', 0)}%")
        elif isinstance(analysis, dict) and analysis.get('recommended', False):
            recommendations.append(f"Approved: {element} modification is compatible")
    
    return recommendations

def _identify_preservation_requirements(book: Dict) -> List[str]:
    """Identify what must be preserved from the original story"""
    requirements = []
    
    # Always preserve educational value
    requirements.append("Maintain core educational themes and learning objectives")
    requirements.append("Preserve age-appropriate content and reading level")
    
    # Preserve low-flexibility elements
    adaptable = book.get('adaptable_elements', {})
    if adaptable.get('character_flexibility') == 'low':
        requirements.append("Preserve core character types and personalities")
    if adaptable.get('plot_flexibility') == 'low':
        requirements.append("Maintain original plot structure and major events")
    if adaptable.get('setting_flexibility') == 'low':
        requirements.append("Keep setting elements that are crucial to the story")
    
    return requirements

def _evaluate_setting_flexibility(setting_data: Dict) -> Dict:
    """Evaluate how flexible the setting is for modification"""
    importance = setting_data.get('importance_to_plot', 'moderate_importance')
    
    if importance == 'low_importance':
        return {
            'category': 'highly_flexible',
            'rationale': 'Setting can be changed without affecting core story elements',
            'potential': 'Full adaptation possible'
        }
    elif importance == 'moderate_importance':
        return {
            'category': 'moderately_flexible',
            'rationale': 'Setting changes require careful consideration of plot impact',
            'potential': 'Adaptation with modifications'
        }
    else:
        return {
            'category': 'minimally_flexible',
            'rationale': 'Setting is integral to plot and character development',
            'potential': 'Minor atmospheric changes only'
        }

def _evaluate_character_flexibility(character_data: Dict) -> Dict:
    """Evaluate how flexible characters are for modification"""
    character_types = character_data.get('character_types', [])
    
    # Check for specific character types that are hard to change
    specific_types = ['talking animal', 'historical figure', 'mythical creature']
    has_specific = any(char_type in specific_types for char_type in character_types)
    
    if has_specific:
        return {
            'category': 'minimally_flexible',
            'rationale': 'Characters have specific types that define the story',
            'potential': 'Personality traits only'
        }
    else:
        return {
            'category': 'moderately_flexible',
            'rationale': 'Characters can be adapted while preserving core personalities',
            'potential': 'Name, appearance, and background changes'
        }

def _evaluate_theme_flexibility(theme_data: Dict) -> Dict:
    """Evaluate how flexible themes are for modification"""
    theme_flexibility = theme_data.get('theme_flexibility', 'moderate_flexibility')
    
    if theme_flexibility == 'high_flexibility':
        return {
            'category': 'moderately_flexible',
            'rationale': 'Themes are universal and can be expressed in various contexts',
            'potential': 'Different expression of same core themes'
        }
    else:
        return {
            'category': 'must_preserve',
            'rationale': 'Themes are essential to educational value and story meaning',
            'potential': 'Preserve original themes'
        }

def _identify_creative_opportunities(literary_analysis: Dict, compatibility: Dict) -> List[str]:
    """Identify areas where creativity can be enhanced"""
    opportunities = []
    
    # Check for high compatibility areas
    for element, analysis in compatibility.items():
        if isinstance(analysis, dict) and analysis.get('compatibility_score', 0) >= 80:
            opportunities.append(f"Excellent opportunity for creative {element} adaptation")
    
    # Add general creative opportunities
    opportunities.extend([
        "Enhance descriptive language for new setting",
        "Develop character backstories for new context",
        "Create dialogue that reflects new environment",
        "Add era-appropriate technology or elements"
    ])
    
    return opportunities

def _identify_enhancement_areas(literary_analysis: Dict, compatibility: Dict) -> List[str]:
    """Identify areas where the story can be enhanced"""
    enhancements = [
        "Strengthen character motivations in new context",
        "Enhance educational value through setting details",
        "Improve relatability for contemporary students",
        "Add culturally relevant elements while preserving themes"
    ]
    
    return enhancements

def _calculate_adaptation_readiness(flexibility_assessment: Dict) -> str:
    """Calculate overall readiness for adaptation"""
    highly_flexible = len(flexibility_assessment.get('highly_flexible', []))
    moderately_flexible = len(flexibility_assessment.get('moderately_flexible', []))
    minimally_flexible = len(flexibility_assessment.get('minimally_flexible', []))
    must_preserve = len(flexibility_assessment.get('must_preserve', []))
    
    total_elements = highly_flexible + moderately_flexible + minimally_flexible + must_preserve
    
    if total_elements == 0:
        return 'unknown'
    
    flexible_ratio = (highly_flexible + moderately_flexible) / total_elements
    
    if flexible_ratio >= 0.7:
        return 'high_readiness'
    elif flexible_ratio >= 0.4:
        return 'moderate_readiness'
    else:
        return 'low_readiness'

def _recommend_adaptation_approach(flexibility_assessment: Dict) -> str:
    """Recommend an approach for adaptation based on flexibility"""
    readiness = _calculate_adaptation_readiness(flexibility_assessment)
    
    if readiness == 'high_readiness':
        return 'comprehensive_adaptation'
    elif readiness == 'moderate_readiness':
        return 'selective_adaptation'
    else:
        return 'conservative_adaptation'

def _create_preservation_rules(literary_data: Dict) -> List[str]:
    """Create rules for what must be preserved"""
    rules = [
        "Maintain core character personalities and motivations",
        "Preserve primary educational themes and messages",
        "Keep story structure that supports character development",
        "Maintain age-appropriate content and reading level"
    ]
    
    # Add specific rules based on story elements
    if literary_data.get('themes', {}).get('primary_theme'):
        rules.append(f"Preserve the theme of {literary_data['themes']['primary_theme']}")
    
    return rules

def _create_educational_guidelines(literary_data: Dict) -> Dict:
    """Create guidelines for maintaining educational value"""
    return {
        'reading_level': f"Maintain {literary_data.get('educational_value', {}).get('reading_level', 'middle school')} reading level",
        'vocabulary': "Preserve or enhance vocabulary learning opportunities",
        'discussion_topics': "Ensure adapted story supports same discussion topics",
        'literary_devices': "Maintain examples of key literary devices for analysis"
    }

def _create_modification_guidelines(flexibility_data: Dict) -> List[str]:
    """Create guidelines for safe modifications"""
    guidelines = []
    
    for element in flexibility_data.get('highly_flexible', []):
        guidelines.append(f"Safe to modify: {element['element']} - {element['modification_potential']}")
    
    for element in flexibility_data.get('moderately_flexible', []):
        guidelines.append(f"Modify with care: {element['element']} - {element['modification_potential']}")
    
    return guidelines

def _create_enhancement_guidelines(flexibility_data: Dict) -> List[str]:
    """Create guidelines for creative enhancement"""
    return flexibility_data.get('creative_enhancement_areas', [])

def _prioritize_guidelines(guidelines: Dict) -> List[str]:
    """Prioritize guidelines by importance"""
    priority_order = [
        'core_preservation_rules',
        'educational_value_maintenance', 
        'safe_modification_areas',
        'character_adaptation_guide',
        'setting_adaptation_guide',
        'theme_preservation_guide',
        'creative_enhancement_suggestions'
    ]
    
    return priority_order

def _define_success_metrics(guidelines: Dict) -> List[str]:
    """Define metrics for successful adaptation"""
    return [
        "Character personalities remain recognizable",
        "Core themes are clearly expressed in new context", 
        "Educational value is maintained or enhanced",
        "Story flows naturally in new setting",
        "Student engagement is increased through modifications"
    ]