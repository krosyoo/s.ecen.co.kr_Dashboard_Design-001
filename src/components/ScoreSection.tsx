import { motion } from "motion/react";
import { Footprints } from "lucide-react";
import { ClinicalStethoscopeIcon, FallRiskAlertIcon, ClinicalBalanceIcon } from "./MedicalIcon";

export default function ScoreSection() {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between px-2">
        <div className="flex flex-col">
          <h3 className="text-xl font-black text-slate-900 tracking-tight">System Diagnostics</h3>
          <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mt-1">Gait Quality Summary</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Real-time Analysis</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Composite Score Card */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[40px] p-8 card-shadow border border-slate-50 flex flex-col group transition-all duration-300 hover:-translate-y-1"
        >
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3.5">
              <ClinicalStethoscopeIcon size="sm" />
              <span className="text-lg font-bold text-slate-900">복합 보행점수</span>
            </div>
            <span className="bg-[#FFF4E6] text-[#FBA25E] text-[10px] font-black px-2.5 py-1 rounded-full border border-[#FBA25E]/20 uppercase tracking-widest">Caution</span>
          </div>

          <div className="mb-6 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 tracking-tighter">65</span>
            <span className="text-base text-slate-500 font-bold">/ 100</span>
          </div>

          <div className="space-y-6">
            <div className="relative">
              <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                 <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: "65%" }}
                   className="h-full bg-[#FBA25E]"
                 />
              </div>
              <div className="absolute left-[80%] top-[-4px] bottom-[-4px] w-0.5 bg-slate-200" />
              <div className="flex justify-between mt-2 text-[10px] font-bold text-slate-600">
                <span>0</span>
                <span className="text-slate-600">정상 ≥ 80</span>
                <span>100</span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 pt-2">
              {[
                { label: '속도', value: '19.9 / 25', color: 'bg-[#1E40AF]', width: '79.6%' },
                { label: '대칭', value: '14.8 / 25', color: 'bg-[#2563EB]', width: '59.2%' },
                { label: '안정', value: '15.0 / 25', color: 'bg-[#3F84FC]', width: '60%' },
                { label: '규칙', value: '15.0 / 25', color: 'bg-[#60A5FA]', width: '60%' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-[11px] font-bold text-slate-500 mb-1.5">{item.label}</span>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mb-1.5">
                    <div className={`h-full ${item.color}`} style={{ width: item.width }} />
                  </div>
                  <span className="text-[10px] font-bold text-slate-600">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Fall Risk Card */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-[40px] p-8 card-shadow border border-slate-50 flex flex-col group transition-all duration-300 hover:-translate-y-1"
        >
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3.5">
              <FallRiskAlertIcon size="sm" />
              <span className="text-lg font-bold text-slate-900">낙상 위험</span>
            </div>
            <span className="bg-[#FFEBEB] text-[#FF5B9F] text-[10px] font-black px-2.5 py-1 rounded-full border border-[#FF5B9F]/20 uppercase tracking-widest">Mod Risk</span>
          </div>

          <div className="mb-2">
            <h4 className="text-3xl font-black text-[#FBA25E] tracking-tighter">보통</h4>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">(Moderate Level)</p>
          </div>

          <p className="text-[12px] text-slate-500 font-medium leading-relaxed my-6 line-clamp-2">
            S1 task의 cadence 기반 임상 risk 판정. 보조 지표로 보행 속도와 변동성을 함께 확인하세요.
          </p>

          <div className="mt-auto grid grid-cols-2 gap-3">
             <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100">
               <span className="text-[9px] font-black text-slate-400 uppercase block mb-1">Velocity</span>
               <span className="text-xs font-bold text-slate-900">0.955 m/s</span>
             </div>
             <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100">
               <span className="text-[9px] font-black text-slate-400 uppercase block mb-1">Str Time CV</span>
               <span className="text-xs font-bold text-slate-900">25.3 %</span>
             </div>
          </div>
        </motion.div>

        {/* Stability & Symmetry Card */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-[40px] p-8 card-shadow border border-slate-50 flex flex-col group transition-all duration-300 hover:-translate-y-1"
        >
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3.5">
              <ClinicalBalanceIcon size="sm" />
              <span className="text-lg font-bold text-slate-900">안정성 & 대칭성</span>
            </div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Stride Level</span>
          </div>

          <div className="space-y-6">
            <div className="bg-[#FFEBEB]/40 rounded-2xl p-4 border border-[#FF5B9F]/10">
               <div className="flex justify-between items-center mb-1">
                 <span className="text-[12px] font-bold text-slate-600">규칙성 (Cadence)</span>
                 <span className="text-sm font-black text-[#FF5B9F]">17.9%</span>
               </div>
               <div className="h-1 bg-white rounded-full overflow-hidden">
                 <div className="h-full bg-[#FF5B9F]" style={{ width: '80%' }} />
               </div>
            </div>

            <div className="bg-[#FFF4E6]/40 rounded-2xl p-4 border border-[#FBA25E]/10">
               <div className="flex justify-between items-center mb-1">
                 <span className="text-[12px] font-bold text-slate-600">비대칭 (AI)</span>
                 <span className="text-sm font-black text-[#FBA25E]">7.62%</span>
               </div>
               <div className="h-1 bg-white rounded-full overflow-hidden">
                 <div className="h-full bg-[#FBA25E]" style={{ width: '45%' }} />
               </div>
            </div>

            <button className="w-full h-8 flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-[#3F84FC] transition-colors">
              <Footprints size={12} />
              Full Analysis Trace
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

