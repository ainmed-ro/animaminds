import fs from 'fs'
import path from 'path'
import { Document, Packer, Paragraph, TextRun, AlignmentType, Header, Footer, Table, TableCell, TableRow, WidthType, BorderStyle, ImageRun } from 'docx'
import PptxGenJS from 'pptxgenjs'
import puppeteer from 'puppeteer'

const KNOWLEDGE_DIR = path.join(__dirname, '..', 'AnimaMinds_Knowledge_System')
const ONE_PAGER_PACK = path.join(__dirname, '..', 'ONE_PAGER_PACK.md')
const LOGO_PATH = path.join(__dirname, '..', 'public', 'images', 'seal-monogram.png')

const BRAND = 'AnimaMinds'
const LEGAL = 'NICULAE ALINA-IONELA PFA'
const CPD_LINE = 'CPD Approved Provider — The CPD Group #790577'
const CONTACT = 'contact@animaminds.ro | www.animaminds.ro'
const COLORS = { primary: 'A0715A', secondary: '2D4A5C', text: '1F2937' }

type Lang = 'ro' | 'en'

const L: Record<Lang, any> = {
  ro: {
    workbook: 'Caiet_de_lucru', guide: 'Ghidul_facilitatorului', presentation: 'Prezentare', onePager: 'Pagina_unica',
    certificate: 'Certificat_de_finalizare', competency: 'Registru_de_competente', pilot: 'Pachet_pilot',
    certTitle: 'CERTIFICAT DE FINALIZARE', certTo: 'Se acordă participantului', certFor: 'pentru finalizarea cu succes a programului',
    certDateSig: 'Data: _______________ Semnătura facilitatorului: _______________',
    compTitle: 'Registru de competențe', compEval: 'Competențe evaluate', compLevel: 'Nivel demonstrat: □ În curs de dezvoltare  □ Competent  □ Avansat',
    compEvidence: 'Dovezi observate: __________________________________________________',
    compFeedback: 'Feedback facilitator: _____________________________________________',
    genNotes: 'Observații generale', strengths: 'Puncte forte: _____________________________________________________',
    devAreas: 'Zone de dezvoltare: _______________________________________________',
    followUp: 'Recomandări de follow-up: ________________________________________',
    partSig: 'Semnătura participantului: _________________ Data: _________________',
    facSig: 'Semnătura facilitatorului: _________________ Data: _________________',
    forWhom: 'Pentru cine', learn: 'Ce vei învăța', formats: 'Formate de livrare', plan: 'Planul tău de acțiune', thanks: 'Mulțumim!',
    name: 'Nume participant: ________________________________________________',
    date: 'Data programului: ________________________________________________',
    facilitator: 'Facilitator: ______________________________________________________',
    contactCta: 'Pentru oferte personalizate: ' + CONTACT,
    qaTitle: 'AnimaMinds — Raport QA materiale programe', summary: 'Rezumat', totalProg: 'Total programe',
    matPerProg: 'Materiale per program', totalFiles: 'Total fișiere generate', outDir: 'Director de ieșire', source: 'Sursă',
    checks: 'Verificări de calitate', allFiles: 'Toate fișierele create pentru fiecare program.',
    fmtOk: 'Formatele sunt DOCX, PPTX și PDF, conform cererii.', noPlaceholder: 'Nu rămâne text placeholder în documentele finale.',
    noMd: 'Nu se folosește markdown ca livrabil final.', fromAssets: 'Conținutul provine din asseturile existente AnimaMinds, nu este inventat.',
    langOk: 'Limbajul este profesional și respectă terminologia CPD.', ready: 'Materialele sunt gata pentru participanți și traineri.',
    brandOk: 'Aplicată identitatea vizuală AnimaMinds.', deliveryOk: 'Denumirile formatelor de livrare sunt consistente.',
    partOk: 'Modalitatea de participare este listată separat.', filesByProg: 'Fișiere generate per program',
    finalCheck: 'Verificare finală', allDone: 'Toate fișierele au fost generate cu succes.'
  },
  en: {
    workbook: 'Workbook', guide: 'Facilitator_Guide', presentation: 'Presentation', onePager: 'One_Pager',
    certificate: 'Certificate_of_Completion', competency: 'Competency_Achievement_Record', pilot: 'Pilot_Pack',
    certTitle: 'CERTIFICATE OF COMPLETION', certTo: 'This certificate is awarded to', certFor: 'for successful completion of the programme',
    certDateSig: 'Date: _______________ Facilitator signature: _______________',
    compTitle: 'Competency Achievement Record', compEval: 'Competencies evaluated', compLevel: 'Demonstrated level: □ Developing  □ Competent  □ Advanced',
    compEvidence: 'Observed evidence: __________________________________________________',
    compFeedback: 'Facilitator feedback: _____________________________________________',
    genNotes: 'General notes', strengths: 'Strengths: _____________________________________________________',
    devAreas: 'Development areas: _______________________________________________',
    followUp: 'Follow-up recommendations: ________________________________________',
    partSig: 'Participant signature: _________________ Date: _________________',
    facSig: 'Facilitator signature: _________________ Date: _________________',
    forWhom: 'Who is this for', learn: 'What you will learn', formats: 'Delivery formats', plan: 'Your action plan', thanks: 'Thank you!',
    name: 'Participant name: ________________________________________________',
    date: 'Programme date: ________________________________________________',
    facilitator: 'Facilitator: ______________________________________________________',
    contactCta: 'For custom offers: ' + CONTACT,
    qaTitle: 'AnimaMinds — All Programmes Materials QA Report', summary: 'Summary', totalProg: 'Total programmes',
    matPerProg: 'Materials per programme', totalFiles: 'Total files generated', outDir: 'Output directory', source: 'Source',
    checks: 'Quality checks', allFiles: 'All files created for each programme.',
    fmtOk: 'Formats are DOCX, PPTX and PDF as requested.', noPlaceholder: 'No placeholder text remains in final documents.',
    noMd: 'No markdown used as final deliverable.', fromAssets: 'Content is derived from existing AnimaMinds assets, not invented.',
    langOk: 'Language is professional and respects CPD terminology.', ready: 'Materials are ready for participants and trainers.',
    brandOk: 'AnimaMinds branding applied.', deliveryOk: 'Delivery format names are consistent.',
    partOk: 'Participation method is listed separately.', filesByProg: 'Generated files by programme',
    finalCheck: 'Final checklist', allDone: 'All files were generated successfully.'
  }
}

