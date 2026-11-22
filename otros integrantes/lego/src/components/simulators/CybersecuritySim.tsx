import React, { useState } from 'react';
import { ShieldCheck, AlertOctagon, CheckCircle2, Lock, Radio, Key, RotateCcw } from 'lucide-react';
import { TECH_BADGE_LOGO } from '../../data/courseData';

interface ThreatScenario {
  id: string;
  name: string;
  vector: string;
  ciaImpact: string;
  severity: 'Crítica' | 'Alta' | 'Media';
  initialStats: { c: number; i: number; a: number };
}

const SCENARIOS: ThreatScenario[] = [
  {
    id: 'phishing',
    name: 'Campaña Masiva de Spear Phishing a Tesorería',
    vector: 'Correo falso suplantando al Vicerrector con archivo .xlsm malicioso.',
    ciaImpact: 'Afecta Confidencialidad y abre puertas a movimiento lateral.',
    severity: 'Crítica',
    initialStats: { c: 35, i: 60, a: 90 }
  },
  {
    id: 'ransomware',
    name: 'Intrusión de Ransomware en Servidor de Archivos',
    vector: 'Explotación de puerto RDP 3389 expuesto sin doble factor de autenticación.',
    ciaImpact: 'Destruye Disponibilidad e Integridad al cifrar las bases de datos.',
    severity: 'Crítica',
    initialStats: { c: 50, i: 20, a: 15 }
  },
  {
    id: 'cloudleak',
    name: 'Bucket de Almacenamiento en la Nube con Permisos Públicos',
    vector: 'Configuración errónea de IAM dejando carpetas de investigación expuestas a internet.',
    ciaImpact: 'Vulnera la Confidencialidad de patentes y propiedad intelectual.',
    severity: 'Alta',
    initialStats: { c: 25, i: 75, a: 95 }
  }
];

