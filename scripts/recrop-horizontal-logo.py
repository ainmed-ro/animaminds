from PIL import Image
import os

src = r"C:\Users\Utilizator\Desktop\buuuun.png"
out = os.path.join(os.path.dirname(__file__), "..", "public", "images", "logo-horizontal.png")

img = Image.open(src).convert("RGBA")

# Crop around the horizontal logo, starting a bit earlier to ensure the full small seal is included.
cropped = img.crop((800, 180, 800 + 840, 180 + 620))

# Trim solid dark-green background.
bg = cropped.getpixel((0, 0))
threshold = 12
bbox = None
for y in range(cropped.height):
    for x in range(cropped.width):
        px = cropped.getpixel((x, y))
        if any(abs(px[i] - bg[i]) > threshold for i in range(4)):
            if bbox is None:
                bbox = [x, y, x, y]
            else:
                bbox[0] = min(bbox[0], x)
                bbox[1] = min(bbox[1], y)
                bbox[2] = max(bbox[2], x)
                bbox[3] = max(bbox[3], y)

if bbox:
    trimmed = cropped.crop(tuple(bbox))
else:
    trimmed = cropped

# Add a small horizontal padding so branches never touch the image edges.
bg = trimmed.getpixel((0, 0))
padded = Image.new("RGBA", (trimmed.width + 16, trimmed.height), bg)
padded.paste(trimmed, (8, 0))

padded.save(out)
print(f"Saved {padded.width}x{padded.height} to {out}")
