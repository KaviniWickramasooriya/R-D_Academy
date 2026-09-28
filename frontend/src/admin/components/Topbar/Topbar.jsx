import { Shield, Sparkles } from "lucide-react";

export default function Topbar() {
  const adminData = JSON.parse(localStorage.getItem("adminUser") || "{}");

  return (
    <header className="h-20 border-b border-stone-800/80 bg-[#0a0a0a]/90 backdrop-blur-md sticky top-0 z-20 px-8 flex items-center justify-between">
      
      {/* Connection & Status Indicator */}
      <div className="flex items-center gap-3 bg-stone-900/60 border border-stone-800 px-4 py-2 rounded-full">
        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-300 flex items-center gap-1.5">
          <Sparkles size={12} className="text-[#d4af37]" /> PostgreSQL Cloud Connected
        </span>
      </div>

      {/* Admin Profile & Role Badge */}
      <div className="flex items-center gap-5">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 text-[#d4af37] text-[10px] uppercase tracking-wider font-medium">
          <Shield size={12} />
          <span>{adminData.role || "Administrator"}</span>
        </div>
        
        <div className="text-right">
          <p className="text-xs font-serif font-medium text-stone-200">{adminData.name || "Master Admin"}</p>
          <p className="text-[10px] text-stone-500 font-mono">{adminData.email || "admin@randdartstudio.com"}</p>
        </div>
      </div>
    </header>
  );
}