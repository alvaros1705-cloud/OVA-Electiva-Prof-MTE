/**
 * ZONA DE JUEGOS — OVA Machine Learning y Automatización Inteligente
 * Juegos: Quiz relámpago, Memoria de conceptos, ¿ML, RPA o IPA? y Ordena el flujo.
 * Los récords se guardan en localStorage (si el navegador lo permite).
 */
(function () {
    'use strict';

    const root = document.getElementById('juegos');
    if (!root) return;

    // ========================================
    // UTILIDADES, PUNTAJES Y TABLERO
    // ========================================
    const KEY = 'ova-juegos-v1';
    const GAMES = ['quiz', 'memory', 'classify', 'order', 'robot', 'belt'];
    const RANKS = [
        { min: 0, name: 'Aprendiz' },
        { min: 150, name: 'Practicante' },
        { min: 325, name: 'Analista' },
        { min: 500, name: 'Arquitecto de automatización' }
    ];

    const data = { best: { quiz: 0, memory: 0, classify: 0, order: 0, robot: 0, belt: 0 } };
    try {
        const saved = JSON.parse(localStorage.getItem(KEY));
        if (saved && saved.best) Object.assign(data.best, saved.best);
    } catch (e) { /* sin almacenamiento: se juega igual */ }
    const persist = () => { try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) {} };

    const $ = (sel, ctx) => (ctx || root).querySelector(sel);
    const shuffle = (arr) => {
        const a = arr.slice();
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    };
    const pick = (arr, n) => shuffle(arr).slice(0, n);

    // Limpieza de temporizadores al cambiar de juego o de pantalla
    const cleanups = [];
    const stop = () => { while (cleanups.length) { try { cleanups.pop()(); } catch (e) {} } };

    function updateBoard() {
        const total = GAMES.reduce((s, g) => s + data.best[g], 0);
        $('#jgTotal').textContent = total;
        $('#jgRank').textContent = RANKS.filter(r => total >= r.min).pop().name;
        GAMES.forEach(g => { $('#jgBest-' + g).textContent = data.best[g]; });
    }

    function submit(game, score) {
        const record = score > data.best[game];
        if (record) { data.best[game] = score; persist(); }
        updateBoard();
        return record;
    }

    const P = {};
    GAMES.forEach(g => { P[g] = $('#jg-panel-' + g); });

    function resultHTML(score, max, message, record, extra) {
        return `<div class="jg-result">
            <span class="big">${score}</span>
            <span class="of">de ${max} puntos</span>
            ${record ? '<div><span class="jg-record">Nuevo récord</span></div>' : ''}
            <p>${message}</p>
            ${extra || ''}
            <div class="jg-actions">
                <button type="button" class="jg-btn" data-act="again">Jugar de nuevo</button>
                <button type="button" class="jg-btn ghost" data-act="menu">Volver al inicio del juego</button>
            </div>
        </div>`;
    }

    function intro(game, title, text, extra, go) {
        stop();
        const p = P[game];
        p.innerHTML = `<div class="jg-intro"><h3>${title}</h3><p>${text}</p>${extra || ''}${go ? '<button type="button" class="jg-btn" data-go>Comenzar</button>' : ''}</div>`;
        if (go) $('[data-go]', p).addEventListener('click', go);
        return p;
    }

    // ========================================
    // JUEGO 1: QUIZ RELÁMPAGO
    // ========================================
    const TOPICS = {
        all: 'Todos los temas',
        ml: 'Machine Learning',
        ipa: 'IPA',
        rpa: 'RPA',
        flujos: 'Power Automate y n8n'
    };
    const TIME = 20;
    const QUIZ = [
        { t: 'ml', mod: 1, q: '¿Qué tipo de aprendizaje entrena el modelo con datos etiquetados?', o: ['Supervisado', 'No supervisado', 'Por refuerzo', 'Aprendizaje sin ejemplos'], a: 0, e: 'En el aprendizaje supervisado cada ejemplo trae la respuesta correcta; sirve para clasificar y para hacer regresión.' },
        { t: 'ml', mod: 1, q: 'Quieres segmentar clientes con hábitos parecidos, pero nadie te dio los grupos de antemano. ¿Qué enfoque aplicas?', o: ['Aprendizaje no supervisado', 'Aprendizaje supervisado', 'Aprendizaje por refuerzo', 'Reglas escritas a mano'], a: 0, e: 'Sin etiquetas, el modelo busca estructura por sí mismo: eso es clustering, aprendizaje no supervisado.' },
        { t: 'ml', mod: 1, q: 'Un robot aprende a caminar probando movimientos y recibiendo recompensas. ¿Qué tipo de aprendizaje es?', o: ['Por refuerzo', 'Supervisado', 'No supervisado', 'Aprendizaje con etiquetas'], a: 0, e: 'Un agente que prueba acciones y aprende de recompensas o castigos usa aprendizaje por refuerzo.' },
        { t: 'ml', mod: 1, q: 'Un modelo saca resultados excelentes con los datos de entrenamiento, pero falla con datos nuevos. ¿Qué le pasa?', o: ['Sobreajuste', 'Subajuste', 'Exceso de recall', 'Falta de triggers'], a: 0, e: 'Memorizó el entrenamiento en lugar de generalizar. Por eso se reserva un conjunto de prueba.' },
        { t: 'ml', mod: 1, q: '¿Para qué se reserva un conjunto de prueba?', o: ['Para evaluar el modelo con datos que no vio al entrenar', 'Para entrenar más rápido', 'Para etiquetar los datos', 'Para reemplazar la limpieza de datos'], a: 0, e: 'Con datos nuevos se comprueba si el modelo generaliza o solo memorizó.' },
        { t: 'ml', mod: 1, q: '¿Cuál es la jerarquía correcta?', o: ['IA ⊃ ML ⊃ Deep Learning', 'ML ⊃ IA ⊃ Deep Learning', 'Deep Learning ⊃ ML ⊃ IA', 'IA ⊃ Deep Learning ⊃ ML'], a: 0, e: 'El deep learning es una parte del ML, y el ML es una rama de la IA.' },
        { t: 'ml', mod: 1, q: '¿Qué paso del flujo de un proyecto de ML va justo después de dividir en entrenamiento y prueba?', o: ['Entrenar', 'Evaluar', 'Recolectar datos', 'Desplegar'], a: 0, e: 'El orden es: problema y métrica, datos, limpieza, división, entrenamiento, evaluación, y despliegue con monitoreo.' },
        { t: 'ml', mod: 1, q: '¿Cómo se calcula la precisión?', o: ['VP / (VP + FP)', 'VP / (VP + FN)', '(VP + VN) / total', '2 · (precisión · recall) / (precisión + recall)'], a: 0, e: 'De todo lo que el modelo marcó como positivo, cuánto lo era de verdad: VP / (VP + FP).' },
        { t: 'ml', mod: 1, q: 'Con VP = 40, FP = 10 y FN = 20, ¿cuál es la precisión?', o: ['80 %', '67 %', '50 %', '40 %'], a: 0, e: '40 / (40 + 10) = 0,8, es decir, 80 %.' },
        { t: 'ml', mod: 1, q: 'Con VP = 30, FP = 10 y FN = 20, ¿cuál es el recall?', o: ['60 %', '75 %', '50 %', '30 %'], a: 0, e: 'Recall = VP / (VP + FN) = 30 / 50 = 0,6, es decir, 60 %.' },

        { t: 'ipa', mod: 2, q: '¿Qué combina la IPA?', o: ['RPA con inteligencia artificial', 'Solo macros y scripts', 'Solo bases de datos', 'ERP con hojas de cálculo'], a: 0, e: 'La IPA suma IA (ML, NLP, lectura de documentos) a la RPA para procesos que exigen interpretar y decidir.' },
        { t: 'ipa', mod: 2, q: '¿Qué hace el OCR dentro de una solución IPA?', o: ['Convierte imágenes o PDF en datos utilizables', 'Coordina a los robots', 'Programa las ejecuciones', 'Guarda las credenciales'], a: 0, e: 'Por ejemplo, extrae número, fecha y total de una factura en PDF.' },
        { t: 'ipa', mod: 2, q: '¿Para qué sirve el NLP?', o: ['Para entender texto escrito, como clasificar un correo por su intención', 'Para leer solo imágenes', 'Para entrenar robots por recompensas', 'Para diseñar triggers'], a: 0, e: 'El procesamiento de lenguaje natural permite interpretar texto, por ejemplo la intención de un correo.' },
        { t: 'ipa', mod: 2, q: '¿Qué analiza la minería de procesos?', o: ['Registros de eventos, para ver cómo se ejecutan realmente los procesos', 'El código fuente de los bots', 'Las credenciales de los robots', 'El diseño de los formularios'], a: 0, e: 'Se recomienda como paso previo para decidir qué automatizar primero.' },
        { t: 'ipa', mod: 2, q: '¿Qué significa human-in-the-loop?', o: ['Una persona revisa los casos en los que el sistema duda', 'El robot reemplaza por completo a la persona', 'La persona escribe todas las reglas', 'El bot se ejecuta en el equipo del usuario'], a: 0, e: 'La IA no reemplaza el control: lo hace más eficiente.' },
        { t: 'ipa', mod: 2, q: 'Según Celonis (s. f.), entre el 30 % y el 50 % de las iniciativas iniciales de RPA fracasan. ¿Por qué razón?', o: ['Por elegir procesos equivocados', 'Por falta de conectores', 'Porque los bots no leen PDF', 'Por exceso de supervisión humana'], a: 0, e: 'Elegir bien qué automatizar es tan importante como la herramienta.' },
        { t: 'ipa', mod: 2, q: '¿Qué nivel de automatización puede manejar también datos no estructurados, como correos, PDF e imágenes?', o: ['IPA', 'Scripts tradicionales', 'RPA clásica', 'Macros de Excel'], a: 0, e: 'La RPA trabaja con datos estructurados y digitales; la IPA incorpora IA para los no estructurados.' },

        { t: 'rpa', mod: 3, q: '¿Qué componente programa, supervisa y registra la ejecución de los robots, y además custodia credenciales?', o: ['Orquestador', 'Studio / Designer', 'Cola de trabajo', 'Webhook'], a: 0, e: 'El Studio / Designer es donde se diseña el flujo; el orquestador controla su ejecución.' },
        { t: 'rpa', mod: 3, q: '¿Cuál es la diferencia clave entre un bot atendido y uno desatendido?', o: ['El atendido corre en el equipo del usuario y lo activa la persona; el desatendido corre en servidores por horario, evento o cola', 'El atendido usa IA y el desatendido no', 'El desatendido siempre necesita una persona', 'Ninguna: son sinónimos'], a: 0, e: 'Atendido: equipo del usuario, lo activa la persona. Desatendido: servidores o máquinas virtuales, por horario, evento o cola.' },
        { t: 'rpa', mod: 3, q: '¿Qué proceso conviene más automatizar con RPA?', o: ['Uno con reglas claras, alto volumen y datos estructurados', 'Uno mal definido pero muy frecuente', 'Uno que exige juicio experto en cada caso', 'Uno con una interfaz que cambia cada semana'], a: 0, e: 'Los procesos mal definidos se rediseñan primero, y un bot no se adapta solo a cambios del sistema.' },
        { t: 'rpa', mod: 3, q: '¿Qué describe el PDD (Process Definition Document)?', o: ['Paso a paso cómo se ejecuta hoy el proceso', 'El código final del bot', 'El horario de ejecución del robot', 'El costo de la licencia'], a: 0, e: 'Sin el PDD, el bot automatiza suposiciones.' },
        { t: 'rpa', mod: 3, q: '¿Cuál es una buena práctica de gobernanza en RPA?', o: ['Guardar las credenciales en una bóveda y registrar las ejecuciones', 'Dejar las claves escritas dentro del bot', 'Cambiar el bot sin pruebas', 'No asignar responsable a cada bot'], a: 0, e: 'También: responsable por bot, control de cambios y pruebas, y auditoría.' },

        { t: 'flujos', mod: 4, q: '¿Qué es un trigger?', o: ['El evento que inicia un flujo', 'El último paso de un flujo', 'Una condición dentro de un bucle', 'Un conector de pago'], a: 0, e: 'Puede ser un correo nuevo, un horario, un clic o una petición web.' },
        { t: 'flujos', mod: 4, q: '¿Qué es un webhook?', o: ['Una URL que recibe una petición HTTP y dispara el flujo', 'Un tipo de bot atendido', 'Un modelo de ML', 'Una hoja de cálculo en la nube'], a: 0, e: 'Permite que otra aplicación dispare un flujo en tiempo real.' },
        { t: 'flujos', mod: 4, q: '¿Cuál de estas herramientas incluye RPA de escritorio?', o: ['Power Automate (con Power Automate Desktop)', 'n8n', 'Ninguna de las dos', 'Las dos por igual'], a: 0, e: 'n8n se enfoca en flujos entre servicios, no en RPA de escritorio.' },
        { t: 'flujos', mod: 4, q: '¿Cuál de estas herramientas puede autoalojarse o usarse en la nube?', o: ['n8n', 'Power Automate', 'Ninguna de las dos', 'Las dos por igual'], a: 0, e: 'Power Automate corre en la nube de Microsoft y se integra con Microsoft 365.' },
        { t: 'flujos', mod: 4, q: 'En la práctica guiada con Power Automate, ¿qué trigger inicia el flujo?', o: ['«Cuando llega un correo electrónico nuevo (V3)»', '«Agregar una fila a una tabla»', 'Gmail Trigger', 'Edit Fields (Set)'], a: 0, e: 'Después, la acción «Agregar una fila a una tabla» (Excel Online) guarda remitente, asunto y fecha.' }
    ];

    function quizMenu() {
        const p = intro('quiz', 'Quiz relámpago',
            'Hasta 10 preguntas con 20 segundos cada una. Acertar suma 10 puntos, y los segundos que te sobran dan hasta 5 puntos extra. Si fallas, te indico qué módulo repasar.',
            `<p class="jg-label" id="jgTopicLbl">Elige el tema</p>
             <div class="jg-pills" role="group" aria-labelledby="jgTopicLbl">
                ${Object.keys(TOPICS).map(k => `<button type="button" class="jg-pill" data-topic="${k}" aria-pressed="${k === 'all'}">${TOPICS[k]}</button>`).join('')}
             </div>
             <p class="jg-hint">Tu récord se guarda al jugar con «Todos los temas».</p>`,
            () => quizPlay(topic));
        let topic = 'all';
        p.querySelectorAll('.jg-pill').forEach(b => b.addEventListener('click', () => {
            topic = b.dataset.topic;
            p.querySelectorAll('.jg-pill').forEach(x => x.setAttribute('aria-pressed', x === b));
        }));
    }

    function quizPlay(topic) {
        stop();
        const pool = QUIZ.filter(q => topic === 'all' || q.t === topic);
        const list = pick(pool, Math.min(10, pool.length));
        const S = { i: 0, score: 0, streak: 0, ok: 0, review: new Set() };
        const p = P.quiz;

        function show() {
            const q = list[S.i];
            const opts = shuffle(q.o.map((txt, k) => ({ txt, ok: k === q.a })));
            p.innerHTML = `
                <div class="jg-head"><h3>Pregunta ${S.i + 1} de ${list.length}</h3>
                    <div class="jg-stats">Puntos <b>${S.score}</b> · Racha <b>${S.streak}</b> · <b class="jg-clock">${TIME} s</b></div></div>
                <div class="jg-bar" aria-hidden="true"><i></i></div>
                <p class="jg-q">${q.q}</p>
                <div class="jg-opts">${opts.map((o, k) => `<button type="button" class="jg-opt" data-k="${k}">${o.txt}</button>`).join('')}</div>
                <div id="jgQuizFb" aria-live="polite"></div>`;

            const bar = $('.jg-bar > i', p), clock = $('.jg-clock', p);
            const t0 = Date.now();
            let done = false;
            const remaining = () => Math.max(0, TIME - (Date.now() - t0) / 1000);

            const iv = setInterval(() => {
                const left = remaining();
                bar.style.width = (left / TIME * 100) + '%';
                bar.classList.toggle('low', left < 5);
                clock.textContent = Math.ceil(left) + ' s';
                if (left <= 0) answer(-1);
            }, 100);
            cleanups.push(() => clearInterval(iv));

            function answer(k) {
                if (done) return;
                done = true;
                clearInterval(iv);
                const left = remaining();
                const good = k >= 0 && opts[k].ok;
                let pts = 0;
                if (good) {
                    pts = 10 + Math.min(5, Math.ceil(left / 4));
                    S.score += pts; S.streak++; S.ok++;
                } else {
                    S.streak = 0; S.review.add(q.mod);
                }
                p.querySelectorAll('.jg-opt').forEach((b, idx) => {
                    b.disabled = true;
                    if (opts[idx].ok) b.classList.add('ok');
                    else if (idx === k) b.classList.add('bad');
                });
                const title = k === -1 ? 'Se acabó el tiempo.' : good ? `¡Correcto! +${pts} puntos` : 'No es esa.';
                const last = S.i === list.length - 1;
                $('#jgQuizFb', p).innerHTML = `<div class="jg-fb ${good ? '' : 'bad'}" role="status"><strong>${title}</strong>${q.e}</div>
                    <div class="jg-actions"><button type="button" class="jg-btn" id="jgNext">${last ? 'Ver resultado' : 'Siguiente'}</button></div>`;
                const next = $('#jgNext', p);
                next.focus();
                next.addEventListener('click', () => { S.i++; S.i >= list.length ? end() : show(); });
            }

            p.querySelectorAll('.jg-opt').forEach(b => b.addEventListener('click', () => answer(+b.dataset.k)));
        }

        function end() {
            const record = topic === 'all' ? submit('quiz', S.score) : false;
            const max = list.length * 15;
            const pct = S.ok / list.length;
            const msg = pct === 1 ? '¡Dominas el tema! Respuestas perfectas.'
                : pct >= 0.7 ? 'Muy buen resultado. Con un repaso rápido lo tienes.'
                : pct >= 0.4 ? 'Vas por buen camino. Repasa los módulos sugeridos e inténtalo otra vez.'
                : 'Aún te falta práctica: lee los módulos indicados y vuelve a intentarlo.';
            const mods = [...S.review].sort();
            const extra = mods.length ? `<p class="jg-review">Repasa: ${mods.map(m => `<a href="#modulo-${m}" data-mod="${m}">Módulo ${m}</a>`).join(' · ')}</p>` : '';
            p.innerHTML = resultHTML(S.score, max, `Acertaste ${S.ok} de ${list.length}. ${msg}` + (topic === 'all' ? '' : ' (El récord solo se guarda con «Todos los temas».)'), record, extra);
            $('[data-act="again"]', p).addEventListener('click', () => quizPlay(topic));
            $('[data-act="menu"]', p).addEventListener('click', quizMenu);
        }

        show();
    }

    // ========================================
    // JUEGO 2: MEMORIA DE CONCEPTOS
    // ========================================
    const PAIRS = [
        ['Supervisado', 'Entrena con datos etiquetados'],
        ['No supervisado', 'Agrupa datos sin etiquetas (clustering)'],
        ['Por refuerzo', 'Aprende mediante recompensas'],
        ['Sobreajuste', 'Memoriza el entrenamiento y falla con datos nuevos'],
        ['OCR', 'Convierte imágenes o PDF en datos'],
        ['NLP', 'Entiende texto escrito'],
        ['Orquestador', 'Programa y supervisa a los robots'],
        ['Webhook', 'URL que dispara un flujo al recibir una petición'],
        ['Trigger', 'Evento que inicia un flujo'],
        ['Minería de procesos', 'Analiza registros de eventos'],
        ['Human-in-the-loop', 'Una persona revisa los casos dudosos'],
        ['RPA', 'Robot que imita clics y teclado con reglas']
    ];

    function memoryMenu() {
        intro('memory', 'Memoria de conceptos',
            'Voltea las cartas y une cada término (verde) con su definición (naranja). Menos intentos y menos tiempo significan más puntos.',
            '', memoryPlay);
    }

    function memoryPlay() {
        stop();
        const p = P.memory;
        const pairs = pick(PAIRS.map((x, i) => ({ id: i, term: x[0], def: x[1] })), 8);
        const cards = shuffle(pairs.flatMap(x => [
            { id: x.id, type: 'term', text: x.term },
            { id: x.id, type: 'def', text: x.def }
        ]));

        p.innerHTML = `
            <div class="jg-head"><h3>Memoria de conceptos</h3>
                <div class="jg-stats">Intentos <b id="jgMi">0</b> · Parejas <b id="jgMp">0/8</b> · Tiempo <b id="jgMt">0 s</b></div></div>
            <p class="jg-hint">Verde: término · Naranja: definición.</p>
            <div class="jg-mem">${cards.map((c, i) => `
                <button type="button" class="jg-card ${c.type}" data-i="${i}" aria-label="Carta ${i + 1}, boca abajo">
                    <span class="jg-card-in"><span class="jg-face jg-front" aria-hidden="true">?</span><span class="jg-face jg-back">${c.text}</span></span>
                </button>`).join('')}</div>`;

        const els = [...p.querySelectorAll('.jg-card')];
        let first = null, lock = false, moves = 0, matched = 0, secs = 0, timer = null, tm = null;
        cleanups.push(() => { clearInterval(timer); clearTimeout(tm); });

        function flip(el, on) {
            const c = cards[+el.dataset.i];
            el.classList.toggle('flip', on);
            el.setAttribute('aria-label', on ? c.text : `Carta ${+el.dataset.i + 1}, boca abajo`);
        }

        els.forEach(el => el.addEventListener('click', () => {
            if (lock || el.classList.contains('flip') || el.classList.contains('done')) return;
            if (!timer) timer = setInterval(() => { secs++; $('#jgMt', p).textContent = secs + ' s'; }, 1000);
            flip(el, true);
            if (!first) { first = el; return; }

            moves++;
            $('#jgMi', p).textContent = moves;
            const a = cards[+first.dataset.i], b = cards[+el.dataset.i];
            const prev = first;
            first = null;

            if (a.id === b.id && a.type !== b.type) {
                [prev, el].forEach(x => { x.classList.remove('flip'); x.classList.add('done'); });
                matched++;
                $('#jgMp', p).textContent = matched + '/8';
                if (matched === 8) {
                    clearInterval(timer);
                    tm = setTimeout(end, 700);
                }
            } else {
                lock = true;
                [prev, el].forEach(x => x.classList.add('miss'));
                tm = setTimeout(() => {
                    [prev, el].forEach(x => { x.classList.remove('miss'); flip(x, false); });
                    lock = false;
                }, 950);
            }
        }));

        function end() {
            const score = Math.max(10, 100 - 4 * Math.max(0, moves - 8) - Math.floor(secs / 6));
            const record = submit('memory', score);
            const msg = moves <= 10 ? 'Memoria de elefante: casi sin errores.'
                : moves <= 16 ? 'Buen ritmo. Con otra partida bajas los intentos.'
                : 'Lo lograste. Repasa el glosario y verás cómo mejoran los intentos.';
            p.innerHTML = resultHTML(score, 100, `Completaste las 8 parejas en ${moves} intentos y ${secs} s. ${msg}`, record,
                '<p class="jg-review">¿Dudas con algún término? Revisa el <a href="#glosario">glosario</a>.</p>');
            $('[data-act="again"]', p).addEventListener('click', memoryPlay);
            $('[data-act="menu"]', p).addEventListener('click', memoryMenu);
        }
    }

    // ========================================
    // JUEGO 3: ¿ML, RPA O IPA?
    // ========================================
    const SCENARIOS = [
        { q: 'Un bot copia cada mañana los datos de un Excel al ERP siguiendo reglas fijas.', a: 'RPA', e: 'Sigue reglas definidas sobre datos estructurados, sin interpretar nada: es RPA clásica.' },
        { q: 'Un modelo entrenado con el historial de compras predice qué clientes van a cancelar su suscripción.', a: 'ML', e: 'Aprende patrones de datos históricos para predecir; por sí solo no ejecuta tareas en las aplicaciones.' },
        { q: 'Llega una factura en PDF: el OCR extrae los campos, un modelo valida y, si duda, una persona revisa; después un robot la registra en el ERP.', a: 'IPA', e: 'Combina OCR, ML, human-in-the-loop y un robot RPA: es el ejemplo típico de IPA.' },
        { q: 'Un algoritmo agrupa clientes con hábitos parecidos sin que nadie le indique los grupos de antemano.', a: 'ML', e: 'Es clustering: aprendizaje no supervisado, una técnica de ML.' },
        { q: 'Un asistente atendido llena un formulario cuando la persona pulsa un botón, repitiendo clics y teclado.', a: 'RPA', e: 'Un bot atendido corre en el equipo del usuario e imita clics y teclado con reglas definidas.' },
        { q: 'Un sistema lee los correos de la Facultad, entiende la intención (certificado, reingreso, falla) y los enruta al responsable, escalando los dudosos a una persona.', a: 'IPA', e: 'NLP + flujo automático + supervisión humana: automatización inteligente.' },
        { q: 'Un clasificador entrenado con correos etiquetados decide si un mensaje es spam o no.', a: 'ML', e: 'Es aprendizaje supervisado: clasifica a partir de ejemplos etiquetados.' },
        { q: 'Un robot desatendido descarga cada noche los reportes de un portal y los guarda en una carpeta, a la hora programada.', a: 'RPA', e: 'Se activa por horario en un servidor y repite pasos con reglas fijas.' },
        { q: 'Un sistema extrae los datos de fotos de cédulas y, si su confianza es baja, las manda a revisión humana antes de registrarlas.', a: 'IPA', e: 'OCR + modelo con nivel de confianza + persona en el circuito + registro automático.' },
        { q: 'Un modelo estima el precio de una vivienda a partir de su área, ubicación y antigüedad.', a: 'ML', e: 'Es regresión: aprendizaje supervisado para predecir un valor numérico.' },
        { q: 'Un robot entra todos los días al portal del banco, descarga el extracto y lo pega en una hoja de cálculo.', a: 'RPA', e: 'Tarea repetitiva sobre una interfaz, con reglas claras y sin necesidad de interpretar.' },
        { q: 'Un asistente entiende lo que escribe el usuario, consulta el ERP, abre el ticket y lo asigna, pasando a una persona cuando no está seguro.', a: 'IPA', e: 'Suma NLP e IA a la ejecución automática, con supervisión humana.' }
    ];
    const CLS = [
        { k: 'ML', d: 'aprende de datos' },
        { k: 'RPA', d: 'sigue reglas' },
        { k: 'IPA', d: 'RPA + IA' }
    ];

    function classifyMenu() {
        intro('classify', '¿ML, RPA o IPA?',
            'Te muestro 8 situaciones reales. Decide si se resuelve con machine learning, con RPA o con automatización inteligente (IPA). Cada acierto suma 10 puntos y un juego perfecto da 20 más.',
            '', classifyPlay);
    }

    function classifyPlay() {
        stop();
        const p = P.classify;
        const list = pick(SCENARIOS, 8);
        let i = 0, ok = 0;

        function show() {
            const s = list[i];
            p.innerHTML = `
                <div class="jg-head"><h3>Situación ${i + 1} de ${list.length}</h3><div class="jg-stats">Aciertos <b>${ok}</b></div></div>
                <div class="jg-bar prog" aria-hidden="true"><i style="width:${i / list.length * 100}%"></i></div>
                <p class="jg-scn">${s.q}</p>
                <div class="jg-cls">${CLS.map(c => `<button type="button" class="jg-opt" data-k="${c.k}"><b>${c.k}</b><small>${c.d}</small></button>`).join('')}</div>
                <div id="jgClsFb" aria-live="polite"></div>`;

            p.querySelectorAll('.jg-opt').forEach(b => b.addEventListener('click', () => {
                const good = b.dataset.k === s.a;
                if (good) ok++;
                p.querySelectorAll('.jg-opt').forEach(x => {
                    x.disabled = true;
                    if (x.dataset.k === s.a) x.classList.add('ok');
                    else if (x === b) x.classList.add('bad');
                });
                const last = i === list.length - 1;
                $('#jgClsFb', p).innerHTML = `<div class="jg-fb ${good ? '' : 'bad'}" role="status"><strong>${good ? '¡Correcto! +10 puntos' : 'La respuesta era ' + s.a + '.'}</strong>${s.e}</div>
                    <div class="jg-actions"><button type="button" class="jg-btn" id="jgNext">${last ? 'Ver resultado' : 'Siguiente'}</button></div>`;
                const next = $('#jgNext', p);
                next.focus();
                next.addEventListener('click', () => { i++; i >= list.length ? end() : show(); });
            }));
        }

        function end() {
            const score = ok * 10 + (ok === list.length ? 20 : 0);
            const record = submit('classify', score);
            const msg = ok === list.length ? '¡Juego perfecto! Distingues muy bien cada nivel.'
                : ok >= 6 ? 'Muy bien. Revisa la tabla comparativa del módulo 2 para afinar los casos dudosos.'
                : 'Repasa la diferencia entre tradicional, RPA e IPA en el módulo 2 y vuelve a intentarlo.';
            p.innerHTML = resultHTML(score, 100, `Acertaste ${ok} de ${list.length}. ${msg}`, record,
                '<p class="jg-review">Repasa: <a href="#modulo-2" data-mod="2">Módulo 2</a> · <a href="#modulo-3" data-mod="3">Módulo 3</a></p>');
            $('[data-act="again"]', p).addEventListener('click', classifyPlay);
            $('[data-act="menu"]', p).addEventListener('click', classifyMenu);
        }

        show();
    }

    // ========================================
    // JUEGO 4: ORDENA EL FLUJO
    // ========================================
    const SEQS = [
        { name: 'Práctica guiada en n8n: del correo a la hoja', steps: ['Gmail Trigger: llega un correo', 'Edit Fields (Set): se eligen remitente, asunto y fecha', 'Google Sheets: Append row'] },
        { name: 'Ciclo de la automatización inteligente', steps: ['Descubrir procesos', 'Analizar y priorizar', 'Automatizar', 'Medir resultados', 'Optimizar y reentrenar'] },
        { name: 'Ciclo de vida de un proyecto RPA', steps: ['Identificar procesos', 'Documentar (PDD)', 'Desarrollar el bot', 'Probar', 'Desplegar', 'Monitorear y mantener'] },
        { name: 'La factura inteligente', steps: ['Llega el PDF por correo', 'El OCR extrae los campos', 'El modelo valida y calcula su confianza', 'Si la confianza es baja, revisa una persona', 'El RPA registra en el ERP', 'Se confirma y se miden los tiempos'] },
        { name: 'Flujo de un proyecto de ML', steps: ['Definir problema y métrica', 'Recolectar datos', 'Limpiar y preparar', 'Dividir en entrenamiento y prueba', 'Entrenar', 'Evaluar', 'Desplegar y monitorear'] }
    ];

    function orderMenu() {
        intro('order', 'Ordena el flujo',
            'Toca los pasos en el orden correcto, del primero al último. Cada error resta 10 puntos de los 100 posibles. Elige una secuencia:',
            `<div class="jg-menu">${SEQS.map((s, k) => `<button type="button" class="jg-opt" data-seq="${k}">${s.name}<small>${s.steps.length} pasos</small></button>`).join('')}</div>`,
            null);
        P.order.querySelectorAll('[data-seq]').forEach(b => b.addEventListener('click', () => orderPlay(+b.dataset.seq)));
    }

    function orderPlay(n) {
        stop();
        const p = P.order;
        const seq = SEQS[n];
        let pool = shuffle(seq.steps.map((t, i) => ({ t, i })));
        while (pool.every((o, k) => o.i === k)) pool = shuffle(pool);
        let placed = 0, errors = 0;

        p.innerHTML = `
            <div class="jg-head"><h3>${seq.name}</h3><div class="jg-stats">Errores <b id="jgErr">0</b></div></div>
            <p class="jg-hint">Toca el paso que va primero, luego el segundo, y así hasta el final.</p>
            <div class="jg-pool">${pool.map(o => `<button type="button" class="jg-chip" data-i="${o.i}">${o.t}</button>`).join('')}</div>
            <ol class="jg-slots" aria-live="polite">${seq.steps.map((t, k) => `<li><span>${k + 1}</span></li>`).join('')}</ol>`;

        const slots = [...p.querySelectorAll('.jg-slots li')];
        let tm = null;
        cleanups.push(() => clearTimeout(tm));

        p.querySelectorAll('.jg-chip').forEach(chip => chip.addEventListener('click', () => {
            if (+chip.dataset.i === placed) {
                slots[placed].classList.add('on');
                slots[placed].append(seq.steps[placed]);
                placed++;
                chip.hidden = true;
                const nextChip = p.querySelector('.jg-chip:not([hidden])');
                if (nextChip) nextChip.focus();
                if (placed === seq.steps.length) tm = setTimeout(end, 700);
            } else {
                errors++;
                $('#jgErr', p).textContent = errors;
                chip.classList.remove('shake');
                void chip.offsetWidth;
                chip.classList.add('shake');
                setTimeout(() => chip.classList.remove('shake'), 450);
            }
        }));

        function end() {
            const score = Math.max(0, 100 - 10 * errors);
            const record = submit('order', score);
            const msg = errors === 0 ? 'Orden perfecto, sin un solo error.'
                : errors <= 2 ? 'Casi perfecto. Un repaso y lo logras sin errores.'
                : 'Revisa el módulo correspondiente y vuelve a intentarlo.';
            const mod = n === 4 ? 1 : n === 1 || n === 3 ? 2 : n === 2 ? 3 : 4;
            p.innerHTML = resultHTML(score, 100, `${seq.name}: ${errors} ${errors === 1 ? 'error' : 'errores'}. ${msg}`, record,
                `<p class="jg-review">Repasa: <a href="#modulo-${mod}" data-mod="${mod}">Módulo ${mod}</a></p>`);
            $('[data-act="again"]', p).addEventListener('click', () => orderPlay(n));
            $('[data-act="menu"]', p).addEventListener('click', orderMenu);
        }
    }

    // ========================================
    // PESTAÑAS, ENLACES A MÓDULOS Y REINICIO
    // ========================================
    const MENU = { quiz: quizMenu, memory: memoryMenu, classify: classifyMenu, order: orderMenu };
    const tabs = [...root.querySelectorAll('.jg-tab')];

    function select(game, focus) {
        stop();
        tabs.forEach(t => {
            const on = t.dataset.game === game;
            t.setAttribute('aria-selected', on);
            t.tabIndex = on ? 0 : -1;
            if (on && focus) t.focus();
        });
        GAMES.forEach(g => { P[g].hidden = g !== game; });
        MENU[game]();
    }

    tabs.forEach((t, i) => {
        t.addEventListener('click', () => select(t.dataset.game));
        t.addEventListener('keydown', (e) => {
            const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
            if (d) { e.preventDefault(); select(tabs[(i + d + tabs.length) % tabs.length].dataset.game, true); }
        });
    });

    // Los enlaces «Repasa: Módulo N» abren el módulo (details) y bajan hasta él
    root.addEventListener('click', (e) => {
        const a = e.target.closest('a[data-mod]');
        if (!a) return;
        e.preventDefault();
        const d = document.getElementById('modulo-' + a.dataset.mod) || document.getElementById(a.dataset.mod);
        if (d) { if (window.OVAPager) window.OVAPager.goTo(d.id); d.open = true; d.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });

    $('#jgReset').addEventListener('click', () => {
        if (!window.confirm('¿Borrar tus récords de todos los juegos?')) return;
        GAMES.forEach(g => { data.best[g] = 0; });
        persist();
        updateBoard();
    });

    window.OVAGames = { P, $, shuffle, pick, stop, cleanups, submit, resultHTML, intro, MENU,
        reset: () => { const t = tabs.find(x => x.getAttribute('aria-selected') === 'true'); select(t ? t.dataset.game : 'quiz'); } };
    updateBoard();
    select('quiz');
})();
