import os

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

for filename in html_files:
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"Skipping {filename}: {e}")
        continue
        
    original = content
    content = content.replace('href="style.css"', 'href="style.min.css"')
    content = content.replace('src="script.js"', 'src="script.min.js"')
    
    if content != original:
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filename} to use minified assets")
