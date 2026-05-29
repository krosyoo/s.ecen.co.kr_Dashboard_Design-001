import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import PatientList from "./components/PatientList";
import GaitSecondaryAnalysis from "./components/GaitSecondaryAnalysis";
import { PatientData, patientsDatabase } from "./data/patients";
import { Dumbbell, Pill, Bell, ClipboardList, Shield, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("patients");
  const [activePatientId, setActivePatientId] = useState<string>("P102");

  const activePatient = patientsDatabase.find(p => p.id === activePatientId) || patientsDatabase[0];

  const handleSelectPatient = (patient: PatientData) => {
    setActivePatientId(patient.id);
    setActiveTab("dashboard");
  };

  const handleSelectPatientById = (id: string) => {
    setActivePatientId(id);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans">
      {/* Sidebar Navigation */}
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        activePatientName={activePatient.name}
        activePatientId={activePatient.id}
        onSelectPatientById={handleSelectPatientById}
      />

      {/* Main Content Area */}
      <main className="flex-1 ml-60 min-w-0 flex flex-col min-h-screen">
        <div className="p-8 flex-1">
          
          {/* Dashboard Tab: Show the complete custom gait analysis report */}
          {activeTab === "dashboard" && (
            <div className="space-y-6 fade-in" id="dashboard-tab-content">
              {/* Back Button to list */}
              <div className="flex justify-between items-center mb-2">
                <button 
                  onClick={() => setActiveTab("patients")}
                  className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 hover:text-[#0E4B90] transition-colors bg-slate-100 hover:bg-slate-200/80 px-3.5 py-1.5 rounded-full"
                >
                  <ArrowLeft size={12} strokeWidth={2.5} />
                  <span>환자 목록으로 가기</span>
                </button>
              </div>

              {/* The Unified Dashboard layout matching the template exactly */}
              <GaitSecondaryAnalysis patient={activePatient} />
            </div>
          )}

          {/* Patients Registry Tab */}
          {activeTab === "patients" && (
            <div className="fade-in" id="patients-tab-content">
              <PatientList 
                onSelectPatient={handleSelectPatient}
                activePatientId={activePatientId}
              />
            </div>
          )}

          {/* Dynamic Exercise Settings Tab */}
          {activeTab === "exercise" && (
            <div className="p-4 space-y-6 fade-in" id="exercise-tab-content">
              <h2 className="text-[16px] font-extrabold text-[#0E4B90] tracking-tight flex items-center gap-2">
                <span className="inline-block w-[5px] h-[16px] bg-[#2FA1E4] rounded-sm"></span>
                <span>운동 설정 - {activePatient.name} 환자</span>
              </h2>

              <div className="bg-white rounded-[24px] border border-slate-200/80 p-8 shadow-sm space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 text-[#0E4B90] rounded-2xl flex items-center justify-center">
                    <Dumbbell size={22} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">환자 운동 프로그램 관리</h3>
                    <p className="text-xs text-slate-400 font-semibold mt-0.5">매일 수행해야 하는 보행 훈련 및 근력 처방을 커스텀 빌드합니다.</p>
                  </div>
                </div>

                <div className="divide-y divide-slate-100 border-t border-slate-100 pt-3">
                  <div className="py-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-extrabold text-slate-800">트레드밀 보행 훈련 (중등도)</p>
                      <p className="text-xs text-slate-500 mt-1">지속 시간: 15분 | 목표 속도: 1.0 m/s</p>
                    </div>
                    <span className="text-xs font-bold text-[#0E4B90] bg-blue-50 px-3 py-1 rounded-full">활성화됨</span>
                  </div>
                  <div className="py-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-extrabold text-slate-800">하지 대퇴사두근 활성 스쿼트</p>
                      <p className="text-xs text-slate-500 mt-1">세트: 3회 (각 12회) | 보조 유도 밴드 사용</p>
                    </div>
                    <span className="text-xs font-bold text-[#0E4B90] bg-blue-50 px-3 py-1 rounded-full">활성화됨</span>
                  </div>
                  <div className="py-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-extrabold text-slate-800">발꿈치 기울이기 족저 안정 운동</p>
                      <p className="text-xs text-slate-500 mt-1">세트: 2회 (각 15회) | 좌측/우측 대칭 훈련</p>
                    </div>
                    <span className="text-xs font-bold text-[#0E4B90] bg-blue-50 px-3 py-1 rounded-full">활성화됨</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Dynamic Medication Settings Tab */}
          {activeTab === "medication" && (
            <div className="p-4 space-y-6 fade-in" id="medication-tab-content">
              <h2 className="text-[16px] font-extrabold text-[#0E4B90] tracking-tight flex items-center gap-2">
                <span className="inline-block w-[5px] h-[16px] bg-[#2FA1E4] rounded-sm"></span>
                <span>복약 설정 - {activePatient.name} 환자</span>
              </h2>

              <div className="bg-white rounded-[24px] border border-slate-200/80 p-8 shadow-sm space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 text-[#0E4B90] rounded-2xl flex items-center justify-center">
                    <Pill size={22} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">처방 복약 시간표</h3>
                    <p className="text-xs text-slate-400 font-semibold mt-0.5">환측 부종 및 통증 경감을 위한 맞춤 약물 안전 타임라인 조정</p>
                  </div>
                </div>

                <div className="divide-y divide-slate-100 border-t border-slate-100 pt-3">
                  <div className="py-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-extrabold text-slate-800">아침 (식후 30분)</p>
                      <p className="text-xs text-slate-500 mt-1">소염진통제 1정 + 위점막보호제 1정</p>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">승인 완료</span>
                  </div>
                  <div className="py-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-extrabold text-slate-800">점심 (식후 30분)</p>
                      <p className="text-xs text-slate-500 mt-1">근이완제 1정</p>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">승인 완료</span>
                  </div>
                  <div className="py-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-extrabold text-slate-800">저녁 (식후 30분)</p>
                      <p className="text-xs text-slate-500 mt-1">소염진통제 1정 + 위점막보호제 1정 + 혈액순환기계 보조제</p>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">승인 완료</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Dynamic Notifications Settings Tab */}
          {activeTab === "notifications" && (
            <div className="p-4 space-y-6 fade-in" id="notifications-tab-content">
              <h2 className="text-[16px] font-extrabold text-[#0E4B90] tracking-tight flex items-center gap-2">
                <span className="inline-block w-[5px] h-[16px] bg-[#2FA1E4] rounded-sm"></span>
                <span>알림 설정</span>
              </h2>

              <div className="bg-white rounded-[24px] border border-slate-200/80 p-8 shadow-sm space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 text-[#0E4B90] rounded-2xl flex items-center justify-center">
                    <Bell size={22} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">의료 및 이상 보행 비상 푸시 알림</h3>
                    <p className="text-xs text-slate-400 font-semibold mt-0.5">센서 이탈 또는 낙상 위험 환자 임계치 실시간 경보 통제</p>
                  </div>
                </div>

                <div className="divide-y divide-slate-100 border-t border-slate-100 pt-3">
                  <div className="py-4.5 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-extrabold text-slate-800">실시간 낙상 고위험 경보 수신</p>
                      <p className="text-xs text-slate-500 mt-1">대상: 전 임상 시험 환자군 병합</p>
                    </div>
                    <div className="w-10 h-6 bg-[#0E4B90] rounded-full p-1 cursor-pointer flex justify-end">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div className="py-4.5 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-extrabold text-slate-800">일일 훈련 미달성 리포트 알림</p>
                      <p className="text-xs text-slate-500 mt-1">기준: 처방 운동 진도율 50% 미만 시</p>
                    </div>
                    <div className="w-10 h-6 bg-[#0E4B90] rounded-full p-1 cursor-pointer flex justify-end">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Dynamic Self Survey Settings Tab */}
          {activeTab === "self-survey" && (
            <div className="p-4 space-y-6 fade-in" id="self-survey-tab-content">
              <h2 className="text-[16px] font-extrabold text-[#0E4B90] tracking-tight flex items-center gap-2">
                <span className="inline-block w-[5px] h-[16px] bg-[#2FA1E4] rounded-sm"></span>
                <span>자가문진 관리</span>
              </h2>

              <div className="bg-white rounded-[24px] border border-slate-200/80 p-8 shadow-sm space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 text-[#0E4B90] rounded-2xl flex items-center justify-center">
                    <ClipboardList size={22} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">무릎 기능 평가 문진 목록 (KOOS/WOMAC)</h3>
                    <p className="text-xs text-slate-400 font-semibold mt-0.5">환자가 가정에서 작성하는 관절염 및 자가 기능 수치 수집 주기를 통제합니다.</p>
                  </div>
                </div>

                <div className="divide-y divide-slate-100 border-t border-slate-100 pt-3">
                  <div className="py-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-extrabold text-slate-800">WOMAC 통증 설문지</p>
                      <p className="text-xs text-slate-500 mt-1">주기: 수술 전, 수술 후 2주, 4주, 12주 자궁 응답</p>
                    </div>
                    <span className="text-xs font-bold text-[#0E4B90] bg-blue-50 px-3 py-1 rounded-full">배포 중</span>
                  </div>
                  <div className="py-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-extrabold text-slate-800">KOOS 스포츠 및 삶의 질 문항</p>
                      <p className="text-xs text-slate-500 mt-1">주기: 퇴원 후 월 1회</p>
                    </div>
                    <span className="text-xs font-bold text-[#0E4B90] bg-blue-50 px-3 py-1 rounded-full">배포 중</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Dynamic Privacy Settings Tab */}
          {activeTab === "privacy" && (
            <div className="p-4 space-y-6 fade-in" id="privacy-tab-content">
              <h2 className="text-[16px] font-extrabold text-[#0E4B90] tracking-tight flex items-center gap-2">
                <span className="inline-block w-[5px] h-[16px] bg-[#2FA1E4] rounded-sm"></span>
                <span>개인정보 관리</span>
              </h2>

              <div className="bg-white rounded-[24px] border border-slate-200/80 p-8 shadow-sm space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 text-[#0E4B90] rounded-2xl flex items-center justify-center">
                    <Shield size={22} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">개인정보 암호처리 및 보안 규정</h3>
                    <p className="text-xs text-slate-400 font-semibold mt-0.5">환자의 바이오 센서 데이터 및 신상 기밀 전송 채널 암호화 제어</p>
                  </div>
                </div>

                <div className="divide-y divide-slate-100 border-t border-slate-100 pt-3">
                  <div className="py-4 flex items-center justify-between text-slate-700">
                    <div>
                      <p className="text-sm font-extrabold">의료 정보 이송 SHA-256 토큰화</p>
                      <p className="text-xs text-slate-400 mt-1">모든 로컬 스마트 워커 및 클라우드 동기화 암호화</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                      <CheckCircle2 size={13} />
                      <span>작동 중 (128-bit)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
