import os
import re
from bs4 import BeautifulSoup
import json

HTML_DIR = '.'
pages = [f for f in os.listdir(HTML_DIR) if f.endswith('.html') and f != 'admin.html']

report = {
    'summary': {'total_pages': len(pages), 'issues_found': 0},
    'pages': {},
    'site_wide': {}
}

# Check robots.txt and sitemap.xml
report['site_wide']['robots_txt'] = os.path.exists('robots.txt')
report['site_wide']['sitemap_xml'] = os.path.exists('sitemap.xml')

for page in pages:
    page_report = {'issues': [], 'good': []}
    
    with open(page, 'r', encoding='utf-8') as f:
        content = f.read()
        
    soup = BeautifulSoup(content, 'html.parser')
    
    # Title
    title = soup.title
    if not title or not title.string:
        page_report['issues'].append('Missing <title> tag')
        report['summary']['issues_found'] += 1
    else:
        title_len = len(title.string)
        if title_len < 30 or title_len > 65:
            page_report['issues'].append(f'Title length ({title_len} chars) is not optimal (should be 30-65)')
            report['summary']['issues_found'] += 1
        else:
            page_report['good'].append('Title is optimal')

    # Meta Description
    meta_desc = soup.find('meta', attrs={'name': 'description'})
    if not meta_desc or not meta_desc.get('content'):
        page_report['issues'].append('Missing meta description')
        report['summary']['issues_found'] += 1
    else:
        desc_len = len(meta_desc.get('content'))
        if desc_len < 100 or desc_len > 160:
            page_report['issues'].append(f'Meta description length ({desc_len} chars) is not optimal (should be 120-160)')
            report['summary']['issues_found'] += 1
        else:
            page_report['good'].append('Meta description is optimal')

    # Canonical
    canonical = soup.find('link', attrs={'rel': 'canonical'})
    if not canonical:
        page_report['issues'].append('Missing canonical link')
        report['summary']['issues_found'] += 1
    else:
        page_report['good'].append('Has canonical link')

    # H1 Tags
    h1_tags = soup.find_all('h1')
    if len(h1_tags) == 0:
        page_report['issues'].append('Missing <h1> tag')
        report['summary']['issues_found'] += 1
    elif len(h1_tags) > 1:
        page_report['issues'].append(f'Multiple <h1> tags found ({len(h1_tags)}). Should ideally be just one.')
        report['summary']['issues_found'] += 1
    else:
        page_report['good'].append('Exactly one <h1> tag found')

    # Image Alt Text
    images = soup.find_all('img')
    images_without_alt = [img for img in images if not img.get('alt')]
    if images_without_alt:
        page_report['issues'].append(f'{len(images_without_alt)} images missing alt text')
        report['summary']['issues_found'] += 1
    else:
        page_report['good'].append('All images have alt text')
        
    # Schema Markup
    schema = soup.find('script', attrs={'type': 'application/ld+json'})
    if not schema:
        page_report['issues'].append('Missing Schema.org JSON-LD markup')
        report['summary']['issues_found'] += 1
    else:
        page_report['good'].append('Schema markup present')
        
    report['pages'][page] = page_report

with open('seo_audit_results.json', 'w', encoding='utf-8') as f:
    json.dump(report, f, indent=2)

print("SEO Audit complete. Results saved to seo_audit_results.json")
