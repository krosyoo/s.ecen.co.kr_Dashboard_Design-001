import React, { useState } from "react";
import { 
  Search, 
  Filter, 
  UserPlus, 
  ChevronRight, 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle, 
  SlidersHorizontal, 
  ArrowRight,
  User,
  Activity,
  FileSpreadsheet,
  Download,
  Percent,
  TrendingUp
} from "lucide-react";
import { motion } from "motion/react";
import { 
  ChartPieIcon, 
  CardiacHeartIcon, 
  SyringeIcon, 
  BandAidIcon, 
  CapsuleIcon,
  ClinicalCalendarIcon
} from "./MedicalIcon";
import { PatientData, patientsDatabase as patients } from "../data/patients";

interface PatientListProps {
  onSelectPatient: (patient: PatientData) => void;
  activePatientId: string;
}

export default function PatientList({ onSelectPatient, activePatientId }: PatientListProps) {

  const [searchTerm, setSearchTerm] = useState("");
  const [filterRisk, setFilterRisk] = useState<"All" | "High" | "Mod Risk" | "Low">("All");
  const [filterSpeed, setFilterSpeed] = useState<"All" | "Normal" | "Caution" | "At Risk">("All");

  // Filter Logic
  const filteredPatients = patients.filter((patient) => {
    const matchesSearch = patient.name.includes(searchTerm) || patient.id.toLowerCase().includes(searchTerm.toLowerCase()) || patient.condition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = filterRisk === "All" || patient.fallRisk === filterRisk;
    const matchesSpeed = filterSpeed === "All" || patient.speedStatus === filterSpeed;
    return matchesSearch && matchesRisk && matchesSpeed;
  });

  // Risk Counters
  const totalCount = patients.length;
  const highRiskCount = patients.filter(p => p.fallRisk === "High").length;
  const cautionCount = patients.filter(p => p.fallRisk === "Mod Risk").length;
  const stableCount = patients.filter(p => p.fallRisk === "Low").length;

  return (
    <div className="p-10 space-y-10" id="patient-list-container">
      {/* Upper Statistics Overview Row */}
      <div className="grid grid-cols-4 gap-6" id="patient-stats-grid">
        <div className="bg-white p-6 rounded-[32px] border border-slate-100 flex items-center justify-between shadow-[0_8px_24px_rgba(0,0,0,0.02)]" id="stat-total-card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 text-[#3F84FC] rounded-2.5xl flex items-center justify-center">
              <User size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Active Subjects</p>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">{totalCount} Patients</h3>
            </div>
          </div>
          <span className="text-xs font-bold text-[#3F84FC] bg-blue-50 px-2.5 py-1 rounded-full">{totalCount} Active</span>
        </div>

        <div className="bg-white p-6 rounded-[32px] border border-slate-100 flex items-center justify-between shadow-[0_8px_24px_rgba(0,0,0,0.02)]" id="stat-highrisk-card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-rose-50 text-[#FF5B9F] rounded-2.5xl flex items-center justify-center">
              <AlertCircle size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">High Fall Risk</p>
              <h3 className="text-2xl font-black text-[#FF5B9F] tracking-tight mt-0.5">{highRiskCount} Patients</h3>
            </div>
          </div>
          <span className="text-xs font-bold text-[#FF5B9F] bg-rose-50 px-2.5 py-1 rounded-full">At Risk</span>
        </div>

        <div className="bg-white p-6 rounded-[32px] border border-slate-100 flex items-center justify-between shadow-[0_8px_24px_rgba(0,0,0,0.02)]" id="stat-caution-card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-50 text-[#FBA25E] rounded-2.5xl flex items-center justify-center">
              <AlertTriangle size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Moderate Caution</p>
              <h3 className="text-2xl font-black text-[#FBA25E] tracking-tight mt-0.5">{cautionCount} Patients</h3>
            </div>
          </div>
          <span className="text-xs font-bold text-[#FBA25E] bg-amber-50 px-2.5 py-1 rounded-full">Caution</span>
        </div>

        <div className="bg-white p-6 rounded-[32px] border border-slate-100 flex items-center justify-between shadow-[0_8px_24px_rgba(0,0,0,0.02)]" id="stat-stable-card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-2.5xl flex items-center justify-center">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Stable Controls</p>
              <h3 className="text-2xl font-black text-emerald-500 tracking-tight mt-0.5">{stableCount} Patients</h3>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">Low Risk</span>
        </div>
      </div>

      {/* Main Filter and Controls Header */}
      <div className="bg-white rounded-[40px] p-8 border border-slate-50 shadow-[0_12px_40px_rgba(0,0,0,0.02)] space-y-6" id="patients-controls-panel">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Clinical Subject Registry</h2>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Monitor and navigate patient metrics safely</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search by name, ID, or clinical status..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-80 h-11 pl-11 pr-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold placeholder-slate-400 focus:outline-none focus:border-[#3F84FC] focus:bg-white transition-all"
                id="patient-search-input"
              />
            </div>

            <button className="h-11 px-5 border-2 border-slate-100 text-slate-400 rounded-2xl text-xs font-bold flex items-center gap-2 hover:border-slate-200 hover:text-slate-600 transition-all">
              <Download size={14} />
              Export Directory
            </button>
            
            <button className="h-11 px-6 bg-[#3F84FC] text-white rounded-2xl text-xs font-black uppercase tracking-wider flex items-center gap-2 hover:bg-[#2F74EC] transition-all shadow-lg shadow-blue-500/10">
              <UserPlus size={16} />
              Register Patient
            </button>
          </div>
        </div>

        {/* Filter Badges Strip */}
        <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-slate-50" id="filter-badges-area">
          <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <SlidersHorizontal size={12} />
            <span>Fall Risk:</span>
          </div>
          <div className="flex gap-2">
            {(["All", "High", "Mod Risk", "Low"] as const).map((risk) => (
              <button
                key={risk}
                id={`filter-risk-${risk.replace(" ", "-")}`}
                onClick={() => setFilterRisk(risk)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  filterRisk === risk
                    ? "bg-slate-900 text-white"
                    : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                }`}
              >
                {risk === "All" ? "Show All" : risk}
              </button>
            ))}
          </div>

          <div className="h-4 w-[1px] bg-slate-200" />

          <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <Activity size={12} />
            <span>Gait Velocity:</span>
          </div>
          <div className="flex gap-2">
            {(["All", "Normal", "Caution", "At Risk"] as const).map((speed) => (
              <button
                key={speed}
                id={`filter-speed-${speed}`}
                onClick={() => setFilterSpeed(speed)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  filterSpeed === speed
                    ? "bg-[#3F84FC] text-white"
                    : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                }`}
              >
                {speed === "All" ? "All Speeds" : speed}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Patient Grid / Registry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" id="patients-cards-grid">
        {filteredPatients.length > 0 ? (
          filteredPatients.map((patient, index) => {
            const isActive = patient.id === activePatientId;
            return (
              <motion.div
                key={patient.id}
                id={`patient-card-${patient.id}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`bg-white rounded-[40px] p-6 border ${
                  isActive ? "border-[#3F84FC] ring-2 ring-[#3F84FC]/10" : "border-slate-100/80"
                } shadow-[0_8px_32px_rgba(0,0,0,0.01)] flex flex-col justify-between hover:shadow-[0_12px_40px_rgba(0,0,0,0.03)] hover:-translate-y-0.5 transition-all duration-300`}
              >
                {/* Header section with name and active badge */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-2xl ${patient.avatarColor} flex items-center justify-center text-white font-black text-xs shadow-md shrink-0`}>
                      {patient.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-base font-bold text-slate-900 truncate">{patient.name}</h3>
                        <span className="text-[8px] font-black uppercase tracking-wider text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded shrink-0">
                          {patient.id}
                        </span>
                      </div>
                      <p className="text-[9px] font-semibold text-[#3F84FC] uppercase tracking-wider mt-0.5 truncate">
                        {patient.condition}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Patient Body Info Row */}
                <div className="grid grid-cols-3 gap-2 py-3 border-t border-b border-slate-50 mb-4 text-[11px]">
                  <div className="flex flex-col min-w-0">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest truncate">Age/Gen</span>
                    <span className="font-black text-slate-800 mt-0.5 truncate">
                      {patient.age}Y({patient.gender === "Male" ? "남" : "여"})
                    </span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest truncate">Surg.Date</span>
                    <span className="font-black text-slate-800 mt-0.5 truncate" title={patient.surgeryDate}>{patient.surgeryDate}</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest truncate">Surg.Site</span>
                    <span className="font-black text-slate-800 mt-0.5 truncate" title={patient.surgicalSite}>{patient.surgicalSite}</span>
                  </div>
                </div>

                {/* Key Metrics Columns */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2.5xl">
                    <div className="flex items-center gap-3">
                      {patient.speedStatus === "Normal" && <div className="w-[6px] h-[6px] rounded-full bg-emerald-500" />}
                      {patient.speedStatus === "Caution" && <div className="w-[6px] h-[6px] rounded-full bg-[#FBA25E]" />}
                      {patient.speedStatus === "At Risk" && <div className="w-[6px] h-[6px] rounded-full bg-[#FF5B9F]" />}
                      <span className="text-xs font-bold text-slate-600">Gait Velocity</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-black text-slate-900">{patient.gaitSpeed}</span>
                      <span className={`text-[9px] font-black tracking-widest uppercase px-2 py-0.5 rounded-full ${
                        patient.speedStatus === "Normal" ? "text-emerald-600 bg-emerald-50" :
                        patient.speedStatus === "Caution" ? "text-[#FBA25E] bg-amber-50" : 
                        "text-[#FF5B9F] bg-rose-50"
                      }`}>
                        {patient.speedStatus}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2.5xl">
                    <div className="flex items-center gap-3">
                      {patient.fallRisk === "Low" && <div className="w-[6px] h-[6px] rounded-full bg-emerald-500" />}
                      {patient.fallRisk === "Mod Risk" && <div className="w-[6px] h-[6px] rounded-full bg-[#FBA25E]" />}
                      {patient.fallRisk === "High" && <div className="w-[6px] h-[6px] rounded-full bg-[#FF5B9F]" />}
                      <span className="text-xs font-bold text-slate-600">Stability & Fall Risk</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-black text-slate-900">{patient.fallRisk} Risk</span>
                      <span className={`text-[9px] font-black tracking-widest uppercase px-2 py-0.5 rounded-full ${
                        patient.fallRisk === "Low" ? "text-emerald-600 bg-emerald-50" :
                        patient.fallRisk === "Mod Risk" ? "text-[#FBA25E] bg-amber-50" : 
                        "text-[#FF5B9F] bg-rose-50"
                      }`}>
                        {patient.fallRisk}
                      </span>
                    </div>
                  </div>
                </div>

                {/* CTA Action Bar */}
                <div className="flex gap-3">
                  <button 
                    onClick={() => onSelectPatient(patient)}
                    id={`btn-select-analysis-${patient.id}`}
                    className={`flex-1 h-11 rounded-2.5xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                      isActive 
                        ? "bg-[#3F84FC] text-white hover:bg-[#2F74EC] shadow-md shadow-blue-500/10"
                        : "bg-slate-955 bg-slate-900 text-white hover:bg-black"
                    }`}
                  >
                    <span>View Analysis Dashboard</span>
                    <ArrowRight size={14} />
                  </button>
                  <button className="px-5 h-11 border-2 border-slate-100 text-slate-400 hover:text-slate-700 hover:border-slate-200 rounded-2.5xl transition-colors">
                    <FileSpreadsheet size={15} />
                  </button>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="col-span-full bg-white rounded-[40px] p-20 border border-slate-100 flex flex-col items-center justify-center text-center space-y-4 shadow-[0_8px_32px_rgba(0,0,0,0.01)]" id="no-patients-found">
            <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
              <Search size={28} />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900">No subjects matching filter</h3>
              <p className="text-xs text-slate-400">Try adjusting your search keywords or risk status filters</p>
            </div>
            <button 
              onClick={() => { setSearchTerm(""); setFilterRisk("All"); setFilterSpeed("All"); }}
              className="mt-2 text-xs font-bold text-[#3F84FC] hover:underline"
            >
              Reset Search Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
