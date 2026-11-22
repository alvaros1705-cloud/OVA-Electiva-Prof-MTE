const find = (selector, root = document) => root.querySelector(selector);
const all = (selector, root = document) => [...root.querySelectorAll(selector)];
const element = (tag, text) => {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  return node;
};
const storeKey = 'ova-rio-claro-grupo-6-v1';
let state = {};
try { state = JSON.parse(localStorage.getItem(storeKey) || '{}'); } catch {}
function save(key, value) {
  state[key] = value;
  try { localStorage.setItem(storeKey, JSON.stringify(state)); } catch {}
}

const pages = all('.page');
const menu = find('#menu');
const toggle = find('.menu-toggle');
const moduleMenu = find('.module-menu', menu);
const moduleToggle = find('summary', moduleMenu);
toggle.addEventListener('click', () => {
  if (menu.classList.contains('open')) closeMenu();
  else toggle.setAttribute('aria-expanded', menu.classList.toggle('open'));
});
function closeMenu() {
  moduleMenu.open = false;
  menu.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}
find('#mainNav').addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  if (moduleMenu.open) {
    moduleMenu.open = false;
    moduleToggle.focus();
  } else if (menu.classList.contains('open')) {
    closeMenu();
    toggle.focus();
  }
});
document.addEventListener('pointerdown', event => {
  if (moduleMenu.open && !moduleMenu.contains(event.target)) moduleMenu.open = false;
});
menu.addEventListener('click', event => {
  const link = event.target.closest('a');
  if (link?.hash === location.hash && (menu.classList.contains('open') || moduleMenu.open)) {
    closeMenu();
    find('#contenido').focus({preventScroll: true});
  }
});
function navigate() {
  const hash = location.hash.slice(1);
  if (hash === 'contenido' && pages.some(page => page.hidden)) return;
  const destination = document.getElementById(hash);
  const current = destination?.closest('.page') || pages[0];
  pages.forEach(page => { page.hidden = page !== current; });
  all('a', menu).forEach(link => {
    if (link.hash === '#' + current.id) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  const position = pages.indexOf(current);
  const footer = find('#page-links');
  footer.replaceChildren();
  for (const [page, title, relation] of [
    [pages[position - 1], '← Anterior', 'prev'],
    [pages[position + 1], 'Siguiente →', 'next']
  ]) {
    if (page) {
      const link = element('a', title + ' · ' + page.getAttribute('aria-label'));
      link.href = '#' + page.id;
      link.rel = relation;
      footer.append(link);
    }
  }
  closeMenu();
  all('.module-jumps a', current).forEach(link => {
    if (link.hash === location.hash) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  if (destination && destination !== current && current.contains(destination)) {
    destination.scrollIntoView({block: 'start'});
    destination.focus({preventScroll: true});
  } else {
    window.scrollTo({top: 0, left: 0, behavior: 'instant'});
    if (hash) find('#contenido').focus({preventScroll: true});
  }
}
window.addEventListener('hashchange', navigate);
navigate();

const quizForms = all('.quiz');
function showProgress() {
  const completed = new Set(quizForms.filter(form => all('input:checked', form).length === 4).map(form => form.dataset.quiz));
  if (state.caseDone) completed.add('integracion');
  const total = completed.size;
  for (const card of all('.route-card')) {
    const done = completed.has(card.hash.slice(1));
    card.classList.toggle('route-done', done);
    find('.route-status', card).textContent = done ? 'Completado' : '';
  }
  find('#progress').value = total;
  find('#progress-label').textContent = total + ' de 6';
}
function updateQuiz(form) {
  const selected = all('input:checked', form);
  const correct = selected.filter(input => input.dataset.correct === 'true').length;
  find('.quiz-score', form).textContent = selected.length ? selected.length + ' de 4 respondidas · ' + correct + ' correctas' : '';
  showProgress();
}
function showFeedback(input) {
  const feedback = find('.feedback', input.closest('fieldset'));
  feedback.replaceChildren(find('#fb-' + input.name + '-' + input.value).content.cloneNode(true));
  feedback.dataset.correct = input.dataset.correct;
  feedback.hidden = false;
}
for (const form of quizForms) {
  for (const input of all('input', form)) {
    if (state[input.name] === input.value) {
      input.checked = true;
      showFeedback(input);
    }
  }
  form.addEventListener('change', event => {
    const input = event.target;
    save(input.name, input.value);
    showFeedback(input);
    updateQuiz(form);
  });
  updateQuiz(form);
}
for (const response of all('textarea[data-save]')) {
  response.value = state[response.dataset.save] || '';
  response.addEventListener('input', () => {
    save(response.dataset.save, response.value);
    if (response.id === 'case-response' && state.caseDone) {
      save('caseDone', false);
      find('#case-status').textContent = 'Respuesta editada. Puedes volver a marcarla como terminada.';
      showProgress();
    }
  });
}

const match = find('#match');
const roles = ['CIO', 'CDO', 'CISO', 'Comité de datos'];
const cards = [
  ['Definir cómo se integra el portal con inventario y preparar la reversión.', 'Coordina la arquitectura y la continuidad del servicio.'],
  ['Elaborar el diccionario de campos y proponer validaciones de registros.', 'Define estándares y controles de calidad de los datos.'],
  ['Coordinar la contención de un acceso sospechoso y preservar los registros.', 'Gestiona incidentes de seguridad y protege la evidencia.'],
  ['Resolver el desacuerdo entre Ventas y Logística y aprobar una definición de «pedido entregado».', 'Resuelve desacuerdos entre áreas y aprueba reglas comunes.']
];
const zones = element('div');
zones.className = 'match-grid';
const tray = element('div');
const dropzones = roles.map(role => {
  const zone = element('div');
  zone.className = 'drop-zone';
  zone.append(element('strong', role));
  zones.append(zone);
  return zone;
});
const matches = cards.map(([description], index) => {
  const card = element('div');
  card.className = 'match-card';
  card.draggable = true;
  const label = element('label', String.fromCharCode(65 + index) + '. ' + description);
  const select = element('select');
  select.add(new Option('Elegir un rol', ''));
  roles.forEach((role, position) => select.add(new Option(role, position)));
  label.append(select);
  const feedback = element('div');
  feedback.setAttribute('role', 'status');
  card.append(label, feedback);
  function move() {
    (select.value === '' ? tray : dropzones[Number(select.value)]).append(card);
    feedback.textContent = '';
  }
  select.addEventListener('change', move);
  card.addEventListener('dragstart', event => {
    event.dataTransfer.setData('text/plain', 'rol-' + index);
  });
  tray.append(card);
  return {select, feedback, move};
});
dropzones.forEach((zone, index) => {
  zone.addEventListener('dragover', event => event.preventDefault());
  zone.addEventListener('drop', event => {
    event.preventDefault();
    const key = event.dataTransfer.getData('text/plain');
    if (!/^rol-[0-3]$/.test(key)) return;
    const item = matches[Number(key.at(-1))];
    item.select.value = index;
    item.move();
  });
});
const checkMatch = element('button', 'Comprobar asociaciones');
const matchResult = element('output');
matchResult.setAttribute('aria-live', 'polite');
checkMatch.addEventListener('click', () => {
  let total = 0;
  matches.forEach(({select, feedback}, index) => {
    const correct = select.value === String(index);
    total += Number(correct);
    feedback.textContent = (correct ? 'Correcta. ' : 'Rol esperado: ' + roles[index] + '. ') + cards[index][1];
  });
  matchResult.textContent = total + ' de 4 asociaciones correctas.';
});
match.append(element('p', 'Arrastra cada tarjeta a un rol o elige el rol en su lista.'), zones, tray, checkMatch, matchResult);

const branchData = [
  ['Automatizar el envío a las colas desde hoy', 'La bandeja se vacía más rápido. Una devolución próxima a vencer queda en consultas generales.', [['Mantener el flujo', 'El error queda pendiente y puede repetirse.'], ['Activar la revisión de devoluciones próximas a vencer', 'Se recupera el caso y se pueden buscar otros errores similares.']]],
  ['Usar la IA como apoyo con revisión humana', 'Una analista corrige una devolución. La revisión añade trabajo y aún falta saber cuántas devoluciones quedan fuera del filtro.', [['Medir solo la velocidad', 'Los errores de clasificación quedan sin evaluar.'], ['Revisar una muestra de todas las colas', 'La muestra permite detectar devoluciones omitidas y complementar la medición del tiempo de atención.']]],
  ['Pausar el clasificador en la operación', 'Posventa retoma la clasificación manual. Baja el riesgo inmediato y persiste la acumulación.', [['Reactivar tras una demostración del proveedor', 'Queda pendiente probar el sistema con las solicitudes de Río Claro.'], ['Hacer una prueba controlada con registros depurados', 'La prueba aporta evidencia para decidir si se reanuda el piloto.']]]
];
const branch = find('#branches');
const choices = element('div');
choices.className = 'actions';
const branchResult = element('div');
const branchOutcome = element('p');
branchOutcome.setAttribute('aria-live', 'polite');
const branchButtons = branchData.map(([label, consequence, next]) => {
  const button = element('button', label);
  button.setAttribute('aria-pressed', 'false');
  button.addEventListener('click', () => {
    branchButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    branchOutcome.textContent = '';
    const choices2 = element('div');
    choices2.className = 'actions';
    for (const [text, result] of next) {
      const second = element('button', text);
      second.setAttribute('aria-pressed', 'false');
      second.addEventListener('click', () => {
        all('button', choices2).forEach(item => item.setAttribute('aria-pressed', String(item === second)));
        branchOutcome.textContent = result;
      });
      choices2.append(second);
    }
    branchResult.replaceChildren(element('p', consequence), choices2);
    find('button', choices2).focus();
  });
  choices.append(button);
  return button;
});
branch.append(choices, branchResult, branchOutcome);

const calculator = find('#calculator');
const inputSpecs = [
  ['Electricidad local (kWh/año)', 1000, 1100],
  ['Factor eléctrico (kg de CO₂e/kWh)', .2, .2],
  ['Papel (hojas/año)', 10000, 2000],
  ['Factor del papel (kg de CO₂e/hoja)', .01, .01],
  ['Nube y red externa (kg de CO₂e/año)', 0, 40],
  ['Fabricación de equipos (kg de CO₂e/año)', 20, 30]
];
const calcFields = find('#calc-fields');
const groups = ['Escenario base', 'Escenario digitalizado'].map((name, scenario) => {
  const group = element('fieldset');
  group.append(element('legend', name));
  const fields = inputSpecs.map(([labelText, ...values]) => {
    const label = element('label', labelText);
    const input = element('input');
    input.type = 'number';
    input.min = '0';
    input.step = 'any';
    input.required = true;
    input.defaultValue = values[scenario];
    label.append(input);
    group.append(label);
    return input;
  });
  calcFields.append(group);
  return fields;
});
const number = new Intl.NumberFormat('es-CO', {maximumFractionDigits: 2});
function calculate() {
  const values = groups.map(group => {
    const [electric, factor, sheets, paper, cloud, hardware] = group.map(field => field.valueAsNumber);
    const scope2 = electric * factor;
    const scope3 = sheets * paper + cloud + hardware;
    return [scope2, scope3, scope2 + scope3];
  });
  const result = find('#calc-result');
  if (!values.flat().every(Number.isFinite)) {
    result.textContent = 'Revisa los valores ingresados.';
    return;
  }
  result.replaceChildren(...values.map(([scope2, scope3, total], index) =>
    element('div', (index === 0 ? 'Base' : 'Digitalizado') + ' · Alcance 2: ' + number.format(scope2) + ' · Alcance 3: ' + number.format(scope3) + ' · Total: ' + number.format(total) + ' kg de CO₂e/año')
  ), element('strong', 'Cambio anual: ' + number.format(values[1][2] - values[0][2]) + ' kg de CO₂e/año'));
}
calculator.addEventListener('submit', event => { event.preventDefault(); calculate(); });
calculator.addEventListener('reset', () => setTimeout(calculate, 0));
calculate();

function readTable(table) {
  const headers = all('th', table).map(cell => cell.textContent);
  return all('tbody tr', table).map(row => ({
    headers, values: all('td', row).map(cell => cell.textContent)
  }));
}
function makeFicha(row) {
  const list = element('dl');
  row.headers.slice(1).forEach((title, index) => {
    list.append(element('dt', title), element('dd', row.values[index + 1]));
  });
  return list;
}
const kpis = all('#m4 table').flatMap(readTable);
const kpiSelect = find('#kpi');
kpis.forEach((row, index) => kpiSelect.add(new Option(row.values[0], index)));
function showKpi() {
  const row = kpis[Number(kpiSelect.value)];
  find('#kpi-detail').replaceChildren(element('h4', row.values[0]), makeFicha(row));
}
kpiSelect.addEventListener('change', showKpi);
showKpi();

const initiatives = readTable(find('#m5 table'));
const horizons = ['H1 · 0–6 meses', 'H2 · 6–18 meses', 'H3 · 18–36 meses'];
const horizonButtons = horizons.map((name, index) => {
  const button = element('button', name);
  button.addEventListener('click', () => showHorizon(index));
  find('#horizons').append(button);
  return button;
});
function showHorizon(index) {
  horizonButtons.forEach((button, position) => button.setAttribute('aria-pressed', String(position === index)));
  const detail = find('#horizon-detail');
  detail.replaceChildren();
  for (const row of initiatives.filter(item => item.values[0].startsWith('H' + (index + 1)))) {
    const card = element('details');
    card.append(element('summary', row.values[0]), makeFicha(row));
    detail.append(card);
  }
}
showHorizon(0);
const sequence = find('#sequence');
const sequenceFields = ['Primero', 'Segundo', 'Tercero'].map((name, index) => {
  const label = element('label', name);
  const select = element('select');
  select.add(new Option('Seleccionar iniciativa', ''));
  select.required = true;
  ['E · Consolidar la revisión', 'A · Reglas del expediente', 'B · Piloto supervisado'].forEach(item => select.add(new Option(item, item[0])));
  label.append(select);
  find('.sequence-fields', sequence).append(label);
  return select;
});
sequence.addEventListener('submit', event => {
  event.preventDefault();
  const answer = sequenceFields.map(field => field.value).join('');
  find('output', sequence).textContent = answer === 'ABE'
    ? 'Correcto. Las reglas del expediente habilitan el piloto supervisado y la evidencia del piloto permite consolidar la revisión.'
    : 'Revisa las dependencias. Primero se necesitan reglas comunes, después evidencia de un piloto y finalmente capacidad para consolidar la revisión.';
});

const caseResponse = find('#case-response');
const caseStatus = find('#case-status');
if (state.caseDone) caseStatus.textContent = 'Caso marcado como terminado.';
find('#finish-case').addEventListener('click', () => {
  if (!caseResponse.value.trim()) {
    caseStatus.textContent = 'Escribe tu recomendación antes de marcarla como terminada.';
    caseResponse.focus();
    return;
  }
  save('caseDone', true);
  caseStatus.textContent = 'Caso marcado como terminado.';
  showProgress();
});
find('#download-case').addEventListener('click', () => {
  if (!caseResponse.value.trim()) {
    caseStatus.textContent = 'Escribe tu recomendación antes de descargarla.';
    caseResponse.focus();
    return;
  }
  const url = URL.createObjectURL(new Blob(['Integración final · Distribuidora Río Claro\n\n' + caseResponse.value], {type: 'text/plain;charset=utf-8'}));
  const link = element('a');
  link.href = url;
  link.download = 'respuesta-rio-claro.txt';
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});
