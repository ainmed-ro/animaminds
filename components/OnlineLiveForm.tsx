"use client";

import { useState } from "react";
import { Calendar, Clock, Award, Users, CheckCircle, AlertCircle } from "lucide-react";

export default function OnlineLiveForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    institution: "",
    role: "",
    gdprConsent: false,
    calendarConfirmation: false,
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    console.log("Online Live submit started");
    console.log("Payload:", formData);

    try {
      const response = await fetch("/api/online-live", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("API response:", response.status, data);

      if (!response.ok) {
        const errMsg = data.details ? `${data.error} (${data.details})` : data.error || "Eroare la trimiterea formularului";
        throw new Error(errMsg);
      }

      setSubmitted(true);
    } catch (err) {
      console.error("Online Live form error:", err);
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
            ✅ Înscriere Confirmată
          </h3>
          <p className="text-green-700 mb-6">
            Mulțumim, {formData.name}! Înscrierea ta la programul <strong>Conversații care Contează - Online Live</strong> a fost înregistrată cu succes.
          </p>
          
          <div className="bg-white rounded-lg p-6 mb-6 text-left">
            <h4 className="font-semibold text-gray-800 mb-3">Detalii program:</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span><strong>Date:</strong> 8, 15, 22 Septembrie 2026</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span><strong>Program:</strong> 17:30–19:30 (8 și 22 Sept), 17:30–20:00 (15 Sept)</span>
              </li>
              <li className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span><strong>Format:</strong> Online Live (Google Meet)</span>
              </li>
              <li className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span><strong>Certificare:</strong> 8 CPD</span>
              </li>
            </ul>
          </div>

          <p className="text-green-700">
            Vei primi în curând pe email detaliile de plată (199 lei) și instrucțiunile de acces.
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
            Înscriere - Conversații care Contează
          </h3>
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-blue-900 mb-2">Online Live</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>8, 15, 22 Septembrie 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>17:30–19:30 / 17:30–20:00</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>8 CPD</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>199 lei / participant</span>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Nume și prenume *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Numele tău complet"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="07xx xxx xxx"
              />
            </div>

            <div>
              <label htmlFor="institution" className="block text-sm font-medium text-gray-700 mb-2">
                Instituție / organizație <span className="text-gray-400 font-normal">(opțional)</span>
              </label>
              <input
                type="text"
                id="institution"
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Numele instituției"
              />
            </div>
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
              Funcție / poziție <span className="text-gray-400 font-normal">(opțional)</span>
            </label>
            <input
              type="text"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Poziția ta în organizație"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-start">
              <input
                type="checkbox"
                id="calendarConfirmation"
                name="calendarConfirmation"
                required
                checked={formData.calendarConfirmation}
                onChange={handleChange}
                className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="calendarConfirmation" className="ml-3 text-sm text-gray-700">
                Confirm că am verificat calendarul și pot participa la toate cele 3 întâlniri online:
                <br />
                <span className="font-medium">
                  8 Septembrie 2026 (17:30–19:30) | 15 Septembrie 2026 (17:30–20:00) | 22 Septembrie 2026 (17:30–19:30)
                </span>
              </label>
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                id="gdprConsent"
                name="gdprConsent"
                required
                checked={formData.gdprConsent}
                onChange={handleChange}
                className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="gdprConsent" className="ml-3 text-sm text-gray-700">
                Sunt de acord cu prelucrarea datelor personale conform GDPR și cu trimiterea de informații despre program pe email.
              </label>
            </div>
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
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Se procesează..." : "Mă înscriu - 199 lei"}
          </button>

          <p className="text-xs text-gray-500 text-center">
            După confirmarea înscrierii, vei primi pe email detaliile de plată și instrucțiunile de acces.
          </p>
        </form>
      </div>
    </div>
  );
}
