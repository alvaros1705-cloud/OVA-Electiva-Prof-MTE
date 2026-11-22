import React from 'react';
import { ModuleData } from '../types';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface ModulesGridProps {
  modules: ModuleData[];
  completedModules: string[];
  quizScores: Record<string, number>;
  onSelectModule: (moduleId: string) => void;
}

export const ModulesGrid: React.FC<ModulesGridProps> = ({
  modules,
  completedModules,
  quizScores,
  onSelectModule
}) => {
  return (
    <section id="modulos" className="py-14 sm:py-20 bg-white border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        {/* Encabezado de la sección en español */}
        <div className="text-center max-w-2xl mx-auto space-y-1.5">
          <span className="text-[11px] font-bold text-[#DFA035] uppercase tracking-wider block">
            Contenido Formativo
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#0A2B18]">
            Descubre Nuestros Módulos
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Cinco núcleos temáticos universitarios diseñados para fortalecer competencias en innovación, seguridad digital y gestión organizacional.
          </p>
        </div>

        {/* Rejilla de 5 tarjetas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5">
          {modules.map((m, idx) => {
            const isCompleted = completedModules.includes(m.id);
            const score = quizScores[m.id];

            const levelLabels = [
              'Módulo 1 · Innovación',
              'Módulo 2 · Seguridad Digital',
              'Módulo 3 · Riesgos (ISO 31000)',
              'Módulo 4 · Cultura y Liderazgo',
              'Módulo 5 · Cambio (Kotter)'
            ];

            return (
              <div
                key={m.id}
                onClick={() => onSelectModule(m.id)}
                className="bg-white rounded-xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between overflow-hidden cursor-pointer group"
              >
                <div>
                  {/* Foto de la tarjeta */}
                  <div className="relative h-36 overflow-hidden">
                    <img
                      src={m.heroImage}
                      alt={m.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {isCompleted && (
                      <div className="absolute top-2 right-2 bg-emerald-600 text-white px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 shadow-xs">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{score ? `${score}%` : 'Aprobado'}</span>
                      </div>
                    )}
                  </div>

                  {/* Contenido */}
                  <div className="p-4 space-y-2">
                    <h3 className="text-xs font-bold text-slate-900 group-hover:text-[#006837] transition-colors leading-tight">
                      {m.shortTitle}
                    </h3>

                    <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">
                      {m.subtitle}
                    </p>
                  </div>
                </div>

                {/* Etiqueta inferior en color dorado */}
                <div className="px-4 pb-4 pt-1">
                  <span className="text-[11px] font-bold text-[#DFA035] block">
                    {levelLabels[idx % levelLabels.length]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Botón Central */}
        <div className="flex justify-center pt-2">
          <button
            onClick={() => onSelectModule(modules[0].id)}
            className="px-6 py-3 bg-[#00381C] hover:bg-[#004D28] text-white text-xs font-bold rounded-lg transition-all shadow-xs hover:shadow flex items-center gap-2 cursor-pointer uppercase tracking-wider"
          >
            <span>Explorar Primer Módulo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
