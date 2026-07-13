const map = { 'Program code:': 'Cod program:', 'Category:': 'Categorie:' };
let out = 'AI Fără Haos — Participant Workbook\n\n**Program code:** PMD_001\n**Category:** AI & FUTURE SKILLS';
for (const [k, v] of Object.entries(map)) {
  const r = new RegExp('(^|\\s|#|\\|)(' + k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'g');
  out = out.replace(r, (m, p1, p2) => p1 + v);
}
console.log(out);
