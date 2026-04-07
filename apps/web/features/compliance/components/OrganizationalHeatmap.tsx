"use client";

import React from 'react';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle2, 
  Activity, 
  TrendingUp, 
  Users, 
  Lock,
  ArrowUpRight,
  Filter
} from 'lucide-react';

interface TeamRisk {
  name: string;
  score: number;
  trend: 'up' | 'down' | 'stable';
  status: 'critical' | 'high' | 'medium' | 'low';
}

export function OrganizationalHeatmap() {
  const teams: TeamRisk[] = [
    { name: 'Engenharia de Software (Lisboa)', score: 78, trend: 'up', status: 'high' },
    { name: 'Customer Support (Porto)', score: 85, trend: 'up', status: 'critical' },
    { name: 'Vendas & Marketing', score: 42, trend: 'down', status: 'medium' },
    { name: 'Recursos Humanos', score: 18, trend: 'stable', status: 'low' },
    { name: 'Operações Industriais', score: 55, trend: 'up', status: 'medium' },
    { name: 'Legal & Compliance', score: 12, trend: 'down', status: 'low' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0c10] text-slate-300 font-sans p-6 md:p-10">
      {/* Top Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <div className="flex items-center gap-2 text-emerald-500 mb-1">
            <Lock className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">System.Integrity.Active</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tighter">Organizational Risk Heatmap</h1>
        </div>
        <div className="flex gap-3">
          <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all">
            <Filter className="w-4 h-4" /> Filtrar
          </button>
          <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-emerald-600/20">
            Gerar Relatório ACT
          </button>
        </div>
      </div>

      {/* KPI Row (Alta Densidade) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {[
          { label: 'Composite Risk Index', value: '64.2', sub: '+4.1% vs mês anterior', color: 'text-red-400', icon: Activity },
          { label: 'Compliance Readiness', value: '94%', sub: 'Target: 100% (EU AI Act)', color: 'text-emerald-400', icon: Shield },
          { label: 'Active Alerts', value: '12', sub: '3 Críticos em Engenharia', color: 'text-amber-400', icon: AlertTriangle },
          { label: 'Assessed Capital', value: '428', sub: '89% do Headcount total', color: 'text-blue-400', icon: Users },
        ].map((kpi, idx) => (
          <div key={idx} className="bg-slate-900/50 border border-white/5 p-6 rounded-2xl relative overflow-hidden group">
            <div className="flex flex-col gap-1 relative z-10">
               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{kpi.label}</span>
               <div className="flex items-baseline gap-2">
                  <span className={`text-4xl font-black ${kpi.color}`}>{kpi.value}</span>
                  <kpi.icon className={`w-5 h-5 ${kpi.color} opacity-40`} />
               </div>
               <span className="text-xs text-slate-600 font-medium">{kpi.sub}</span>
            </div>
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
               <ArrowUpRight className="w-4 h-4 text-slate-500" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Main Heatmap Grid */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-900/50 border border-white/5 p-8 rounded-3xl">
            <div className="flex justify-between items-center mb-8">
               <h3 className="text-lg font-bold text-white flex items-center gap-2">
                 <Activity className="w-5 h-5 text-emerald-500" />
                 Mapeamento por Unidade Organizacional
               </h3>
               <div className="flex gap-2">
                  {['24h', '7d', '30d', '90d'].map(t => (
                    <button key={t} className={`text-[10px] font-bold px-3 py-1 rounded-md transition-all ${t === '30d' ? 'bg-emerald-500 text-emerald-950' : 'bg-slate-800 text-slate-500 hover:text-white'}`}>
                      {t}
                    </button>
                  ))}
               </div>
            </div>

            <div className="space-y-4">
              {teams.map((team, idx) => (
                <div key={idx} className="bg-slate-950/40 p-4 rounded-xl border border-white/5 flex items-center gap-6 group hover:bg-slate-800/40 transition-all cursor-pointer">
                  <div className="w-16 h-16 rounded-xl bg-slate-900 flex items-center justify-center font-black text-xl border border-white/5">
                     {team.score}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-2">
                      <span className="font-bold text-white">{team.name}</span>
                      <span className={`text-[10px] font-black uppercase tracking-widest ${
                        team.status === 'critical' ? 'text-red-400' : 
                        team.status === 'high' ? 'text-orange-400' : 'text-emerald-400'
                      }`}>
                        {team.status}
                      </span>
                    </div>
                    <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                       <div 
                        className={`h-full transition-all duration-1000 ${
                          team.status === 'critical' ? 'bg-red-500' : 
                          team.status === 'high' ? 'bg-orange-500' : 'bg-emerald-500'
                        }`} 
                        style={{ width: `${team.score}%` }} 
                       />
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 ${team.trend === 'up' ? 'text-red-400' : 'text-emerald-400'}`}>
                    {team.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <Activity className="w-4 h-4" />}
                    <span className="text-[10px] font-bold">Trend</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Alerts / Governance */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900/50 border border-white/5 p-6 rounded-3xl">
            <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-6">AI Governance (M2.7)</h3>
            <div className="space-y-4">
               {[
                 { action: 'Audit Log Generated', time: '2m ago', icon: FileCheck },
                 { action: 'Explainability Updated', time: '14m ago', icon: Shield },
                 { action: 'Risk Pivot Detected', team: 'Engenharia', icon: AlertTriangle },
               ].map((item, idx) => (
                 <div key={idx} className="flex gap-4 items-start p-3 rounded-xl hover:bg-white/5 transition-all">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center mt-1">
                       <item.icon className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div className="flex flex-col">
                       <span className="text-xs font-bold text-white">{item.action}</span>
                       <span className="text-[10px] text-slate-600">{item.time}</span>
                    </div>
                 </div>
               ))}
            </div>
            <button className="w-full mt-6 py-3 border border-emerald-500/20 rounded-xl text-emerald-500 text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500/5 transition-all">
               View Full Audit History
            </button>
          </div>

          <div className="bg-gradient-to-br from-red-600/10 to-transparent border border-red-500/20 p-6 rounded-3xl">
             <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <h3 className="text-sm font-black text-red-500 uppercase tracking-widest">Active Risk Threats</h3>
             </div>
             <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Detectada anomalia estatística em Customer Support (Porto). Exposição elevada a fatores de fadiga mental detectada nos últimos 5 dias.
             </p>
             <button className="w-full py-3 bg-red-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 transition-all">
                Initiate Protocol 102
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
