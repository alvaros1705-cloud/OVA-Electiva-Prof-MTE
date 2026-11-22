import React from 'react';
import { ArrowRight, GraduationCap, Heart, Globe, Building2, Users, Award } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="sobre-el-ova" className="py-14 sm:py-20 bg-white border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Columna Izquierda: Información verificada de Sede Cúcuta e hitos institucionales */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-[#DFA035] uppercase tracking-wider block">
                Sobre la Sede Cúcuta
              </span>

              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0A2B18] leading-tight">
                Formación Universitaria <br />
                <span className="text-[#DFA035]">en Norte de Santander</span>
              </h2>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              La <strong className="text-slate-800">Universidad Simón Bolívar</strong>, fundada en Barranquilla en 1972 (Res. 1318) y reconocida como Universidad en 2005 (Res. 5424 MEN), inició actividades académicas en <strong className="text-slate-800">Cúcuta el 17 de agosto de 1999</strong>, con Acreditación Institucional en Alta Calidad vigente hasta 2029 (Res. 015867 de 2021).
            </p>

            <a
              href="https://www.unisimon.edu.co/cucuta"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#00381C] hover:bg-[#004D28] text-white text-xs font-bold rounded-lg transition-all shadow-xs hover:shadow uppercase tracking-wider cursor-pointer"
            >
              <span>Portal Oficial Sede Cúcuta</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            {/* Fila inferior de 3 hitos verificados */}
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-100 text-xs">
              <div className="flex items-start gap-2">
                <Building2 className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-base font-bold font-serif text-slate-900 block leading-tight">1999</span>
                  <span className="text-[10px] text-slate-500 leading-tight block">Inicio en Cúcuta</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Award className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-base font-bold font-serif text-slate-900 block leading-tight">2021–2029</span>
                  <span className="text-[10px] text-slate-500 leading-tight block">Res. MEN 015867</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Users className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-base font-bold font-serif text-slate-900 block leading-tight">5 Núcleos</span>
                  <span className="text-[10px] text-slate-500 leading-tight block">Temáticos del OVA</span>
                </div>
              </div>
            </div>
          </div>

          {/* Columna Central: Foto académica */}
          <div className="lg:col-span-4">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-100">
              <img
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80"
                alt="Ambiente universitario de educación superior"
                className="w-full h-60 sm:h-72 lg:h-80 object-cover"
              />
            </div>
          </div>

          {/* Columna Derecha: 3 Tarjetas con componentes reales verificables del OVA */}
          <div className="lg:col-span-3 space-y-4">
            {/* Tarjeta 1 */}
            <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs flex items-center gap-4">
              <div className="p-2.5 rounded-lg bg-slate-100 text-[#00381C] shrink-0">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="text-base font-bold font-serif text-slate-900 block leading-tight">5 Simuladores</span>
                <span className="text-[11px] text-slate-500">Laboratorios interactivos prácticos</span>
              </div>
            </div>

            {/* Tarjeta 2 */}
            <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs flex items-center gap-4">
              <div className="p-2.5 rounded-lg bg-amber-50 text-[#DFA035] shrink-0">
                <Heart className="w-6 h-6 fill-current" />
              </div>
              <div>
                <span className="text-base font-bold font-serif text-slate-900 block leading-tight">5 Escenarios</span>
                <span className="text-[11px] text-slate-500">Casos pedagógicos simulados</span>
              </div>
            </div>

            {/* Tarjeta 3 */}
            <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs flex items-center gap-4">
              <div className="p-2.5 rounded-lg bg-slate-100 text-slate-700 shrink-0">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <span className="text-base font-bold font-serif text-slate-900 block leading-tight">20 Ítems</span>
                <span className="text-[11px] text-slate-500">Autoevaluación formativa</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
