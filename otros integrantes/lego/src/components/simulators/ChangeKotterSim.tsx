import React, { useState } from 'react';
import { RefreshCw, CheckCircle2, RotateCcw, TrendingUp, ShieldAlert, ArrowRight } from 'lucide-react';

interface KotterStep {
  step: number;
  title: string;
  phase: 'Clima' | 'Compromiso' | 'Sostenibilidad';
  description: string;
  options: {
    text: string;
    resistanceChange: number; // e.g. -15
    adoptionChange: number; // e.g. +20
    isBest: boolean;
    feedback: string;
  }[];
}

const KOTTER_STEPS: KotterStep[] = [
  {
    step: 1,
    title: '1. Crear Sentido de Urgencia',
    phase: 'Clima',
    description: 'Demostrar a la institución por qué mantener el statu quo pone en riesgo la acreditación y el futuro.',
    options: [
      {
        text: 'Enviar un correo intimidante amenazando con despidos a quien no utilice la nueva plataforma.',
        resistanceChange: 25,
        adoptionChange: -10,
        isBest: false,
        feedback: 'Inadecuado. El miedo genera resistencia encubierta y apatía generalizada.'
      },
      {
        text: 'Presentar datos transparentes sobre la deserción de estudiantes y el impacto de innovar juntos.',
        resistanceChange: -15,
        adoptionChange: 25,
        isBest: true,
        feedback: '¡Excelente! Compartir la realidad objetiva despierta un sentido de urgencia constructivo.'
      }
    ]
  },
  {
    step: 2,
    title: '2. Formar una Coalición Conductora',
    phase: 'Clima',
    description: 'Reunir un grupo multidisciplinario de líderes formales e informales con alta credibilidad.',
    options: [
      {
        text: 'Nombrar únicamente al Director de Sistemas para que decida todo sin consultar a los docentes.',
        resistanceChange: 20,
        adoptionChange: -5,
        isBest: false,
        feedback: 'Aislar el proyecto en tecnología provoca rechazo en las facultades académicas.'
      },
      {
        text: 'Integrar docentes influyentes, decanos, directivos y líderes estudiantiles en el comité.',
        resistanceChange: -20,
        adoptionChange: 30,
        isBest: true,
        feedback: '¡Correcto! Una coalición transversal garantiza empatía y tracción en todas las áreas.'
      }
    ]
  },
  {
    step: 3,
    title: '3. Desarrollar una Visión e Iniciativas',
    phase: 'Clima',
    description: 'Crear una visión inspiradora y fácil de entender en menos de 5 minutos.',
    options: [
      {
        text: 'Elaborar un documento técnico denso de 250 páginas lleno de acrónimos informáticos.',
        resistanceChange: 15,
        adoptionChange: -5,
        isBest: false,
        feedback: 'Nadie lee documentos excesivamente técnicos; genera confusión y desapego.'
      },
      {
        text: 'Resumir la visión en un relato inspirador: "Clases más dinámicas, menos trámites en papel, más tiempo para investigar".',
        resistanceChange: -15,
        adoptionChange: 20,
        isBest: true,
        feedback: '¡Gran visión! Conecta con los deseos cotidianos de la comunidad universitaria.'
      }
    ]
  },
  {
    step: 4,
    title: '4. Comunicar la Visión Masivamente',
    phase: 'Compromiso',
    description: 'Multiplicar por 10 los canales y predicar con el ejemplo constante de los directivos.',
    options: [
      {
        text: 'Mencionar el proyecto una sola vez en el discurso inaugural del semestre.',
        resistanceChange: 10,
        adoptionChange: 0,
        isBest: false,
        feedback: 'La comunicación aislada se olvida en 48 horas.'
      },
      {
        text: 'Talleres semanales, infografías, testimonios en video y sesiones abiertas de preguntas sin filtro.',
        resistanceChange: -20,
        adoptionChange: 25,
        isBest: true,
        feedback: '¡Perfecto! La comunicación bidireccional continua vence el rumor y la desinformación.'
      }
    ]
  },
  {
    step: 5,
    title: '5. Empoderar y Eliminar Obstáculos',
    phase: 'Compromiso',
    description: 'Remover políticas obsoletas, silos departamentales e incentivos desalineados.',
    options: [
      {
        text: 'Mantener vigentes las firmas en papel obligatorias mientras se les pide que usen el sistema digital.',
        resistanceChange: 25,
        adoptionChange: -15,
        isBest: false,
        feedback: 'Duplicar el trabajo genera frustración y destruye la credibilidad del cambio.'
      },
      {
        text: 'Derogar resoluciones arcaicas y dotar de soporte técnico en tiempo real en los salones.',
        resistanceChange: -25,
        adoptionChange: 20,
        isBest: true,
        feedback: '¡Excelente! Remover fricciones empodera al equipo para adoptar la transformación sin trabas.'
      }
    ]
  },
  {
    step: 6,
    title: '6. Generar Victorias a Corto Plazo (Quick Wins)',
    phase: 'Compromiso',
    description: 'Producir resultados tangibles y visibles en los primeros 60-90 días para callar a los escépticos.',
    options: [
      {
        text: 'Esperar dos años completos hasta tener el sistema perfecto antes de mostrar cualquier avance.',
        resistanceChange: 30,
        adoptionChange: -20,
        isBest: false,
        feedback: 'Sin victorias tempranas, la fatiga del cambio mata el entusiasmo institucional.'
      },
      {
        text: 'Lanzar un piloto exitoso en el primer mes y premiar públicamente a los docentes pioneros.',
        resistanceChange: -20,
        adoptionChange: 35,
        isBest: true,
        feedback: '¡Logro contundente! Las victorias rápidas validan la dirección y atraen a los indecisos.'
      }
    ]
  },
  {
    step: 7,
    title: '7. Consolidar Ganancias y Más Cambio',
    phase: 'Sostenibilidad',
    description: 'Aprovechar la credibilidad de los primeros logros para atacar problemas más estructurales.',
    options: [
      {
        text: 'Declarar la victoria total en el primer mes y disolver el equipo de gestión del cambio.',
        resistanceChange: 20,
        adoptionChange: -25,
        isBest: false,
        feedback: 'Cantar victoria prematuramente es el fallo más clásico según Kotter: la organización recae en viejos hábitos.'
      },
      {
        text: 'Aprovechar el impulso para renovar los planes de estudio y actualizar las aulas híbridas restantes.',
        resistanceChange: -15,
        adoptionChange: 25,
        isBest: true,
        feedback: '¡Impecable! La inercia positiva permite abordar transformaciones más complejas.'
      }
    ]
  },
  {
    step: 8,
    title: '8. Anclar el Cambio en la Cultura',
    phase: 'Sostenibilidad',
    description: 'Vincular los nuevos comportamientos con los ascensos, la inducción de nuevos docentes y la identidad Unisimón.',
    options: [
      {
        text: 'No formalizar nada y confiar en que la gente seguirá haciéndolo por inercia.',
        resistanceChange: 15,
        adoptionChange: -10,
        isBest: false,
        feedback: 'Sin anclaje institucional, cuando los líderes pioneros se marchan, el cambio desaparece.'
      },
      {
        text: 'Institucionalizar las nuevas prácticas en los reglamentos y en el modelo pedagógico oficial.',
        resistanceChange: -10,
        adoptionChange: 20,
        isBest: true,
        feedback: '¡Victoria Sostenible! El cambio ya no es "el nuevo proyecto", sino "la forma de trabajar en Unisimón".'
      }
    ]
  }
];

