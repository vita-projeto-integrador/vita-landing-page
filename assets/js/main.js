/*
  Ponto de entrada: inicia cada módulo registrado em App.
  Cada init roda isolado em try/catch: se um falhar, os outros continuam funcionando.
*/
(function (App) {
  const modules = [
    'header',
    'scrollReveal',
    'showcase',
    'carousel',
    'tabs', // usado em "O que é?", timeline, plataformas e equipe
    'flipCards',
    'counters',
    'contactForm',
  ];

  modules.forEach((name) => {
    try {
      App[name].init();
    } catch (error) {
      console.error(`[App] Falha ao iniciar o módulo "${name}":`, error);
    }
  });

  document.querySelectorAll('[data-current-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  // Sinaliza ao script do <head> que o JS carregou (senão ele desativa as animações)
  document.documentElement.dataset.ready = 'true';
})(window.App);
