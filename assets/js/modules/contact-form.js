/*
  Formulário de contato:
  - validação com a Constraint Validation API (regras ficam no HTML: required, type, minlength);
  - mensagens de erro acessíveis (aria-invalid + aria-describedby);
  - links com data-subject pré-selecionam o assunto.
*/
(function (App) {
  function getErrorMessage(field) {
    const { validity } = field;
    if (validity.valueMissing) return 'Este campo é obrigatório.';
    if (validity.typeMismatch) return 'Digite um e-mail válido.';
    if (validity.tooShort) return `Use pelo menos ${field.minLength} caracteres.`;
    return 'Valor inválido.';
  }

  function validateField(field) {
    const error = document.getElementById(field.getAttribute('aria-describedby'));
    const valid = field.checkValidity();

    field.setAttribute('aria-invalid', String(!valid));
    error.textContent = valid ? '' : getErrorMessage(field);
    return valid;
  }

  function setStatus(element, message, type) {
    element.textContent = message;
    element.classList.toggle('is-success', type === 'success');
    element.classList.toggle('is-error', type === 'error');
  }

  function setLoading(button, label, loading) {
    button.classList.toggle('is-loading', loading);
    button.setAttribute('aria-busy', String(loading));
    label.textContent = loading ? 'Enviando…' : 'Enviar mensagem';
  }

  function prefillSubject(select) {
    document.addEventListener('click', (event) => {
      const trigger = event.target.closest('[data-subject]');
      if (trigger) select.value = trigger.dataset.subject;
    });
  }

  App.contactForm = {
    init() {
      const form = document.querySelector('[data-contact-form]');
      if (!form) return;

      const fields = [...form.querySelectorAll('.field__input')];
      const status = form.querySelector('[data-form-status]');
      const submitButton = form.querySelector('[type="submit"]');
      const submitLabel = form.querySelector('[data-submit-label]');

      prefillSubject(form.elements.assunto);

      fields.forEach((field) => {
        // Valida ao sair do campo (se já foi preenchido) e corrige enquanto digita
        field.addEventListener('blur', () => field.value && validateField(field));
        field.addEventListener('input', () => {
          if (field.getAttribute('aria-invalid') === 'true') validateField(field);
        });
      });

      form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const invalidFields = fields.filter((field) => !validateField(field));
        if (invalidFields.length > 0) {
          invalidFields[0].focus();
          setStatus(status, 'Revise os campos destacados.', 'error');
          return;
        }

        setLoading(submitButton, submitLabel, true);

        // Ainda não há back-end: simulamos o envio.
        // Integração real: await fetch('/api/contato', { method: 'POST', body: new FormData(form) });
        await App.utils.wait(1200);

        setLoading(submitButton, submitLabel, false);
        form.reset();
        setStatus(status, 'Mensagem enviada! Em breve entraremos em contato.', 'success');
      });
    },
  };
})(window.App);
