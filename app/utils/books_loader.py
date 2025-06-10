"""
Books Dataset Loader Utility

This module provides functions to load and work with the public domain books dataset
for the Build-A-Story application.
"""

import json
import os
from typing import Dict, List, Optional, Any, Set
from pathlib import Path


class BooksLoader:
    """Utility class for loading and working with the books dataset."""
    
    def __init__(self, data_file: str = "data/first_pages.json"):
        """
        Initialize the BooksLoader.
        
        Args:
            data_file: Path to the JSON file containing books data
        """
        self.data_file = data_file
        self._books_data = None
        self._load_books()
    
    def _load_books(self) -> None:
        """Load books data from JSON file."""
        try:
            # Get the path relative to the project root
            current_dir = Path(__file__).parent.parent  # Go up from utils/ to project root
            books_path = current_dir / self.data_file
            
            with open(books_path, 'r', encoding='utf-8') as f:
                self._books_data = json.load(f)
        except FileNotFoundError:
            raise FileNotFoundError(f"Books data file not found: {self.data_file}")
        except json.JSONDecodeError as e:
            raise ValueError(f"Invalid JSON in books data file: {e}")
    
    def get_all_books(self) -> List[Dict[str, Any]]:
        """
        Get all books from the dataset.
        
        Returns:
            List of book dictionaries
        """
        return self._books_data.get('books', [])
    
    def get_book_by_title(self, title: str) -> Optional[Dict[str, Any]]:
        """
        Get a specific book by title.
        
        Args:
            title: The title of the book to find
            
        Returns:
            Book dictionary if found, None otherwise
        """
        books = self.get_all_books()
        for book in books:
            if book.get('title', '').lower() == title.lower():
                return book
        return None
    
    def get_books_by_genre(self, genre: str) -> List[Dict[str, Any]]:
        """
        Get books filtered by genre.
        
        Args:
            genre: Genre to filter by
            
        Returns:
            List of books matching the genre
        """
        books = self.get_all_books()
        return [book for book in books if genre.lower() in book.get('genre', '').lower()]
    
    def get_books_by_era(self, era: str) -> List[Dict[str, Any]]:
        """
        Get books filtered by era.
        
        Args:
            era: Era to filter by
            
        Returns:
            List of books from the specified era
        """
        books = self.get_all_books()
        return [book for book in books if era.lower() in book.get('era', '').lower()]
    
    def get_books_by_reading_level(self, level: str) -> List[Dict[str, Any]]:
        """
        Get books filtered by reading level.
        
        Args:
            level: Reading level to filter by
            
        Returns:
            List of books at the specified reading level
        """
        books = self.get_all_books()
        return [book for book in books if level.lower() in book.get('reading_level', '').lower()]
    
    def get_unique_values(self, field: str) -> Set[str]:
        """
        Get unique values for a specific field across all books.
        
        Args:
            field: Field name to extract unique values from
            
        Returns:
            Set of unique values for the field
        """
        books = self.get_all_books()
        values = set()
        
        for book in books:
            if field in book:
                value = book[field]
                if isinstance(value, str):
                    values.add(value)
                elif isinstance(value, list):
                    values.update(value)
        
        return values
    
    def get_form_options(self) -> Dict[str, List[str]]:
        """
        Get options for form dropdowns based on the dataset.
        
        Returns:
            Dictionary with form field options
        """
        books = self.get_all_books()
        
        # Extract unique values for form fields
        genres = set()
        eras = set()
        narrative_voices = set()
        tones = set()
        moods = set()
        themes = set()
        conflict_types = set()
        writing_styles = set()
        environments = set()
        
        for book in books:
            if 'genre' in book:
                genres.add(book['genre'])
            if 'era' in book:
                eras.add(book['era'])
            if 'narrative_voice' in book:
                narrative_voices.add(book['narrative_voice'])
            if 'tone' in book:
                tones.add(book['tone'])
            if 'mood' in book:
                moods.add(book['mood'])
            if 'theme' in book:
                themes.add(book['theme'])
            if 'conflict_type' in book:
                conflict_types.add(book['conflict_type'])
            if 'writing_style' in book:
                writing_styles.add(book['writing_style'])
            if 'setting' in book and 'environment' in book['setting']:
                environments.add(book['setting']['environment'])
        
        return {
            'books': [book['title'] for book in books],
            'genres': sorted(list(genres)),
            'eras': sorted(list(eras)),
            'narrative_voices': sorted(list(narrative_voices)),
            'tones': sorted(list(tones)),
            'moods': sorted(list(moods)),
            'themes': sorted(list(themes)),
            'conflict_types': sorted(list(conflict_types)),
            'writing_styles': sorted(list(writing_styles)),
            'environments': sorted(list(environments))
        }
    
    def get_book_summary(self, title: str) -> Optional[Dict[str, Any]]:
        """
        Get a summary of a book's key information for display.
        
        Args:
            title: Title of the book
            
        Returns:
            Dictionary with book summary information
        """
        book = self.get_book_by_title(title)
        if not book:
            return None
        
        return {
            'title': book.get('title'),
            'author': book.get('author'),
            'publication_year': book.get('publication_year'),
            'genre': book.get('genre'),
            'era': book.get('era'),
            'theme': book.get('theme'),
            'setting_location': book.get('setting', {}).get('location'),
            'setting_time': book.get('setting', {}).get('time_period'),
            'main_characters': [char.get('name') for char in book.get('main_characters', [])],
            'first_page_preview': book.get('first_page', '')[:100] + '...' if book.get('first_page') else None,
            'adaptability': book.get('adaptable_elements', {}),
            'discussion_topics': book.get('discussion_topics', [])
        }
    
    def search_books(self, query: str) -> List[Dict[str, Any]]:
        """
        Search books by title, author, or theme.
        
        Args:
            query: Search query string
            
        Returns:
            List of books matching the search query
        """
        books = self.get_all_books()
        query_lower = query.lower()
        
        matching_books = []
        for book in books:
            # Search in title, author, genre, theme
            searchable_text = ' '.join([
                book.get('title', ''),
                book.get('author', ''),
                book.get('genre', ''),
                book.get('theme', ''),
                ' '.join(book.get('discussion_topics', []))
            ]).lower()
            
            if query_lower in searchable_text:
                matching_books.append(book)
        
        return matching_books
    
    def get_books_with_high_adaptability(self, element: str = 'setting') -> List[Dict[str, Any]]:
        """
        Get books that are highly adaptable for a specific element.
        
        Args:
            element: The adaptability element to check ('setting', 'character', or 'plot')
            
        Returns:
            List of books with high adaptability for the specified element
        """
        books = self.get_all_books()
        element_key = f"{element}_flexibility"
        
        adaptable_books = []
        for book in books:
            adaptable_elements = book.get('adaptable_elements', {})
            if adaptable_elements.get(element_key) == 'high':
                adaptable_books.append(book)
        
        return adaptable_books


