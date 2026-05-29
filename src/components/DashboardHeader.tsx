import { Search, BellRing, PlusCircle, Filter } from "lucide-react";

export default function DashboardHeader() {
  return (
    <div className="bg-transparent h-24 flex items-center px-10">
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">eCEN Dashboard</h1>
          <p className="text-sm text-slate-500 font-medium tracking-tight">Gait Analysis: <span className="text-slate-900 font-bold">김이센</span></p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <button className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-100 text-slate-400 hover:text-slate-900 hover:border-slate-300 transition-all">
              <Search size={18} />
            </button>
            <button className="relative w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-100 text-slate-400 hover:text-slate-900 hover:border-slate-300 transition-all">
              <BellRing size={18} />
              <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 border-2 border-white rounded-full" />
            </button>
            <button className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-100 text-slate-400 hover:text-slate-900 hover:border-slate-300 transition-all">
              <Filter size={18} />
            </button>
          </div>
          <button className="bg-[#3F84FC] text-white rounded-xl px-6 h-10 flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:bg-[#2F74EC] transition-all shadow-lg shadow-blue-500/10">
            <PlusCircle size={16} strokeWidth={3} />
            New Analysis
          </button>
        </div>
      </div>
    </div>
  );
}
