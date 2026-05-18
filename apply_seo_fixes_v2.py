import os
import re
import json

def update_admin():
    try:
        with open('admin.html', 'r', encoding='utf-8') as f:
            content = f.read()

        # 1. Add Meta Description
        if '<meta name="description"' not in content:
            content = content.replace('<title>Admin Panel - Digi Vidyarthi Blog</title>', '<title>Admin Panel - Digi Vidyarthi Blog</title>\n  <meta name="description" content="Admin panel for Digi Vidyarthi blog management and content creation.">')

        # 2. Add JSON-LD Schema
        schema = '''  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Admin Panel",
    "description": "Admin panel for Digi Vidyarthi blog management."
  }
  </script>'''
        if 'application/ld+json' not in content:
            content = content.replace('</head>', f'{schema}\n</head>')

        # 3. Fix missing alt
        content = content.replace('<img src="images/logo.webp" alt="">', '<img src="images/logo.webp" alt="Digi Vidyarthi Logo">')

        # 4. Fix H1
        content = content.replace('<h2>Admin Panel</h2>', '<h1>Admin Panel</h1>')

        with open('admin.html', 'w', encoding='utf-8') as f:
            f.write(content)
        print("Fixed admin.html")
    except Exception as e:
        print(f"Error in admin.html: {e}")

def update_404():
    try:
        with open('404.html', 'r', encoding='utf-8') as f:
            content = f.read()

        # 1. Add Meta Description
        if '<meta name="description"' not in content:
            content = content.replace('<title>', '<meta name="description" content="Page not found. Return to Digi Vidyarthi home page to explore digital marketing courses.">\n  <title>')

        # 2. Add JSON-LD Schema
        schema = '''  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "404 Page Not Found",
    "description": "The page you requested could not be found."
  }
  </script>'''
        if 'application/ld+json' not in content:
            content = content.replace('</head>', f'{schema}\n</head>')

        with open('404.html', 'w', encoding='utf-8') as f:
            f.write(content)
        print("Fixed 404.html")
    except Exception as e:
        print(f"Error in 404.html: {e}")

def update_blog_post():
    try:
        with open('blog-post.html', 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Optimize title length (was too short)
        content = re.sub(r'<title>.*?</title>', '<title>Blog Post | Best Digital Marketing Institute in Varanasi</title>', content, count=1)
        
        # Optimize meta description length (was too short)
        if '<meta name="description"' in content:
            content = re.sub(r'<meta name="description" content=".*?">', '<meta name="description" content="Read our latest blog post on digital marketing strategies, SEO, and social media trends at Digi Vidyarthi, the best digital marketing institute in Varanasi.">', content, count=1)
            
        # Add Open Graph
        if 'property="og:title"' not in content:
            og = '''
  <meta property="og:type" content="article">
  <meta property="og:title" content="Blog Post | Digi Vidyarthi">
  <meta property="og:description" content="Read our latest blog post on digital marketing strategies, SEO, and social media trends at Digi Vidyarthi.">
  <meta property="og:image" content="https://digividyarthi.com/images/og-banner.webp">
  <meta name="twitter:card" content="summary_large_image">'''
            content = content.replace('</head>', f'{og}\n</head>')
            
        # Add JSON-LD Schema
        schema = '''  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Blog Post | Digi Vidyarthi",
    "image": "https://digividyarthi.com/images/og-banner.webp",
    "publisher": {
      "@type": "Organization",
      "name": "Digi Vidyarthi",
      "logo": {
        "@type": "ImageObject",
        "url": "https://digividyarthi.com/images/logo.webp"
      }
    }
  }
  </script>'''
        if 'application/ld+json' not in content:
            content = content.replace('</head>', f'{schema}\n</head>')

        with open('blog-post.html', 'w', encoding='utf-8') as f:
            f.write(content)
        print("Fixed blog-post.html")
    except Exception as e:
        print(f"Error in blog-post.html: {e}")

def fix_lazy_loading_index():
    try:
        with open('index.html', 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Need to identify images that need lazy loading. 
        # The audit says 2 images might be missing loading="lazy".
        # We can just run a regex to add loading="lazy" to imgs that don't have it and are not logo or hero.
        # But wait, python's bs4 is better. Let's do it manually with bs4.
        from bs4 import BeautifulSoup
        soup = BeautifulSoup(content, 'html.parser')
        images = soup.find_all('img')
        changed = False
        for img in images:
            if not img.get('loading') and 'logo' not in img.get('src', '').lower() and 'hero' not in img.get('class', []) and 'hero' not in img.get('src', '').lower():
                img['loading'] = 'lazy'
                changed = True
                
        if changed:
            with open('index.html', 'w', encoding='utf-8') as f:
                f.write(str(soup))
            print("Fixed lazy loading in index.html")
    except Exception as e:
        print(f"Error in index.html lazy loading: {e}")

if __name__ == "__main__":
    update_admin()
    update_404()
    update_blog_post()
    fix_lazy_loading_index()
    print("SEO fixes applied.")
