"use client";

import { useState } from "react";
import { Calendar, MapPin, Users, Star, CheckCircle, ArrowRight } from "lucide-react";

// Registration Configurator Component
export default function RegistrationConfigurator() {
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    // Online Live
    name: "",
    email: "",
    phone: "",
    institution: "",
    role: "",
    
    // Experience Edition™
    edition: "",
    roomType: "",
    location: "",
    dietaryRequirements: "",
    billingType: "",
    billingOrganization: "",
    billingCUI: "",
    billingAddress: "",
    
    // Organizations
    organizationName: "",
    contactPerson: "",
    organizationEmail: "",
    organizationPhone: "",
    participantCount: "",
    program: "",
    organizationFormat: "",
    organizationType: "",
    message: "",
    
    // Common
    agreeTerms: false,
    confirmParticipation: false,
    confirmGroupFormation: false,
    confirmPayment: false,
    confirmGDPR: false,
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const formatOptions = [
    {
      id: "online-live",
      title: "Online Live",
      program: "Conversații care Contează",
      price: "199 lei / participant",
      details: ["7,5 ore", "8 CPD", "Google Meet", "Google Classroom"],
      location: "📍 Online",
      buttonText: "Mă înscriu"
    },
    {
      id: "experience-edition",
      title: "Experience Edition™",
      program: "Conversații care Contează",
      price: "de la 1.200 lei / participant",
      details: ["Hotel Afrodita", "3 ediții disponibile", "8 CPD"],
      location: "📍 Hotel Afrodita, Vălenii de Munte",
      buttonText: "Rezerv un loc"
    },
    {
      id: "organizations",
      title: "Pentru organizații",
      program: "Multiple programe",
      price: "de la 3.500 lei / grup",
      details: ["Online dedicat", "La sediul beneficiarului", "8 CPD"],
      location: "📍 Online dedicat sau la sediul beneficiarului",
      buttonText: "Solicit ofertă"
    },
  ];

  const experienceEditions = [
    { id: "sept-2026", dates: "25–27 septembrie 2026", doublePrice: "1.200 lei", singlePrice: "1.400 lei" },
    { id: "oct-2026", dates: "23–25 octombrie 2026", doublePrice: "1.490 lei", singlePrice: "1.690 lei" },
    { id: "nov-2026", dates: "30 octombrie – 1 noiembrie 2026", doublePrice: "1.490 lei", singlePrice: "1.690 lei" }
  ];

  const programs = [
    "Conversații care Contează",
    "AI Fără Haos",
    "Busola Deciziilor",
    "Calm sub Presiune",
    "Avantajul Uman"
  ];

  const participantCounts = [
    "10–15",
    "16–30",
    "31–50",
    "50+"
  ];

  const organizationTypes = [
    { id: "education", name: "Instituție de învățământ" },
    { id: "medical", name: "Spital / organizație medicală" },
    { id: "company", name: "Companie" },
    { id: "ngo", name: "ONG" },
    { id: "public", name: "Instituție publică" }
  ];

  const handleFormatSelect = (formatId: string) => {
    setSelectedFormat(formatId);
    setSubmitted(false);
    setError("");
  };

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
      let response;
      
      switch (selectedFormat) {
        case "online-live":
          response = await fetch("/api/online-live", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              institution: formData.institution,
              role: formData.role,
              gdprConsent: formData.confirmGDPR,
              calendarConfirmation: formData.confirmParticipation,
            }),
          });
          break;
          
        case "experience-edition":
          response = await fetch("/api/experience-edition", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              company: formData.billingOrganization,
              programme: "Conversații care Contează",
              accommodation: formData.roomType,
              preferredPeriod: formData.edition,
              message: formData.dietaryRequirements,
            }),
          });
          break;
          
        case "organizations":
          response = await fetch("/api/organization-requests", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              organizationName: formData.organizationName,
              contactPerson: formData.contactPerson,
              organizationEmail: formData.organizationEmail,
              organizationPhone: formData.organizationPhone,
              participantCount: formData.participantCount,
              programmeInterest: formData.program,
              organizationFormat: formData.organizationFormat,
              organizationType: formData.organizationType,
              message: formData.message,
            }),
          });
          break;
          
        default:
          throw new Error("Format necunoscut");
      }

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

  const getConfirmationMessage = () => {
    switch (selectedFormat) {
      case "online-live":
        return {
          title: "✅ Înscriere înregistrată",
          message: `Mulțumim pentru interes, ${formData.name}.\n\nAi solicitat participarea la programul:\n\nConversații care Contează – Online Live\n\nPerioadă desfășurare:\n8 septembrie 2026\n15 septembrie 2026\n22 septembrie 2026\n\nÎn scurt timp vei primi pe e-mail:\nconfirmarea locului;\ninformațiile privind plata;\ndetaliile de acces;\naccesul în Google Classroom.\n\nNe bucurăm că ai ales să faci parte din această experiență de învățare.`
        };
      case "experience-edition":
        const selectedEdition = experienceEditions.find(e => e.id === formData.edition);
        const price = formData.roomType === "single" ? selectedEdition?.singlePrice : selectedEdition?.doublePrice;
        return {
          title: "✅ Solicitarea ta a fost înregistrată",
          message: `Mulțumim, ${formData.name}.\n\nAi solicitat rezervarea unui loc la:\n\nConversații care Contează – Experience Edition™\n\nEdiția selectată: ${selectedEdition?.dates}\nTip cazare: ${formData.roomType === "single" ? "Single" : "Dublă"}\nPreț: ${price}\n\nÎn perioada următoare vei primi:\nconfirmarea participării;\ninformațiile privind plata;\ndetaliile logistice;\ninformațiile privind cazarea.\n\nImportant: grupul se formează la minimum 20 participanți.`
        };
      case "organizations":
        const orgType = organizationTypes.find(t => t.id === formData.organizationType);
        const orgName = formData.organizationName || "Organizația dumneavoastră";
        
        let customMessage = "";
        switch (formData.organizationType) {
          case "education":
            customMessage = `Mulțumim pentru interesul acordat programelor AnimaMinds.\n\nAm primit solicitarea transmisă de ${orgName} pentru programul ${formData.program}.\n\nÎn perioada următoare veți primi:\npropunerea de desfășurare;\noferta financiară;\nvariante de calendar;\ninformații privind certificarea și documentele de participare.\nUn membru al echipei AnimaMinds vă poate contacta pentru stabilirea detaliilor organizatorice.\n\nProgramele AnimaMinds sunt însoțite de certificat de participare, fișa competențelor dezvoltate și documentele aferente desfășurării activităților de formare.`;
            break;
          case "medical":
            customMessage = `Mulțumim pentru interesul acordat programelor AnimaMinds.\n\nAm primit solicitarea transmisă de ${orgName} pentru programul ${formData.program}.\n\nVom analiza informațiile transmise și vom pregăti o propunere adaptată contextului organizației dumneavoastră.\n\nÎn perioada următoare veți primi:\noferta personalizată;\npropunerea de calendar;\ninformații privind organizarea grupelor;\ndocumentele necesare desfășurării programului.\n\nPropunerea transmisă va include recomandări privind formatul optim de desfășurare și adaptarea conținutului la specificul beneficiarului.`;
            break;
          case "company":
            customMessage = `Mulțumim pentru interes.\n\nAm primit solicitarea pentru programul ${formData.program}.\n\nÎn maximum 2 zile lucrătoare vom reveni cu:\noferta comercială;\nopțiunile de desfășurare;\ncalendarul recomandat;\ninformațiile necesare contractării.`;
            break;
          default:
            customMessage = `Mulțumim pentru interes.\n\nAm primit solicitarea pentru programul ${formData.program}.\n\nÎn maximum 2 zile lucrătoare veți primi:\noferta personalizată;\npropunerea de calendar;\ncondițiile de desfășurare;\ndetaliile contractuale.`;
        }
        
        return {
          title: formData.organizationType === "company" ? "✅ Cererea dumneavoastră a fost transmisă" : "✅ Solicitarea a fost înregistrată",
          message: customMessage
        };
      default:
        return { title: "", message: "" };
    }
  };

  if (submitted) {
    const confirmation = getConfirmationMessage();
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-green-800 mb-4">{confirmation.title}</h2>
          <div className="text-green-700 whitespace-pre-line leading-relaxed">
            {confirmation.message}
          </div>
        </div>
      </div>
    );
  }

  if (!selectedFormat) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
            Alege modul în care dorești să participi
          </h1>
          <p className="text-xl text-gray-600">
            Participă individual, împreună cu organizația ta sau într-un format Experience Edition™.
          </p>
        </div>

        {/* Format Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {formatOptions.map((format) => (
            <div key={format.id} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="text-sm text-gray-500 mb-2">{format.location}</div>
                <h3 className="text-xl font-bold mb-2" style={{ color: "var(--charcoal)" }}>{format.title}</h3>
                <p className="text-gray-600 mb-4">{format.program}</p>
                
                <div className="space-y-2 mb-6">
                  {format.details.map((detail, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">{detail}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mb-6 bg-gray-50 rounded-xl p-3 border border-gray-200">
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Preț</p>
                  <div className="text-3xl font-black text-gray-900 leading-tight">{format.price}</div>
                </div>
                
                <button
                  onClick={() => handleFormatSelect(format.id)}
                  className="w-full py-3 px-4 rounded-xl font-bold transition-all"
                  style={{ 
                    backgroundColor: "var(--sage)", 
                    color: "white" 
                  }}
                >
                  {format.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Render specific forms based on selected format
  const renderForm = () => {
    switch (selectedFormat) {
      case "online-live":
        return (
          <div className="max-w-4xl mx-auto px-4 py-16">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
                Conversații care Contează — Online Live
              </h2>
              
              {/* Calendar Section */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5" style={{ color: "var(--sage)" }} />
                  Calendar
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span>📅 8 septembrie 2026 17:30–19:30</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span>📅 15 septembrie 2026 17:30–20:00</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span>📅 22 septembrie 2026 17:30–19:30</span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Participant Data */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Date participant</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Nume și prenume"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="E-mail"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Telefon"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                    />
                    <input
                      type="text"
                      name="institution"
                      placeholder="Instituție"
                      value={formData.institution}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                    />
                  </div>
                  <input
                    type="text"
                    name="role"
                    placeholder="Funcție"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                  />
                </div>

                {/* Confirmations */}
                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      name="confirmParticipation"
                      checked={formData.confirmParticipation}
                      onChange={handleChange}
                      required
                      className="w-5 h-5 text-sage-600 rounded focus:ring-sage-500"
                    />
                    <span>Particip la toate cele 3 întâlniri online</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      required
                      className="w-5 h-5 text-sage-600 rounded focus:ring-sage-500"
                    />
                    <span>Sunt de acord cu prelucrarea datelor</span>
                  </label>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-6 rounded-xl font-bold text-white transition-all disabled:opacity-50"
                  style={{ backgroundColor: "var(--sage)" }}
                >
                  {loading ? "Se procesează..." : "Înscrie-mă la program"}
                </button>
              </form>
            </div>
          </div>
        );

      case "experience-edition":
        return (
          <div className="max-w-4xl mx-auto px-4 py-16">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
                Conversații care Contează — Experience Edition™
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Edition Selection */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Alege ediția</h3>
                  <div className="space-y-3">
                    {experienceEditions.map((edition) => (
                      <label key={edition.id} className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="radio"
                          name="edition"
                          value={edition.id}
                          checked={formData.edition === edition.id}
                          onChange={handleChange}
                          required
                          className="w-5 h-5 text-sage-600"
                        />
                        <span className="font-medium">{edition.dates}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Room Type */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Tip cazare</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name="roomType"
                        value="double"
                        checked={formData.roomType === "double"}
                        onChange={handleChange}
                        required
                        className="w-5 h-5 text-sage-600"
                      />
                      <span className="font-medium">Cameră dublă</span>
                    </label>
                    <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name="roomType"
                        value="single"
                        checked={formData.roomType === "single"}
                        onChange={handleChange}
                        required
                        className="w-5 h-5 text-sage-600"
                      />
                      <span className="font-medium">Cameră single</span>
                    </label>
                  </div>
                </div>

                {/* Price Display */}
                {formData.edition && formData.roomType && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Preț selectat:</div>
                    <div className="text-2xl font-bold text-amber-800">
                      {experienceEditions.find(e => e.id === formData.edition)?.[formData.roomType === "single" ? "singlePrice" : "doublePrice"]}
                    </div>
                  </div>
                )}

                {/* Participant Data - Required Fields */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Date participant *</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nume și prenume *</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Nume și prenume"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">E-mail *</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="E-mail"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Telefon *</label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Telefon"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Optional Professional Fields */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Informații profesionale (opțional)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Instituție / Organizație</label>
                      <input
                        type="text"
                        name="institution"
                        placeholder="Instituție / Organizație"
                        value={formData.institution}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Funcție</label>
                      <input
                        type="text"
                        name="role"
                        placeholder="Funcție"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Optional Logistical Fields */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Informații logistice (opțional)</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Localitate</label>
                    <input
                      type="text"
                      name="location"
                      placeholder="Localitatea de unde pleci"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cerințe alimentare sau medicale</label>
                    <textarea
                      name="dietaryRequirements"
                      placeholder="Exemple: vegetarian, alergii alimentare, intoleranță la gluten, alte mențiuni"
                      value={formData.dietaryRequirements}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                    />
                  </div>
                </div>

                
                {/* Billing Information */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Facturare</h3>
                  <p className="text-gray-600 mb-4">Factura este emisă către:</p>
                  <div className="space-y-3 mb-4">
                    <label className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="billingType"
                        value="individual"
                        checked={formData.billingType === "individual"}
                        onChange={handleChange}
                        required
                        className="w-5 h-5 text-sage-600"
                      />
                      <span>Persoană fizică</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="billingType"
                        value="company"
                        checked={formData.billingType === "company"}
                        onChange={handleChange}
                        className="w-5 h-5 text-sage-600"
                      />
                      <span>Persoană juridică</span>
                    </label>
                  </div>
                  
                  {formData.billingType === "company" && (
                    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                      <input
                        type="text"
                        name="billingOrganization"
                        placeholder="Denumire organizație"
                        value={formData.billingOrganization}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          name="billingCUI"
                          placeholder="CUI"
                          value={formData.billingCUI}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                        />
                        <input
                          type="text"
                          name="billingAddress"
                          placeholder="Adresă"
                          value={formData.billingAddress}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirmations */}
                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      name="confirmGroupFormation"
                      checked={formData.confirmGroupFormation}
                      onChange={handleChange}
                      required
                      className="w-5 h-5 text-sage-600 rounded focus:ring-sage-500"
                    />
                    <span>Confirm că am citit informațiile despre program</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      name="confirmPayment"
                      checked={formData.confirmPayment}
                      onChange={handleChange}
                      required
                      className="w-5 h-5 text-sage-600 rounded focus:ring-sage-500"
                    />
                    <span>Înțeleg că grupa se formează la minimum 20 participanți</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      required
                      className="w-5 h-5 text-sage-600 rounded focus:ring-sage-500"
                    />
                    <span>Înțeleg că plata se realizează după confirmarea formării grupei</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      name="confirmGDPR"
                      checked={formData.confirmGDPR}
                      onChange={handleChange}
                      required
                      className="w-5 h-5 text-sage-600 rounded focus:ring-sage-500"
                    />
                    <span>Sunt de acord cu prelucrarea datelor personale</span>
                  </label>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-6 rounded-xl font-bold text-white transition-all disabled:opacity-50"
                  style={{ backgroundColor: "var(--sage)" }}
                >
                  {loading ? "Se procesează..." : "Rezervă un loc"}
                </button>
              </form>
            </div>
          </div>
        );

      case "organizations":
        return (
          <div className="max-w-4xl mx-auto px-4 py-16">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}>
                Solicită ofertă
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Program Selection */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Program dorit</h3>
                  <div className="space-y-3">
                    {programs.map((program) => (
                      <label key={program} className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="radio"
                          name="program"
                          value={program}
                          checked={formData.program === program}
                          onChange={handleChange}
                          required
                          className="w-5 h-5 text-sage-600"
                        />
                        <span className="font-medium">{program}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Format Selection */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Format</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name="organizationFormat"
                        value="online"
                        checked={formData.organizationFormat === "online"}
                        onChange={handleChange}
                        required
                        className="w-5 h-5 text-sage-600"
                      />
                      <span className="font-medium">Online dedicat organizației</span>
                    </label>
                    <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name="organizationFormat"
                        value="onsite"
                        checked={formData.organizationFormat === "onsite"}
                        onChange={handleChange}
                        required
                        className="w-5 h-5 text-sage-600"
                      />
                      <span className="font-medium">La sediul beneficiarului</span>
                    </label>
                  </div>
                </div>

                {/* Organization Data */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Date organizație</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="organizationName"
                      placeholder="Denumire organizație"
                      value={formData.organizationName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                    />
                    <select
                      name="organizationType"
                      value={formData.organizationType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                    >
                      <option value="">Tip organizație</option>
                      {organizationTypes.map((type) => (
                        <option key={type.id} value={type.id}>{type.name}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      name="contactPerson"
                      placeholder="Persoană de contact"
                      value={formData.contactPerson}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                    />
                    <input
                      type="text"
                      name="role"
                      placeholder="Funcție"
                      value={formData.role}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                    />
                    <input
                      type="email"
                      name="organizationEmail"
                      placeholder="E-mail"
                      value={formData.organizationEmail}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                    />
                    <input
                      type="tel"
                      name="organizationPhone"
                      placeholder="Telefon"
                      value={formData.organizationPhone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                    />
                    <select
                      name="participantCount"
                      value={formData.participantCount}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                    >
                      <option value="">Număr participanți</option>
                      {participantCounts.map((count) => (
                        <option key={count} value={count}>{count}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Mesaj</h3>
                  <textarea
                    name="message"
                    placeholder="Descrieți pe scurt nevoia organizației"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-6 rounded-xl font-bold text-white transition-all disabled:opacity-50"
                  style={{ backgroundColor: "var(--sage)" }}
                >
                  {loading ? "Se procesează..." : "Solicită ofertă personalizată"}
                </button>
              </form>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      {renderForm()}
      
      {/* Back button */}
      {selectedFormat && !submitted && (
        <div className="max-w-4xl mx-auto px-4 pb-8">
          <button
            onClick={() => setSelectedFormat(null)}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Înapoi la alegerea formatului
          </button>
        </div>
      )}
    </div>
  );
}
