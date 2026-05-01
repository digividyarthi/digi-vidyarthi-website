import os
import re

# Fix style.css
with open('style.css', 'r', encoding='utf-8') as f:
    css_content = f.read()

import_statement = "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@400;500;600;700;800;900&display=swap');"
if import_statement in css_content:
    css_content = css_content.replace(import_statement, '')
    with open('style.css', 'w', encoding='utf-8') as f:
        f.write(css_content)

# Fix HTML files
html_files = [f for f in os.listdir('.') if f.endswith('.html')]
font_link = '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">'

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        html = f.read()
    
    if font_link not in html and '<head>' in html:
        html = html.replace('</head>', f'  {font_link}\n</head>')
        with open(file, 'w', encoding='utf-8') as f:
            f.write(html)

print('Fonts fixed successfully.')
