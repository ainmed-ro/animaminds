"use client";

import { useState } from "react";
import { Building2, Users, Calendar, DollarSign, MessageSquare, Send, CheckCircle } from "lucide-react";

const organizationTypes = [
  "Companie privată",
  "Societate cu răspundere limitată (SRL)",
  "Persoană fizică autorizată (PFA)",
  "Instituție publică",
  "Unitate sanitară / Cabinet medical",
  "Instituție educațională",
  "Organizație neguvernamentală (ONG)",
  "Altul"
];

const deliveryFormats = [
  "Online Live",
  "Online dedicat organizației — 3.500 lei / grup",
  "La sediul beneficiarului — 5.000 lei / grup",
  "Experience Edition (rezidențial)",
  "Nespecificat / Vreau să discut"
];

const budgetRanges = [
  "Sub 5.000 RON",
  "5.000 - 10.000 RON",
  "10.000 - 20.000 RON",
  "20.000 - 50.000 RON",
  "Peste 50.000 RON",
  "Nespecificat / Vreau să discut"
];

const programmes = [
  "Conversații care Contează - Comunicare și colaborare (DISPONIBIL)",
  "AI Fără Haos - Inteligență Artificială pentru profesioniști (ÎN PREGĂTIRE)",
  "Busola Deciziilor - Leadership și luarea deciziilor (ÎN PREGĂTIRE)",
  "Calm sub Presiune - Managementul conflictelor și reziliență (ÎN PREGĂTIRE)",
  "Avantajul Uman - Competențe umane pentru viitor (ÎN PREGĂTIRE)",
  "Nespecificat / Vreau să discut despre opțiuni"
];

export default function OrganizationRequestForm() {
  const [form, setForm] = useState({
    organizationName: "",
    organizationType: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    contactPosition: "",
    programmeInterest: "",
    deliveryFormatPreference: "",
    participantCountEstimate: "",
    preferredTimeline: "",
    budgetRange: "",
    specificRequirements: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/organization-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Eroare la server.");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "A apărut o eroare.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="text-center py-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Cererea a fost trimisă cu succes!
          </h3>
          <p className="text-gray-600 mb-4">
            Vă mulțumim pentru interesul acordat. Vom analiza cererea dumneavoastră și vă vom contacta în curând.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setForm({
                organizationName: "",
                organizationType: "",
                contactName: "",
                contactEmail: "",
                contactPhone: "",
                contactPosition: "",
                programmeInterest: "",
                deliveryFormatPreference: "",
                participantCountEstimate: "",
                preferredTimeline: "",
                budgetRange: "",
                specificRequirements: "",
              });
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Trimite o nouă cerere
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Cerere personalizată pentru organizații
        </h2>
        <p className="text-gray-600">
          Completează formularul de mai jos și vom reveni cu o ofertă personalizată pentru nevoile organizației tale.
        </p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Organizație */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Detalii organizație
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nume organizație *
            </label>
            <input
              type="text"
              name="organizationName"
              value={form.organizationName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tip organizație *
            </label>
            <select
              name="organizationType"
              value={form.organizationType}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Selectează tipul organizației</option>
              {organizationTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Contact */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Persoană de contact
          </h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nume complet *
            </label>
            <input
              type="text"
              name="contactName"
              value={form.contactName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              name="contactEmail"
              value={form.contactEmail}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Telefon
            </label>
            <input
              type="tel"
              name="contactPhone"
              value={form.contactPhone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Poziție / Rol
            </label>
            <input
              type="text"
              name="contactPosition"
              value={form.contactPosition}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Program și livrare */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Program și livrare
          </h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Program de interes
            </label>
            <select
              name="programmeInterest"
              value={form.programmeInterest}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Selectează programul</option>
              {programmes.map((programme) => (
                <option key={programme} value={programme}>
                  {programme}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Format de livrare preferat
            </label>
            <select
              name="deliveryFormatPreference"
              value={form.deliveryFormatPreference}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Selectează formatul</option>
              {deliveryFormats.map((format) => (
                <option key={format} value={format}>
                  {format}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Număr estimat de participanți
            </label>
            <input
              type="number"
              name="participantCountEstimate"
              value={form.participantCountEstimate}
              onChange={handleChange}
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Timeline preferat
            </label>
            <input
              type="text"
              name="preferredTimeline"
              value={form.preferredTimeline}
              onChange={handleChange}
              placeholder="ex: Următoarele 3 luni, Trimestrul 2 2024, etc."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Buget */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Buget
          </h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Interval bugetar
            </label>
            <select
              name="budgetRange"
              value={form.budgetRange}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Selectează intervalul bugetar</option>
              {budgetRanges.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Cerințe specifice */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Cerințe specifice
          </h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Obiective specifice sau cerințe particulare
            </label>
            <textarea
              name="specificRequirements"
              value={form.specificRequirements}
              onChange={handleChange}
              rows={4}
              placeholder="Descrieți obiectivele, provocările sau cerințele specifice ale organizației..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
            "Se trimite..."
          ) : (
            <>
              <Send className="w-5 h-5" />
              Trimite cererea
            </>
          )}
        </button>
      </form>
    </div>
  );
}
