import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { TECH_BADGE_LOGO } from '../data/courseData';

interface HeroProps {
  onExploreModules: () => void;
  onOpenGuide: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreModules, onOpenGuide }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F7FAF8] via-white to-white pt-8 sm:pt-10 pb-14 sm:pb-20">
      {/* Círculos pastel suaves de fondo */}
      <div className="absolute top-12 right-1/3 w-32 h-32 rounded-full bg-emerald-100/60 blur-xl pointer-events-none" />
      <div className="absolute top-44 right-1/2 w-44 h-44 rounded-full bg-amber-100/50 blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Columna Izquierda: Titulares y Botones Duales */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            <div className="space-y-1">
              <h1 className="text-3xl sm:text-5xl xl:text-6xl font-serif font-bold text-[#0A2B18] tracking-tight leading-[1.12]">
                Inspirando Mentes. <br />
                <span className="text-[#DFA035]">Forjando el Futuro.</span>
              </h1>
              <p className="text-xs font-serif italic text-emerald-800 pt-1">
                Universidad Simón Bolívar · Sede Cúcuta (Vigilada Mineducación)
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-lg">
              Objeto Virtual de Aprendizaje (OVA) interactivo para el fortalecimiento de competencias en innovación, ciberseguridad, gestión de riesgos, cultura organizacional y gestión del cambio.
            </p>

            {/* Botones de acción duales */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
              <button
                type="button"
                onClick={onExploreModules}
                className="px-5 sm:px-6 py-3 sm:py-3.5 bg-[#00381C] hover:bg-[#004D28] text-white text-xs sm:text-sm font-bold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer uppercase tracking-wider"
              >
                <span>Descubre Nuestro OVA</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onOpenGuide}
                className="px-4 sm:px-5 py-3 sm:py-3.5 bg-white hover:bg-emerald-50/70 text-[#00381C] border border-slate-300 text-xs sm:text-sm font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer shadow-2xs uppercase tracking-wider"
              >
                <div className="w-5 h-5 rounded-full border border-[#00381C] flex items-center justify-center shrink-0">
                  <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                </div>
                <span>Ver Guía del OVA</span>
              </button>
            </div>
          </div>

          {/* Columna Derecha: Imagen de estudiantes con la insignia verificada */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-white border border-emerald-100">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1100&q=80"
                alt="Estudiantes de educación superior en ambiente universitario"
                className="w-full h-64 sm:h-80 lg:h-[380px] xl:h-[420px] object-cover"
              />

              {/* Insignia institucional verificada */}
              <div className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6 bg-white/95 backdrop-blur-md px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl border border-emerald-200 shadow-xl flex items-center gap-2.5 sm:gap-3 max-w-[calc(100%-1.5rem)] sm:max-w-xs">
                <img
                  src={TECH_BADGE_LOGO}
                  alt="Insignia Tecnológica Unisimón"
                  className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-full border-2 border-emerald-200 p-0.5 bg-emerald-50 shrink-0"
                />
                <div className="min-w-0">
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#C59324] block truncate">
                    Acreditación Institucional
                  </span>
                  <h4 className="text-[11px] sm:text-xs font-bold text-slate-900 leading-tight">
                    Alta Calidad · Res. 015867
                  </h4>
                  <span className="text-[9.5px] sm:text-[10px] text-slate-500 block font-mono">
                    MEN 2021–2029 · Cúcuta desde 1999
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
