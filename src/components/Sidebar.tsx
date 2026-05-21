import { Users, Stethoscope, Settings2, LogOut, LayoutGrid, Search, BellRing, ChevronRight, HeartPulse } from "lucide-react";
import { motion } from "motion/react";

const menuItems = [
  { icon: LayoutGrid, label: "Dashboard", active: true },
  { icon: Users, label: "Patients" },
  { icon: Stethoscope, label: "Analysis" },
  { icon: BellRing, label: "Notifications" },
  { icon: Settings2, label: "Settings" },
];

const activePatients = [
  { name: "가나다", initial: "가", color: "bg-blue-400" },
  { name: "나다라", initial: "나", color: "bg-emerald-400" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-white text-slate-700 flex flex-col fixed left-0 top-0 z-10 border-r border-slate-200/60 transition-all">
      {/* Logo */}
      <div className="h-20 flex items-center px-8">
        <div className="w-8 h-8 bg-[#3F84FC] rounded-xl flex items-center justify-center mr-3 shadow-lg shadow-blue-500/20">
          <HeartPulse size={18} className="text-white" />
        </div>
        <span className="font-bold text-xl tracking-tight text-slate-900 uppercase">ECEN.IO</span>
      </div>

      {/* Profile Section Short - Active Subject */}
      <div className="px-6 py-6 border-b border-slate-100">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-2">Active Subject</p>
        <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="w-10 h-10 rounded-full bg-[#3F84FC] flex items-center justify-center text-white font-bold text-sm shadow-sm shadow-blue-500/10">가</div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-800 truncate">가나다</p>
            <p className="text-[10px] text-slate-400 truncate">ECEN0001</p>
          </div>
          <ChevronRight size={14} className="text-slate-400" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-8 px-4 space-y-8 overflow-y-auto">
        <div>
          <ul className="space-y-1">
            {menuItems.map((item, index) => (
              <li key={index}>
                <button
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                    item.active 
                      ? "bg-[#3F84FC] text-white font-bold shadow-md shadow-blue-500/15" 
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                  }`}
                >
                  <item.icon size={18} strokeWidth={item.active ? 2.5 : 2} className={item.active ? "text-white" : "text-slate-400"} />
                  <span className="text-[13px]">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Recently Viewed / Patients Section */}
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-4">Recent Tests</p>
          <div className="space-y-3 px-2">
            {activePatients.map((patient, i) => (
              <div key={i} className="flex items-center gap-3 group cursor-pointer hover:bg-slate-50 p-2 rounded-2xl transition-colors">
                <div className={`w-8 h-8 rounded-full ${patient.color} flex items-center justify-center text-white text-[10px] font-bold ring-2 ring-white ring-offset-2 ring-offset-transparent`}>
                  {patient.initial}
                </div>
                <span className="text-xs font-semibold text-slate-600 group-hover:text-slate-900 transition-colors">{patient.name}</span>
              </div>
            ))}
            <button className="w-8 h-8 rounded-full border border-dashed border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:border-slate-400 transition-all ml-2">
              <span className="text-lg leading-none">+</span>
            </button>
          </div>
        </div>
      </nav>
      
      {/* Bottom Profile */}
      <div className="p-4 mt-auto">
        <div className="bg-slate-50 border border-slate-100 rounded-3xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-200 border border-slate-200 overflow-hidden relative group">
             <img 
               src="https://images.unsplash.com/photo-1559839734-2b71f1e3c770?q=80&w=100&auto=format&fit=crop" 
               alt="Doctor" 
               className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
               referrerPolicy="no-referrer"
             />
             <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-bold text-slate-800 truncate">Dr. Kim E-sen</p>
            <p className="text-[9px] text-slate-400 truncate">Senior Radiologist</p>
          </div>
          <button className="text-slate-400 hover:text-rose-500 transition-colors">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}
