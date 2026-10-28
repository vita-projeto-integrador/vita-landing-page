/*
  Namespace da aplicação.
  Sem módulos ES, cada arquivo registra suas funções em "App" em vez de criar
  variáveis globais soltas (evita conflitos de nome entre os arquivos).
  Padrão usado nos módulos: (function (App) { ... })(window.App);
*/
window.App = window.App || {};

App.utils = {
  /** Respeita a configuração do sistema "reduzir movimento". */
  prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  /** querySelectorAll que já devolve um array. */
  $$(selector, scope = document) {
    return [...scope.querySelectorAll(selector)];
  },

  /** Promessa que resolve após "ms" milissegundos. */
  wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },
};
