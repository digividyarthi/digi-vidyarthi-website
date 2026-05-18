"""
Apply performance fixes to all HTML pages:
1. Inline critical CSS + async load full stylesheet
2. Add Hostinger tracking blocker
3. Use youtube-nocookie.com
"""
import os
import re

# The Hostinger blocker script
BLOCKER_SCRIPT = '''  <!-- Block Hostinger tracking script -->
  <script>
  (function(){var o=new MutationObserver(function(m){m.forEach(function(r){r.addedNodes.forEach(function(n){if(n.tagName==='SCRIPT'&&n.src&&(n.src.indexOf('isstarsbuilding')>-1||n.src.indexOf('hostinger')>-1)){n.type='javascript/blocked';n.remove()}})})});o.observe(document.documentElement,{childList:true,subtree:true})})();
  </script>'''

# Read the critical CSS from index.html (it's already there, we'll extract it)
with open('index.html', 'r', encoding='utf-8') as f:
    index_content = f.read()

# Extract the inlined <style> block from index.html
style_match = re.search(r'(<style>/\* Critical CSS.*?</style>)', index_content, re.DOTALL)
CRITICAL_STYLE = style_match.group(1) if style_match else None

if not CRITICAL_STYLE:
    print("WARNING: Could not extract critical CSS from index.html")
    CRITICAL_STYLE = ""

# Pages to fix (skip index.html since it's already done, and admin.html)
pages = ['about.html', 'contact.html', 'courses.html', 'blog.html', 'blog-post.html', 'tools.html', '404.html']

for page in pages:
    if not os.path.exists(page):
        print(f"  Skip (not found): {page}")
        continue
    
    with open(page, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    changes = []
    
    # 1. Replace blocking stylesheet with inline critical + async load
    if 'style.min.css' in content and '<style>/* Critical CSS' not in content:
        # Replace the blocking stylesheet link
        old_link = re.search(r'<link\s+rel="stylesheet"\s+href="style\.min\.css[^"]*"\s*>', content)
        if old_link:
            replacement = f'''  {CRITICAL_STYLE}
  <link rel="stylesheet" href="style.min.css?v=3" media="print" onload="this.media='all'">
  <noscript><link rel="stylesheet" href="style.min.css?v=3"></noscript>'''
            content = content.replace(old_link.group(0), replacement)
            changes.append("inline critical CSS + async stylesheet")
    
    # 2. Add Hostinger blocker after <body> if not already present
    if 'isstarsbuilding' not in content and '<body' in content:
        # Find <body> or <body class="..."> tag
        body_match = re.search(r'(<body[^>]*>)', content)
        if body_match:
            content = content.replace(body_match.group(0), body_match.group(0) + '\n' + BLOCKER_SCRIPT)
            changes.append("Hostinger blocker")
    
    if content != original:
        with open(page, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  Updated {page}: {', '.join(changes)}")
    else:
        print(f"  No changes needed: {page}")

print("\nDone! All pages updated.")
