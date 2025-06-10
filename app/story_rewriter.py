"""
Build-A-Story Streamlit Interface

A clean, simple interface for middle schoolers to rewrite classic stories.
"""

import streamlit as st
import sys
import os
from pathlib import Path

# Add the project root to Python path for imports
project_root = Path(__file__).parent.parent
sys.path.append(str(project_root))

from utils.books_loader import BooksLoader

# Optional Google AI import
try:
    import google.generativeai as genai
    GOOGLE_AI_AVAILABLE = True
except ImportError:
    GOOGLE_AI_AVAILABLE = False
    genai = None

# Configure page
st.set_page_config(
    page_title="Build-A-Story Rewriter",
    page_icon="📚",
    layout="centered"
)

def create_demo_rewrite(book, characters, setting, theme, time_period=None, tone=None, mood=None, genre=None, special_elements=None):
    """Create a demo rewrite for testing purposes."""
    
    demo_opening = f"""In the {setting.lower()}, {characters.split(',')[0].strip()} had never imagined that a day like this would come."""
    
    if time_period and time_period != "Present day":
        demo_opening += f" It was {time_period.lower()}, and the world was very different."
    
    demo_opening += f""" 

As they looked around the {setting.lower()}, they felt a mixture of excitement and uncertainty. The {theme.lower() if theme else 'spirit of adventure'} called to them, whispering promises of discoveries yet to be made.

{characters} took their first steps into this new world, carrying with them the same courage that had once driven the original character in "{book['title']}." But now, everything was transformed - the setting, the time, even the very air around them seemed filled with {mood.lower() if mood else 'possibility'}.

The story that was about to unfold would be {tone.lower() if tone else 'remarkable'}, weaving together elements of {genre.lower() if genre else 'adventure'} in ways that would surprise and delight."""

    if special_elements:
        demo_opening += f" And perhaps most exciting of all, this world contained {special_elements.lower()}, adding magic to every moment."

    return f"""**Demo Rewrite of "{book['title']}"**

*This is a demo showing how your story would be transformed.*

---

{demo_opening}

---

*In the full version, AI would rewrite the complete first page while maintaining the original's narrative structure.*
"""

# Custom CSS for clean styling
st.markdown("""
<style>
    .main-header {
        text-align: center;
        padding: 2rem 0;
        background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
        color: #1565c0;
        border-radius: 10px;
        margin-bottom: 2rem;
        border: 1px solid #90caf9;
    }
    
    .section {
        background: white;
        padding: 1.5rem;
        border-radius: 10px;
        margin: 1rem 0;
        border: 1px solid #e3f2fd;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .book-info {
        background: linear-gradient(135deg, #f3e5f5 0%, #e8eaf6 100%);
        padding: 1rem;
        border-radius: 8px;
        margin: 1rem 0;
        border-left: 4px solid #5c6bc0;
    }
    
    .demo-notice {
        background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
        padding: 1rem;
        border-radius: 8px;
        margin: 1rem 0;
        border-left: 4px solid #ff9800;
    }
    
    .preview-box {
        background: linear-gradient(135deg, #f1f8e9 0%, #e8f5e8 100%);
        padding: 1.5rem;
        border-radius: 8px;
        margin: 1rem 0;
        border-left: 4px solid #66bb6a;
    }
    
    .result-box {
        background: linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%);
        padding: 2rem;
        border-radius: 10px;
        border-left: 4px solid #42a5f5;
        margin: 1rem 0;
        font-size: 16px;
        line-height: 1.6;
    }
    
    .stSelectbox > div > div {
        font-size: 16px;
    }
    
    .stTextArea > div > div > textarea {
        font-size: 16px;
    }
    
    h1, h2, h3 {
        color: #1565c0;
    }
    
    .stButton > button {
        font-size: 16px;
        font-weight: 600;
        border-radius: 8px;
        padding: 0.5rem 1.5rem;
    }
</style>
""", unsafe_allow_html=True)

# Initialize session state
if 'books_loader' not in st.session_state:
    try:
        st.session_state.books_loader = BooksLoader()
        st.session_state.books = st.session_state.books_loader.get_all_books()
    except Exception as e:
        st.error(f"Error loading books data: {e}")
        st.stop()

if 'rewritten_story' not in st.session_state:
    st.session_state.rewritten_story = None

# Main header
st.markdown("""
<div class="main-header">
    <h1>📚 Build-A-Story Rewriter</h1>
    <p style="font-size: 18px; margin: 0;">Transform classic stories with your creativity</p>
</div>
""", unsafe_allow_html=True)

# Demo notice
if not GOOGLE_AI_AVAILABLE:
    st.markdown("""
    <div class="demo-notice">
        <strong>Demo Mode:</strong> This version shows you how your story would be transformed. 
        Install <code>google-generativeai</code> to enable full AI functionality.
    </div>
    """, unsafe_allow_html=True)

# Book Selection
st.markdown('<div class="section">', unsafe_allow_html=True)
st.markdown("## 📖 Step 1: Choose Your Story")

book_options = [""] + [f"{book['title']} by {book['author']}" for book in st.session_state.books]
selected_book_option = st.selectbox(
    "Select a classic book:",
    book_options,
    key="book_selection"
)

if selected_book_option:
    selected_title = selected_book_option.split(" by ")[0]
    selected_book = st.session_state.books_loader.get_book_by_title(selected_title)
    
    if selected_book:
        st.markdown(f"""
        <div class="book-info">
            <strong>{selected_book['title']}</strong> by {selected_book['author']}<br>
            <em>{selected_book['genre']} • {selected_book['era']}</em><br>
            Theme: {selected_book['theme']}
        </div>
        """, unsafe_allow_html=True)
        
        with st.expander("Preview original text"):
            st.write(selected_book['first_page'][:400] + "...")

