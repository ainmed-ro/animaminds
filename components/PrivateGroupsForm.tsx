"use client";

import { useState } from "react";
import { Users, Calendar, CheckCircle, AlertCircle } from "lucide-react";

const availablePrograms = [
  "Conversații care Contează",
  "AI Fără Haos", 
  "Calm sub Presiune",
  "Busola Deciziilor",
  "Avantajul Uman",
  "Alt program (specifică în mesaj)"
];

export default function PrivateGroupsForm() {
  const [formData, setFormData] = useState({
    requesterName: "",
    email: "",
    phone: "",
    programmeRequested: "Conversații care Contează",
    estimatedGroupSize: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/private-groups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Eroare la trimiterea formularului");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "A apărut o eroare. Vă rugăm încercați din nou.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto p-8 bg-green-50 rounded-lg border border-green-200">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-green-800 mb-4">
            ✅ Cerere Trimisă
          </h3>
          <p className="text-green-700 mb-6">
            Mulțumim, {formData.requesterName}! Cererea ta pentru grup privat a fost înregistrată cu succes.
          </p>
          
          <div className="bg-white rounded-lg p-6 mb-6 text-left">
            <h4 className="font-semibold text-gray-800 mb-3">Detalii cerere:</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><strong>Program solicitat:</strong> {formData.programmeRequested}</li>
              <li><strong>Dimensiune grup:</strong> {formData.estimatedGroupSize} persoane</li>
              <li><strong>Email:</strong> {formData.email}</li>
              <li><strong>Telefon:</strong> {formData.phone}</li>
            </ul>
          </div>

          <p className="text-green-700">
            Vei primi în curând un email cu oferta personalizată și detaliile de organizare.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Solicitare Grup Privat
          </h3>
          <div className="bg-purple-50 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-purple-900 mb-2">Format Personalizat</h4>
            <p className="text-sm text-purple-800">
              Organizăm programe dedicate pentru grupuri profesionale, comunități sau echipe. 
              Oferta este personalizată în funcție de nevoile specifice ale grupului tău.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="requesterName" className="block text-sm font-medium text-gray-700 mb-2">
                Numele tău *
              </label>
              <input
                type="text"
                id="requesterName"
                name="requesterName"
                required
                value={formData.requesterName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Numele complet"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="email@exemplu.ro"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Telefon *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="07xx xxx xxx"
              />
            </div>

            <div>
              <label htmlFor="estimatedGroupSize" className="block text-sm font-medium text-gray-700 mb-2">
                Dimensiune grup (persoane) *
              </label>
              <input
                type="number"
                id="estimatedGroupSize"
                name="estimatedGroupSize"
                required
                min="3"
                value={formData.estimatedGroupSize}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="ex: 8"
              />
            </div>
          </div>

          <div>
            <label htmlFor="programmeRequested" className="block text-sm font-medium text-gray-700 mb-2">
              Program solicitat *
            </label>
            <select
              id="programmeRequested"
              name="programmeRequested"
              required
              value={formData.programmeRequested}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {availablePrograms.map(program => (
                <option key={program} value={program}>
                  {program}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              Mesaj sau detalii suplimentare
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Descrie-ne nevoile grupului tău, obiectivele, orice preferințe de calendar sau alte detalii relevante..."
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Se procesează..." : "Trimite cererea"}
          </button>

          <p className="text-xs text-gray-500 text-center">
            Vei primi în curând un email cu oferta personalizată pentru grupul tău.
          </p>
        </form>
      </div>
    </div>
  );
}
