document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('[data-toolkit-root]');
  const tutorialRoot = document.querySelector('[data-tutorial-root]');
  if (!root) return;

  fetch('data/toolkit.json')
    .then((response) => response.json())
    .then((data) => {
      renderCategories(data.categories || []);
      renderTutorials(data.tutorials || []);
      initAccordions();
    })
    .catch(() => {
      root.innerHTML = '<p class="empty-state">Toolkit data could not be loaded.</p>';
    });

  function renderCategories(categories) {
    root.innerHTML = categories.filter((category) => category.id !== 'tutorials').map((category) => `
      <section class="toolkit-category" id="${category.id}">
        <h2 class="category-title">${category.title}</h2>
        ${category.items.length ? `<div class="grid">${category.items.map(renderItem).join('')}</div>` : '<p class="empty-state">Tutorials are listed below as expandable guides.</p>'}
      </section>
    `).join('');
  }

  function renderItem(item) {
    return `
      <article class="card resource-card reveal visible">
        <div class="resource-header">
          <div class="resource-icon" aria-hidden="true">${iconFor(item.icon)}</div>
          <div><h3>${item.title}</h3><p>${item.description}</p></div>
        </div>
        <div class="tag-list">${item.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}</div>
        <div class="card-actions">
          <a class="button button-primary" href="${item.download}" download>Download</a>
          <a class="button button-secondary" href="${item.guide}">View Guide</a>
        </div>
      </article>
    `;
  }

  function renderTutorials(tutorials) {
    if (!tutorialRoot) return;
    tutorialRoot.innerHTML = tutorials.map((tutorial) => `
      <article class="accordion" id="${tutorial.id}">
        <button class="accordion-trigger" type="button" aria-expanded="false">
          <span>${tutorial.title}</span><span aria-hidden="true">+</span>
        </button>
        <div class="accordion-panel"><div class="accordion-content"><p>${tutorial.content}</p></div></div>
      </article>
    `).join('');
  }

  function initAccordions() {
    document.querySelectorAll('.accordion').forEach((accordion) => {
      const trigger = accordion.querySelector('.accordion-trigger');
      const panel = accordion.querySelector('.accordion-panel');
      trigger.addEventListener('click', () => {
        const isOpen = trigger.getAttribute('aria-expanded') === 'true';
        trigger.setAttribute('aria-expanded', String(!isOpen));
        trigger.querySelector('[aria-hidden="true"]').textContent = isOpen ? '+' : '-';
        panel.style.maxHeight = isOpen ? '0' : `${panel.scrollHeight}px`;
      });
    });
  }

  function iconFor(name) {
    const icons = {
      sliders: '<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3"/><path d="M2 14h4M10 8h4M18 16h4"/></svg>',
      box: '<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="m21 8-9-5-9 5 9 5 9-5Z"/><path d="M3 8v8l9 5 9-5V8"/><path d="M12 13v8"/></svg>',
      puzzle: '<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M14 7V5a3 3 0 1 0-6 0v2H5v5h2a3 3 0 1 1 0 6H5v3h14v-4h-2a3 3 0 1 1 0-6h2V7h-5Z"/></svg>',
      code: '<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="m8 9-4 3 4 3M16 9l4 3-4 3M14 4l-4 16"/></svg>',
      check: '<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>'
    };
    return icons[name] || icons.box;
  }
});
