document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('[data-bot-grid]');
  const searchInput = document.querySelector('[data-bot-search]');
  const sortSelect = document.querySelector('[data-bot-sort]');
  const filterButtons = document.querySelectorAll('[data-filter-value]');
  const modal = document.querySelector('[data-bot-modal]');
  const modalBody = document.querySelector('[data-modal-body]');
  const modalClose = document.querySelector('[data-modal-close]');
  let bots = [];
  let lastFocusedElement = null;

  const state = {
    search: '',
    sort: 'newest',
    filters: new Set()
  };

  if (!grid) return;

  fetch('data/bots.json')
    .then((response) => response.json())
    .then((data) => {
      bots = data.bots || [];
      renderBots();
    })
    .catch(() => {
      grid.innerHTML = '<p class="empty-state">Bot data could not be loaded.</p>';
    });

  function matchesFilters(bot) {
    const haystack = [bot.genre, bot.type, bot.gender, bot.nsfw ? 'nsfw' : 'sfw', ...bot.tags.map((tag) => tag.toLowerCase())];
    return [...state.filters].every((filter) => haystack.includes(filter));
  }

  function renderBots() {
    const query = state.search.trim().toLowerCase();
    const filtered = bots
      .filter((bot) => !query || `${bot.name} ${bot.tagline} ${bot.tags.join(' ')}`.toLowerCase().includes(query))
      .filter(matchesFilters)
      .sort((a, b) => {
        if (state.sort === 'az') return a.name.localeCompare(b.name);
        if (state.sort === 'za') return b.name.localeCompare(a.name);
        if (state.sort === 'oldest') return new Date(a.created) - new Date(b.created);
        return new Date(b.created) - new Date(a.created);
      });

    if (!filtered.length) {
      grid.innerHTML = '<p class="empty-state">No bots match the selected filters.</p>';
      return;
    }

    grid.innerHTML = filtered.map((bot) => `
      <button class="card polaroid-card bot-card reveal" type="button" data-bot-id="${bot.id}">
        <img class="polaroid-image" src="${bot.image}" alt="Portrait preview for ${bot.name}" loading="lazy">
        <div class="polaroid-caption">${bot.name}</div>
        <p class="bot-tagline">${bot.tagline}</p>
        <div class="tag-list bot-tags">${bot.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}</div>
      </button>
    `).join('');

    grid.querySelectorAll('[data-bot-id]').forEach((card) => {
      card.addEventListener('click', () => openModal(card.dataset.botId));
      card.classList.add('visible');
    });
  }

  function openModal(botId) {
    const bot = bots.find((item) => item.id === botId);
    if (!bot || !modal || !modalBody) return;
    lastFocusedElement = document.activeElement;

    const lorebooks = bot.downloads.lorebooks.map((item) => `
      <div class="download-row"><span>${item.name}</span><a class="button button-secondary" href="${item.file}" download>Download</a></div>
    `).join('');
    const alts = bot.alts.map((alt) => `
      <article class="card alt-card">
        <img src="${alt.image}" alt="${alt.name} preview" loading="lazy">
        <p class="polaroid-caption">${alt.name}</p>
        <a class="button button-secondary" href="${alt.file}" download>Download</a>
      </article>
    `).join('');

    modalBody.innerHTML = `
      <div class="bot-modal-head">
        <img class="bot-modal-image" src="${bot.image}" alt="Portrait preview for ${bot.name}">
        <div>
          <h2>${bot.name}</h2>
          <p>${bot.tagline}</p>
          <div class="tag-list" style="margin-top: 16px;">${bot.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}</div>
        </div>
      </div>
      <section class="modal-section"><h3>Description</h3><p>${bot.description}</p></section>
      <section class="modal-section">
        <h3>Downloads</h3>
        <div class="download-row"><span>Main Character Card</span><a class="button button-primary" href="${bot.downloads.main}" download>Download</a></div>
        ${lorebooks || '<p>No lorebooks attached.</p>'}
      </section>
      <section class="modal-section"><h3>Alt Versions</h3><div class="alt-grid">${alts || '<p>No alternate versions yet.</p>'}</div></section>
    `;

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modalClose.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocusedElement) lastFocusedElement.focus();
  }

  searchInput?.addEventListener('input', (event) => {
    state.search = event.target.value;
    renderBots();
  });

  sortSelect?.addEventListener('change', (event) => {
    state.sort = event.target.value;
    renderBots();
  });

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const value = button.dataset.filterValue;
      if (state.filters.has(value)) state.filters.delete(value);
      else state.filters.add(value);
      button.setAttribute('aria-pressed', String(state.filters.has(value)));
      renderBots();
    });
  });

  modalClose?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal?.classList.contains('is-open')) closeModal();
    if (event.key === 'Tab' && modal?.classList.contains('is-open')) trapFocus(event);
  });

  function trapFocus(event) {
    const focusable = modal.querySelectorAll('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (!first || !last) return;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});
