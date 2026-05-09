import os
import re

files_to_update = {
    'about.html': {
        'title': 'About Digi Vidyarthi | Best Digital Marketing Institute Varanasi',
        'desc': 'Discover Digi Vidyarthi, the premier digital marketing institute in Varanasi. Learn from expert mentors with 100% practical training & live projects.'
    },
    'contact.html': {
        'title': 'Contact Digi Vidyarthi | Digital Marketing Course in Varanasi',
        'desc': 'Contact Digi Vidyarthi to book a free demo class. Get details on the best digital marketing course in Varanasi, admissions, and career guidance.'
    },
    'courses.html': {
        'title': 'Digital Marketing Courses in Varanasi | Digi Vidyarthi',
        'desc': "Enroll in Varanasi's best digital marketing courses. Master SEO, SMM, Google Ads & AI tools with 100% practical training and placement support."
    },
    'blog.html': {
        'title': 'Digital Marketing Blog | Digi Vidyarthi Varanasi',
        'desc': 'Read the latest digital marketing tips, SEO strategies, social media insights, and industry updates from Digi Vidyarthi in Varanasi.'
    },
    'tools.html': {
        'title': 'AI & Digital Marketing Tools | Digi Vidyarthi Varanasi',
        'desc': 'Learn the best AI & digital marketing tools at Digi Vidyarthi in Varanasi - ChatGPT, Canva AI, SEMrush, Google Analytics, Jasper & more.'
    },
    '404.html': {
        'title': 'Page Not Found | Digi Vidyarthi Varanasi',
        'desc': 'The page you are looking for does not exist on Digi Vidyarthi. Return to the homepage to explore our digital marketing courses.'
    },
    'index.html': {
        'title': 'Best Digital Marketing Institute in Varanasi | Digi Vidyarthi',
        'desc': 'Looking for the best digital marketing institute in Varanasi? Digi Vidyarthi offers practical courses, live projects, certifications & 100% placement.'
    }
}

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

for filename in html_files:
    # Try different encodings
    content = None
    for encoding in ['utf-8', 'utf-16le', 'utf-16']:
        try:
            with open(filename, 'r', encoding=encoding) as f:
                content = f.read()
            break
        except UnicodeDecodeError:
            continue
            
    if content is None:
        print(f"Could not read {filename}")
        continue
        
    original_content = content

    # 1. Update Title and Description if in the dictionary
    if filename in files_to_update:
        data = files_to_update[filename]
        
        # Replace title
        content = re.sub(r'<title>.*?</title>', f'<title>{data["title"]}</title>', content, flags=re.IGNORECASE|re.DOTALL)
        
        # Replace description
        # Need to handle multi-line descriptions
        content = re.sub(r'<meta name=["\']description["\'].*?>', f'<meta name="description" content="{data["desc"]}">', content, flags=re.IGNORECASE|re.DOTALL)
        
        # If no description existed, add it below title
        if '<meta name="description"' not in content:
            content = content.replace('</title>', f'</title>\n  <meta name="description" content="{data["desc"]}">')
            
    # 2. Fix FontAwesome Render Blocking
    fa_old = '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">'
    fa_new = '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" media="print" onload="this.media=\'all\'">\n  <noscript><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"></noscript>'
    if fa_old in content:
        content = content.replace(fa_old, fa_new)

    # 3. Add loading="lazy" to all images that don't have it and are not hero
    # This is tricky with regex, we'll just use a simple replace for specific known images that need it
    # The gallery images already have it. 
    # Let's ensure logo does NOT have it (it's above fold). Hero does NOT have it.
    
    # 4. Open Graph tags
    if 'property="og:title"' not in content and filename in files_to_update:
        og_tags = f"""
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://digividyarthi.com/{filename.replace('index.html', '')}">
  <meta property="og:title" content="{files_to_update[filename]['title']}">
  <meta property="og:description" content="{files_to_update[filename]['desc']}">
  <meta property="og:image" content="https://digividyarthi.com/images/og-banner.jpg">
  <meta property="og:site_name" content="Digi Vidyarthi">
  <meta property="og:locale" content="en_IN">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{files_to_update[filename]['title']}">
  <meta name="twitter:description" content="{files_to_update[filename]['desc']}">
  <meta name="twitter:image" content="https://digividyarthi.com/images/og-banner.jpg">
"""
        content = content.replace('</head>', f'{og_tags}\n</head>')

    if content != original_content:
        # Write back with utf-8 to standardize
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filename}")
