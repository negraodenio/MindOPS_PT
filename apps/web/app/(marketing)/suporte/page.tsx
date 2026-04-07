import React from 'react';
import { Shield, ArrowLeft, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function SuportePage() {
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
               <MessageSquare className="w-4 h-4" /> Acesso Direto
            </div>
            <h1 className="text-5xl font-black tracking-tighter text-slate-900 leading-tight">Suporte Legal & Compliance</h1>
            <p className="text-xl text-slate-500 font-medium">Equipa dedicada ao apoio de DPOs e Chefias de Saúde Ocupacional.</p>
          </div>

          <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-xl border border-slate-100 space-y-8 text-slate-600 font-medium leading-relaxed">
             <section className="space-y-4">
               <h2 className="text-2xl font-black text-slate-900 tracking-tighter">Canal de Dúvidas de Governança</h2>
               <p>
                 O AEGIS HUB dispõe de uma via exclusiva de acompanhamento em caso de requisições de apagamento total (Right to be Forgotten) ou demonstração de infraestrutura para relatórios à ACT ou CNPD.
               </p>
               <div className="bg-slate-100 p-6 rounded-2xl font-mono text-sm text-slate-600 mt-4">
                 Email C-Level: privacy@aegishub.com<br/>
                 SLA de Resposta: 24 Horas Úteis
               </div>
             </section>

             <section className="space-y-4">
               <h2 className="text-2xl font-black text-slate-900 tracking-tighter">Apoio a Triagens SOS</h2>
               <p>
                 Em casos de extrema urgência envolvendo denúncias de alto nível corporativo contidas sob encriptação, acione o protocolo de levantamento jurídico junto ao Suporte. A infraestrutura providenciará chaves asimétricas sob requisição protocolada de ordem judicial ou RH Diretivo.
               </p>
             </section>
          </div>
        </div>
      </main>
    </div>
  );
}
