"use client";

import { BrainCircuit, ShieldCheck, Lock } from "lucide-react";
import Link from "next/link";

export default function OAuthConsentPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-emerald-500/30 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="w-full max-w-[480px] relative z-10">
        {/* Header / Brand */}
        <div className="flex flex-col items-center mb-8">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 mb-6">
             <BrainCircuit className="h-8 w-8 text-black" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight italic uppercase tracking-tighter">AEGIS <span className="font-light not-italic text-neutral-500 ml-1">HUB</span></h1>
          <p className="text-sm text-neutral-500 mt-2 text-center">
            Uma aplicação externa está a solicitar permissão para aceder aos seus dados no ecossistema seguro AEGIS HUB.
          </p>
        </div>

        {/* Consent Card */}
        <div className="rounded-[32px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-8 shadow-2xl">
          <div className="space-y-6">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <ShieldCheck className="h-6 w-6 text-emerald-400 mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold">Perfil e Identidade</h3>
                <p className="text-xs text-neutral-500 mt-1">Nome, e-mail e identificação corporativa para autenticação.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <Lock className="h-6 w-6 text-cyan-400 mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold">Contexto de Saúde (Apenas Leitura)</h3>
                <p className="text-xs text-neutral-500 mt-1">Apenas status agregados de riscos psicossociais para integração de RH.</p>
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4">
            <button className="h-12 rounded-xl border border-white/10 bg-white/5 font-semibold transition-colors hover:bg-white/10">
              Recusar
            </button>
            <button className="h-12 rounded-xl bg-emerald-500 font-bold text-black hover:bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all">
              Autorizar
            </button>
          </div>

          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <p className="text-[10px] text-neutral-600 leading-relaxed uppercase tracking-tighter">
              Este fluxo é auditado e cumpre integralmente o RGPD e a Lei 102/2009. Suas credenciais nunca são partilhadas com terceiros.
            </p>
          </div>
        </div>

        {/* Support */}
        <p className="mt-8 text-center text-xs text-neutral-500">
          Dúvidas sobre segurança? <Link href="#" className="font-semibold text-emerald-400 hover:underline">Consulte nossa página de Governança.</Link>
        </p>
      </div>
    </div>
  );
}
