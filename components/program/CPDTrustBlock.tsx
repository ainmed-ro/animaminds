import Image from "next/image";
import Link from "next/link";
import { Award, Clock, ExternalLink } from "lucide-react";

interface CPDTrustBlockProps {
  duration: string;
  credits: number;
}

export default function CPDTrustBlock({ duration, credits }: CPDTrustBlockProps) {
  return (
    <div className="bg-gradient-to-r from-sage-50 to-blue-50 p-6 rounded-xl border border-sage-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-sage-600" />
          <span className="font-semibold text-sage-800">CPD Approved Provider</span>
        </div>
        <span className="text-sm font-medium text-sage-700">#790577</span>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-600" />
          <span className="text-sm text-gray-700">
            <strong>Durată:</strong> {duration}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-gray-600" />
          <span className="text-sm text-gray-700">
            <strong>Credite CPD:</strong> {credits}
          </span>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Program furnizat de un CPD Approved Provider (#790577).
        </p>
        <Image
          src="/cpd-badge.png"
          alt="CPD Badge"
          width={40}
          height={40}
          className="w-8 h-8 object-contain"
        />
      </div>
      
      <div className="mt-4 pt-4 border-t border-sage-200">
        <Link
          href="https://thecpdregister.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm text-sage-600 hover:text-sage-800 transition-colors"
        >
          <ExternalLink size={12} />
          Verifică furnizorul
        </Link>
      </div>
    </div>
  );
}
