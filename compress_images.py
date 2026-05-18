"""
Compress gallery webp images to max 800px wide and quality 75.
Also compress feature images to max 400px wide.
"""
from PIL import Image
import os

IMAGE_DIR = "images"

# Gallery images: max 800px wide, quality 70
gallery_files = [f"gallery-{i}.webp" for i in range(1, 7)]

for fname in gallery_files:
    fpath = os.path.join(IMAGE_DIR, fname)
    if not os.path.exists(fpath):
        print(f"  Skip (not found): {fname}")
        continue
    
    orig_size = os.path.getsize(fpath) // 1024
    img = Image.open(fpath)
    
    # Resize if wider than 800px
    max_w = 800
    if img.width > max_w:
        ratio = max_w / img.width
        new_h = int(img.height * ratio)
        img = img.resize((max_w, new_h), Image.LANCZOS)
    
    img.save(fpath, 'WEBP', quality=70, method=6)
    new_size = os.path.getsize(fpath) // 1024
    print(f"  {fname}: {orig_size}KB -> {new_size}KB ({100 - round(new_size/orig_size*100)}% saved)")

# Feature images: max 400px wide, quality 75
feature_files = [f for f in os.listdir(IMAGE_DIR) if f.startswith("feature_") and f.endswith(".webp")]

for fname in feature_files:
    fpath = os.path.join(IMAGE_DIR, fname)
    orig_size = os.path.getsize(fpath) // 1024
    img = Image.open(fpath)
    
    max_w = 400
    if img.width > max_w:
        ratio = max_w / img.width
        new_h = int(img.height * ratio)
        img = img.resize((max_w, new_h), Image.LANCZOS)
    
    img.save(fpath, 'WEBP', quality=75, method=6)
    new_size = os.path.getsize(fpath) // 1024
    print(f"  {fname}: {orig_size}KB -> {new_size}KB ({100 - round(new_size/orig_size*100)}% saved)")

# OG Banner: max 1200px wide, quality 75
og_path = os.path.join(IMAGE_DIR, "og-banner.webp")
if os.path.exists(og_path):
    orig_size = os.path.getsize(og_path) // 1024
    img = Image.open(og_path)
    if img.width > 1200:
        ratio = 1200 / img.width
        new_h = int(img.height * ratio)
        img = img.resize((1200, new_h), Image.LANCZOS)
    img.save(og_path, 'WEBP', quality=75, method=6)
    new_size = os.path.getsize(og_path) // 1024
    print(f"  og-banner.webp: {orig_size}KB -> {new_size}KB")

print("\nDone! All images compressed.")
