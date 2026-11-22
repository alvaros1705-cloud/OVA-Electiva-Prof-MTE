import React from 'react';
import { Building2, Users, GraduationCap, Award, Percent } from 'lucide-react';

export const StatsCounterBar: React.FC = () => {
  const stats = [
    {
      icon: Building2,
      value: '1999',
      label: 'Inicio Académico en Cúcuta'
    },
    {
      icon: Award,
      value: '2021–2029',
      label: 'Acreditación MEN (Res. 015867)'
    },
    {
      icon: Users,
      value: '5',
      label: 'Módulos Temáticos del OVA'
    },
    {
      icon: GraduationCap,
      value: '5',
      label: 'Laboratorios Simuladores'
    },
    {
      icon: Percent,
      value: '75%',
      label: 'Umbral de Aprobación en Quiz'
    }
  ];

  return (
    <section className="bg-[#00381C] text-white py-10 border-y border-emerald-900/60 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 text-center">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="flex flex-col items-center space-y-2">
                <div className="p-2.5 rounded-full bg-white/10 text-emerald-300 mb-1">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                  {s.value}
                </span>
                <span className="text-xs text-emerald-200/90 font-medium">
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