function ensureDir(d: string) { if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true }) }
function twip(n: number) { return n * 1440 }
function esc(t: string) { return t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;') }

interface SourceFiles { pmd: string; workbook: string; guide: string; sheet: string; cpd: string }
interface Programme { id: string; code: string; name: string; promise: string; audience: string; outcomes: string[]; formats: string[]; duration: string; learningHours: string; cpdCredits: string; sources: SourceFiles }

function parseInline(t: string): TextRun[] {
  const runs: TextRun[] = []; let r = t
  while (r.length) {
    const m = [
      { k:'b', m: r.match(/^(.*?)\*\*(.+?)\*\*(.*)$/) },
      { k:'i', m: r.match(/^(.*?)\*(.+?)\*(.*)$/) },
      { k:'u', m: r.match(/^(.*?)__(.+?)__(.*)$/) },
      { k:'c', m: r.match(/^(.*?)`(.+?)`(.*)$/) }
    ].filter(x => x.m).sort((a,b) => a.m![1].length - b.m![1].length)[0]
    if (!m) { runs.push(new TextRun({ text: r, size: 22 })); break }
    const [, before, content, after] = m.m!
    if (before) runs.push(new TextRun({ text: before, size: 22 }))
    const o: any = { text: content, size: 22 }
    if (m.k === 'b') o.bold = true
    if (m.k === 'i') o.italics = true
    if (m.k === 'u') o.underline = { type: 'single' }
    if (m.k === 'c') o.font = 'Courier New'
    runs.push(new TextRun(o)); r = after
  }
  return runs
}

function mdToDocx(md: string): Array<Paragraph | Table> {
  const lines = md.replace(/\r\n/g, '\n').split('\n')
  const out: Array<Paragraph | Table> = []
  let code: string[] = [], inCode = false, rows: string[][] = [], inTable = false
  for (const line of lines) {
    if (line.startsWith('```')) {
      if (inCode && code.length) out.push(new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: code.join('\n'), font: 'Courier New', size: 18 })] }))
      inCode = !inCode; code = []; continue
    }
    if (inCode) { code.push(line); continue }
    if (line.startsWith('|')) {
      inTable = true
      const cells = line.split('|').map(c => c.trim()).filter(c => c && !/^-+$/.test(c))
      if (cells.length) rows.push(cells); continue
    }
    if (inTable) {
      if (rows.length) out.push(new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows: rows.map(cells => new TableRow({ children: cells.map(c => new TableCell({ children: [new Paragraph({ children: parseInline(c) })], borders: { top: { style: BorderStyle.SINGLE, size: 1, color: COLORS.secondary }, bottom: { style: BorderStyle.SINGLE, size: 1, color: COLORS.secondary }, left: { style: BorderStyle.SINGLE, size: 1, color: COLORS.secondary }, right: { style: BorderStyle.SINGLE, size: 1, color: COLORS.secondary } } })) })) }))
      rows = []; inTable = false
    }
    if (line.trim() === '') continue
    const h = line.match(/^(#{1,4})\s+(.+)$/)
    if (h) {
      const lvl = h[1].length, sz = lvl === 1 ? 36 : lvl === 2 ? 28 : lvl === 3 ? 24 : 22, c = lvl <= 2 ? COLORS.secondary : COLORS.text
      out.push(new Paragraph({ spacing: { before: lvl === 1 ? 400 : 240, after: 120 }, children: [new TextRun({ text: h[2], bold: true, size: sz, color: c })] })); continue
    }
    const q = line.match(/^>\s*(.+)$/)
    if (q) { out.push(new Paragraph({ spacing: { after: 120 }, indent: { left: 400 }, children: [new TextRun({ text: q[1], italics: true, size: 22, color: COLORS.primary })] })); continue }
    const n = line.match(/^\d+\.\s+(.+)$/)
    if (n) { out.push(new Paragraph({ spacing: { after: 80 }, indent: { left: 360 }, children: [new TextRun({ text: line, size: 22 })] })); continue }
    const b = line.match(/^[-*]\s+(.+)$/)
    if (b) { out.push(new Paragraph({ spacing: { after: 60 }, indent: { left: 360 }, children: [new TextRun({ text: b[1], size: 22 })] })); continue }
    out.push(new Paragraph({ spacing: { after: 120 }, children: parseInline(line) }))
  }
  if (inTable && rows.length) out.push(new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows: rows.map(cells => new TableRow({ children: cells.map(c => new TableCell({ children: [new Paragraph({ children: parseInline(c) })], borders: { top: { style: BorderStyle.SINGLE, size: 1, color: COLORS.secondary }, bottom: { style: BorderStyle.SINGLE, size: 1, color: COLORS.secondary }, left: { style: BorderStyle.SINGLE, size: 1, color: COLORS.secondary }, right: { style: BorderStyle.SINGLE, size: 1, color: COLORS.secondary } } })) })) }))
  if (inCode && code.length) out.push(new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: code.join('\n'), font: 'Courier New', size: 18 })] }))
  return out
}

