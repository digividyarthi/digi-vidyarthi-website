#!/usr/bin/env python3
"""
Digi Vidyarthi - Automated WebP Image Converter & Reference Updater
Usage: python convert_to_webp.py
Converts all PNG, JPG, and JPEG images in images/ to optimized WebP format
and updates all references across HTML, CSS, JS, and JSON files.
"""

import os
import re
import sys
from PIL import Image

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

WORKSPACE_DIR = os.path.dirname(os.path.abspath(__file__))
IMAGES_DIR = os.path.join(WORKSPACE_DIR, 'images')

IMAGE_EXTENSIONS = ('.png', '.jpg', '.jpeg', '.bmp', '.tiff')
CODE_EXTENSIONS = ('.html', '.css', '.js', '.json', '.xml', '.php')

def format_size(bytes_val):
    if bytes_val < 1024:
        return f"{bytes_val} B"
    elif bytes_val < 1024 * 1024:
        return f"{bytes_val / 1024:.1f} KB"
    else:
        return f"{bytes_val / (1024 * 1024):.2f} MB"

def convert_images():
    print("=" * 60)
    print(" DIGI VIDYARTHI - WEBP IMAGE CONVERTER")
    print("=" * 60)
    
    converted_files = {} # old_rel_path -> new_rel_path
    total_orig_bytes = 0
    total_webp_bytes = 0
    converted_count = 0
    
    for root, _, files in os.walk(IMAGES_DIR):
        for file in files:
            ext = os.path.splitext(file)[1].lower()
            if ext in IMAGE_EXTENSIONS:
                orig_path = os.path.join(root, file)
                base_name = os.path.splitext(file)[0]
                webp_name = base_name + '.webp'
                webp_path = os.path.join(root, webp_name)
                
                rel_orig = os.path.relpath(orig_path, WORKSPACE_DIR).replace('\\', '/')
                rel_webp = os.path.relpath(webp_path, WORKSPACE_DIR).replace('\\', '/')
                
                try:
                    orig_size = os.path.getsize(orig_path)
                    
                    # Convert to WebP
                    with Image.open(orig_path) as img:
                        # Handle transparency / modes
                        if img.mode in ("RGBA", "LA") or (img.mode == "P" and "transparency" in img.info):
                            img.save(webp_path, 'WEBP', quality=85, method=6)
                        else:
                            rgb_img = img.convert('RGB')
                            rgb_img.save(webp_path, 'WEBP', quality=82, method=6)
                    
                    webp_size = os.path.getsize(webp_path)
                    saved = orig_size - webp_size
                    ratio = (saved / orig_size * 100) if orig_size > 0 else 0
                    
                    total_orig_bytes += orig_size
                    total_webp_bytes += webp_size
                    converted_count += 1
                    
                    converted_files[rel_orig] = rel_webp
                    # Also map just basename / filename transitions
                    converted_files[file] = webp_name
                    
                    print(f" [✓] {rel_orig} ({format_size(orig_size)}) -> {webp_name} ({format_size(webp_size)}) | Saved {ratio:.1f}%")
                except Exception as e:
                    print(f" [!] Failed to convert {rel_orig}: {e}")
                    
    print("-" * 60)
    print(f" Summary: Converted {converted_count} images.")
    print(f" Total Original Size: {format_size(total_orig_bytes)}")
    print(f" Total WebP Size:     {format_size(total_webp_bytes)}")
    if total_orig_bytes > 0:
        total_saved = total_orig_bytes - total_webp_bytes
        total_ratio = (total_saved / total_orig_bytes * 100)
        print(f" Total Space Saved:   {format_size(total_saved)} ({total_ratio:.1f}% reduction)")
    print("=" * 60)
    
    return converted_files

def update_code_references(converted_files):
    print("\n Updating Code References across HTML, CSS, JS, JSON files...")
    updated_files_count = 0
    
    for root, _, files in os.walk(WORKSPACE_DIR):
        # Skip node_modules, .git, etc.
        if '.git' in root or 'node_modules' in root or '.antigravity' in root:
            continue
            
        for file in files:
            ext = os.path.splitext(file)[1].lower()
            if ext in CODE_EXTENSIONS:
                file_path = os.path.join(root, file)
                rel_path = os.path.relpath(file_path, WORKSPACE_DIR).replace('\\', '/')
                
                try:
                    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                        content = f.read()
                        
                    new_content = content
                    replacements_in_file = 0
                    
                    for orig, webp in converted_files.items():
                        if orig in new_content:
                            new_content = new_content.replace(orig, webp)
                            replacements_in_file += 1
                            
                    if new_content != content:
                        with open(file_path, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        updated_files_count += 1
                        print(f" [✓] Updated {rel_path} ({replacements_in_file} references changed)")
                except Exception as e:
                    print(f" [!] Error processing {rel_path}: {e}")
                    
    print(f" Done! Updated references in {updated_files_count} code files.\n")

def clean_original_images(converted_files):
    print(" Cleaning up original uncompressed image files...")
    removed_count = 0
    for root, _, files in os.walk(IMAGES_DIR):
        for file in files:
            ext = os.path.splitext(file)[1].lower()
            if ext in IMAGE_EXTENSIONS:
                orig_path = os.path.join(root, file)
                base_name = os.path.splitext(file)[0]
                webp_path = os.path.join(root, base_name + '.webp')
                if os.path.exists(webp_path):
                    os.remove(orig_path)
                    removed_count += 1
                    rel_orig = os.path.relpath(orig_path, WORKSPACE_DIR).replace('\\', '/')
                    print(f" [-] Removed original: {rel_orig}")
    print(f" Cleaned up {removed_count} original heavy image files.\n")

if __name__ == '__main__':
    converted = convert_images()
    if converted:
        update_code_references(converted)
    if '--clean' in sys.argv:
        clean_original_images(converted)
    print(" All images are now in WebP format for high-speed website performance!")

