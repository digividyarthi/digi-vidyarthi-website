import os

fix_map = {
    'contact.html': {
        '<a aria-label="LinkedIn" href="#">': '<a aria-label="Follow Digi Vidyarthi on LinkedIn" href="https://www.linkedin.com/" target="_blank">'
    },
    'courses.html': {
        '<a aria-label="LinkedIn" href="#">': '<a aria-label="Follow Digi Vidyarthi on LinkedIn" href="https://www.linkedin.com/" target="_blank">'
    },
    'tools.html': {
        '<a aria-label="LinkedIn" href="#">': '<a aria-label="Follow Digi Vidyarthi on LinkedIn" href="https://www.linkedin.com/" target="_blank">'
    }
}

for filename, replacements in fix_map.items():
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        original = content
        for old, new in replacements.items():
            content = content.replace(old, new)
        if content != original:
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Fixed {filename}")
    except Exception as e:
        print(f"Error: {filename}: {e}")

# Blog sidebar links - these are JS filter buttons, add role="button"
try:
    with open('blog.html', 'r', encoding='utf-8') as f:
        content = f.read()
    original = content
    content = content.replace(
        '<a href="#" data-cat=',
        '<a role="button" href="#" data-cat='
    )
    if content != original:
        with open('blog.html', 'w', encoding='utf-8') as f:
            f.write(content)
        print("Fixed blog.html filter links")
except Exception as e:
    print(f"Error blog.html: {e}")

print("Done!")
