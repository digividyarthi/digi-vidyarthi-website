import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

# Dictionary for social media aria-labels
social_labels = {
    'fa-facebook': 'Facebook',
    'fa-instagram': 'Instagram',
    'fa-youtube': 'YouTube',
    'fa-linkedin': 'LinkedIn',
    'fa-whatsapp': 'WhatsApp',
    'fa-twitter': 'Twitter'
}

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Add aria-label to links with icons but no descriptive text
    # Find all <a> tags
    def add_aria(match):
        a_tag = match.group(0)
        # If it already has aria-label, leave it
        if 'aria-label=' in a_tag:
            return a_tag
        # Check if it has a font-awesome brand icon
        for cls, label in social_labels.items():
            if cls in a_tag:
                # Insert aria-label right after <a
                return a_tag.replace('<a ', f'<a aria-label="{label}" ')
        return a_tag

    content = re.sub(r'<a[^>]*>.*?</a>', add_aria, content, flags=re.DOTALL)

    # 2. Main Landmark
    # Add <main id="main-content"> after </nav> and </main> before <footer
    if '<main' not in content and '</nav>' in content and '<footer' in content:
        content = content.replace('</nav>', '</nav>\n\n  <main id="main-content">')
        content = content.replace('<footer', '  </main>\n\n  <footer')

    # 3. Redundant Alt Texts
    content = content.replace('Logo"', '"') # "Digi Vidyarthi Logo" -> "Digi Vidyarthi "
    content = content.replace(' Logo"', '"')

    # 4. Specific to index.html
    if file == 'index.html':
        # Fix heading hierarchy (h3 to div.stat-number)
        content = content.replace('<h3>500+</h3>', '<div class="stat-number" style="font-size: 2.5rem; font-weight: 800; color: var(--blue); margin-bottom: 5px;">500+</div>')
        content = content.replace('<h3>10+</h3>', '<div class="stat-number" style="font-size: 2.5rem; font-weight: 800; color: var(--blue); margin-bottom: 5px;">10+</div>')
        content = content.replace('<h3>95%</h3>', '<div class="stat-number" style="font-size: 2.5rem; font-weight: 800; color: var(--blue); margin-bottom: 5px;">95%</div>')
        
        # Add width/height to images to fix CLS
        # Logo
        content = re.sub(r'(<img src="images/logo\.png"[^>]+)>', r'\1 width="150" height="45">', content)
        # Hero image
        content = re.sub(r'(<img src="images/hero-mentor\.png"[^>]+)>', r'\1 width="500" height="500">', content)
        # Gallery images
        content = re.sub(r'(<img src="images/gallery-\d\.jpg"[^>]+)>', r'\1 width="300" height="200">', content)

    # Write back
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print('All accessibility and CLS fixes applied.')
