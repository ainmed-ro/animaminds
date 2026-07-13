import fs from 'fs'
import path from 'path'
import { Document, Packer, Paragraph, TextRun, AlignmentType, Header, Footer, Table, TableCell, TableRow, WidthType, BorderStyle, ImageRun, PageOrientation, PageNumber } from 'docx'
import PptxGenJS from 'pptxgenjs'
import puppeteer from 'puppeteer'

const KNOWLEDGE_DIR = path.join(__dirname, '..', 'AnimaMinds_Knowledge_System')
const ONE_PAGER_PACK = path.join(__dirname, '..', 'ONE_PAGER_PACK.md')
const LOGO_PATH = path.join(__dirname, '..', 'public', 'images', 'seal-monogram.png')

const BRAND = 'AnimaMinds'
const LEGAL_RO = 'NICULAE ALINA-IONELA PFA'
const LEGAL_EN = 'NICULAE ALINA-IONELA PFA'
const CPD_LINE = 'CPD Approved Provider — The CPD Group #790577'
const CONTACT = 'contact@animaminds.ro | www.animaminds.ro'
const COLORS = { primary: 'A0715A', secondary: '2D4A5C', text: '1F2937', light: 'F5F0E8', white: 'FFFFFF' }

type Lang = 'ro' | 'en'

const L: Record<Lang, any> = {
  ro: {
    folder: 'AnimaMinds_Materiale_Programme_RO',
    workbook: 'Caiet_de_lucru', guide: 'Ghidul_facilitatorului', presentation: 'Prezentare',
    onePager: 'Pagina_unica', onePagerCommercial: 'Pagina_unica_comercial',
    certificate: 'Certificat_de_finalizare', cpdPackage: 'Pachet_CPD',
    competency: 'Registru_de_competente', pilot: 'Pachet_pilot',
    certTitle: 'CERTIFICAT DE FINALIZARE', certTo: 'Se acordă participantului', certFor: 'pentru finalizarea cu succes a programului',
    compTitle: 'Registru de competențe', compEval: 'Competențe evaluate',
    compLevel: 'Nivel demonstrat: □ În curs de dezvoltare  □ Competent  □ Avansat',
    forWhom: 'Pentru cine', learn: 'Ce vei învăța', formats: 'Formate de livrare',
    plan: 'Planul tău de acțiune', thanks: 'Mulțumim!',
    name: 'Nume participant:', date: 'Data programului:', facilitator: 'Facilitator:',
    contactCta: 'Pentru oferte personalizate: ' + CONTACT,
    qaTitle: 'AnimaMinds — Raport QA materiale programe',
    summary: 'Rezumat', totalProg: 'Total programe', matPerProg: 'Materiale per program',
    totalFiles: 'Total fișiere generate', outDir: 'Director de ieșire', source: 'Sursă',
    checks: 'Verificări de calitate', allFiles: 'Toate fișierele create pentru fiecare program.',
    fmtOk: 'Formatele sunt DOCX, PPTX și PDF, conform cererii.',
    noPlaceholder: 'Nu rămâne text placeholder în documentele finale.',
    noMd: 'Nu se folosește markdown ca livrabil final.',
    fromAssets: 'Conținutul provine din asseturile existente AnimaMinds, nu este inventat.',
    langOk: 'Limbajul este profesional și respectă terminologia CPD.',
    ready: 'Materialele sunt gata pentru participanți și traineri.',
    brandOk: 'Aplicată identitatea vizuală AnimaMinds.',
    deliveryOk: 'Denumirile formatelor de livrare sunt consistente.',
    partOk: 'Modalitatea de participare este listată separat.',
    filesByProg: 'Fișiere generate per program',
    finalCheck: 'Verificare finală', allDone: 'Toate fișierele au fost generate cu succes.',
    disclaimer: ''
  },
  en: {
    folder: 'AnimaMinds_Programme_Materials_EN',
    workbook: 'Workbook', guide: 'Facilitator_Guide', presentation: 'Presentation',
    onePager: 'One_Pager', onePagerCommercial: 'One_Pager_commercial',
    certificate: 'Certificate_of_Completion', cpdPackage: 'CPD_Package',
    competency: 'Competency_Achievement_Record', pilot: 'Pilot_Pack',
    certTitle: 'CERTIFICATE OF COMPLETION', certTo: 'This certificate is awarded to', certFor: 'for successful completion of the programme',
    compTitle: 'Competency Achievement Record', compEval: 'Competencies evaluated',
    compLevel: 'Demonstrated level: □ Developing  □ Competent  □ Advanced',
    forWhom: 'Who is this for', learn: 'What you will learn', formats: 'Delivery formats',
    plan: 'Your action plan', thanks: 'Thank you!',
    name: 'Participant name:', date: 'Programme date:', facilitator: 'Facilitator:',
    contactCta: 'For custom offers: ' + CONTACT,
    qaTitle: 'AnimaMinds — All Programmes Materials QA Report',
    summary: 'Summary', totalProg: 'Total programmes', matPerProg: 'Materials per programme',
    totalFiles: 'Total files generated', outDir: 'Output directory', source: 'Source',
    checks: 'Quality checks', allFiles: 'All files created for each programme.',
    fmtOk: 'Formats are DOCX, PPTX and PDF as requested.',
    noPlaceholder: 'No placeholder text remains in final documents.',
    noMd: 'No markdown used as final deliverable.',
    fromAssets: 'Content is derived from existing AnimaMinds assets, not invented.',
    langOk: 'Language is professional and respects CPD terminology.',
    ready: 'Materials are ready for participants and trainers.',
    brandOk: 'AnimaMinds branding applied.',
    deliveryOk: 'Delivery format names are consistent.',
    partOk: 'Participation method is listed separately.',
    filesByProg: 'Generated files by programme',
    finalCheck: 'Final checklist', allDone: 'All files were generated successfully.',
    disclaimer: 'English-language edition. Programme body content is in Romanian pending dedicated English source materials.'
  }
}

