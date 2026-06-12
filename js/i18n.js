(() => {
  const STORAGE_KEY = 'alhenas-language';
  const DEFAULT_LANGUAGE = 'ru';

  const translations = {
    ru: {
      'meta.index.title': 'Alhenas — винтажный AI-архив',
      'meta.index.description': 'Alhenas — минималистичный винтажный архив авторских AI-персонажей, пресетов и инструментов для SillyTavern.',
      'meta.bots.title': 'Alhenas — коллекция ботов',
      'meta.bots.description': 'Каталог ботов Alhenas с поиском, фильтрами, тегами и скачиваемыми файлами.',
      'meta.toolkit.title': 'Alhenas — инструменты Tavern',
      'meta.toolkit.description': 'Пресеты, расширения, regex-скрипты, руководства и спокойные утилиты для SillyTavern из набора Alhenas.',
      'brand.home': 'Главная Alhenas',
      'nav.label': 'Основная навигация',
      'nav.home': 'Главная',
      'nav.bots': 'Боты',
      'nav.toolkit': 'Инструменты Tavern',
      'actions.theme': 'Переключить тему',
      'actions.menu': 'Открыть меню навигации',
      'footer.social': 'Социальные ссылки',
      'footer.note': 'сделано с ✦ от Alhenas',
      'home.eyebrow': 'Винтажный архив • тихий свет Близнецов',
      'home.subtitle': 'Авторские AI-персонажи, пресеты и мягкие заметки для SillyTavern — разложенные как бумажные памятки и подписанные под спокойным светом Альхены.',
      'home.cta.bots': 'Смотреть ботов',
      'home.cta.toolkit': 'Инструменты Tavern',
      'home.about.title': 'Маленькие бумажные созвездия',
      'home.about.text': 'Три тихих угла архива: персонажи, утилиты и заметки, созданные личными, а не клиническими.',
      'home.about.characters.title': 'Архив персонажей',
      'home.about.characters.text': 'Профили в стиле полароидов с тегами, описаниями, альтернативными версиями и готовыми файлами для скачивания.',
      'home.about.toolkit.title': 'Инструменты Tavern',
      'home.about.toolkit.text': 'Пресеты, regex, расширения и практичные маленькие помощники для более мягкого рабочего процесса.',
      'home.about.notes.title': 'Заметки наблюдателя',
      'home.about.notes.text': 'Руководства и подписи-подсказки со сдержанным мотивом Близнецов и мягкостью скрапбука.',
      'home.featured.title': 'Избранные подборки',
      'home.featured.text': 'Три первых выбора из ящика — будто их карандашом добавили после ночной каталогизации.',
      'home.feature.mirielle.role': 'Ботаническая архивистка фэнтези',
      'home.feature.mirielle.note': 'выбор Альхены',
      'home.feature.caelum.role': 'Парные голоса, зеркальная память',
      'home.feature.caelum.note': 'архив Близнецов',
      'home.feature.juniper.role': 'Орбитальная инженерка тихого профиля',
      'home.feature.juniper.note': 'полевая заметка № 02',
      'bots.title': 'Коллекция ботов',
      'bots.intro': 'Спокойный каталог персонажей и сценариев с фильтрами — каждая карточка оформлена как сохраненный отпечаток, с тегами, заметками, файлами и альтернативными версиями внутри.',
      'bots.search.label': 'Искать ботов',
      'bots.search.placeholder': 'Искать ботов...',
      'bots.loading': 'Загружаю архив...',
      'bots.filters.label': 'Фильтры ботов',
      'bots.filters.genre': 'Жанр / сеттинг',
      'bots.filters.type': 'Тип',
      'bots.filters.gender': 'Гендер',
      'bots.filters.rating': 'Рейтинг',
      'bots.sort.label': 'Сортировать ботов',
      'bots.sort.newest': 'Сначала новые',
      'bots.sort.oldest': 'Сначала старые',
      'bots.sort.az': 'По имени (А–Я)',
      'bots.sort.za': 'По имени (Я–А)',
      'bots.modal.close': 'Закрыть детали бота',
      'toolkit.title': 'Инструменты Tavern',
      'toolkit.intro': 'Пресеты, расширения, regex-скрипты, руководства и другое для SillyTavern — собрано с тихой аккуратностью письменного ящика.',
      'toolkit.tabs.label': 'Категории инструментов',
      'filters.all': 'Все',
    },
    en: {
      'meta.index.title': 'Alhenas — Vintage AI Archive',
      'meta.index.description': 'Alhenas — a minimalist vintage archive for handcrafted AI characters, presets, and tools for SillyTavern.',
      'meta.bots.title': 'Alhenas — Bot Collection',
      'meta.bots.description': 'Browse Alhenas bot collection with search, filters, tags, and downloadable assets.',
      'meta.toolkit.title': 'Alhenas — Tavern Toolkit',
      'meta.toolkit.description': 'Presets, extensions, regex scripts, tutorials, and quiet utilities for SillyTavern from the Alhenas toolkit.',
      'brand.home': 'Alhenas home',
      'nav.label': 'Primary navigation',
      'nav.home': 'Home',
      'nav.bots': 'Bots',
      'nav.toolkit': 'Tavern Toolkit',
      'actions.theme': 'Switch theme',
      'actions.menu': 'Open navigation menu',
      'footer.social': 'Social links',
      'footer.note': 'made with ✦ by Alhenas',
      'home.eyebrow': 'Vintage archive • Gemini hush',
      'home.subtitle': 'Handcrafted AI characters, presets, and gentle toolkit notes for SillyTavern — arranged like paper keepsakes, annotated under the quiet light of Alhena.',
      'home.cta.bots': 'Browse Bots',
      'home.cta.toolkit': 'Tavern Toolkit',
      'home.about.title': 'Small paper constellations',
      'home.about.text': 'Three quiet corners of the archive: characters, utilities, and notes made to feel personal rather than clinical.',
      'home.about.characters.title': 'Character archive',
      'home.about.characters.text': 'Polaroid-style profiles with tags, descriptions, alt versions, and ready-to-download files.',
      'home.about.toolkit.title': 'Tavern Toolkit',
      'home.about.toolkit.text': 'Presets, regex, extensions, and practical little helpers for tailoring a softer workflow.',
      'home.about.notes.title': "Observer's notes",
      'home.about.notes.text': 'Tutorials and caption-like guidance with a restrained Gemini motif and scrapbook softness.',
      'home.featured.title': 'Featured selections',
      'home.featured.text': 'Three first picks from the drawer — presented as if they were penciled in after a late-night cataloging session.',
      'home.feature.mirielle.role': 'Botanical fantasy archivist',
      'home.feature.mirielle.note': 'alhena pick',
      'home.feature.caelum.role': 'Paired voices, mirrored memory',
      'home.feature.caelum.note': 'gemini archive',
      'home.feature.juniper.role': 'Low-noise orbital engineer',
      'home.feature.juniper.note': 'field note no. 02',
      'bots.title': 'Bot Collection',
      'bots.intro': 'A calm, filterable catalog of characters and scenarios — each card framed like a saved print, with tags, notes, downloads, and alternative versions tucked inside.',
      'bots.search.label': 'Search bots',
      'bots.search.placeholder': 'Search bots...',
      'bots.loading': 'Loading archive...',
      'bots.filters.label': 'Bot filters',
      'bots.filters.genre': 'Genre / Setting',
      'bots.filters.type': 'Type',
      'bots.filters.gender': 'Gender',
      'bots.filters.rating': 'Rating',
      'bots.sort.label': 'Sort bots',
      'bots.sort.newest': 'Sort by: Newest',
      'bots.sort.oldest': 'Sort by: Oldest',
      'bots.sort.az': 'Sort by: Name (A–Z)',
      'bots.sort.za': 'Sort by: Name (Z–A)',
      'bots.modal.close': 'Close bot details',
      'toolkit.title': 'Tavern Toolkit',
      'toolkit.intro': 'Presets, extensions, regex scripts, tutorials, and more for SillyTavern — collected with a quiet desk-drawer precision.',
      'toolkit.tabs.label': 'Toolkit categories',
      'filters.all': 'All',
    },
  };

  const getLanguage = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'ru' || saved === 'en') return saved;
    } catch {
      // ignore
    }
    return DEFAULT_LANGUAGE;
  };

  const translate = (key, language = getLanguage()) => translations[language]?.[key] || translations[DEFAULT_LANGUAGE][key] || key;

  const applyLanguage = (language, notify = true) => {
    document.documentElement.lang = language;
    document.documentElement.dataset.language = language;
    document.querySelectorAll('[data-i18n]').forEach((element) => {
      element.textContent = translate(element.dataset.i18n, language);
    });
    document.querySelectorAll('[data-i18n-title]').forEach((element) => {
      element.setAttribute('title', translate(element.dataset.i18nTitle, language));
    });
    document.querySelectorAll('[data-i18n-label]').forEach((element) => {
      element.setAttribute('aria-label', translate(element.dataset.i18nLabel, language));
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
      element.setAttribute('placeholder', translate(element.dataset.i18nPlaceholder, language));
    });
    document.querySelectorAll('[data-i18n-content]').forEach((element) => {
      element.setAttribute('content', translate(element.dataset.i18nContent, language));
    });
    document.querySelectorAll('.language-toggle').forEach((button) => {
      const nextLanguage = language === 'ru' ? 'en' : 'ru';
      button.textContent = nextLanguage.toUpperCase();
      button.setAttribute('aria-label', language === 'ru' ? 'Switch site language to English' : 'Переключить сайт на русский');
      button.setAttribute('title', language === 'ru' ? 'English' : 'Русский');
    });
    if (notify) {
      window.dispatchEvent(new CustomEvent('alhenas:languagechange', { detail: { language } }));
    }
  };

  const setLanguage = (language) => {
    const next = language === 'en' ? 'en' : DEFAULT_LANGUAGE;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
    applyLanguage(next);
  };

  window.AlhenasI18n = { getLanguage, setLanguage, translate };

  document.addEventListener('DOMContentLoaded', () => {
    applyLanguage(getLanguage(), false);
    document.querySelectorAll('.language-toggle').forEach((button) => {
      button.addEventListener('click', () => setLanguage(getLanguage() === 'ru' ? 'en' : 'ru'));
    });
  });
})();
