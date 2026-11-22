import React from 'react';
import { User, GraduationCap } from 'lucide-react';

export const TopBar: React.FC = () => {
  return (
    <div className="bg-[#00381C] text-emerald-100 text-[11px] py-2 px-4 sm:px-6 lg:px-8 border-b border-emerald-900/60 no-print">
      <div className="max-w-7xl mx-auto flex items-center justify-center sm:justify-end">
        {/* Portales universitarios oficiales verificados */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-emerald-200 font-medium">
          <a
            href="https://aulaextendida.unisimon.edu.co/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 hover:text-white transition-colors whitespace-nowrap"
          >
            <User className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Aula Extendida</span>
          </a>

          <a
            href="https://www.unisimon.edu.co/cucuta"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 hover:text-white transition-colors whitespace-nowrap"
          >
            <GraduationCap className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Portal Sede Cúcuta</span>
          </a>
        </div>
      </div>
    </div>
  );
};
