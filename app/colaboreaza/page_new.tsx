import type { Metadata } from "next";
import OrganizationRequestForm from "@/components/OrganizationRequestForm";

export const metadata: Metadata = {
  title: "Solicită ofertă pentru organizația ta - AnimaMinds",
  description: "Completează formularul și echipa AnimaMinds va reveni cu o propunere adaptată nevoilor organizației tale.",
};

export const dynamic = 'force-dynamic'

export default function ColaboreazaPage() {
  return (
    <div>
      {/* Direct Form Section */}
      <section id="solicita-oferta" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1
              className="text-4xl md:text-5xl font-semibold mb-5"
              style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
            >
              Solicită ofertă pentru organizația ta
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: "var(--charcoal-soft)" }}>
              Completează formularul, iar echipa AnimaMinds va reveni cu o propunere adaptată nevoilor organizației tale.
            </p>
          </div>
          <OrganizationRequestForm />
        </div>
      </section>

      {/* Brief info about collaboration types */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2
              className="text-3xl font-semibold mb-4"
              style={{ fontFamily: "Playfair Display, serif", color: "var(--charcoal)" }}
            >
              Programe dedicate organizațiilor
            </h2>
            <p className="text-gray-600">
              Formare profesională adaptată contextului organizațional
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Online dedicat",
                desc: "Programe interactive live pentru echipe distribuite geografic",
                icon: "💻"
              },
              {
                title: "La sediul beneficiarului",
                desc: "Formare la locația organizației pentru impact maxim",
                icon: "🏢"
              },
              {
                title: "Experience Edition",
                desc: "Programe rezidențiale premium pentru dezvoltare profundă",
                icon: "🏔️"
              },
              {
                title: "Grup organizat",
                desc: "Programe personalizate pentru grupuri și echipe",
                icon: "👥"
              }
            ].map((item, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-gray-50">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-semibold mb-2" style={{ color: "var(--charcoal)" }}>
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional info section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-semibold mb-4" style={{ color: "var(--charcoal)" }}>
              Informații importante
            </h3>
            <div className="space-y-4 text-sm">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-blue-800">
                  <strong>SICAP/SEAP:</strong> AnimaMinds este înregistrată ca furnizor de servicii de formare profesională și poate contracta direct prin platforma SICAP/SEAP.
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-green-800">
                  <strong>Proces-verbal de recepție:</strong> Eliberăm proces-verbal de recepție și certificat de participare conform legislației în vigoare.
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <p className="text-purple-800">
                  <strong>Flexibilitate:</strong> Adaptăm programele în funcție de nevoile specifice ale organizației și ale participanților.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
