/**
 * OVA Grupo G4 - Electiva Profesional I
 * JavaScript functionality
 */

const OVA_ICON_PATHS = {
 search:'<circle cx="11" cy="11" r="7"/><path d="m16 16 4 4"/>', edit:'<path d="m15 5 4 4M4 20l4-.8L19 8a2.1 2.1 0 0 0-3-3L5 16z"/>', play:'<circle cx="12" cy="12" r="9"/><path d="m10 8 6 4-6 4z"/>', chart:'<path d="M4 19V5M4 19h17M8 15l4-4 3 2 5-6M17 7h3v3"/>',
 gear:'<path d="M9.3 2.5h5.4l.8 3.1c.6.2 1.2.5 1.7 1l3-.9 2.7 4.7-2.4 2.4v2.4l2.4 2.4-2.7 4.7-3-.9c-.5.5-1.1.8-1.7 1l-.8 3.1H9.3l-.8-3.1c-.6-.2-1.2-.5-1.7-1l-3 .9-2.7-4.7 2.4-2.4v-2.4l-2.4-2.4 2.7-4.7 3 .9c.5-.5 1.1-.8 1.7-1z"/><circle cx="12" cy="12" r="3.2"/>', event:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2"/>', activity:'<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M7 12h3l2-4 2 8 2-4h2"/>', gate:'<path d="m12 3 9 9-9 9-9-9zM9 12h6"/>', flow:'<path d="M4 12h15M13 6l6 6-6 6"/>',
 users:'<circle cx="9" cy="8" r="3"/><path d="M3 20v-1a6 6 0 0 1 12 0v1zM16 5a3 3 0 0 1 0 6m2 3a5 5 0 0 1 3 5v1h-3"/>', attachment:'<path d="m8 12.5 6.8-6.8a3 3 0 0 1 4.2 4.2l-8.5 8.5a5 5 0 0 1-7.1-7.1l8.1-8.1"/>', brain:'<path d="M12 4a3 3 0 0 0-5.7 1.3A3.5 3.5 0 0 0 4 11a3.5 3.5 0 0 0 2.3 5.7A3 3 0 0 0 12 18zM12 4a3 3 0 0 1 5.7 1.3A3.5 3.5 0 0 1 20 11a3.5 3.5 0 0 1-2.3 5.7A3 3 0 0 1 12 18zM8 9h4m-4 5h4m4-5h-4m4 5h-4"/>', cloud:'<path d="M7 18h10a4 4 0 0 0 .5-8 6 6 0 0 0-11.5-1A4.5 4.5 0 0 0 7 18z"/>',
 database:'<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>', network:'<circle cx="12" cy="5" r="2"/><circle cx="5" cy="18" r="2"/><circle cx="19" cy="18" r="2"/><path d="M12 7v4m-1.5 1L6 16m7.5-4L18 16M9 11a4 4 0 0 1 6 0"/>', bottleneck:'<path d="M6 4h12M6 20h12M7 4c0 4 5 5 5 8s-5 4-5 8m10-16c0 4-5 5-5 8s5 4 5 8"/>', repeat:'<path d="m17 2 4 4-4 4M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4m14-1v2a3 3 0 0 1-3 3H3"/>',
 feedback:'<path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 9 9 0 0 1-4-.9L4 20l1.3-3.3A7 7 0 0 1 4 12c0-4.1 3.6-7.5 8-7.5s8 3.1 8 7zM8 11h.01M12 11h.01M16 11h.01"/>', warning:'<path d="M12 3 22 20H2zM12 9v5m0 3h.01"/>', rocket:'<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3 7-7a8.5 8.5 0 0 1 5-2c0 2-.5 3.5-2 5z"/><path d="m9 12-6-3 2-2 7 1"/><path d="m12 15 3 6 2-2-1-7"/>', note:'<path d="M6 3h9l4 4v14H6zM14 3v5h5M9 12h7m-7 4h7"/>', tools:'<path d="M14 7a5 5 0 0 0-6.5 6.5L3 18l3 3 4.5-4.5A5 5 0 0 0 17 10l-3 3-3-3zM15 15l6 6"/>', check:'<circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16 9"/>', compass:'<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>', soundOn:'<path d="M4 10v4h3l4 3V7l-4 3zM15 9a4 4 0 0 1 0 6m2-8a7 7 0 0 1 0 10"/>', soundOff:'<path d="M4 10v4h3l4 3V7l-4 3zM16 9l5 6m0-6-5 6"/>'
};
function ovaIcon(name, extraClass = '') { return `<svg class="ova-icon ${extraClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${OVA_ICON_PATHS[name] || OVA_ICON_PATHS.activity}</svg>`; }
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('[data-ova-icon]').forEach(el => { el.innerHTML = ovaIcon(el.dataset.ovaIcon); });
    
    // ========================================
    // MOBILE MENU TOGGLE
    // ========================================
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            
            // Change icon
            const isOpen = mobileMenu.classList.contains('active');
            menuToggle.innerHTML = isOpen 
                ? '<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>'
                : '<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>';
        });
        
        // Close menu when clicking on a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                menuToggle.innerHTML = '<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>';
            });
        });
    }
    
    // ========================================
    // TYPING EFFECT
    // ========================================
    const words = [
        'MADUREZ DIGITAL',
        'PROCESOS EMPRESARIALES',
        'BPM Y BPMN',
        'OPORTUNIDADES DE CAMBIO',
        'TECNOLOGÍAS HABILITADORAS'
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingElement = document.getElementById('typingText');
    
    // El texto completo se reserva siempre en pantalla (parte escrita visible + resto invisible),
    // así las líneas no cambian de lugar mientras se escribe.
    let typedSpan = null;
    let restSpan = null;
    if (typingElement) {
        typingElement.textContent = '';
        typedSpan = document.createElement('span');
        typedSpan.className = 'tt-typed';
        restSpan = document.createElement('span');
        restSpan.className = 'tt-rest';
        typingElement.appendChild(typedSpan);
        typingElement.appendChild(restSpan);
    }

    function setTyping(word, count) {
        typedSpan.textContent = word.substring(0, count);
        restSpan.textContent = word.substring(count);
    }

    function typeEffect() {
        const currentWord = words[wordIndex];
        const typeSpeed = isDeleting ? 40 : 80;
        
        if (!isDeleting && charIndex < currentWord.length) {
            charIndex++;
            setTyping(currentWord, charIndex);
            setTimeout(typeEffect, typeSpeed);
        } else if (isDeleting && charIndex > 0) {
            charIndex--;
            setTyping(currentWord, charIndex);
            setTimeout(typeEffect, typeSpeed);
        } else if (!isDeleting && charIndex === currentWord.length) {
            setTimeout(() => {
                isDeleting = true;
                typeEffect();
            }, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTyping(words[wordIndex], 0);
            setTimeout(typeEffect, 500);
        }
    }
    
    // Reserva el alto máximo del título para que la página no se mueva mientras se escribe
    function reserveHeroHeight() {
        if (!typingElement) return;
        const h1 = typingElement.closest('h1');
        if (!h1) return;
        h1.style.minHeight = '';
        let max = 0;
        words.forEach(w => {
            setTyping(w, 0);
            max = Math.max(max, h1.offsetHeight);
        });
        setTyping(words[wordIndex], charIndex);
        h1.style.minHeight = max + 'px';
    }

    if (typingElement) {
        setTyping(words[0], 0);
        reserveHeroHeight();
        window.addEventListener('resize', reserveHeroHeight);
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(reserveHeroHeight);
        }
        typeEffect();
    }
    
    // ========================================
    // CODE TABS
    // ========================================
    const tabButtons = document.querySelectorAll('.tab-btn');
    const codePanels = document.querySelectorAll('.code-panel');
    const tabLabel = document.querySelector('.tab-label');
    
    tabButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const tab = this.dataset.tab;
            
            // Update buttons
            tabButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update panels
            codePanels.forEach(p => p.classList.remove('active'));
            document.getElementById('code' + tab.charAt(0).toUpperCase() + tab.slice(1)).classList.add('active');
            
            // Update label
            if (tabLabel) {
                tabLabel.textContent = tab.toUpperCase();
            }
        });
    });
    
    // ========================================
    // COPY CODE BUTTON
    // ========================================
    const copyBtn = document.getElementById('copyBtn');
    
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            const activePanel = document.querySelector('.code-panel.active');
            if (activePanel) {
                navigator.clipboard.writeText(activePanel.textContent).then(() => {
                    // Show check icon temporarily
                    const originalHTML = this.innerHTML;
                    this.innerHTML = '<svg width="16" height="16" fill="none" stroke="#4ade80" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>';
                    setTimeout(() => {
                        this.innerHTML = originalHTML;
                    }, 2000);
                });
            }
        });
    }
    
    // ========================================
    // FAQ ACCORDION
    // ========================================
    const faqButtons = document.querySelectorAll('.faq-btn');
    const answerContent = document.getElementById('answerContent');
    
    const faqAnswers = [
        { title: '¿Para qué sirve un diagnóstico de madurez digital?', content: 'Sirve para conocer el punto de partida de una organización, detectar brechas y priorizar inversiones.\n\nSin un diagnóstico es fácil comprar tecnología que no resuelve el problema real. Además, deja una línea base para medir los avances en el tiempo.' },
        { title: '¿Qué diferencia hay entre proceso y procedimiento?', content: 'El proceso es el conjunto de actividades relacionadas que convierte entradas en un resultado para un cliente.\n\nEl procedimiento es la forma documentada de llevar a cabo una actividad o un proceso: describe cómo se hace paso a paso.' },
        { title: '¿BPMN es solo para el área de sistemas?', content: 'No. BPMN se creó para que el área de negocio y el área de TI compartan un mismo lenguaje.\n\nLos diagramas pueden ser entendidos por quienes operan el proceso y también por quienes lo implementan en un sistema.' },
        { title: '¿Se puede automatizar un proceso sin modelarlo antes?', content: 'Se puede, pero no es recomendable. Automatizar un proceso mal diseñado solo hace que sus fallas ocurran más rápido.\n\nLo ideal es modelarlo, mejorarlo y después automatizarlo.' },
        { title: '¿Toda empresa necesita IA, IoT y Big Data?', content: 'No. La tecnología se elige según el problema, los datos disponibles y los recursos de la organización.\n\nUna empresa pequeña puede lograr mucho con servicios en la nube y automatización básica de tareas.' },
        { title: '¿Por dónde empezar una transformación?', content: 'Un camino frecuente es:\n\n1. Diagnosticar la madurez digital.\n2. Modelar los procesos clave.\n3. Identificar oportunidades con la matriz impacto/esfuerzo.\n4. Probar con un piloto pequeño y medir resultados.' }
    ];
    
    function showAnswer(index) {
        const answer = faqAnswers[index];
        if (answerContent && answer) {
            answerContent.innerHTML = `<h4 style="color: #fff; font-size: 1.125rem; font-weight: 700; margin-bottom: 1rem;">${answer.title}</h4><div style="white-space: pre-line;">${answer.content}</div>`;
        }
    }
    
    // Show first answer by default
    showAnswer(0);
    
    faqButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            
            // Update active state
            faqButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Show answer
            showAnswer(index);
        });
    });
    
    // ========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            if (targetId === '#inicio') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ========================================
    // MENÚ MULTIPÁGINA: resaltar la vista actual.
    // ========================================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
        const destination = a.getAttribute('href').split('#')[0];
        const active = destination === currentPage;
        a.classList.toggle('active', active);
        if (active) a.setAttribute('aria-current', 'page');
        else a.removeAttribute('aria-current');
    });

    // ========================================
    // ========================================
    // BOTÓN FLOTANTE DE DOCUMENTACIÓN
    // Oculto al cargar; aparece cuando se empieza a bajar
    // ========================================
    const docFloat = document.getElementById('docFloat');
    const DOC_FLOAT_SHOW_AFTER = 80; // px de scroll antes de mostrarlo

    function updateDocFloat() {
        if (!docFloat) return;
        const show = window.pageYOffset > DOC_FLOAT_SHOW_AFTER;
        docFloat.classList.toggle('visible', show);
        docFloat.setAttribute('aria-hidden', show ? 'false' : 'true');
        docFloat.tabIndex = show ? 0 : -1;
    }

    window.addEventListener('scroll', updateDocFloat, { passive: true });
    updateDocFloat();

    // ========================================
    // NAVBAR SCROLL EFFECT
    // ========================================
    let lastScroll = 0;
    const mainNav = document.getElementById('mainNav');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        mainNav.classList.toggle('scrolled', currentScroll > 10);
        
        lastScroll = currentScroll;
    });
    
    // ========================================
    // TESTIMONIALS HORIZONTAL SCROLL
    // ========================================
    const testimonialsCarousel = document.getElementById('testimonialsCarousel');
    
    if (testimonialsCarousel) {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        testimonialsCarousel.addEventListener('mousedown', (e) => {
            isDown = true;
            testimonialsCarousel.style.cursor = 'grabbing';
            startX = e.pageX - testimonialsCarousel.offsetLeft;
            scrollLeft = testimonialsCarousel.scrollLeft;
        });
        
        testimonialsCarousel.addEventListener('mouseleave', () => {
            isDown = false;
            testimonialsCarousel.style.cursor = 'grab';
        });
        
        testimonialsCarousel.addEventListener('mouseup', () => {
            isDown = false;
            testimonialsCarousel.style.cursor = 'grab';
        });
        
        testimonialsCarousel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - testimonialsCarousel.offsetLeft;
            const walk = (x - startX) * 2;
            testimonialsCarousel.scrollLeft = scrollLeft - walk;
        });
        
        testimonialsCarousel.style.cursor = 'grab';
    }
    
    
    // ========================================
    // OVA G4: PESTAÑAS, AUTODIAGNÓSTICO Y RETO
    // ========================================
    const $ = q => document.querySelector(q), $$ = q => [...document.querySelectorAll(q)];
    function tabs(boxId, panelId, items, render, fn) {
        const box = $(boxId), pan = $(panelId);
        if (!box || !pan) return;
        box.innerHTML = items.map(it => `<button type="button">${it.icon ? ovaIcon(it.icon, 'tab-icon') : ''}<span>${it.t}</span></button>`).join('');
        const sel = i => {
            [...box.children].forEach((b, j) => b.classList.toggle('on', i === j));
            pan.style.animation = 'none'; pan.offsetWidth; pan.style.animation = '';
            pan.innerHTML = render(items[i], i);
            if (fn) fn(i);
        };
        [...box.children].forEach((b, i) => b.onclick = () => sel(i));
        sel(0);
    }
    tabs('#lvTabs', '#lvPanel', [
        { t: '1 · Inicial', d: 'Herramientas aisladas, procesos manuales y decisiones tomadas por intuición.', s: 'Registrar cómo se trabaja hoy y qué datos existen.' },
        { t: '2 · Emergente', d: 'Hay iniciativas digitales por área, pero sin coordinación y con datos dispersos.', s: 'Definir una visión digital común.' },
        { t: '3 · Definido', d: 'Existe una estrategia digital formal y los procesos clave están documentados.', s: 'Integrar sistemas y definir indicadores.' },
        { t: '4 · Gestionado', d: 'Los procesos se miden y automatizan; las decisiones se apoyan en datos.', s: 'Escalar lo que funciona y fortalecer el talento digital.' },
        { t: '5 · Optimizado', d: 'Mejora continua, innovación constante y cultura digital consolidada.', s: 'Explorar nuevos servicios y modelos de negocio.' }],
        (it, i) => `<h4>Nivel ${i + 1}: ${it.t.slice(4)}</h4><p>${it.d}</p><p style="margin-top:10px"><b>Siguiente paso →</b> ${it.s}</p>`,
        i => { $('#meterFill').style.width = (i + 1) * 20 + '%'; });
    tabs('#bpmTabs', '#bpmPanel', [
        { t: 'Identificar', icon: 'search', d: 'Se reconocen los procesos clave y quién los realiza.' },
        { t: 'Modelar', icon: 'edit', d: 'Se dibuja el proceso actual y el deseado con BPMN.' },
        { t: 'Ejecutar', icon: 'play', d: 'El proceso se pone en marcha, con apoyo de software o automatización.' },
        { t: 'Monitorear', icon: 'chart', d: 'Se miden tiempos, costos y calidad con indicadores.' },
        { t: 'Optimizar', icon: 'gear', d: 'Se corrigen cuellos de botella y el ciclo vuelve a empezar.' }],
        (it, i) => `<h4>Fase ${i + 1}: ${it.t}</h4><p>${it.d}</p>`);
    tabs('#elTabs', '#elPanel', [
        { t: 'Eventos', icon: 'event', d: 'Algo que ocurre durante el proceso. Inicio (círculo delgado), intermedio (círculo doble) y fin (círculo grueso).', e: '“Llega un pedido”, “Se vence un plazo”.' },
        { t: 'Actividades', icon: 'activity', d: 'Trabajo que se realiza: una tarea (una acción) o un subproceso (agrupa varias tareas).', e: '“Validar pago”, “Preparar pedido”.' },
        { t: 'Compuertas', icon: 'gate', d: 'Controlan cómo se divide o se une el flujo: exclusiva (un solo camino), paralela (todos a la vez) e inclusiva (uno o varios).', e: '“¿Hay stock?”.' },
        { t: 'Flujos', icon: 'flow', d: 'La flecha continua indica la secuencia de actividades; la línea discontinua representa mensajes entre participantes.', e: 'Del pedido recibido a la validación.' },
        { t: 'Participantes', icon: 'users', d: 'Los pools representan organizaciones o participantes; los carriles (lanes) los dividen por roles o áreas.', e: 'Carriles: Ventas, Bodega, Finanzas.' },
        { t: 'Artefactos', icon: 'attachment', d: 'Objetos de datos, anotaciones y grupos que añaden información sin cambiar el flujo.', e: 'Una nota: “Pedidos de más de $1 000 000 requieren aprobación”.' }],
        it => `<h4>${it.t}</h4><p>${it.d}</p><p style="margin-top:8px"><b>Ejemplo:</b> ${it.e}</p>`);
    tabs('#techTabs', '#techPanel', [
        { t: 'IA', icon: 'brain', n: 'Inteligencia Artificial', d: 'Sistemas que aprenden de los datos para predecir, clasificar o generar contenido.', e: 'Asistentes virtuales de atención, detección de fraude, pronóstico de demanda.', b: 'Decisiones más rápidas y servicios personalizados.', r: 'Calidad de los datos, sesgos y uso ético.' },
        { t: 'Cloud', icon: 'cloud', n: 'Computación en la nube', d: 'Servicios de cómputo, almacenamiento y software ofrecidos por internet según la demanda.', e: 'ERP en la nube, copias de seguridad remotas, trabajo colaborativo.', b: 'Escalabilidad, acceso remoto y menor inversión inicial.', r: 'Seguridad, costos variables y dependencia del proveedor.' },
        { t: 'Big Data', icon: 'database', n: 'Big Data', d: 'Análisis de grandes volúmenes de datos, de variadas fuentes y generados con rapidez (volumen, velocidad y variedad).', e: 'Estudiar hábitos de compra para planear inventarios o campañas.', b: 'Decisiones basadas en evidencia.', r: 'Privacidad, calidad de la información y talento analítico.' },
        { t: 'IoT', icon: 'network', n: 'Internet de las Cosas', d: 'Objetos con sensores conectados a internet que envían datos de forma continua.', e: 'Sensores de temperatura en la cadena de frío, medidores inteligentes, seguimiento de flotas.', b: 'Monitoreo en tiempo real y mantenimiento anticipado.', r: 'Seguridad de los dispositivos y conectividad estable.' },
        { t: 'Automatización', icon: 'gear', n: 'Automatización', d: 'Software que ejecuta tareas repetitivas siguiendo reglas definidas, como RPA y flujos de trabajo.', e: 'Conciliación de facturas, aprobaciones automáticas, envío de notificaciones.', b: 'Menos errores y más tiempo para tareas de valor.', r: 'Rediseñar el proceso antes de automatizarlo.' }],
        it => `${ovaIcon(it.icon, 'o-tech-feature-icon')}<h4>${it.n}</h4><p>${it.d}</p><ul><li><b>Ejemplos:</b> ${it.e}</li><li><b>Aporta:</b> ${it.b}</li><li><b>Reto:</b> ${it.r}</li></ul>`);
    $$('.flip').forEach(f => f.onclick = () => f.classList.toggle('open'));
    // Autodiagnóstico
    const ST = ['Tenemos una visión digital definida y respaldada por la dirección.', 'Los procesos clave están documentados y se miden.', 'El personal recibe formación y se abre a nuevas herramientas.', 'Los sistemas están integrados y protegidos.', 'Las decisiones se apoyan en datos confiables.', 'Los clientes pueden atender sus trámites por canales digitales.'],
        NV = ['Inicial', 'Emergente', 'Definido', 'Gestionado', 'Optimizado'],
        AD = ['Empieza registrando cómo se trabaja hoy y qué datos existen.', 'Define una visión digital común y elige un proceso piloto.', 'Integra sistemas y define indicadores para medir.', 'Escala lo que funciona y fortalece el talento digital.', 'Explora nuevos servicios y modelos de negocio.'];
    const stBox = $('#selfTest');
    if (stBox) {
        stBox.innerHTML = ST.map((t, i) => `<label class="o-chk"><input type="checkbox"> ${t}</label>`).join('') + '<div id="stRes"></div>';
        const calc = () => {
            const n = $$('#selfTest input:checked').length, l = n <= 1 ? 0 : n === 2 ? 1 : n === 3 ? 2 : n < 6 ? 3 : 4;
            $('#stRes').innerHTML = `<p class="o-score">Nivel ${l + 1}: ${NV[l]}</p><p><b>Siguiente paso →</b> ${AD[l]}</p>`;
        };
        stBox.onchange = calc; calc();
    }

    
    console.log('OVA G4 cargado correctamente');
});

    // ========================================
    // SCROLL REVEAL ANIMATIONS
    // ========================================
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    // Seleccionar todos los elementos a revelar
    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // ========================================
    // AÑADIR CLASES REVEAL A ELEMENTOS
    // ========================================
    function addRevealClasses() {
        // Section headers
        document.querySelectorAll('.section-header').forEach((el, i) => {
            el.classList.add('reveal');
        });

        // Service cards con delay escalonado
        document.querySelectorAll('.service-card').forEach((el, i) => {
            el.classList.add('reveal', `reveal-delay-${Math.min(i + 1, 6)}`);
        });

        // Benefit items con delay y dirección alternada
        document.querySelectorAll('.benefit-item').forEach((el, i) => {
            el.classList.add('reveal', i % 2 === 0 ? 'reveal-left' : 'reveal-right', `reveal-delay-${Math.min(i + 1, 4)}`);
        });

        // Stats / numbers
        document.querySelectorAll('.stat-item, .counter-item').forEach((el, i) => {
            el.classList.add('reveal', 'reveal-scale', `reveal-delay-${Math.min(i + 1, 4)}`);
        });

        // Code blocks
        document.querySelectorAll('.code-grid, .headers-table, .code-block').forEach(el => {
            el.classList.add('reveal');
        });

        // Steps
        document.querySelectorAll('.step-item, .step-card, .how-step, .hiw-card').forEach((el, i) => {
            el.classList.add('reveal', `reveal-delay-${Math.min(i + 1, 6)}`);
        });

        // Testimonial cards
        document.querySelectorAll('.testimonial-card').forEach((el, i) => {
            el.classList.add('reveal', `reveal-delay-${Math.min(i + 1, 4)}`);
        });

        // Tarjetas de integración
        document.querySelectorAll('.int-card').forEach((el, i) => {
            el.classList.add('reveal', 'reveal-scale', `reveal-delay-${Math.min(i + 1, 6)}`);
        });

        // FAQ elements
        document.querySelectorAll('.faq-btn').forEach((el, i) => {
            el.classList.add('reveal', `reveal-delay-${Math.min(i + 1, 6)}`);
        });
        document.querySelectorAll('.faq-answer').forEach(el => {
            el.classList.add('reveal', 'reveal-right');
        });

        // CTA / WhatsApp blocks
        document.querySelectorAll('.whatsapp-cta').forEach(el => {
            el.classList.add('reveal');
        });

        // Re-observar los nuevos elementos
        document.querySelectorAll('.reveal').forEach(el => {
            revealObserver.observe(el);
        });
    }

    addRevealClasses();

    console.log('✨ Animaciones scroll-reveal activadas!');

