# Materials Audit Report

**Date:** 2026-07-12

---

## Issues Found

### 1. Mixed-language file names

- **RO folder** (`AnimaMinds_Materiale_Programme_RO`) contained files named `PMD_xxx_CPD_Package.docx` instead of a Romanian label.
- **EN folder** (`AnimaMinds_Programme_Materials_EN`) contained files named `PMD_xxx_One_Pager_comercial.docx` instead of `commercial`.

### 2. Programme names in EN folder were Romanian

File names in the EN folder used the original programme names (`AI_Fără_Haos`, `Conversații_care_Contează`, etc.). This is because the source PMD files are in Romanian and no English programme-name translations exist in the source assets.

### 3. Certificate credit/hour display

The certificate showed a single value such as:

```
Rezumat: 1 zi (6–8h) sau 2 zile Experience Edition | Learning Hours: 3 | CPD Hours: 3
```

The "3 hours" value was extracted incorrectly from the one-pager "Duration" section. It did not reflect the three approved programme formats.

### 4. Mixed-language content inside documents

The body content of the EN folder documents is in Romanian because the source markdown files (`Workbook_v2.md`, `Facilitator_Guide_v2.md`, `ONE_PAGER_PACK.md`, etc.) are written in Romanian. Only document labels, headers, and structural text were translated to English.

### 5. Some Romanian-language workbooks still showed English field labels

Labels such as `Program code:`, `Category:`, `Version:`, `Source PMD:`, `Formats:` appeared in the workbook source markdown wrapped in bold markdown (`**Program code:**`), which the previous header-translation regex did not catch.

---

## Fixes Applied

### Certificate redesign

- Wrapped certificate content in a formal double-line border with a light background.
- Enlarged the AnimaMinds logo at the top of the certificate.
- Added a signature / date line.
- Added a certification-seal text line referencing The CPD Group #790577.
- Placed branding and contact details at the bottom of the certificate.
- Note: custom illustrated seals/emblems beyond the existing logo cannot be generated programmatically and would need a designer.

### Experience Edition duration

- Corrected the Experience Edition label from "2 zile" to "3 zile / 3 days" based on user feedback.
- Certificate and cover-page variant lines now read: `Experience Edition (3 days / 3 zile): 18 ore / 18 CPD`.

### File naming

- `scripts/generate-programme-materials-v2.ts`
  - Added `onePagerCommercial` and `cpdPackage` to the language label map.
  - RO labels: `Pagina_unica_comercial`, `Pachet_CPD`.
  - EN labels: `One_Pager_commercial`, `CPD_Package`.
  - Updated `generateSheetDocx`, `generateCpdDocx`, and the QA tracking list to use the translated labels.

### Certificate

- Added `DurationVariant` interface and `durationVariants` array to the `Programme` model:
  - `1 day / 1 zi`: 6 hours / 6 CPD credits
  - `2 days / 2 zile`: 12 hours / 12 CPD credits
  - `Experience Edition`: 18 hours / 18 CPD credits
- Certificate now displays all three variants on a dedicated line, e.g.:

```
1 day / 1 zi: 6 ore / 6 CPD  |  2 days / 2 zile: 12 ore / 12 CPD  |  Experience Edition: 18 ore / 18 CPD
```

The user can delete the variant lines that do not apply to the actual delivered format.

### Header translation

- Improved `translateHeaders` regex from `(^|\s|#|\|)` to `(^|\W)` so it also matches bold/italic markdown wrappers such as `**Program code:**`.

---

## Limitations

- **Full English body content cannot be generated automatically.** The source markdown files are in Romanian. Generating genuine English materials requires translated source files or a manual translation step.
- **Programme names in the EN folder remain Romanian** for the same reason. To change them, provide English programme titles or update the `extractProgramName` logic.

---

## Verification

After regeneration, the folders should contain:

**RO folder (`AnimaMinds_Materiale_Programme_RO`)**
- All document labels in Romanian.
- Certificate shows the three duration/credit variants.

**EN folder (`AnimaMinds_Programme_Materials_EN`)**
- All document labels in English.
- Programme-name portion of file names is still Romanian (source limitation).
- Certificate shows the three duration/credit variants.

---

## Remaining Recommendations

1. Provide English translations of the source markdowns if true bilingual content is required.
2. Provide English programme titles if the EN folder file names should be fully English.
3. After the next print run, review the certificate variant line and delete the two non-applicable variants manually.
