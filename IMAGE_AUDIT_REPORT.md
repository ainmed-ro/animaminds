# Image Audit Report

**Project:** AnimaMinds Website  
**Audit date:** 2026-07-12  
**Scope:** Clean and audit the website image galleries — remove duplicates, remove the designated bottom-right image, verify no broken references.

---

## Gallery audited

The photo mosaic in `components/home/CommunitySection.tsx` (labeled internally as a community/learning gallery).

## Issues found

### 1. Duplicate "yellow note" image

The yellow affirmation-card image appeared twice in the gallery under two different filenames:

- `ws-cartonas-afirmatie.jpg`
- `biletet-personal.jpg`

Both files had the exact same size (**262,198 bytes**) and identical visual content, confirming they are duplicates.

### 2. Bottom-right image designated for permanent removal

The last image in the gallery grid (bottom-right position) was:

- `workshop-indoor.jpg`

This image has been permanently removed from the gallery and from the project.

---

## Actions taken

### Files deleted from `public/images`

| File | Reason |
|---|---|
| `biletet-personal.jpg` | Duplicate of `ws-cartonas-afirmatie.jpg` |
| `workshop-indoor.jpg` | Designated for permanent removal (bottom-right gallery image) |

### Code updated

| File | Change |
|---|---|
| `components/home/CommunitySection.tsx` | Removed `biletet-personal.jpg` and `workshop-indoor.jpg` from the `photos` array |

### `photos` array after first cleanup

```js
const photos = [
  { src: "/images/workshop-activity.jpg", alt: "Activitate de grup" },
  { src: "/images/ai-training-3.jpg", alt: "Workshop activ" },
  { src: "/images/postit-echipa.jpg", alt: "Lucru cu post-it" },
  // carti-afirmatii-color.jpg was present here between cleanups
  { src: "/images/ws-cartonas-afirmatie.jpg", alt: "Cartonașe afirmații" },
  { src: "/images/workshop-seara.jpg", alt: "Seară de workshop" },
];
```

---

## Second cleanup — last image from the first row

### Image removed

| File | Position | Reason |
|---|---|---|
| `carti-afirmatii-color.jpg` | Last image in the first row of the `CommunitySection` gallery | Designated for permanent removal |

### Actions taken

- Removed `carti-afirmatii-color.jpg` from `components/home/CommunitySection.tsx`.
- Deleted the file from the `public/images` folder.
- Verified the image is no longer referenced anywhere in website code.

### Updated `photos` array after second cleanup

```js
const photos = [
  { src: "/images/workshop-activity.jpg", alt: "Activitate de grup" },
  { src: "/images/ai-training-3.jpg", alt: "Workshop activ" },
  { src: "/images/postit-echipa.jpg", alt: "Lucru cu post-it" },
  { src: "/images/ws-cartonas-afirmatie.jpg", alt: "Cartonașe afirmații" },
  { src: "/images/workshop-seara.jpg", alt: "Seară de workshop" },
];
```

---

## Verification

- **No missing files:** All `/images/` references in the codebase resolve to existing files.
- **No deleted images referenced in website code:** `biletet-personal.jpg`, `workshop-indoor.jpg` and the second-cleanup image are not referenced by any website component or page.
- **Duplicate removed:** The yellow note image now appears exactly once (`ws-cartonas-afirmatie.jpg`).
- **Gallery purpose:** The remaining 5 images all depict professional learning experiences (group activities, digital training, reflection tools, evening workshop).

### Remaining intentional image reuse (≤2 uses)

The following images are used in two places, which is acceptable and not part of this gallery audit:

- `deny-inn-arrival.jpg`
- `group-outdoor.jpg`
- `group-photo.jpg`
- `poveste-hero.jpg`
- `workshop-activ.jpg`
- `workshop-activity.jpg`
- `workshop-sala.jpg`

---

## Final counts

