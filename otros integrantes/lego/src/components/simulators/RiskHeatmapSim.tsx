import React, { useState } from 'react';
import { AlertTriangle, Shield, CheckCircle2, RotateCcw } from 'lucide-react';

interface RiskItem {
  id: string;
  name: string;
  description: string;
  prob: number; // 1 to 5
  impact: number; // 1 to 5
  treatment: 'mitigar' | 'transferir' | 'evitar' | 'aceptar';
  treated: boolean;
}

const INITIAL_RISKS: RiskItem[] = [
  {
    id: 'r1',
    name: 'Ciberataque de Ransomware en Base de Datos Académica',
    description: 'Pérdida de disponibilidad y riesgo de secuestro de calificaciones.',
    prob: 4,
    impact: 5,
    treatment: 'mitigar',
    treated: false
  },
  {
    id: 'r2',
    name: 'Interrupción Prolongada del Suministro Eléctrico',
    description: 'Apagones de red regional que afectan centros de cómputo y aulas híbridas.',
    prob: 4,
    impact: 3,
    treatment: 'mitigar',
    treated: false
  },
  {
    id: 'r3',
    name: 'Pérdida o Fuga de Investigadores Clave de Posgrado',
    description: 'Deserción de líderes de proyectos financiados por MinCiencias.',
    prob: 3,
    impact: 4,
    treatment: 'mitigar',
    treated: false
  },
  {
    id: 'r4',
    name: 'Demanda Laboral por Incumplimiento de Tercerizados',
    description: 'Riesgo legal derivado de contratistas de vigilancia o aseo.',
    prob: 2,
    impact: 4,
    treatment: 'transferir',
    treated: false
  },
  {
    id: 'r5',
    name: 'Obsolescencia Menor de Equipos de Impresión',
    description: 'Demoras esporádicas en trámites de secretaría general.',
    prob: 2,
    impact: 2,
    treatment: 'aceptar',
    treated: false
  }
];

