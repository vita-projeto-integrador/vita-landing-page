/*
  Cards que giram. Usa delegação de eventos: um único listener no documento
  atende todos os cards, inclusive os que forem adicionados depois.
*/
(function (App) {
  App.flipCards = {
    init() {
      document.addEventListener('click', (event) => {
        const card = event.target.closest('[data-flip-card]');
        if (!card) return;

        const flipped = card.getAttribute('aria-pressed') === 'true';
        card.setAttribute('aria-pressed', String(!flipped));
      });
    },
  };
})(window.App);
