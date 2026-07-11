from PIL import Image
import os

src = r"C:\Users\Utilizator\Desktop\buuuun.png"
out = os.path.join(os.path.dirname(__file__), "..", "public", "images", "seal-monogram.png")

img = Image.open(src).convert("RGBA")

# Crop the central area of the big seal (monogram + wreath + book, without outer text).
cropped = img.crop((230, 280, 230 + 440, 280 + 440))

cropped.save(out)
print(f"Saved {cropped.width}x{cropped.height} to {out}")
