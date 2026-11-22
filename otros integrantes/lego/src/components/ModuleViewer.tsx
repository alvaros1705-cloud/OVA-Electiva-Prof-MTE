import React, { useState } from 'react';
import { ModuleData } from '../types';
import {
  BookOpen,
  FileText,
  Cpu,
  HelpCircle,
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  RotateCcw,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { DesignThinkingSim } from './simulators/DesignThinkingSim';
import { CybersecuritySim } from './simulators/CybersecuritySim';
import { RiskHeatmapSim } from './simulators/RiskHeatmapSim';
import { CultureRadarSim } from './simulators/CultureRadarSim';
import { ChangeKotterSim } from './simulators/ChangeKotterSim';

interface ModuleViewerProps {
  module: ModuleData;
  onBack: () => void;
  onCompleteModule: (moduleId: string, score: number) => void;
  isCompleted: boolean;
  savedScore?: number;
  onNextModule?: () => void;
  hasNextModule?: boolean;
  onOpenCertificate?: () => void;
}

export const ModuleViewer: React.FC<ModuleViewerProps> = ({
  module,
  onBack,
  onCompleteModule,
  isCompleted,
  savedScore,
  onNextModule,
  hasNextModule,
  onOpenCertificate
}) => {
  const [activeTab, setActiveTab] = useState<'teoria' | 'caso' | 'simulador' | 'quiz'>('teoria');

  // Case Study state
  const [selectedCaseOption, setSelectedCaseOption] = useState<string | null>(null);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(savedScore || 0);

  const handleSelectQuizAnswer = (qId: string, optIndex: number) => {
    if (quizSubmitted) return;
    setQuizAnswers((prev) => ({ ...prev, [qId]: optIndex }));
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    module.quiz.forEach((q) => {
      if (quizAnswers[q.id] === q.correctIndex) {
        correctCount += 1;
      }
    });

    const calculatedScore = Math.round((correctCount / module.quiz.length) * 100);
    setQuizScore(calculatedScore);
    setQuizSubmitted(true);

    if (calculatedScore >= 75) {
      onCompleteModule(module.id, calculatedScore);
    }
  };

  const handleRetakeQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
  };

  const renderSimulator = () => {
    switch (module.simulatorType) {
      case 'design-thinking':
        return <DesignThinkingSim />;
      case 'ciberseguridad':
        return <CybersecuritySim />;
      case 'riesgos':
        return <RiskHeatmapSim />;
      case 'cultura':
        return <CultureRadarSim />;
      case 'cambio':
        return <ChangeKotterSim />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-emerald-100">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#006837] hover:text-[#004D28] transition-colors cursor-pointer self-start"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al Catálogo del OVA</span>
          </button>

          <div className="flex items-center gap-2">
            {isCompleted && (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#006837] bg-emerald-100/80 px-2.5 py-1 rounded-md">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Módulo Aprobado {quizScore ? `(${quizScore}%)` : ''}</span>
              </span>
            )}
            <span className="text-xs text-slate-500 font-mono">
              {module.duration}
            </span>
          </div>
        </div>

        {/* Module Title Banner */}
        <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-2xs space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#006837] bg-emerald-50 px-2 py-0.5 rounded">
              {module.level}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F2417]">
            {module.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
            {module.subtitle}
          </p>
        </div>

        {/* Tab Navigation Controls */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-emerald-50/70 p-1.5 rounded-xl border border-emerald-100">
          <button
            onClick={() => setActiveTab('teoria')}
            className={`py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'teoria'
                ? 'bg-[#006837] text-white shadow-xs'
                : 'text-slate-700 hover:bg-white hover:text-[#006837]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>1. Lección y Teoría</span>
          </button>

          <button
            onClick={() => setActiveTab('caso')}
            className={`py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'caso'
                ? 'bg-[#006837] text-white shadow-xs'
                : 'text-slate-700 hover:bg-white hover:text-[#006837]'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>2. Caso de Estudio</span>
          </button>

          <button
            onClick={() => setActiveTab('simulador')}
            className={`py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'simulador'
                ? 'bg-[#006837] text-white shadow-xs'
                : 'text-slate-700 hover:bg-white hover:text-[#006837]'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>3. Laboratorio</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'quiz'
                ? 'bg-[#006837] text-white shadow-xs'
                : 'text-slate-700 hover:bg-white hover:text-[#006837]'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>4. Evaluación Quiz</span>
          </button>
        </div>

        {/* Tab 1: Teoria y Fundamentos */}
        {activeTab === 'teoria' && (
          <div className="space-y-6">
            {module.sections.map((sec, idx) => (
              <div
                key={sec.id}
                className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-2xs space-y-4"
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-50 text-[#006837] text-xs font-bold flex items-center justify-center border border-emerald-200">
                    {idx + 1}
                  </span>
                  <h2 className="text-lg font-serif font-bold text-[#004D28]">
                    {sec.title}
                  </h2>
                </div>

                <div className="text-xs sm:text-sm text-slate-700 space-y-3 leading-relaxed">
                  {sec.content.map((p, pIdx) => (
                    <p key={pIdx} className="whitespace-pre-line">
                      {p}
                    </p>
                  ))}
                </div>

                {/* Key takeaways callout */}
                <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100 space-y-2">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-[#006837] block">
                    Puntos Clave de Aprendizaje:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {sec.keyPoints.map((pt, ptIdx) => (
                      <li key={ptIdx} className="flex items-start gap-2">
                        <span className="text-[#006837] font-bold">✓</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Practical application note */}
                {sec.practicalApplication && (
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
                    <strong className="text-slate-800">Ejemplo Ilustrativo de Aplicación:</strong> {sec.practicalApplication}
                  </div>
                )}
              </div>
            ))}

            {module.references && module.references.length > 0 && (
              <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-2xs space-y-2.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#006837] block">
                  Fuentes y Referencias Académicas del Módulo
                </span>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {module.references.map((ref, rIdx) => (
                    <li key={rIdx} className="leading-relaxed">
                      <strong className="text-slate-800">{ref.title}</strong> · {ref.institution} ({ref.detail})
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveTab('caso')}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#006837] hover:bg-[#004D28] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                <span>Avanzar al Caso de Estudio</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Caso de Estudio */}
        {activeTab === 'caso' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-emerald-100 shadow-2xs space-y-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#006837] bg-emerald-50 px-2 py-0.5 rounded">
                Escenario Pedagógico Simulado
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0F2417] mt-2">
                {module.caseStudy.title}
              </h2>
            </div>

            <div className="p-4 bg-emerald-50/40 rounded-xl border border-emerald-100 text-xs sm:text-sm text-slate-700 space-y-2 leading-relaxed">
              <strong className="block text-sm text-[#004D28]">Escenario Organizacional:</strong>
              <p>{module.caseStudy.companyScenario}</p>
              <p className="pt-2 text-slate-600">{module.caseStudy.contextBackground}</p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs sm:text-sm font-bold text-[#004D28]">
                Dilema Estratégico: {module.caseStudy.dilemma}
              </h3>

              <div className="space-y-3">
                {module.caseStudy.options.map((opt) => {
                  const isSelected = selectedCaseOption === opt.id;

                  return (
                    <div key={opt.id} className="space-y-2">
                      <button
                        onClick={() => setSelectedCaseOption(opt.id)}
                        className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm transition-all cursor-pointer flex items-start justify-between gap-3 ${
                          isSelected
                            ? opt.isBest
                              ? 'bg-emerald-50 border-[#006837] ring-1 ring-[#006837]'
                              : 'bg-rose-50 border-rose-400 ring-1 ring-rose-400'
                            : 'bg-white border-slate-200 hover:border-emerald-300'
                        }`}
                      >
                        <span className="text-slate-800 font-medium leading-relaxed">
                          {opt.text}
                        </span>
                        {isSelected && (
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded shrink-0 ${
                              opt.isBest ? 'bg-emerald-100 text-[#006837]' : 'bg-rose-100 text-rose-700'
                            }`}
                          >
                            {opt.isBest ? 'Opción Óptima' : 'Opción Desfavorable'}
                          </span>
                        )}
                      </button>

                      {isSelected && (
                        <div
                          className={`p-3.5 rounded-xl text-xs leading-relaxed ${
                            opt.isBest
                              ? 'bg-emerald-100/70 text-[#004D28] border border-emerald-200'
                              : 'bg-rose-100/70 text-rose-900 border border-rose-200'
                          }`}
                        >
                          <strong>Análisis Pedagógico:</strong> {opt.feedback}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
              <strong className="text-slate-800 block mb-1">Conclusión del Caso:</strong>
              {module.caseStudy.learningOutcome}
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => setActiveTab('teoria')}
                className="text-xs text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                ← Volver a la Teoría
              </button>

              <button
                onClick={() => setActiveTab('simulador')}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#006837] hover:bg-[#004D28] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                <span>Ir al Laboratorio Interactivo</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Simulador */}
        {activeTab === 'simulador' && (
          <div className="space-y-6">
            {renderSimulator()}

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => setActiveTab('caso')}
                className="text-xs text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                ← Volver al Caso de Estudio
              </button>

              <button
                onClick={() => setActiveTab('quiz')}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#006837] hover:bg-[#004D28] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                <span>Avanzar a la Evaluación Quiz</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Tab 4: Evaluacion Quiz */}
        {activeTab === 'quiz' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-emerald-100 shadow-2xs space-y-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#006837] bg-emerald-50 px-2 py-0.5 rounded">
                Autoevaluación Formativa del OVA
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0F2417] mt-2">
                Cuestionario de Conocimientos: {module.shortTitle}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Responde las 4 preguntas para verificar tu progreso en el OVA. Se aprueba con un puntaje mínimo del 75%.
              </p>
            </div>

            {/* Questions List */}
            <div className="space-y-6">
              {module.quiz.map((q, qIndex) => {
                const selectedOpt = quizAnswers[q.id];

                return (
                  <div key={q.id} className="p-4 bg-slate-50/60 rounded-xl border border-slate-200 space-y-3">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                      {qIndex + 1}. {q.question}
                    </h3>

                    <div className="space-y-2">
                      {q.options.map((opt, optIndex) => {
                        const isChosen = selectedOpt === optIndex;
                        let optionStyle = 'bg-white border-slate-200 hover:border-emerald-300 text-slate-700';

                        if (quizSubmitted) {
                          if (optIndex === q.correctIndex) {
                            optionStyle = 'bg-emerald-100 border-[#006837] text-[#004D28] font-bold';
                          } else if (isChosen && optIndex !== q.correctIndex) {
                            optionStyle = 'bg-rose-100 border-rose-400 text-rose-800';
                          }
                        } else if (isChosen) {
                          optionStyle = 'bg-emerald-50 border-[#006837] text-[#006837] font-semibold';
                        }

                        return (
                          <button
                            key={optIndex}
                            onClick={() => handleSelectQuizAnswer(q.id, optIndex)}
                            disabled={quizSubmitted}
                            className={`w-full p-3 rounded-lg border text-left text-xs transition-all flex items-start gap-2.5 cursor-pointer disabled:cursor-default ${optionStyle}`}
                          >
                            <span className="font-mono text-[11px] opacity-60">
                              {String.fromCharCode(65 + optIndex)}.
                            </span>
                            <span className="leading-relaxed">{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {quizSubmitted && (
                      <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-600">
                        <strong className="text-[#006837]">Explicación:</strong> {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quiz Results and Action */}
            {!quizSubmitted ? (
              <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                <span className="text-xs text-slate-500">
                  {Object.keys(quizAnswers).length} de {module.quiz.length} preguntas respondidas
                </span>

                <button
                  onClick={handleSubmitQuiz}
                  disabled={Object.keys(quizAnswers).length < module.quiz.length}
                  className="px-6 py-2.5 bg-[#006837] hover:bg-[#004D28] disabled:opacity-50 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Calificar Evaluación
                </button>
              </div>
            ) : (
              <div className="p-5 rounded-xl border space-y-4 bg-emerald-50/60 border-emerald-200">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-600 block">Puntaje Obtenido:</span>
                    <span className="text-2xl font-serif font-bold text-[#006837]">
                      {quizScore} / 100%
                    </span>
                  </div>

                  {quizScore >= 75 ? (
                    <div className="flex items-center gap-2 text-xs font-bold text-[#004D28] bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-300">
                      <Sparkles className="w-4 h-4 text-[#006837]" />
                      <span>¡Módulo Aprobado!</span>
                    </div>
                  ) : (
                    <button
                      onClick={handleRetakeQuiz}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-slate-700 hover:text-[#006837] text-xs font-bold rounded-lg border border-slate-300 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reintentar Evaluación</span>
                    </button>
                  )}
                </div>

                {quizScore >= 75 ? (
                  <div className="text-xs text-slate-700">
                    ¡Felicitaciones! Has demostrado dominio de las competencias clave de <strong>{module.title}</strong>. El progreso ha sido guardado exitosamente.
                  </div>
                ) : (
                  <div className="text-xs text-rose-800">
                    Necesitas al menos un 75% para aprobar el módulo. Revisa las explicaciones de cada pregunta y vuelve a intentarlo.
                  </div>
                )}

                {(hasNextModule || (quizScore >= 75 && onOpenCertificate)) && (
                  <div className="pt-2 flex flex-wrap justify-end gap-3">
                    {quizScore >= 75 && onOpenCertificate && (
                      <button
                        onClick={onOpenCertificate}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#DFA035] hover:bg-[#C98B24] text-slate-900 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                      >
                        <span>Ver Constancia OVA</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                    {hasNextModule && (
                      <button
                        onClick={onNextModule}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#004D28] hover:bg-[#006837] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                      >
                        <span>Continuar al Siguiente Módulo</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
