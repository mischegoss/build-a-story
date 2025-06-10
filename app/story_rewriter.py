"""
Build-A-Story Streamlit Interface

No wrapper divs - content directly in Streamlit columns with CSS overrides.
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
    layout="wide"
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

    return demo_opening

# Custom CSS - override Streamlit defaults and style content directly
st.markdown("""
<style>
    /* NUCLEAR CSS OVERRIDES - Target ALL Streamlit containers */
    .main .block-container {
        padding-top: 0.5rem !important;
        padding-bottom: 1rem !important;
    }
    
    /* Remove ALL Streamlit spacing - more aggressive */
    .stColumn > div {
        padding: 0 !important;
        margin: 0 !important;
    }
    
    .stColumn > div > div {
        padding: 0 !important;
        margin: 0 !important;
    }
    
    .stColumn > div > div > div {
        margin: 0 !important;
        padding: 0 !important;
    }
    
    /* Target Streamlit test IDs */
    [data-testid="column"] > div {
        gap: 0 !important;
        padding: 0 !important;
    }
    
    /* Target specific Streamlit containers */
    .element-container {
        margin: 0 !important;
        padding: 0 !important;
    }
    
    .stMarkdown {
        margin: 0 !important;
        padding: 0 !important;
    }
    
    /* Force columns to start at top */
    .stColumn {
        display: flex !important;
        flex-direction: column !important;
        align-items: stretch !important;
    }
    
    /* Main Header */
    .main-header {
        text-align: center;
        padding: 2rem 0 3rem 0;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border-radius: 15px;
        margin-bottom: 2rem;
        box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
    }
    
    .main-header h1 {
        color: white !important;
        margin-bottom: 0.5rem;
        font-size: 2.5rem;
    }
    
    /* Demo Notice */
    .demo-notice {
        background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
        padding: 1rem 1.5rem;
        border-radius: 10px;
        margin-bottom: 2rem;
        border-left: 4px solid #ff9800;
        text-align: center;
    }
    
    /* Progress Banner */
    .progress-banner {
        background: white;
        border-radius: 15px;
        padding: 2rem;
        margin-bottom: 2rem;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        border: 2px solid #e3f2fd;
    }
    
    .progress-track {
        height: 8px;
        background: #e3f2fd;
        border-radius: 4px;
        position: relative;
        margin-bottom: 1.5rem;
        overflow: hidden;
    }
    
    /* Enhanced Progress Bar with Color Gradient */
    .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #2196F3 0%, #FF9800 50%, #9C27B0 100%);
        border-radius: 4px;
        position: absolute;
        transition: width 0.5s ease;
    }
    
    .progress-labels {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .progress-label {
        text-align: center;
        flex: 1;
        color: #999;
        font-weight: 500;
        transition: all 0.3s ease;
    }
    
    .progress-label.active {
        color: #1976d2;
        font-weight: 600;
    }
    
    .progress-label.completed {
        color: #4caf50;
        font-weight: 600;
    }
    
    .progress-icon {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
        transition: transform 0.3s ease;
    }
    
    .progress-label.active .progress-icon,
    .progress-label.completed .progress-icon {
        transform: scale(1.1);
    }
    
    /* Connected Form Sections - Updated Colors */
    .form-section {
        background: white;
        border: none;
        padding: 2.5rem;
        margin: 0;
        border-radius: 0;
        border-bottom: 1px solid #E0E0E0;
        position: relative;
    }
    
    /* First section */
    .form-section:nth-of-type(1) {
        border-radius: 11px 11px 0 0; /* Fit inside container border */
    }
    
    /* Third section */
    .form-section:nth-of-type(3) {
        border-radius: 0 0 11px 11px; /* Fit inside container border */
        border-bottom: none;
    }
    
    /* Force immediate connection between sections */
    .form-section + .form-section {
        margin-top: -1px !important;
    }
    
    /* Step Headers with Thick Bottom Borders */
    .step-header {
        color: #424242;
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 2rem;
        padding: 1.5rem 0 1.5rem 0;
        background: white;
        border-radius: 0;
        box-shadow: none;
        text-align: left;
        border-bottom: 6px solid;
    }
    
    /* Step-specific bottom border colors */
    .form-section:nth-of-type(1) .step-header {
        border-bottom-color: #2196F3; /* Blue */
    }
    
    .form-section:nth-of-type(2) .step-header {
        border-bottom-color: #FF9800; /* Orange */
    }
    
    .form-section:nth-of-type(3) .step-header {
        border-bottom-color: #9C27B0; /* Purple */
    }
    
    /* Enhanced Getting Started */
    .getting-started {
        text-align: center;
        padding: 3rem 2rem;
        color: #546E7A;
        background: linear-gradient(135deg, #E3F2FD 0%, #F8F9FA 100%);
        border: 4px solid #2196F3;
        border-radius: 15px;
        box-shadow: 0 12px 40px rgba(33, 150, 243, 0.3);
        margin-top: -0.5rem;
        min-height: 800px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    
    .getting-started h3 {
        color: #1565C0;
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 1.5rem;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    /* Enhanced Right column content containers */
    .right-content {
        background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
        border: 4px solid #2196F3;
        border-radius: 15px;
        padding: 2rem;
        box-shadow: 0 12px 40px rgba(33, 150, 243, 0.3);
        margin-top: -0.5rem;
        min-height: 800px;
    }
    
    .book-card {
        background: linear-gradient(135deg, #e8eaf6 0%, #f3e5f5 100%);
        padding: 1.5rem;
        border-radius: 12px;
        margin: 1rem 0;
        border-left: 5px solid #5c6bc0;
        box-shadow: 0 2px 8px rgba(92, 107, 192, 0.2);
    }
    
    .preview-card {
        background: linear-gradient(135deg, #e8f5e8 0%, #f1f8e9 100%);
        padding: 1.5rem;
        border-radius: 12px;
        margin: 1rem 0;
        border-left: 5px solid #66bb6a;
        box-shadow: 0 2px 8px rgba(102, 187, 106, 0.2);
    }
    
    .story-result {
        background: linear-gradient(135deg, #fff3e0 0%, #fafafa 100%);
        padding: 2rem;
        border-radius: 12px;
        border-left: 5px solid #ff9800;
        font-size: 1.1rem;
        line-height: 1.7;
        margin: 1rem 0;
        box-shadow: 0 4px 16px rgba(255, 152, 0, 0.2);
    }
    
    .story-result h4 {
        color: #e65100;
        margin-bottom: 1rem;
    }
    
    .story-text {
        background: white;
        padding: 1.5rem;
        border-radius: 8px;
        border: 1px solid #ffe0b2;
        font-family: 'Georgia', serif;
        white-space: pre-line;
    }
    
    /* Enhanced Buttons */
    .stButton > button {
        font-size: 1.1rem;
        font-weight: 700;
        border-radius: 12px;
        padding: 0.8rem 2rem;
        border: none;
        transition: all 0.3s ease;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
    
    .stButton > button:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    }
    
    /* Primary button enhanced */
    .stButton > button[kind="primary"] {
        background: linear-gradient(135deg, #4CAF50 0%, #45A049 100%);
    }
    
    .stButton > button[kind="primary"]:hover {
        background: linear-gradient(135deg, #45A049 0%, #3D8B40 100%);
    }
    
    /* Enhanced Typography - Bigger Fonts */
    .stSelectbox label, .stTextArea label {
        font-weight: 600;
        color: #424242;
        font-size: 1.2rem;
    }
    
    .stSelectbox > div > div {
        font-size: 1.2rem;
        border-radius: 10px;
        border: 2px solid #E0E0E0;
    }
    
    .stTextArea > div > div > textarea {
        font-size: 1.2rem;
        border-radius: 10px;
        border: 2px solid #E0E0E0;
        padding: 1rem;
    }
    
    /* Enhanced placeholder text */
    .stTextArea > div > div > textarea::placeholder {
        font-size: 1.1rem;
        color: #9E9E9E;
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

if 'show_preview' not in st.session_state:
    st.session_state.show_preview = False

# =============================================================================
# TOP SECTION (FULL WIDTH)
# =============================================================================

# Main header
st.markdown("""
<div class="main-header">
    <h1>📚✨ Build-A-Story Rewriter ✨📚</h1>
    <p style="font-size: 1.2rem; margin: 0; opacity: 0.9;">Transform classic stories with your creativity</p>
</div>
""", unsafe_allow_html=True)

# Demo notice
if not GOOGLE_AI_AVAILABLE:
    st.markdown("""
    <div class="demo-notice">
        <strong>🚀 Demo Mode Active</strong> • This shows how your story would be transformed. 
        Install <code>google-generativeai</code> for full AI functionality.
    </div>
    """, unsafe_allow_html=True)

# Calculate progress state
selected_book_option = st.session_state.get('book_selection', '')
new_setting = st.session_state.get('setting', '')
main_characters = st.session_state.get('characters', '')

step1_complete = bool(selected_book_option)
step2_complete = bool(new_setting and main_characters.strip())
form_valid = step1_complete and step2_complete

# Progress bar
st.markdown(f"""
<div class="progress-banner">
    <div class="progress-track">
        <div class="progress-fill" style="width: {33 if step1_complete else 0}%"></div>
        <div class="progress-fill" style="width: {33 if step2_complete else 0}%; left: 33%"></div>
        <div class="progress-fill" style="width: {34 if form_valid else 0}%; left: 66%"></div>
    </div>
    <div class="progress-labels">
        <div class="progress-label {'completed' if step1_complete else 'active'}">
            <div class="progress-icon">📖</div>
            <span>Choose Your Story</span>
        </div>
        <div class="progress-label {'completed' if step2_complete else ('active' if step1_complete else '')}">
            <div class="progress-icon">🎨</div>
            <span>Make it Your Own</span>
        </div>
        <div class="progress-label {'completed' if form_valid else ('active' if step2_complete else '')}">
            <div class="progress-icon">✨</div>
            <span>Create Your Story</span>
        </div>
    </div>
</div>
""", unsafe_allow_html=True)

# =============================================================================
# TWO COLUMNS - NO WRAPPER DIVS
# =============================================================================

left_col, right_col = st.columns([1, 1], gap="large")

# LEFT COLUMN - FORM (No wrapper, direct content)
with left_col:
    
    st.markdown('<div class="form-container">', unsafe_allow_html=True)
    
    # Step 1: Book Selection
    st.markdown('<div class="form-section">', unsafe_allow_html=True)
    st.markdown('<div class="step-header">📖 Choose Your Story</div>', unsafe_allow_html=True)
    
    book_options = [""] + [f"{book['title']} by {book['author']}" for book in st.session_state.books]
    selected_book_option = st.selectbox(
        "Select a classic book:",
        book_options,
        key="book_selection",
        help="Choose from our collection of public domain classics"
    )
    st.markdown('</div>', unsafe_allow_html=True)
    st.markdown('</div>', unsafe_allow_html=True)
    
    # Step 2: Customization
    st.markdown('<div class="form-section">', unsafe_allow_html=True)
    st.markdown('<div class="step-header">🎨 Make it Your Own</div>', unsafe_allow_html=True)
    
    # New Setting
    new_setting = st.selectbox(
        "🏞️ **Where does your story take place?**",
        ["", "Modern city", "Space station", "Medieval castle", "Underwater kingdom", 
         "Desert island", "Magical forest", "Wild west town", "School campus", 
         "Mountain village", "Pirate ship", "Future robot city", "Arctic base", "Jungle expedition"],
        key="setting"
    )
    
    # Main Characters (Required)
    main_characters = st.text_area(
        "👥 **Who are your main characters?** *",
        placeholder="Example: A brave young scientist named Alex and their talking robot assistant",
        height=100,
        key="characters",
        help="This field is required! Describe your main characters."
    )
    
    # Time Period
    time_period = st.selectbox(
        "⏰ **When does your story happen?**",
        ["", "Present day", "Far future", "Ancient times", "Medieval period",
         "Wild West era", "Victorian era", "Stone age", "1920s", "Renaissance"],
        key="time"
    )
    
    # Theme
    new_theme = st.selectbox(
        "💡 **What message should your story share?**",
        ["", "Friendship and teamwork", "Courage and bravery", "Following your dreams",
         "Protecting the environment", "Helping others", "Overcoming fears", 
         "The power of kindness", "Learning from mistakes", "Believing in yourself"],
        key="theme"
    )
    
    # Advanced Options
    with st.expander("🎭 Advanced Options (Optional)"):
        tone = st.selectbox(
            "Tone/Style:",
            ["", "Funny and lighthearted", "Mysterious and suspenseful", "Heroic and brave",
             "Magical and whimsical", "Exciting and action-packed", "Educational"],
            key="tone"
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
            height=80,
            key="special"
        )
    
    st.markdown('</div>', unsafe_allow_html=True)
    
    # Step 3: Actions
    st.markdown('<div class="form-section">', unsafe_allow_html=True)
    st.markdown('<div class="step-header">🚀 Create Your Story</div>', unsafe_allow_html=True)
    
    if not form_valid:
        st.warning("⚠️ Please complete Steps 1 and 2 to continue")
    
    col1, col2 = st.columns(2)
    
    with col1:
        if st.button("👀 Preview", disabled=not form_valid, use_container_width=True):
            st.session_state.show_preview = True
    
    with col2:
        button_text = "✨ Create Demo" if not GOOGLE_AI_AVAILABLE else "✨ Rewrite Story"
        if st.button(button_text, disabled=not form_valid, type="primary", use_container_width=True):
            if form_valid:
                with st.spinner("🤖 Creating your story..."):
                    try:
                        selected_title = selected_book_option.split(" by ")[0]
                        selected_book = st.session_state.books_loader.get_book_by_title(selected_title)
                        
                        rewritten_text = create_demo_rewrite(
                            selected_book, main_characters, new_setting, new_theme,
                            time_period, tone, st.session_state.get('mood', ''), genre, special_elements
                        )
                        
                        st.session_state.rewritten_story = {
                            'text': rewritten_text,
                            'original_title': selected_book['title'],
                            'parameters': {
                                'setting': new_setting,
                                'characters': main_characters,
                                'time_period': time_period,
                                'theme': new_theme,
                                'tone': tone,
                                'genre': genre,
                                'special_elements': special_elements
                            }
                        }
                        
                        st.success("🎉 Story created!")
                        
                    except Exception as e:
                        st.error(f"Error: {e}")
    
    st.markdown('</div>', unsafe_allow_html=True)

# RIGHT COLUMN - RESPONSE AREA (No wrapper, direct content with individual styling)
with right_col:
    
    # Show different content based on state - each with its own styling
    if st.session_state.rewritten_story:
        # Show completed story
        result = st.session_state.rewritten_story
        
        st.markdown('<div class="right-content">', unsafe_allow_html=True)
        st.markdown("### ✨ Your Transformed Story")
        
        st.markdown(f"""
        <div class="story-result">
            <h4>📖 Demo Rewrite of "{result['original_title']}"</h4>
            <div class="story-text">{result['text']}</div>
        </div>
        """, unsafe_allow_html=True)
        
        # Action buttons
        col1, col2 = st.columns(2)
        with col1:
            if st.button("📋 Copy Text", use_container_width=True):
                st.info("💡 Use Ctrl+A, Ctrl+C to copy the story above!")
        
        with col2:
            if st.button("🖨️ Print Story", use_container_width=True):
                st.info("💡 Use Ctrl+P to print this page!")
        
        # Future features teaser
        st.markdown("---")
        st.markdown("**Coming Soon:**")
        st.markdown("🎨 Custom book cover generator • 📚 Multi-page stories • 👥 Collaboration features")
        st.markdown('</div>', unsafe_allow_html=True)
    
    elif st.session_state.show_preview and form_valid:
        # Show preview
        st.markdown('<div class="right-content">', unsafe_allow_html=True)
        st.markdown("### 👀 Your Story Preview")
        
        st.markdown(f"""
        <div class="preview-card">
            <h4>📋 Your Creative Choices</h4>
            <strong>📚 Original Story:</strong> {selected_book_option}<br>
            <strong>🏞️ New Setting:</strong> {new_setting}<br>
            <strong>👥 Characters:</strong> {main_characters}<br>
            {f"<strong>⏰ Time Period:</strong> {time_period}<br>" if time_period else ""}
            {f"<strong>💡 Theme:</strong> {new_theme}<br>" if new_theme else ""}
            {f"<strong>🎭 Tone:</strong> {tone}<br>" if tone else ""}
            {f"<strong>📚 Genre:</strong> {genre}<br>" if genre else ""}
        </div>
        """, unsafe_allow_html=True)
        
        st.markdown("Ready to create your transformed story? Click the **Create Demo** button! ✨")
        st.markdown('</div>', unsafe_allow_html=True)
    
    elif selected_book_option:
        # Show book info
        selected_title = selected_book_option.split(" by ")[0]
        selected_book = st.session_state.books_loader.get_book_by_title(selected_title)
        
        if selected_book:
            st.markdown('<div class="right-content">', unsafe_allow_html=True)
            st.markdown("### 📚 Selected Book")
            
            st.markdown(f"""
            <div class="book-card">
                <h4>{selected_book['title']}</h4>
                <p><strong>Author:</strong> {selected_book['author']}</p>
                <p><strong>Genre:</strong> {selected_book['genre']}</p>
                <p><strong>Era:</strong> {selected_book['era']}</p>
                <p><strong>Theme:</strong> {selected_book['theme']}</p>
            </div>
            """, unsafe_allow_html=True)
            
            with st.expander("📖 Preview Original Text"):
                st.write(selected_book['first_page'][:500] + "...")
            
            st.markdown("---")
            st.markdown("**Next Step:** Customize your story settings on the left! 🎨")
            st.markdown('</div>', unsafe_allow_html=True)
    
    else:
        # Show getting started content - standalone with full styling
        st.markdown("""
        <div class="getting-started">
            <h3>🎯 Getting Started</h3>
            <p><strong>Step 1:</strong> Choose a classic book from the left to begin your creative journey!</p>
            <br>
            <p><strong>📚 What you'll do:</strong></p>
            <p>• Pick from 15 amazing classic stories<br>
            • Transform the setting and characters<br>
            • Create your own unique version<br>
            • See your creativity come to life!</p>
        </div>
        """, unsafe_allow_html=True)

# =============================================================================
# BOTTOM SECTION (FULL WIDTH)
# =============================================================================

# Start Over Button (Full Width)
if st.button("🔄 Start Over", use_container_width=True):
    for key in ['book_selection', 'setting', 'characters', 'time', 'theme', 'tone', 'mood', 'genre', 'special']:
        if key in st.session_state:
            del st.session_state[key]
    st.session_state.rewritten_story = None
    st.session_state.show_preview = False
    st.rerun()

# Footer
st.markdown("---")
st.markdown("""
<div style="text-align: center; color: #666; padding: 1rem;">
    <strong>Build-A-Story Rewriter</strong> • Transform classic literature with creativity • Perfect for middle school learning
</div>
""", unsafe_allow_html=True)

