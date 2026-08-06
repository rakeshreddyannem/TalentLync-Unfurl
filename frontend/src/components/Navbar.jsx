import React from 'react';
import { Sparkles, ShieldCheck, Cpu } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Title */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#368dff] to-[#00a962] flex items-center justify-center shadow-md shadow-[#368dff]/20">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-xl tracking-tight text-slate-900">
                TalentLync <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#368dff] to-[#00a962]">Unfurl</span>
              </span>
              <span className="px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase rounded-full bg-[#368dff]/10 text-[#368dff] border border-[#368dff]/20">
                PRO
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium hidden sm:block">
              Social Media Talent Discovery & Signal Enrichment
            </p>
          </div>
        </div>

        {/* Status Indicator Badges */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-xs text-slate-700">
            <ShieldCheck className="w-4 h-4 text-[#00a962]" />
            <span>Open Graph Parser Active</span>
          </div>

          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-xs text-slate-700">
            <Cpu className="w-4 h-4 text-[#368dff]" />
            <span className="hidden sm:inline">Metadata Engine:</span>
            <span className="font-mono text-[#00a962] font-semibold">100% Offline (Zero API)</span>
          </div>
        </div>

      </div>
    </header>
  );
}