export const RiskHeatmapSim: React.FC = () => {
  const [risks, setRisks] = useState<RiskItem[]>(INITIAL_RISKS);
  const [selectedRiskId, setSelectedRiskId] = useState<string>('r1');

  const selectedRisk = risks.find((r) => r.id === selectedRiskId) || risks[0];

  const handleApplyControl = (id: string, newTreatment: RiskItem['treatment']) => {
    setRisks((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        return {
          ...r,
          treatment: newTreatment,
          treated: true
        };
      })
    );
  };

  const handleReset = () => {
    setRisks(INITIAL_RISKS);
  };

  // Helper to calculate effective coordinates
  const getCoords = (r: RiskItem) => {
    if (!r.treated) {
      return { prob: r.prob, impact: r.impact };
    }
    // Reduced residual risk
    switch (r.treatment) {
      case 'mitigar':
        return { prob: Math.max(1, r.prob - 2), impact: Math.max(1, r.impact - 1) };
      case 'transferir':
        return { prob: r.prob, impact: Math.max(1, r.impact - 3) };
      case 'evitar':
        return { prob: 1, impact: 1 };
      case 'aceptar':
        return { prob: r.prob, impact: r.impact };
    }
  };

  const getCellColor = (prob: number, impact: number) => {
    const score = prob * impact;
    if (score >= 15) return 'bg-rose-100 hover:bg-rose-200 border-rose-200 text-rose-800'; // Extremo
    if (score >= 9) return 'bg-amber-100 hover:bg-amber-200 border-amber-200 text-amber-800'; // Alto
    if (score >= 5) return 'bg-yellow-50 hover:bg-yellow-100 border-yellow-200 text-yellow-800'; // Moderado
    return 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200 text-[#006837]'; // Bajo
  };

  return (
    <div className="bg-white rounded-2xl border border-emerald-100 shadow-sm p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-emerald-100 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-emerald-50 text-[#006837] rounded-lg">
              <AlertTriangle className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-xl font-bold text-[#004D28]">Matriz de Calor de Riesgos 5x5 (ISO 31000)</h3>
              <p className="text-xs text-slate-500">Mapeo dinámico de severidad, riesgo inherente y riesgo residual</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#006837] transition-colors self-start md:self-auto cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Restablecer Matriz
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 5x5 Heatmap Matrix */}
        <div className="lg:col-span-7 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
            <span className="font-bold text-[#004D28] uppercase">Eje Vertical: Probabilidad (1 a 5)</span>
            <span className="font-bold text-[#004D28] uppercase">Eje Horizontal: Impacto (1 a 5)</span>
          </div>

          <div className="space-y-1.5">
            {[5, 4, 3, 2, 1].map((probVal) => (
              <div key={probVal} className="flex items-center gap-1.5">
                <span className="w-6 text-xs font-mono font-bold text-slate-500 text-right shrink-0">
                  P{probVal}
                </span>

                <div className="grid grid-cols-5 gap-1.5 flex-1">
                  {[1, 2, 3, 4, 5].map((impVal) => {
                    // Check which risks fall here
                    const cellRisks = risks.filter((r) => {
                      const c = getCoords(r);
                      return c.prob === probVal && c.impact === impVal;
                    });

                    return (
                      <div
                        key={impVal}
                        className={`h-14 rounded-lg border flex flex-col items-center justify-center p-1 transition-all relative ${getCellColor(
                          probVal,
                          impVal
                        )}`}
                      >
                        <span className="text-[10px] font-mono opacity-50 absolute top-1 left-1.5">
                          {probVal * impVal}
                        </span>

                        <div className="flex flex-wrap items-center justify-center gap-1">
                          {cellRisks.map((cr) => (
                            <button
                              key={cr.id}
                              onClick={() => setSelectedRiskId(cr.id)}
                              className={`w-6 h-6 rounded-full text-[10px] font-bold flex items-center justify-center shadow-xs cursor-pointer transition-transform hover:scale-110 ${
                                cr.id === selectedRiskId
                                  ? 'bg-[#004D28] text-white ring-2 ring-emerald-400'
                                  : cr.treated
                                  ? 'bg-[#006837] text-white'
                                  : 'bg-rose-700 text-white'
                              }`}
                              title={`${cr.name} (Severidad: ${probVal * impVal})`}
                            >
                              {cr.id.toUpperCase()}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Bottom Impact labels */}
            <div className="flex items-center gap-1.5 pt-1">
              <span className="w-6" />
              <div className="grid grid-cols-5 gap-1.5 flex-1 text-center text-[10px] font-mono font-bold text-slate-500">
                <span>I1 (Insignif)</span>
                <span>I2 (Menor)</span>
                <span>I3 (Moderado)</span>
                <span>I4 (Mayor)</span>
                <span>I5 (Crítico)</span>
              </div>
            </div>
          </div>

          {/* Color Legend */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[11px] text-center">
            <span className="p-1 rounded bg-emerald-100 text-[#006837] font-semibold border border-emerald-200">
              Bajo (1-4)
            </span>
            <span className="p-1 rounded bg-yellow-100 text-yellow-800 font-semibold border border-yellow-200">
              Moderado (5-8)
            </span>
            <span className="p-1 rounded bg-amber-100 text-amber-800 font-semibold border border-amber-200">
              Alto (9-14)
            </span>
            <span className="p-1 rounded bg-rose-100 text-rose-800 font-semibold border border-rose-200">
              Extremo (15-25)
            </span>
          </div>
          <p className="text-[10px] text-slate-500">
            Nota: Escala numérica 5×5 ilustrativa; ISO 31000:2018 permite definir criterios y umbrales según el contexto organizacional.
          </p>
        </div>

        {/* Right: Risk Treatment Panel */}
        <div className="lg:col-span-5 bg-emerald-50/40 p-4 rounded-xl border border-emerald-100 space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-wider font-bold text-[#006837]">
                Riesgo Seleccionado:
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  selectedRisk.treated
                    ? 'bg-emerald-100 text-[#006837]'
                    : 'bg-rose-100 text-rose-800'
                }`}
              >
                {selectedRisk.treated ? '✓ Control Aplicado' : '⚠ Riesgo Inherente Activo'}
              </span>
            </div>
            <h4 className="text-sm font-bold text-slate-900 mt-1">{selectedRisk.name}</h4>
            <p className="text-xs text-slate-600 mt-1">{selectedRisk.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 bg-white rounded-lg border border-slate-200">
              <span className="block text-[10px] text-slate-500">Severidad Inherente:</span>
              <span className="text-sm font-bold text-rose-700">
                {selectedRisk.prob * selectedRisk.impact} / 25
              </span>
            </div>

            <div className="p-2.5 bg-white rounded-lg border border-slate-200">
              <span className="block text-[10px] text-slate-500">Severidad Residual:</span>
              <span className="text-sm font-bold text-[#006837]">
                {getCoords(selectedRisk).prob * getCoords(selectedRisk).impact} / 25
              </span>
            </div>
          </div>

          {/* Action Decision Buttons */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-700">
              Seleccionar Estrategia de Tratamiento (síntesis clásica / ISO 31000):
            </label>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleApplyControl(selectedRisk.id, 'mitigar')}
                className={`p-2.5 rounded-lg border text-xs font-semibold text-left transition-colors cursor-pointer ${
                  selectedRisk.treated && selectedRisk.treatment === 'mitigar'
                    ? 'bg-[#006837] text-white border-[#006837]'
                    : 'bg-white hover:bg-emerald-50 border-slate-200 text-slate-800'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" />
                  <span>1. Mitigar</span>
                </div>
                <span className="text-[10px] block opacity-80 mt-0.5">Controles y redundancia</span>
              </button>

              <button
                onClick={() => handleApplyControl(selectedRisk.id, 'transferir')}
                className={`p-2.5 rounded-lg border text-xs font-semibold text-left transition-colors cursor-pointer ${
                  selectedRisk.treated && selectedRisk.treatment === 'transferir'
                    ? 'bg-[#006837] text-white border-[#006837]'
                    : 'bg-white hover:bg-emerald-50 border-slate-200 text-slate-800'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>2. Transferir</span>
                </div>
                <span className="text-[10px] block opacity-80 mt-0.5">Póliza o SLA tercero</span>
              </button>

              <button
                onClick={() => handleApplyControl(selectedRisk.id, 'evitar')}
                className={`p-2.5 rounded-lg border text-xs font-semibold text-left transition-colors cursor-pointer ${
                  selectedRisk.treated && selectedRisk.treatment === 'evitar'
                    ? 'bg-[#006837] text-white border-[#006837]'
                    : 'bg-white hover:bg-emerald-50 border-slate-200 text-slate-800'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>3. Evitar</span>
                </div>
                <span className="text-[10px] block opacity-80 mt-0.5">Cancelar la actividad</span>
              </button>

              <button
                onClick={() => handleApplyControl(selectedRisk.id, 'aceptar')}
                className={`p-2.5 rounded-lg border text-xs font-semibold text-left transition-colors cursor-pointer ${
                  selectedRisk.treated && selectedRisk.treatment === 'aceptar'
                    ? 'bg-[#006837] text-white border-[#006837]'
                    : 'bg-white hover:bg-emerald-50 border-slate-200 text-slate-800'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-mono font-bold">●</span>
                  <span>4. Aceptar</span>
                </div>
                <span className="text-[10px] block opacity-80 mt-0.5">Asumir impacto residual</span>
              </button>
            </div>
          </div>

          <div className="p-3 bg-white rounded-lg border border-emerald-200 text-xs text-slate-700">
            <strong>Principio Clave:</strong> Al aplicar un control (ej. Mitigar con respaldos cifrados), el riesgo transita desde la zona Roja/Naranja hacia la zona Verde Aceptable, protegiendo la sostenibilidad de la organización.
          </div>
        </div>
      </div>
    </div>
  );
};
