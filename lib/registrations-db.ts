import fs from "fs";
import path from "path";

export type RegistrationStatus = "Nou" | "Confirmat" | "Achitat" | "Anulat";

export type Registration = {
  id: string;
  experience: string;
  editie: string;
  nume: string;
  email: string;
  telefon: string;
  participanti: number;
  observatii: string;
  status: RegistrationStatus;
  createdAt: string;
};

const DB_PATH = path.join(process.cwd(), "data", "registrations.json");

function ensureDb() {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DB_PATH)) fs.writeFileSync(DB_PATH, JSON.stringify([], null, 2), "utf-8");
}

export function readAll(): Registration[] {
  ensureDb();
  const raw = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(raw) as Registration[];
}

export function writeAll(data: Registration[]) {
  ensureDb();
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export function insert(reg: Omit<Registration, "id" | "createdAt" | "status">): Registration {
  const all = readAll();
  const newReg: Registration = {
    ...reg,
    id: `reg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    status: "Nou",
    createdAt: new Date().toISOString(),
  };
  all.unshift(newReg);
  writeAll(all);
  return newReg;
}

export function updateStatus(id: string, status: RegistrationStatus): Registration | null {
  const all = readAll();
  const idx = all.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  all[idx].status = status;
  writeAll(all);
  return all[idx];
}

export function getSpotsByEdition(): Record<string, number> {
  const all = readAll().filter((r) => r.status !== "Anulat");
  const counts: Record<string, number> = {};
  for (const r of all) {
    const key = r.editie;
    counts[key] = (counts[key] ?? 0) + r.participanti;
  }
  return counts;
}
