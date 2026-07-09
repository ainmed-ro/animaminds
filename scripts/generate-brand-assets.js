const fs = require("fs");
const path = require("path");

const OUT_DIR = path.join(__dirname, "..", "public", "brand");

const COLORS = {
  green: { bg: "#1C2B1E", accent: "#C9A87C", text: "#C9A87C", divider: "#C9A87C" },
  white: { bg: "transparent", accent: "#FFFFFF", text: "#FFFFFF", divider: "#FFFFFF" },
  black: { bg: "transparent", accent: "#000000", text: "#000000", divider: "#000000" },
};

const SERIF = "'Times New Roman', Georgia, serif";
const SANS = "'Arial', Helvetica, sans-serif";

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function quadraticPoint(t, p0, p1, p2) {
  const x = (1 - t) ** 2 * p0.x + 2 * (1 - t) * t * p1.x + t ** 2 * p2.x;
  const y = (1 - t) ** 2 * p0.y + 2 * (1 - t) * t * p1.y + t ** 2 * p2.y;
  return { x, y };
}

function branchAngle(t, p0, p1, p2) {
  const dt = 0.008;
  const a = quadraticPoint(Math.max(0, t - dt), p0, p1, p2);
  const b = quadraticPoint(Math.min(1, t + dt), p0, p1, p2);
  return (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
}

function curvedText(text, cx, cy, r, midAngleDeg, fontSize, color, direction = 1, flip = false) {
  const chars = text.split("");
  const charWidth = fontSize * 0.62;
  const totalAngular = (chars.length * charWidth) / r;
  const midAngle = (midAngleDeg * Math.PI) / 180;
  const startAngle = midAngle - direction * (totalAngular / 2);

  return chars
    .map((char, i) => {
      const t = (i + 0.5) / chars.length;
      const angle = startAngle + direction * t * totalAngular;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      const rotation = (angle * 180) / Math.PI + 90 + (flip ? 180 : 0);
      return `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" font-family="${SANS}" font-size="${fontSize}" font-weight="600" fill="${color}" text-anchor="middle" transform="rotate(${rotation.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)})" style="text-transform:uppercase; letter-spacing:${fontSize * 0.04}px">${char}</text>`;
    })
    .join("\n  ");
}

function laurelBranch(p0, p1, p2, count, color, size) {
  const leaves = [];
  for (let i = 0; i < count; i++) {
    const t = 0.08 + (i / (count - 1)) * 0.84;
    const pos = quadraticPoint(t, p0, p1, p2);
    const angle = branchAngle(t, p0, p1, p2) + 90;
    leaves.push(
      `<ellipse cx="${pos.x.toFixed(1)}" cy="${pos.y.toFixed(1)}" rx="${(size * 0.022).toFixed(1)}" ry="${(size * 0.07).toFixed(1)}" fill="${color}" transform="rotate(${angle.toFixed(1)} ${pos.x.toFixed(1)} ${pos.y.toFixed(1)})"/>`
    );
  }
  return leaves.join("\n  ");
}

function bookIcon(x, y, size, color) {
  const s = size;
  const cx = s / 2;
  return `
  <g transform="translate(${x}, ${y})">
    <path d="M${s * 0.15} ${s * 0.30} Q${cx} ${s * 0.18} ${s * 0.85} ${s * 0.30} V${s * 0.78} Q${cx} ${s * 0.66} ${s * 0.15} ${s * 0.78} Z" fill="none" stroke="${color}" stroke-width="${s * 0.055}"/>
    <path d="M${cx} ${s * 0.22} V${s * 0.72}" stroke="${color}" stroke-width="${s * 0.045}"/>
    <path d="M${s * 0.24} ${s * 0.40} Q${s * 0.36} ${s * 0.46} ${cx - s * 0.05} ${s * 0.42}" fill="none" stroke="${color}" stroke-width="${s * 0.035}" stroke-linecap="round"/>
    <path d="M${s * 0.76} ${s * 0.40} Q${s * 0.64} ${s * 0.46} ${cx + s * 0.05} ${s * 0.42}" fill="none" stroke="${color}" stroke-width="${s * 0.035}" stroke-linecap="round"/>
    <path d="M${s * 0.44} ${s * 0.26} Q${cx} ${s * 0.16} ${s * 0.56} ${s * 0.26}" fill="none" stroke="${color}" stroke-width="${s * 0.04}" stroke-linecap="round"/>
  </g>`;
}

function sealSVG(scheme, size = 512) {
  const c = COLORS[scheme];
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.48;
  const textR = size * 0.40;

  const circleFill = c.bg === "transparent" ? "none" : c.bg;

  const leftBranch = {
    p0: { x: cx, y: cy + size * 0.25 },
    p1: { x: cx - size * 0.27, y: cy + size * 0.08 },
    p2: { x: cx - size * 0.12, y: cy - size * 0.25 },
  };
  const rightBranch = {
    p0: { x: cx, y: cy + size * 0.25 },
    p1: { x: cx + size * 0.27, y: cy + size * 0.08 },
    p2: { x: cx + size * 0.12, y: cy - size * 0.25 },
  };

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <defs>
    <style>
      .display { font-family: ${SERIF}; }
    </style>
  </defs>
  ${circleFill !== "none" ? `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${circleFill}"/>` : ""}
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${c.accent}" stroke-width="${size * 0.016}" stroke-opacity="${c.bg === "transparent" ? 1 : 0.92}"/>
  <circle cx="${cx}" cy="${cy}" r="${size * 0.435}" fill="none" stroke="${c.accent}" stroke-width="${size * 0.005}" stroke-opacity="0.55"/>

  ${curvedText("WHERE PEOPLE AND IDEAS GROW TOGETHER", cx, cy, textR, 270, size * 0.032, c.text, 1, false)}
  ${curvedText("CPD APPROVED PROVIDER #790577", cx, cy, textR, 90, size * 0.024, c.text, -1, true)}

  ${bookIcon(cx - size * 0.075, cy - size * 0.30, size * 0.15, c.accent)}

  ${laurelBranch(leftBranch.p0, leftBranch.p1, leftBranch.p2, 13, c.accent, size)}
  ${laurelBranch(rightBranch.p0, rightBranch.p1, rightBranch.p2, 13, c.accent, size)}

  <text x="${cx}" y="${cy + size * 0.06}" class="display" font-size="${size * 0.19}" font-weight="600" fill="${c.text}" text-anchor="middle" letter-spacing="-0.02em">AM</text>
  <line x1="${cx - size * 0.085}" y1="${cy + size * 0.12}" x2="${cx + size * 0.085}" y2="${cy + size * 0.10}" stroke="${c.accent}" stroke-width="${size * 0.005}" stroke-linecap="round"/>

  <text x="${cx}" y="${cy + size * 0.31}" class="display" font-size="${size * 0.078}" font-weight="500" fill="${c.text}" text-anchor="middle">AnimaMinds</text>
</svg>`;
}

function horizontalSVG(scheme, width = 720, height = 240) {
  const c = COLORS[scheme];
  const sealSize = 170;
  const sealX = 18;
  const sealY = (height - sealSize) / 2;
  const dividerX = sealX + sealSize + 22;
  const textX = dividerX + 28;
  const centerY = height / 2;

  const circleFill = c.bg === "transparent" ? "none" : c.bg;

  const leftBranch = {
    p0: { x: sealSize / 2, y: sealSize * 0.75 },
    p1: { x: sealSize * 0.22, y: sealSize * 0.55 },
    p2: { x: sealSize * 0.37, y: sealSize * 0.25 },
  };
  const rightBranch = {
    p0: { x: sealSize / 2, y: sealSize * 0.75 },
    p1: { x: sealSize * 0.78, y: sealSize * 0.55 },
    p2: { x: sealSize * 0.63, y: sealSize * 0.25 },
  };

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    <style>
      .display { font-family: ${SERIF}; }
    </style>
  </defs>
  <g transform="translate(${sealX}, ${sealY})">
    ${circleFill !== "none" ? `<circle cx="${sealSize / 2}" cy="${sealSize / 2}" r="${sealSize * 0.48}" fill="${circleFill}"/>` : ""}
    <circle cx="${sealSize / 2}" cy="${sealSize / 2}" r="${sealSize * 0.48}" fill="none" stroke="${c.accent}" stroke-width="${sealSize * 0.016}"/>
    ${bookIcon(sealSize / 2 - sealSize * 0.075, sealSize * 0.16, sealSize * 0.15, c.accent)}
    ${laurelBranch(leftBranch.p0, leftBranch.p1, leftBranch.p2, 11, c.accent, sealSize)}
    ${laurelBranch(rightBranch.p0, rightBranch.p1, rightBranch.p2, 11, c.accent, sealSize)}
    <text x="${sealSize / 2}" y="${sealSize / 2 + sealSize * 0.06}" class="display" font-size="${sealSize * 0.32}" font-weight="600" fill="${c.text}" text-anchor="middle" letter-spacing="-0.02em">AM</text>
    <line x1="${sealSize / 2 - sealSize * 0.085}" y1="${sealSize / 2 + sealSize * 0.12}" x2="${sealSize / 2 + sealSize * 0.085}" y2="${sealSize / 2 + sealSize * 0.10}" stroke="${c.accent}" stroke-width="${sealSize * 0.005}" stroke-linecap="round"/>
  </g>
  <line x1="${dividerX}" y1="${centerY - 54}" x2="${dividerX}" y2="${centerY + 54}" stroke="${c.divider}" stroke-width="2" stroke-opacity="0.4"/>
  <text x="${textX}" y="${centerY - 4}" class="display" font-size="54" font-weight="500" fill="${c.text === COLORS.green.text ? COLORS.green.bg : c.text}" text-anchor="start">AnimaMinds</text>
  <text x="${textX}" y="${centerY + 28}" font-family="${SANS}" font-size="12" font-weight="600" fill="${c.text}" letter-spacing="0.12em" text-anchor="start" style="text-transform:uppercase">WHERE PEOPLE AND IDEAS GROW TOGETHER</text>
  <text x="${textX}" y="${centerY + 54}" font-family="${SANS}" font-size="10" font-weight="600" fill="${c.text}" letter-spacing="0.08em" text-anchor="start" style="text-transform:uppercase">CPD APPROVED PROVIDER #790577</text>
</svg>`;
}

async function main() {
  ensureDir(OUT_DIR);

  fs.writeFileSync(path.join(OUT_DIR, "seal-green.svg"), sealSVG("green"));
  fs.writeFileSync(path.join(OUT_DIR, "seal-white.svg"), sealSVG("white"));
  fs.writeFileSync(path.join(OUT_DIR, "seal-black.svg"), sealSVG("black"));
  fs.writeFileSync(path.join(OUT_DIR, "logo-horizontal.svg"), horizontalSVG("green"));
  fs.writeFileSync(path.join(OUT_DIR, "logo-horizontal-white.svg"), horizontalSVG("white"));
  fs.writeFileSync(path.join(OUT_DIR, "logo-horizontal-black.svg"), horizontalSVG("black"));

  const sharp = require("sharp");
  const toIco = require("png-to-ico").default;

  const renderPng = async (svgFile, pngFile, width, height) => {
    const svgBuffer = fs.readFileSync(svgFile);
    await sharp(svgBuffer, { density: 300 }).resize(width, height, { fit: "contain" }).png().toFile(pngFile);
  };

  await renderPng(path.join(OUT_DIR, "seal-green.svg"), path.join(OUT_DIR, "seal-green-512.png"), 512, 512);
  await renderPng(path.join(OUT_DIR, "seal-white.svg"), path.join(OUT_DIR, "seal-white-512.png"), 512, 512);
  await renderPng(path.join(OUT_DIR, "seal-black.svg"), path.join(OUT_DIR, "seal-black-512.png"), 512, 512);
  await renderPng(path.join(OUT_DIR, "logo-horizontal.svg"), path.join(OUT_DIR, "logo-horizontal-720.png"), 720, 240);
  await renderPng(path.join(OUT_DIR, "logo-horizontal-white.svg"), path.join(OUT_DIR, "logo-horizontal-white-720.png"), 720, 240);
  await renderPng(path.join(OUT_DIR, "logo-horizontal-black.svg"), path.join(OUT_DIR, "logo-horizontal-black-720.png"), 720, 240);

  await renderPng(path.join(OUT_DIR, "seal-green.svg"), path.join(OUT_DIR, "social-profile-512.png"), 512, 512);

  const faviconPng = path.join(OUT_DIR, "favicon-512.png");
  await renderPng(path.join(OUT_DIR, "seal-green.svg"), faviconPng, 512, 512);
  const icoBuffer = await toIco([faviconPng]);
  fs.writeFileSync(path.join(OUT_DIR, "favicon.ico"), icoBuffer);

  console.log("Brand assets generated in", OUT_DIR);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
