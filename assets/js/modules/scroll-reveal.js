/*
  Scroll reveal: adiciona .is-revealed quando o elemento entra na tela.
  Em [data-reveal-group], os filhos entram em sequência (efeito cascata).
*/
(function (App) {
  const STAGGER_MS = 120;

  function reveal(el) {
    el.classList.add('is-revealed');

    // Ao terminar, remove o atributo para o elemento voltar às próprias transições (hover etc.)
    const cleanup = (event) => {
      if (event.target !== el) return;
      el.removeAttribute('data-reveal');
      el.style.removeProperty('--reveal-delay');
      el.removeEventListener('transitionend', cleanup);
    };
    el.addEventListener('transitionend', cleanup);
  }

  App.scrollReveal = {
    init() {
      document.querySelectorAll('[data-reveal-group]').forEach((group) => {
        group.querySelectorAll('[data-reveal]').forEach((el, index) => {
          el.style.setProperty('--reveal-delay', `${index * STAGGER_MS}ms`);
        });
      });

      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          reveal(entry.target);
          obs.unobserve(entry.target); // anima só na primeira vez
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

      document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));
    },
  };
})(window.App);
