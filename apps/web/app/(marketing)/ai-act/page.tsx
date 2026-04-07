import React from 'react';
import { Shield, ArrowLeft, Brain } from 'lucide-react';
import Link from 'next/link';

export default function AIActPage() {
  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen font-sans selection:bg-emerald-200 selection:text-emerald-900">
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100">
        <div className="flex justify-between items-center px-6 md:px-12 py-5 max-w-7xl mx-auto">
          <Link href="/" className="text-2xl font-black text-emerald-950 tracking-tighter flex items-center gap-2">
            <Shield className="w-8 h-8 text-emerald-600" />
            AEGIS HUB
          </Link>
          <Link href="/">
            <button className="bg-slate-100 text-slate-600 px-6 py-2 rounded-xl font-bold text-sm hover:bg-slate-200 transition-all flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Voltar
            </button>
          </Link>
        </div>
      </nav>

      <main className="pt-40 pb-32 px-6">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-xs font-black uppercase tracking-widest border border-emerald-100">
               <Brain className="w-4 h-4" /> Governança de IA
            </div>
            <h1 className="text-5xl font-black tracking-tighter text-slate-900 leading-tight">EU AI Act Readiness</h1>
            <p className="text-xl text-slate-500 font-medium">A nossa abordagem estruturada para a Conformidade da Inteligência Artificial em Saúde Ocupacional.</p>
          </div>

          <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-xl border border-slate-100 space-y-8 text-slate-600 font-medium leading-relaxed">
             <section className="space-y-4">
               <h2 className="text-2xl font-black text-slate-900 tracking-tighter">1. Classificação de Risco (High-Risk Systems)</h2>
               <p>
                 Sistemas de inferência biométrica ou triagem emocional e enquadramento de saúde ocupacional podem inserir-se em anexos de alto risco do EU AI Act. O AEGIS HUB é proativamente desenhado sob este perfil operacional para assegurar níveis supremos de transparência.
               </p>
             </section>

             <section className="space-y-4">
               <h2 className="text-2xl font-black text-slate-900 tracking-tighter">2. Human-In-The-Loop (Supervisão Humana)</h2>
               <p>
                 Em estrito respeito pelo Artigo 14.º do EU AI Act (Human Oversight), o AEGIS HUB não emite decisões autónomas de pendor disciplinar, diagnóstico ou exclusão laboratorial. Todo o motor de triagem M2.7 requer validação explícita de um Profissional Credenciado de SST ou Médico do Trabalho — bloqueando "automation bias".
               </p>
             </section>

             <section className="space-y-4">
               <h2 className="text-2xl font-black text-slate-900 tracking-tighter">3. Rastreabilidade da Memória Algorítmica</h2>
               <p>
                 O AEGIS HUB impõe um Registo de Auditoria de Decisões de IA (AI Audit Trails) indelével. Todas as memórias e vetores analíticos que a Inteligência Artificial utilizar para gerar a sua pré-triagem ficam registados, permitindo uma total explicabilidade (Explainable AI) em caso de inspeção.
               </p>
             </section>
          </div>
        </div>
      </main>
    </div>
  );
}
