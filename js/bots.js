(() => {
  const getLocale = () => window.AlhenasI18n?.getLanguage?.() || 'ru';
  const t = (key) => window.AlhenasI18n?.translate?.(key) || key;

  const state = {
    bots: [],
    search: '',
    genre: 'all',
    type: 'all',
    gender: 'all',
    rating: 'all',
    sort: 'newest',
  };

  const ui = {};
  let activeModalBot = null;
  let lastFocusedElement = null;
  let loadedLocale = '';

  const formatLabel = (value) => {
    if (!value) return '';
    const locale = getLocale();
    const map = {
      ru: {
        fantasy: 'Фэнтези',
        modern: 'Современность',
        horror: 'Хоррор',
        'sci-fi': 'Научная фантастика',
        oc: 'Оригинальный персонаж',
        scenario: 'Сценарий',
        female: 'Женский',
        male: 'Мужской',
        'non-binary': 'Небинарный',
        group: 'Группа',
        sfw: 'SFW',
        nsfw: 'NSFW',
      },
      en: {
        fantasy: 'Fantasy',
        modern: 'Modern',
        horror: 'Horror',
        'sci-fi': 'Sci-Fi',
        oc: 'OC',
        scenario: 'Scenario',
        female: 'Female',
        male: 'Male',
        'non-binary': 'Non-binary',
        group: 'Group',
        sfw: 'SFW',
        nsfw: 'NSFW',
      },
    };
    if (map[locale]?.[value]) return map[locale][value];
    return value
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  };

  const createChip = (label, value, group) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `chip${state[group] === value ? ' is-active' : ''}`;
    button.textContent = label;
    button.dataset.value = value;
    button.dataset.group = group;
    button.setAttribute('aria-pressed', String(state[group] === value));
    button.addEventListener('click', () => {
      state[group] = value;
      renderFilterGroups();
      renderBots();
    });
    return button;
  };

  const renderFilterGroups = () => {
    const fillGroup = (element, group, allLabel, options) => {
      element.innerHTML = '';
      element.appendChild(createChip(allLabel, 'all', group));
      options.forEach((option) => element.appendChild(createChip(formatLabel(option), option, group)));
    };

    const genres = [...new Set(state.bots.map((bot) => bot.genre))].sort();
    const types = [...new Set(state.bots.map((bot) => bot.type))].sort();
    const genders = [...new Set(state.bots.map((bot) => bot.gender))].sort();

    fillGroup(ui.genreFilters, 'genre', t('filters.all'), genres);
    fillGroup(ui.typeFilters, 'type', t('filters.all'), types);
    fillGroup(ui.genderFilters, 'gender', t('filters.all'), genders);

    ui.ratingFilters.innerHTML = '';
    [
      [t('filters.all'), 'all'],
      ['SFW', 'sfw'],
      ['NSFW', 'nsfw'],
    ].forEach(([label, value]) => ui.ratingFilters.appendChild(createChip(label, value, 'rating')));
  };

  const matchesFilters = (bot) => {
    const searchTarget = [bot.name, bot.tagline, bot.description, ...(bot.tags || [])].join(' ').toLowerCase();
    const matchesSearch = !state.search || searchTarget.includes(state.search);
    const matchesGenre = state.genre === 'all' || bot.genre === state.genre;
    const matchesType = state.type === 'all' || bot.type === state.type;
    const matchesGender = state.gender === 'all' || bot.gender === state.gender;
    const matchesRating =
      state.rating === 'all' ||
      (state.rating === 'nsfw' && bot.nsfw) ||
      (state.rating === 'sfw' && !bot.nsfw);

    return matchesSearch && matchesGenre && matchesType && matchesGender && matchesRating;
  };

  const sortBots = (bots) => {
    const sorted = [...bots];
    if (state.sort === 'az') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (state.sort === 'za') {
      sorted.sort((a, b) => b.name.localeCompare(a.name));
    } else if (state.sort === 'oldest') {
      sorted.sort((a, b) => new Date(a.released) - new Date(b.released));
    } else {
      sorted.sort((a, b) => new Date(b.released) - new Date(a.released));
    }
    return sorted;
  };

  const renderTagRow = (tags) =>
    `<div class="tag-row">${tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}</div>`;

  const renderBots = () => {
    const filtered = sortBots(state.bots.filter(matchesFilters));
    ui.botCount.textContent =
      getLocale() === 'ru'
        ? `${filtered.length} ${filtered.length === 1 ? 'запись' : filtered.length < 5 ? 'записи' : 'записей'} в архиве`
        : `${filtered.length} ${filtered.length === 1 ? 'entry' : 'entries'} in the archive`;

    if (!filtered.length) {
      ui.botGrid.innerHTML = `
        <div class="empty-state" data-reveal>
          <h3>${getLocale() === 'ru' ? 'Совпадений не найдено' : 'No matches found'}</h3>
          <p>${getLocale() === 'ru' ? 'Попробуйте другой запрос или сбросьте несколько фильтров, чтобы расширить выборку.' : 'Try a different search or clear a few filters to widen the drawer.'}</p>
        </div>
      `;
      window.AlhenasReveal?.observe(ui.botGrid);
      return;
    }

    ui.botGrid.innerHTML = filtered
      .map(
        (bot) => `
          <article class="bot-card polaroid-card" data-reveal>
            <button class="bot-card__button" type="button" data-bot-id="${bot.id}" aria-label="Open details for ${bot.name}">
              <div class="bot-card__media">
                <img src="${bot.image}" alt="${bot.name} avatar" loading="lazy" />
                ${bot.featured ? '<span class="bot-card__stamp" aria-hidden="true">✦</span>' : ''}
              </div>
              <div class="bot-card__body">
                <h2 class="bot-card__title">${bot.name}</h2>
                <p class="bot-card__tagline">${bot.tagline}</p>
                <div style="height: 12px"></div>
                ${renderTagRow(bot.tags)}
              </div>
            </button>
          </article>
        `,
      )
      .join('');

    ui.botGrid.querySelectorAll('[data-bot-id]').forEach((button) => {
      button.addEventListener('click', () => openModal(button.dataset.botId));
    });

    window.AlhenasReveal?.observe(ui.botGrid);
  };

  const makeDownloadItem = (label, file, meta = 'File ready', primary = false) => `
    <div class="download-item">
      <div>
        <span>${label}</span><br />
        <small>${meta}</small>
      </div>
      <a class="btn-inline ${primary ? 'btn-primary' : ''}" href="${file}" download>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 4v10m0 0 4-4m-4 4-4-4M5 19h14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        ${getLocale() === 'ru' ? 'Скачать' : 'Download'}
      </a>
    </div>
  `;

  const renderDescription = (description) =>
    description
      .split(/\n\n+/)
      .map((paragraph) => `<p>${paragraph.trim()}</p>`)
      .join('');

  const openModal = (botId) => {
    const bot = state.bots.find((entry) => entry.id === botId);
    if (!bot) return;

    activeModalBot = bot;
    lastFocusedElement = document.activeElement;

    const downloads = [
      makeDownloadItem(
        bot.downloads.main.name,
        bot.downloads.main.file,
        getLocale() === 'ru' ? 'Основной экспорт карточки' : 'Primary card export',
        true,
      ),
      ...bot.downloads.lorebooks.map((item) =>
        makeDownloadItem(item.name, item.file, getLocale() === 'ru' ? 'JSON лорбука' : 'Lorebook JSON'),
      ),
    ].join('');

    const alts = bot.alts.length
      ? bot.alts
          .map(
            (alt) => `
              <article class="alt-card">
                <div class="alt-card__media">
                  <img src="${alt.image}" alt="${alt.name} preview" loading="lazy" />
                </div>
                <h4>${alt.name}</h4>
                <a class="btn-inline" href="${alt.file}" download>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 4v10m0 0 4-4m-4 4-4-4M5 19h14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  ${getLocale() === 'ru' ? 'Скачать' : 'Download'}
                </a>
              </article>
            `,
          )
          .join('')
      : `<p>${getLocale() === 'ru' ? 'Для этой записи пока не добавлено альтернативных версий.' : 'No alternate prints have been filed for this entry yet.'}</p>`;

    ui.botModalContent.innerHTML = `
      <div class="bot-card-modal__layout">
        <div class="bot-card-modal__image">
          <img src="${bot.image}" alt="${bot.name} full preview" />
        </div>
        <div>
          <div class="bot-card-modal__header">
            <h2 id="botModalTitle">${bot.name}</h2>
            <p>${bot.tagline}</p>
          </div>
          <div style="height: 16px"></div>
          ${renderTagRow(bot.tags)}
          <div class="modal__separator"></div>
          <div class="modal-copy">
            <h3>${getLocale() === 'ru' ? 'Описание' : 'Description'}</h3>
            ${renderDescription(bot.description)}
          </div>
        </div>
      </div>
      <div class="modal__separator"></div>
      <section>
        <h3>${getLocale() === 'ru' ? 'Скачивания' : 'Downloads'}</h3>
        <div style="height: 16px"></div>
        <div class="download-list">${downloads}</div>
      </section>
      <div class="modal__separator"></div>
      <section>
        <h3>${getLocale() === 'ru' ? 'Альтернативные версии' : 'Alt Versions'}</h3>
        <div style="height: 16px"></div>
        <div class="alt-grid">${alts}</div>
      </section>
    `;

    ui.botModal.classList.add('is-open');
    ui.botModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    ui.modalClose.focus();
  };

  const closeModal = () => {
    if (!ui.botModal.classList.contains('is-open')) return;
    ui.botModal.classList.remove('is-open');
    ui.botModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    ui.botModalContent.innerHTML = '';
    activeModalBot = null;
    lastFocusedElement?.focus?.();
  };

  const loadBots = async () => {
    const locale = getLocale();
    const source = locale === 'en' ? 'data/bots.en.json' : 'data/bots.json';
    const response = await fetch(source);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const payload = await response.json();
    state.bots = payload.bots || [];
    loadedLocale = locale;
  };

  const trapModalFocus = (event) => {
    if (!ui.botModal.classList.contains('is-open')) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      closeModal();
      return;
    }

    if (event.key !== 'Tab') return;

    const focusable = ui.botModal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );

    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const init = async () => {
    Object.assign(ui, {
      botGrid: document.getElementById('botGrid'),
      botCount: document.getElementById('botCount'),
      botSearch: document.getElementById('botSearch'),
      genreFilters: document.getElementById('genreFilters'),
      typeFilters: document.getElementById('typeFilters'),
      genderFilters: document.getElementById('genderFilters'),
      ratingFilters: document.getElementById('ratingFilters'),
      sortBots: document.getElementById('sortBots'),
      botModal: document.getElementById('botModal'),
      botModalContent: document.getElementById('botModalContent'),
      modalClose: document.querySelector('.modal__close'),
    });

    ui.botSearch.addEventListener('input', (event) => {
      state.search = event.target.value.trim().toLowerCase();
      renderBots();
    });

    ui.sortBots.addEventListener('change', (event) => {
      state.sort = event.target.value;
      renderBots();
    });

    ui.modalClose.addEventListener('click', closeModal);
    ui.botModal.addEventListener('click', (event) => {
      if (event.target === ui.botModal) closeModal();
    });
    document.addEventListener('keydown', trapModalFocus);

    try {
      await loadBots();
      renderFilterGroups();
      renderBots();
    } catch (error) {
      ui.botCount.textContent = getLocale() === 'ru' ? 'Не удалось загрузить архив.' : 'Unable to load archive.';
      ui.botGrid.innerHTML = `
        <div class="empty-state" data-reveal>
          <h3>${getLocale() === 'ru' ? 'Архив недоступен' : 'Archive unavailable'}</h3>
          <p>${getLocale() === 'ru' ? 'Не удалось загрузить bots.json. Проверьте пути к файлам и попробуйте снова.' : 'There was a problem loading bots.json. Please check the file paths and try again.'}</p>
        </div>
      `;
      window.AlhenasReveal?.observe(ui.botGrid);
      console.error(error);
    }
  };

  window.addEventListener('alhenas:languagechange', async () => {
    if (!ui.botGrid) return;
    try {
      if (loadedLocale !== getLocale()) await loadBots();
      renderFilterGroups();
      renderBots();
      if (activeModalBot) openModal(activeModalBot.id);
    } catch (error) {
      console.error(error);
    }
  });

  document.addEventListener('DOMContentLoaded', init);
})();
