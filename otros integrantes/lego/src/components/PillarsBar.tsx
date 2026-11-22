import React from 'react';
import { BookOpen, Cpu, Briefcase, CheckSquare, Award } from 'lucide-react';

interface PillarsBarProps {
  onExploreModules: () => void;
}

export const PillarsBar: React.FC<PillarsBarProps> = ({ onExploreModules }) => {
  const pillars = [
    {
      title: 'Teoría Fundamentada',
      subtitle: 'Rigor Académico',
      desc: 'Marcos conceptuales con bibliografía verificada y fuentes primarias.',
      icon: BookOpen
    },
    {
      title: 'Simuladores Prácticos',
      subtitle: 'Aprender Haciendo',
      desc: 'Laboratorios interactivos para experimentar escenarios de decisión.',
      icon: Cpu
    },
    {
      title: 'Casos Pedagógicos',
      subtitle: 'Análisis Crítico',
      desc: 'Dilemas organizacionales simulados con retroalimentación inmediata.',
      icon: Briefcase
    },
    {
      title: 'Autoevaluación',
      subtitle: 'Seguimiento Local',
      desc: 'Cuestionarios formativos con umbral de aprobación del 75% por módulo.',
      icon: CheckSquare
    },
    {
      title: 'Sede Cúcuta',
      subtitle: 'Identidad Unisimón',
      desc: 'Recurso formativo universitario con acreditación institucional vigente.',
      icon: Award
    }
  ];

  return (
    <div id="pilares" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20 no-print">
      <div className="bg-[#00381C] text-white rounded-2xl shadow-2xl border border-emerald-900/60 p-4 sm:p-5 lg:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 divide-y sm:divide-y-0 lg:divide-x divide-emerald-800/60 gap-2 sm:gap-0">
          {pillars.map((p) => {
            const Icon = p.icon;

            return (
              <button
                type="button"
                key={p.title}
                onClick={onExploreModules}
                className="p-3 sm:p-4 lg:px-3 xl:px-4 lg:first:pl-0 lg:last:pr-0 cursor-pointer group transition-all flex flex-col justify-between space-y-2 text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-emerald-400/50 flex items-center justify-center text-emerald-300 group-hover:bg-white group-hover:text-[#00381C] transition-all shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors leading-tight">
                      {p.title}
                    </h3>
                    <span className="text-[10px] text-emerald-300 block font-medium">
                      {p.subtitle}
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-emerald-100/75 leading-snug line-clamp-2">
                  {p.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
