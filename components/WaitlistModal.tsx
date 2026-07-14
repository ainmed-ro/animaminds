"use client";

import { useState } from "react";
import { X, Bell, CheckCircle } from "lucide-react";

interface WaitlistModalProps {
  programme: string;
  onClose: () => void;
}

export default function WaitlistModal({ programme, onClose }: WaitlistModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, programme }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Eroare la înregistrare.");
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "A apărut o eroare.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-4">
            <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Te-am înregistrat!</h3>
            <p className="text-gray-600">Vei fi primul care află când <strong>{programme}</strong> se lansează.</p>
            <button
              onClick={onClose}
              className="mt-6 px-6 py-3 bg-green-700 text-white rounded-lg font-medium hover:bg-green-800 transition-colors"
            >
              Închide
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-6 h-6 text-green-700" />
              <h3 className="text-xl font-bold text-gray-900">Notifică-mă la lansare</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Lasă emailul tău și te anunțăm imediat când <strong>{programme}</strong> devine disponibil.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Nume (opțional)"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              <input
                type="email"
                placeholder="Email *"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />

              {error && (
                <p className="text-red-600 text-sm">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-green-700 text-white rounded-lg font-medium hover:bg-green-800 disabled:opacity-50 transition-colors"
              >
                {loading ? "Se procesează..." : "Anunță-mă la lansare"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
