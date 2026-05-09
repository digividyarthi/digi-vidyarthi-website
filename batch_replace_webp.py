import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

# We'll also update style.css in case it has background images
css_files = ['style.css']

files_to_check = html_files + css_files

for filename in files_to_check:
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"Skipping {filename}: {e}")
        continue
        
    original = content
    # Find all src="images/...png" or src="images/...jpg" and replace with .webp
    # We will use regex to catch them
    
    # Replace .png, .jpg, .jpeg with .webp ONLY if they are in the images/ directory
    content = re.sub(r'(images/[a-zA-Z0-9_\-]+)\.png', r'\1.webp', content)
    content = re.sub(r'(images/[a-zA-Z0-9_\-]+)\.jpg', r'\1.webp', content)
    content = re.sub(r'(images/[a-zA-Z0-9_\-]+)\.jpeg', r'\1.webp', content)
    
    # Ensure logo.webp is used instead of logo.png in the JSON-LD schemas
    content = re.sub(r'(https://digividyarthi\.com/images/[a-zA-Z0-9_\-]+)\.png', r'\1.webp', content)
    content = re.sub(r'(https://digividyarthi\.com/images/[a-zA-Z0-9_\-]+)\.jpg', r'\1.webp', content)
    
    if content != original:
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated images in {filename}")

