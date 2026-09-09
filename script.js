document.addEventListener('DOMContentLoaded', () => {
  const revealItems = document.querySelectorAll('main section');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealItems.forEach((item) => {
    item.classList.add('reveal');
    observer.observe(item);
  });

  document.querySelectorAll('button, nav a, .bakery-card').forEach((element) => {
    element.addEventListener('click', () => {
      element.classList.remove('clicked');
      void element.offsetWidth;
      element.classList.add('clicked');
      setTimeout(() => element.classList.remove('clicked'), 260);
    });
  });

  const form = document.querySelector('form');
  if (form) {
    const fields = ['name', 'email', 'pickup-date', 'request-type', 'item-details', 'allergy-notes'];

    // Restore a customer's unfinished request when they return to the page.
    fields.forEach((fieldName) => {
      const field = form.elements[fieldName];
      const savedValue = localStorage.getItem(`northStar-${fieldName}`);
      if (field && savedValue !== null) field.value = savedValue;
    });

    // Save form progress locally as the customer types or changes a selection.
    form.addEventListener('input', (event) => {
      if (event.target.name && fields.includes(event.target.name)) {
        localStorage.setItem(`northStar-${event.target.name}`, event.target.value);
      }
    });

    form.addEventListener('change', (event) => {
      if (event.target.name && fields.includes(event.target.name)) {
        localStorage.setItem(`northStar-${event.target.name}`, event.target.value);
      }
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const button = form.querySelector('button[type="submit"]');
      if (!button) return;

      const request = {};
      fields.forEach((fieldName) => {
        request[fieldName] = form.elements[fieldName]?.value || '';
      });
      localStorage.setItem('northStar-lastRequest', JSON.stringify(request));

      // Clear the saved draft after a successful submission.
      fields.forEach((fieldName) => localStorage.removeItem(`northStar-${fieldName}`));

      const originalText = button.textContent;
      button.textContent = 'Request Received!';
      button.classList.add('success');
      form.reset();
      setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove('success');
      }, 2200);
    });
  }
});
