import { Activity } from "lucide-react";
import { motion } from "motion/react";
import { SyringeIcon, BandAidIcon, ClinicalCalendarIcon } from "./MedicalIcon";

interface SubjectProfileProps {
  name: string;
  id: string;
  age: number;
  gender: "Male" | "Female";
  condition: string;
  surgeryDate: string;
  surgicalSite: string;
  assessmentDate: string;
}

export default function SubjectProfile({
  name,
  id,
  age,
  gender,
  condition,
  surgeryDate,
  surgicalSite,
  assessmentDate
}: SubjectProfileProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[40px] p-8 card-shadow border border-slate-50 flex flex-col lg:flex-row items-stretch lg:items-center gap-12"
      id="subject-profile-root"
    >
      {/* Profile Image & Basic Info */}
      <div className="flex items-center gap-6 border-b lg:border-b-0 lg:border-r border-slate-100 pb-6 lg:pb-0 lg:pr-12">
        <div className="w-24 h-24 rounded-full bg-slate-100 p-1 relative shadow-inner shrink-0">
          <div className="w-full h-full rounded-full overflow-hidden bg-slate-250 flex items-center justify-center text-[#3F84FC] font-black text-2xl">
            {name.charAt(0)}
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#3F84FC] rounded-full border-4 border-white flex items-center justify-center text-white shadow-lg">
            <Activity size={14} />
          </div>
        </div>
        
        <div className="flex flex-col">
          <h4 className="text-3xl font-black text-slate-900 tracking-tight leading-none mb-2" id="profile-name">{name}</h4>
          <p className="text-sm text-slate-400 font-bold uppercase tracking-widest leading-none mb-2" id="profile-id">Subject {id}</p>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-white bg-[#3F84FC] px-2.5 py-0.5 rounded-full uppercase tracking-widest">Active</span>
            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full uppercase tracking-widest">
              {gender === "Male" ? "Male" : "Female"} ({age}Y)
            </span>
          </div>
        </div>
      </div>

      {/* Vital Stats Grid */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div className="flex items-center gap-4 group" id="profile-stat-surgery-date">
          <SyringeIcon />
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Surgery Date (수술 일자)</span>
            <span className="text-base font-black text-slate-900 tracking-tight">{surgeryDate}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4 group" id="profile-stat-surgical-site">
          <BandAidIcon />
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Surgical Site (수술 부위)</span>
            <span className="text-base font-black text-slate-900 tracking-tight">{surgicalSite}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 group" id="profile-stat-date">
          <ClinicalCalendarIcon />
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Assessment Date (측정 일자)</span>
            <span className="text-base font-black text-slate-900 tracking-tight">{assessmentDate}</span>
          </div>
        </div>
      </div>

      {/* Action Area */}
      <div className="border-t lg:border-t-0 lg:border-l border-slate-100 pt-6 lg:pt-0 lg:pl-12 flex flex-row lg:flex-col gap-2 shrink-0 justify-end">
         <button className="h-10 px-6 bg-[#3F84FC] text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#2F74EC] transition-all shadow-md shadow-blue-500/10" id="btn-edit-profile">
           Edit Profile
         </button>
         <button className="h-10 px-6 border-2 border-slate-100 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:border-slate-200 hover:text-slate-600 transition-all" id="btn-sub-history">
           Subject History
         </button>
      </div>
    </motion.div>
  );
}
