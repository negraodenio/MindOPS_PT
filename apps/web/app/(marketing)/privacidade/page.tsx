import React from 'react';
import { Shield, ArrowLeft, Lock } from 'lucide-react';
import Link from 'next/link';

export default function PrivacidadePage() {
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
               <Lock className="w-4 h-4" /> Central de Segurança
            </div>
            <h1 className="text-5xl font-black tracking-tighter text-slate-900 leading-tight">Política de Privacidade & RGPD</h1>
            <p className="text-xl text-slate-500 font-medium">O nosso compromisso inabalável com a minimização de dados e proteção da privacidade ocupacional.</p>
          </div>

          <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-xl border border-slate-100 space-y-8 text-slate-600 font-medium leading-relaxed">
             <section className="space-y-4">
               <h2 className="text-2xl font-black text-slate-900 tracking-tighter">1. Enquadramento e Finalidade</h2>
               <p>
                 O AEGIS HUB é uma plataforma concebida desde a base para cumprir rigorosamente as normas estabelecidas no Regulamento Geral sobre a Proteção de Dados (Regulamento (UE) 2016/679) e as diretrizes do CNPD aplicáveis ao contexto laboral e dados sensíveis.
               </p>
             </section>

             <section className="space-y-4">
               <h2 className="text-2xl font-black text-slate-900 tracking-tighter">2. Minimização e Arquitetura de Isolamento</h2>
               <p>
                 Os dados recolhidos através de avaliações clínicas e cognitivas são armazenados em silos estanques. Aplicamos tokenização irreversível para desvincular a identidade explícita do trabalhador aos resultados das triagens. O AEGIS HUB não possui "backdoors" de re-identificação a nível da base de dados base.
               </p>
             </section>

             <section className="space-y-4">
               <h2 className="text-2xl font-black text-slate-900 tracking-tighter">3. Papel do Empregador e do AEGIS HUB</h2>
               <p>
                 O AEGIS HUB atua exclusivamente como <strong>Subcontratante</strong> (Data Processor) fornecendo a infraestrutura tecnológica para apoiar a organização patronal, que retém o papel de <strong>Responsável pelo Tratamento</strong> (Data Controller). A visualização de métricas e relatórios individuais agregados está exclusivamente sob a jurisdição do departamento de Medicina do Trabalho e Profissionais de SST autorizados.
               </p>
             </section>
             
             <section className="space-y-4">
               <h2 className="text-2xl font-black text-slate-900 tracking-tighter">4. Retenção de Dados</h2>
               <p>
                 A plataforma dispõe de políticas rigorosas de expiração de dados após as janelas de auditoria legal expirarem ou no final da vigência do contrato, garantindo a exclusão segura de todos os indicadores psicossociais em conformidade com as diretivas europeias.
               </p>
             </section>
          </div>
        </div>
      </main>
    </div>
  );
}
