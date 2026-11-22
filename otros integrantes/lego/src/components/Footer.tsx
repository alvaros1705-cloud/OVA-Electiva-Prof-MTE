import React, { useState } from 'react';
import { UNISIMON_LOGO } from '../data/courseData';
import { User, ArrowRight, Check } from 'lucide-react';

interface FooterProps {
  onSelectModule: (moduleId: string) => void;
  onOpenCertificate: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectModule, onOpenCertificate }) => {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setSubscribed(true);
    setEmailInput('');
  };

  return (
    <footer id="contacto" className="bg-[#002B15] text-white pt-14 pb-8 border-t border-emerald-950 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-emerald-900/60">
          {/* Columna 1: Logo Unisimón, Lema y Redes Sociales */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white p-2.5 rounded-xl inline-block shadow-sm">
              <img
                src={UNISIMON_LOGO}
                alt="Universidad Simón Bolívar"
                className="h-12 w-auto object-contain"
              />
            </div>

            <p className="text-xs text-emerald-200/80 leading-relaxed max-w-sm">
              Inspirando mentes. Forjando el futuro. <br />
              Construyendo un mejor mañana a través de la excelencia académica, la investigación y la innovación con impacto social.
            </p>

            {/* Canales institucionales verificados */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
              <a
                href="https://www.youtube.com/@unisimon.barranquilla"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-full border border-emerald-700/80 hover:bg-white hover:text-[#002B15] transition-all font-semibold"
                aria-label="YouTube Institucional Unisimón"
              >
                YouTube
              </a>
              <a
                href="https://www.unisimon.edu.co/cucuta"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-full border border-emerald-700/80 hover:bg-white hover:text-[#002B15] transition-all font-semibold"
              >
                Web Cúcuta
              </a>
              <a
                href="https://aulaextendida.unisimon.edu.co/"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-full border border-emerald-700/80 hover:bg-white hover:text-[#002B15] transition-all font-semibold"
              >
                Aula Extendida
              </a>
            </div>
          </div>

          {/* Columna 2: ENLACES RÁPIDOS */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-white">
              Navegación OVA
            </h4>
            <ul className="space-y-2 text-xs text-emerald-200/80">
              <li>
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors cursor-pointer">
                  Inicio
                </button>
              </li>
              <li>
                <button onClick={() => onSelectModule('innovacion-design-thinking')} className="hover:text-white transition-colors cursor-pointer">
                  Módulo 1: Design Thinking
                </button>
              </li>
              <li>
                <button onClick={() => onSelectModule('ciberseguridad')} className="hover:text-white transition-colors cursor-pointer">
                  Módulo 2: Ciberseguridad
                </button>
              </li>
              <li>
                <button onClick={() => onSelectModule('gestion-de-riesgos')} className="hover:text-white transition-colors cursor-pointer">
                  Módulo 3: Riesgos
                </button>
              </li>
              <li>
                <button onClick={() => onSelectModule('cultura-organizacional')} className="hover:text-white transition-colors cursor-pointer">
                  Módulo 4: Cultura
                </button>
              </li>
              <li>
                <button onClick={onOpenCertificate} className="hover:text-white transition-colors cursor-pointer">
                  Constancia de Progreso
                </button>
              </li>
            </ul>
          </div>

          {/* Columna 3: RECURSOS OFICIALES */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-white">
              Portales Oficiales
            </h4>
            <ul className="space-y-2 text-xs text-emerald-200/80">
              <li>
                <a href="https://aulaextendida.unisimon.edu.co/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  Aula Extendida
                </a>
              </li>
              <li>
                <a href="https://www.unisimon.edu.co/cucuta" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  Sede Cúcuta
                </a>
              </li>
              <li>
                <a href="https://www.unisimon.edu.co/cucuta" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  Calendario Académico
                </a>
              </li>
              <li>
                <a href="https://www.unisimon.edu.co/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  Sitio Institucional
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 4: AUTORES */}
          <div className="lg:col-span-2 space-y-3 text-xs text-emerald-200/80">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-white">
              Autores
            </h4>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Alejandro Olivares</span>
              </li>
              <li className="flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Juan Pablo Santamaría</span>
              </li>
              <li className="flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Kevin Aguirre</span>
              </li>
            </ul>
          </div>

          {/* Columna 5: BOLETÍN INFORMATIVO */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-white">
              Boletín
            </h4>
            <p className="text-[11px] text-emerald-200/80 leading-snug">
              Consulta novedades académicas oficiales en unisimon.edu.co/cucuta.
            </p>

            <form onSubmit={handleSubscribe} className="flex">
              <input
                type="email"
                placeholder="Ingresa tu correo"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-white text-slate-800 rounded-l-md focus:outline-none"
                required
              />
              <button
                type="submit"
                className="px-3 bg-[#DFA035] hover:bg-[#C98B24] text-slate-900 rounded-r-md transition-colors cursor-pointer flex items-center justify-center shrink-0"
                aria-label="Registrar interés informativo"
              >
                {subscribed ? <Check className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
            {subscribed && (
              <span className="text-[10px] text-emerald-300 block">
                Registro demostrativo local guardado. Visita unisimon.edu.co/cucuta para comunicados oficiales.
              </span>
            )}
          </div>
        </div>

        {/* Barra legal institucional verificada */}
        <div className="text-center text-[11px] text-emerald-300/80 space-y-1">
          <p>© {new Date().getFullYear()} Universidad Simón Bolívar · Sede Cúcuta. Vigilada Mineducación.</p>
          <p className="text-[10px] text-emerald-300/60">
            Personería Jurídica Res. No. 1318 de 1972 (Gob. del Atlántico) · Universidad Res. No. 5424 de 2005 (MEN) · Acreditación Institucional en Alta Calidad Res. No. 015867 de 2021 (vigencia 2021–2029).
          </p>
        </div>
      </div>
    </footer>
  );
};
