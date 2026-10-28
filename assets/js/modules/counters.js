/*
  Contadores animados: o número final já está no HTML (funciona sem JS);
  quando o elemento aparece, contamos de 0 até data-count-to.
*/
(function (App) {
  function animateCount(el, duration = 1400) {
    const target = Number(el.dataset.countTo);
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3; // easeOutCubic: rápido no início, suave no fim
      el.textContent = Math.round(target * eased);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }

  App.counters = {
    init() {
      if (App.utils.prefersReducedMotion()) return;

      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animateCount(entry.target);
          obs.unobserve(entry.target);
        });
      }, { threshold: 0.6 });

      document.querySelectorAll('[data-count-to]').forEach((el) => observer.observe(el));
    },
  };
})(window.App);
