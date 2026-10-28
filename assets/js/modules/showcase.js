/*
  Vitrine de mockups do hero: troca automática em intervalo curto (data-interval, em ms).
  Pausa com o mouse em cima, quando a aba do navegador fica oculta
  e quando o sistema pede "reduzir movimento".
*/
(function (App) {
  function setupShowcase(root) {
    const items = root.querySelectorAll('.showcase__item');
    const interval = Number(root.dataset.interval) || 1800;
    let current = 0;
    let timer = null;

    const show = (index) => {
      items[current].classList.remove('is-active');
      current = (index + items.length) % items.length;
      items[current].classList.add('is-active');
    };

    const stop = () => clearInterval(timer);
    const play = () => {
      stop();
      timer = setInterval(() => show(current + 1), interval);
    };

    if (App.utils.prefersReducedMotion() || items.length < 2) return;

    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', play);
    document.addEventListener('visibilitychange', () => (document.hidden ? stop() : play()));

    play();
  }

  App.showcase = {
    init() {
      document.querySelectorAll('[data-showcase]').forEach(setupShowcase);
    },
  };
})(window.App);