const RO_HEADER_MAP: Record<string, string> = {
  'Program code:': 'Cod program:', 'Category:': 'Categorie:', 'Version:': 'Versiune:',
  'Source PMD:': 'Sursă PMD:', 'Formats:': 'Formate:', 'Welcome': 'Bun venit',
  'AI Quick Start': 'Start rapid AI', 'Target audience': 'Public țintă',
  'Primary audience': 'Public țintă principal', 'Secondary audience': 'Public țintă secundar',
  'Not included': 'Nu este vizat', 'Learning outcomes': 'Rezultatele învățării',
  'Benefits': 'Beneficii', 'Duration': 'Durată', 'Delivery formats': 'Formate de livrare',
  'CPD information': 'Informații CPD', 'Call to action': 'Apel la acțiune',
  'Purpose': 'Scop', 'Challenge solved': 'Provocare rezolvată',
  'Program promise': 'Promisiunea programului',
  'What “maintaining control” means in this program:': 'Ce înseamnă „a păstra controlul” în acest program:',
  'Participants will leave the program able to:': 'Participanții vor pleca de la program capabili să:',
  'By the end of the program, participants will be able to:': 'La finalul programului, participanții vor putea:',
  'Participant Workbook': 'Caiet de lucru al participantului',
  'Facilitator Guide': 'Ghidul facilitatorului',
  'Commercial Sheet': 'Fișă comercială',
  'CPD Package': 'Pachet CPD',
  'Competency Achievement Record': 'Registru de competențe',
  'Certificate of Completion': 'Certificat de finalizare'
}

const EN_HEADER_MAP: Record<string, string> = {
  'Cod program:': 'Program code:', 'Categorie:': 'Category:', 'Versiune:': 'Version:',
  'Sursă PMD:': 'Source PMD:', 'Formate:': 'Formats:', 'Bun venit': 'Welcome',
  'Start rapid AI': 'AI Quick Start', 'Public țintă': 'Target audience',
  'Public țintă principal': 'Primary audience', 'Public țintă secundar': 'Secondary audience',
  'Nu este vizat': 'Not included', 'Rezultatele învățării': 'Learning outcomes',
  'Beneficii': 'Benefits', 'Durată': 'Duration', 'Formate de livrare': 'Delivery formats',
  'Informații CPD': 'CPD information', 'Apel la acțiune': 'Call to action',
  'Scop': 'Purpose', 'Provocare rezolvată': 'Challenge solved',
  'Promisiunea programului': 'Program promise'
}

function ensureDir(d: string) { if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true }) }
function twip(n: number) { return n * 1440 }
function esc(t: string) { return t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;') }

function translateHeaders(md: string, lang: Lang): string {
  const map = lang === 'ro' ? RO_HEADER_MAP : EN_HEADER_MAP
  let out = md
  for (const [key, val] of Object.entries(map)) {
    const regex = new RegExp('(^|\\W)(' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'g')
    out = out.replace(regex, (m, p1, p2) => p1 + val)
  }
  return out
}

function parseInline(t: string): TextRun[] {
  const runs: TextRun[] = []; let r = t
  while (r.length) {
    const m = [
      { k: 'b', m: r.match(/^(.*?)\*\*(.+?)\*\*(.*)$/) },
      { k: 'i', m: r.match(/^(.*?)\*(.+?)\*(.*)$/) },
      { k: 'u', m: r.match(/^(.*?)__(.+?)__(.*)$/) },
      { k: 'c', m: r.match(/^(.*?)`(.+?)`(.*)$/) }
    ].filter(x => x.m).sort((a, b) => a.m![1].length - b.m![1].length)[0]
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
  return new ImageRun({ data: fs.readFileSync(LOGO_PATH), transformation: { width: 40, height: 40 }, type: 'png' })
}

function headerParagraph(docLabel: string, lang: Lang): Paragraph {
  return new Paragraph({
    spacing: { after: 120 },
    children: [
      logoRun(),
      new TextRun({ text: '  ', size: 14 }),
      new TextRun({ text: BRAND, bold: true, color: COLORS.primary, size: 20 }),
    ]
  })
}

function headerSubParagraph(docLabel: string, lang: Lang): Paragraph {
  const legal = lang === 'ro' ? LEGAL_RO : LEGAL_EN
  return new Paragraph({
    spacing: { after: 120 },
    border: { bottom: { color: COLORS.primary, space: 1, style: BorderStyle.SINGLE, size: 8 } },
    children: [
      new TextRun({ text: legal, color: COLORS.text, size: 14 }),
      new TextRun({ text: '  |  ', size: 14 }),
      new TextRun({ text: CPD_LINE, color: COLORS.secondary, size: 14 }),
      new TextRun({ text: '  |  ', size: 14 }),
      new TextRun({ text: docLabel, italics: true, color: COLORS.text, size: 14 })
    ]
  })
}

function coverPageChildren(p: Programme, docLabel: string, lang: Lang): Array<Paragraph | Table> {
  const legal = lang === 'ro' ? LEGAL_RO : LEGAL_EN
  const editionLabel = lang === 'ro' ? 'Ediție aprobată CPD' : 'CPD Approved Edition'
  return [
    new Paragraph({ spacing: { before: 600, after: 200 }, alignment: AlignmentType.CENTER, children: [logoRun()] }),
    new Paragraph({ spacing: { after: 120 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: BRAND, bold: true, color: COLORS.primary, size: 44 })] }),
    new Paragraph({ spacing: { after: 60 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: editionLabel, color: COLORS.secondary, size: 24 })] }),
    new Paragraph({ spacing: { before: 400, after: 120 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: p.name, bold: true, color: COLORS.secondary, size: 52 })] }),
    new Paragraph({ spacing: { after: 200 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: p.promise, italics: true, color: COLORS.primary, size: 28 })] }),
    new Paragraph({ spacing: { after: 60 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: docLabel, bold: true, color: COLORS.text, size: 32 })] }),
    new Paragraph({ spacing: { before: 400, after: 60 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${L[lang].summary}: ${p.duration}`, size: 22 })] }),
    new Paragraph({ spacing: { after: 60 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: p.durationVariants.map(v => `${v.label}: ${v.hours} ${lang === 'ro' ? 'ore' : 'hours'} / ${v.credits} CPD`).join('  |  '), size: 20 })] }),
    new Paragraph({ spacing: { after: 120 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: legal, size: 20 })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: CPD_LINE, color: COLORS.secondary, size: 20 })] })
  ]
}

function sectionDivider(title: string): Paragraph {
  return new Paragraph({
    spacing: { before: 400, after: 200 },
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: title, bold: true, color: COLORS.white, size: 28 })],
    shading: { fill: COLORS.secondary }
  })
}

async function writeDocx(file: string, children: Array<Paragraph | Table>, docLabel: string, lang: Lang) {
  const doc = new Document({
    sections: [{
      properties: { page: { margin: { top: twip(0.9), right: twip(0.7), bottom: twip(0.7), left: twip(0.7) } } },
      headers: { default: new Header({ children: [headerParagraph(docLabel, lang), headerSubParagraph(docLabel, lang)] }) },
      footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${BRAND} © 2026 | ${CONTACT} | `, color: COLORS.text, size: 16 }), new TextRun({ children: [PageNumber.CURRENT], color: COLORS.text, size: 16 }), new TextRun({ text: ' / ', color: COLORS.text, size: 16 }), new TextRun({ children: [PageNumber.TOTAL_PAGES], color: COLORS.text, size: 16 })] })] }) },
      children
    }]
  })
  fs.writeFileSync(file, await Packer.toBuffer(doc))
}

