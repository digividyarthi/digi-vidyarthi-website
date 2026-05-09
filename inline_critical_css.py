"""
Inline critical CSS and defer the main stylesheet to eliminate render-blocking CSS.
This is the #1 fix for FCP (First Contentful Paint).
"""
import os

# Read critical CSS
with open('critical.css', 'r', encoding='utf-8') as f:
    critical_css = f.read().strip()

# Minify critical CSS (remove newlines)
critical_css = ' '.join(critical_css.split())

html_files = [f for f in os.listdir('.') if f.endswith('.html') and f != 'admin.html']

for filename in html_files:
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"Skipping {filename}: {e}")
        continue
    
    original = content
    
    # Replace render-blocking style.min.css with async loading + inline critical CSS
    old_css_link = '<link rel="stylesheet" href="style.min.css">'
    
    if old_css_link in content:
        new_css = f'''<style>{critical_css}</style>
  <link rel="preload" href="style.min.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="style.min.css"></noscript>'''
        content = content.replace(old_css_link, new_css)
    
    if content != original:
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filename}")
    else:
        print(f"No changes for {filename}")

print("\nCritical CSS inlined and main CSS deferred!")
