// Ejecuta las entradas una vez al aparecer, también en las páginas abiertas por fragmento.
const motionPreference = window.matchMedia('(prefers-reduced-motion: no-preference)');
if ('IntersectionObserver' in window) {
  const reveal = new IntersectionObserver(entries => {
    for (const {target, isIntersecting} of entries) {
      if (!isIntersecting || !motionPreference.matches) continue;
      target.classList.add(target.matches('.quick-cards, .module-jumps') ? 'cards-in' : 'reveal-in');
      reveal.unobserve(target);
    }
  }, {rootMargin: '0px 0px -40px 0px'});

  const animated = document.querySelectorAll(
    '.quick-cards, .module-jumps, .svc-intro, .svc-visual, .study-guide, .method-band .container, ' +
    '.overview-section > h3, .overview-card, .driver-list li, .module-block, .footer-content'
  );
  animated.forEach(target => reveal.observe(target));

  document.querySelectorAll('.quick-cards-grid, .module-jumps, #menu').forEach(group => {
    [...group.children].forEach((item, index) => item.style.setProperty('--card-index', index));
  });
  document.querySelectorAll('.overview-grid, .driver-list').forEach(group => {
    [...group.children].forEach((item, index) => {
      item.style.setProperty('--reveal-delay', Math.min(index + 1, 6) * 100 + 'ms');
    });
  });
}

const topics = [
  'Transformación empresarial',
  'Digitización y digitalización',
  'Estrategia empresarial',
  'Capacidades digitales',
  'Modelos de negocio digital'
];
const typingLine = document.querySelector('.typing-text');
const typingToggle = document.querySelector('.typing-toggle');
const typed = document.createElement('span');
const rest = document.createElement('span');
const phrase = document.createElement('span');
typed.className = 'typing-current';
rest.className = 'typing-rest';
phrase.className = 'typing-phrase';
phrase.append(typed, rest);
const topicSizes = topics.map(topic => {
  const size = document.createElement('span');
  size.className = 'typing-measure';
  size.textContent = topic;
  return size;
});

let topicIndex = 0;
let letterCount = 0;
let deleting = false;
let paused = false;
let inView = false;
let typingTimer;
let delay = 500;

function drawTopic() {
  const topic = topics[topicIndex];
  typed.textContent = topic.slice(0, letterCount);
  rest.textContent = topic.slice(letterCount);
}

function tickTopic() {
  const length = topics[topicIndex].length;
  if (!deleting && letterCount < length) {
    letterCount++;
    delay = letterCount === length ? 2000 : 80;
  } else if (letterCount > 0) {
    deleting = true;
    letterCount--;
    delay = 40;
  } else {
    topicIndex = (topicIndex + 1) % topics.length;
    deleting = false;
    delay = 500;
  }
  drawTopic();
  scheduleTopic();
}

function scheduleTopic() {
  clearTimeout(typingTimer);
  const playing = inView && !paused && !document.hidden && motionPreference.matches;
  typingLine.classList.toggle('is-typing', playing);
  if (playing) typingTimer = setTimeout(tickTopic, delay);
}

function updateTypingPreference() {
  typingToggle.hidden = !motionPreference.matches;
  if (motionPreference.matches) {
    typingLine.replaceChildren(phrase, ...topicSizes);
    drawTopic();
  } else {
    typingLine.textContent = topics[0];
  }
  scheduleTopic();
}

if ('IntersectionObserver' in window) {
  // Observa la portada para suspender el ciclo al salir de ella o cambiar de página.
  const typingObserver = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    scheduleTopic();
  });
  typingObserver.observe(typingLine);
  typingToggle.addEventListener('click', () => {
    paused = !paused;
    typingToggle.textContent = paused ? 'Reanudar animación' : 'Pausar animación';
    scheduleTopic();
  });
  document.addEventListener('visibilitychange', scheduleTopic);
  motionPreference.addEventListener('change', updateTypingPreference);
  updateTypingPreference();
}
