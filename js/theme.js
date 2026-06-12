(() => {
  const themeIcons = {
    light: `
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="1.7" />
        <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.2 5.2l2.1 2.1M16.7 16.7l2.1 2.1M18.8 5.2l-2.1 2.1M7.3 16.7l-2.1 2.1" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
      </svg>
    `,
    dark: `
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M20 14.6A8 8 0 0 1 9.4 4a8.6 8.6 0 1 0 10.6 10.6Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" />
      </svg>
    `,
  };

  const getPreferredTheme = () => {
    try {
      const saved = localStorage.getItem('alhenas-theme');
      if (saved === 'light' || saved === 'dark') return saved;
    } catch {
      // ignore
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const applyTheme = (theme) => {
    document.documentElement.dataset.theme = theme;
    document.querySelectorAll('.theme-toggle').forEach((button) => {
      button.setAttribute('aria-pressed', String(theme === 'dark'));
      button.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
      const icon = button.querySelector('.theme-toggle__icon');
      if (icon) {
        icon.innerHTML = theme === 'dark' ? themeIcons.dark : themeIcons.light;
      }
    });
  };

  const initTheme = () => {
    const theme = getPreferredTheme();
    applyTheme(theme);

    document.querySelectorAll('.theme-toggle').forEach((button) => {
      button.addEventListener('click', () => {
        const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        try {
          localStorage.setItem('alhenas-theme', next);
        } catch {
          // ignore
        }
      });
    });
  };

  const initMobileNav = () => {
    const menuButton = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.site-nav');
    if (!menuButton || !nav) return;

    const closeMenu = () => {
      nav.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation menu');
      document.body.classList.remove('menu-open');
    };

    const openMenu = () => {
      nav.classList.add('is-open');
      menuButton.setAttribute('aria-expanded', 'true');
      menuButton.setAttribute('aria-label', 'Close navigation menu');
      document.body.classList.add('menu-open');
    };

    menuButton.addEventListener('click', () => {
      const isOpen = nav.classList.contains('is-open');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileNav();
  });
})();
