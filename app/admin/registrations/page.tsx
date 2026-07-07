"use client";

import { useEffect, useState, useCallback } from "react";
import type { Registration, RegistrationStatus } from "@/lib/registrations-db";

const STATUS_COLORS: Record<RegistrationStatus, { bg: string; color: string }> = {
  Nou: { bg: "#EBF5FF", color: "#2563EB" },
  Confirmat: { bg: "#ECFDF5", color: "#059669" },
  Achitat: { bg: "#F0FDF4", color: "#16A34A" },
  Anulat: { bg: "#FEF2F2", color: "#DC2626" },
};

const STATUSES: RegistrationStatus[] = ["Nou", "Confirmat", "Achitat", "Anulat"];

const ADMIN_PASS = process.env.NEXT_PUBLIC_ADMIN_PASS ?? "animaminds2026";

export default function AdminRegistrationsPage() {
  const [authed, setAuthed] = useState(false);
  const [passInput, setPassInput] = useState("");
  const [passError, setPassError] = useState(false);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [filter, setFilter] = useState<RegistrationStatus | "Toate">("Toate");
  const [editionFilter, setEditionFilter] = useState("Toate");
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/registrations");
    const data = await res.json();
    setRegistrations(data.registrations ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (authed) load();
  }, [authed, load]);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (passInput === ADMIN_PASS) {
      setAuthed(true);
    } else {
      setPassError(true);
      setTimeout(() => setPassError(false), 2000);
    }
  }

  async function handleStatusChange(id: string, status: RegistrationStatus) {
    setUpdatingId(id);
    await fetch(`/api/registrations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    await load();
    setUpdatingId(null);
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F5F0E8" }}>
        <div className="bg-white rounded-2xl p-10 w-full max-w-sm shadow-lg text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-2" style={{ color: "#9B7EBD" }}>AnimaMinds</p>
          <h1 className="text-2xl font-semibold mb-8" style={{ fontFamily: "Playfair Display, serif", color: "#3D3530" }}>
            Dashboard Admin
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={passInput}
              onChange={(e) => setPassInput(e.target.value)}
              placeholder="Parolă de acces"
              className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
              style={{ borderColor: passError ? "#DC2626" : "rgba(0,0,0,0.15)" }}
            />
            {passError && <p className="text-xs text-red-600">Parolă incorectă.</p>}
            <button type="submit" className="w-full py-3 rounded-xl font-semibold text-white text-sm" style={{ backgroundColor: "#9B7EBD" }}>
              Intră
            </button>
          </form>
        </div>
      </div>
    );
  }

  const editions = ["Toate", ...Array.from(new Set(registrations.map((r) => r.editie)))];

  const filtered = registrations.filter((r) => {
    const statusOk = filter === "Toate" || r.status === filter;
    const editionOk = editionFilter === "Toate" || r.editie === editionFilter;
    return statusOk && editionOk;
  });

  const stats = STATUSES.reduce<Record<string, number>>((acc, s) => {
    acc[s] = registrations.filter((r) => r.status === s).length;
    return acc;
  }, {});

  const totalParticipants = registrations
    .filter((r) => r.status !== "Anulat")
    .reduce((sum, r) => sum + r.participanti, 0);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F0E8" }}>
      {/* Header */}
      <div style={{ backgroundColor: "#1C2B1E" }} className="px-6 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-1" style={{ color: "#7C9A7E" }}>AnimaMinds Admin</p>
            <h1 className="text-xl font-semibold text-white" style={{ fontFamily: "Playfair Display, serif" }}>Înscrieri BUSOLA INTERIOARĂ</h1>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={load} className="text-xs px-4 py-2 rounded-lg text-white border border-white/20 hover:bg-white/10 transition-colors">
              {loading ? "Se încarcă..." : "↺ Actualizează"}
            </button>
            <button onClick={() => setAuthed(false)} className="text-xs px-4 py-2 rounded-lg" style={{ color: "rgba(255,255,255,0.5)" }}>
              Ieși
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 text-center shadow-sm">
            <p className="text-3xl font-bold" style={{ color: "#3D3530" }}>{registrations.length}</p>
            <p className="text-xs mt-1" style={{ color: "#9B8E88" }}>Total înscrieri</p>
          </div>
          <div className="bg-white rounded-xl p-5 text-center shadow-sm">
            <p className="text-3xl font-bold" style={{ color: "#3D3530" }}>{totalParticipants}</p>
            <p className="text-xs mt-1" style={{ color: "#9B8E88" }}>Participanți totali</p>
          </div>
          {STATUSES.map((s) => (
            <div key={s} className="bg-white rounded-xl p-5 text-center shadow-sm">
              <p className="text-3xl font-bold" style={{ color: STATUS_COLORS[s].color }}>{stats[s] ?? 0}</p>
              <p className="text-xs mt-1" style={{ color: "#9B8E88" }}>{s}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 mb-6 flex flex-wrap gap-3 items-center shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold" style={{ color: "#9B8E88" }}>Status:</span>
            {(["Toate", ...STATUSES] as (RegistrationStatus | "Toate")[]).map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                style={{
                  backgroundColor: filter === s ? "#9B7EBD" : "rgba(0,0,0,0.05)",
                  color: filter === s ? "#fff" : "#3D3530",
                }}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 ml-4">
            <span className="text-xs font-semibold" style={{ color: "#9B8E88" }}>Ediție:</span>
            {editions.map((e) => (
              <button
                key={e}
                onClick={() => setEditionFilter(e)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                style={{
                  backgroundColor: editionFilter === e ? "#7C9A7E" : "rgba(0,0,0,0.05)",
                  color: editionFilter === e ? "#fff" : "#3D3530",
                }}
              >
                {e}
              </button>
            ))}
          </div>
          <span className="ml-auto text-xs" style={{ color: "#9B8E88" }}>{filtered.length} rezultate</span>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: "#F5F0E8" }}>
                  {["Data", "Nume", "Email", "Telefon", "Ediție", "Part.", "Observații", "Status"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest" style={{ color: "#9B8E88" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr><td colSpan={8} className="px-4 py-12 text-center text-sm" style={{ color: "#9B8E88" }}>Nicio înscriere găsită.</td></tr>
                )}
                {filtered.map((reg) => (
                  <tr key={reg.id} className="border-t hover:bg-gray-50 transition-colors" style={{ borderColor: "rgba(0,0,0,0.05)" }}>
                    <td className="px-4 py-3 text-xs whitespace-nowrap" style={{ color: "#9B8E88" }}>
                      {new Date(reg.createdAt).toLocaleDateString("ro-RO", { day: "2-digit", month: "2-digit", year: "numeric" })}
                      <br />
                      <span>{new Date(reg.createdAt).toLocaleTimeString("ro-RO", { hour: "2-digit", minute: "2-digit" })}</span>
                    </td>
                    <td className="px-4 py-3 font-medium" style={{ color: "#3D3530" }}>{reg.nume}</td>
                    <td className="px-4 py-3 text-xs" style={{ color: "#6B5E58" }}>
                      <a href={`mailto:${reg.email}`} className="hover:underline">{reg.email}</a>
                    </td>
                    <td className="px-4 py-3 text-xs whitespace-nowrap" style={{ color: "#6B5E58" }}>
                      <a href={`tel:${reg.telefon}`} className="hover:underline">{reg.telefon}</a>
                    </td>
                    <td className="px-4 py-3 text-xs whitespace-nowrap" style={{ color: "#6B5E58" }}>{reg.editie}</td>
                    <td className="px-4 py-3 text-center font-semibold" style={{ color: "#3D3530" }}>{reg.participanti}</td>
                    <td className="px-4 py-3 text-xs max-w-[180px]" style={{ color: "#9B8E88" }}>
                      <span className="line-clamp-2">{reg.observatii || "—"}</span>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={reg.status}
                        disabled={updatingId === reg.id}
                        onChange={(e) => handleStatusChange(reg.id, e.target.value as RegistrationStatus)}
                        className="text-xs font-semibold px-2 py-1.5 rounded-lg border-0 outline-none cursor-pointer"
                        style={{
                          backgroundColor: STATUS_COLORS[reg.status].bg,
                          color: STATUS_COLORS[reg.status].color,
                        }}
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-6 text-xs text-center" style={{ color: "#C4B5B0" }}>
          AnimaMinds Admin · Înscrieri salvate local · {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
