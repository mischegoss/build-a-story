# tests/test_research_tools.py

import pytest
import json
import os
from unittest.mock import patch, mock_open
from app.tools.research_tools import (
    get_book_details,
    analyze_story_elements,
    assess_adaptation_flexibility,
    create_adaptation_guidelines,
    prepare_compliance_handoff
)

# Sample test data
SAMPLE_BOOKS_DATA = {
    "books": [
        {
            "title": "Alice's Adventures in Wonderland",
            "author": "Lewis Carroll",
            "publication_year": 1865,
            "setting": {
                "location": "English countryside by a riverbank",
                "time_period": "Victorian era afternoon",
                "environment": "Outdoor/Natural"
            },
            "main_characters": [
                {"name": "Alice", "role": "protagonist", "age_group": "child"},
                {"name": "White Rabbit", "role": "catalyst", "type": "talking animal"}
            ],
            "genre": "Fantasy/Children's Literature",
            "era": "Victorian",
            "theme": "Curiosity and adventure",
            "reading_level": "Middle School",
            "adaptable_elements": {
                "setting_flexibility": "high",
                "character_flexibility": "medium",
                "plot_flexibility": "high"
            }
        }
    ]
}

class TestResearchTools:
    
    @patch('app.tools.research_tools.load_books_database')
    def test_get_book_details_found(self, mock_load):
        """Test successful book retrieval"""
        mock_load.return_value = SAMPLE_BOOKS_DATA
        
        result = get_book_details("Alice's Adventures in Wonderland")
        
        assert result['status'] == 'found'
        assert result['book_data']['title'] == "Alice's Adventures in Wonderland"
        assert result['book_data']['author'] == "Lewis Carroll"
        assert 'analysis_ready' in result
        assert result['analysis_ready'] == True
    
    @patch('app.tools.research_tools.load_books_database')
    def test_get_book_details_partial_match(self, mock_load):
        """Test partial title matching"""
        mock_load.return_value = SAMPLE_BOOKS_DATA
        
        result = get_book_details("Alice")
        
        assert result['status'] == 'found'
        assert result['book_data']['title'] == "Alice's Adventures in Wonderland"
    
    @patch('app.tools.research_tools.load_books_database')
    def test_get_book_details_not_found(self, mock_load):
        """Test book not found"""
        mock_load.return_value = SAMPLE_BOOKS_DATA
        
        result = get_book_details("Nonexistent Book")
        
        assert result['status'] == 'not_found'
        assert 'error' in result
        assert 'available_books' in result
    
    def test_analyze_story_elements_success(self):
        """Test story element analysis"""
        book_data = {
            'status': 'found',
            'book_data': SAMPLE_BOOKS_DATA['books'][0]
        }
        
        student_modifications = {
            'setting': 'Space station in the future',
            'characters': 'Alice becomes Commander Alice-7',
            'time_period': 'Year 2150',
            'theme': 'Curiosity and discovery'
        }
        
        result = analyze_story_elements(book_data, student_modifications)
        
        assert result['status'] == 'complete'
        assert 'literary_analysis' in result
        assert 'compatibility_analysis' in result
        assert 'adaptation_score' in result
        assert isinstance(result['adaptation_score'], int)
        assert 0 <= result['adaptation_score'] <= 100
    
    def test_analyze_story_elements_invalid_book(self):
        """Test analysis with invalid book data"""
        book_data = {'status': 'not_found'}
        student_modifications = {}
        
        result = analyze_story_elements(book_data, student_modifications)
        
        assert result['status'] == 'error'
        assert 'message' in result
    
    def test_assess_adaptation_flexibility_success(self):
        """Test adaptation flexibility assessment"""
        # First get analysis results
        book_data = {
            'status': 'found',
            'book_data': SAMPLE_BOOKS_DATA['books'][0]
        }
        
        student_modifications = {
            'setting': 'Space station',
            'characters': 'Alice-7'
        }
        
        story_elements = analyze_story_elements(book_data, student_modifications)
        
        result = assess_adaptation_flexibility(story_elements)
        
        assert result['status'] == 'complete'
        assert 'flexibility_assessment' in result
        assert 'adaptation_readiness' in result
        assert 'recommended_approach' in result
        
        # Check required categories exist
        flexibility = result['flexibility_assessment']
        required_categories = ['highly_flexible', 'moderately_flexible', 'minimally_flexible', 'must_preserve']
        for category in required_categories:
            assert category in flexibility
            assert isinstance(flexibility[category], list)
    
    def test_create_adaptation_guidelines_success(self):
        """Test adaptation guidelines creation"""
        # Create mock analysis results
        analysis_results = {
            'literary_analysis': {
                'original_elements': {
                    'themes': {'primary_theme': 'Curiosity and adventure'},
                    'educational_value': {'reading_level': 'Middle School'}
                }
            },
            'flexibility_assessment': {
                'highly_flexible': [
                    {'element': 'setting', 'modification_potential': 'Full adaptation'}
                ],
                'creative_enhancement_areas': ['Enhanced setting details']
            }
        }
        
        result = create_adaptation_guidelines(analysis_results)
        
        assert result['status'] == 'complete'
        assert 'adaptation_guidelines' in result
        
        guidelines = result['adaptation_guidelines']
        required_sections = [
            'core_preservation_rules',
            'safe_modification_areas', 
            'character_adaptation_guide',
            'setting_adaptation_guide',
            'theme_preservation_guide',
            'quality_checkpoints'
        ]
        
        for section in required_sections:
            assert section in guidelines
    
    def test_prepare_compliance_handoff_success(self):
        """Test compliance handoff preparation"""
        analysis_data = {
            'book_title': 'Alice\'s Adventures in Wonderland',
            'book_author': 'Lewis Carroll',
            'adaptation_score': 85,
            'literary_analysis': {
                'original_elements': {
                    'educational_value': {'reading_level': 'Middle School'},
                    'themes': {'primary_theme': 'Curiosity and adventure'}
                }
            }
        }
        
        guidelines = {
            'adaptation_guidelines': {
                'core_preservation_rules': ['Maintain curiosity theme'],
                'quality_checkpoints': ['Educational value maintained']
            }
        }
        
        result = prepare_compliance_handoff(analysis_data, guidelines)
        
        assert 'project_metadata' in result
        assert 'literary_analysis_summary' in result
        assert 'adaptation_feasibility' in result
        assert 'educational_compliance_notes' in result
        assert 'creative_guidelines' in result
        assert 'handoff_message' in result
        
        # Verify agent routing
        metadata = result['project_metadata']
        assert metadata['from_agent'] == 'content_researcher'
        assert metadata['to_agent'] == 'educational_compliance'
        assert metadata['status'] == 'analysis_complete'


