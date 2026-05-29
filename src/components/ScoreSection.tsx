import { motion } from "motion/react";
import { Footprints } from "lucide-react";
import { ClinicalStethoscopeIcon, FallRiskAlertIcon, ClinicalBalanceIcon } from "./MedicalIcon";

interface ScoreSectionProps {
  scoreGait?: number;
  fallRiskLevel?: string;
  fallRiskStatus?: string;
  fallRiskColor?: string;
  gaitSpeed?: string;
  variability?: string;
  regularityVal?: number; // percentage
  asymmetryVal?: number;  // percentage
}

export default function ScoreSection({
  scoreGait = 65,
  fallRiskLevel = "보통",
  fallRiskStatus = "Mod Risk",
  fallRiskColor = "#FBA25E",
  gaitSpeed = "0.955 m/s",
  variability = "25.3 %",
  regularityVal = 17.9,
  asymmetryVal = 7.62
}: ScoreSectionProps) {
  // Translate status text to correct badges & colors
  const statusBg = fallRiskStatus === "Low Risk" ? "bg-emerald-50 text-emerald-600 border-emerald-500/20" :
                    fallRiskStatus === "High Risk" ? "bg-[#FFEBEB] text-[#FF5B9F] border-[#FF5B9F]/20" : 
                    "bg-[#FFF4E6] text-[#FBA25E] border-[#FBA25E]/20";

  const riskTextColor = fallRiskStatus === "Low Risk" ? "text-emerald-500" :
                        fallRiskStatus === "High" || fallRiskStatus === "High Risk" ? "text-[#FF5B9F]" : 
                        "text-[#FBA25E]";

  return (
    <section className="space-y-6" id="system-diagnostics-section">
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
          id="diagnostic-gait-card"
        >
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3.5">
              <ClinicalStethoscopeIcon size="sm" />
              <span className="text-lg font-bold text-slate-900">복합 보행점수</span>
            </div>
            <span className={`text-[10px] font-black px-2.5 py-1 rounded-full border uppercase tracking-widest ${
              scoreGait >= 80 ? "bg-emerald-50 text-emerald-600 border-emerald-200" :
              scoreGait >= 50 ? "bg-[#FFF4E6] text-[#FBA25E] border-[#FBA25E]/20" :
              "bg-[#FFEBEB] text-[#FF5B9F] border-[#FF5B9F]/20"
            }`}>
              {scoreGait >= 80 ? "Good" : scoreGait >= 50 ? "Caution" : "At Risk"}
            </span>
          </div>

          <div className="mb-6 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 tracking-tighter" id="gait-composite-score">{scoreGait}</span>
            <span className="text-base text-slate-500 font-bold">/ 100</span>
          </div>

          <div className="space-y-6">
            <div className="relative">
              <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                 <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: `${scoreGait}%` }}
                   className="h-full bg-[#3F84FC]"
                   style={{ backgroundColor: fallRiskColor }}
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
                { label: '속도', value: `${Math.round(scoreGait * 0.3)} / 25`, color: 'bg-[#1E40AF]', width: `${scoreGait}%` },
                { label: '대칭', value: `${Math.round(scoreGait * 0.25)} / 25`, color: 'bg-[#2563EB]', width: `${Math.max(30, scoreGait - 10)}%` },
                { label: '안정', value: `${Math.round(scoreGait * 0.23)} / 25`, color: 'bg-[#3F84FC]', width: `${Math.max(25, scoreGait - 15)}%` },
                { label: '규칙', value: `${Math.round(scoreGait * 0.22)} / 25`, color: 'bg-[#60A5FA]', width: `${scoreGait}%` },
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
          id="diagnostic-fall-card"
        >
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3.5">
              <FallRiskAlertIcon size="sm" />
              <span className="text-lg font-bold text-slate-900">낙상 위험</span>
            </div>
            <span className={`text-[10px] font-black px-2.5 py-1 rounded-full border uppercase tracking-widest ${statusBg}`}>
              {fallRiskStatus}
            </span>
          </div>

          <div className="mb-2">
            <h4 className={`text-3xl font-black tracking-tighter ${riskTextColor}`} id="fall-risk-level-display">
              {fallRiskLevel}
            </h4>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">(Fall Risk Score: {scoreGait < 50 ? "Severe" : scoreGait < 80 ? "Moderate" : "Nominal"})</p>
          </div>

          <p className="text-[12px] text-slate-500 font-medium leading-relaxed my-6 line-clamp-2">
            S1 task의 cadence 기반 임상 risk 판정. 보조 지표로 보행 속도와 변동성을 함께 확인하세요.
          </p>

          <div className="mt-auto grid grid-cols-2 gap-3">
             <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100">
               <span className="text-[9px] font-black text-slate-400 uppercase block mb-1">Velocity</span>
               <span className="text-xs font-bold text-slate-900">{gaitSpeed}</span>
             </div>
             <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100">
               <span className="text-[9px] font-black text-slate-400 uppercase block mb-1">Str Time CV</span>
               <span className="text-xs font-bold text-slate-900">{variability}</span>
             </div>
          </div>
        </motion.div>

        {/* Stability & Symmetry Card */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-[40px] p-8 card-shadow border border-slate-50 flex flex-col group transition-all duration-300 hover:-translate-y-1"
          id="diagnostic-stability-card"
        >
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3.5">
              <ClinicalBalanceIcon size="sm" />
              <span className="text-lg font-bold text-slate-900">안정성 & 대칭성</span>
            </div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Stride Level</span>
          </div>

          <div className="space-y-6">
            <div className={`rounded-2xl p-4 border ${asymmetryVal > 10 ? 'bg-[#FFEBEB]/40 border-[#FF5B9F]/10' : 'bg-emerald-50/40 border-emerald-100/40'}`}>
               <div className="flex justify-between items-center mb-1">
                 <span className="text-[12px] font-bold text-slate-600">불규칙도 (Time CV)</span>
                 <span className={`text-sm font-black ${asymmetryVal > 10 ? 'text-[#FF5B9F]' : 'text-emerald-600'}`}>{variability}</span>
               </div>
               <div className="h-1 bg-white rounded-full overflow-hidden">
                 <div className={`h-full ${asymmetryVal > 10 ? 'bg-[#FF5B9F]' : 'bg-emerald-500'}`} style={{ width: `${Math.min(100, regularityVal * 3)}%` }} />
               </div>
            </div>

            <div className={`rounded-2xl p-4 border ${asymmetryVal > 5 ? 'bg-[#FFF4E6]/40 border-[#FBA25E]/10' : 'bg-emerald-50/40 border-emerald-100/40'}`}>
               <div className="flex justify-between items-center mb-1">
                 <span className="text-[12px] font-bold text-slate-600">비대칭도 (Asymmetry)</span>
                 <span className={`text-sm font-black ${asymmetryVal > 5 ? 'text-[#FBA25E]' : 'text-emerald-600'}`}>{asymmetryVal}%</span>
               </div>
               <div className="h-1 bg-white rounded-full overflow-hidden">
                 <div className={`h-full ${asymmetryVal > 5 ? 'bg-[#FBA25E]' : 'bg-emerald-400'}`} style={{ width: `${Math.min(100, asymmetryVal * 7)}%` }} />
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

