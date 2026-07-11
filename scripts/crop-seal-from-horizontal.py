from PIL import Image
import os

src = os.path.join(os.path.dirname(__file__), "..", "public", "images", "logo-horizontal.png")
out = os.path.join(os.path.dirname(__file__), "..", "public", "images", "seal-monogram.png")

img = Image.open(src).convert("RGBA")

# Crop the small seal from the left of the horizontal logo.
cropped = img.crop((0, 10, 165, 200))
cropped.save(out)
print(f"Saved {cropped.width}x{cropped.height} to {out}")
