import re

def minify_css(css):
    # Remove comments
    css = re.sub(r'/\*.*?\*/', '', css, flags=re.DOTALL)
    # Remove extra spaces around characters
    css = re.sub(r'\s*([\{\}\:\;\,\>])\s*', r'\1', css)
    # Remove newlines
    css = re.sub(r'\s+', ' ', css)
    return css.strip()

def minify_js(js):
    # Extremely basic JS minification (remove single line comments, multiline comments, newlines)
    # This might break if JS relies on ASI (Automatic Semicolon Insertion)
    # To be safe, we'll just remove multi-line comments and empty lines
    js = re.sub(r'/\*.*?\*/', '', js, flags=re.DOTALL)
    js = re.sub(r'\n\s*\n', '\n', js)
    js = js.replace('\r', '')
    
    # We won't fully minify JS to a single line without a real parser due to ASI risks, 
    # but removing comments and extra spaces helps a lot.
    lines = [line.strip() for line in js.split('\n') if line.strip()]
    return '\n'.join(lines)

# Minify CSS
try:
    with open('style.css', 'r', encoding='utf-8') as f:
        css_content = f.read()
    with open('style.min.css', 'w', encoding='utf-8') as f:
        f.write(minify_css(css_content))
    print("Minified style.css -> style.min.css")
except Exception as e:
    print(f"Error minifying CSS: {e}")

# Minify JS
try:
    with open('script.js', 'r', encoding='utf-8') as f:
        js_content = f.read()
    with open('script.min.js', 'w', encoding='utf-8') as f:
        f.write(minify_js(js_content))
    print("Minified script.js -> script.min.js")
except Exception as e:
    print(f"Error minifying JS: {e}")
