/*
  Carrossel reutilizável (projetos, depoimentos e telas do app).
  A rolagem é nativa (scroll-snap no CSS); aqui só criamos os controles:
  setas, pontos e reprodução automática que pausa com mouse/foco/toque.
*/
(function (App) {
  function createCarousel(root) {
    const track = root.querySelector('.carousel__track');
    const slides = [...track.children];
    const dotsContainer = root.querySelector('[data-carousel-dots]');
    const delay = Number(root.dataset.autoplay) || 0;
    let timer = null;

    // Quantos slides cabem na tela: lido do CSS (--per-view muda nos media queries)
    const perView = () => Number(getComputedStyle(root).getPropertyValue('--per-view')) || 1;
    const pageCount = () => Math.max(slides.length - perView() + 1, 1);
    const slideStep = () => (slides[1] ? slides[1].offsetLeft - slides[0].offsetLeft : 0);

    // Carrossel escondido (ex.: dentro de uma aba fechada) tem largura 0
    const currentPage = () => {
      const step = slideStep();
      return step > 0 ? Math.round(track.scrollLeft / step) : 0;
    };

    const goTo = (page) => {
      const total = pageCount();
      const target = (page + total) % total; // depois do último, volta ao primeiro
      track.scrollTo({ left: target * slideStep() });
    };

    const updateDots = () => {
      const page = currentPage();
      [...dotsContainer.children].forEach((dot, index) => {
        dot.setAttribute('aria-current', String(index === page));
      });
    };

    const renderDots = () => {
      dotsContainer.replaceChildren();
      for (let i = 0; i < pageCount(); i++) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'carousel__dot';
        dot.setAttribute('aria-label', `Ir para o item ${i + 1}`);
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.append(dot);
      }
      updateDots();
    };

    const stop = () => clearInterval(timer);
    const play = () => {
      if (!delay || App.utils.prefersReducedMotion()) return;
      stop();
      timer = setInterval(() => goTo(currentPage() + 1), delay);
    };

    root.querySelector('[data-carousel-prev]').addEventListener('click', () => goTo(currentPage() - 1));
    root.querySelector('[data-carousel-next]').addEventListener('click', () => goTo(currentPage() + 1));
    track.addEventListener('scroll', () => requestAnimationFrame(updateDots), { passive: true });

    // Pausa enquanto o usuário interage
    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', play);
    root.addEventListener('focusin', stop);
    root.addEventListener('focusout', play);
    track.addEventListener('pointerdown', stop);

    // Só toca quando o carrossel está visível
    new IntersectionObserver(([entry]) => (entry.isIntersecting ? play() : stop()))
      .observe(root);

    // Quando o tamanho muda (girar o celular, abrir a aba onde ele está), recalcula os pontos
    let lastCount = pageCount();
    new ResizeObserver(() => {
      if (pageCount() !== lastCount) {
        lastCount = pageCount();
        renderDots();
      } else {
        updateDots();
      }
    }).observe(track);

    renderDots();
  }

  App.carousel = {
    init() {
      document.querySelectorAll('[data-carousel]').forEach(createCarousel);
    },
  };
})(window.App);
