import React, { useState } from 'react';
import { Lightbulb, CheckCircle2, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';

interface IdeaCard {
  id: string;
  title: string;
  impact: 'alto' | 'medio' | 'bajo';
  effort: 'alto' | 'medio' | 'bajo';
  category: 'quick-win' | 'gran-apuesta' | 'tarea' | 'descartar';
}

export const DesignThinkingSim: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(1);

  // Stage 1: Empathy Map State
  const [empathyNotes] = useState({
    dice: ['"La plataforma actual es demasiado lenta en mi teléfono."', '"Me confunden tantos menús diferentes."'],
    hace: ['Abandona el proceso a los 2 minutos.', 'Pregunta a compañeros por WhatsApp en lugar de leer el manual.'],
    piensa: ['"Temo cometer un error y perder mi matrícula."', '"Siento que la universidad no entiende mi ritmo de vida."'],
    siente: ['Ansiedad ante los plazos de entrega.', 'Alivio cuando recibe una confirmación clara inmediata.']
  });

  // Stage 2: POV Builder State
  const [selectedUser, setSelectedUser] = useState('Estudiantes trabajadores de jornada nocturna');
  const [selectedNeed, setSelectedNeed] = useState('un acceso directo de 1 clic a sus certificados y notas');
  const [selectedInsight, setSelectedInsight] = useState('solo disponen de 15 minutos en sus trayectos en transporte público');

  // Stage 3: Ideation Matrix State
  const [ideas, setIdeas] = useState<IdeaCard[]>([
    { id: '1', title: 'Bot de WhatsApp con consulta automática de notas', impact: 'alto', effort: 'medio', category: 'quick-win' },
    { id: '2', title: 'Nueva app nativa 3D con metaverso universitario', impact: 'bajo', effort: 'alto', category: 'descartar' },
    { id: '3', title: 'Notificaciones SMS con enlace directo de descarga', impact: 'alto', effort: 'bajo', category: 'quick-win' },
    { id: '4', title: 'Rediseño del portal responsive con modo sin datos', impact: 'alto', effort: 'alto', category: 'gran-apuesta' }
  ]);
  const [customIdeaText, setCustomIdeaText] = useState('');

  const addCustomIdea = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customIdeaText.trim()) return;
    const newIdea: IdeaCard = {
      id: Date.now().toString(),
      title: customIdeaText,
      impact: 'alto',
      effort: 'medio',
      category: 'quick-win'
    };
    setIdeas([newIdea, ...ideas]);
    setCustomIdeaText('');
  };

  // Stage 4 & 5: Prototype & Test State
  const [testRating, setTestRating] = useState<number>(85);
  const [feedbackGiven, setFeedbackGiven] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-emerald-100 shadow-sm p-6 space-y-6">
      {/* Simulator Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-emerald-100 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-emerald-50 text-[#006837] rounded-lg">
              <Lightbulb className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-xl font-bold text-[#004D28]">Laboratorio Interactivo de Design Thinking</h3>
              <p className="text-xs text-slate-500">Recorre las 5 fases en un reto real de innovación estudiantil</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            setActiveStage(1);
            setFeedbackGiven(false);
          }}
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#006837] transition-colors self-start md:self-auto cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reiniciar Laboratorio
        </button>
      </div>

      {/* Stepper Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 p-1.5 bg-emerald-50/60 rounded-xl">
        {[
          { num: 1, label: '1. Empatizar' },
          { num: 2, label: '2. Definir' },
          { num: 3, label: '3. Idear' },
          { num: 4, label: '4. Prototipar' },
          { num: 5, label: '5. Evaluar' }
        ].map((s) => (
          <button
            key={s.num}
            onClick={() => setActiveStage(s.num)}
            className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeStage === s.num
                ? 'bg-[#006837] text-white shadow-sm'
                : 'text-slate-600 hover:bg-white/80 hover:text-[#006837]'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Stage 1: Empatizar */}
      {activeStage === 1 && (
        <div className="space-y-4">
          <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 text-sm text-[#0F2417]">
            <strong className="text-[#006837]">Fase 1: Empatía con el Usuario.</strong> A continuación tienes los hallazgos cualitativos recolectados tras observar y entrevistar a estudiantes de la Universidad Simón Bolívar sobre el acceso a sus trámites académicos:
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">¿Qué Dice el Usuario?</span>
              <ul className="mt-2 space-y-1.5 text-xs text-slate-700">
                {empathyNotes.dice.map((d, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-blue-50/70 p-4 rounded-xl border border-blue-200">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-800">¿Qué Hace en la Práctica?</span>
              <ul className="mt-2 space-y-1.5 text-xs text-slate-700">
                {empathyNotes.hace.map((d, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-200">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">¿Qué Piensa?</span>
              <ul className="mt-2 space-y-1.5 text-xs text-slate-700">
                {empathyNotes.piensa.map((d, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-purple-50/70 p-4 rounded-xl border border-purple-200">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-800">¿Qué Siente (Dolores y Deseos)?</span>
              <ul className="mt-2 space-y-1.5 text-xs text-slate-700">
                {empathyNotes.siente.map((d, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => setActiveStage(2)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#006837] hover:bg-[#004D28] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Avanzar a Definir POV
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Stage 2: Definir */}
      {activeStage === 2 && (
        <div className="space-y-5">
          <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 text-sm text-[#0F2417]">
            <strong className="text-[#006837]">Fase 2: Definición del POV (Point of View).</strong> Construye un enunciado accionable combinando el usuario foco, su necesidad sentida y el insight revelador descubierto en la empatía:
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">1. Usuario Específico:</label>
              <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg focus:border-[#006837] focus:ring-1 focus:ring-[#006837]"
              >
                <option value="Estudiantes trabajadores de jornada nocturna">Estudiantes de jornada nocturna</option>
                <option value="Docentes investigadores de posgrado">Docentes investigadores de posgrado</option>
                <option value="Aspirantes de primer ingreso">Aspirantes de primer ingreso</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">2. Necesidad Sentida:</label>
              <select
                value={selectedNeed}
                onChange={(e) => setSelectedNeed(e.target.value)}
                className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg focus:border-[#006837] focus:ring-1 focus:ring-[#006837]"
              >
                <option value="un acceso directo de 1 clic a sus certificados y notas">acceso directo de 1 clic a certificados</option>
                <option value="un canal de tutoría académica asistido por IA">tutoría académica asistida en tiempo real</option>
                <option value="confirmaciones inmediatas vía mensajería móvil">confirmaciones inmediatas vía mensajería móvil</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">3. Insight Profundo:</label>
              <select
                value={selectedInsight}
                onChange={(e) => setSelectedInsight(e.target.value)}
                className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg focus:border-[#006837] focus:ring-1 focus:ring-[#006837]"
              >
                <option value="solo disponen de 15 minutos en sus trayectos en transporte público">solo disponen de 15 minutos en traslados</option>
                <option value="experimentan alta ansiedad cuando los sistemas no confirman de inmediato">alta ansiedad si el sistema no confirma</option>
                <option value="utilizan teléfonos inteligentes con planes de datos limitados">utilizan planes de datos móviles limitados</option>
              </select>
            </div>
          </div>

          {/* POV Synthesis Box */}
          <div className="p-4 bg-emerald-900 text-white rounded-xl space-y-2">
            <span className="text-[11px] uppercase tracking-wider text-emerald-300 font-bold">Enunciado POV Generado:</span>
            <p className="text-sm font-serif italic">
              &quot;{selectedUser} necesita {selectedNeed} porque {selectedInsight}.&quot;
            </p>
            <div className="pt-2 border-t border-emerald-700/60 flex items-center gap-2 text-xs text-emerald-200">
              <Sparkles className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>Pregunta Detonante: <strong>¿Cómo podríamos</strong> rediseñar el servicio para que sea veloz, liviano y accesible en 1 solo paso?</span>
            </div>
          </div>

          <div className="flex justify-between pt-2">
            <button
              onClick={() => setActiveStage(1)}
              className="px-4 py-2 text-xs text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              ← Volver a Empatizar
            </button>
            <button
              onClick={() => setActiveStage(3)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#006837] hover:bg-[#004D28] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Avanzar a Idear
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Stage 3: Idear */}
      {activeStage === 3 && (
        <div className="space-y-4">
          <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 text-sm text-[#0F2417]">
            <strong className="text-[#006837]">Fase 3: Ideación y Priorización.</strong> Clasifica y prioriza ideas en función de su Impacto y Esfuerzo de implementación:
          </div>

          <form onSubmit={addCustomIdea} className="flex gap-2">
            <input
              type="text"
              placeholder="Escribe una nueva idea de solución innovadora..."
              value={customIdeaText}
              onChange={(e) => setCustomIdeaText(e.target.value)}
              className="flex-1 text-xs p-2.5 bg-white border border-slate-300 rounded-lg focus:border-[#006837] focus:ring-1 focus:ring-[#006837]"
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-[#006837] hover:bg-[#004D28] text-white text-xs font-semibold rounded-lg cursor-pointer whitespace-nowrap"
            >
              + Agregar Idea
            </button>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
              <span className="text-xs font-bold text-[#006837] uppercase tracking-wide">
                ⭐ Victorias Rápidas (Alto Impacto / Bajo-Medio Esfuerzo)
              </span>
              <div className="mt-3 space-y-2">
                {ideas.filter(i => i.category === 'quick-win').map(item => (
                  <div key={item.id} className="p-2.5 bg-white rounded-lg border border-emerald-100 text-xs shadow-2xs flex items-center justify-between">
                    <span>{item.title}</span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">Prioridad 1</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                🚀 Grandes Apuestas & Otros Enfoques
              </span>
              <div className="mt-3 space-y-2">
                {ideas.filter(i => i.category !== 'quick-win').map(item => (
                  <div key={item.id} className="p-2.5 bg-white rounded-lg border border-slate-200 text-xs shadow-2xs flex items-center justify-between">
                    <span className="text-slate-600">{item.title}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${item.category === 'gran-apuesta' ? 'bg-blue-100 text-blue-700' : 'bg-rose-100 text-rose-700'}`}>
                      {item.category === 'gran-apuesta' ? 'Estratégico' : 'Descartable'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-2">
            <button
              onClick={() => setActiveStage(2)}
              className="px-4 py-2 text-xs text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              ← Volver a Definir
            </button>
            <button
              onClick={() => setActiveStage(4)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#006837] hover:bg-[#004D28] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Avanzar a Prototipar
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Stage 4: Prototipar */}
      {activeStage === 4 && (
        <div className="space-y-4">
          <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 text-sm text-[#0F2417]">
            <strong className="text-[#006837]">Fase 4: Prototipado Rápido (Maqueta Ilustrativa).</strong> Visualiza una maqueta interactiva simplificada de un posible servicio estudiantil (prototipo simulado sin conexión real):
          </div>

          <div className="max-w-md mx-auto bg-slate-900 text-white rounded-2xl p-4 shadow-md space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-xs font-semibold">Prototipo Asistente Virtual (Demo)</span>
              </div>
              <span className="text-[10px] text-slate-400">Simulación</span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="bg-slate-800 p-2.5 rounded-lg max-w-[85%]">
                Hola estudiante (ejemplo), bienvenido al prototipo de autogestión. ¿Qué trámite deseas simular hoy?
              </div>
              <div className="bg-[#006837] text-white p-2 rounded-lg max-w-[70%] ml-auto text-right">
                1. Descargar certificado de notas
              </div>
              <div className="bg-slate-800 p-2.5 rounded-lg max-w-[85%] border border-emerald-500/30">
                ¡Listo! En este flujo simulado, tras validar la identidad del usuario se generaría el archivo de ejemplo:
                <div className="mt-2 p-2 bg-emerald-950/80 rounded border border-emerald-600/40 text-[11px] text-emerald-300 font-mono flex items-center justify-between">
                  <span>Certificado_Ejemplo_Demo.pdf</span>
                  <span className="text-xs font-bold underline cursor-pointer">Ejemplo UI</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-2">
            <button
              onClick={() => setActiveStage(3)}
              className="px-4 py-2 text-xs text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              ← Volver a Idear
            </button>
            <button
              onClick={() => setActiveStage(5)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#006837] hover:bg-[#004D28] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Avanzar a Evaluar con Usuarios
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Stage 5: Evaluar */}
      {activeStage === 5 && (
        <div className="space-y-4">
          <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 text-sm text-[#0F2417]">
            <strong className="text-[#006837]">Fase 5: Evaluación y Aprendizaje Continuo.</strong> En este escenario simulado de validación con 20 estudiantes de jornada nocturna, ajusta el barómetro de retroalimentación (valores ilustrativos de práctica):
          </div>

          <div className="p-5 bg-white border border-emerald-200 rounded-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Índice de Aceptación del Usuario:</span>
              <span className="text-sm font-bold text-[#006837]">{testRating}% Satisfacción</span>
            </div>

            <input
              type="range"
              min="40"
              max="100"
              value={testRating}
              onChange={(e) => setTestRating(Number(e.target.value))}
              className="w-full accent-[#006837]"
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-xs">
              <div className="p-3 bg-emerald-50 rounded-lg">
                <span className="block text-[11px] text-slate-500">Deseabilidad (Ejemplo)</span>
                <span className="font-bold text-[#006837]">95% (Alta)</span>
              </div>
              <div className="p-3 bg-emerald-50 rounded-lg">
                <span className="block text-[11px] text-slate-500">Factibilidad Técnica (Ejemplo)</span>
                <span className="font-bold text-[#006837]">90% (Viable)</span>
              </div>
              <div className="p-3 bg-emerald-50 rounded-lg">
                <span className="block text-[11px] text-slate-500">Viabilidad (Ejemplo)</span>
                <span className="font-bold text-[#006837]">Ahorro estimado 70%</span>
              </div>
            </div>

            {!feedbackGiven ? (
              <button
                onClick={() => setFeedbackGiven(true)}
                className="w-full py-2.5 bg-[#006837] hover:bg-[#004D28] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Registrar Validación del Reto de Innovación
              </button>
            ) : (
              <div className="p-3 bg-emerald-100 text-[#004D28] rounded-lg text-xs flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#006837] shrink-0" />
                <span><strong>¡Reto Completado con Éxito!</strong> Has recorrido las 5 fases del Design Thinking validando una solución centrada en el usuario con métricas sostenibles.</span>
              </div>
            )}
          </div>

          <div className="flex justify-between pt-2">
            <button
              onClick={() => setActiveStage(4)}
              className="px-4 py-2 text-xs text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              ← Volver a Prototipar
            </button>
            <button
              onClick={() => setActiveStage(1)}
              className="px-4 py-2 text-xs font-semibold text-[#006837] hover:underline cursor-pointer"
            >
              Reiniciar Simulación
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
