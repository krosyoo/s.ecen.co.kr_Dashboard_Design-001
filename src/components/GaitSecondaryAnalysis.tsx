import React from "react";
import { motion } from "motion/react";
import { 
  Dumbbell, 
  Award, 
  Percent, 
  AlertCircle, 
  AlertTriangle, 
  CheckCircle2, 
  Info,
  Sliders
} from "lucide-react";
import { PatientData } from "../data/patients";

interface AbnormalFinding {
  domain: string;
  finding: string;
  description: string;
  grade: "주의" | "관찰" | "위험" | "정상";
}

interface SecondaryAnalysisData {
  findings: AbnormalFinding[];
  rehab: {
    strength: string[];
    balance: string[];
    power: string[];
  };
}

interface GaitSecondaryAnalysisProps {
  patient: PatientData;
}

const patientSecondaryData: Record<string, SecondaryAnalysisData> = {
  P102: { // 김이센
    findings: [
      { domain: "동력학", finding: "추진력 부족", description: "발 차기 단계에서 앞으로 나아가는 힘이 부족합니다.", grade: "주의" },
      { domain: "시간", finding: "디딤기 비율 이상", description: "한 발로 지지하는 시간의 비율이 비정상적입니다.", grade: "관찰" },
      { domain: "관절", finding: "고관절 신전 부족", description: "보행 중 고관절 뒤로 밀기 동작이 부족합니다.", grade: "주의" },
      { domain: "리듬", finding: "동결보행", description: "갑자기 발이 바닥에 붙은 것처럼 움직이지 못하는 현상입니다.", grade: "위험" }
    ],
    rehab: {
      strength: [
        "트레드밀 보행 훈련 (15분 이상)",
        "하지 대퇴사두근 강화 운동",
        "가벼운 유산소 운동 병행 권장"
      ],
      balance: [
        "체중 이동 훈련 (Weight Shift)",
        "한 발 서기 훈련 (환측과 건측)",
        "거울을 보며 자세 교정 훈련"
      ],
      power: [
        "발꿈치 들기 운동 (Heel Raises)",
        "앞쪽 체중 이동 훈련",
        "발꿈치 기울이기 및 체중 고정 훈련"
      ]
    }
  },
  P101: { // 나다라
    findings: [
      { domain: "동력학", finding: "마비측 지지력 격차", description: "마비측 단하중 시점에서의 체중 분산율이 대폭 저하되어 있습니다.", grade: "주의" },
      { domain: "시간", finding: "좌우 비대칭 극대", description: "좌우 다리 간의 지지시간 불균형이 안정성 저하의 직접적 요인입니다.", grade: "위험" },
      { domain: "관절", finding: "유각기 슬관절 굴곡 부전", description: "걸을 때 마비측 무릎 구부림 각이 낮아 보행시 유각 구간 마찰이 큽니다.", grade: "주의" },
      { domain: "리듬", finding: "규칙도 저하 (Gait Variability)", description: "보행 간 심각한 리듬의 불협화음이 보행 안정성을 위협합니다.", grade: "주의" }
    ],
    rehab: {
      strength: [
        "편마비 조절 훈련 및 하중 디딤 지구력 향상",
        "양측 대퇴 힘 분할 저항성 밴드 운동",
        "서행 트레드밀 보충 훈련 (속도 고정)"
      ],
      balance: [
        "평행봉 지탱 하 슬관절 굽힘 수평 이동",
        "환측 디딤기 강화 단일 지지 평행 유지",
        "실시간 족저압 기반 시각 피드백 훈련"
      ],
      power: [
        "발목 관절 배굴 가두 개선 수동 신전",
        "체중 지지 점진적 전환 런지 자세 정렬",
        "기립 상태 엉덩근 반사 자극 훈련"
      ]
    }
  }
};

const getBadgeStyles = (grade: "주의" | "관찰" | "위험" | "정상") => {
  switch (grade) {
    case "주의":
      return "bg-[#0E4B90] text-white border-transparent";
    case "관찰":
      return "bg-[#EEF2F6] text-[#0E4B90] border-transparent font-bold";
    case "위험":
      return "bg-[#EF4444] text-white border-transparent";
    case "정상":
      return "bg-emerald-50 text-emerald-600 border-emerald-100 font-semibold";
    default:
      return "bg-slate-50 text-slate-500 border-slate-200";
  }
};

