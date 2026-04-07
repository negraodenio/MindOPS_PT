import { SupabaseClient } from "@supabase/supabase-js";
import { AnexoDReportData } from "@mindops/domain";

export async function getAnexoDStats(client: SupabaseClient, tenantId: string): Promise<AnexoDReportData> {
  // Em uma implementação real, faríamos queries agregadas (COUNT, GROUP BY) 
  // nas tabelas assessment_sessions e assessment_scores.
  // Para esta fase de entrega, vamos buscar os totais básicos e o nome da empresa.

  const { data: tenant } = await client
    .from("tenants")
    .select("name")
    .eq("id", tenantId)
    .single();

  const { count: totalExams } = await client
    .from("assessment_sessions")
    .select("*", { count: "exact", head: true })
    .eq("tenant_id", tenantId);

  const { data: scores } = await client
    .from("assessment_scores")
    .select("risk_level")
    .eq("session_id", "...") // Simplificação para o POC
    .limit(100);

  // MOCK de distribuição para o POC operacional
  return {
    company: {
      name: tenant?.name || "Empresa Cliente",
      nif: "501234567",
      actCode: "62010 - Consultoria",
      dpoName: "Encarregado de Proteção de Dados",
    },
    vigilance: {
      periodStart: "01/01/2024",
      periodEnd: new Date().toLocaleDateString("pt-PT"),
      totalExams: totalExams || 0,
      admissionExams: Math.floor((totalExams || 0) * 0.15),
      periodicExams: Math.floor((totalExams || 0) * 0.8),
      occasionalExams: Math.floor((totalExams || 0) * 0.05),
    },
    results: {
      fit: Math.floor((totalExams || 0) * 0.7),
      fitWithConditions: Math.floor((totalExams || 0) * 0.2),
      unfitTemporary: Math.floor((totalExams || 0) * 0.1),
      unfitPermanent: 0,
    },
    risks: [
      { dimension: "Fadiga Vocal (AEGIS Voice)", affectedCount: 12, severity: "moderate" },
      { dimension: "Risco Psicossocial (Burnout)", affectedCount: 8, severity: "high" },
      { dimension: "Ansiedade Generalizada", affectedCount: 25, severity: "low" }
    ]
  };
}
