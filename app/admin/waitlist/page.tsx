"use client";

import { useEffect, useState } from "react";
import { Bell, Send, Users } from "lucide-react";

type WaitlistEntry = {
  id: string;
  email: string;
  name?: string;
  programme: string;
  created_at: string;
  notified_at?: string;
};

const programeViitoare = [
  "AI Fără Haos",
  "Busola Deciziilor",
  "Calm sub Presiune",
  "Avantajul Uman",
];

export default function WaitlistPage() {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProgramme, setSelectedProgramme] = useState("");
  const [launchUrl, setLaunchUrl] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ sent?: number; failed?: number; message?: string } | null>(null);

  useEffect(() => {
    fetch("/api/waitlist")
      .then(r => r.json())
      .then(d => { setEntries(d.waitlist || []); setLoading(false); });
  }, []);

  const grouped = programeViitoare.map(p => ({
    programme: p,
    total: entries.filter(e => e.programme === p).length,
    unnotified: entries.filter(e => e.programme === p && !e.notified_at).length,
  }));

  const handleSend = async () => {
    if (!selectedProgramme || !launchUrl) return;
    setSending(true);
    setResult(null);
    const res = await fetch("/api/admin/send-waitlist-notification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ programme: selectedProgramme, launchUrl, message }),
    });
    const data = await res.json();
    setResult(data);
    setSending(false);
    if (data.success) {
      const r = await fetch("/api/waitlist").then(r => r.json());
      setEntries(r.waitlist || []);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <Bell className="w-6 h-6 text-green-700" />
        <h2 className="text-2xl font-bold text-gray-900">Waitlist Programe</h2>
      </div>

      {/* Rezumat per program */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {grouped.map(g => (
          <div key={g.programme} className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">{g.programme}</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{g.unnotified}</div>
            <div className="text-xs text-gray-500">nenotificați din {g.total} total</div>
          </div>
        ))}
      </div>

      {/* Trimite notificare */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Send className="w-5 h-5 text-green-700" />
          Trimite notificare de lansare
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Program *</label>
            <select
              value={selectedProgramme}
              onChange={e => setSelectedProgramme(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            >
              <option value="">Selectează programul</option>
              {programeViitoare.map(p => (
                <option key={p} value={p}>{p} ({grouped.find(g => g.programme === p)?.unnotified || 0} nenotificați)</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Link pagină program *</label>
            <input
              type="url"
              placeholder="https://www.animaminds.ro/programe/..."
              value={launchUrl}
              onChange={e => setLaunchUrl(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mesaj suplimentar (opțional)</label>
            <textarea
              rows={3}
              placeholder="Ex: Primele 20 de locuri au preț redus..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
          </div>

          {result && (
            <div className={`p-4 rounded-lg ${result.sent !== undefined ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
              {result.sent !== undefined
                ? `✅ Trimis cu succes la ${result.sent} persoane. ${result.failed ? `(${result.failed} eșuate)` : ''}`
                : result.message || "Eroare la trimitere."}
            </div>
          )}

          <button
            onClick={handleSend}
            disabled={sending || !selectedProgramme || !launchUrl}
            className="px-6 py-3 bg-green-700 text-white rounded-lg font-medium hover:bg-green-800 disabled:opacity-50 transition-colors"
          >
            {sending ? "Se trimite..." : "Trimite notificare"}
          </button>
        </div>
      </div>

      {/* Tabel complet */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">Toate înregistrările ({entries.length})</h3>
        </div>
        {loading ? (
          <div className="p-8 text-center text-gray-500">Se încarcă...</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nume</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Program</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {entries.map(e => (
                <tr key={e.id}>
                  <td className="px-6 py-4 text-sm text-gray-600">{new Date(e.created_at).toLocaleDateString('ro-RO')}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{e.name || '—'}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{e.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{e.programme}</td>
                  <td className="px-6 py-4 text-sm">
                    {e.notified_at
                      ? <span className="text-green-600">✅ Notificat {new Date(e.notified_at).toLocaleDateString('ro-RO')}</span>
                      : <span className="text-orange-500">⏳ Așteaptă</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
