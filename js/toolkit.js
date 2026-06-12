(() => {
  const ui = {};
  const getLocale = () => window.AlhenasI18n?.getLanguage?.() || 'ru';
  let currentData = null;

  const buildTagRow = (tags = []) =>
    `<div class="tag-row">${tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}</div>`;

  const buildResourceCard = (item, icon) => `
    <article class="resource-card" data-reveal>
      <div class="resource-card__head">
        <div class="resource-card__icon" aria-hidden="true">${icon}</div>
        <div class="resource-card__body">
          <h3>${item.name}</h3>
          <p>${item.description}</p>
        </div>
      </div>
      <div style="height: 16px"></div>
      ${buildTagRow([item.type, item.version])}
      <div class="resource-card__actions">
        <a class="btn-inline btn-primary" href="${item.download}" download>${getLocale() === 'ru' ? 'Скачать' : 'Download'}</a>
        ${item.guide ? `<a class="btn-inline" href="${item.guide}" target="_blank" rel="noreferrer">${getLocale() === 'ru' ? 'Открыть руководство →' : 'View Guide →'}</a>` : ''}
      </div>
    </article>
  `;

  const buildTutorial = (item) => {
    const html = item.content
      .split(/\n\n+/)
      .map((block) => {
        if (block.startsWith('- ')) {
          const entries = block
            .split('\n')
            .map((line) => `<li>${line.replace(/^-\s*/, '')}</li>`)
            .join('');
          return `<ul>${entries}</ul>`;
        }
        return `<p>${block.replace(/\n/g, '<br />')}</p>`;
      })
      .join('');

    return `
      <article class="accordion" data-reveal>
        <button class="accordion__toggle" type="button" aria-expanded="false">
          <span>
            ${item.title}
            <span class="tutorial-summary">${item.summary}</span>
          </span>
          <span class="accordion__meta" aria-hidden="true">▶</span>
        </button>
        <div class="accordion__panel">
          <div class="accordion__inner">${html}</div>
        </div>
      </article>
    `;
  };

  const renderTabs = (sections) => {
    ui.tabs.innerHTML = sections
      .map((section) => `<a class="chip" href="#${section.id}">${section.title}</a>`)
      .join('');
  };

  const renderSections = (data) => {
    const sections = [...data.categories, data.tutorials];
    renderTabs(sections);

    ui.sections.innerHTML = sections
      .map((section) => {
        if (section.id === 'tutorials') {
          return `
            <section class="toolkit-section" id="${section.id}">
              <div class="toolkit-section__header" data-reveal>
                <h2>${section.title}</h2>
                <p>${section.subtitle}</p>
              </div>
              <div class="accordion-list">
                ${section.items.map(buildTutorial).join('')}
              </div>
            </section>
          `;
        }

        return `
          <section class="toolkit-section" id="${section.id}">
            <div class="toolkit-section__header" data-reveal>
              <h2>${section.title}</h2>
              <p>${section.subtitle}</p>
            </div>
            <div class="resource-grid">
              ${section.items.map((item) => buildResourceCard(item, section.icon)).join('')}
            </div>
          </section>
        `;
      })
      .join('');

    initAccordions();
    window.AlhenasReveal?.observe(ui.sections);
  };

  const initAccordions = () => {
    ui.sections.querySelectorAll('.accordion').forEach((accordion) => {
      const button = accordion.querySelector('.accordion__toggle');
      const panel = accordion.querySelector('.accordion__panel');

      button.addEventListener('click', () => {
        const open = accordion.classList.toggle('is-open');
        button.setAttribute('aria-expanded', String(open));
        panel.style.maxHeight = open ? `${panel.scrollHeight}px` : '0px';
      });
    });
  };

  const loadData = async () => {
    const source = getLocale() === 'en' ? 'data/toolkit.en.json' : 'data/toolkit.json';
    const response = await fetch(source);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  };

  const init = async () => {
    Object.assign(ui, {
      tabs: document.getElementById('toolkitTabs'),
      sections: document.getElementById('toolkitSections'),
    });

    try {
      const data = currentData && currentData.locale === getLocale() ? currentData.payload : await loadData();
      currentData = { locale: getLocale(), payload: data };
      renderSections(data);
    } catch (error) {
      ui.sections.innerHTML = `
        <div class="empty-state" data-reveal>
          <h3>${getLocale() === 'ru' ? 'Инструменты недоступны' : 'Toolkit unavailable'}</h3>
          <p>${getLocale() === 'ru' ? 'Не удалось загрузить toolkit.json. Проверьте файл данных и попробуйте снова.' : 'There was a problem loading toolkit.json. Please verify the data file and try again.'}</p>
        </div>
      `;
      window.AlhenasReveal?.observe(ui.sections);
      console.error(error);
    }
  };

  window.addEventListener('alhenas:languagechange', () => {
    init().catch((error) => console.error(error));
  });

  document.addEventListener('DOMContentLoaded', init);
})();
