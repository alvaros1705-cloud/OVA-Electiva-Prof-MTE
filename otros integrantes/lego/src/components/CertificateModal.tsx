import React, { useState, useEffect } from 'react';
import { UNISIMON_LOGO, TECH_BADGE_LOGO } from '../data/courseData';
import { generateConstanciaPdf } from '../utils/generateConstanciaPdf';
import { ModuleData } from '../types';
import { X, Download, CheckCircle, ShieldCheck, Edit3, Clock } from 'lucide-react';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  studentId: string;
  onUpdateStudentInfo: (name: string, id: string) => void;
  completedCount: number;
  totalModules: number;
  modules: ModuleData[];
  completedModules: string[];
  quizScores: Record<string, number>;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  studentName,
  studentId,
  onUpdateStudentInfo,
  completedCount,
  totalModules,
  modules,
  completedModules,
  quizScores
}) => {
  const [nameInput, setNameInput] = useState(studentName || 'Estudiante de Práctica (Ejemplo)');
  const [idInput, setIdInput] = useState(studentId || 'Documento de ejemplo');
  const [isEditing, setIsEditing] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  useEffect(() => {
    setNameInput(studentName || 'Estudiante de Práctica (Ejemplo)');
    setIdInput(studentId || 'Documento de ejemplo');
    setFeedbackMsg(null);
  }, [studentName, studentId, isOpen]);

  if (!isOpen) return null;

  const isAllCompleted = completedCount >= totalModules && totalModules > 0;
  const isDefaultName = nameInput === 'Estudiante de Práctica (Ejemplo)';

  const currentDate = new Date().toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const handleDownloadPdf = async () => {
    setIsGeneratingPdf(true);
    setFeedbackMsg(null);
    try {
      await generateConstanciaPdf({
        studentName: nameInput,
        studentId: idInput,
        completedCount,
        totalModules,
        modules,
        completedModules,
        quizScores,
        issueDate: currentDate
      });
      setFeedbackMsg('Archivo PDF generado y descargado correctamente.');
    } catch {
      setFeedbackMsg('No se pudo generar el archivo PDF automáticamente. Intenta nuevamente.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleSaveInfo = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = nameInput.trim() || 'Estudiante de Práctica (Ejemplo)';
    const cleanId = idInput.trim() || 'Documento de ejemplo';
    setNameInput(cleanName);
    setIdInput(cleanId);
    onUpdateStudentInfo(cleanName, cleanId);
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-start sm:items-center justify-center p-4 print:static print:inset-auto print:overflow-visible print:bg-white print:backdrop-blur-none print:block print:p-0">
      <div className="bg-white rounded-3xl max-w-4xl w-full my-auto border border-emerald-200 shadow-2xl overflow-hidden relative print:shadow-none print:border-0 print:rounded-none print:max-w-none">
        {/* Top Control Bar (Hidden on print) */}
        <div className="no-print bg-[#004D28] text-white px-5 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-300 shrink-0" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Constancia Formativa de Práctica · OVA Sede Cúcuta
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className="px-3 py-1.5 rounded-lg border border-emerald-400/50 text-xs font-semibold text-emerald-100 hover:bg-emerald-800/70 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Cerrar Edición' : 'Personalizar Datos'}</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="px-3.5 py-1.5 bg-[#DFA035] hover:bg-[#C98B24] disabled:opacity-60 text-slate-900 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isGeneratingPdf ? 'Generando PDF...' : 'Descargar PDF'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar constancia"
              className="p-1.5 text-emerald-200 hover:text-white transition-colors cursor-pointer rounded-lg hover:bg-emerald-900"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Status feedback bar */}
        {feedbackMsg && (
          <div className="no-print px-6 py-2 bg-emerald-100 border-b border-emerald-200 text-xs font-medium text-[#004D28] flex items-center justify-between gap-2">
            <span>{feedbackMsg}</span>
            <button
              type="button"
              onClick={() => setFeedbackMsg(null)}
              className="text-[11px] font-bold underline cursor-pointer"
            >
              Ocultar
            </button>
          </div>
        )}

        {/* Editing Form (Hidden on print) */}
        {isEditing && (
          <form onSubmit={handleSaveInfo} className="no-print p-4 sm:px-6 bg-emerald-50/80 border-b border-emerald-200 flex flex-wrap gap-4 items-end text-xs">
            <div className="flex-1 min-w-[200px]">
              <label className="block font-semibold text-slate-700 mb-1">Nombre completo del estudiante:</label>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Ej. Laura Camila Gómez"
                className="p-2 border border-slate-300 rounded-lg w-full bg-white focus:outline-none focus:border-[#006837]"
                required
              />
            </div>
            <div className="w-full sm:w-52">
              <label className="block font-semibold text-slate-700 mb-1">Documento / Código estudiantil:</label>
              <input
                type="text"
                value={idInput}
                onChange={(e) => setIdInput(e.target.value)}
                placeholder="Ej. C.C. o Código"
                className="p-2 border border-slate-300 rounded-lg w-full bg-white focus:outline-none focus:border-[#006837]"
                required
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-[#006837] text-white font-bold rounded-lg cursor-pointer hover:bg-[#004D28] transition-colors"
            >
              Guardar en Constancia
            </button>
          </form>
        )}

        {/* Notice if user hasn't personalized name yet */}
        {isDefaultName && !isEditing && (
          <div className="no-print px-6 py-2.5 bg-amber-50 border-b border-amber-200 flex flex-wrap items-center justify-between gap-2 text-xs text-amber-900">
            <span>Esta constancia muestra datos de ejemplo. Personaliza tu nombre y documento antes de imprimir o guardar en PDF.</span>
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="font-bold text-[#006837] underline cursor-pointer hover:text-[#004D28]"
            >
              Ingresar mis datos
            </button>
          </div>
        )}

        {/* PRINTABLE DIPLOMA CANVAS */}
        <div className="p-5 sm:p-10 bg-white relative print:p-0">
          <div className="border-4 border-[#006837] p-5 sm:p-8 rounded-2xl relative bg-gradient-to-b from-[#FAFDFB] via-white to-[#F5FAF6] shadow-inner print:shadow-none print:rounded-lg">
            <div className="border border-emerald-300 p-5 sm:p-7 rounded-xl space-y-5 text-center relative">
              {/* Header Logos Row */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-emerald-200">
                <img
                  src={UNISIMON_LOGO}
                  alt="Universidad Simón Bolívar"
                  className="h-14 sm:h-16 w-auto object-contain"
                />

                <div className="text-center sm:text-right space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block">
                    REGISTRO LOCAL DE PROGRESO
                  </span>
                  <span className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                    isAllCompleted
                      ? 'bg-emerald-100 text-[#004D28] border-emerald-300'
                      : 'bg-amber-50 text-amber-900 border-amber-200'
                  }`}>
                    {isAllCompleted
                      ? `Ruta Completa (${completedCount}/${totalModules} aprobados)`
                      : `Avance Parcial (${completedCount} de ${totalModules} aprobados)`}
                  </span>
                </div>
              </div>

              {/* Institutional Header */}
              <div className="space-y-1">
                <h3 className="text-xs sm:text-sm font-bold tracking-widest text-[#004D28] uppercase">
                  Universidad Simón Bolívar · Sede Cúcuta
                </h3>
                <p className="text-[11px] text-slate-500 italic">
                  Constancia formativa generada localmente en el navegador · Uso académico demostrativo
                </p>
                <p className="text-xs font-bold text-slate-700 pt-1 tracking-wider uppercase">
                  Registra el avance autónomo de:
                </p>
              </div>

              {/* Student Name */}
              <div className="py-1">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#006837] tracking-wide border-b-2 border-emerald-200 pb-2 inline-block px-6">
                  {nameInput}
                </h2>
                <p className="text-xs text-slate-600 mt-1.5 font-mono">
                  Identificación / Referencia: {idInput}
                </p>
              </div>

              {/* Course Title and Accomplishment */}
              <div className="space-y-2 max-w-2xl mx-auto">
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {completedCount === 0
                    ? 'Inicia su recorrido de práctica autónoma en los cinco núcleos del'
                    : `Ha aprobado ${completedCount} de los ${totalModules} módulos de práctica autónoma (umbral >= 75%) en el`}
                </p>
                <h4 className="text-base sm:text-xl font-serif font-bold text-[#0F2417]">
                  Objeto Virtual de Aprendizaje (OVA): <br />
                  <span className="text-[#006837]">
                    Innovación, Ciberseguridad, Gestión de Riesgos, Cultura Organizacional y Gestión del Cambio
                  </span>
                </h4>
              </div>

              {/* Exact Module-by-Module Progress Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-left pt-1">
                {modules.map((m, idx) => {
                  const done = completedModules.includes(m.id);
                  const score = quizScores[m.id];
                  return (
                    <div
                      key={m.id}
                      className={`p-2.5 rounded-lg border text-[10px] flex flex-col justify-between gap-1 ${
                        done
                          ? 'bg-emerald-50/90 border-emerald-300 text-[#004D28]'
                          : 'bg-slate-50/80 border-slate-200 text-slate-500'
                      }`}
                    >
                      <span className="font-bold leading-tight block">
                        {idx + 1}. {m.shortTitle}
                      </span>
                      <span className="flex items-center gap-1 font-mono font-semibold">
                        {done ? (
                          <>
                            <CheckCircle className="w-3 h-3 text-[#006837] shrink-0" />
                            <span>{score ? `${score}%` : 'Aprobado'}</span>
                          </>
                        ) : (
                          <>
                            <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                            <span>Pendiente</span>
                          </>
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Institutional Campus Info & Disclaimer (No blank fake signature lines) */}
              <div className="pt-5 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center border-t border-emerald-200 text-center">
                <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-100 space-y-0.5">
                  <span className="text-[10px] font-bold text-[#004D28] uppercase tracking-wider block">
                    Sede Cúcuta · Barrio La Playa
                  </span>
                  <span className="text-[10px] text-slate-600 block">
                    Av. 3 No. 13-34, San José de Cúcuta
                  </span>
                  <span className="text-[9px] text-slate-500 block">
                    Vigilada Mineducación
                  </span>
                </div>

                <div className="flex flex-col items-center justify-center space-y-1">
                  <img
                    src={TECH_BADGE_LOGO}
                    alt="Insignia Tecnológica del OVA"
                    className="w-14 h-14 object-contain rounded-full border border-emerald-300 p-1 bg-white shadow-xs"
                  />
                  <span className="text-[9px] font-bold text-[#006837] tracking-wider uppercase">
                    Práctica Académica OVA
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-0.5">
                  <span className="text-[10px] font-bold text-slate-800 uppercase tracking-wider block">
                    Documento Demostrativo
                  </span>
                  <span className="text-[10px] text-slate-600 block">
                    No equivale a título ni certificado oficial
                  </span>
                  <span className="text-[9px] text-slate-500 block">
                    Uso formativo local en el navegador
                  </span>
                </div>
              </div>

              {/* Issue Date & Footer */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-500 font-mono">
                <span>San José de Cúcuta, Norte de Santander · {currentDate}</span>
                <span className="flex items-center gap-1 text-[#006837] font-bold">
                  <CheckCircle className="w-3 h-3" /> Constancia local de práctica
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
