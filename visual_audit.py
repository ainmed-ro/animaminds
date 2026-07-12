import os, re

base = r'c:\Users\Utilizator\Desktop\ANIMAMINDS'

# Find all image references
refs_by_file = {}
for root, dirs, files in os.walk(base):
    if 'node_modules' in root or '.next' in root:
        continue
    for f in files:
        if f.endswith(('.tsx', '.ts', '.jsx', '.js')):
            path = os.path.join(root, f)
            with open(path, 'r', encoding='utf-8') as fp:
                content = fp.read()
            found = re.findall(r"/images/([^\"'\s]+)", content)
            if found:
                rel = path.replace(base + '\\', '').replace(base + '/', '')
                refs_by_file[rel] = found

# Count usage per image
usage = {}
for file, refs in refs_by_file.items():
    for r in refs:
        usage.setdefault(r, []).append(file)

# Only show photos (not logos)
photos = [k for k in usage.keys() if not k.startswith('TheCPD') and k not in ('logo-horizontal.png', 'seal-monogram.png')]

print("=== IMAGINI REUTILIZATE ===\n")
for img in sorted(photos):
    files = usage[img]
    if len(files) > 1:
        print(f"{img} -> folosita in {len(files)} fisiere:")
        for f in files:
            print(f"  - {f}")
        print()

print("\n=== TOATE REFERINTELE ===\n")
for file, refs in sorted(refs_by_file.items()):
    print(f"{file}:")
    for r in refs:
        print(f"  {r}")
    print()