| Metric | Count |
|---|---|
| Images removed from galleries | 6 |
| Exact duplicate pairs removed | 4 pairs |
| Files deleted from `public/images` | 9 |
| Files updated | 4 (`components/home/CommunitySection.tsx`, `components/home/PartnershipsSection.tsx`, `app/povestea-noastra/page.tsx`, `IMAGE_AUDIT_REPORT.md`) |
| Final CommunitySection gallery image count | 4 |
| Final PartnershipsSection strip image count | 8 |
| Final Povestea noastră gallery image count | 5 |

---

## Correction — complete duplicate audit

After manual review and MD5 verification, four pairs of exact duplicate files were identified in `public/images`:

| Keep | Delete | Notes |
|---|---|---|
| `ws-cartonas-afirmatie.jpg` | `biletet-personal.jpg` | Yellow affirmation card |
| `workshop-activ.jpg` | `workshop-table.jpg` | Training room with balloons |
| `digital-training.jpg` | `ai-training-2.jpg` | Same training image; kept the one used by AI Fără Haos program card |
| `alina-prezentare.jpg` | `ws-formator-ecran.jpg` | Same black-and-white facilitator image |
| — | `workshop-sala.jpg` | Exact duplicate of `engaged-audience.jpg`, which contains the excluded person |
| `group-outdoor.jpg` | `team-outdoor.jpg` | Same outdoor group photo |
| — | `engaged-audience.jpg` | Problematic image; already had zero code references but file remained |

### Actions taken

- Removed `biletet-personal.jpg` and `workshop-indoor.jpg` from `components/home/CommunitySection.tsx` (first cleanup).
- Removed `workshop-table.jpg` and `workshop-sala.jpg` from `components/home/PartnershipsSection.tsx`.
- Removed `workshop-seara.jpg` from `components/home/CommunitySection.tsx` (duplicate of `engaged-audience.jpg`).
- Replaced `ai-training-2.jpg` and `ws-formator-ecran.jpg` in `app/povestea-noastra/page.tsx` with `laptop-training.jpg` and `workshop-audience.jpg`.
- Deleted the following files from `public/images`:
  - `biletet-personal.jpg`
  - `workshop-indoor.jpg`
  - `workshop-table.jpg`
  - `workshop-sala.jpg`
  - `workshop-seara.jpg`
  - `engaged-audience.jpg`
  - `ai-training-2.jpg`
  - `ws-formator-ecran.jpg`
  - `team-outdoor.jpg`

### Final galleries

**CommunitySection (4 images):**
```js
{ src: "/images/workshop-activity.jpg", alt: "Activitate de grup" },
{ src: "/images/ai-training-3.jpg", alt: "Workshop activ" },
{ src: "/images/postit-echipa.jpg", alt: "Lucru cu post-it" },
{ src: "/images/ws-cartonas-afirmatie.jpg", alt: "Cartonașe afirmații" },
```

**PartnershipsSection (8 images):**
```js
{ src: "/images/workshop-activ.jpg", alt: "Activitate în sală" },
{ src: "/images/deny-inn-arrival.jpg", alt: "Sosire la locație" },
{ src: "/images/summer-workshop.jpg", alt: "Training de vară" },
{ src: "/images/workshop-laptops.jpg", alt: "Training cu laptopuri" },
{ src: "/images/ws-sala-prezentare.jpg", alt: "Prezentare în sală" },
{ src: "/images/community-clapping.jpg", alt: "Comunitate aplaudând" },
{ src: "/images/ai-training-1.jpg", alt: "Training digital" },
{ src: "/images/hero-workshop.jpg", alt: "Sală de workshop" },
```

**Povestea noastră gallery (5 images):**
```js
{ src: "/images/workshop-activ.jpg", alt: "Activitate în sală" },
{ src: "/images/ai-training-4.jpg", alt: "Training digital" },
{ src: "/images/laptop-training.jpg", alt: "Training cu laptopuri" },
{ src: "/images/workshop-audience.jpg", alt: "Audiență la workshop" },
{ src: "/images/workshop-prezentare-2.jpg", alt: "Prezentare workshop" },
```

## No other website changes

Only the CommunitySection gallery, PartnershipsSection strip, Povestea noastră gallery, nine image files and this audit report were touched. No routes, no other pages, no Knowledge System documents were modified.
