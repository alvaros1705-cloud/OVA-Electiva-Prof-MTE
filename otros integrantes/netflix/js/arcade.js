/**
 * JUEGOS ARCADE — Robot recolector y Cinta de correos
 * Se apoyan en window.OVAGames, expuesto por games.js (cargar después de él).
 */
(function () {
    'use strict';
    const G = window.OVAGames;
    if (!G) return;
    const { P, $, shuffle, pick, stop, cleanups, submit, resultHTML, intro, MENU } = G;

    const listen = (t, ev, fn, o) => { t.addEventListener(ev, fn, o); cleanups.push(() => t.removeEventListener(ev, fn, o)); };

    // ========================================
    // JUEGO 5: ROBOT RECOLECTOR (canvas)
    // ========================================
    const GOOD = ['Copiar datos al ERP', 'Reporte diario', 'Descargar extractos', 'Validar formularios', 'Alto volumen', 'Reglas claras', 'Datos estructurados', 'Conciliar facturas'];
    const BAD = ['Juicio experto', 'Interfaz cambiante', 'Proceso mal definido', 'Una vez al año', 'Sin reglas claras', 'Excepciones constantes'];

    MENU.robot = function () {
        intro('robot', 'Robot recolector',
            'Mueve el robot con el ratón, el dedo o las flechas ← →. Atrapa solo lo que conviene automatizar con RPA (+5 puntos). Si atrapas algo que no conviene, pierdes una vida. Tienes 45 segundos y 3 vidas.',
            '', robotPlay);
    };

    function robotPlay() {
        stop();
        const p = P.robot;
        p.innerHTML = `<div class="jg-head"><h3>Robot recolector</h3>
            <div class="jg-stats">Puntos <b id="rbS">0</b> · Vidas <b id="rbL">3</b> · <b id="rbT">45 s</b></div></div>
            <canvas class="jg-cv" width="640" height="380" aria-label="Juego: mueve el robot para atrapar los procesos que conviene automatizar con RPA"></canvas>
            <p class="jg-hint">Atrapa lo que SÍ conviene automatizar con RPA y esquiva lo demás.</p>`;
        const cv = $('canvas', p), c = cv.getContext('2d'), W = 640, H = 380;
        const robot = { x: W / 2 }, items = [], floats = [], keys = {};
        let score = 0, lives = 3, t = 45, sp = 0, last = performance.now(), raf = 0, over = false;

        const move = (e) => { const r = cv.getBoundingClientRect(); robot.x = Math.max(36, Math.min(W - 36, (e.clientX - r.left) / r.width * W)); };
        listen(cv, 'pointermove', move);
        listen(cv, 'pointerdown', move);
        listen(document, 'keydown', (e) => { if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { keys[e.key] = true; e.preventDefault(); } });
        listen(document, 'keyup', (e) => { keys[e.key] = false; });
        cleanups.push(() => cancelAnimationFrame(raf));

        const box = (x, y, w, h, r) => { c.beginPath(); c.roundRect ? c.roundRect(x, y, w, h, r) : c.rect(x, y, w, h); };
        const hud = () => { $('#rbS', p).textContent = score; $('#rbL', p).textContent = lives; $('#rbT', p).textContent = Math.max(0, Math.ceil(t)) + ' s'; };

        function frame(now) {
            const dt = Math.min(0.05, (now - last) / 1000); last = now;
            t -= dt;
            const elapsed = 45 - t;
            robot.x = Math.max(36, Math.min(W - 36, robot.x + ((keys.ArrowRight ? 1 : 0) - (keys.ArrowLeft ? 1 : 0)) * 380 * dt));

            sp -= dt;
            if (sp <= 0) {
                sp = Math.max(0.45, 1 - elapsed * 0.012);
                const good = Math.random() < 0.6;
                const txt = (good ? GOOD : BAD)[Math.floor(Math.random() * (good ? GOOD.length : BAD.length))];
                c.font = '600 13px Inter, sans-serif';
                const w = c.measureText(txt).width + 24;
                items.push({ t: txt, good, w, x: w / 2 + Math.random() * (W - w), y: -30 });
            }

            const ry = H - 64;
            for (let i = items.length - 1; i >= 0; i--) {
                const it = items[i];
                it.y += (110 + elapsed * 3.5) * dt;
                if (it.y + 30 >= ry - 6 && it.y <= ry + 10 && Math.abs(it.x - robot.x) < it.w / 2 + 28) {
                    if (it.good) { score += 5; floats.push({ x: it.x, y: it.y, s: '+5', col: '#088732', l: 0.8 }); }
                    else { score = Math.max(0, score - 5); lives--; floats.push({ x: it.x, y: it.y, s: '¡No!', col: '#c62828', l: 0.8 }); }
                    items.splice(i, 1);
                } else if (it.y > H) items.splice(i, 1);
            }
            floats.forEach(f => { f.y -= 40 * dt; f.l -= dt; });

            // dibujo
            const bg = c.createLinearGradient(0, 0, 0, H);
            bg.addColorStop(0, '#eaf6ee'); bg.addColorStop(1, '#cfe9d7');
            c.fillStyle = bg; c.fillRect(0, 0, W, H);
            c.fillStyle = '#088732'; c.fillRect(0, H - 14, W, 14);
            c.font = '600 13px Inter, sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle';
            items.forEach(it => {
                box(it.x - it.w / 2, it.y, it.w, 30, 8); c.fillStyle = '#fff'; c.fill();
                c.lineWidth = 2; c.strokeStyle = '#088732'; c.stroke();
                c.fillStyle = '#1A1D24'; c.fillText(it.t, it.x, it.y + 15);
            });
            const rx = robot.x;
            c.fillStyle = '#FF8F00'; c.fillRect(rx - 38, ry - 8, 76, 6);           // bandeja
            box(rx - 30, ry + 14, 60, 38, 8); c.fillStyle = '#04662C'; c.fill();   // cuerpo
            box(rx - 22, ry - 2, 44, 24, 8); c.fillStyle = '#088732'; c.fill();     // cabeza
            c.fillStyle = '#fff'; c.beginPath(); c.arc(rx - 9, ry + 10, 5, 0, 7); c.arc(rx + 9, ry + 10, 5, 0, 7); c.fill();
            c.fillStyle = '#1A1D24'; c.beginPath(); c.arc(rx - 9, ry + 10, 2, 0, 7); c.arc(rx + 9, ry + 10, 2, 0, 7); c.fill();
            c.fillStyle = '#222'; c.beginPath(); c.arc(rx - 18, H - 14, 7, 0, 7); c.arc(rx + 18, H - 14, 7, 0, 7); c.fill();
            c.font = '800 16px Inter, sans-serif';
            floats.forEach(f => { if (f.l > 0) { c.fillStyle = f.col; c.fillText(f.s, f.x, f.y); } });

            hud();
            if (t <= 0 || lives <= 0) return end();
            raf = requestAnimationFrame(frame);
        }

        function end() {
            over = true;
            const final = Math.min(100, score);
            const record = submit('robot', final);
            const msg = lives <= 0 ? 'Te quedaste sin vidas: recuerda, no todo proceso conviene automatizarse.'
                : final >= 80 ? '¡Ojo de experto! Eliges muy bien qué automatizar.'
                : 'Buen intento. Los buenos candidatos tienen reglas claras, alto volumen y datos estructurados.';
            p.innerHTML = resultHTML(final, 100, msg, record, '<p class="jg-review">Repasa: <a href="#modulo-3" data-mod="3">Módulo 3</a></p>');
            $('[data-act="again"]', p).addEventListener('click', robotPlay);
            $('[data-act="menu"]', p).addEventListener('click', MENU.robot);
        }

        raf = requestAnimationFrame(frame);
        void over;
    }

    // ========================================
    // JUEGO 6: CINTA DE CORREOS
    // ========================================
    const BINS = [{ k: 'cert', n: 'Certificado' }, { k: 'rein', n: 'Reingreso' }, { k: 'fall', n: 'Falla técnica' }, { k: 'cons', n: 'Consulta' }];
    const MAILS = [
        ['Solicito un certificado de notas para mi beca', 'cert'], ['Necesito constancia de estudio para el banco', 'cert'],
        ['Pido el certificado de matrícula vigente', 'cert'], ['Necesito mi certificado de calificaciones', 'cert'],
        ['Quiero reingresar al programa el próximo semestre', 'rein'], ['Me retiré en 2024 y deseo reintegrarme', 'rein'],
        ['Solicito reingreso: estuve un año en receso', 'rein'], ['Cancelé el semestre pasado y pido reingreso', 'rein'],
        ['No puedo entrar a la plataforma, sale un error', 'fall'], ['El sistema de notas no carga desde ayer', 'fall'],
        ['Mi correo institucional no recibe mensajes', 'fall'], ['La página de matrícula se cae al pagar', 'fall'],
        ['¿Cuándo empiezan las clases del próximo semestre?', 'cons'], ['¿Dónde queda la oficina de la Facultad?', 'cons'],
        ['¿Cuál es el horario de atención?', 'cons'], ['¿Qué electivas puedo ver en octavo semestre?', 'cons']
    ];
    const TOTAL = 12;

    MENU.belt = function () {
        intro('belt', 'Cinta de correos',
            'Eres el clasificador de la bandeja de la Facultad (el caso integrador). Los correos avanzan por la cinta: toca el destino correcto del que va más adelante, o usa las teclas 1 a 4. Si te equivocas o un correo llega al final sin clasificar, pierdes una vida. Son 12 correos y 3 vidas.',
            '', beltPlay);
    };

    function beltPlay() {
        stop();
        const p = P.belt;
        p.innerHTML = `<div class="jg-head"><h3>Cinta de correos</h3>
            <div class="jg-stats">Aciertos <b id="bS">0</b> · Vidas <b id="bL">3</b> · Correo <b id="bN">0/${TOTAL}</b></div></div>
            <div class="jg-belt" id="jgBelt" aria-live="off"></div>
            <div class="jg-bins">${BINS.map((b, i) => `<button type="button" class="jg-bin" data-k="${b.k}"><b>${i + 1}</b>${b.n}</button>`).join('')}</div>
            <p class="jg-hint">Se clasifica el correo resaltado en naranja (el que va más adelante).</p>`;
        const belt = $('#jgBelt', p);
        const mails = pick(MAILS, TOTAL);
        const live = [];
        let spawned = 0, ok = 0, lives = 3, handled = 0, gap = 0, last = performance.now(), raf = 0, finished = false;
        cleanups.push(() => cancelAnimationFrame(raf));

        const hud = () => { $('#bS', p).textContent = ok; $('#bL', p).textContent = lives; $('#bN', p).textContent = handled + '/' + TOTAL; };
        const flash = (k, cls) => {
            const b = p.querySelector(`.jg-bin[data-k="${k}"]`);
            if (!b) return;
            b.classList.add(cls); setTimeout(() => b.classList.remove(cls), 350);
        };
        const drop = (m) => { m.done = true; m.el.classList.add('gone'); setTimeout(() => m.el.remove(), 320); };

        function route(k) {
            if (finished) return;
            const front = live.filter(m => !m.done && m.x > -m.w * 0.5).sort((a, b) => b.x - a.x)[0];
            if (!front) return;
            handled++;
            if (front.k === k) { ok++; flash(k, 'ok'); } else { lives--; flash(k, 'no'); flash(front.k, 'ok'); }
            drop(front); hud();
            if (lives <= 0 || handled >= TOTAL) end();
        }

        p.querySelectorAll('.jg-bin').forEach(b => b.addEventListener('click', () => route(b.dataset.k)));
        listen(document, 'keydown', (e) => { const i = '1234'.indexOf(e.key); if (i >= 0 && e.key.length === 1 && !P.belt.hidden) route(BINS[i].k); });

        function frame(now) {
            if (finished) return;
            const dt = Math.min(0.05, (now - last) / 1000); last = now;
            const W = belt.clientWidth;
            gap -= dt;
            if (spawned < TOTAL && gap <= 0) {
                gap = Math.max(1.7, 3.4 - spawned * 0.15);
                const [txt, k] = mails[spawned++];
                const el = document.createElement('div');
                el.className = 'jg-mail'; el.textContent = txt;
                belt.appendChild(el);
                const w = el.offsetWidth;
                live.push({ el, k, w, x: -w, speed: (W + w) / Math.max(5.5, 9 - spawned * 0.3) });
            }
            live.forEach(m => {
                if (m.done) return;
                m.x += m.speed * dt;
                m.el.style.transform = `translateX(${m.x}px)`;
                if (m.x > W) { handled++; lives--; drop(m); hud(); flash(m.k, 'ok'); if (lives <= 0 || handled >= TOTAL) end(); }
            });
            const front = live.filter(m => !m.done && m.x > -m.w * 0.5).sort((a, b) => b.x - a.x)[0];
            live.forEach(m => m.el.classList.toggle('front', m === front));
            raf = requestAnimationFrame(frame);
        }

        function end() {
            if (finished) return;
            finished = true;
            cancelAnimationFrame(raf);
            const score = Math.round(ok / TOTAL * 100);
            const record = submit('belt', score);
            const msg = ok === TOTAL ? '¡Bandeja impecable! Ninguna solicitud se perdió.'
                : lives <= 0 ? 'Se te acumularon los errores. Esto es justo lo que un modelo de NLP haría por ti, con una persona revisando los casos dudosos.'
                : 'Buen trabajo. Con NLP y revisión humana, este proceso se podría automatizar.';
            setTimeout(() => {
                p.innerHTML = resultHTML(score, 100, `Clasificaste bien ${ok} de ${TOTAL} correos. ${msg}`, record,
                    '<p class="jg-review">Repasa: <a href="#modulo-2" data-mod="2">Módulo 2</a> · <a href="#caso" data-mod="caso">Caso integrador</a></p>');
                $('[data-act="again"]', p).addEventListener('click', beltPlay);
                $('[data-act="menu"]', p).addEventListener('click', MENU.belt);
            }, 450);
        }

        raf = requestAnimationFrame(frame);
    }
})();
