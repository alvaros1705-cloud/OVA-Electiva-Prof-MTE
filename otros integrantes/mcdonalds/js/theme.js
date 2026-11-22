(() => {
  const root = document.documentElement;
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  const storageKey = 'ova-tema-de-lectura';
  let savedTheme;
  try {
    savedTheme = localStorage.getItem(storageKey);
  } catch {
    // El selector también funciona cuando el navegador bloquea el almacenamiento.
  }
  let preference = savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : null;
  const applyTheme = () => {
    const theme = preference || (systemTheme.matches ? 'dark' : 'light');
    root.dataset.theme = theme;
    const toggle = document.querySelector('#theme-toggle');
    if (!toggle) return;
    toggle.setAttribute('aria-pressed', String(theme === 'dark'));
    toggle.hidden = false;
  };
  applyTheme();
  document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('#theme-toggle');
    applyTheme();
    toggle.addEventListener('click', () => {
      preference = root.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme();
      try {
        localStorage.setItem(storageKey, preference);
      } catch {
        // Sin almacenamiento, se conserva el tema durante la navegación del OVA.
      }
    });
    systemTheme.addEventListener('change', () => {
      if (!preference) applyTheme();
    });
  });
})();
