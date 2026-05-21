import { Activity } from "lucide-react";
import { motion } from "motion/react";
import { ClinicalRulerIcon, ClinicalWeightIcon, ClinicalCalendarIcon } from "./MedicalIcon";

export default function SubjectProfile() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[40px] p-8 card-shadow border border-slate-50 flex items-center gap-12"
    >
      {/* Profile Image & Basic Info */}
      <div className="flex items-center gap-6 border-r border-slate-100 pr-12">
        <div className="w-24 h-24 rounded-full bg-slate-100 p-1 relative shadow-inner">
          <div className="w-full h-full rounded-full overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop" 
              alt="Patient Profile" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#3F84FC] rounded-full border-4 border-white flex items-center justify-center text-white shadow-lg">
            <Activity size={14} />
          </div>
        </div>
        
        <div className="flex flex-col">
          <h4 className="text-3xl font-black text-slate-900 tracking-tight leading-none mb-2">가나다</h4>
          <p className="text-sm text-slate-400 font-bold uppercase tracking-widest leading-none mb-2">Subject P102</p>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-white bg-[#3F84FC] px-2.5 py-0.5 rounded-full uppercase tracking-widest">Active</span>
            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full uppercase tracking-widest">Elderly (71Y)</span>
          </div>
        </div>
      </div>

      {/* Vital Stats Grid */}
      <div className="flex-1 grid grid-cols-3 gap-8">
        <div className="flex items-center gap-4 group">
          <ClinicalRulerIcon />
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Height</span>
            <span className="text-base font-black text-slate-900 tracking-tight">165 cm</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4 group">
          <ClinicalWeightIcon />
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Weight</span>
            <span className="text-base font-black text-slate-900 tracking-tight">52.4 kg</span>
          </div>
        </div>

        <div className="flex items-center gap-4 group">
          <ClinicalCalendarIcon />
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Next Session</span>
            <span className="text-base font-black text-slate-900 tracking-tight italic">Tomorrow</span>
          </div>
        </div>
      </div>

      {/* Action Area */}
      <div className="border-l border-slate-100 pl-12 flex flex-col gap-2">
         <button className="h-10 px-6 bg-[#3F84FC] text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#2F74EC] transition-all shadow-md shadow-blue-500/10">
           Edit Profile
         </button>
         <button className="h-10 px-6 border-2 border-slate-100 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:border-slate-200 hover:text-slate-600 transition-all">
           Subject History
         </button>
      </div>
    </motion.div>
  );
}
