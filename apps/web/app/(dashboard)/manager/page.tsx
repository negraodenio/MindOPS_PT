import { getManagerOverview } from "@mindops/database";
import { createClient } from "../../../utils/supabase/server";
import { BrainCircuit, Users, AlertTriangle, ShieldCheck, TrendingUp } from "lucide-react";

export default async function LineManagerDashboardPage({
  searchParams
}: {
  searchParams: Promise<{ tenantId?: string; orgUnitId?: string }>;
}) {
  const { tenantId, orgUnitId } = await searchParams;
  const targetTenantId = tenantId || "e037420f-71b2-40e7-935f-170eb265b36a";

  const client = await createClient();
  const data = await getManagerOverview(client as any, targetTenantId, orgUnitId);

  return (
    <main className="min-h-screen bg-[#020202] text-white p-8 animate-in fade-in duration-700">
      <header className="flex items-center justify-between border-b border-white/10 pb-8 mb-12">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
             <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <BrainCircuit className="h-6 w-6 text-black" />
             </div>
             <h1 className="text-2xl font-black tracking-tighter italic uppercase">AEGIS <span className="font-light not-italic text-neutral-500 ml-1">HUB</span> / Gestão</h1>
          </div>
          <p className="text-sm text-neutral-500 max-w-lg">
            Visão estratégica de saúde e resiliência da equipa em tempo real. Dados agregados em conformidade com o RGPD.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-emerald-400">
           Proteção Ativa M2.7
        </div>
      </header>

      <section className="grid gap-6 md:grid-cols-3">
        <article className="group rounded-[32px] border border-white/5 bg-white/[0.01] p-8 transition-all hover:bg-white/[0.03] hover:border-white/10 relative overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <Users className="h-5 w-5 text-emerald-400" />
            <span className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest">Equipa</span>
          </div>
          <p className="text-sm text-neutral-500 font-medium uppercase tracking-tight">Avaliada</p>
          <div className="flex items-baseline gap-2 mt-4">
            <h2 className="text-4xl font-black tracking-tighter">{data.coveragePercent}%</h2>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </div>
          <p className="mt-2 text-xs text-neutral-600 font-bold uppercase tracking-tighter">
            {data.assessedCount} de {data.totalEmployees} colaboradores monitorizados
          </p>
        </article>

        <article className="group rounded-[32px] border border-white/5 bg-white/[0.01] p-8 transition-all hover:bg-white/[0.03] hover:border-white/10 relative overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <AlertTriangle className="h-5 w-5 text-rose-400" />
            <span className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest">Risco Ativo</span>
          </div>
          <p className="text-sm text-neutral-500 font-medium uppercase tracking-tight">Vigilância Crítica</p>
          <div className="flex items-baseline gap-2 mt-4">
            <h2 className="text-4xl font-black tracking-tighter text-rose-500">
              {Math.round(((data.highRiskCount + data.criticalRiskCount) / Math.max(data.assessedCount, 1)) * 100)}%
            </h2>
          </div>
          <p className="mt-2 text-xs text-neutral-600 font-bold uppercase tracking-tighter">
            Anomalias detectadas no último ciclo de auditoria
          </p>
        </article>

        <article className="group rounded-[32px] border border-white/5 bg-white/[0.01] p-8 transition-all hover:bg-white/[0.03] hover:border-white/10 relative overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <ShieldCheck className="h-5 w-5 text-indigo-400" />
            <span className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest">Protocolo</span>
          </div>
          <p className="text-sm text-neutral-500 font-medium uppercase tracking-tight">Compliance Lei 102/2009</p>
          <div className="flex items-baseline gap-2 mt-4">
            <h2 className="text-4xl font-black tracking-tighter text-indigo-400">{data.complianceScore}</h2>
          </div>
          <p className="mt-2 text-xs text-neutral-600 font-bold uppercase tracking-tighter">
            Nível de conformidade auditada do departamento
          </p>
        </article>
      </section>

      {/* 🌑 Hub Graphics / Decorative */}
      <div className="mt-24 pointer-events-none opacity-20">
         <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
         <p className="mt-8 text-center text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-600">
            AEGIS HUB Intelligence Systems // Operational Security Protocol
         </p>
      </div>
    </main>
  );
}
