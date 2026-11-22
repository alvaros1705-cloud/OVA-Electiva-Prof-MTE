/**
 * NAVEGACIÓN POR PASOS + TEMA CLARO/OSCURO + IDIOMA ES/EN
 * Cargar al final, después de games.js y arcade.js.
 */
(function () {
    'use strict';
    const $ = (s, c) => (c || document).querySelector(s);
    const $$ = (s, c) => [...(c || document).querySelectorAll(s)];
    const store = {
        get: (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } },
        set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} }
    };

    // ---------- Idioma: diccionario ES → EN (texto exacto de cada elemento) ----------
    const EN = {
        'Inicio': 'Home', 'Objetivos': 'Objectives', 'Módulos': 'Modules', 'Glosario': 'Glossary', 'Juegos': 'Games', 'Recursos': 'Resources', 'Contacto': 'Contact', 'Empezar': 'Start',
        'OVA: Machine Learning y Automatización Inteligente de Procesos': 'OVA: Machine Learning and Intelligent Process Automation',
        'Recurso educativo digital de uso académico': 'Digital educational resource for academic use',
        '© 2026 Universidad Simón Bolívar · Uso académico': '© 2026 Universidad Simón Bolívar · Academic use',
        'Piezas de la solución': 'Solution pieces', 'Ciclo de vida': 'Life cycle', 'Equipo': 'Team',
        'Toca una burbuja para subir una foto': 'Tap a bubble to upload a photo', 'Quitar foto': 'Remove photo',
        'Anterior': 'Previous', 'Siguiente': 'Next', 'Modo oscuro': 'Dark mode', 'Modo claro': 'Light mode',
        'Machine Learning (visión general)': 'Machine Learning (overview)',
        'Automatización Inteligente de Procesos (IPA)': 'Intelligent Process Automation (IPA)',
        'RPA: Automatización Robótica de Procesos': 'RPA: Robotic Process Automation',
        'Power Automate y n8n': 'Power Automate and n8n',
        'Caso integrador: la bandeja de la Facultad': 'Capstone case: the Faculty inbox',
        'Practica jugando': 'Practice by playing', 'Zona de': 'Game', 'juegos': 'zone',
        'Seis retos para repasar los módulos: responde, une, clasifica, ordena, atrapa y reacciona. Tu mejor puntaje de cada juego se guarda en este navegador.': 'Six challenges to review the modules: answer, match, classify, sort, catch and react. Your best score in each game is saved in this browser.',
        'de 650 puntos ·': 'of 650 points ·', 'Reiniciar récords': 'Reset records',
        'Quiz relámpago': 'Lightning quiz', 'Memoria': 'Memory', 'Ordena el flujo': 'Order the flow', 'Robot recolector': 'Robot collector', 'Cinta de correos': 'Mail belt',
        'RECURSOS MULTIMEDIA': 'MULTIMEDIA RESOURCES',
        'Videos, podcasts y documentación para reforzar cada módulo. Desliza para ver más.': 'Videos, podcasts and documentation to reinforce each module. Swipe to see more.',
        'Abrir recurso': 'Open resource',
        'Equipo del proyecto': 'Project team', 'Electiva Profesional I': 'Professional Elective I', 'Docente': 'Instructor', 'Desarrollador': 'Developer', 'Desarrolladora': 'Developer',
        'Facultad de Ingeniería - Ingeniería de Sistemas': 'Faculty of Engineering - Systems Engineering',
        'Electiva Profesional I · Docente Álvaro Salamanca': 'Professional Elective I · Instructor Álvaro Salamanca',
        'Desarrolladores: Anderson Nuncira | Emily Lozano | Santiago Jaimes': 'Developers: Anderson Nuncira | Emily Lozano | Santiago Jaimes'
    };
    Object.assign(EN, window.OVA_EN || {});
    let lang = store.get('ova-lang') === 'en' ? 'en' : 'es';
    const tr = (s) => (lang === 'en' && EN[s]) || s;

    const original = new WeakMap();
    function translatePage() {
        const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
            acceptNode: (n) => /^(SCRIPT|STYLE|NOSCRIPT)$/.test(n.parentNode.nodeName) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
        });
        let n;
        while ((n = w.nextNode())) {
            const o = original.get(n) || n.nodeValue, key = o.trim().replace(/\s+/g, ' ');
            if (!key) continue;
            if (lang === 'en' && EN[key]) { original.set(n, o); n.nodeValue = o.match(/^\s*/)[0] + EN[key] + o.match(/\s*$/)[0]; }
            else if (lang === 'es' && original.has(n)) { n.nodeValue = original.get(n); original.delete(n); }
        }
    }

    // ---------- Pasos (vistas) ----------
    const V = [
        { id: 'inicio', t: 'Inicio', sels: ['.hero', '.quick-cards', '.services'], ids: ['caracteristicas'], nav: '#' },
        { id: 'como-funciona', t: 'Objetivos', sels: ['#como-funciona'], nav: '#como-funciona' },
        { id: 'modulos', t: 'Módulos', sels: ['#modulos'], ids: ['modulo-1', 'modulo-2', 'modulo-3', 'modulo-4', 'caso'], nav: '#modulos' },
        { id: 'piezas', t: 'Piezas de la solución', sels: ['#integracion'], ids: ['integracion'], nav: '#modulos' },
        { id: 'ciclo-de-vida', t: 'Ciclo de vida', sels: ['#para-empresas'], ids: ['para-empresas'], nav: '#modulos' },
        { id: 'glosario', t: 'Glosario', sels: ['#glosario'], nav: '#glosario' },
        { id: 'juegos', t: 'Juegos', sels: ['#juegos'], nav: '#juegos' },
        { id: 'recursos', t: 'Recursos', sels: ['#recursos'], nav: '#recursos' },
        { id: 'equipo', t: 'Equipo', sels: ['#equipo'], nav: '#equipo' }
    ];
    V.forEach(v => {
        v.els = v.mod ? [$('#modulos')] : v.sels.flatMap(s => $$(s));
        v.ids = [v.id].concat(v.ids || []);
    });
    const all = [...new Set(V.flatMap(v => v.els))];
    const mods = $$('#modulos .ova-mod');
    const viewFor = (id) => V.findIndex(v => v.ids.includes(id));
    let cur;

    // ---------- Barra inferior ----------
    const bar = document.createElement('div');
    bar.className = 'pg-bar';
    bar.setAttribute('role', 'navigation');
    bar.innerHTML = `<div class="pg-tools"><button type="button" class="pg-tool" id="pgTheme"></button><button type="button" class="pg-tool" id="pgLang"></button></div>
        <div class="pg-info"><b id="pgTitle"></b> <span id="pgCount"></span><div class="pg-prog"><i></i></div></div>
        <div class="pg-nav"><button type="button" class="pg-btn ghost" id="pgPrev"></button><button type="button" class="pg-btn" id="pgNext"></button></div>`;
    document.body.appendChild(bar);
    const prevBtn = $('#pgPrev'), nextBtn = $('#pgNext');

    function render() {
        const v = V[cur];
        $('#pgTitle').textContent = tr(v.t);
        $('#pgCount').textContent = `${cur + 1} / ${V.length}`;
        $('.pg-prog i').style.width = ((cur + 1) / V.length * 100) + '%';
        prevBtn.textContent = '← ' + tr('Anterior');
        nextBtn.textContent = tr('Siguiente') + ' →';
        prevBtn.disabled = cur === 0;
        nextBtn.disabled = cur === V.length - 1;
        $$('.nav-links a[href^="#"]:not(.btn-login), .mobile-menu a[href^="#"]:not(.btn-login-mobile)')
            .forEach(a => a.classList.toggle('active', a.getAttribute('href') === v.nav));
    }

    function show(i, first) {
        i = Math.max(0, Math.min(V.length - 1, i));
        const prev = cur, v = V[i];
        cur = i;
        all.forEach(el => el.classList.toggle('pg-off', !v.els.includes(el)));
        render();
        if (!first && i !== prev) window.scrollTo({ top: 0, behavior: 'instant' });
        if (prev !== undefined && V[prev].id === 'juegos' && v.id !== 'juegos' && window.OVAGames) window.OVAGames.reset();
        try { history.replaceState(null, '', i ? '#' + v.id : location.pathname + location.search); } catch (e) {}
    }

    prevBtn.addEventListener('click', () => show(cur - 1));
    nextBtn.addEventListener('click', () => show(cur + 1));

    // Cualquier enlace interno (#...) cambia al paso que contiene su destino
    document.addEventListener('click', (e) => {
        const a = e.target.closest('a[href^="#"]');
        if (!a) return;
        const id = a.getAttribute('href').slice(1);
        if (id === 'contacto') return;
        const i = id === '' ? 0 : viewFor(id);
        if (i >= 0) show(i);
        const t = document.getElementById(id);
        if (t && t.tagName === 'DETAILS') t.open = true;
    }, true);

    // ---------- Tema ----------
    const root = document.documentElement;
    function renderTools() {
        const dark = root.dataset.theme === 'dark';
        $('#pgTheme').textContent = dark ? '☀' : '☾';
        $('#pgTheme').setAttribute('aria-label', tr(dark ? 'Modo claro' : 'Modo oscuro'));
        $('#pgLang').textContent = lang === 'es' ? 'EN' : 'ES';
        $('#pgLang').setAttribute('aria-label', lang === 'es' ? 'Switch to English' : 'Cambiar a español');
    }
    $('#pgTheme').addEventListener('click', () => {
        root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
        store.set('ova-theme', root.dataset.theme);
        renderTools();
    });
    $('#pgLang').addEventListener('click', () => {
        lang = lang === 'es' ? 'en' : 'es';
        store.set('ova-lang', lang);
        root.lang = lang;
        translatePage(); render(); renderTools();
    });

    // ---------- Inicio ----------
    if (!root.dataset.theme) root.dataset.theme = store.get('ova-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    root.lang = lang;
    const start = viewFor(location.hash.slice(1));
    show(start >= 0 ? start : 0, true);
    renderTools();
    if (lang === 'en') translatePage();
    window.OVAPager = { goTo: (id) => { const i = viewFor(id); if (i >= 0) show(i); } };
})();
