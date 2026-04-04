"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { BrainCircuit, ChevronRight, Lock, Mail, AlertCircle, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { loginAction } from "../actions";

export default function LoginPage() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setError(null);
    startTransition(async () => {
      const result = await loginAction(formData);
      if (result?.error) {
        setError(result.error);
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white selection:bg-emerald-500/30 flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* 🌌 Animated Intelligence Grid Background */}
      <div className="absolute inset-0 z-0 opacity-20" 
           style={{ backgroundImage: 'linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-[#020202] to-[#020202]" />

      {/* 💫 Dynamic Orbs */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] h-[600px] w-[600px] rounded-full bg-emerald-500/10 blur-[120px]" 
      />
      <motion.div 
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[-10%] right-[-10%] h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-[120px]" 
      />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[460px] relative z-10"
      >
        {/* 🏆 Header / Logo Area */}
        <div className="flex flex-col items-center mb-10">
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="h-16 w-16 rounded-[22px] bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)] mb-6 cursor-pointer"
          >
             <BrainCircuit className="h-9 w-9 text-black" />
          </motion.div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent italic uppercase tracking-tighter">
            AEGIS <span className="font-light not-italic text-neutral-500 ml-1 tracking-normal">HUB</span>
          </h1>
          <div className="mt-2 flex items-center gap-2 text-neutral-500 text-sm">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            <span>Protocolo de Segurança Ativa</span>
          </div>
        </div>

        {/* 💎 Deep Glassmorphism Card */}
        <div className="rounded-[40px] border border-white/10 bg-white/[0.02] backdrop-blur-3xl p-10 shadow-[0_32px_128px_rgba(0,0,0,0.8)] relative overflow-hidden group">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                className="mb-8 flex items-center gap-3 p-5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
              >
                <AlertCircle className="h-5 w-5 shrink-0" />
                <p className="font-medium">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <form action={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-[0.2em] ml-1" htmlFor="email">
                Identidade Corporativa
              </label>
              <div className="relative group/input">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-600 group-focus-within/input:text-emerald-400 transition-colors duration-300" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="exemplo@empresa.pt"
                  required
                  className="w-full h-14 rounded-2xl bg-black/40 border border-white/5 pl-12 pr-5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/40 transition-all duration-300 placeholder:text-neutral-700"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-[0.2em]" htmlFor="password">
                  Palavra-passe
                </label>
                <Link href="/auth/forgot-password" 
                      className="text-[11px] font-bold text-neutral-600 hover:text-emerald-400 transition-colors duration-300 uppercase tracking-wider">
                  Recuperar?
                </Link>
              </div>
              <div className="relative group/input">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-600 group-focus-within/input:text-emerald-400 transition-colors duration-300" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="w-full h-14 rounded-2xl bg-black/40 border border-white/5 pl-12 pr-5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/40 transition-all duration-300 placeholder:text-neutral-700"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isPending}
              className="w-full h-14 rounded-2xl bg-emerald-500 font-extrabold text-black hover:bg-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.35)] transition-all flex items-center justify-center gap-3 overflow-hidden group/btn disabled:opacity-50"
            >
              {isPending ? (
                <div className="h-6 w-6 border-3 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  <span className="tracking-tight uppercase">Aceder Ecossistema AEGIS</span>
                  <ChevronRight className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>
          </form>

          {/* 🛡️ Compliance Footer */}
          <div className="mt-10 pt-8 border-t border-white/10 flex flex-col items-center text-center">
            <p className="text-[10px] text-neutral-600 leading-relaxed tracking-wider uppercase">
              Vigilância Ativa AEGIS HUB integrada à Lei 102/2009 e EU AI Act. 
              Segurança certificada pela ACT e RGPD.
            </p>
          </div>
        </div>

        {/* 🔗 Secondary Actions */}
        <div className="mt-8 flex items-center justify-center gap-2 text-sm">
          <span className="text-neutral-500">Novo no AEGIS HUB?</span>
          <Link href="/auth/signup" className="text-emerald-400 font-bold hover:text-emerald-300 hover:underline transition-all">
            Solicitar Acesso Corporativo
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
