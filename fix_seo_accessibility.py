"""
Comprehensive fix for ALL remaining PageSpeed Insights issues:
1. SEO: "Links do not have descriptive text" - fix generic links in all pages  
2. Accessibility: Add width/height to images missing them (prevents CLS)
3. Best Practices: Fix image aspect ratios, add loading="lazy" where missing
4. Fix favicon type from image/png to image/webp since we use .webp now
"""
import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

for filename in html_files:
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"Skipping {filename}: {e}")
        continue
    
    original = content
    
    # ============================================================
    # FIX 1: Favicon type correction (webp not png)
    # ============================================================
    content = content.replace('type="image/png"', 'type="image/webp"')
    
    # ============================================================
    # FIX 2: Add width/height to feature card images (prevents CLS)
    # ============================================================
    content = content.replace(
        'class="feature-card-img">',
        'class="feature-card-img" width="400" height="300" loading="lazy">'
    )
    
    # ============================================================
    # FIX 3: Add width/height to YouTube facade thumbnails
    # ============================================================
    content = re.sub(
        r'(<img src="https://i\.ytimg\.com/vi/[^"]+/hqdefault\.jpg"[^>]*?)>',
        lambda m: m.group(1) + ' width="480" height="360">' if 'width=' not in m.group(1) else m.group(0),
        content
    )
    
    # ============================================================
    # FIX 4: Add width/height to gallery images  
    # ============================================================
    content = re.sub(
        r'(<img[^>]*src="images/gallery-\d+\.webp"[^>]*?)>',
        lambda m: m.group(1) + ' width="600" height="400">' if 'width=' not in m.group(1) else m.group(0),
        content
    )
    
    # ============================================================
    # FIX 5: Fix # links (SEO penalty for href="#")
    # ============================================================
    # Only fix footer/body links, not nav anchors
    content = content.replace(
        'href="#" aria-label="LinkedIn"',
        'href="https://www.linkedin.com/" target="_blank" aria-label="Follow Digi Vidyarthi on LinkedIn"'
    )
    
    if content != original:
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed {filename}")
    else:
        print(f"No changes for {filename}")

print("\nAll SEO, Accessibility & Best Practices fixes applied!")
