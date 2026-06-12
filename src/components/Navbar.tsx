import { useState } from 'react';
import { useApp } from '../context/AppContext';

type Page = 'home' | 'bots' | 'tavern';

interface NavbarProps {
  currentPage: Page;
  setPage: (page: Page) => void;
}

export default function Navbar({ currentPage, setPage }: NavbarProps) {
  const { t, toggleLang, toggleTheme, theme, lang } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (page: Page) => {
    setPage(page);
    setMobileOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-inner">
          <button className="logo-btn" onClick={() => handleNav('home')}>
            <svg className="star-logo" width="22" height="22" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="4" fill="currentColor"/>
              <circle cx="22" cy="30" r="3" fill="currentColor"/>
              <circle cx="78" cy="28" r="3" fill="currentColor"/>
              <circle cx="15" cy="62" r="3" fill="currentColor"/>
              <circle cx="85" cy="65" r="3" fill="currentColor"/>
              <circle cx="50" cy="82" r="3" fill="currentColor"/>
              <circle cx="35" cy="15" r="2.5" fill="currentColor"/>
              <circle cx="67" cy="72" r="2.5" fill="currentColor"/>
              <line x1="22" y1="30" x2="50" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
              <line x1="78" y1="28" x2="50" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
              <line x1="15" y1="62" x2="50" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
              <line x1="85" y1="65" x2="50" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
              <line x1="50" y1="82" x2="50" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
              <line x1="22" y1="30" x2="35" y2="15" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
            </svg>
            <span className="logo-text">alhenas</span>
          </button>

          <div className="nav-links">
            <button
              className={`nav-link ${currentPage === 'home' ? 'nav-link-active' : ''}`}
              onClick={() => handleNav('home')}
            >
              {t.nav.home}
            </button>
            <button
              className={`nav-link ${currentPage === 'bots' ? 'nav-link-active' : ''}`}
              onClick={() => handleNav('bots')}
            >
              {t.nav.bots}
            </button>
            <button
              className={`nav-link ${currentPage === 'tavern' ? 'nav-link-active' : ''}`}
              onClick={() => handleNav('tavern')}
            >
              {t.nav.tavern}
            </button>
          </div>

          <div className="nav-controls">
            <button className="control-btn" onClick={toggleTheme} title="Toggle theme">
              {theme === 'light' ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1" x2="12" y2="3"/>
                  <line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/>
                  <line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              )}
            </button>
            <button className="control-btn lang-btn" onClick={toggleLang}>
              {lang === 'ru' ? 'EN' : 'RU'}
            </button>
            {/* Mobile menu toggle */}
            <button
              className="control-btn mobile-menu-btn"
              onClick={() => setMobileOpen(o => !o)}
              aria-label="Menu"
            >
              {mobileOpen ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="8" x2="21" y2="8"/>
                  <line x1="3" y1="14" x2="21" y2="14"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="mobile-menu">
          <button
            className={`mobile-nav-link ${currentPage === 'home' ? 'nav-link-active' : ''}`}
            onClick={() => handleNav('home')}
          >
            {t.nav.home}
          </button>
          <button
            className={`mobile-nav-link ${currentPage === 'bots' ? 'nav-link-active' : ''}`}
            onClick={() => handleNav('bots')}
          >
            {t.nav.bots}
          </button>
          <button
            className={`mobile-nav-link ${currentPage === 'tavern' ? 'nav-link-active' : ''}`}
            onClick={() => handleNav('tavern')}
          >
            {t.nav.tavern}
          </button>
        </div>
      )}
    </>
  );
}
