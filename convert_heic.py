import os
import glob
from PIL import Image
from pillow_heif import register_heif_opener

register_heif_opener()

raw_dir = 'raw_images'
out_dir = 'images'
heic_files = glob.glob(os.path.join(raw_dir, '*.heic'))
heic_files.sort()  # Sort alphabetically for consistent mapping

print(f"Found {len(heic_files)} HEIC files.")

for idx, file_path in enumerate(heic_files):
    # Determine the gallery index (1 to 6)
    gallery_idx = idx + 1
    out_file = os.path.join(out_dir, f'gallery-{gallery_idx}.jpg')
    
    try:
        print(f"Converting {file_path} -> {out_file}")
        img = Image.open(file_path)
        img.save(out_file, "JPEG", quality=90)
    except Exception as e:
        print(f"Failed to convert {file_path}: {e}")

print("Done converting!")
