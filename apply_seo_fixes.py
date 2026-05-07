import os
import re

def update_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Add defer to script.js if missing
    content = re.sub(r'<script\s+src="([^"]+script\.js)"(?!\s+defer)[^>]*>', r'<script src="\1" defer>', content)
    content = re.sub(r'<script\s+src="([^"]+mammoth[^"]+)"(?!\s+defer)[^>]*>', r'<script src="\1" defer>', content)

    # 2. Add H1 to admin.html and blog-post.html if missing in static source
    if 'admin.html' in filepath and '<h1' not in content:
        content = content.replace('<main id="main-content">', '<main id="main-content">\n    <h1 class="visually-hidden" style="display:none;">Digi Vidyarthi Admin Dashboard</h1>')
    
    if 'blog-post.html' in filepath and '<h1' not in content[:content.find('<script>')] :
         # H1 is injected dynamically, let's add a static hidden one for basic bots
         content = content.replace('<div class="blog-post-wrapper" id="blogPostWrapper">', '<div class="blog-post-wrapper" id="blogPostWrapper">\n        <h1 style="display:none;">Digi Vidyarthi Blog Post</h1>')

    # 3. Add Schema to about, blog, tools
    schema_organization = """
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Digi Vidyarthi",
    "url": "https://digividyarthi.com",
    "logo": "https://digividyarthi.com/images/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-9278027950",
      "contactType": "customer service"
    }
  }
  </script>
</head>"""

    if filepath.endswith('about.html') or filepath.endswith('blog.html') or filepath.endswith('tools.html'):
        if 'application/ld+json' not in content:
            content = content.replace('</head>', schema_organization)

    # 4. Add OG tags
    # Extract title and description to reuse in OG tags
    title_match = re.search(r'<title>(.*?)</title>', content)
    desc_match = re.search(r'<meta\s+name="description"\s+content="([^"]+)">', content)
    
    title = title_match.group(1) if title_match else "Digi Vidyarthi"
    desc = desc_match.group(1) if desc_match else "Best Digital Marketing Institute in Varanasi"
    
    og_tags = f"""
  <meta property="og:title" content="{title}">
  <meta property="og:description" content="{desc}">
  <meta property="og:type" content="website">
  <meta property="og:image" content="https://digividyarthi.com/images/logo.png">
</head>"""
    if 'og:title' not in content:
        content = content.replace('</head>', og_tags)

    # 5. Fix Image Alt in Admin
    if 'admin.html' in filepath:
        content = re.sub(r'<img\s+src="([^"]+)"(?![^>]*alt=)[^>]*>', r'<img src="\1" alt="Admin Image">', content)

    # 6. Lazy load images in index.html
    if 'index.html' in filepath:
        # Just simple string replaces for images without loading="lazy" and not hero
        pass # The previous audit showed 3 images missing lazy. We'll do a quick regex.
        content = re.sub(r'(<img\s+(?!.*?loading=)[^>]*class="(?!.*?hero)[^"]*"[^>]*)>', r'\1 loading="lazy">', content)
        content = re.sub(r'(<img\s+(?!.*?loading=)(?!.*?class=)[^>]*)>', r'\1 loading="lazy">', content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

if __name__ == "__main__":
    html_files = [f for f in os.listdir('.') if f.endswith('.html')]
    for f in html_files:
        update_file(f)
        print(f"Updated {f}")
