"use client";

import { useState, useTransition } from "react";
import { BrainCircuit, ChevronRight, Lock, AlertCircle, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { updatePasswordAction } from "../actions";

export default function ResetPasswordPage() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setError(null);
    startTransition(async () => {
      const result = await updatePasswordAction(formData);
      if (result?.error) {
        setError(result.error);
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white selection:bg-emerald-500/30 flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* 🌌 Intelligence Grid Background */}
      <div className="absolute inset-0 z-0 opacity-20" 
           style={{ backgroundImage: 'linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-[#020202] to-[#020202]" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-[440px] relative z-10"
      >
        {/* 🏆 Header Area */}
        <div className="flex flex-col items-center mb-10">
          <div className="h-14 w-14 rounded-[20px] bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)] mb-6">
             <BrainCircuit className="h-8 w-8 text-black" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight italic uppercase tracking-tighter">AEGIS <span className="font-light not-italic text-neutral-500 tracking-normal">HUB</span></h1>
          <p className="text-neutral-500 text-sm mt-3 text-center">
            Defina uma nova credencial de segurança no ecossistema seguro AEGIS HUB.
          </p>
        </div>

        {/* 💎 Deep Glassmorphism Card */}
        <div className="rounded-[40px] border border-white/10 bg-white/[0.02] backdrop-blur-3xl p-10 shadow-[0_32px_128px_rgba(0,0,0,0.8)]">
          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mb-8 flex items-center gap-3 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
              >
                <AlertCircle className="h-5 w-5 shrink-0" />
                <p>{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <form action={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Nova Palavra-passe</label>
              <div className="relative group/input">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-600 group-focus-within/input:text-emerald-400 transition-colors duration-300" />
                <input 
                  name="password" 
                  type="password" 
                  placeholder="••••••••" 
                  required 
                  className="w-full h-14 rounded-2xl bg-black/40 border border-white/5 pl-12 pr-5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 placeholder:text-neutral-700" 
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isPending}
              className="w-full h-14 rounded-2xl bg-emerald-500 font-extrabold text-black hover:bg-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all flex items-center justify-center gap-3 group/btn disabled:opacity-50"
            >
              {isPending ? (
                <div className="h-6 w-6 border-3 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  <span className="uppercase">Confirmar Nova Credencial</span>
                  <ChevronRight className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>
          </form>

          {/* 🛡️ Compliance context */}
          <div className="mt-8 text-center">
            <p className="text-[9px] text-neutral-600 uppercase tracking-widest leading-relaxed">
              Esta operação é auditada pelo protocolo de segurança AEGIS. Mudanças de credenciais são registadas para fins de conformidade RGPD.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
