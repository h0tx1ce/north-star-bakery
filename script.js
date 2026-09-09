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
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const button = form.querySelector('button[type="submit"]');
      if (!button) return;
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
