import React from "react";
import { 
  Users, 
  Dumbbell, 
  Pill, 
  Bell, 
  ClipboardList, 
  UserCheck 
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: any) => void;
  activePatientName: string;
  activePatientId: string;
  onSelectPatientById: (id: string) => void;
}

export default function Sidebar({ 
  activeTab, 
  onTabChange, 
}: SidebarProps) {
  
  const menuItems = [
    { 
      id: "patients", 
      label: "환자 목록", 
      icon: Users,
      isActive: activeTab === "patients" || activeTab === "dashboard"
    },
    { 
      id: "exercise", 
      label: "운동 설정", 
      icon: Dumbbell,
      isActive: activeTab === "exercise"
    },
    { 
      id: "medication", 
      label: "복약 설정", 
      icon: Pill,
      isActive: activeTab === "medication"
    },
    { 
      id: "notifications", 
      label: "알림 설정", 
      icon: Bell,
      isActive: activeTab === "notifications"
    },
    { 
      id: "self-survey", 
      label: "자가문진 관리", 
      icon: ClipboardList,
      isActive: activeTab === "self-survey"
    },
    { 
      id: "privacy", 
      label: "개인정보 관리", 
      icon: UserCheck,
      isActive: activeTab === "privacy"
    },
  ];

  return (
    <aside className="w-60 h-screen bg-white text-slate-700 flex flex-col fixed left-0 top-0 z-10 border-r border-slate-200/80 select-none">
      {/* Top eCEN Logo (separated at the very top) */}
      <div className="px-8 pt-8 pb-6 border-b border-slate-100 flex items-center justify-start">
        <span className="text-[24px] font-black tracking-tight flex items-center gap-1 font-sans text-[#0E4B90]">
          <span>eCEN</span>
          {/* Accent square dots next to N */}
          <div className="grid grid-cols-2 gap-[2.5px] w-4.5 h-4.5 align-middle ml-1 mt-1">
            <div className="w-[7px] h-[7px] bg-[#0E4B90]"></div>
            <div className="w-[7px] h-[7px] bg-[#2FA1E4]"></div>
            <div className="w-[7px] h-[7px] bg-[#2FA1E4]"></div>
            <div className="w-[7px] h-[7px] bg-[#0E4B90]"></div>
          </div>
        </span>
      </div>

      {/* Hospital Name Header */}
      <div className="px-8 pt-10 pb-6 flex flex-col justify-start">
        <h1 className="text-[22px] font-black text-[#0D4078] tracking-tight">
          이센병원
        </h1>
      </div>

      {/* Menu / Navigation Items */}
      <nav className="flex-1 px-4 space-y-1">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center gap-3.5 px-6 py-3.5 rounded-full transition-all text-left ${
                    item.isActive 
                      ? "text-[#0E4B90] font-black bg-[#EEF2F6]/60" 
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-semibold"
                  }`}
                >
                  <item.icon 
                    size={17} 
                    strokeWidth={item.isActive ? 2.5 : 2} 
                    className={item.isActive ? "text-[#0E4B90]" : "text-slate-400"} 
                  />
                  <span className="text-[13.5px] tracking-tight">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      
      {/* Bottom Profile Details */}
      <div className="p-6 border-t border-slate-100 flex flex-col items-center">
        <div className="flex items-center gap-3 w-full px-2 mb-4">
          <div className="w-10 h-10 rounded-full border border-slate-200 overflow-hidden shrink-0">
            <img 
              src="https://images.unsplash.com/photo-1559839734-2b71f1e3c770?q=80&w=100&auto=format&fit=crop" 
              alt="Doctor" 
              className="w-full h-full object-cover grayscale"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="min-w-0">
            <p className="text-[13px] font-bold text-slate-800">
              김이센 <span className="text-[10px] text-slate-400 font-normal ml-1">조교수</span>
            </p>
          </div>
        </div>
        
        {/* Logout Button */}
        <button 
          onClick={() => alert("로그아웃 되었습니다.")}
          className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-full text-[11px] font-bold text-center transition-all shadow-sm"
        >
          로그아웃
        </button>
      </div>
    </aside>
  );
}