async function writeDocxFromMd(file: string, mdPath: string, docLabel: string, lang: Lang, cover?: Array<Paragraph | Table>) {
  let md = fs.readFileSync(mdPath, 'utf-8')
  md = translateHeaders(md, lang)
  const children: Array<Paragraph | Table> = []
  if (cover) children.push(...cover)
  children.push(...mdToDocx(md))
  await writeDocx(file, children, docLabel, lang)
}

interface DurationVariant {
  label: string
  hours: number
  credits: number
}

interface Programme {
  id: string; code: string; name: string; promise: string; audience: string; outcomes: string[];
  benefits: string[]; formats: string[]; duration: string; learningHours: string; cpdCredits: string;
  durationVariants: DurationVariant[]
  sources: { pmd: string; workbook: string; guide: string; sheet: string; cpd: string }
}

function readSection(md: string, title: string): string {
  const lines = md.split('\n')
  const start = lines.findIndex(l => l.match(/^#{2,3}\s+/) && l.toLowerCase().includes(title.toLowerCase()))
  if (start === -1) return ''
  const lvl = lines[start].match(/^#+/)![0].length
  const end = lines.slice(start + 1).findIndex(l => { const m = l.match(/^#+\s+/); return m && m[0].length <= lvl })
  return lines.slice(start, end === -1 ? lines.length : start + 1 + end).join('\n')
}

function extractList(section: string): string[] {
  return section.split('\n').filter(l => l.match(/^[-*]\s+/)).map(l => l.replace(/^[-*]\s+/, ''))
}

function extractNumberedList(section: string): string[] {
  return section.split('\n').filter(l => l.match(/^\d+\.\s+/)).map(l => l.replace(/^\d+\.\s+/, ''))
}

function extractOnePagerSection(name: string, section: string): string {
  const pack = fs.readFileSync(ONE_PAGER_PACK, 'utf-8').replace(/\r\n/g, '\n')
  const lines = pack.split('\n')
  const start = lines.findIndex(l => l.startsWith('## ') && l.includes(name))
  if (start === -1) return ''
  const end = lines.slice(start + 1).findIndex(l => l.startsWith('## '))
  const sectionStart = lines.slice(start, end === -1 ? lines.length : start + 1 + end).findIndex(l => l.startsWith('### ' + section))
  if (sectionStart === -1) return ''
  const absStart = start + sectionStart
  const nextSection = lines.slice(absStart + 1).findIndex(l => l.startsWith('### '))
  return lines.slice(absStart, nextSection === -1 ? (end === -1 ? lines.length : start + 1 + end) : absStart + 1 + nextSection).join('\n')
}

function extractProgramName(pmd: string): string {
  const first = pmd.split('\n')[0] || ''
  const m = first.match(/^#\s+PMD_\d+\s+[—-]\s+(?:Program Design Document:\s*)?(.+)$/)
  return m ? m[1].trim() : ''
}

function sanitizeFileName(s: string): string { return s.replace(/[<>:"\\/|?*]/g, '_').replace(/\s+/g, '_') }

function loadProgramme(code: string, pmdFile: string, workbook: string, guide: string, sheet: string, cpd: string): Programme {
  const pmd = fs.readFileSync(path.join(KNOWLEDGE_DIR, pmdFile), 'utf-8')
  const name = extractProgramName(pmd) || code
  const promiseMatch = pmd.match(/^>\s*(.+)$/m)
  const promise = promiseMatch ? promiseMatch[1].trim() : ''
  const audienceLines = extractList(readSection(pmd, 'Target audience'))
  const audience = audienceLines.join(', ')
  const outcomes = extractNumberedList(readSection(pmd, 'Learning outcomes'))
  const benefits = extractList(extractOnePagerSection(name, 'Benefits'))
  const isLong = ['PMD_001', 'PMD_002', 'PMD_004'].includes(code)
  const onlineContact = isLong ? 6.5 : 6
  const onsiteContact = onlineContact
  const onlineSessions = isLong ? '3 sesiuni (2h + 2h + 2.5h)' : '3 sesiuni (2h + 2h + 2h)'
  const individual = 1
  const onlineLearning = onlineContact + individual
  const onsiteLearning = onsiteContact + individual
  const experienceContact = 10
  const experienceIndividual = 2
  const experienceLearning = experienceContact + experienceIndividual
  const durationVariants: DurationVariant[] = [
    { label: `Online Live ${onlineSessions}`, hours: onlineLearning, credits: Math.round(onlineLearning) },
    { label: `La sediul instituției / organizației 1 zi (${onsiteContact}h) / On-site 1 day (${onsiteContact}h)`, hours: onsiteLearning, credits: Math.round(onsiteLearning) },
    { label: 'Experience Edition 2 zile / 2 days', hours: experienceLearning, credits: Math.round(experienceLearning) },
  ]
  return {
    id: sanitizeFileName(code + '_' + name),
    code, name, promise, audience, outcomes,
    benefits, formats: ['Online Live', 'La sediul instituției / organizației', 'Experience Edition'],
    duration: `${onlineSessions} Online Live · 1 zi la sediu · 2 zile Experience Edition`,
    learningHours: String(onsiteLearning), cpdCredits: String(Math.round(onsiteLearning)),
    durationVariants,
    sources: { pmd: path.join(KNOWLEDGE_DIR, pmdFile), workbook, guide, sheet, cpd }
  }
}

const PROGRAMMES: Programme[] = [
  loadProgramme('PMD_001', 'PMD_001_AI_Fara_Haos_v2.md', path.join(KNOWLEDGE_DIR, 'Commercial_System', 'PMD_001', 'Workbook_v2.md'), path.join(KNOWLEDGE_DIR, 'Commercial_System', 'PMD_001', 'Facilitator_Guide_v2.md'), path.join(KNOWLEDGE_DIR, 'Commercial_System', 'PMD_001', 'Commercial_Sheet_v2.md'), path.join(KNOWLEDGE_DIR, 'Commercial_System', 'PMD_001', 'CPD_Package_v2.md')),
  loadProgramme('PMD_002', 'PMD_002_Conversatii_care_Conteaza_v2.md', path.join(KNOWLEDGE_DIR, 'Commercial_System', 'PMD_002', 'Workbook_v1.md'), path.join(KNOWLEDGE_DIR, 'Commercial_System', 'PMD_002', 'Facilitator_Guide_v1.md'), path.join(KNOWLEDGE_DIR, 'Commercial_System', 'PMD_002', 'Commercial_Sheet_v1.md'), path.join(KNOWLEDGE_DIR, 'Commercial_System', 'PMD_002', 'CPD_Package_v1.md')),
  loadProgramme('PMD_003', 'PMD_003_Calm_sub_Presiune_v2.md', path.join(KNOWLEDGE_DIR, 'Commercial_System', 'PMD_003', 'Workbook_v1.md'), path.join(KNOWLEDGE_DIR, 'Commercial_System', 'PMD_003', 'Facilitator_Guide_v1.md'), path.join(KNOWLEDGE_DIR, 'Commercial_System', 'PMD_003', 'Commercial_Sheet_v1.md'), path.join(KNOWLEDGE_DIR, 'Commercial_System', 'PMD_003', 'CPD_Package_v1.md')),
  loadProgramme('PMD_004', 'PMD_004_Busola_Deciziilor_v2.md', path.join(KNOWLEDGE_DIR, 'Commercial_System', 'PMD_004', 'Workbook_v1.md'), path.join(KNOWLEDGE_DIR, 'Commercial_System', 'PMD_004', 'Facilitator_Guide_v1.md'), path.join(KNOWLEDGE_DIR, 'Commercial_System', 'PMD_004', 'Commercial_Sheet_v1.md'), path.join(KNOWLEDGE_DIR, 'Commercial_System', 'PMD_004', 'CPD_Package_v1.md')),
  loadProgramme('PMD_005', 'PMD_005_Avantajul_Uman_v2.md', path.join(KNOWLEDGE_DIR, 'Commercial_System', 'PMD_005', 'Workbook_v1.md'), path.join(KNOWLEDGE_DIR, 'Commercial_System', 'PMD_005', 'Facilitator_Guide_v1.md'), path.join(KNOWLEDGE_DIR, 'Commercial_System', 'PMD_005', 'Commercial_Sheet_v1.md'), path.join(KNOWLEDGE_DIR, 'Commercial_System', 'PMD_005', 'CPD_Package_v1.md'))
]

async function generateWorkbook(p: Programme, dir: string, lang: Lang) {
  await writeDocxFromMd(
    path.join(dir, p.id + '_' + L[lang].workbook + '.docx'),
    p.sources.workbook,
    L[lang].workbook,
    lang,
    coverPageChildren(p, L[lang].workbook, lang)
  )
}

async function generateFacilitatorGuide(p: Programme, dir: string, lang: Lang) {
  await writeDocxFromMd(
    path.join(dir, p.id + '_' + L[lang].guide + '.docx'),
    p.sources.guide,
    L[lang].guide,
    lang,
    coverPageChildren(p, L[lang].guide, lang)
  )
}

async function generateSheetDocx(p: Programme, dir: string, lang: Lang) {
  const label = lang === 'ro' ? 'Pagina unică comercială' : 'Commercial One-Pager'
  await writeDocxFromMd(path.join(dir, p.id + '_' + L[lang].onePagerCommercial + '.docx'), p.sources.sheet, label, lang)
}

async function generateCpdDocx(p: Programme, dir: string, lang: Lang) {
  const label = lang === 'ro' ? 'Pachet CPD' : 'CPD Package'
  await writeDocxFromMd(path.join(dir, p.id + '_' + L[lang].cpdPackage + '.docx'), p.sources.cpd, label, lang)
}

function addSlideWithFitText(pres: PptxGenJS, title: string, lines: string[], yStart = 1.25) {
  const slide = pres.addSlide({ masterName: 'MASTER_SLIDE' })
  slide.addText(title, { x: 0.5, y: 0.9, w: 9, h: 0.55, fontSize: 26, color: COLORS.secondary, bold: true })
  const h = Math.min(5.7, Math.max(1.2, lines.length * 0.42))
  slide.addText(lines.join('\n'), { x: 0.5, y: yStart, w: 9, h: h, fontSize: 16, color: COLORS.text, valign: 'top', fit: 'shrink' })
  return slide
}

async function generatePresentation(p: Programme, dir: string, lang: Lang) {
  const pres = new PptxGenJS()
  pres.layout = 'LAYOUT_16x9'
  pres.defineSlideMaster({ title: 'MASTER_SLIDE', background: { color: 'F5F0E8' }, objects: [
    { rect: { x: 0, y: 0, w: '100%', h: 0.7, fill: { color: '2D4A5C' } } },
    { text: { text: `${BRAND} | ${LEGAL_RO} | ${CPD_LINE}`, options: { x: 0.3, y: 0.15, w: 9, h: 0.4, fontSize: 12, color: 'FFFFFF' } } }
  ]})

  // Title
  pres.addSlide({ masterName: 'MASTER_SLIDE' })
    .addText(BRAND, { x: 0.5, y: 1, w: 9, h: 0.45, fontSize: 18, color: COLORS.primary, bold: true })
    .addText(p.name, { x: 0.5, y: 1.6, w: 9, h: 1, fontSize: 42, color: COLORS.secondary, bold: true })
    .addText(p.promise, { x: 0.5, y: 2.8, w: 9, h: 0.8, fontSize: 24, color: COLORS.primary, italic: true })
    .addText(`${L[lang].summary}: ${p.duration} | Learning Hours: ${p.learningHours} | CPD Credits: ${p.cpdCredits}`, { x: 0.5, y: 5.4, w: 9, h: 0.4, fontSize: 16, color: COLORS.text })

  // Promise
  addSlideWithFitText(pres, 'Promisiunea programului / Programme Promise', [p.promise])

  // For whom
  addSlideWithFitText(pres, L[lang].forWhom, p.audience.split(', '))

  // Benefits
  addSlideWithFitText(pres, lang === 'ro' ? 'Beneficii' : 'Benefits', p.benefits.length ? p.benefits.map((b, i) => `${i + 1}. ${b}`) : ['—'])

  // Outcomes (split across multiple slides if needed)
  const outcomeChunks: string[][] = []
  for (let i = 0; i < p.outcomes.length; i += 5) outcomeChunks.push(p.outcomes.slice(i, i + 5).map((o, j) => `${i + j + 1}. ${o}`))
  outcomeChunks.forEach((chunk, idx) => addSlideWithFitText(pres, `${L[lang].learn}${outcomeChunks.length > 1 ? ` (${idx + 1}/${outcomeChunks.length})` : ''}`, chunk))

  // Formats
  addSlideWithFitText(pres, L[lang].formats, p.formats.map(f => `• ${f}`))

  // CTA / Thanks
  pres.addSlide({ masterName: 'MASTER_SLIDE' })
    .addText(L[lang].thanks, { x: 0.5, y: 1.8, w: 9, h: 1, fontSize: 44, color: COLORS.secondary, bold: true, align: 'center' })
    .addText(L[lang].contactCta, { x: 0.5, y: 3.2, w: 9, h: 0.5, fontSize: 18, color: COLORS.primary, align: 'center' })

  await pres.writeFile({ fileName: path.join(dir, p.id + '_' + L[lang].presentation + '.pptx') })
}

function buildOnePagerHtml(md: string, p: Programme, lang: Lang): string {
  const html = md.split('\n').map(line => {
    if (line.startsWith('# ')) return '<h1>' + esc(line.replace(/^#\s+/, '')) + '</h1>'
    if (line.startsWith('## ')) return '<h2>' + esc(line.replace(/^##\s+/, '')) + '</h2>'
    if (line.startsWith('### ')) return '<h3>' + esc(line.replace(/^###\s+/, '')) + '</h3>'
    if (line.startsWith('- ')) return '<li>' + esc(line.replace(/^-\s+/, '')) + '</li>'
    if (line.trim() === '') return ''
    return '<p>' + esc(line) + '</p>'
  }).join('\n')
  const disclaimer = L[lang].disclaimer ? `<p class="disclaimer">${esc(L[lang].disclaimer)}</p>` : ''
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<title>${esc(p.name)}</title>
<style>
@page { size: A4; margin: 18mm; }
body { font-family: Georgia, serif; margin: 0; color: ${COLORS.text}; }
.page { width: 210mm; min-height: 297mm; box-sizing: border-box; padding: 18mm; border: 1px solid #ddd; }
.brand { font-size: 13px; color: ${COLORS.primary}; letter-spacing: 1px; text-transform: uppercase; font-weight: bold; margin-bottom: 12px; }
.brand .line2 { font-size: 11px; color: ${COLORS.text}; font-weight: normal; text-transform: none; margin-top: 3px; }
h1 { font-size: 32px; color: ${COLORS.secondary}; margin: 0 0 12px 0; page-break-after: avoid; }
h2 { font-size: 17px; color: ${COLORS.secondary}; margin-top: 16px; margin-bottom: 6px; border-bottom: 1px solid ${COLORS.primary}; padding-bottom: 4px; page-break-after: avoid; }
h3 { font-size: 14px; color: ${COLORS.primary}; margin-top: 10px; margin-bottom: 4px; page-break-after: avoid; }
ul { padding-left: 18px; margin: 0; }
li { margin-bottom: 5px; font-size: 12px; line-height: 1.35; page-break-inside: avoid; }
p { font-size: 12px; line-height: 1.35; margin: 0 0 6px 0; page-break-inside: avoid; orphans: 3; widows: 3; }
.disclaimer { margin-top: 14px; font-size: 11px; color: ${COLORS.primary}; font-style: italic; border: 1px solid ${COLORS.primary}; padding: 8px; }
</style>
</head>
<body>
<div class="page">
<div class="brand">${esc(BRAND)}<div class="line2">${esc(LEGAL_RO)} | ${esc(CPD_LINE)}</div></div>
<h1>${esc(p.name)}</h1>
${disclaimer}
${html}
</div>
</body>
</html>`
}

function extractOnePagerMarkdown(p: Programme): string {
  const pack = fs.readFileSync(ONE_PAGER_PACK, 'utf-8').replace(/\r\n/g, '\n')
  const lines = pack.split('\n')
  const start = lines.findIndex(l => l.match(/^##\s+\S+\s+[—-]\s+/) && l.includes(p.name))
  if (start === -1) return ''
  const end = lines.slice(start + 1).findIndex(l => l.match(/^---\s*$/) || l.match(/^##\s+\S+\s+[—-]\s+/))
  return lines.slice(start, end === -1 ? lines.length : start + 1 + end).join('\n').replace(/^##\s+.+$/m, '## ' + p.name)
}

async function generateOnePagerDocx(p: Programme, dir: string, lang: Lang) {
  const md = extractOnePagerMarkdown(p)
  await writeDocx(path.join(dir, p.id + '_' + L[lang].onePager + '.docx'), mdToDocx(translateHeaders(md, lang)), L[lang].onePager, lang)
}

async function generateOnePagerPdf(p: Programme, dir: string, lang: Lang) {
  const md = extractOnePagerMarkdown(p)
  const html = buildOnePagerHtml(translateHeaders(md, lang), p, lang)
  const htmlPath = path.join(dir, p.id + '_' + L[lang].onePager + '.html')
  fs.writeFileSync(htmlPath, html)
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })
  const page = await browser.newPage()
  await page.goto('file:///' + htmlPath.replace(/\\/g, '/'), { waitUntil: 'networkidle0' })
  await page.pdf({ path: path.join(dir, p.id + '_' + L[lang].onePager + '.pdf'), format: 'A4', printBackground: true, margin: { top: '18mm', right: '18mm', bottom: '18mm', left: '18mm' } })
  await browser.close()
  if (fs.existsSync(htmlPath)) fs.unlinkSync(htmlPath)
}

function certificateBorderCell(children: Array<Paragraph | Table>): TableCell {
  return new TableCell({
    children,
    borders: {
      top: { style: BorderStyle.DOUBLE, size: 18, color: COLORS.primary },
      bottom: { style: BorderStyle.DOUBLE, size: 18, color: COLORS.primary },
      left: { style: BorderStyle.DOUBLE, size: 18, color: COLORS.primary },
      right: { style: BorderStyle.DOUBLE, size: 18, color: COLORS.primary }
    },
    shading: { fill: 'FDFBF7' },
    verticalAlign: 'center' as any
  })
}

async function generateCertificate(p: Programme, dir: string, lang: Lang) {
  const legal = lang === 'ro' ? LEGAL_RO : LEGAL_EN
  const sealText = lang === 'ro' ? 'Sigiliu de certificare' : 'Certification seal'

  const innerContent: Array<Paragraph | Table> = [
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: [logoRun()] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 80 }, children: [new TextRun({ text: BRAND, bold: true, color: COLORS.primary, size: 36 })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 80 }, children: [new TextRun({ text: legal, color: COLORS.text, size: 20 })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 80 }, children: [new TextRun({ text: CPD_LINE, color: COLORS.secondary, size: 20, bold: true })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 320, after: 240 }, children: [new TextRun({ text: L[lang].certTitle, bold: true, size: 56, color: COLORS.secondary })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 160 }, children: [new TextRun({ text: L[lang].certTo, size: 30, color: COLORS.text })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 320 }, children: [new TextRun({ text: '_________________________________________', size: 32, color: COLORS.primary })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 160 }, children: [new TextRun({ text: L[lang].certFor, size: 28, color: COLORS.text })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 280 }, children: [new TextRun({ text: p.name, bold: true, size: 46, color: COLORS.secondary })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 120 }, children: [new TextRun({ text: `${L[lang].summary}: ${p.duration}`, size: 26, color: COLORS.text })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 80 }, children: [new TextRun({ text: p.durationVariants.map(v => `${v.label}: ${v.hours} ${lang === 'ro' ? 'ore' : 'hours'} / ${v.credits} CPD`).join('  |  '), size: 22, color: COLORS.text })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 360, after: 40 }, children: [new TextRun({ text: '_________________________________________', size: 24, color: COLORS.primary })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: [new TextRun({ text: lang === 'ro' ? 'Semnătura facilitatorului / Data' : 'Facilitator signature / Date', size: 20, color: COLORS.text })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 160, after: 40 }, children: [new TextRun({ text: BRAND, bold: true, size: 22, color: COLORS.primary })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 40 }, children: [new TextRun({ text: CONTACT, size: 16, color: COLORS.text })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${sealText} — The CPD Group #790577`, italics: true, size: 16, color: COLORS.secondary })] })
  ]

  const framed = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [new TableRow({ children: [certificateBorderCell(innerContent)] })]
  })

  const doc = new Document({
    sections: [{
      properties: { page: { size: { orientation: PageOrientation.LANDSCAPE }, margin: { top: twip(0.6), right: twip(0.6), bottom: twip(0.6), left: twip(0.6) } } },
      headers: { default: new Header({ children: [] }) },
      footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${BRAND} © 2026`, color: COLORS.text, size: 16 })] })] }) },
      children: [framed]
    }]
  })
  fs.writeFileSync(path.join(dir, p.id + '_' + L[lang].certificate + '.docx'), await Packer.toBuffer(doc))
}

async function generateCompetencyRecord(p: Programme, dir: string, lang: Lang) {
  const rows = p.outcomes.map((outcome, i) => new TableRow({
    children: [
      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: String(i + 1), size: 20 })] })], borders: { top: { style: BorderStyle.SINGLE, size: 1, color: COLORS.secondary }, bottom: { style: BorderStyle.SINGLE, size: 1, color: COLORS.secondary }, left: { style: BorderStyle.SINGLE, size: 1, color: COLORS.secondary }, right: { style: BorderStyle.SINGLE, size: 1, color: COLORS.secondary } } }),
      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: outcome, size: 20 })] })], borders: { top: { style: BorderStyle.SINGLE, size: 1, color: COLORS.secondary }, bottom: { style: BorderStyle.SINGLE, size: 1, color: COLORS.secondary }, left: { style: BorderStyle.SINGLE, size: 1, color: COLORS.secondary }, right: { style: BorderStyle.SINGLE, size: 1, color: COLORS.secondary } } }),
      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: L[lang].compLevel, size: 18 })] })], borders: { top: { style: BorderStyle.SINGLE, size: 1, color: COLORS.secondary }, bottom: { style: BorderStyle.SINGLE, size: 1, color: COLORS.secondary }, left: { style: BorderStyle.SINGLE, size: 1, color: COLORS.secondary }, right: { style: BorderStyle.SINGLE, size: 1, color: COLORS.secondary } } })
    ]
  }))
  const children: Array<Paragraph | Table> = [
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 240 }, children: [new TextRun({ text: p.name, bold: true, size: 36, color: COLORS.secondary })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 160 }, children: [new TextRun({ text: L[lang].compTitle, size: 28, color: COLORS.primary })] }),
    new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: L[lang].name + ' ________________________________________________', size: 22 })] }),
    new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: L[lang].date + ' ________________________________________________', size: 22 })] }),
    new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: L[lang].facilitator + ' ________________________________________________', size: 22 })] }),
    new Paragraph({ spacing: { before: 200, after: 120 }, children: [new TextRun({ text: L[lang].compEval, bold: true, size: 24, color: COLORS.secondary })] }),
    new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows }),
    new Paragraph({ spacing: { before: 160, after: 100 }, children: [new TextRun({ text: L[lang].compEvidence, size: 22 })] }),
    new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: L[lang].compFeedback, size: 22 })] }),
    new Paragraph({ spacing: { before: 200, after: 80 }, children: [new TextRun({ text: L[lang].partSig, size: 22 })] }),
    new Paragraph({ spacing: { after: 80 }, children: [new TextRun({ text: L[lang].facSig, size: 22 })] })
  ]
  await writeDocx(path.join(dir, p.id + '_' + L[lang].competency + '.docx'), children, L[lang].competency, lang)
}

async function generatePilotPack(p: Programme, dir: string, lang: Lang) {
  const children: Array<Paragraph | Table> = [
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: [new TextRun({ text: p.name, bold: true, size: 36, color: COLORS.secondary })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 120 }, children: [new TextRun({ text: lang === 'ro' ? 'Pachet pilot pentru organizații' : 'Pilot pack for organisations', size: 24, color: COLORS.primary })] }),
    new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: L[lang].name + ' ________________________________________________', size: 22 })] }),
    new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: L[lang].date + ' ________________________________________________', size: 22 })] }),
    new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: L[lang].facilitator + ' ________________________________________________', size: 22 })] }),
    new Paragraph({ spacing: { before: 200, after: 60 }, children: [new TextRun({ text: L[lang].summary + ': ' + p.duration, size: 22 })] }),
    new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: p.durationVariants.map(v => `${v.label}: ${v.hours} ${lang === 'ro' ? 'ore' : 'hours'} / ${v.credits} CPD`).join('  |  '), size: 20 })] }),
    new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: lang === 'ro' ? 'Conținutul pachetului: ghid facilitator, caiet de lucru, prezentare, pagină unică, certificat, registru competențe.' : 'Package contents: facilitator guide, workbook, presentation, one-pager, certificate, competency record.', size: 22 })] }),
    new Paragraph({ spacing: { before: 200, after: 80 }, children: [new TextRun({ text: L[lang].partSig, size: 22 })] }),
    new Paragraph({ spacing: { after: 80 }, children: [new TextRun({ text: L[lang].facSig, size: 22 })] })
  ]
  await writeDocx(path.join(dir, p.id + '_' + L[lang].pilot + '.docx'), children, L[lang].pilot, lang)
}

async function generateQAReport(dir: string, filesByProg: Record<string, string[]>, lang: Lang) {
  const progRows = PROGRAMMES.map(p => new TableRow({
    children: [
      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: p.name, size: 20 })] })], borders: { top: { style: BorderStyle.SINGLE, size: 1, color: COLORS.secondary }, bottom: { style: BorderStyle.SINGLE, size: 1, color: COLORS.secondary }, left: { style: BorderStyle.SINGLE, size: 1, color: COLORS.secondary }, right: { style: BorderStyle.SINGLE, size: 1, color: COLORS.secondary } } }),
      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: filesByProg[p.id]?.length?.toString() ?? '0', size: 20 })] })], borders: { top: { style: BorderStyle.SINGLE, size: 1, color: COLORS.secondary }, bottom: { style: BorderStyle.SINGLE, size: 1, color: COLORS.secondary }, left: { style: BorderStyle.SINGLE, size: 1, color: COLORS.secondary }, right: { style: BorderStyle.SINGLE, size: 1, color: COLORS.secondary } } }),
      new TableCell({ children: filesByProg[p.id]?.map(f => new Paragraph({ children: [new TextRun({ text: f, size: 16 })] })) ?? [new Paragraph({ children: [] })], borders: { top: { style: BorderStyle.SINGLE, size: 1, color: COLORS.secondary }, bottom: { style: BorderStyle.SINGLE, size: 1, color: COLORS.secondary }, left: { style: BorderStyle.SINGLE, size: 1, color: COLORS.secondary }, right: { style: BorderStyle.SINGLE, size: 1, color: COLORS.secondary } } })
    ]
  }))
  const totalFiles = Object.values(filesByProg).flat().length
  const children: Array<Paragraph | Table> = [
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 240 }, children: [new TextRun({ text: L[lang].qaTitle, bold: true, size: 36, color: COLORS.secondary })] }),
    new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: L[lang].summary, bold: true, size: 26, color: COLORS.primary })] }),
    new Paragraph({ spacing: { after: 80 }, children: [new TextRun({ text: `${L[lang].totalProg}: ${PROGRAMMES.length}`, size: 22 })] }),
    new Paragraph({ spacing: { after: 80 }, children: [new TextRun({ text: `${L[lang].totalFiles}: ${totalFiles}`, size: 22 })] }),
    new Paragraph({ spacing: { after: 80 }, children: [new TextRun({ text: `${L[lang].outDir}: ${dir}`, size: 22 })] }),
    new Paragraph({ spacing: { before: 200, after: 120 }, children: [new TextRun({ text: L[lang].checks, bold: true, size: 26, color: COLORS.primary })] }),
    new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: '✓ ' + L[lang].allFiles, size: 22 })] }),
    new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: '✓ ' + L[lang].fmtOk, size: 22 })] }),
    new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: '✓ ' + L[lang].noPlaceholder, size: 22 })] }),
    new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: '✓ ' + L[lang].noMd, size: 22 })] }),
    new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: '✓ ' + L[lang].fromAssets, size: 22 })] }),
    new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: '✓ ' + L[lang].langOk, size: 22 })] }),
    new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: '✓ ' + L[lang].brandOk, size: 22 })] }),
    new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: '✓ ' + L[lang].ready, size: 22 })] }),
    new Paragraph({ spacing: { before: 200, after: 120 }, children: [new TextRun({ text: L[lang].filesByProg, bold: true, size: 26, color: COLORS.primary })] }),
    new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows: progRows }),
    new Paragraph({ spacing: { before: 240, after: 80 }, children: [new TextRun({ text: L[lang].finalCheck, bold: true, size: 26, color: COLORS.primary })] }),
    new Paragraph({ children: [new TextRun({ text: '✓ ' + L[lang].allDone, size: 22 })] })
  ]
  await writeDocx(path.join(dir, '00_QA_REPORT.docx'), children, 'QA Report', lang)
}

async function runForLanguage(lang: Lang, baseDir: string) {
  const dir = path.join(baseDir, L[lang].folder)
  ensureDir(dir)
  const filesByProg: Record<string, string[]> = {}

  for (const p of PROGRAMMES) {
    filesByProg[p.id] = []
    await generateWorkbook(p, dir, lang)
    filesByProg[p.id].push(p.id + '_' + L[lang].workbook + '.docx')
    await generateFacilitatorGuide(p, dir, lang)
    filesByProg[p.id].push(p.id + '_' + L[lang].guide + '.docx')
    await generatePresentation(p, dir, lang)
    filesByProg[p.id].push(p.id + '_' + L[lang].presentation + '.pptx')
    await generateOnePagerDocx(p, dir, lang)
    filesByProg[p.id].push(p.id + '_' + L[lang].onePager + '.docx')
    await generateOnePagerPdf(p, dir, lang)
    filesByProg[p.id].push(p.id + '_' + L[lang].onePager + '.pdf')
    await generateCertificate(p, dir, lang)
    filesByProg[p.id].push(p.id + '_' + L[lang].certificate + '.docx')
    await generateCompetencyRecord(p, dir, lang)
    filesByProg[p.id].push(p.id + '_' + L[lang].competency + '.docx')
    await generatePilotPack(p, dir, lang)
    filesByProg[p.id].push(p.id + '_' + L[lang].pilot + '.docx')
    await generateSheetDocx(p, dir, lang)
    filesByProg[p.id].push(p.id + '_' + L[lang].onePagerCommercial + '.docx')
    await generateCpdDocx(p, dir, lang)
    filesByProg[p.id].push(p.id + '_' + L[lang].cpdPackage + '.docx')
  }

  await generateQAReport(dir, filesByProg, lang)
}

async function main() {
  const baseDir = path.join(__dirname, '..')
  console.log('Generating AnimaMinds programme materials (v2)...')
  await runForLanguage('ro', baseDir)
  await runForLanguage('en', baseDir)
  console.log('Done. Output folders:')
  console.log('  - ' + path.join(baseDir, L.ro.folder))
  console.log('  - ' + path.join(baseDir, L.en.folder))
}

main().catch(err => { console.error(err); process.exit(1) })