# Integration test
class TestResearchToolsIntegration:
    """Test the tools working together in sequence"""
    
    @patch('app.tools.research_tools.load_books_database')
    def test_full_research_workflow(self, mock_load):
        """Test complete research workflow from book retrieval to handoff"""
        mock_load.return_value = SAMPLE_BOOKS_DATA
        
        # Step 1: Get book details
        book_details = get_book_details("Alice's Adventures in Wonderland")
        assert book_details['status'] == 'found'
        
        # Step 2: Analyze story elements
        student_modifications = {
            'setting': 'Space station in the future',
            'characters': 'Alice becomes Commander Alice-7',
            'time_period': 'Year 2150'
        }
        
        analysis = analyze_story_elements(book_details, student_modifications)
        assert analysis['status'] == 'complete'
        assert analysis['adaptation_score'] > 0
        
        # Step 3: Assess flexibility
        flexibility = assess_adaptation_flexibility(analysis)
        assert flexibility['status'] == 'complete'
        
        # Step 4: Create guidelines
        guidelines = create_adaptation_guidelines({
            'literary_analysis': analysis['literary_analysis'],
            'flexibility_assessment': flexibility['flexibility_assessment']
        })
        assert guidelines['status'] == 'complete'
        
        # Step 5: Prepare handoff
        handoff = prepare_compliance_handoff(analysis, guidelines)
        assert 'handoff_message' in handoff
        assert 'Alice' in handoff['handoff_message']
        
        print(f"✅ Full workflow test passed!")
        print(f"📊 Adaptation Score: {analysis['adaptation_score']}")
        print(f"🎯 Readiness: {flexibility['adaptation_readiness']}")
        print(f"📝 Handoff: {handoff['handoff_message'][:100]}...")


if __name__ == "__main__":
    # Run basic tests
    test_suite = TestResearchTools()
    integration_test = TestResearchToolsIntegration()
    
    print("🧪 Running Research Tools Tests...")
    
    try:
        # Mock the load function for standalone testing
        with patch('app.tools.research_tools.load_books_database', return_value=SAMPLE_BOOKS_DATA):
            # Run individual tests
            test_suite.test_get_book_details_found()
            print("✅ Book retrieval test passed")
            
            test_suite.test_analyze_story_elements_success()
            print("✅ Story analysis test passed")
            
            test_suite.test_assess_adaptation_flexibility_success()
            print("✅ Flexibility assessment test passed")
            
            test_suite.test_create_adaptation_guidelines_success()
            print("✅ Guidelines creation test passed")
            
            test_suite.test_prepare_compliance_handoff_success()
            print("✅ Handoff preparation test passed")
            
            # Run integration test
            integration_test.test_full_research_workflow()
            
        print("\n🎉 All Research Tools Tests Passed!")
        
    except Exception as e:
        print(f"❌ Test failed: {e}")
        import traceback
        traceback.print_exc()
        