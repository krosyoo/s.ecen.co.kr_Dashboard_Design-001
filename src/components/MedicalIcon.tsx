import React from "react";

interface IconWrapperProps {
  children: React.ReactNode;
  bgColor?: string;
  glowColor: string; // CSS hex or Tailwind color
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function MedicalIconWrapper({ children, bgColor = "bg-white", glowColor, className = "", size = "md" }: IconWrapperProps) {
  const isSm = size === "sm";
  const sizeClasses = isSm 
    ? "w-11 h-11 rounded-[16px] shadow-[0_4px_12px_rgba(0,0,0,0.02)]" 
    : "w-16 h-16 rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.03)]";
  
  const glowSize = isSm ? "w-6 h-6 blur-[6px]" : "w-10 h-10 blur-[10px]";

  return (
    <div className={`relative ${sizeClasses} bg-white flex items-center justify-center border border-slate-100/80 overflow-hidden shrink-0 group hover:scale-105 transition-all duration-300 ${className}`}>
      {/* Soft central radial glow */}
      <div 
        className={`absolute rounded-full opacity-65 mix-blend-multiply ${glowSize}`}
        style={{ backgroundColor: glowColor }}
      />
      {/* Icon Graphic */}
      <div className="relative z-10 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}

// 1. Chart Pie (Blue/Cyan Theme)
export function ChartPieIcon() {
  return (
    <MedicalIconWrapper glowColor="#3F84FC">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="pieGrad1" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#80B3FF" />
            <stop offset="100%" stopColor="#3F84FC" />
          </linearGradient>
          <linearGradient id="pieGrad2" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E0EDFF" />
            <stop offset="100%" stopColor="#AACDFF" />
          </linearGradient>
        </defs>
        {/* Main large pie slice */}
        <path 
          d="M14 2A12 12 0 0 0 2.05 15h11.95V2.05z" 
          fill="url(#pieGrad1)" 
        />
        {/* Smaller light pie slice */}
        <path 
          d="M16 2.05V14h11.95A12 12 0 0 0 16 2.05z" 
          fill="url(#pieGrad2)" 
          opacity="0.9"
        />
        {/* Remaining slice */}
        <path 
          d="M14 16H2.05A12 12 0 0 0 14 27.95V16z" 
          fill="url(#pieGrad1)" 
          opacity="0.6"
        />
      </svg>
    </MedicalIconWrapper>
  );
}

// 2. Heart with Wave (Red/Pink Coral Theme)
export function CardiacHeartIcon() {
  return (
    <MedicalIconWrapper glowColor="#FF5B9F">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="heartGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FF85B2" />
            <stop offset="100%" stopColor="#FF5B9F" />
          </linearGradient>
        </defs>
        {/* Beautiful Heart back contour */}
        <path 
          d="M11.645 20.91l-.007-.003-.003-.001a1.595 1.595 0 0 1-.41-.312c-.287-.271-.62-.647-.98-1.115-.718-.934-1.61-2.29-2.422-3.8-1.606-2.986-2.823-6.196-2.823-8.932C5 3.754 7.425 2 10.334 2c1.74 0 3.013.793 3.666 1.838C14.653 2.793 15.926 2 17.666 2 20.575 2 23 3.753 23 6.75c0 2.736-1.217 5.946-2.823 8.932-.812 1.51-1.704 2.866-2.422 3.8-.36.468-.693.844-.98 1.115a1.595 1.595 0 0 1-.41.312l-.003.001-.007.003-.01.003a.582.582 0 0 1-.39 0l-.01-.003z" 
          fill="url(#heartGrad)" 
        />
        {/* Superimposed white heartbeat trace */}
        <path 
          d="M4 12h3.5l1.5-3.5L11 15.5l1.5-6L15 12h5" 
          stroke="white" 
          strokeWidth="1.8" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
      </svg>
    </MedicalIconWrapper>
  );
}

// 3. Lungs (Coral Red Theme)
export function LungsIcon() {
  return (
    <MedicalIconWrapper glowColor="#ff7a70">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lungGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFA69E" />
            <stop offset="100%" stopColor="#FF7A70" />
          </linearGradient>
        </defs>
        <path 
          d="M12 2v8M12 4c0 3 2 4 4 4s2-2 2-4a4 4 0 0 0-8 0c0 2 0 4 2 4s4-1 4-4z" 
          stroke="url(#lungGrad)" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        <path 
          d="M6 6c-2.5 0-4 1.5-4 4.5S4.5 19 8 19s4-3 4-7-1.5-6-6-6zm12 0c4.5 0 6 2 6 6s-2.5 7-6 7-4-3-4-7 1.5-6 6-6z" 
          fill="url(#lungGrad)" 
          opacity="0.85"
        />
      </svg>
    </MedicalIconWrapper>
  );
}

// 4. Band-Aid (Warm Orange Theme)
export function BandAidIcon() {
  return (
    <MedicalIconWrapper glowColor="#FBA25E">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bandGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FCD19C" />
            <stop offset="100%" stopColor="#FBA25E" />
          </linearGradient>
        </defs>
        {/* Main capsule rotated diagonal */}
        <rect 
          x="3.2" 
          y="11.7" 
          width="24" 
          height="8" 
          rx="4" 
          transform="rotate(-45 3.2 11.7)" 
          fill="url(#bandGrad)" 
        />
        {/* Inner white pad */}
        <rect 
          x="9.6" 
          y="9.6" 
          width="6.8" 
          height="6.8" 
          transform="rotate(-45 9.6 9.6)" 
          fill="white" 
          opacity="0.9" 
        />
        {/* Tiny air dots on pads */}
        <circle cx="11" cy="11" r="0.75" fill="#FBA25E" />
        <circle cx="13" cy="13" r="0.75" fill="#FBA25E" />
        <circle cx="11" cy="13" r="0.75" fill="#FBA25E" />
        <circle cx="13" cy="11" r="0.75" fill="#FBA25E" />
      </svg>
    </MedicalIconWrapper>
  );
}

// 5. Medical Suitcase (Purple Theme)
export function MedicalKitIcon() {
  return (
    <MedicalIconWrapper glowColor="#A78BFA">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="kitGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#C4B5FD" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
        {/* Main box */}
        <rect x="2" y="6" width="20" height="14" rx="4" fill="url(#kitGrad)" />
        {/* Handle */}
        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" />
        {/* White medical cross */}
        <path d="M12 10v6M9 13h6" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </MedicalIconWrapper>
  );
}

// 6. Pill/Capsule (Soft Lavender/Indigo Theme)
export function CapsuleIcon() {
  return (
    <MedicalIconWrapper glowColor="#818CF8">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="pillGrad1" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#A5B4FC" />
            <stop offset="100%" stopColor="#6366F1" />
          </linearGradient>
          <linearGradient id="pillGrad2" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E0E7FF" />
            <stop offset="100%" stopColor="#C7D2FE" />
          </linearGradient>
        </defs>
        {/* Pill base capsule rotated 45deg */}
        <g transform="rotate(-45 12 12)">
          {/* Top half */}
          <path d="M12 4a4 4 0 0 1 4 4v4H8V8a4 4 0 0 1 4-4z" fill="url(#pillGrad1)" />
          {/* Bottom half */}
          <path d="M8 12h8v4a4 4 0 0 1-4 4 4 4 0 0 1-4-4v-4z" fill="url(#pillGrad2)" />
        </g>
      </svg>
    </MedicalIconWrapper>
  );
}

// 7. Blister Pack / Tablet Sheet (Cyan Theme)
export function BlisterPackIcon() {
  return (
    <MedicalIconWrapper glowColor="#22D3EE">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="blisterGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#A5F3FC" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
        <rect x="4" y="3" width="16" height="18" rx="3" fill="url(#blisterGrad)" />
        {/* Tablets */}
        <circle cx="8" cy="7" r="1.5" fill="white" opacity="0.9" />
        <circle cx="16" cy="7" r="1.5" fill="white" opacity="0.9" />
        <circle cx="8" cy="12" r="1.5" fill="white" opacity="0.9" />
        <circle cx="16" cy="12" r="1.5" fill="white" opacity="0.9" />
        <circle cx="8" cy="17" r="1.5" fill="white" opacity="0.9" />
        <circle cx="16" cy="17" r="1.5" fill="white" opacity="0.9" />
      </svg>
    </MedicalIconWrapper>
  );
}

// 8. Syringe (Teal/Green Theme)
export function SyringeIcon() {
  return (
    <MedicalIconWrapper glowColor="#34D399">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="syringeGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#A7F3D0" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
        </defs>
        <g transform="rotate(-45 12 12)">
          {/* Plunger needle */}
          <line x1="12" y1="2" x2="12" y2="5" stroke="#10B981" strokeWidth="1.5" />
          {/* Glass body */}
          <rect x="9" y="5" width="6" height="12" rx="1.5" fill="url(#syringeGrad)" />
          {/* Measurement marks */}
          <line x1="10" y1="8" x2="12" y2="8" stroke="white" strokeWidth="1" />
          <line x1="10" y1="11" x2="12" y2="11" stroke="white" strokeWidth="1" />
          <line x1="10" y1="14" x2="12" y2="14" stroke="white" strokeWidth="1" />
          {/* Inner plunger */}
          <rect x="11" y="17" width="2" height="4" fill="#10B981" />
          {/* Handle ring */}
          <circle cx="12" cy="21" r="1.5" stroke="#10B981" strokeWidth="1.5" />
        </g>
      </svg>
    </MedicalIconWrapper>
  );
}

// 9. Thermometer (Lavender Theme)
export function ThermometerIcon() {
  return (
    <MedicalIconWrapper glowColor="#C084FC">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="thermGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E9D5FF" />
            <stop offset="100%" stopColor="#A855F7" />
          </linearGradient>
        </defs>
        <path 
          d="M14 4v10.5a3 3 0 1 1-4 0V4a2 2 0 0 1 4 0z" 
          fill="url(#thermGrad)" 
        />
        {/* Inner liquid mercury level */}
        <circle cx="12" cy="17" r="1.5" fill="#A855F7" />
        <rect x="11.5" y="8" width="1" height="8" rx="0.5" fill="#A855F7" />
      </svg>
    </MedicalIconWrapper>
  );
}

// 10. Virus/Cell (Peach/Orange Theme)
export function BioCellIcon() {
  return (
    <MedicalIconWrapper glowColor="#FB923C">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="cellGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFEDD5" />
            <stop offset="100%" stopColor="#F97316" />
          </linearGradient>
        </defs>
        <circle cx="12" cy="12" r="6" fill="url(#cellGrad)" />
        {/* Outer spikes resembling COVID virus icon in the mockup */}
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M5 19l3-3M16 8l3-3" stroke="#F97316" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="2" r="1" fill="#F97316" />
        <circle cx="12" cy="22" r="1" fill="#F97316" />
        <circle cx="2" cy="12" r="1" fill="#F97316" />
        <circle cx="22" cy="12" r="1" fill="#F97316" />
      </svg>
    </MedicalIconWrapper>
  );
}

// 11. Clinical Ruler (Ruler/Height representation with glowing sky theme)
export function ClinicalRulerIcon() {
  return (
    <MedicalIconWrapper glowColor="#3F84FC">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="rulerGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#93C5FD" />
            <stop offset="100%" stopColor="#3F84FC" />
          </linearGradient>
        </defs>
        <rect x="4" y="2" width="16" height="20" rx="3" fill="url(#rulerGrad)" opacity="0.1" />
        <rect x="4" y="2" width="16" height="20" rx="3" stroke="url(#rulerGrad)" strokeWidth="2" />
        {/* Ruler ticks */}
        <line x1="4" y1="6" x2="10" y2="6" stroke="url(#rulerGrad)" strokeWidth="2" strokeLinecap="round" />
        <line x1="4" y1="10" x2="8" y2="10" stroke="url(#rulerGrad)" strokeWidth="2" strokeLinecap="round" />
        <line x1="4" y1="14" x2="10" y2="14" stroke="url(#rulerGrad)" strokeWidth="2" strokeLinecap="round" />
        <line x1="4" y1="18" x2="8" y2="18" stroke="url(#rulerGrad)" strokeWidth="2" strokeLinecap="round" />
        {/* Pointer measure */}
        <path d="M13 10l3 2-3 2v-4z" fill="#3F84FC" />
        <line x1="16" y1="6" x2="16" y2="18" stroke="url(#rulerGrad)" strokeWidth="1.5" strokeDasharray="2 2" />
      </svg>
    </MedicalIconWrapper>
  );
}

// 12. Clinical Weight Scale (Mint green weight scale icon with glowing theme)
export function ClinicalWeightIcon() {
  return (
    <MedicalIconWrapper glowColor="#34D399">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="scaleGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#A7F3D0" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
        </defs>
        <rect x="3" y="3" width="18" height="18" rx="4" fill="url(#scaleGrad)" opacity="0.15" />
        <rect x="3" y="3" width="18" height="18" rx="4" stroke="url(#scaleGrad)" strokeWidth="2" />
        {/* Scale Display Dial */}
        <circle cx="12" cy="8" r="3" fill="white" stroke="url(#scaleGrad)" strokeWidth="1.5" />
        <line x1="12" y1="8" x2="13.5" y2="6.5" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" />
        {/* Scale ridges */}
        <line x1="6" y1="15" x2="18" y2="15" stroke="url(#scaleGrad)" strokeWidth="2" strokeLinecap="round" />
        <line x1="6" y1="18" x2="18" y2="18" stroke="url(#scaleGrad)" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </MedicalIconWrapper>
  );
}

// 13. Clinical Calendar (Warm Orange/Beige themed calendar sheet icon with glowing theme)
export function ClinicalCalendarIcon() {
  return (
    <MedicalIconWrapper glowColor="#FBA25E">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="calGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FCD19C" />
            <stop offset="100%" stopColor="#FBA25E" />
          </linearGradient>
        </defs>
        <rect x="3" y="4" width="18" height="16" rx="3" fill="url(#calGrad)" opacity="0.15" />
        <rect x="3" y="4" width="18" height="16" rx="3" stroke="url(#calGrad)" strokeWidth="2" />
        <line x1="3" y1="9" x2="21" y2="9" stroke="url(#calGrad)" strokeWidth="2" />
        {/* Binder rings */}
        <line x1="7" y1="2" x2="7" y2="5" stroke="#FBA25E" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="17" y1="2" x2="17" y2="5" stroke="#FBA25E" strokeWidth="2.5" strokeLinecap="round" />
        {/* Date dot matrix */}
        <circle cx="7" cy="13" r="1.5" fill="#FBA25E" />
        <circle cx="12" cy="13" r="1.5" fill="#FBA25E" />
        <circle cx="17" cy="13" r="1.5" fill="#FBA25E" />
        <circle cx="7" cy="17" r="1.5" fill="#FBA25E" opacity="0.5" />
        <circle cx="12" cy="17" r="1.5" fill="#FBA25E" />
        <circle cx="17" cy="17" r="1.5" fill="#FBA25E" opacity="0.5" />
      </svg>
    </MedicalIconWrapper>
  );
}

// 14. Clinical Stethoscope (Warm Orange / Gold theme for Composite Gait Score)
export function ClinicalStethoscopeIcon({ size = "md" }: { size?: "sm" | "md" }) {
  const isSm = size === "sm";
  return (
    <MedicalIconWrapper glowColor="#FBA25E" size={size}>
      <svg width={isSm ? "20" : "28"} height={isSm ? "20" : "28"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="stethGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FCD19C" />
            <stop offset="100%" stopColor="#FBA25E" />
          </linearGradient>
        </defs>
        <path d="M4.5 3v5a7.5 7.5 0 0 0 15 0V3" stroke="url(#stethGrad)" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M12 10.5v8.5a2.5 2.5 0 0 0 5 0v-1" stroke="url(#stethGrad)" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="17" cy="18" r="3" fill="url(#stethGrad)" />
        <path d="M3 3h3M18 3h3" stroke="url(#stethGrad)" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </MedicalIconWrapper>
  );
}

// 15. Fall Risk Shield Alert (Rose Red Theme for Fall Risk Card)
export function FallRiskAlertIcon({ size = "md" }: { size?: "sm" | "md" }) {
  const isSm = size === "sm";
  return (
    <MedicalIconWrapper glowColor="#FF5B9F" size={size}>
      <svg width={isSm ? "20" : "28"} height={isSm ? "20" : "28"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="shieldAlertGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FF85B2" />
            <stop offset="100%" stopColor="#FF5B9F" />
          </linearGradient>
        </defs>
        <path 
          d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" 
          fill="url(#shieldAlertGrad)" 
        />
        <line x1="12" y1="7" x2="12" y2="13" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="12" cy="16.5" r="1.25" fill="white" />
      </svg>
    </MedicalIconWrapper>
  );
}

// 16. Clinical Balance Scale (Teal/Green Theme for Stability & Symmetry)
export function ClinicalBalanceIcon({ size = "md" }: { size?: "sm" | "md" }) {
  const isSm = size === "sm";
  return (
    <MedicalIconWrapper glowColor="#34D399" size={size}>
      <svg width={isSm ? "20" : "28"} height={isSm ? "20" : "28"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="balanceGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#A7F3D0" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
        </defs>
        <path d="M12 3v17M12 20H8M12 20h4" stroke="url(#balanceGrad)" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M6 7h12" stroke="url(#balanceGrad)" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M6 7L3 13h6L6 7z" stroke="url(#balanceGrad)" strokeWidth="2" strokeLinejoin="round" />
        <path d="M18 7L15 13h6l-3-6z" stroke="url(#balanceGrad)" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    </MedicalIconWrapper>
  );
}