# Convenience functions for easy importing
def load_books_data(data_file: str = "data/first_pages.json") -> BooksLoader:
    """
    Load the books dataset.
    
    Args:
        data_file: Path to the JSON file containing books data
        
    Returns:
        BooksLoader instance
    """
    return BooksLoader(data_file)


def get_book_by_title(title: str, data_file: str = "data/first_pages.json") -> Optional[Dict[str, Any]]:
    """
    Quick function to get a book by title.
    
    Args:
        title: Title of the book
        data_file: Path to the JSON file containing books data
        
    Returns:
        Book dictionary if found, None otherwise
    """
    loader = BooksLoader(data_file)
    return loader.get_book_by_title(title)


def get_form_options(data_file: str = "data/first_pages.json") -> Dict[str, List[str]]:
    """
    Quick function to get form options.
    
    Args:
        data_file: Path to the JSON file containing books data
        
    Returns:
        Dictionary with form field options
    """
    loader = BooksLoader(data_file)
    return loader.get_form_options()


# Example usage
if __name__ == "__main__":
    # Example of how to use the BooksLoader
    try:
        books_loader = load_books_data()
        
        # Get all books
        all_books = books_loader.get_all_books()
        print(f"Loaded {len(all_books)} books")
        
        # Get a specific book
        alice = books_loader.get_book_by_title("Alice's Adventures in Wonderland")
        if alice:
            print(f"Found book: {alice['title']} by {alice['author']}")
        
        # Get form options
        options = books_loader.get_form_options()
        print(f"Available genres: {options['genres']}")
        
        # Search for books
        adventure_books = books_loader.search_books("adventure")
        print(f"Found {len(adventure_books)} books with 'adventure'")
        
        # Get highly adaptable books
        adaptable_books = books_loader.get_books_with_high_adaptability('setting')
        print(f"Found {len(adaptable_books)} books with high setting flexibility")
        
    except Exception as e:
        print(f"Error loading books data: {e}")