(() => {
  const Reveal = {
    observer: null,
    observe(root = document) {
      const items = Array.from(root.querySelectorAll('[data-reveal]')).filter(
        (item) => !item.dataset.revealBound,
      );

      if (!items.length) return;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        items.forEach((item) => {
          item.classList.add('is-visible');
          item.dataset.revealBound = 'true';
        });
        return;
      }

      if (!this.observer) {
        this.observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                this.observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.14, rootMargin: '0px 0px -30px 0px' },
        );
      }

      items.forEach((item) => {
        item.dataset.revealBound = 'true';
        this.observer.observe(item);
      });
    },
  };

  window.AlhenasReveal = Reveal;

  document.addEventListener('DOMContentLoaded', () => {
    Reveal.observe();
  });
})();