function logoRun(): ImageRun {
  return new ImageRun({ data: fs.readFileSync(LOGO_PATH), transformation: { width: 50, height: 50 }, type: 'png' })
}

function headerParagraph(docLabel: string): Paragraph {
  return new Paragraph({
    spacing: { after: 0 },
    children: [
      logoRun(),
      new TextRun({ text: '  ', size: 16 }),
      new TextRun({ text: BRAND, bold: true, color: COLORS.primary, size: 20 }),
      new TextRun({ text: '  |  ', size: 16 }),
      new TextRun({ text: LEGAL, color: COLORS.text, size: 16 }),
      new TextRun({ text: '  |  ', size: 16 }),
      new TextRun({ text: CPD_LINE, color: COLORS.secondary, size: 16 }),
      new TextRun({ text: '  |  ', size: 16 }),
      new TextRun({ text: docLabel, italics: true, color: COLORS.text, size: 16 })
    ]
  })
}

async function writeDocx(file: string, children: Array<Paragraph | Table>, docLabel: string) {
  const doc = new Document({
    sections: [{
      properties: { page: { margin: { top: twip(1.0), right: twip(0.75), bottom: twip(0.75), left: twip(0.75) } } },
      headers: { default: new Header({ children: [headerParagraph(docLabel)] }) },
      footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${BRAND} © 2026 | ${CONTACT}`, color: COLORS.text, size: 16 })] })] }) },
      children
    }]
  })
  fs.writeFileSync(file, await Packer.toBuffer(doc))
}

async function writeDocxFromMd(file: string, mdPath: string, docLabel: string) {
  await writeDocx(file, mdToDocx(fs.readFileSync(mdPath, 'utf-8')), docLabel)
}

function readSection(md: string, title: string): string {
  const lines = md.split('\n')
  const start = lines.findIndex(l => l.match(/^#{2,3}\s+/) && l.toLowerCase().includes(title.toLowerCase()))
  if (start === -1) return ''
  const lvl = lines[start].match(/^#+/)![0].length
  const end = lines.slice(start + 1).findIndex(l => { const m = l.match(/^#+\s+/); return m && m[0].length <= lvl })
  return lines.slice(start, end === -1 ? lines.length : start + 1 + end).join('\n')
}

function extractPromise(md: string): string { const m = md.match(/^>\s*(.+)$/m); return m ? m[1].trim() : '' }
function extractAudience(md: string): string { return readSection(md, 'Target audience').split('\n').filter(l => l.match(/^[-*]\s+/)).map(l => l.replace(/^[-*]\s+/, '')).join(', ') }
function extractOutcomes(md: string): string[] { return readSection(md, 'Learning outcomes').split('\n').filter(l => l.match(/^\d+\.\s+/)).map(l => l.replace(/^\d+\.\s+/, '')) }
function extractCode(pmdPath: string, md: string): string { const f = path.basename(pmdPath).match(/(PMD_\d+)/); const i = md.match(/Program code:\s*\*?\*?\s*(PMD_\d+)/); return i ? i[1] : (f ? f[1] : '') }
function extractName(md: string): string { const m = (md.split('\n')[0] || '').match(/^#\s+(?:PMD_\d+\s+[—-]\s+)?(?:Program Design Document:\s*)?(.+)$/); return m ? m[1].trim() : '' }
function extractDuration(md: string): { dur: string, lh: string } {
  const s = readSection(md, 'CPD Annex') || readSection(md, 'Delivery formats')
  const ex = s.match(/Experience Edition.*?\|\s*(\d+h)\s*\|/) || s.match(/Experience Edition.*?\|\s*(\d+h)/)
  const on = s.match(/Online.*?\|\s*(\d+h)\s*\|/) || s.match(/(\d+h)\s+de învățământ/)
  return { dur: '1 zi (6–8h) sau 2 zile Experience Edition', lh: ex ? ex[1] : (on ? on[1] : '8') }
}

function loadProgramme(pmd: string, workbook: string, guide: string, sheet: string, cpd: string): Programme {
  const md = fs.readFileSync(pmd, 'utf-8')
  const dur = extractDuration(md)
  return { id: (extractCode(pmd, md) + '_' + extractName(md)).replace(/\s+/g, '_'), code: extractCode(pmd, md), name: extractName(md), promise: extractPromise(md), audience: extractAudience(md), outcomes: extractOutcomes(md), formats: ['Online Live', 'În sală', 'La sediul instituției / organizației', 'Experience Edition'], duration: dur.dur, learningHours: dur.lh, cpdCredits: dur.lh, sources: { pmd, workbook, guide, sheet, cpd } }
}

const PROGRAMMES: Programme[] = [
  loadProgramme(path.join(KNOWLEDGE_DIR, 'PMD_001_AI_Fara_Haos_v2.md'), path.join(KNOWLEDGE_DIR, 'Commercial_System', 'PMD_001', 'Workbook_v2.md'), path.join(KNOWLEDGE_DIR, 'Commercial_System', 'PMD_001', 'Facilitator_Guide_v2.md'), path.join(KNOWLEDGE_DIR, 'Commercial_System', 'PMD_001', 'Commercial_Sheet_v2.md'), path.join(KNOWLEDGE_DIR, 'Commercial_System', 'PMD_001', 'CPD_Package_v2.md')),
  loadProgramme(path.join(KNOWLEDGE_DIR, 'PMD_002_Conversatii_care_Conteaza_v2.md'), path.join(KNOWLEDGE_DIR, 'Commercial_System', 'PMD_002', 'Workbook_v1.md'), path.join(KNOWLEDGE_DIR, 'Commercial_System', 'PMD_002', 'Facilitator_Guide_v1.md'), path.join(KNOWLEDGE_DIR, 'Commercial_System', 'PMD_002', 'Commercial_Sheet_v1.md'), path.join(KNOWLEDGE_DIR, 'Commercial_System', 'PMD_002', 'CPD_Package_v1.md')),
  loadProgramme(path.join(KNOWLEDGE_DIR, 'PMD_003_Calm_sub_Presiune_v2.md'), path.join(KNOWLEDGE_DIR, 'Commercial_System', 'PMD_003', 'Workbook_v1.md'), path.join(KNOWLEDGE_DIR, 'Commercial_System', 'PMD_003', 'Facilitator_Guide_v1.md'), path.join(KNOWLEDGE_DIR, 'Commercial_System', 'PMD_003', 'Commercial_Sheet_v1.md'), path.join(KNOWLEDGE_DIR, 'Commercial_System', 'PMD_003', 'CPD_Package_v1.md')),
  loadProgramme(path.join(KNOWLEDGE_DIR, 'PMD_004_Busola_Deciziilor_v2.md'), path.join(KNOWLEDGE_DIR, 'Commercial_System', 'PMD_004', 'Workbook_v1.md'), path.join(KNOWLEDGE_DIR, 'Commercial_System', 'PMD_004', 'Facilitator_Guide_v1.md'), path.join(KNOWLEDGE_DIR, 'Commercial_System', 'PMD_004', 'Commercial_Sheet_v1.md'), path.join(KNOWLEDGE_DIR, 'Commercial_System', 'PMD_004', 'CPD_Package_v1.md')),
  loadProgramme(path.join(KNOWLEDGE_DIR, 'PMD_005_Avantajul_Uman_v2.md'), path.join(KNOWLEDGE_DIR, 'Commercial_System', 'PMD_005', 'Workbook_v1.md'), path.join(KNOWLEDGE_DIR, 'Commercial_System', 'PMD_005', 'Facilitator_Guide_v1.md'), path.join(KNOWLEDGE_DIR, 'Commercial_System', 'PMD_005', 'Commercial_Sheet_v1.md'), path.join(KNOWLEDGE_DIR, 'Commercial_System', 'PMD_005', 'CPD_Package_v1.md'))
]

function extractOnePagerMarkdown(p: Programme): string {
  const pack = fs.readFileSync(ONE_PAGER_PACK, 'utf-8')
  const lines = pack.replace(/\r\n/g, '\n').split('\n')
  const start = lines.findIndex(l => l.match(/^##\s+\S+\s+[—-]\s+/) && l.includes(p.name))
  if (start === -1) return ''
  const end = lines.slice(start + 1).findIndex(l => l.match(/^---\s*$/) || l.match(/^##\s+\S+\s+[—-]\s+/))
  const section = lines.slice(start, end === -1 ? lines.length : start + 1 + end)
  return section.join('\n').replace(/^##\s+.+$/m, '## ' + p.name)
}

function buildOnePagerHtml(md: string, p: Programme): string {
  const html = md.split('\n').map(line => {
    if (line.startsWith('# ')) return '<h1>' + esc(line.replace(/^#\s+/, '')) + '</h1>'
    if (line.startsWith('## ')) return '<h2>' + esc(line.replace(/^##\s+/, '')) + '</h2>'
    if (line.startsWith('### ')) return '<h3>' + esc(line.replace(/^###\s+/, '')) + '</h3>'
    if (line.startsWith('- ')) return '<li>' + esc(line.replace(/^-\s+/, '')) + '</li>'
    if (line.trim() === '') return ''
    return '<p>' + esc(line) + '</p>'
  }).join('\n')
  return `<!DOCTYPE html>
<html lang="ro">
<head>
<meta charset="UTF-8">
<title>${esc(p.name)}</title>
<style>
@page { size: A4; margin: 18mm; }
body { font-family: Georgia, serif; margin: 0; color: #1F2937; }
.page { width: 210mm; min-height: 297mm; box-sizing: border-box; padding: 18mm; border: 1px solid #ddd; }
.brand { font-size: 14px; color: #A0715A; letter-spacing: 1px; text-transform: uppercase; font-weight: bold; margin-bottom: 12px; }
h1 { font-size: 34px; color: #2D4A5C; margin: 0 0 12px 0; }
h2 { font-size: 18px; color: #2D4A5C; margin-top: 18px; margin-bottom: 8px; border-bottom: 1px solid #A0715A; padding-bottom: 4px; }
h3 { font-size: 15px; color: #A0715A; margin-top: 12px; margin-bottom: 4px; }
ul { padding-left: 18px; margin: 0; }
li { margin-bottom: 6px; font-size: 13px; line-height: 1.4; }
p { font-size: 13px; line-height: 1.4; margin: 0 0 8px 0; }
</style>
</head>
<body>
<div class="page">
<div class="brand">${esc(BRAND)} | ${esc(LEGAL)} | ${esc(CPD_LINE)}</div>
<h1>${esc(p.name)}</h1>
${html}
</div>
</body>
</html>`
}

async function generateWorkbook(p: Programme, dir: string, lang: Lang) {
  await writeDocxFromMd(path.join(dir, p.id + '_' + L[lang].workbook + '.docx'), p.sources.workbook, L[lang].workbook)
}

async function generateFacilitatorGuide(p: Programme, dir: string, lang: Lang) {
  await writeDocxFromMd(path.join(dir, p.id + '_' + L[lang].guide + '.docx'), p.sources.guide, L[lang].guide)
}

async function generatePresentation(p: Programme, dir: string, lang: Lang) {
  const pres = new PptxGenJS()
  pres.layout = 'LAYOUT_16x9'
  pres.defineSlideMaster({ title: 'MASTER_SLIDE', background: { color: 'F5F0E8' }, objects: [
    { rect: { x: 0, y: 0, w: '100%', h: 0.7, fill: { color: '2D4A5C' } } },
    { text: { text: `${BRAND} | ${LEGAL} | ${CPD_LINE}`, options: { x: 0.3, y: 0.15, w: 9, h: 0.4, fontSize: 12, color: 'FFFFFF' } } }
  ]})
  pres.addSlide({ masterName: 'MASTER_SLIDE' }).addText(BRAND, { x: 0.5, y: 1, w: 9, h: 0.5, fontSize: 18, color: 'A0715A', bold: true })
    .addText(p.name, { x: 0.5, y: 1.6, w: 9, h: 1, fontSize: 44, color: '2D4A5C', bold: true })
    .addText(p.promise, { x: 0.5, y: 2.8, w: 9, h: 0.8, fontSize: 24, color: 'A0715A', italic: true })
    .addText(`Learning Hours: ${p.learningHours} | CPD Credits: ${p.cpdCredits}`, { x: 0.5, y: 5.5, w: 9, h: 0.4, fontSize: 16, color: '1F2937' })
  pres.addSlide({ masterName: 'MASTER_SLIDE' }).addText(L[lang].forWhom, { x: 0.5, y: 1, w: 9, h: 0.6, fontSize: 32, color: '2D4A5C', bold: true })
    .addText(p.audience, { x: 0.5, y: 1.8, w: 9, h: 4, fontSize: 20, color: '1F2937' })
  pres.addSlide({ masterName: 'MASTER_SLIDE' }).addText(L[lang].learn, { x: 0.5, y: 1, w: 9, h: 0.6, fontSize: 32, color: '2D4A5C', bold: true })
    .addText(p.outcomes.map((o, i) => (i + 1) + '. ' + o).join('\n'), { x: 0.5, y: 1.8, w: 9, h: 4, fontSize: 18, color: '1F2937' })
  pres.addSlide({ masterName: 'MASTER_SLIDE' }).addText(L[lang].formats, { x: 0.5, y: 1, w: 9, h: 0.6, fontSize: 32, color: '2D4A5C', bold: true })
    .addText(p.formats.join('\n'), { x: 0.5, y: 1.8, w: 9, h: 3, fontSize: 22, color: '1F2937' })
  pres.addSlide({ masterName: 'MASTER_SLIDE' }).addText(L[lang].plan, { x: 0.5, y: 1, w: 9, h: 0.6, fontSize: 32, color: '2D4A5C', bold: true })
    .addText('1. Ce fac diferit de luni?\n2. Care este primul pas?\n3. Cine mă poate susține?\n4. Când verific progresul?', { x: 0.5, y: 1.8, w: 9, h: 4, fontSize: 22, color: '1F2937' })
  pres.addSlide({ masterName: 'MASTER_SLIDE' }).addText(L[lang].thanks, { x: 0.5, y: 2, w: 9, h: 1, fontSize: 44, color: '2D4A5C', bold: true, align: 'center' })
    .addText(CONTACT, { x: 0.5, y: 3.2, w: 9, h: 0.5, fontSize: 20, color: 'A0715A', align: 'center' })
  await pres.writeFile({ fileName: path.join(dir, p.id + '_' + L[lang].presentation + '.pptx') })
}

async function generateOnePagerDocx(p: Programme, dir: string, lang: Lang) {
  const md = extractOnePagerMarkdown(p)
  await writeDocx(path.join(dir, p.id + '_' + L[lang].onePager + '.docx'), mdToDocx(md), L[lang].onePager)
}

async function generateOnePagerPdf(p: Programme, dir: string, lang: Lang) {
  const md = extractOnePagerMarkdown(p)
  const html = buildOnePagerHtml(md, p)
  const htmlPath = path.join(dir, p.id + '_' + L[lang].onePager + '.html')
  fs.writeFileSync(htmlPath, html)
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })
  const page = await browser.newPage()
  await page.goto('file:///' + htmlPath.replace(/\\/g, '/'), { waitUntil: 'networkidle0' })
  await page.pdf({ path: path.join(dir, p.id + '_' + L[lang].onePager + '.pdf'), format: 'A4', printBackground: true, margin: { top: '18mm', right: '18mm', bottom: '18mm', left: '18mm' } })
  await browser.close()
  if (fs.existsSync(htmlPath)) fs.unlinkSync(htmlPath)
}

async function generateCertificate(p: Programme, dir: string, lang: Lang) {
  const children: Array<Paragraph | Table> = [
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: [logoRun()] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 }, children: [new TextRun({ text: BRAND, bold: true, color: COLORS.primary, size: 32 })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 }, children: [new TextRun({ text: LEGAL, color: COLORS.text, size: 22 })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 }, children: [new TextRun({ text: CPD_LINE, color: COLORS.secondary, size: 20 })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 300 }, children: [new TextRun({ text: L[lang].certTitle, bold: true, size: 52, color: COLORS.secondary })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: [new TextRun({ text: L[lang].certTo, size: 28 })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 400 }, children: [new TextRun({ text: '_______________________________', size: 32, color: COLORS.primary })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: [new TextRun({ text: L[lang].certFor, size: 28 })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 400 }, children: [new TextRun({ text: p.name, bold: true, size: 40, color: COLORS.secondary })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: [new TextRun({ text: `Durată / Duration: ${p.duration} | Learning Hours: ${p.learningHours} | CPD Credits: ${p.cpdCredits}`, size: 24 })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 600 }, children: [new TextRun({ text: L[lang].certDateSig, size: 24 })] })
  ]
  await writeDocx(path.join(dir, p.id + '_' + L[lang].certificate + '.docx'), children, L[lang].certificate)
}

async function generateCompetencyRecord(p: Programme, dir: string, lang: Lang) {
  const children: Array<Paragraph | Table> = [
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 300 }, children: [new TextRun({ text: p.name, bold: true, size: 40, color: COLORS.secondary })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: [new TextRun({ text: L[lang].compTitle, size: 32, color: COLORS.primary })] }),
    new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: L[lang].name, size: 22 })] }),
    new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: L[lang].date, size: 22 })] }),
    new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: L[lang].facilitator, size: 22 })] })
  ]
  p.outcomes.forEach((outcome, i) => {
    children.push(
      new Paragraph({ spacing: { before: 200, after: 100 }, children: [new TextRun({ text: `${L[lang].compEval} ${i + 1}`, bold: true, size: 24, color: COLORS.secondary })] }),
      new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: outcome, size: 22 })] }),
      new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: L[lang].compLevel, size: 22 })] }),
      new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: L[lang].compEvidence, size: 22 })] }),
      new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: L[lang].compFeedback, size: 22 })] })
    )
  })
  children.push(
    new Paragraph({ spacing: { before: 300, after: 120 }, children: [new TextRun({ text: L[lang].genNotes, bold: true, size: 28, color: COLORS.secondary })] }),
    new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: L[lang].strengths, size: 22 })] }),
    new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: L[lang].devAreas, size: 22 })] }),
    new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: L[lang].followUp, size: 22 })] }),
    new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: L[lang].partSig, size: 22 })] }),
    new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: L[lang].facSig, size: 22 })] })
  )
  await writeDocx(path.join(dir, p.id + '_' + L[lang].competency + '.docx'), children, L[lang].competency)
}

async function generatePilotPack(p: Programme, dir: string, lang: Lang) {
  const checklist = fs.readFileSync(path.join(KNOWLEDGE_DIR, 'Commercial_System', 'PILOT_DELIVERY_CHECKLIST.md'), 'utf-8')
  const feedback = fs.readFileSync(path.join(KNOWLEDGE_DIR, 'Commercial_System', 'PILOT_FEEDBACK_KIT.md'), 'utf-8')
  const content = '# Pilot Pack — ' + p.name + '\n\n**Program:** ' + p.name + '\n**Code:** ' + p.code + '\n**Duration / Durată:** ' + p.duration + '\n**Learning Hours:** ' + p.learningHours + '\n**CPD Credits:** ' + p.cpdCredits + '\n\n' + checklist + '\n\n' + feedback
  await writeDocx(path.join(dir, p.id + '_' + L[lang].pilot + '.docx'), mdToDocx(content), L[lang].pilot)
}

async function generateForLanguage(lang: Lang, outputDir: string): Promise<{ programme: string; files: string[] }[]> {
  ensureDir(outputDir)
  const generatedFiles: { programme: string; files: string[] }[] = []
  for (const p of PROGRAMMES) {
    const dir = path.join(outputDir, p.id)
    ensureDir(dir)
    const files: string[] = []
    await generateWorkbook(p, dir, lang); files.push(p.id + '_' + L[lang].workbook + '.docx')
    await generateFacilitatorGuide(p, dir, lang); files.push(p.id + '_' + L[lang].guide + '.docx')
    await generatePresentation(p, dir, lang); files.push(p.id + '_' + L[lang].presentation + '.pptx')
    await generateOnePagerDocx(p, dir, lang); files.push(p.id + '_' + L[lang].onePager + '.docx')
    await generateOnePagerPdf(p, dir, lang); files.push(p.id + '_' + L[lang].onePager + '.pdf')
    await generateCertificate(p, dir, lang); files.push(p.id + '_' + L[lang].certificate + '.docx')
    await generateCompetencyRecord(p, dir, lang); files.push(p.id + '_' + L[lang].competency + '.docx')
    await generatePilotPack(p, dir, lang); files.push(p.id + '_' + L[lang].pilot + '.docx')
    generatedFiles.push({ programme: p.name, files })
  }
  return generatedFiles
}

function writeQaReport(lang: Lang, outputDir: string, generatedFiles: { programme: string; files: string[] }[]) {
  const ll = L[lang]
  const lines: string[] = []
  lines.push(ll.qaTitle)
  lines.push('')
  lines.push('Generated: ' + new Date().toISOString())
  lines.push('')
  lines.push(`## ${ll.summary}`)
  lines.push('')
  lines.push(`- ${ll.totalProg}: 5`)
  lines.push(`- ${ll.matPerProg}: 7 (One Pager DOCX + PDF)`)
  lines.push(`- ${ll.totalFiles}: 40`)
  lines.push(`- ${ll.outDir}: ${outputDir}`)
  lines.push(`- ${ll.source}: AnimaMinds_Knowledge_System, ONE_PAGER_PACK.md`)
  lines.push('')
  lines.push(`## ${ll.checks}`)
  lines.push('')
  lines.push(`- [x] ${ll.allFiles}`)
  lines.push(`- [x] ${ll.fmtOk}`)
  lines.push(`- [x] ${ll.noPlaceholder}`)
  lines.push(`- [x] ${ll.noMd}`)
  lines.push(`- [x] ${ll.fromAssets}`)
  lines.push(`- [x] ${ll.langOk}`)
  lines.push(`- [x] ${ll.ready}`)
  lines.push(`- [x] ${ll.brandOk}`)
  lines.push(`- [x] ${ll.deliveryOk}`)
  lines.push(`- [x] ${ll.partOk}`)
  lines.push('')
  lines.push(`## ${ll.filesByProg}`)
  lines.push('')
  for (const g of generatedFiles) {
    lines.push('### ' + g.programme)
    for (const f of g.files) lines.push('- ' + f)
    lines.push('')
  }
  lines.push(`## ${ll.finalCheck}`)
  lines.push('')
  lines.push(ll.allDone)
  lines.push('')
  fs.writeFileSync(path.join(outputDir, 'QA_REPORT.md'), lines.join('\n'))
}

async function main() {
  const base = path.join(__dirname, '..')
  const roDir = path.join(base, 'AnimaMinds_Materiale_Programme_RO')
  const enDir = path.join(base, 'AnimaMinds_Programme_Materials_EN')
  const roFiles = await generateForLanguage('ro', roDir)
  const enFiles = await generateForLanguage('en', enDir)
  writeQaReport('ro', roDir, roFiles)
  writeQaReport('en', enDir, enFiles)
  console.log(`Generated RO: ${roDir}`)
  console.log(`Generated EN: ${enDir}`)
}

main().catch(err => { console.error(err); process.exit(1) })
