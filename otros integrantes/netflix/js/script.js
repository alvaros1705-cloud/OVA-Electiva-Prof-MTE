/**
 * FACTUS - API de Facturación Electrónica
 * JavaScript functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    
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
        'MACHINE LEARNING',
        'AUTOMATIZACIÓN INTELIGENTE (IPA)',
        'RPA',
        'POWER AUTOMATE',
        'N8N'
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
    {
        "title": "Aprendizaje supervisado",
        "content": "Entrena un modelo con datos etiquetados: cada ejemplo trae la respuesta correcta. Tareas típicas: clasificación y regresión."
    },
    {
        "title": "Aprendizaje no supervisado",
        "content": "Busca estructuras en datos sin etiquetas, por ejemplo agrupar clientes con comportamientos parecidos (clustering)."
    },
    {
        "title": "Aprendizaje por refuerzo",
        "content": "Un agente prueba acciones en un entorno y aprende mediante recompensas o castigos."
    },
    {
        "title": "Sobreajuste",
        "content": "El modelo memoriza el entrenamiento y generaliza mal con datos nuevos. Se detecta con un conjunto de prueba."
    },
    {
        "title": "Matriz de confusión",
        "content": "Tabla que compara predicciones y realidad: VP, FP, FN y VN. Con ella se calculan exactitud, precisión, recall y F1."
    },
    {
        "title": "IPA",
        "content": "Automatización inteligente de procesos: RPA + IA (OCR, NLP, ML, minería de procesos)."
    },
    {
        "title": "OCR",
        "content": "Reconocimiento óptico de caracteres: convierte imágenes o PDF en datos utilizables."
    },
    {
        "title": "NLP",
        "content": "Procesamiento de lenguaje natural: permite entender texto escrito, por ejemplo clasificar un correo por su intención."
    },
    {
        "title": "Minería de procesos",
        "content": "Análisis de registros de eventos para ver cómo se ejecutan realmente los procesos."
    },
    {
        "title": "RPA",
        "content": "Robots de software que imitan acciones humanas en interfaces, siguiendo reglas definidas."
    },
    {
        "title": "Orquestador",
        "content": "Programa, supervisa y registra la ejecución de los robots, y custodia credenciales."
    },
    {
        "title": "Trigger",
        "content": "Evento que inicia un flujo: un correo nuevo, un horario, un clic, una petición web."
    },
    {
        "title": "Webhook",
        "content": "URL que recibe peticiones HTTP de otra aplicación y dispara un flujo en tiempo real."
    },
    {
        "title": "Human-in-the-loop",
        "content": "Una persona revisa los casos en los que el sistema duda: la IA no reemplaza el control, lo hace más eficiente."
    }
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
    // MENÚ: RAYITA ACTIVA SEGÚN LA SECCIÓN
    // ========================================
    const navAnchors = Array.from(document.querySelectorAll('.nav-links a[href^="#"], .mobile-menu a[href^="#"]'));
    const navTargets = ['#como-funciona', '#modulos', '#glosario', '#juegos', '#recursos', '#contacto'];
    let navLockUntil = 0;

    function setActiveNav(href) {
        navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === href));
    }

    function updateActiveNav() {
        return; // el resaltado por pasos lo maneja pager.js
        if (Date.now() < navLockUntil) return;
        const y = window.scrollY + 140;
        let current = '#';
        navTargets.forEach(id => {
            const el = document.querySelector(id);
            if (el && el.getBoundingClientRect().top + window.scrollY <= y) current = id;
        });
        const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
        if (atBottom) current = '#contacto';
        setActiveNav(current);
    }

    navAnchors.forEach(anchor => {
        anchor.addEventListener('click', function() {
            const href = this.getAttribute('href');
            setActiveNav(href);
            navLockUntil = Date.now() + 900;
            if (href === '#') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            setTimeout(updateActiveNav, 950);
        });
    });

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    window.addEventListener('resize', updateActiveNav);
    updateActiveNav();

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
    
    // Abre el módulo (details) al navegar a su ancla
    document.querySelectorAll('a[href^="#modulo-"], a[href="#caso"]').forEach(a => {
        a.addEventListener('click', () => {
            const d = document.querySelector(a.getAttribute('href'));
            if (d && d.tagName === 'DETAILS') d.open = true;
        });
    });

    console.log('OVA ML y Automatización Inteligente cargada');
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

        // Footer elements
        document.querySelectorAll('.footer-logo, .footer-social, .footer-copyright').forEach((el, i) => {
            el.classList.add('reveal', `reveal-delay-${i + 1}`);
        });
        document.querySelectorAll('.footer-logs').forEach(el => {
            el.classList.add('reveal', 'reveal-left');
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