// ========================================
// ANIMACIÓN DE ENTRADA — TARJETAS DE ACCESO RÁPIDO
// ========================================
(function () {
    const section = document.querySelector('.quick-cards');
    if (!section) return;

    section.querySelectorAll('.quick-card').forEach((card, i) => card.style.setProperty('--i', i));
    section.classList.add('qc-js');

    const play = () => {
        if (section.classList.contains('qc-in')) return;
        section.classList.add('qc-in');
        // Cuando termina la entrada, se fija el estado final para que no se repita
        const lastIcon = section.querySelector('.quick-card:last-child .quick-card-icon');
        const finish = () => section.classList.add('qc-done');
        if (lastIcon) lastIcon.addEventListener('animationend', finish, { once: true });
        setTimeout(finish, 3500);
    };

    if (!('IntersectionObserver' in window)) { play(); return; }

    const io = new IntersectionObserver((entries) => {
        if (entries.some(e => e.isIntersecting)) { play(); io.disconnect(); }
    }, { threshold: 0.2 });
    io.observe(section);

    // Respaldo: si por algún motivo no se dispara, se muestran igual
    setTimeout(play, 4000);
})();


// Pestañas accesibles del glosario
(function () {
    const tabs = [...document.querySelectorAll('.glossary-tab')];
    const panels = [...document.querySelectorAll('.glossary-panel')];
    if (!tabs.length || !panels.length) return;
    const activate = (index, focus = false) => {
        tabs.forEach((tab, i) => {
            const active = i === index;
            tab.classList.toggle('is-active', active);
            tab.setAttribute('aria-selected', String(active));
            tab.tabIndex = active ? 0 : -1;
            panels[i].hidden = !active;
        });
        if (focus) tabs[index].focus();
    };
    tabs.forEach((tab, index) => tab.addEventListener('click', () => activate(index)));
    tabs.forEach((tab, index) => tab.addEventListener('keydown', event => {
        let next = index;
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % tabs.length;
        else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + tabs.length) % tabs.length;
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = tabs.length - 1;
        else return;
        event.preventDefault();
        activate(next, true);
    }));
})();
// Juego breve: misión Rescata el proceso
(function () {
    const $ = id => document.getElementById(id);
    const start = $('missionStart');
    if (!start) return;
    const screens = ['missionStart', 'missionClues', 'missionProcess', 'missionActions', 'missionResult'].map($);
    const progress = $('missionProgressFill');
    const avatar = $('missionAvatar');
    const soundButton = $('missionSound');
    let soundEnabled = true;
    let audioContext = null;
    const playTone = (frequency = 620, duration = .08, type = 'sine') => {
        if (!soundEnabled) return;
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;
        try {
            if (!audioContext) audioContext = new AudioContextClass();
            if (audioContext.state === 'suspended') audioContext.resume();
            const oscillator = audioContext.createOscillator();
            const gain = audioContext.createGain();
            oscillator.type = type;
            oscillator.frequency.value = frequency;
            gain.gain.setValueAtTime(.0001, audioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(.07, audioContext.currentTime + .012);
            gain.gain.exponentialRampToValueAtTime(.0001, audioContext.currentTime + duration);
            oscillator.connect(gain);
            gain.connect(audioContext.destination);
            oscillator.start();
            oscillator.stop(audioContext.currentTime + duration + .015);
        } catch (_) { /* El juego continúa sin sonido si el navegador no lo permite. */ }
    };
    soundButton.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        soundButton.setAttribute('aria-pressed', String(soundEnabled));
        soundButton.setAttribute('aria-label', soundEnabled ? 'Silenciar efectos de sonido' : 'Activar efectos de sonido');
        soundButton.querySelector('#missionSoundIcon').innerHTML = ovaIcon(soundEnabled ? 'soundOn' : 'soundOff');
soundButton.querySelector('.sound-label').textContent = soundEnabled ? 'Sonido activado' : 'Sonido apagado';
        if (soundEnabled) playTone(620);
    });
    let walkTimer = null;
    let walkFrame = 0;
    const moveAvatar = index => {
        avatar.style.left = ['10%', '30%', '50%', '70%', '90%'][index];
        avatar.classList.remove('is-cheering');
        if (walkTimer) clearInterval(walkTimer);
        const frames = ['images/game/player-walk1.png', 'images/game/player-walk2.png'];
        walkFrame = 0;
        avatar.src = frames[walkFrame];
        walkTimer = setInterval(() => {
            walkFrame = (walkFrame + 1) % frames.length;
            avatar.src = frames[walkFrame];
        }, 150);
        setTimeout(() => {
            if (walkTimer) clearInterval(walkTimer);
            walkTimer = null;
            avatar.src = 'images/game/player-idle.png';
        }, 520);
        playTone(440 + index * 45, .07, 'triangle');
    };
    const showScreen = index => {
        screens.forEach((screen, i) => { screen.hidden = i !== index; });
        progress.style.width = ['0%', '20%', '45%', '70%', '100%'][index];
        screens[index].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    };
    $('missionBegin').addEventListener('click', () => showScreen(1));
    const clues = [...document.querySelectorAll('.mission-clue')];
    const updateClues = () => {
        const count = clues.filter(clue => clue.classList.contains('is-open')).length;
        $('clueHint').textContent = `Pistas revisadas: ${count} de ${clues.length}`;
        $('toProcess').disabled = count !== clues.length;
    };
    clues.forEach(clue => clue.addEventListener('click', () => {
        const open = clue.classList.toggle('is-open');
        clue.setAttribute('aria-expanded', String(open));
        clue.querySelector('.mission-clue-action').innerHTML = open ? 'Pista revisada <b>✓</b>' : 'Abrir pista <b>+</b>';
        if (open) playTone(680, .07);
        updateClues();
    }));
    $('toProcess').addEventListener('click', () => showScreen(2));
    const flowButtons = [...document.querySelectorAll('.mission-flow button')];
    flowButtons.forEach((button, index) => button.addEventListener('click', () => {
        flowButtons.forEach(item => item.classList.remove('is-wrong', 'is-correct'));
        moveAvatar(index);
        const feedback = $('processFeedback');
        if (button.dataset.step === 'aprobacion') {
            button.classList.add('is-correct');
            if (walkTimer) clearInterval(walkTimer);
            walkTimer = null;
            setTimeout(() => {
                avatar.src = 'images/game/player-cheer.png';
                avatar.classList.add('is-cheering');
            }, 430);
            playTone(760, .12);
            setTimeout(() => playTone(960, .16), 110);
            feedback.textContent = '¡Encontraste el cuello de botella! Las aprobaciones manuales se acumulan por correo y retrasan el envío. BPM te ayuda a representar y mejorar este flujo antes de automatizarlo.';
            $('toActions').disabled = false;
        } else {
            button.classList.add('is-wrong');
            playTone(260, .09, 'triangle');
            feedback.textContent = button.dataset.step === 'inventario'
                ? 'El inventario puede causar incidencias, pero las pistas indican que la demora principal ocurre en otra etapa.'
                : 'Esta etapa es parte del recorrido, pero busca el punto que se acumula al final del día y se gestiona por correo.';
        }
    }));
    $('toActions').addEventListener('click', () => showScreen(3));
    const actions = [...document.querySelectorAll('.mission-action')];
    const chosen = () => actions.filter(action => action.getAttribute('aria-pressed') === 'true').map(action => action.dataset.action);
    actions.forEach(action => action.addEventListener('click', () => {
        const selection = chosen();
        if (action.getAttribute('aria-pressed') !== 'true' && selection.length >= 2) return;
        const selected = action.getAttribute('aria-pressed') !== 'true';
        action.setAttribute('aria-pressed', String(selected));
        action.classList.toggle('is-selected', selected);
        if (selected) playTone(600, .06);
        const count = chosen().length;
        $('actionHint').textContent = `Acciones seleccionadas: ${count} de 2`;
        $('showResult').disabled = count !== 2;
    }));
    const outcomes = {
        formulario: { late: 5, errors: 9, satisfaction: 12, cost: 1 },
        documentar: { late: 8, errors: 4, satisfaction: 5, cost: 1 },
        automatizar: { late: 20, errors: 3, satisfaction: 13, cost: 2 },
        integrar: { late: 12, errors: 10, satisfaction: 10, cost: 3 }
    };
    $('showResult').addEventListener('click', () => {
        const picked = chosen();
        const totals = picked.reduce((sum, key) => {
            Object.keys(sum).forEach(metric => sum[metric] += outcomes[key][metric]);
            return sum;
        }, { late: 0, errors: 0, satisfaction: 0, cost: 0 });
        if (picked.includes('formulario') && picked.includes('automatizar')) { totals.errors += 3; totals.satisfaction += 4; }
        const values = { late: Math.max(5, 38 - totals.late), errors: Math.max(3, 22 - totals.errors), satisfaction: Math.min(98, 58 + totals.satisfaction) };
        const metrics = [
            { label: 'Pedidos atrasados', before: 38, value: values.late, suffix: '%' },
            { label: 'Errores en pedidos', before: 22, value: values.errors, suffix: '%' },
            { label: 'Satisfacción', before: 58, value: values.satisfaction, suffix: '%' }
        ];
        $('missionResults').innerHTML = metrics.map(metric => {
            const movement = metric.value < metric.before ? '↓' : metric.value > metric.before ? '↑' : '→';
            return `<div class="mission-result-card"><div><span>${metric.label}</span><strong>${movement} ${metric.value}${metric.suffix}</strong></div><div class="mission-meter"><span style="width:${metric.value}%"></span></div><small>Antes: ${metric.before}${metric.suffix}</small></div>`;
        }).join('');
        const pickedLabels = picked.map(key => actions.find(action => action.dataset.action === key).querySelector('strong').textContent);
        const hasAutomation = picked.includes('automatizar');
        const lesson = hasAutomation && !picked.includes('formulario')
            ? 'La automatización reduce esperas, pero conviene asegurar primero que los datos y las reglas del proceso sean claros.'
            : picked.includes('documentar') && hasAutomation
                ? 'Combinaste el rediseño del proceso con la automatización: definir el flujo y responsables ayuda a que la tecnología resuelva el problema correcto.'
                : 'El piloto mejora la información y el flujo de trabajo. Mide los indicadores antes y después para decidir qué conviene escalar.';
        $('missionOutcome').innerHTML = `<strong>Acciones del piloto:</strong> ${pickedLabels.join(' + ')}.<br><strong>Esfuerzo:</strong> ${totals.cost} de 5. ${lesson}`;
        $('missionBadge').textContent = hasAutomation && picked.includes('documentar') ? 'Diseñador de procesos · insignia obtenida' : picked.includes('integrar') ? 'Integrador digital · insignia obtenida' : 'Analista de procesos · insignia obtenida';
        playTone(720, .12);
        setTimeout(() => playTone(900, .16), 120);
        showScreen(4);
    });
    $('missionRestart').addEventListener('click', () => {
        clues.forEach(clue => {
            clue.classList.remove('is-open');
            clue.setAttribute('aria-expanded', 'false');
            clue.querySelector('.mission-clue-action').innerHTML = 'Abrir pista <b>+</b>';
        });
        updateClues();
        flowButtons.forEach(button => button.classList.remove('is-wrong', 'is-correct'));
        avatar.src = 'images/game/player-idle.png';
        avatar.classList.remove('is-cheering');
        avatar.style.left = '10%';
        $('processFeedback').textContent = 'Selecciona una etapa para ver qué sucede allí.';
        $('toActions').disabled = true;
        actions.forEach(action => { action.classList.remove('is-selected'); action.setAttribute('aria-pressed', 'false'); });
        $('actionHint').textContent = 'Acciones seleccionadas: 0 de 2';
        $('showResult').disabled = true;
        showScreen(0);
    });
})();
/* Inyecta el acceso común al portal principal de la OVA */
(function () {
  function loadPortalHome() {
    if (document.querySelector("script[data-ova-home-loader]")) return;
    var script = document.createElement("script");
    script.src = "https://alvaros1705-cloud.github.io/OVA-Electiva-Prof-MTE/js/ova-home-return.js?v=1";
    script.setAttribute("data-ova-home-loader", "");
    document.head.appendChild(script);
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadPortalHome, { once: true });
  } else {
    loadPortalHome();
  }
})();
