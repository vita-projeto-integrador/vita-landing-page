/*
  Header flutuante:
  - estado "rolado", barra de progresso e botão "voltar ao topo";
  - menu mobile (hambúrguer);
  - scroll spy: destaca o link da seção visível.
*/
(function (App) {
  const { $$ } = App.utils;

  function initScrollState(header) {
    const progress = document.querySelector('[data-scroll-progress]');
    const backToTop = document.querySelector('[data-back-to-top]');
    let ticking = false;

    const update = () => {
      const { scrollY, innerHeight } = window;
      const maxScroll = document.documentElement.scrollHeight - innerHeight;

      header.classList.toggle('is-scrolled', scrollY > 24);
      backToTop?.classList.toggle('is-visible', scrollY > innerHeight);
      progress?.style.setProperty('--scroll-progress', maxScroll > 0 ? scrollY / maxScroll : 0);
      ticking = false;
    };

    // requestAnimationFrame limita o trabalho a, no máximo, uma vez por quadro
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }, { passive: true });

    update();
  }

  function initMobileMenu(header) {
    const toggle = header.querySelector('[data-nav-toggle]');
    const nav = header.querySelector('[data-nav]');
    const label = toggle.querySelector('.sr-only');

    const setOpen = (open) => {
      toggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
      label.textContent = open ? 'Fechar menu' : 'Abrir menu';
    };

    toggle.addEventListener('click', () => {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    // Fecha ao escolher um link, ao clicar fora ou ao apertar Esc
    nav.addEventListener('click', (event) => {
      if (event.target.closest('a')) setOpen(false);
    });
    document.addEventListener('click', (event) => {
      if (!header.contains(event.target)) setOpen(false);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setOpen(false);
    });
  }

  function initScrollSpy(header) {
    // O CTA (#contato) tem a mesma classe base, mas não entra no destaque de seção
    const links = $$('.site-nav__link:not(.site-nav__link--cta)', header);
    const targets = ['#inicio', ...links.map((link) => link.hash), '#contato']
      .map((hash) => document.querySelector(hash))
      .filter(Boolean);

    // rootMargin reduz a área observada a uma "linha" no meio da tela
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const id = entry.target.id;
        links.forEach((link) => link.classList.toggle('is-active', link.hash === `#${id}`));
      });
    }, { rootMargin: '-50% 0px -50% 0px' });

    targets.forEach((section) => observer.observe(section));
  }

  App.header = {
    init() {
      const header = document.querySelector('[data-header]');
      if (!header) return;

      initScrollState(header);
      initMobileMenu(header);
      initScrollSpy(header);
    },
  };
})(window.App);
