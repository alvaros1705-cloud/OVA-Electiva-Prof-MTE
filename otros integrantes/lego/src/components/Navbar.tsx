import React, { useState } from 'react';
import { UNISIMON_LOGO } from '../data/courseData';
import { Award, Menu, X } from 'lucide-react';

interface NavbarProps {
  progressPercentage: number;
  completedCount: number;
  totalModules: number;
  onNavigate: (sectionId: string) => void;
  onOpenCertificate: () => void;
  onStartLearning: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  progressPercentage,
  completedCount,
  totalModules,
  onNavigate,
  onOpenCertificate,
  onStartLearning
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    onNavigate(sectionId);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-emerald-100 shadow-2xs no-print transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-3 xl:gap-5">
        {/* Left: Logo Oficial de la Universidad Simón Bolívar */}
        <div
          onClick={() => handleNavClick('inicio')}
          className="flex items-center cursor-pointer select-none shrink-0"
        >
          <img
            src={UNISIMON_LOGO}
            alt="Universidad Simón Bolívar"
            className="h-9 sm:h-11 xl:h-12 w-auto max-w-[150px] sm:max-w-[185px] xl:max-w-[215px] object-contain"
          />
        </div>

        {/* Center: Enlaces de navegación en desktop/laptop sin desbordar */}
        <nav className="hidden lg:flex items-center gap-3.5 xl:gap-6 text-[10.5px] xl:text-[11px] font-bold tracking-wider text-slate-700 uppercase min-w-0">
          <button
            type="button"
            onClick={() => handleNavClick('inicio')}
            className="hover:text-[#006837] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Inicio
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('pilares')}
            className="hover:text-[#006837] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Metodología
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('modulos')}
            className="hover:text-[#006837] transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1"
          >
            <span>Módulos</span>
            <span className="text-[10px] font-bold text-[#006837] bg-emerald-50 px-1.5 rounded-full border border-emerald-200">
              {totalModules}
            </span>
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('constancia')}
            className="hover:text-[#006837] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Constancia
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('contacto')}
            className="hover:text-[#006837] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Contacto
          </button>
        </nav>

        {/* Right: Progreso, Botón Dorado y Menú Móvil */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Indicador de Progreso (visible en pantallas medianas y grandes) */}
          <button
            type="button"
            onClick={onOpenCertificate}
            title="Abrir constancia de progreso"
            className="hidden sm:flex flex-col items-end text-right cursor-pointer group shrink-0"
          >
            <div className="flex items-center gap-1 text-[10.5px] xl:text-[11px] font-bold text-slate-700 group-hover:text-[#006837] transition-colors whitespace-nowrap">
              <span>{completedCount}/{totalModules} Módulos</span>
              <span className="text-[#006837]">({progressPercentage}%)</span>
            </div>
            <div className="w-16 xl:w-20 bg-slate-100 rounded-full h-1.5 mt-1 overflow-hidden border border-emerald-100">
              <div
                className="bg-[#006837] h-full transition-all duration-300 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              if (progressPercentage >= 100) {
                onOpenCertificate();
              } else {
                onStartLearning();
              }
            }}
            className="px-3 sm:px-4 xl:px-5 py-2 sm:py-2.5 bg-[#DFA035] hover:bg-[#C98B24] text-slate-900 text-[10.5px] sm:text-xs font-bold rounded-lg transition-all shadow-xs hover:shadow uppercase tracking-wider flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
          >
            {progressPercentage >= 100 ? (
              <>
                <Award className="w-3.5 h-3.5 text-slate-900" />
                <span>Ver Constancia</span>
              </>
            ) : (
              <span>Comenzar OVA</span>
            )}
          </button>

          {/* Hamburger Menu Button (< lg) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            className="lg:hidden p-2 rounded-lg border border-emerald-200 text-[#004D28] hover:bg-emerald-50 transition-colors cursor-pointer shrink-0"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile/Tablet Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-emerald-100 bg-white px-4 py-4 space-y-3 shadow-lg">
          <div className="sm:hidden flex items-center justify-between pb-2 border-b border-emerald-100 text-xs">
            <span className="font-bold text-slate-700">
              Progreso: {completedCount}/{totalModules} Módulos ({progressPercentage}%)
            </span>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCertificate();
              }}
              className="font-bold text-[#006837] underline cursor-pointer"
            >
              Ver Constancia
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
            <button
              type="button"
              onClick={() => handleNavClick('inicio')}
              className="p-2.5 rounded-lg bg-emerald-50/50 hover:bg-emerald-50 hover:text-[#006837] text-left cursor-pointer"
            >
              Inicio
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('pilares')}
              className="p-2.5 rounded-lg bg-emerald-50/50 hover:bg-emerald-50 hover:text-[#006837] text-left cursor-pointer"
            >
              Metodología
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('modulos')}
              className="p-2.5 rounded-lg bg-emerald-50/50 hover:bg-emerald-50 hover:text-[#006837] text-left cursor-pointer"
            >
              Módulos ({totalModules})
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('constancia')}
              className="p-2.5 rounded-lg bg-emerald-50/50 hover:bg-emerald-50 hover:text-[#006837] text-left cursor-pointer"
            >
              Constancia
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('contacto')}
              className="p-2.5 rounded-lg bg-emerald-50/50 hover:bg-emerald-50 hover:text-[#006837] text-left cursor-pointer"
            >
              Contacto
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
