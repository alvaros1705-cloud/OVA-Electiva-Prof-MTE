import React from 'react';
import { ArrowRight, Calendar, Award } from 'lucide-react';

interface AdmissionsBannerProps {
  onOpenCertificate: () => void;
  onOpenGuide: () => void;
}

export const AdmissionsBanner: React.FC<AdmissionsBannerProps> = ({
  onOpenCertificate,
  onOpenGuide
}) => {
  return (
    <section id="constancia" className="py-12 sm:py-16 bg-white relative overflow-hidden border-b border-emerald-100">
      {/* Ilustración sutil tipo marca de agua */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-5 pointer-events-none flex items-center justify-center">
        <svg viewBox="0 0 200 200" className="w-full h-full text-[#006837] fill-current">
          <path d="M100 20 L20 60 L100 100 L180 60 Z M20 80 L20 130 C20 160 100 180 100 180 C100 180 180 160 180 130 L180 80 L100 120 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Columna Izquierda: Foto de estudiantes con uniformes leyendo juntos */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl overflow-hidden border border-emerald-100 shadow-xl bg-white">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80"
                alt="Estudiantes de la Universidad Simón Bolívar"
                className="w-full h-60 sm:h-72 lg:h-80 object-cover"
              />
            </div>
          </div>

          {/* Columna Derecha: Sección de Constancia Formativa y Guía */}
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-bold text-[#DFA035] uppercase tracking-wider block">
              Progreso Formativo
            </span>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0F2417] leading-tight">
              Consolida tu Ruta <br />
              <span className="text-[#006837]">de Aprendizaje en el OVA</span>
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed max-w-xl">
              Recorre los cinco módulos interactivos, ejercita tus decisiones en los laboratorios simulados y genera una constancia de práctica académica en el navegador (uso formativo interno, sin validez como título o certificación oficial MEN).
            </p>

            {/* Botones duales */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenCertificate}
                className="px-6 py-3.5 bg-[#DFA035] hover:bg-[#C98B24] text-slate-900 text-xs sm:text-sm font-bold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer uppercase tracking-wider"
              >
                <Award className="w-4 h-4 text-slate-900" />
                <span>Ver Constancia OVA</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={onOpenGuide}
                className="px-5 py-3.5 bg-white hover:bg-emerald-50/60 text-[#006837] border border-slate-300 text-xs sm:text-sm font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer shadow-2xs uppercase tracking-wider"
              >
                <Calendar className="w-4 h-4 text-[#006837]" />
                <span>Ver Guía y Fuentes</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
