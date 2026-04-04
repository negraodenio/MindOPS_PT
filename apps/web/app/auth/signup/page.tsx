"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { BrainCircuit, ChevronRight, Lock, Mail, User, Briefcase, AlertCircle, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { signUpAction } from "../actions";

export default function SignUpPage() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setError(null);
    setSuccess(null);
    startTransition(async () => {
      const result = await signUpAction(formData);
      if (result?.error) {
        setError(result.error);
      } else if (result?.success) {
        setSuccess(result.success);
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
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[480px] relative z-10 py-12"
      >
        {/* 🏆 Header Area */}
        <div className="flex flex-col items-center mb-10">
          <div className="h-14 w-14 rounded-[20px] bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)] mb-6">
             <BrainCircuit className="h-8 w-8 text-black" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight italic uppercase tracking-tighter">AEGIS <span className="font-light not-italic text-neutral-500 tracking-normal">HUB</span></h1>
          <p className="text-neutral-500 text-sm mt-3 text-center max-w-sm">
            Inicie a vigilância ativa inteligente na sua organização com o Protocolo AEGIS HUB. 
          </p>
        </div>

        {/* 💎 Deep Glassmorphism Card */}
        <div className="rounded-[40px] border border-white/10 bg-white/[0.02] backdrop-blur-3xl p-10 shadow-[0_32px_128px_rgba(0,0,0,0.8)] relative overflow-hidden">
          
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

            {success && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mb-8 flex items-center gap-3 p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm"
              >
                <CheckCircle2 className="h-5 w-5 shrink-0" />
                <div className="flex flex-col gap-1">
                   <p className="font-bold">Conta solicitada com sucesso!</p>
                   <p className="text-neutral-400 text-xs">{success}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!success && (
            <form action={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Nome Completo</label>
                  <div className="relative group/input">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-600 group-focus-within/input:text-emerald-400 transition-colors" />
                    <input name="fullName" type="text" placeholder="Seu nome" required className="w-full h-12 rounded-xl bg-black/40 border border-white/5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all placeholder:text-neutral-700" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Cargo / Função</label>
                  <div className="relative group/input">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-600 group-focus-within/input:text-emerald-400 transition-colors" />
                    <input name="role" type="text" placeholder="Ex: Gestor de RH" required className="w-full h-12 rounded-xl bg-black/40 border border-white/5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all placeholder:text-neutral-700" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">E-mail Profissional</label>
                  <div className="relative group/input">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-600 group-focus-within/input:text-emerald-400 transition-colors" />
                    <input name="email" type="email" placeholder="email@empresa.pt" required className="w-full h-12 rounded-xl bg-black/40 border border-white/5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all placeholder:text-neutral-700" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Palavra-passe</label>
                  <div className="relative group/input">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-600 group-focus-within/input:text-emerald-400 transition-colors" />
                    <input name="password" type="password" placeholder="••••••••" required className="w-full h-12 rounded-xl bg-black/40 border border-white/5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all placeholder:text-neutral-700" />
                  </div>
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
                  <span className="uppercase">Requisitar Acesso AEGIS HUB Auditado</span>
                  <ChevronRight className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                </>
                )}
              </motion.button>
            </form>
          )}

          {/* 🛡️ Privacy Context */}
          <div className="mt-8 text-center">
            <p className="text-[9px] text-neutral-600 uppercase tracking-widest leading-relaxed">
              Ao registar-se, concorda com os protocolos de vigilância da Lei 102/2009 e os termos de privacidade do RGPD.
            </p>
          </div>
        </div>

        {/* 🔗 Footer Link */}
        <div className="mt-8 text-center text-sm">
          <span className="text-neutral-500">Já possui uma conta ativa no AEGIS HUB?</span>
          <Link href="/auth/login" className="ml-2 text-emerald-400 font-bold hover:underline transition-all">
            Inicie a Sessão
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
