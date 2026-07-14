"use client";

import { useState, useEffect } from "react";
import { Calendar, CheckCircle, AlertCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";

// Experience Edition Form Component
export default function ExperienceEditionForm() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    programme: "conversatii-care-conteaza",
    accommodation: "",
    preferredPeriod: searchParams?.get('edition') || "octombrie-2026",
    message: "",
    terms: false,
  });

  useEffect(() => {
    const edition = searchParams?.get('edition');
    if (edition) {
      setFormData(prev => ({
        ...prev,
        preferredPeriod: edition
      }));
    }
  }, [searchParams]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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

    try {
      const response = await fetch("/api/experience-edition", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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
      <div className="text-center py-8">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
          Rezervarea a fost înregistrată cu succes!
        </h3>
        <p className="text-gray-600 mb-4">
          Locul tău este rezervat provizoriu.
        </p>
        <p className="text-gray-600 mb-6">
          Participanții vor fi contactați după confirmarea formării grupei minime pentru informațiile privind participarea și modalitatea de plată.
        </p>
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <p className="text-sm text-blue-800">
            Plata se realizează doar după confirmarea formării grupei minime de 20 participanți.
          </p>
        </div>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({
              name: "",
              email: "",
              phone: "",
              company: "",
              programme: "conversatii-care-conteaza",
              accommodation: "",
              preferredPeriod: "octombrie-2026",
              message: "",
              terms: false,
            });
          }}
          className="inline-flex items-center gap-2 px-6 py-3 bg-sage-600 text-white rounded-lg font-medium hover:bg-sage-700 transition-colors"
        >
          Rezervă un alt loc
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </div>
        </div>
      )}
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nume complet *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
            placeholder="Nume și prenume"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
            placeholder="email@exemplu.ro"
          />
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Telefon *
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
            placeholder="07xx xxx xxx"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Companie / Organizație
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
            placeholder="Opțional"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Program de interes *
        </label>
        <select
          name="programme"
          value={formData.programme}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
        >
          <option value="">Selectează un program</option>
          <option value="conversatii-care-conteaza">Conversații care Contează</option>
        </select>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferință cazare
          </label>
          <select 
            name="accommodation"
            value={formData.accommodation}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
          >
            <option value="">Selectează opțiunea</option>
            <option value="camera-dubla">Cameră dublă (1.200 lei)</option>
            <option value="camera-single">Cameră single (1.400 lei)</option>
            <option value="nesigur">Nu sunt sigur(ă) încă</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Perioada preferată
          </label>
          <select 
            name="preferredPeriod"
            value={formData.preferredPeriod}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
          >
            <option value="">Selectează perioada</option>
            <option value="septembrie-2026">8–22 septembrie 2026 (Online Live) - 199 lei</option>
            <option value="octombrie-2026">23–25 octombrie 2026 (Experience Edition) - 1.200-1.400 lei</option>
          </select>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Mesaj sau întrebări
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
          placeholder="Spune-ne mai multe despre interesele tale sau pune întrebări despre program..."
        />
      </div>
      
      <div className="flex items-center">
        <input
          type="checkbox"
          id="terms"
          name="terms"
          checked={formData.terms}
          onChange={handleChange}
          required
          className="w-4 h-4 text-sage-600 border-gray-300 rounded focus:ring-sage-500"
        />
        <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
          Am citit și sunt de acord cu <a href="/termeni-si-conditii" className="text-sage-600 hover:underline">termenii și condițiile</a> și cu <a href="/politica-de-confidentialitate" className="text-sage-600 hover:underline">politica de confidențialitate</a>.
        </label>
      </div>
      
      <div className="text-center">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-sage-600 text-white rounded-lg font-medium hover:bg-sage-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
            "Se procesează..."
          ) : (
            <>
              Rezervă un loc
              <Calendar className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
