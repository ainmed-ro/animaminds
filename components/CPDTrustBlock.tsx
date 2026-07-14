import Image from "next/image";
import { CheckCircle } from "lucide-react";

interface CPDTrustBlockProps {
  variant?: "full" | "compact" | "inline";
  showCredits?: boolean;
  credits?: number;
}

export default function CPDTrustBlock({
  variant = "compact",
  showCredits = true,
  credits = 8,
}: CPDTrustBlockProps) {
  if (variant === "inline") {
    return (
      <div className="flex items-center gap-3 flex-wrap">
        <Image
          src="/cpd-badge.png"
          alt="CPD Approved Provider #790577"
          width={80}
          height={40}
          className="object-contain"
        />
        <span className="text-sm text-gray-600 font-medium">
          CPD Approved Provider <strong>#790577</strong>
          {showCredits && <> · <strong>{credits} credite CPD</strong></>}
        </span>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className="border border-amber-200 bg-amber-50 rounded-xl p-4">
        <div className="flex items-start gap-4">
          <Image
            src="/cpd-badge.png"
            alt="CPD Approved Provider #790577"
            width={90}
            height={45}
            className="object-contain flex-shrink-0 mt-1"
          />
          <div>
            <p className="text-sm font-semibold text-gray-800 mb-1">
              CPD Approved Provider #790577
            </p>
            <div className="space-y-1">
              {[
                "Certificat de participare",
                "Fișa competențelor dezvoltate",
                showCredits ? `${credits} credite CPD` : null,
              ]
                .filter(Boolean)
                .map((item) => (
                  <div key={item} className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                    <span className="text-xs text-gray-700">{item}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <Image
          src="/cpd-badge.png"
          alt="CPD Approved Provider #790577"
          width={140}
          height={70}
          className="object-contain flex-shrink-0"
        />
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-1">
            CPD Approved Provider #790577
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            Participanții primesc la finalizarea programului:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Certificat de participare",
              "Fișa competențelor dezvoltate",
              showCredits ? `${credits} credite CPD` : null,
              "Resurse digitale",
            ]
              .filter(Boolean)
              .map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
