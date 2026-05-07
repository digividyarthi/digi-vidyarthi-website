import os
from PIL import Image

image_dir = 'images'
for file in os.listdir(image_dir):
    if file.endswith('.png') or file.endswith('.jpg') or file.endswith('.jpeg'):
        filepath = os.path.join(image_dir, file)
        
        # Output filename
        filename_without_ext = os.path.splitext(file)[0]
        output_filepath = os.path.join(image_dir, f"{filename_without_ext}.webp")
        
        # Convert and save
        try:
            with Image.open(filepath) as img:
                # Convert to RGB if saving as WebP from PNG with transparency, WebP supports transparency natively
                # but if there are palette issues, better convert to RGBA.
                if img.mode not in ('RGB', 'RGBA'):
                    img = img.convert('RGBA')
                img.save(output_filepath, 'webp', quality=80)
            print(f"Converted {file} to WebP.")
        except Exception as e:
            print(f"Error converting {file}: {e}")
