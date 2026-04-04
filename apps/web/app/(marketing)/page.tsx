import Link from "next/link";
import { BrainCircuit, ShieldCheck, Activity, Scale, Zap, Globe } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#020202] text-white selection:bg-emerald-500/30 font-sans">
      {/* 🌌 Animated Intelligence Grid Background */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-black/40 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
               <BrainCircuit className="h-5 w-5 text-black" />
            </div>
            <span className="font-bold tracking-tight italic uppercase tracking-tighter">AEGIS <span className="font-light not-italic text-neutral-600">HUB</span></span>
          </div>
          <div className="hidden items-center gap-10 text-[11px] font-bold uppercase tracking-widest text-neutral-400 md:flex">
            <Link href="#solutions" className="transition-colors hover:text-emerald-400">Ecossistema</Link>
            <Link href="#compliance" className="transition-colors hover:text-emerald-400">Lei 102/2009</Link>
            <Link href="#ai-governance" className="transition-colors hover:text-emerald-400">Governança IA</Link>
          </div>
          <Link
            href="/auth/login"
            className="rounded-xl bg-emerald-500 px-6 py-2.5 text-xs font-bold text-black shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all hover:bg-emerald-400 hover:scale-105 active:scale-95 uppercase tracking-tighter"
          >
            Acesso Auditado
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative pt-32 overflow-hidden">
        {/* Dynamic Background Orbs */}
        <div className="absolute top-0 -left-20 h-[600px] w-[600px] rounded-full bg-emerald-500/10 blur-[130px] opacity-60" />
        <div className="absolute top-40 -right-20 h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-[130px] opacity-60" />

        <section className="relative mx-auto max-w-5xl px-6 py-24 text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            Standard Global em Saúde Mental Ocupacional
          </div>

          <h1 className="mt-10 text-6xl font-extrabold tracking-tight sm:text-8xl leading-[1.05]">
            Intervenção <br />
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Clinicamente Inteligente.
            </span>
          </h1>

          <p className="mx-auto mt-10 max-w-2xl text-xl text-neutral-400 font-medium leading-relaxed">
            A AEGIS HUB é o protocolo definitivo de <span className="text-white italic">Vigilância Ativa</span> para riscos psicossociais. 
            Antecipamos crises, protegemos equipas e garantimos conformidade total com a Lei 102/2009 e o EU AI Act.
          </p>

          <div className="mt-14 flex flex-col items-center justify-center gap-6 sm:flex-row">
            <button className="h-14 rounded-2xl bg-emerald-500 px-10 font-extrabold text-black transition-all hover:bg-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] uppercase text-sm tracking-tight">
              Solicitar Auditoria AEGIS HUB
            </button>
            <button className="h-14 rounded-2xl border border-white/10 bg-white/5 px-10 font-bold backdrop-blur-md transition-all hover:bg-white/10 uppercase text-sm tracking-tight">
              Calcular Impacto Financeiro
            </button>
          </div>
        </section>

        {/* Intelligence Pillars */}
        <section id="solutions" className="mx-auto max-w-7xl px-6 py-32 border-t border-white/5">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Vigilância Ativa 102/2009",
                desc: "Diagnóstico psicossocial avançado (COPSOQ III) com triagem automatizada e relatórios de conformidade imediatos para a ACT.",
                icon: <Scale className="h-6 w-6 text-emerald-400" />
              },
              {
                title: "Biometria M2.7 Intelligence",
                desc: "Motor semântico de triagem vocal para identificação precoce de burnout, ansiedade e riscos emocionais críticos.",
                icon: <Activity className="h-6 w-6 text-cyan-400" />
              },
              {
                title: "Governança & EU AI Act",
                desc: "O primeiro sistema de SST desenhado sob as premissas de alto risco do Regulamento IA da UE, garantindo ética e auditabilidade.",
                icon: <ShieldCheck className="h-6 w-6 text-emerald-500" />
              }
            ].map((item, i) => (
              <div key={i} className="group rounded-[32px] border border-white/5 bg-white/[0.01] p-10 transition-all hover:bg-white/[0.03] hover:border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 h-32 w-32 bg-emerald-500/5 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="mb-6 h-12 w-12 rounded-xl bg-white/[0.03] flex items-center justify-center border border-white/5">{item.icon}</div>
                <h3 className="text-2xl font-bold tracking-tight mb-4">{item.title}</h3>
                <p className="leading-relaxed text-neutral-500 group-hover:text-neutral-400 text-sm font-medium">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Impact Section */}
        <section id="compliance" className="border-y border-white/5 bg-white/[0.01] py-32 relative">
          <div className="mx-auto max-w-7xl px-6 text-center">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-emerald-500 mb-16">Padrões de Excelência AEGIS</h2>
            <div className="grid gap-16 sm:grid-cols-4">
              {[
                { label: "Otimização de Custos SST", val: "28%", icon: <Zap className="h-5 w-5" /> },
                { label: "Precisão Clínica M2.7", val: "96.4%", icon: <Activity className="h-5 w-5" /> },
                { label: "Redução de Burnout", val: "14%", icon: <BrainCircuit className="h-5 w-5" /> },
                { label: "Conformidade Act Report", val: "100%", icon: <Globe className="h-5 w-5" /> }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="text-neutral-600 mb-4">{stat.icon}</div>
                  <p className="text-5xl font-black tabular-nums tracking-tighter mb-3">{stat.val}</p>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-neutral-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex items-center gap-3">
             <div className="h-6 w-6 rounded-lg bg-emerald-500 flex items-center justify-center">
                <BrainCircuit className="h-4 w-4 text-black" />
             </div>
             <span className="font-bold tracking-tight italic">AEGIS <span className="font-light not-italic text-neutral-600">Intelligence</span></span>
           </div>
           <p className="text-[10px] uppercase font-bold tracking-widest text-neutral-600 text-center">
             &copy; 2026 AEGIS HUB Intelligence Hub. Autonomamente auditado e RGPD Comply.
           </p>
           <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest text-neutral-500">
             <Link href="#" className="hover:text-emerald-400">Termos</Link>
             <Link href="#" className="hover:text-emerald-400">Privacidade</Link>
             <Link href="#" className="hover:text-emerald-400">Auditoria</Link>
           </div>
        </div>
      </footer>
    </div>
  );
}
