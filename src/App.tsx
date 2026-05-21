/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Sidebar from "./components/Sidebar";
import DashboardHeader from "./components/DashboardHeader";
import MetricCard from "./components/MetricCard";
import ScoreSection from "./components/ScoreSection";
import SubjectProfile from "./components/SubjectProfile";
import { LayoutDashboard } from "lucide-react";

export default function App() {
  const topMetrics = [
    {
      label: "보행속도",
      value: "0.955 m/s",
      unit: "m/s",
      status: "Caution" as const,
      color: "beige" as const,
    },
    {
      label: "보행 변동성",
      value: "17.5 %",
      unit: "%",
      status: "At Risk" as const,
      color: "rose" as const,
    },
    {
      label: "보폭",
      value: "1.04 m",
      unit: "m",
      status: "Normal" as const,
      color: "mint" as const,
    },
    {
      label: "입각기 비율",
      value: "60.9 %",
      unit: "%",
      status: "Normal" as const,
      color: "sky" as const,
    },
    {
      label: "무릎 굽힘각",
      value: "29.8 deg",
      unit: "deg",
      status: "At Risk" as const,
      color: "lavender" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-[#EEF2F6] flex">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 ml-64 min-w-0 flex flex-col">
        <DashboardHeader />

        <div className="p-10 flex-1 space-y-12">
          {/* Subject Profile Info - RELOCATED TO TOP */}
          <SubjectProfile />

          {/* Top Metrics Grid: Propary Style */}
          <div className="grid grid-cols-5 gap-6">
            {topMetrics.map((metric, index) => (
              <MetricCard 
                key={index} 
                label={metric.label}
                value={metric.value}
                unit={metric.unit}
                status={metric.status}
                color={metric.color}
                delay={index * 0.1}
              />
            ))}
          </div>

          {/* Gait Quality Section: Paw Buddy Style */}
          <ScoreSection />
        </div>
        
        {/* Footer info using precise theme style */}
        <footer className="mt-12 h-16 border-t border-slate-100 bg-white/50 flex items-center px-10">
          <div className="w-full flex justify-between items-center text-slate-400 text-[10px] font-bold tracking-[0.2em] uppercase">
            <span>ECEN Intelligence Mobility // Subject GA-P102</span>
            <div className="flex gap-8">
              <span className="cursor-help hover:text-indigo-600 transition-colors">Documentation</span>
              <span className="cursor-help hover:text-indigo-600 transition-colors">Support</span>
              <span className="text-emerald-500 font-black">Encrypted Channel</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

