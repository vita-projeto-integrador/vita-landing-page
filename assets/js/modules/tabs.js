/*
  Abas acessíveis (padrão WAI-ARIA "tabs"), reutilizadas em quatro lugares:
  "O que é?", timeline do fluxo (com data-tabs-hover), plataformas e equipe.
  O índice ativo vai para a variável CSS --active-index, usada nas animações.
*/
(function (App) {
  function setupTabs(root) {
    // Considera só as abas deste bloco (ignora abas de blocos aninhados)
    const tabs = [...root.querySelectorAll('[role="tab"]')]
      .filter((tab) => tab.closest('[data-tabs]') === root);
    const panels = tabs.map((tab) => document.getElementById(tab.getAttribute('aria-controls')));
    const activateOnHover = 'tabsHover' in root.dataset; // atributo data-tabs-hover

    root.style.setProperty('--tab-count', tabs.length);

    const select = (index, { focus = false } = {}) => {
      tabs.forEach((tab, i) => {
        const active = i === index;
        tab.setAttribute('aria-selected', String(active));
        tab.tabIndex = active ? 0 : -1; // "roving tabindex": só a aba ativa entra no Tab
        panels[i].hidden = !active;
      });
      root.style.setProperty('--active-index', index);
      if (focus) tabs[index].focus();
    };

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => select(index));

      if (activateOnHover) {
        tab.addEventListener('mouseenter', () => select(index));
      }

      // Navegação por teclado: setas, Home e End
      tab.addEventListener('keydown', (event) => {
        const moves = {
          ArrowRight: index + 1,
          ArrowLeft: index - 1,
          Home: 0,
          End: tabs.length - 1,
        };
        if (!(event.key in moves)) return;

        event.preventDefault();
        select((moves[event.key] + tabs.length) % tabs.length, { focus: true });
      });
    });

    const initial = tabs.findIndex((tab) => tab.getAttribute('aria-selected') === 'true');
    select(Math.max(initial, 0));
  }

  App.tabs = {
    init() {
      document.querySelectorAll('[data-tabs]').forEach(setupTabs);
    },
  };
})(window.App);
