"use client";

import { useState } from "react";
import { FileDown, Loader2 } from "lucide-react";
import { pdf } from "@react-pdf/renderer";
import { AnexoDReportPDF } from "./AnexoDReportPDF";
import { getAnexoDDataAction } from "../../../app/admin/compliance/actions";

export function AnexoDDownloadButton({ companyName }: { companyName: string }) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const data = await getAnexoDDataAction();
      const blob = await pdf(<AnexoDReportPDF data={data} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `AEGIS-AnexoD-${companyName.replace(/\s+/g, '-').toLowerCase()}-${new Date().getFullYear()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("PDF Generation Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleDownload}
      disabled={loading}
      className="bg-neutral-800 text-white px-6 py-2.5 rounded-xl text-sm font-bold border border-white/5 hover:border-emerald-500/50 hover:bg-neutral-700 transition-all flex items-center gap-2 disabled:opacity-50"
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileDown className="h-4 w-4 text-emerald-400" />}
      Exportar Anexo D (Saúde)
    </button>
  );
}