export default function GaitSecondaryAnalysis({ patient }: GaitSecondaryAnalysisProps) {
  // Try retrieving static data for known patients, fallback to dynamic generation
  let activeData = patientSecondaryData[patient.id];
  
  if (!activeData) {
    const score = patient.scoreGait || 70;
    const findings: AbnormalFinding[] = [];
    
    if (score < 60) {
      findings.push({ domain: "동력학", finding: "하중 전달력 감퇴", description: "디딤 단계에서 반대 다리로 하중 모멘텀 전환 시 손실이 큽니다.", grade: "주의" });
      findings.push({ domain: "시간", finding: "좌우 스윙 비정상", description: "양 발의 유각기 구간 시간 차이가 임상 기준치를 벗어납니다.", grade: "주의" });
      findings.push({ domain: "관절", finding: "고관절 각 변위 위축", description: "보행 주기 중 엉덩관절의 신전 각도가 정상치보다 크게 감퇴하였습니다.", grade: "주의" });
      findings.push({ domain: "리듬", finding: "보행 유도 주파 이상", description: "불안정한 가속도로 인해 족부 착지 시 불완전 정렬 노이즈가 보입니다.", grade: "위험" });
    } else if (score < 80) {
      findings.push({ domain: "동력학", finding: "골반 외측 편향", description: "중둔근과 골반 주위 근부의 자이로 안정성이 저하되어 보행 시 좌우 흔들림이 감지됩니다.", grade: "관찰" });
      findings.push({ domain: "시간", finding: "입각 배분 지연", description: "체중 중심 분배 불균형으로 좌측 혹은 우측 디딤 시간의 연장성이 식별됩니다.", grade: "관찰" });
      findings.push({ domain: "관절", finding: "발목 배굴 유연 제한", description: "발가락 및 발목관절 끝 자극 유연성이 약하여 유각기 걸림 주의가 권장됩니다.", grade: "주의" });
    } else {
      findings.push({ domain: "동력학", finding: "특이소견 없음", description: "추진력 생성 및 충격 감쇄 메커니즘이 생체역학적으로 높은 이상성을 나타냅니다.", grade: "정상" });
      findings.push({ domain: "시간", finding: "안정적 리듬 유지", description: "주기 간 지속 시간 변동성이 허용 균등성 범위 내부인 8% 미만으로 검증됩니다.", grade: "정상" });
      findings.push({ domain: "관절", finding: "관절 모션 대칭 일치", description: "무릎 및 고관절 가동 한계 범위가 좌우 95% 대칭 쌍을 확보하고 있습니다.", grade: "정상" });
    }

    const strength = [
      "트레드밀 보행 훈련 (15분 이상)",
      "하지 대퇴사두근 강화 운동",
      "가벼운 유산소 운동 병행 권장"
    ];
    const balance = [
      "체중 이동 훈련 (Weight Shift)",
      "한 발 서기 훈련 (환측과 건측)",
      "거울을 보며 자세 교정 훈련"
    ];
    const power = [
      "발꿈치 들기 운동 (Heel Raises)",
      "앞쪽 체중 이동 훈련",
      "발꿈치 기울이기 및 체중 고정 훈련"
    ];

    activeData = { findings, rehab: { strength, balance, power } };
  }

  // 1. Dynamic parameters for Patient Info Card based on patient name/ID
  const getPatientMetadata = (pId: string) => {
    switch (pId) {
      case "P102":
        return { height: "172cm", weight: "68kg", regDate: "2026-03-10", site: "우측 무릎 관절", surgDate: "2026-03-12" };
      case "P101":
        return { height: "158cm", weight: "50kg", regDate: "2026-02-15", site: "좌측 고관절", surgDate: "2026-02-18" };
      case "P103":
        return { height: "178cm", weight: "74kg", regDate: "2026-04-01", site: "우측 아킬레스", surgDate: "2026-04-05" };
      case "P104":
        return { height: "154cm", weight: "48kg", regDate: "2026-01-10", site: "경추/요추 부위", surgDate: "2026-01-15" };
      default:
        // Dynamic fallback generator
        const hVal = pId.charCodeAt(pId.length - 1) % 2 === 0 ? "165cm" : "175cm";
        const wVal = pId.charCodeAt(pId.length - 1) % 2 === 0 ? "52kg" : "71kg";
        return { height: hVal, weight: wVal, regDate: "2026-03-31", site: patient.surgicalSite || "왼쪽 슬관절", surgDate: patient.surgeryDate || "2026-04-02" };
    }
  };

  const meta = getPatientMetadata(patient.id);

  // 2. Slider Meter Calculations
  // Gait speed parsing (m/s -> cm/s)
  const numericSpeed = parseFloat(patient.gaitSpeed) * 100; // e.g. 1.53 m/s -> 153 cm/s, 0.955 m/s -> 95.5 cm/s
  // Map speed from 40 to 170 cm/s
  const speedMin = 40;
  const speedMax = 170;
  const speedPercent = Math.min(100, Math.max(0, ((numericSpeed - speedMin) / (speedMax - speedMin)) * 100));

  // Gait stability calculation based on asymmetry (0% symmetric -> 15% asymmetric)
  const numericAsym = patient.asymmetryVal;
  const stabilityMin = 0;
  const stabilityMax = 15;
  const stabilityPercent = Math.min(100, Math.max(0, ((numericAsym - stabilityMin) / (stabilityMax - stabilityMin)) * 100));

  // 3. New Heptagon Radar Chart Parameters
  // Parameters to plot: 보행속도, 대칭성, 안정성, Cadence, 무릎 ROM, Stride Length, Stance Phase
  const radarAxes = [
    { name: "보행속도", key: "speed" },
    { name: "대칭성", key: "symmetry" },
    { name: "안정성", key: "stability" },
    { name: "Cadence", key: "cadence" },
    { name: "Knee ROM", key: "kneeRom" },
    { name: "Stride Length", key: "strideLength" },
    { name: "Stance Phase", key: "stance" }
  ];

  // Map metric scores reactor
  const specFactor = patient.scoreGait / 100;
  const chartParams = {
    speed: Math.round(Math.min(200, (numericSpeed / 160) * 180)),
    symmetry: Math.round(Math.max(40, 200 - (patient.asymmetryVal * 12))),
    stability: Math.round(Math.min(200, specFactor * 180 + 30)),
    cadence: Math.round(Math.min(200, 110 + (patient.scoreGait * 0.6))),
    kneeRom: Math.round(Math.min(200, (parseFloat(patient.kneeFlexion) / 45) * 190)),
    strideLength: Math.round(Math.min(200, (parseFloat(patient.strideLength) / 1.4) * 185)),
    stance: Math.round(Math.min(200, (parseFloat(patient.stancePhase) / 64) * 190))
  };

  const cx = 200;
  const cy = 195;
  const maxRadius = 120;
  const numAxes = radarAxes.length;
  const levels = [50, 100, 150, 200];

  const getLevelPoints = (levelValue: number) => {
    const points: string[] = [];
    for (let i = 0; i < numAxes; i++) {
      const angle = (i * 2 * Math.PI) / numAxes - Math.PI / 2;
      const r = (levelValue / 200) * maxRadius;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      points.push(`${x},${y}`);
    }
    return points.join(" ");
  };

  const activePolyPoints = () => {
    const points: string[] = [];
    for (let i = 0; i < numAxes; i++) {
      const key = radarAxes[i].key as keyof typeof chartParams;
      const val = chartParams[key];
      const angle = (i * 2 * Math.PI) / numAxes - Math.PI / 2;
      const r = (Math.min(200, val) / 200) * maxRadius;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      points.push(`${x},${y}`);
    }
    return points.join(" ");
  };

  const getLabelPlacement = (index: number) => {
    const angle = (index * 2 * Math.PI) / numAxes - Math.PI / 2;
    const r = maxRadius + 22; // Offset outwards
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);

    let textAnchor = "middle";
    let dy = "4px";
    let dx = "0px";

    if (index === 0) {
      // Top
      textAnchor = "middle";
      dy = "-8px";
    } else if (index === 1) {
      // Top Right
      textAnchor = "start";
      dx = "4px";
      dy = "-2px";
    } else if (index === 2) {
      // Bottom Right
      textAnchor = "start";
      dx = "6px";
      dy = "8px";
    } else if (index === 3) {
      // Bottom
      textAnchor = "middle";
      dy = "18px";
    } else if (index === 4) {
      // Bottom Left
      textAnchor = "end";
      dx = "-6px";
      dy = "8px";
    } else if (index === 5) {
      // Left
      textAnchor = "end";
      dx = "-6px";
      dy = "3px";
    } else if (index === 6) {
      // Top Left
      textAnchor = "end";
      dx = "-4px";
      dy = "-4px";
    }

    return { x, y, textAnchor, dx, dy };
  };

  // Determine LBP condition status based on score
  const getPainStatus = (score: number) => {
    if (score > 80) return { title: "통증 없음", prob: "12%", ep: 0, score: "0.11" };
    if (score > 60) return { title: "통증 없음", prob: "53%", ep: 0, score: "0.47" };
    return { title: "중등도 통증", prob: "78%", ep: 2, score: "1.23" };
  };
  const painData = getPainStatus(patient.scoreGait);

  return (
    <div className="space-y-10 w-full mt-2" id="gait-analysis-root-dashboard">
      
      {/* 1. 보행분석 리포트 대시보드 - Patient Info Card */}
      <section className="space-y-4" id="gait-report-dashboard-title">
        <h2 className="text-[16px] font-extrabold text-[#0E4B90] tracking-tight flex items-center gap-2">
          <span className="inline-block w-[5px] h-[16px] bg-[#2FA1E4] rounded-sm"></span>
          <span>보행분석 리포트 대시보드</span>
        </h2>

        <div className="bg-white rounded-[16px] border border-slate-200/80 p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
          {/* Patient Profile */}
          <div className="flex items-center gap-4 shrink-0 px-2">
            <div className="text-xl font-bold text-slate-800 tracking-tight">
              {patient.name} <span className="text-[15px] text-slate-400 font-bold">({patient.age}, {patient.gender === "Male" ? "남" : "여"})</span>
            </div>
          </div>

          <div className="h-[24px] w-[1px] bg-slate-200 hidden md:block"></div>

          {/* Quick Metrics Grid */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 w-full text-slate-700">
            <div className="flex flex-col">
              <span className="text-xs text-slate-400 font-semibold mb-1">키</span>
              <span className="text-sm font-bold text-slate-900">{meta.height}</span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-xs text-slate-400 font-semibold mb-1">몸무게</span>
              <span className="text-sm font-bold text-slate-900">{meta.weight}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-xs text-slate-400 font-semibold mb-1">환자번호</span>
              <span className="text-sm font-bold text-slate-900">ECEN0{patient.id}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-xs text-slate-400 font-semibold mb-1">등록일자</span>
              <span className="text-sm font-bold text-slate-900">{meta.regDate}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-xs text-slate-400 font-semibold mb-1">수술부위</span>
              <span className="text-sm font-bold text-slate-900">{meta.site}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-xs text-slate-400 font-semibold mb-1">수술일자</span>
              <span className="text-sm font-bold text-slate-900">{meta.surgDate}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 보행분석 & 주요 발견 (Side by Side Row) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: 보행분석 Meter Sliders */}
        <section className="space-y-4" id="gait-meters-and-sliders">
          <h2 className="text-[16px] font-extrabold text-[#0E4B90] tracking-tight flex items-center gap-2">
            <span className="inline-block w-[5px] h-[16px] bg-[#2FA1E4] rounded-sm"></span>
            <span>보행분석</span>
          </h2>

          <div className="bg-white rounded-[24px] border border-slate-200/80 p-8 shadow-sm flex flex-col justify-center gap-8 min-h-[360px]">
            {/* Speed Analysis Slider */}
            <div className="space-y-3 relative">
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-sm font-bold text-slate-700">보행속도 분석</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-semibold">나의 측정값</span>
                  <span className="text-[20px] font-extrabold text-slate-950">
                    {numericSpeed.toFixed(0)} <span className="text-[13px] font-bold text-slate-500">cm/s</span>
                  </span>
                </div>
              </div>

              {/* Slider scale track */}
              <div className="relative pt-4">
                {/* Pointer indicator pin */}
                <div 
                  className="absolute top-0 flex flex-col items-center transition-all duration-500" 
                  style={{ left: `${speedPercent}%`, transform: 'translateX(-50%)' }}
                >
                  <span className="text-[10px] font-black fill-slate-800 text-slate-800 mb-1">▼</span>
                </div>

                <div className="h-[12px] w-full rounded-full bg-gradient-to-r from-orange-400 via-amber-300 via-emerald-300 to-[#2FA1E4] shadow-inner" />
              </div>

              {/* Slider scale markings */}
              <div className="relative flex justify-between text-[11px] font-semibold text-slate-400 mt-2">
                <div className="absolute left-[33%] transform -translate-x-1/2 flex flex-col items-center">
                  <div className="w-[1px] h-2 bg-slate-300 mb-1" />
                  <span>85 cm/s</span>
                  <span className="text-[9px] text-slate-400 font-normal mt-[1px]">TKA 환자 평균</span>
                </div>

                <div className="absolute left-[68%] transform -translate-x-1/2 flex flex-col items-center">
                  <div className="w-[1px] h-2 bg-slate-300 mb-1" />
                  <span>110 cm/s</span>
                  <span className="text-[9px] text-slate-400 font-normal mt-[1px]">정상 평균</span>
                </div>
              </div>
            </div>

            {/* Empty block padding for spacing between slider meters */}
            <div className="h-2"></div>

            {/* Stability Slider */}
            <div className="space-y-3 relative">
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-sm font-bold text-slate-700">보행 안정성 분석</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-semibold">나의 측정값</span>
                  <span className="text-[20px] font-extrabold text-slate-950">
                    {numericAsym.toFixed(1)} <span className="text-[13px] font-bold text-slate-500">%</span>
                  </span>
                </div>
              </div>

              <div className="relative pt-4">
                {/* Pointer indicator pin */}
                <div 
                  className="absolute top-0 flex flex-col items-center transition-all duration-500" 
                  style={{ left: `${stabilityPercent}%`, transform: 'translateX(-50%)' }}
                >
                  <span className="text-[10px] font-black fill-slate-800 text-slate-800 mb-1">▼</span>
                </div>

                <div className="h-[12px] w-full rounded-full bg-gradient-to-r from-orange-400 via-amber-300 via-emerald-300 to-[#2FA1E4] shadow-inner" />
              </div>

              <div className="relative flex justify-between text-[11px] font-semibold text-slate-400 mt-2">
                <div className="absolute left-[33%] transform -translate-x-1/2 flex flex-col items-center">
                  <div className="w-[1px] h-2 bg-slate-300 mb-1" />
                  <span>&lt; 5 %</span>
                  <span className="text-[9px] text-slate-400 font-normal mt-[1px]">정상 범위</span>
                </div>

                <div className="absolute left-[68%] transform -translate-x-1/2 flex flex-col items-center">
                  <div className="w-[1px] h-2 bg-slate-300 mb-1" />
                  <span>10.2 %</span>
                  <span className="text-[9px] text-slate-400 font-normal mt-[1px]">TKA 환자 평균</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Right Column: 주요 발견 (Table) */}
        <section className="space-y-4" id="abnormal-findings-gait">
          <h2 className="text-[16px] font-extrabold text-[#0E4B90] tracking-tight flex items-center gap-2">
            <span className="inline-block w-[5px] h-[16px] bg-[#2FA1E4] rounded-sm"></span>
            <span>주요 발견</span>
          </h2>

          <div className="bg-white rounded-[24px] border border-slate-200/80 shadow-sm overflow-hidden min-h-[360px] flex flex-col">
            <div className="overflow-x-auto w-full flex-1">
              <table className="w-full text-left border-collapse h-full">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="py-4.5 px-6 text-[12px] font-bold text-slate-400 tracking-wider">시간/공간</th>
                    <th className="py-4.5 px-4 text-[12px] font-bold text-slate-400 tracking-wider">주요 소견</th>
                    <th className="py-4.5 px-4 text-[12px] font-bold text-slate-400 tracking-wider w-[50%]">설명</th>
                    <th className="py-4.5 px-6 text-[12px] font-bold text-slate-400 tracking-wider text-right">등급</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 select-none">
                  {activeData.findings.map((item, index) => (
                    <tr key={index} className="hover:bg-slate-50/20 transition-colors">
                      <td className="py-4 px-6 text-sm font-semibold text-slate-500">{item.domain}</td>
                      <td className="py-4 px-4 text-sm font-extrabold text-slate-800">{item.finding}</td>
                      <td className="py-4 px-4 text-xs text-slate-500 font-medium leading-relaxed">{item.description}</td>
                      <td className="py-4 px-6 text-right">
                        {item.grade === "위험" ? (
                          <span className="text-sm font-bold text-[#EF4444] tracking-wide pr-2">
                            위험
                          </span>
                        ) : (
                          <span className={`inline-flex items-center justify-center min-w-[52px] h-5.5 px-2.5 text-[11px] font-black rounded-full border tracking-wide select-none ${getBadgeStyles(item.grade)}`}>
                            {item.grade}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

      </div>

      {/* 3. 재활 추천 & 분석 차트 (Side by Side Row) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: 재활 추천 */}
        <section className="space-y-4" id="gait-rehabilitation-plans">
          <h2 className="text-[16px] font-extrabold text-[#0E4B90] tracking-tight flex items-center gap-2">
            <span className="inline-block w-[5px] h-[16px] bg-[#2FA1E4] rounded-sm"></span>
            <span>재활 추천</span>
          </h2>

          <div className="bg-white rounded-[24px] border border-slate-200/80 p-8 shadow-sm space-y-6 min-h-[380px] flex flex-col justify-center">
            {/* Speed & Strength Block */}
            <div className="space-y-2">
              <h3 className="text-slate-800 font-extrabold text-[14px]">
                보행속도 및 근력 강화
              </h3>
              <ul className="space-y-1 pl-4 text-slate-500 text-xs font-semibold leading-relaxed">
                {activeData.rehab.strength.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>

            {/* Balance & Symmetry Block */}
            <div className="space-y-2 pt-1 border-t border-slate-50">
              <h3 className="text-slate-800 font-extrabold text-[14px] pt-3">
                균형 및 대칭성 훈련
              </h3>
              <ul className="space-y-1 pl-4 text-slate-500 text-xs font-semibold leading-relaxed">
                {activeData.rehab.balance.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>

            {/* Power Propulsion Block */}
            <div className="space-y-2 pt-1 border-t border-slate-50">
              <h3 className="text-slate-800 font-extrabold text-[14px] pt-3">
                추진력 강화
              </h3>
              <ul className="space-y-1 pl-4 text-slate-500 text-xs font-semibold leading-relaxed">
                {activeData.rehab.power.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Right Column: 분석 차트 (Radar Heptagon Chart) */}
        <section className="space-y-4" id="gait-radar-chart">
          <h2 className="text-[16px] font-extrabold text-[#0E4B90] tracking-tight flex items-center gap-2">
            <span className="inline-block w-[5px] h-[16px] bg-[#2FA1E4] rounded-sm"></span>
            <span>분석 차트</span>
          </h2>

          <div className="bg-white rounded-[24px] border border-slate-200/80 p-6 shadow-sm flex flex-col items-center justify-center min-h-[380px]">
            {/* Radar Heptagon SVG Block */}
            <svg viewBox="0 0 400 370" className="w-full max-w-[370px] h-auto select-none" fill="none">
              {/* Concentric grid lines (nested heptagons for scale grid) */}
              {levels.map((level, levelIdx) => (
                <polygon
                  key={levelIdx}
                  points={getLevelPoints(level)}
                  stroke="#E2E8F0"
                  strokeWidth="1"
                  fill="none"
                />
              ))}

              {/* Axis spokelines radiating outwards */}
              {radarAxes.map((_, i) => {
                const angle = (i * 2 * Math.PI) / numAxes - Math.PI / 2;
                const x2 = cx + maxRadius * Math.cos(angle);
                const y2 = cy + maxRadius * Math.sin(angle);
                return (
                  <line
                    key={i}
                    x1={cx}
                    y1={cy}
                    x2={x2}
                    y2={y2}
                    stroke="#E2E8F0"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Measurement polygon for student parameters */}
              <polygon
                points={activePolyPoints()}
                fill="#3F84FC"
                fillOpacity="0.45"
                stroke="#3F84FC"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />

              {/* Dots on polygon parameter vertices */}
              {radarAxes.map((axis, i) => {
                const key = axis.key as keyof typeof chartParams;
                const val = chartParams[key];
                const angle = (i * 2 * Math.PI) / numAxes - Math.PI / 2;
                const r = (Math.min(200, val) / 200) * maxRadius;
                const x = cx + r * Math.cos(angle);
                const y = cy + r * Math.sin(angle);
                return (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r="4.5"
                    fill="#3F84FC"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                  />
                );
              })}

              {/* Scale Labels next to Symmetry Spokeline */}
              {levels.map((level, idx) => {
                const angle = (1 * 2 * Math.PI) / numAxes - Math.PI / 2;
                const r = (level / 200) * maxRadius;
                const x = cx + r * Math.cos(angle) + 8;
                const y = cy + r * Math.sin(angle) + 4;
                return (
                  <text
                    key={idx}
                    x={x}
                    y={y}
                    className="font-sans text-[8.5px] font-bold fill-slate-300 select-none"
                    textAnchor="start"
                  >
                    {level}
                  </text>
                );
              })}

              {/* Parameter Axis labels matching standard metrics */}
              {radarAxes.map((axis, i) => {
                const { x, y, textAnchor, dx, dy } = getLabelPlacement(i);
                return (
                  <text
                    key={i}
                    x={x}
                    y={y}
                    dx={dx}
                    dy={dy}
                    textAnchor={textAnchor}
                    className="font-sans text-[11px] font-bold fill-slate-400 select-none"
                  >
                    {axis.name}
                  </text>
                );
              })}
            </svg>
          </div>
        </section>

      </div>

      {/* 4. 요약 카드 (5 Metrics Columns Strip) */}
      <section className="space-y-4" id="gait-metric-summary-strip">
        <h2 className="text-[16px] font-extrabold text-[#0E4B90] tracking-tight flex items-center gap-2">
          <span className="inline-block w-[5px] h-[16px] bg-[#2FA1E4] rounded-sm"></span>
          <span>요약 카드</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          
          {/* Card 1: 보행속도 (highlighted blue) */}
          <div className="bg-[#1E88E5] text-white rounded-[16px] p-5 shadow-sm space-y-4 relative overflow-hidden flex flex-col justify-between min-h-[140px]">
            <div className="flex justify-between items-center">
              <span className="text-[13px] font-bold">보행속도</span>
              <div className="w-[18px] h-[18px] rounded-full bg-amber-400 text-slate-900 flex items-center justify-center font-bold text-[11px]">
                i
              </div>
            </div>
            <div className="flex items-baseline gap-1 pt-2">
              <span className="text-[25px] font-black tracking-tight">{parseFloat(patient.gaitSpeed).toFixed(2)}</span>
              <span className="text-xs font-semibold opacity-90">m/s</span>
            </div>
          </div>

          {/* Card 2: 보행변동성 */}
          <div className="bg-white border border-slate-200/80 rounded-[16px] p-5 shadow-sm space-y-4 flex flex-col justify-between min-h-[140px]">
            <div className="flex justify-between items-center">
              <span className="text-[13px] font-bold text-slate-700">보행변동성</span>
              <div className="w-[18px] h-[18px] rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-[11px]">
                !
              </div>
            </div>
            <div className="flex items-baseline gap-1 pt-2">
              <span className="text-[25px] font-black tracking-tight text-slate-950">{parseFloat(patient.variability).toFixed(1)}</span>
              <span className="text-xs font-bold text-slate-500">%</span>
            </div>
          </div>

          {/* Card 3: 보폭 */}
          <div className="bg-white border border-slate-200/80 rounded-[16px] p-5 shadow-sm space-y-4 flex flex-col justify-between min-h-[140px]">
            <div className="flex justify-between items-center">
              <span className="text-[13px] font-bold text-slate-700">보폭</span>
              <div className="w-[18px] h-[18px] rounded-full bg-amber-450 bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-[11px]">
                !
              </div>
            </div>
            <div className="flex items-baseline gap-1 pt-2">
              <span className="text-[25px] font-black tracking-tight text-slate-950">{parseFloat(patient.strideLength).toFixed(2)}</span>
              <span className="text-xs font-bold text-slate-500">m</span>
            </div>
          </div>

          {/* Card 4: 입각기 비율 */}
          <div className="bg-white border border-slate-200/80 rounded-[16px] p-5 shadow-sm space-y-4 flex flex-col justify-between min-h-[140px]">
            <div className="flex justify-between items-center">
              <span className="text-[13px] font-bold text-slate-700">입각기 비율</span>
              <div className="w-[18px] h-[18px] rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-[11px]">
                !
              </div>
            </div>
            <div className="flex items-baseline gap-1 pt-2">
              <span className="text-[25px] font-black tracking-tight text-slate-950">{parseFloat(patient.stancePhase).toFixed(1)}</span>
              <span className="text-xs font-bold text-slate-500">%</span>
            </div>
          </div>

          {/* Card 5: 무릎 굽힘각 */}
          <div className="bg-white border border-slate-200/80 rounded-[16px] p-5 shadow-sm space-y-4 flex flex-col justify-between min-h-[140px]">
            <div className="flex justify-between items-center">
              <span className="text-[13px] font-bold text-slate-700">무릎 굽힘각</span>
              <div className="w-[18px] h-[18px] rounded-full bg-emerald-550 bg-emerald-500 text-white flex items-center justify-center font-bold text-[11px]">
                ✓
              </div>
            </div>
            <div className="flex items-baseline gap-1 pt-2">
              <span className="text-[25px] font-black tracking-tight text-slate-950">{parseFloat(patient.kneeFlexion).toFixed(1)}</span>
              <span className="text-xs font-bold text-slate-500">deg</span>
            </div>
          </div>

        </div>
      </section>

      {/* 5. 보행 품질 요약 */}
      <section className="space-y-4" id="gait-quality-breakdown">
        <h2 className="text-[16px] font-extrabold text-[#0E4B90] tracking-tight flex items-center gap-2">
          <span className="inline-block w-[5px] h-[16px] bg-[#2FA1E4] rounded-sm"></span>
          <span>보행 품질 요약</span>
        </h2>

        {/* 3 Upper Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Composite Gait Score */}
          <div className="bg-white border border-slate-200/80 rounded-[20px] p-6 shadow-sm flex flex-col justify-between min-h-[200px]">
            <div className="space-y-4">
              <span className="text-sm font-bold text-slate-500 block">복합 보행점수</span>
              <div className="flex items-baseline gap-1">
                <span className="text-[40px] font-black text-slate-950 leading-none">{patient.scoreGait}</span>
                <span className="text-md font-bold text-slate-400">점</span>
              </div>
            </div>

            <div className="space-y-3.5 pt-4">
              {/* Blue solid rating indicator bar */}
              <div className="h-[5px] w-full bg-[#1E88E5] rounded-full" />
              
              <div className="grid grid-cols-4 gap-1 text-[11px] font-bold text-slate-400">
                <div className="flex flex-col">
                  <span>속도</span>
                  <span className="text-slate-700 font-extrabold mt-0.5">{(patient.scoreGait * 0.32).toFixed(1)}</span>
                </div>
                <div className="flex flex-col">
                  <span>대칭</span>
                  <span className="text-slate-700 font-extrabold mt-0.5">{(patient.scoreGait * 0.25).toFixed(1)}</span>
                </div>
                <div className="flex flex-col">
                  <span>안정</span>
                  <span className="text-slate-700 font-extrabold mt-0.5">{(patient.scoreGait * 0.23).toFixed(1)}</span>
                </div>
                <div className="flex flex-col">
                  <span>규칙</span>
                  <span className="text-slate-700 font-extrabold mt-0.5">{(patient.scoreGait * 0.23).toFixed(1)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Fall Risk Card */}
          <div className="bg-white border border-slate-200/80 rounded-[20px] p-6 shadow-sm flex flex-col justify-between min-h-[200px]">
            <div className="space-y-4">
              <span className="text-sm font-bold text-slate-500 block">낙상 위험</span>
              <h3 className="text-[34px] font-black text-slate-800 leading-none">
                {patient.fallRiskLevel}
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-auto">
              <div className="bg-slate-50 rounded-[12px] p-3 border border-slate-100 flex flex-col">
                <span className="text-[9.5px] font-black text-slate-400 uppercase tracking-wider mb-1">Velocity</span>
                <span className="text-[13px] font-extrabold text-slate-900">{parseFloat(patient.gaitSpeed).toFixed(1)} m/s</span>
              </div>
              <div className="bg-slate-50 rounded-[12px] p-3 border border-slate-100 flex flex-col">
                <span className="text-[9.5px] font-black text-slate-400 uppercase tracking-wider mb-1">Stride T CV</span>
                <span className="text-[13px] font-extrabold text-slate-900">{parseFloat(patient.variability).toFixed(1)} %</span>
              </div>
            </div>
          </div>

          {/* Symmetry & Stability Card */}
          <div className="bg-white border border-slate-200/80 rounded-[20px] p-6 shadow-sm flex flex-col justify-between min-h-[200px]">
            <div className="space-y-4">
              <span className="text-sm font-bold text-slate-500 block">안정성 % 대칭성</span>
            </div>

            <div className="space-y-4 w-full mt-2">
              <div className="bg-slate-50 rounded-[12px] p-3 border border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">규칙성 (Cadence CV)</span>
                <span className="text-sm font-black text-slate-900">
                  {Math.round(patient.regularityVal)} <span className="text-xs font-semibold text-slate-500">%</span>
                </span>
              </div>

              <div className="bg-slate-50 rounded-[12px] p-3 border border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">보행시간 비대칭 (AI)</span>
                <span className="text-sm font-black text-slate-900">
                  {patient.asymmetryVal.toFixed(2)} <span className="text-xs font-semibold text-slate-500">%</span>
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* 2 Lower Advanced Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
          
          {/* LBP Chronic Risk Card */}
          <div className="bg-white border border-slate-200/80 rounded-[20px] p-6 shadow-sm space-y-6">
            <div className="flex justify-between items-baseline">
              <span className="text-sm font-extrabold text-slate-800">요통 위험도(ODI) / 통증 연관 보행 에피소드</span>
            </div>

            <div className="space-y-3">
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-black text-[#1E88E5]">{painData.title}</span>
                <span className="text-xs text-slate-400 font-semibold">ODI 23/50</span>
              </div>

              {/* Progress bar info for LBP */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-[11px] font-bold text-slate-500">
                  <span>LBP 위험 확률</span>
                  <span>{painData.prob}</span>
                </div>
                <div className="h-[6px] w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#1E88E5] rounded-full" style={{ width: painData.prob }} />
                </div>
              </div>

              {/* Horizontal buttons */}
              <div className="grid grid-cols-3 gap-2.5 pt-4">
                <div className="bg-slate-100/70 p-2.5 rounded-[12px] text-center flex flex-col justify-center">
                  <span className="text-[10px] text-slate-400 font-bold mb-0.5">에피소드</span>
                  <span className="text-xs font-extrabold text-slate-800">{painData.ep}건</span>
                </div>
                <div className="bg-slate-100/70 p-2.5 rounded-[12px] text-center flex flex-col justify-center">
                  <span className="text-[10px] text-slate-400 font-bold mb-0.5">총 지속</span>
                  <span className="text-xs font-extrabold text-slate-800">{(painData.ep * 2.4).toFixed(2)}s</span>
                </div>
                <div className="bg-slate-100/70 p-2.5 rounded-[12px] text-center flex flex-col justify-center">
                  <span className="text-[10px] text-slate-400 font-bold mb-0.5">평균 스코어</span>
                  <span className="text-xs font-extrabold text-slate-800">{painData.score}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Key Findings Card */}
          <div className="bg-white border border-slate-200/80 rounded-[20px] p-6 shadow-sm flex flex-col justify-between">
            <div className="mb-4">
              <span className="text-sm font-extrabold text-slate-800">주요 발견</span>
            </div>

            <div className="divide-y divide-slate-100 select-none w-full">
              <div className="py-3 flex justify-between items-center text-sm">
                <span className="font-semibold text-slate-500">균형</span>
                <span className="font-semibold text-slate-800">좌우 흔들림</span>
                <span className="font-bold text-[#EF4444] text-right">
                  {patient.scoreGait < 50 ? "중증" : patient.scoreGait < 85 ? "중등도" : "경증"}
                </span>
              </div>
              
              <div className="py-3 flex justify-between items-center text-sm">
                <span className="font-semibold text-slate-500">변동성</span>
                <span className="font-semibold text-slate-800">보행 변동성</span>
                <span className="font-bold text-[#EF4444] text-right">
                  {patient.scoreGait < 60 ? "중증" : "중등도"}
                </span>
              </div>

              <div className="py-3 flex justify-between items-center text-sm">
                <span className="font-semibold text-slate-500">통증</span>
                <span className="font-semibold text-slate-800">통증성 보행</span>
                <span className="font-bold text-[#EF4444] text-right">
                  {patient.scoreGait < 50 ? "중증" : "중등도"}
                </span>
              </div>
            </div>
          </div>

        </div>

      </section>

    </div>
  );
}
