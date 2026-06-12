export type Lang = 'ru' | 'en';
export type Page = 'home' | 'bots' | 'tavern';
export type TavernTab = 'presets' | 'extensions' | 'regex' | 'tutorials' | 'other';

export const siteContent = {
  brand: {
    name: 'alhenas',
    year: '2026',
  },

  data: {
    bots: './data/bots.json',
    tavern: './data/tavern.json',
  },

  home: {
    aboutCaption: 'alhenas, 2025',
    aboutImage: {
      src: '',
      alt: {
        ru: 'Портрет alhenas',
        en: 'Portrait of alhenas',
      },
    },
  },

  images: {
    placeholders: {
      about: './images/placeholders/about.svg',
      bot: './images/placeholders/image.svg',
      modal: './images/placeholders/image.svg',
      altMini: './images/placeholders/image.svg',
    },
  },

  socialLinks: [
    { label: 'Telegram', url: 'https://t.me/alhenasrambling', color: '#229ED9', icon: 'tg' },
    { label: 'Boosty', url: 'https://boosty.to/alhenasrambling', color: '#f15f2b', icon: 'boosty' },
    { label: 'Janitor', url: 'https://janitorai.com/profiles/0aacb4b5-6102-4f0e-8eaa-4cf2422f2b67_profile-of-alhena-s', color: '#9b6fa6', icon: 'chub' },
    { label: 'GitHub', url: 'https://github.com/AlhenaaS', color: '#333', icon: 'gh' },
  ],

  bots: {
    altBadgePrefix: 'alt ×',
    genders: [
      { value: { ru: 'мужской', en: 'male' }, labelKey: 'male' },
      { value: { ru: 'женский', en: 'female' }, labelKey: 'female' },
      { value: { ru: 'небинарный', en: 'nonbinary' }, labelKey: 'nonbinary' },
    ],
  },

  tavern: {
    emptyText: '— пусто —',
    tabs: [
      { key: 'presets', icon: '⚙', labelKey: 'presets' },
      { key: 'extensions', icon: '🔌', labelKey: 'extensions' },
      { key: 'regex', icon: '{ }', labelKey: 'regex' },
      { key: 'tutorials', icon: '📖', labelKey: 'tutorials' },
      { key: 'other', icon: '✦', labelKey: 'other' },
    ],
  },

  labels: {
    themeToggle: 'Toggle theme',
    mobileMenu: 'Menu',
  },
} as const;