st.markdown('</div>', unsafe_allow_html=True)

# Creative Parameters
st.markdown('<div class="section">', unsafe_allow_html=True)
st.markdown("## 🎨 Step 2: Make It Your Own")

# New Setting
new_setting = st.selectbox(
    "**Setting:** Where does your story take place?",
    ["", "Modern city", "Space station", "Medieval castle", "Underwater kingdom", 
     "Desert island", "Magical forest", "Wild west town", "School campus", 
     "Mountain village", "Pirate ship", "Future robot city"],
    key="setting"
)

# Main Characters (Required)
main_characters = st.text_area(
    "**Characters:** Who are your main characters? *",
    placeholder="Example: A brave young scientist named Alex and their talking robot assistant",
    height=100,
    key="characters"
)

# Time Period
time_period = st.selectbox(
    "**Time Period:** When does your story happen?",
    ["", "Present day", "Far future", "Ancient times", "Medieval period",
     "Wild West era", "Victorian era", "Stone age", "1920s"],
    key="time"
)

# Theme
new_theme = st.selectbox(
    "**Theme:** What message should your story share?",
    ["", "Friendship and teamwork", "Courage and bravery", "Following your dreams",
     "Protecting the environment", "Helping others", "Overcoming fears", 
     "The power of kindness", "Learning from mistakes"],
    key="theme"
)

# Advanced Options
with st.expander("🎭 More Options (Optional)"):
    tone = st.selectbox(
        "Tone/Style:",
        ["", "Funny and lighthearted", "Mysterious and suspenseful", "Heroic and brave",
         "Magical and whimsical", "Exciting and action-packed", "Educational"],
        key="tone"
    )
    
    mood = st.selectbox(
        "Mood/Feeling:",
        ["", "Happy and optimistic", "Mysterious and intriguing", "Adventurous and thrilling",
         "Calm and peaceful", "Exciting and energetic", "Magical and wonder-filled"],
        key="mood"
    )
    
    genre = st.selectbox(
        "New Genre:",
        ["", "Science Fiction", "Fantasy Adventure", "Mystery", "Comedy",
         "Superhero Story", "Animal Adventure", "School Story", "Time Travel"],
        key="genre"
    )
    
    special_elements = st.text_area(
        "Special Elements:",
        placeholder="Example: talking animals, magic powers, robots, time travel",
        height=100,
        key="special"
    )

st.markdown('</div>', unsafe_allow_html=True)

# Actions
st.markdown('<div class="section">', unsafe_allow_html=True)
st.markdown("## 🚀 Step 3: Create Your Story")

form_valid = bool(selected_book_option and new_setting and main_characters.strip())

if not form_valid:
    st.warning("Please select a book, setting, and describe your characters.")

col1, col2, col3 = st.columns([1, 1, 1])

with col1:
    if st.button("👀 Preview", disabled=not form_valid):
        if form_valid:
            st.markdown(f"""
            <div class="preview-box">
                <strong>Your Story Plan:</strong><br>
                📚 Original: {selected_book_option}<br>
                🏞️ Setting: {new_setting}<br>
                👥 Characters: {main_characters}<br>
                {f"⏰ Time: {time_period}<br>" if time_period else ""}
                {f"💡 Theme: {new_theme}<br>" if new_theme else ""}
            </div>
            """, unsafe_allow_html=True)

with col2:
    button_text = "✨ Create Demo" if not GOOGLE_AI_AVAILABLE else "✨ Rewrite Story"
    if st.button(button_text, disabled=not form_valid, type="primary"):
        if form_valid:
            with st.spinner("Creating your story..."):
                try:
                    selected_title = selected_book_option.split(" by ")[0]
                    selected_book = st.session_state.books_loader.get_book_by_title(selected_title)
                    
                    if GOOGLE_AI_AVAILABLE:
                        # AI implementation would go here
                        rewritten_text = create_demo_rewrite(
                            selected_book, main_characters, new_setting, new_theme,
                            time_period, tone, mood, genre, special_elements
                        )
                    else:
                        rewritten_text = create_demo_rewrite(
                            selected_book, main_characters, new_setting, new_theme,
                            time_period, tone, mood, genre, special_elements
                        )
                    
                    st.session_state.rewritten_story = {
                        'text': rewritten_text,
                        'original_title': selected_book['title']
                    }
                    
                    st.success("Story created!")
                    
                except Exception as e:
                    st.error(f"Error: {e}")

with col3:
    if st.button("🔄 Reset"):
        for key in ['book_selection', 'setting', 'characters', 'time', 'theme', 'tone', 'mood', 'genre', 'special']:
            if key in st.session_state:
                del st.session_state[key]
        st.session_state.rewritten_story = None
        st.rerun()

st.markdown('</div>', unsafe_allow_html=True)

# Results
if st.session_state.rewritten_story:
    st.markdown('<div class="section">', unsafe_allow_html=True)
    st.markdown("## ✨ Your Transformed Story")
    
    result = st.session_state.rewritten_story
    
    st.markdown(f"""
    <div class="result-box">
        {result['text']}
    </div>
    """, unsafe_allow_html=True)
    
    col1, col2 = st.columns(2)
    with col1:
        if st.button("📋 Copy Text"):
            st.info("Use Ctrl+A, Ctrl+C to copy the story above")
    
    with col2:
        if st.button("🖨️ Print"):
            st.info("Use Ctrl+P to print this page")
    
    st.markdown('</div>', unsafe_allow_html=True)

# Footer
st.markdown("---")
st.markdown("""
<div style="text-align: center; color: #666; padding: 1rem;">
    <strong>Build-A-Story Rewriter</strong> - Transform classic literature with creativity
</div>
""", unsafe_allow_html=True)

