import os
import re
from bs4 import BeautifulSoup
import json

def analyze_html(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    soup = BeautifulSoup(content, 'html.parser')
    
    issues = []
    good_points = []
    
    # 1. Title
    title = soup.find('title')
    if not title or not title.text.strip():
        issues.append("Missing <title> tag")
    elif len(title.text) < 30 or len(title.text) > 60:
        issues.append(f"Title length is suboptimal ({len(title.text)} chars). Ideal: 30-60.")
    else:
        good_points.append("Title length is optimal")
        
    # 2. Meta Description
    meta_desc = soup.find('meta', attrs={'name': 'description'})
    if not meta_desc or not meta_desc.get('content', '').strip():
        issues.append("Missing meta description")
    elif len(meta_desc.get('content')) < 120 or len(meta_desc.get('content')) > 160:
        issues.append(f"Meta description length is suboptimal ({len(meta_desc.get('content'))} chars). Ideal: 120-160.")
    else:
        good_points.append("Meta description length is optimal")
        
    # 3. H1 Tag
    h1s = soup.find_all('h1')
    if len(h1s) == 0:
        issues.append("Missing <h1> tag. Every page should have exactly one H1.")
    elif len(h1s) > 1:
        issues.append(f"Multiple <h1> tags found ({len(h1s)}). Should ideally be just one.")
    else:
        good_points.append("Exactly one H1 tag found")
        
    # 4. Images Alt Attributes
    images = soup.find_all('img')
    missing_alt = [img for img in images if not img.get('alt') or not img.get('alt').strip()]
    if missing_alt:
        issues.append(f"{len(missing_alt)} out of {len(images)} images are missing alt text.")
    else:
        good_points.append("All images have alt text")
        
    # Lazy loading
    missing_lazy = [img for img in images if img.get('loading') != 'lazy' and not 'hero' in img.get('class', [])]
    if missing_lazy and len(images) > 3:
        issues.append(f"{len(missing_lazy)} images might be missing 'loading=\"lazy\"'.")
        
    # 5. Open Graph / Twitter Cards
    og_title = soup.find('meta', attrs={'property': 'og:title'})
    if not og_title:
        issues.append("Missing Open Graph tags (og:title, etc.) for social sharing.")
        
    # 6. Schema Markup
    schema = soup.find('script', type='application/ld+json')
    if not schema:
        issues.append("Missing Structured Data (Schema.org JSON-LD).")
    else:
        good_points.append("Schema markup present")
        
    # 7. JavaScript performance
    scripts = soup.find_all('script', src=True)
    blocking_scripts = [s for s in scripts if not s.get('defer') and not s.get('async')]
    if blocking_scripts:
        issues.append(f"{len(blocking_scripts)} external scripts are render-blocking (missing 'defer' or 'async').")
        
    return {
        "file": os.path.basename(file_path),
        "issues": issues,
        "good": good_points
    }

def main():
    directory = "."
    results = []
    html_files = [f for f in os.listdir(directory) if f.endswith('.html')]
    
    for f in html_files:
        res = analyze_html(os.path.join(directory, f))
        results.append(res)
        
    for r in results:
        with open('audit_results_utf8.txt', 'a', encoding='utf-8') as out:
            out.write(f"--- {r['file']} ---\n")
            if r['issues']:
                out.write("Issues:\n")
                for i in r['issues']:
                    out.write(f"  - {i}\n")
            if r['good']:
                out.write("Good:\n")
                for g in r['good']:
                    out.write(f"  + {g}\n")
            out.write("\n")

if __name__ == "__main__":
    main()