export const CybersecuritySim: React.FC = () => {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);
  const scenario = SCENARIOS[selectedScenarioIndex];

  // Defensive actions toggles
  const [actions, setActions] = useState<{
    isolateNetwork: boolean;
    revokeTokens: boolean;
    enforceMFA: boolean;
    restoreImmutableBackup: boolean;
    patchVulnerabilities: boolean;
  }>({
    isolateNetwork: false,
    revokeTokens: false,
    enforceMFA: false,
    restoreImmutableBackup: false,
    patchVulnerabilities: false
  });

  const toggleAction = (key: keyof typeof actions) => {
    setActions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const resetDefense = () => {
    setActions({
      isolateNetwork: false,
      revokeTokens: false,
      enforceMFA: false,
      restoreImmutableBackup: false,
      patchVulnerabilities: false
    });
  };

  // Calculate dynamic CIA scores based on actions taken
  const cScore = Math.min(100, scenario.initialStats.c + (actions.revokeTokens ? 30 : 0) + (actions.enforceMFA ? 25 : 0) + (actions.patchVulnerabilities ? 15 : 0));
  const iScore = Math.min(100, scenario.initialStats.i + (actions.restoreImmutableBackup ? 35 : 0) + (actions.patchVulnerabilities ? 25 : 0));
  const aScore = Math.min(100, scenario.initialStats.a + (actions.isolateNetwork ? -10 : 0) + (actions.restoreImmutableBackup ? 40 : 0) + (actions.patchVulnerabilities ? 15 : 0));
  const globalHealth = Math.round((cScore + iScore + aScore) / 3);

  return (
    <div className="bg-white rounded-2xl border border-emerald-100 shadow-sm p-6 space-y-6">
      {/* Header with Circular Tech Badge */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-emerald-100 gap-4">
        <div className="flex items-center gap-3">
          <img
            src={TECH_BADGE_LOGO}
            alt="Insignia Ciberseguridad Unisimón"
            className="w-12 h-12 object-contain rounded-full border border-emerald-200 bg-white p-1"
          />
          <div>
            <h3 className="text-xl font-bold text-[#004D28]">Centro de Operaciones de Seguridad (SOC Unisimón)</h3>
            <p className="text-xs text-slate-500">Respuesta coordinada a incidentes y defensa de la Tríada CIA</p>
          </div>
        </div>

        <button
          onClick={resetDefense}
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#006837] transition-colors self-start md:self-auto cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Restablecer Simulación
        </button>
      </div>

      {/* Scenario Selector */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-2">Selecciona un Escenario de Ciberamenaza:</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {SCENARIOS.map((sc, idx) => (
            <button
              key={sc.id}
              onClick={() => {
                setSelectedScenarioIndex(idx);
                resetDefense();
              }}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                selectedScenarioIndex === idx
                  ? 'bg-emerald-50/90 border-[#006837] shadow-2xs'
                  : 'bg-white border-slate-200 hover:border-emerald-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
                  {sc.severity}
                </span>
                <AlertOctagon className="w-4 h-4 text-rose-500" />
              </div>
              <h4 className="text-xs font-bold text-slate-800 mt-2 line-clamp-1">{sc.name}</h4>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{sc.vector}</p>
            </button>
          ))}
        </div>
      </div>

      {/* CIA Triad Barometers */}
      <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wider">Estado de la Tríada CIA en Tiempo Real</span>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-300">
            Salud Global: {globalHealth}% {globalHealth >= 85 ? '🟢 RESILIENTE' : globalHealth >= 60 ? '🟡 EN RIESGO' : '🔴 VULNERADO'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Confidencialidad */}
          <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                <Lock className="w-3.5 h-3.5 text-emerald-400" /> Confidencialidad
              </span>
              <span className="font-mono font-bold text-emerald-400">{cScore}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${cScore >= 80 ? 'bg-emerald-500' : cScore >= 50 ? 'bg-amber-400' : 'bg-rose-500'}`}
                style={{ width: `${cScore}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-400 block">Solo personal autorizado accede a la data.</span>
          </div>

          {/* Integridad */}
          <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                <Key className="w-3.5 h-3.5 text-blue-400" /> Integridad
              </span>
              <span className="font-mono font-bold text-blue-400">{iScore}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${iScore >= 80 ? 'bg-blue-500' : iScore >= 50 ? 'bg-amber-400' : 'bg-rose-500'}`}
                style={{ width: `${iScore}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-400 block">Información exacta sin alteraciones no autorizadas.</span>
          </div>

          {/* Disponibilidad */}
          <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                <Radio className="w-3.5 h-3.5 text-teal-400" /> Disponibilidad
              </span>
              <span className="font-mono font-bold text-teal-400">{aScore}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${aScore >= 80 ? 'bg-teal-500' : aScore >= 50 ? 'bg-amber-400' : 'bg-rose-500'}`}
                style={{ width: `${aScore}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-400 block">Servicios y datos operativos para los usuarios.</span>
          </div>
        </div>
      </div>

      {/* Defensive Playbook Controls */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
          Playbook de Respuesta: Activa los Protocolos de Contención y Mitigación:
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => toggleAction('isolateNetwork')}
            className={`p-3 rounded-xl border text-left text-xs transition-colors cursor-pointer flex items-start gap-2.5 ${
              actions.isolateNetwork
                ? 'bg-[#006837] text-white border-[#006837]'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${actions.isolateNetwork ? 'text-white' : 'text-slate-300'}`} />
            <div>
              <span className="font-bold block">1. Aislar Segmento de Red Comprometido</span>
              <span className={`text-[11px] block mt-0.5 ${actions.isolateNetwork ? 'text-emerald-100' : 'text-slate-500'}`}>
                Frena el movimiento lateral de malware hacia otros servidores.
              </span>
            </div>
          </button>

          <button
            onClick={() => toggleAction('revokeTokens')}
            className={`p-3 rounded-xl border text-left text-xs transition-colors cursor-pointer flex items-start gap-2.5 ${
              actions.revokeTokens
                ? 'bg-[#006837] text-white border-[#006837]'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${actions.revokeTokens ? 'text-white' : 'text-slate-300'}`} />
            <div>
              <span className="font-bold block">2. Revocar Sesiones Activas & Tokens OAuth</span>
              <span className={`text-[11px] block mt-0.5 ${actions.revokeTokens ? 'text-emerald-100' : 'text-slate-500'}`}>
                Expulsa al atacante de las cuentas vulneradas de inmediato.
              </span>
            </div>
          </button>

          <button
            onClick={() => toggleAction('enforceMFA')}
            className={`p-3 rounded-xl border text-left text-xs transition-colors cursor-pointer flex items-start gap-2.5 ${
              actions.enforceMFA
                ? 'bg-[#006837] text-white border-[#006837]'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${actions.enforceMFA ? 'text-white' : 'text-slate-300'}`} />
            <div>
              <span className="font-bold block">3. Exigir Autenticación Multifactor (MFA)</span>
              <span className={`text-[11px] block mt-0.5 ${actions.enforceMFA ? 'text-emerald-100' : 'text-slate-500'}`}>
                Inhabilita contraseñas robadas sin el token físico o la app autenticadora.
              </span>
            </div>
          </button>

          <button
            onClick={() => toggleAction('restoreImmutableBackup')}
            className={`p-3 rounded-xl border text-left text-xs transition-colors cursor-pointer flex items-start gap-2.5 ${
              actions.restoreImmutableBackup
                ? 'bg-[#006837] text-white border-[#006837]'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${actions.restoreImmutableBackup ? 'text-white' : 'text-slate-300'}`} />
            <div>
              <span className="font-bold block">4. Restaurar Copia Inmutable (Air-Gapped)</span>
              <span className={`text-[11px] block mt-0.5 ${actions.restoreImmutableBackup ? 'text-emerald-100' : 'text-slate-500'}`}>
                Recupera la integridad de los datos sin pagar rescates a cibercriminales.
              </span>
            </div>
          </button>

          <button
            onClick={() => toggleAction('patchVulnerabilities')}
            className={`p-3 rounded-xl border text-left text-xs transition-colors cursor-pointer flex items-start gap-2.5 sm:col-span-2 ${
              actions.patchVulnerabilities
                ? 'bg-[#006837] text-white border-[#006837]'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${actions.patchVulnerabilities ? 'text-white' : 'text-slate-300'}`} />
            <div>
              <span className="font-bold block">5. Aplicar Parche de Seguridad y Cerrar Puertos Inseguros</span>
              <span className={`text-[11px] block mt-0.5 ${actions.patchVulnerabilities ? 'text-emerald-100' : 'text-slate-500'}`}>
                Cierra la brecha de entrada original para impedir reincidencias.
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Outcome Verdict */}
      <div className={`p-4 rounded-xl border text-xs ${globalHealth >= 80 ? 'bg-emerald-50 border-emerald-300 text-[#004D28]' : 'bg-amber-50 border-amber-300 text-amber-900'}`}>
        {globalHealth >= 80 ? (
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#006837] shrink-0 mt-0.5" />
            <div>
              <strong className="block text-sm">¡Incidente Contenido y Neutralizado con Éxito!</strong>
              <span>Tus acciones en el SOC han restaurado la Tríada CIA protegiendo los activos digitales y la continuidad operativa de la Universidad Simón Bolívar.</span>
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-2">
            <AlertOctagon className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-sm">Alerta Activa: Sistema aún Vulnerable</strong>
              <span>Activa protocolos adicionales de contención (revocar credenciales, habilitar MFA y restaurar copias inmutables) para elevar el nivel de salud del sistema por encima del 80%.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
