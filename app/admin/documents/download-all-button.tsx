"use client";

import type { Document } from "@prisma/client";

export default function DownloadAllButton({ documents }: { documents: Document[] }) {
  function downloadAll() {
    documents.forEach((doc, i) => {
      setTimeout(() => {
        const a = document.createElement("a");
        a.href = doc.fileUrl;
        a.download = doc.title;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }, i * 500);
    });
  }

  if (documents.length === 0) return null;

  return (
    <button
      onClick={downloadAll}
      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm font-medium"
    >
      Download toate ({documents.length})
    </button>
  );
}
