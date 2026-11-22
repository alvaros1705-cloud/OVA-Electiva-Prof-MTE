import React, { useState } from 'react';
import { Users, RotateCcw, Target } from 'lucide-react';

export const CultureRadarSim: React.FC = () => {
  // Cameron & Quinn OCAI 4 Quadrants (0-100 values)
  const [culture, setCulture] = useState({
    clan: 75, // Colaboración, personas, familia
    adhocracia: 50, // Innovación, riesgo, agilidad
    mercado: 45, // Competencia, metas, resultados
    jerarquia: 65 // Procesos, reglas, estabilidad
  });

  const [desiredCulture, setDesiredCulture] = useState({
    clan: 80,
    adhocracia: 85,
    mercado: 55,
    jerarquia: 40
  });

  const handleReset = () => {
    setCulture({ clan: 75, adhocracia: 50, mercado: 45, jerarquia: 65 });
    setDesiredCulture({ clan: 80, adhocracia: 85, mercado: 55, jerarquia: 40 });
  };

  // SVG Radar points calculation (center at 150, 150, radius 100)
  const centerX = 150;
  const centerY = 150;
  const maxR = 100;

  // 4 Axes:
  // Clan (Top: 0 deg) -> (x: 150, y: 150 - r)
  // Adhocracia (Right: 90 deg) -> (x: 150 + r, y: 150)
  // Mercado (Bottom: 180 deg) -> (x: 150, y: 150 + r)
  // Jerarquía (Left: 270 deg) -> (x: 150 - r, y: 150)
  const getPoints = (vals: typeof culture) => {
    const clanY = centerY - (vals.clan / 100) * maxR;
    const adhoX = centerX + (vals.adhocracia / 100) * maxR;
    const mercY = centerY + (vals.mercado / 100) * maxR;
    const jeraX = centerX - (vals.jerarquia / 100) * maxR;

    return `${centerX},${clanY} ${adhoX},${centerY} ${centerX},${mercY} ${jeraX},${centerY}`;
  };

  return (
    <div className="bg-white rounded-2xl border border-emerald-100 shadow-sm p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-emerald-100 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-emerald-50 text-[#006837] rounded-lg">
              <Users className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-xl font-bold text-[#004D28]">Radar Diagnóstico de Cultura Organizacional</h3>
              <p className="text-xs text-slate-500">Modelo de Valores en Competencia (Cameron & Quinn / OCAI)</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#006837] transition-colors self-start md:self-auto cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Restablecer Valores
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Radar Graphic SVG */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center p-4 bg-emerald-50/30 rounded-2xl border border-emerald-100">
          <svg viewBox="0 0 300 300" className="w-full max-w-[280px] h-auto">
            {/* Background concentric diamonds */}
            {[0.25, 0.5, 0.75, 1].map((scale) => {
              const r = maxR * scale;
              return (
                <polygon
                  key={scale}
                  points={`${centerX},${centerY - r} ${centerX + r},${centerY} ${centerX},${centerY + r} ${centerX - r},${centerY}`}
                  fill="none"
                  stroke="#E2EFE7"
                  strokeWidth="1.5"
                />
              );
            })}

            {/* Axes Lines */}
            <line x1={centerX} y1={centerY - maxR} x2={centerX} y2={centerY + maxR} stroke="#C3DEC9" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1={centerX - maxR} y1={centerY} x2={centerX + maxR} y2={centerY} stroke="#C3DEC9" strokeWidth="1.5" strokeDasharray="3 3" />

            {/* Desired Culture Polygon (Dashed Blue/Gold) */}
            <polygon
              points={getPoints(desiredCulture)}
              fill="rgba(14, 165, 233, 0.15)"
              stroke="#0EA5E9"
              strokeWidth="2"
              strokeDasharray="4 4"
            />

            {/* Current Culture Polygon (Solid Green) */}
            <polygon
              points={getPoints(culture)}
              fill="rgba(0, 104, 55, 0.25)"
              stroke="#006837"
              strokeWidth="2.5"
            />

            {/* Axis Labels */}
            <text x={centerX} y={centerY - maxR - 10} textAnchor="middle" className="text-[10px] font-bold fill-[#004D28]">
              CLAN (Colaborar)
            </text>
            <text x={centerX + maxR + 10} y={centerY + 4} textAnchor="start" className="text-[10px] font-bold fill-[#004D28]">
              ADHOCRACIA (Crear)
            </text>
            <text x={centerX} y={centerY + maxR + 18} textAnchor="middle" className="text-[10px] font-bold fill-[#004D28]">
              MERCADO (Competir)
            </text>
            <text x={centerX - maxR - 10} y={centerY + 4} textAnchor="end" className="text-[10px] font-bold fill-[#004D28]">
              JERARQUÍA (Controlar)
            </text>
          </svg>

          {/* Legend */}
          <div className="flex items-center gap-6 mt-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 bg-[#006837] rounded-sm" />
              <span className="font-semibold text-slate-700">Perfil Actual (Simulado)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 border-2 border-dashed border-[#0EA5E9] bg-sky-100 rounded-sm" />
              <span className="font-semibold text-slate-700">Cultura Deseada (Visión)</span>
            </div>
          </div>
          <p className="text-[10px] text-slate-500 text-center mt-2">
            Nota: Escala pedagógica demostrativa (0–100%) por cuadrante; el cuestionario OCAI original distribuye 100 puntos por ítem.
          </p>
        </div>

        {/* Sliders & Diagnostic Levers */}
        <div className="lg:col-span-6 space-y-4">
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Target className="w-4 h-4 text-[#006837]" />
              Ajusta los Parámetros de la Cultura Actual:
            </h4>

            {/* Clan Slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-[#006837]">Cultura Clan (Sentido de Familia & Mentores):</span>
                <span>{culture.clan}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={culture.clan}
                onChange={(e) => setCulture({ ...culture, clan: Number(e.target.value) })}
                className="w-full accent-[#006837]"
              />
            </div>

            {/* Adhocracia Slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-[#006837]">Cultura Adhocracia (Innovación & Asunción de Riesgos):</span>
                <span>{culture.adhocracia}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={culture.adhocracia}
                onChange={(e) => setCulture({ ...culture, adhocracia: Number(e.target.value) })}
                className="w-full accent-[#006837]"
              />
            </div>

            {/* Mercado Slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-[#006837]">Cultura de Mercado (Cumplimiento de Metas y Eficiencia):</span>
                <span>{culture.mercado}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={culture.mercado}
                onChange={(e) => setCulture({ ...culture, mercado: Number(e.target.value) })}
                className="w-full accent-[#006837]"
              />
            </div>

            {/* Jerarquía Slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-[#006837]">Cultura Jerárquica (Normas, Formalidad & Control):</span>
                <span>{culture.jerarquia}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={culture.jerarquia}
                onChange={(e) => setCulture({ ...culture, jerarquia: Number(e.target.value) })}
                className="w-full accent-[#006837]"
              />
            </div>
          </div>

          {/* Diagnostic Insight Card */}
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-[#0F2417] space-y-1.5">
            <strong className="block text-sm text-[#004D28]">Diagnóstico Estratégico:</strong>
            <p>
              {culture.adhocracia < desiredCulture.adhocracia ? (
                <span>
                  <strong>Brecha de Innovación Identificada:</strong> La cultura actual mantiene un perfil predominante de Clan y Jerarquía. Para alcanzar la visión de transformación digital, se recomienda flexibilizar controles burocráticos y premiar la experimentación en laboratorios y semilleros.
                </span>
              ) : (
                <span>
                  <strong>Perfil Ágil e Innovador:</strong> La organización cuenta con un excelente balance entre agilidad (Adhocracia) y cohesión de equipo (Clan), ideal para liderar cambios transformacionales.
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