export const ChangeKotterSim: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [resistance, setResistance] = useState(60); // 0-100 (lower is better)
  const [adoption, setAdoption] = useState(20); // 0-100 (higher is better)
  const [selectedChoices, setSelectedChoices] = useState<Record<number, number>>({});

  const currentStep = KOTTER_STEPS[currentStepIndex];

  const handleMakeChoice = (optionIndex: number) => {
    const opt = currentStep.options[optionIndex];
    setSelectedChoices((prev) => ({ ...prev, [currentStepIndex]: optionIndex }));

    setResistance((r) => Math.max(5, Math.min(100, r + opt.resistanceChange)));
    setAdoption((a) => Math.max(0, Math.min(100, a + opt.adoptionChange)));
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setResistance(60);
    setAdoption(20);
    setSelectedChoices({});
  };

  const isComplete = currentStepIndex === KOTTER_STEPS.length - 1 && selectedChoices[currentStepIndex] !== undefined;

  return (
    <div className="bg-white rounded-2xl border border-emerald-100 shadow-sm p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-emerald-100 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-emerald-50 text-[#006837] rounded-lg">
              <RefreshCw className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-xl font-bold text-[#004D28]">Simulador de Gestión del Cambio (John Kotter)</h3>
              <p className="text-xs text-slate-500">Recorre los 8 pasos estratégicos controlando la resistencia y la adopción</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#006837] transition-colors self-start md:self-auto cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reiniciar Simulación
        </button>
      </div>

      {/* Thermometers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Resistance Meter */}
        <div className="p-4 bg-rose-50/60 rounded-xl border border-rose-200">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="flex items-center gap-1.5 font-bold text-rose-800">
              <ShieldAlert className="w-4 h-4 text-rose-600" /> Nivel de Resistencia Organizacional:
            </span>
            <span className="font-mono font-bold text-rose-700">{resistance}%</span>
          </div>
          <div className="w-full bg-rose-200/60 rounded-full h-2.5 overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                resistance <= 30 ? 'bg-emerald-500' : resistance <= 60 ? 'bg-amber-500' : 'bg-rose-600'
              }`}
              style={{ width: `${resistance}%` }}
            />
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block">
            {resistance <= 30 ? '🟢 Resistencia Mínima (Equipo alineado)' : resistance <= 60 ? '🟡 Resistencia Moderada (Dudas activas)' : '🔴 Resistencia Alta (Riesgo de bloqueo)'}
          </span>
        </div>

        {/* Adoption Meter */}
        <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="flex items-center gap-1.5 font-bold text-[#004D28]">
              <TrendingUp className="w-4 h-4 text-[#006837]" /> Grado de Adopción & Compromiso:
            </span>
            <span className="font-mono font-bold text-[#006837]">{adoption}%</span>
          </div>
          <div className="w-full bg-emerald-200/60 rounded-full h-2.5 overflow-hidden">
            <div
              className="h-full bg-[#006837] transition-all duration-300"
              style={{ width: `${adoption}%` }}
            />
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block">
            {adoption >= 80 ? '🟢 Transformación Exitosa' : adoption >= 50 ? '🟡 Adopción en Proceso' : '🔴 Adopción Inicial Incipiente'}
          </span>
        </div>
      </div>

      <p className="text-[10px] text-slate-500 -mt-3">
        Nota: Los termómetros emplean una escala pedagógica ilustrativa para visualizar el impacto de las decisiones en los 8 pasos de Kotter (1996).
      </p>

      {/* Step Stepper Visual */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2">
        {KOTTER_STEPS.map((s, idx) => {
          const isCurrent = idx === currentStepIndex;
          const isAnswered = selectedChoices[idx] !== undefined;

          return (
            <button
              key={s.step}
              onClick={() => setCurrentStepIndex(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                isCurrent
                  ? 'bg-[#004D28] text-white shadow-xs'
                  : isAnswered
                  ? 'bg-emerald-100 text-[#006837] hover:bg-emerald-200'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Paso {s.step} {isAnswered && '✓'}
            </button>
          );
        })}
      </div>

      {/* Active Step Scenario & Decision */}
      <div className="p-5 bg-emerald-50/30 rounded-2xl border border-emerald-100 space-y-4">
        <div>
          <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
            Fase de {currentStep.phase} · Paso {currentStep.step} de 8
          </span>
          <h4 className="text-base font-bold text-[#004D28] mt-1.5">{currentStep.title}</h4>
          <p className="text-xs text-slate-600 mt-1">{currentStep.description}</p>
        </div>

        <div className="space-y-2.5">
          <label className="block text-xs font-semibold text-slate-700">¿Qué decisión de liderazgo adoptas en este paso?</label>
          {currentStep.options.map((opt, optIdx) => {
            const isSelected = selectedChoices[currentStepIndex] === optIdx;

            return (
              <div key={optIdx} className="space-y-2">
                <button
                  onClick={() => handleMakeChoice(optIdx)}
                  className={`w-full p-3.5 rounded-xl border text-left text-xs transition-all cursor-pointer flex items-start justify-between gap-3 ${
                    isSelected
                      ? opt.isBest
                        ? 'bg-emerald-50 border-[#006837] ring-1 ring-[#006837]'
                        : 'bg-rose-50 border-rose-400 ring-1 ring-rose-400'
                      : 'bg-white border-slate-200 hover:border-emerald-300'
                  }`}
                >
                  <span className="text-slate-800 font-medium leading-relaxed">{opt.text}</span>
                  {isSelected && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded shrink-0 ${opt.isBest ? 'bg-emerald-100 text-[#006837]' : 'bg-rose-100 text-rose-700'}`}>
                      {opt.isBest ? 'Recomendada' : 'No Recomendada'}
                    </span>
                  )}
                </button>

                {isSelected && (
                  <div className={`p-3 rounded-lg text-xs leading-relaxed ${opt.isBest ? 'bg-emerald-100/70 text-[#004D28]' : 'bg-rose-100/70 text-rose-900'}`}>
                    <strong>Retroalimentación de Kotter:</strong> {opt.feedback}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Step Navigation */}
        <div className="flex justify-between items-center pt-2 border-t border-emerald-100">
          <button
            onClick={() => setCurrentStepIndex((i) => Math.max(0, i - 1))}
            disabled={currentStepIndex === 0}
            className="text-xs text-slate-500 hover:text-slate-800 disabled:opacity-30 cursor-pointer"
          >
            ← Paso Anterior
          </button>

          {currentStepIndex < KOTTER_STEPS.length - 1 ? (
            <button
              onClick={() => setCurrentStepIndex((i) => i + 1)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#006837] hover:bg-[#004D28] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Siguiente Paso de Kotter
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            isComplete && (
              <span className="text-xs font-bold text-[#006837] flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-[#006837]" />
                ¡Ruta de los 8 Pasos Finalizada!
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
};
