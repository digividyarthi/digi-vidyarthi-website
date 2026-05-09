"""
FIX: Restore style.min.css as render-blocking (NOT async).
The async/preload approach caused FOUC (Flash of Unstyled Content)
which made the site look broken and non-responsive on mobile.

The CSS file MUST be render-blocking because:
- It contains ALL mobile responsive breakpoints
- Without it, the page renders with only basic inline critical CSS
- This makes the site look terrible on mobile until the full CSS loads

Instead, we will keep CSS render-blocking but:
- Keep FontAwesome async (not needed for first paint)
- Keep Google Fonts async (not needed for first paint)
- Keep images optimized (WebP)
- Keep JS deferred
"""
import os

html_files = [f for f in os.listdir('.') if f.endswith('.html') and f != 'admin.html']

for filename in html_files:
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"Skipping {filename}: {e}")
        continue
    
    original = content
    
    # FIX 1: Remove inline critical CSS and async style.min.css
    # Replace with normal render-blocking style.min.css
    
    # Find and remove the inline <style> block with critical CSS
    import re
    content = re.sub(r'<style>/\* Critical CSS.*?</style>\s*', '', content, flags=re.DOTALL)
    
    # Replace async preload pattern with normal stylesheet link  
    content = content.replace(
        '<link rel="preload" href="style.min.css" as="style" onload="this.onload=null;this.rel=\'stylesheet\'">\n  <noscript><link rel="stylesheet" href="style.min.css"></noscript>',
        '<link rel="stylesheet" href="style.min.css">'
    )
    
    # Also handle the case where it's on one line
    content = content.replace(
        '<link rel="preload" href="style.min.css" as="style" onload="this.onload=null;this.rel=\'stylesheet\'">',
        '<link rel="stylesheet" href="style.min.css">'
    )
    content = content.replace(
        '<noscript><link rel="stylesheet" href="style.min.css"></noscript>',
        ''
    )
    
    # Clean up any duplicate empty lines
    content = re.sub(r'\n\s*\n\s*\n', '\n\n', content)
    
    if content != original:
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed {filename}")
    else:
        print(f"No changes for {filename}")

print("\nCSS loading restored to render-blocking. Mobile responsiveness fixed!")
