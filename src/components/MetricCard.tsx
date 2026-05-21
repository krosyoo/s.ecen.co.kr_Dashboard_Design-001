import { MoreHorizontal } from "lucide-react";
import { motion } from "motion/react";
import React from "react";
import { 
  ChartPieIcon, 
  CardiacHeartIcon, 
  SyringeIcon, 
  BandAidIcon, 
  CapsuleIcon 
} from "./MedicalIcon";

interface MetricCardProps {
  key?: React.Key;
  label: string;
  value: string;
  subValue?: string;
  status: "Normal" | "Caution" | "At Risk";
  unit: string;
  color: "beige" | "rose" | "mint" | "sky" | "lavender";
  delay?: number;
}

export default function MetricCard({ 
  label, value, subValue, status, unit, color, delay = 0 
}: MetricCardProps) {
  const settings = {
    beige: { bg: "bg-[#FFF4E6]", bar: "bg-[#FBA25E]" },
    rose: { bg: "bg-[#FFEBEB]", bar: "bg-[#FF5B9F]" },
    mint: { bg: "bg-[#EBF9F1]", bar: "bg-emerald-500" },
    sky: { bg: "bg-[#E7F5FF]", bar: "bg-[#3F84FC]" },
    lavender: { bg: "bg-[#F3E8FF]", bar: "bg-indigo-400" },
  }[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`relative flex-1 p-8 rounded-[40px] ${settings.bg} overflow-hidden group hover:-translate-y-1 transition-all duration-300`}
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex flex-col gap-4">
          {color === "beige" && <BandAidIcon />}
          {color === "rose" && <CardiacHeartIcon />}
          {color === "mint" && <SyringeIcon />}
          {color === "sky" && <ChartPieIcon />}
          {color === "lavender" && <CapsuleIcon />}
          <p className="text-lg font-bold text-slate-900">{label}</p>
        </div>
        <button className="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center text-slate-800 hover:bg-white transition-colors">
          <MoreHorizontal size={16} />
        </button>
      </div>

      <div className="flex flex-col gap-1 mb-8">
        <h3 className="text-3xl font-black text-slate-900 tracking-tight">
          {value.split(' ')[0]}
          <span className="text-lg font-bold ml-1 opacity-40">{unit}</span>
        </h3>
        
        <div className="flex items-center gap-2 mt-2">
          <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
            status === "Normal" ? "text-emerald-600 bg-emerald-500/10" : 
            status === "Caution" ? "text-[#FBA25E] bg-[#FBA25E]/10" : 
            "text-[#FF5B9F] bg-[#FF5B9F]/10"
          }`}>
            {status}
          </span>
        </div>
      </div>

      {/* Mock Sparkline Bar Chart */}
      <div className="mt-4 flex items-end gap-1.5 h-12">
        {[20, 45, 30, 60, 40, 80, 55].map((h, i) => (
          <div 
            key={i} 
            className={`w-2.5 rounded-full ${settings.bar} transition-all group-hover:opacity-100 opacity-20`}
            style={{ height: `${h}%` }}
          />
        ))}
        <div className="ml-auto flex items-center gap-1">
          <div className="w-4 h-4 rounded-full bg-white/50 flex items-center justify-center text-slate-900">
            <span className="text-[10px] font-bold">↗</span>
          </div>
          <span className="text-xs font-bold text-slate-900 opacity-60">45%</span>
        </div>
      </div>
    </motion.div>
  );
}
