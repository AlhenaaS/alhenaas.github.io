import { useApp } from '../context/AppContext';
import { siteContent, type Page } from '../content/siteContent';

interface HomeProps {
  setPage: (page: Page) => void;
}

export default function Home({ setPage }: HomeProps) {
  const { t } = useApp();

  return (
    <main className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-constellation">
          <svg width="340" height="280" viewBox="0 0 340 280" fill="none" className="constellation-svg">
            {/* Stars */}
            <circle cx="170" cy="140" r="5" fill="currentColor" className="star-pulse"/>
            <circle cx="80" cy="80" r="3.5" fill="currentColor" className="star-twinkle-1"/>
            <circle cx="260" cy="72" r="3.5" fill="currentColor" className="star-twinkle-2"/>
            <circle cx="50" cy="175" r="3.5" fill="currentColor" className="star-twinkle-3"/>
            <circle cx="290" cy="178" r="3.5" fill="currentColor" className="star-twinkle-1"/>
            <circle cx="170" cy="230" r="3.5" fill="currentColor" className="star-twinkle-2"/>
            <circle cx="110" cy="40" r="2.5" fill="currentColor" className="star-twinkle-3"/>
            <circle cx="230" cy="195" r="2.5" fill="currentColor" className="star-twinkle-1"/>
            <circle cx="60" cy="120" r="2" fill="currentColor" className="star-twinkle-2"/>
            <circle cx="305" cy="105" r="2" fill="currentColor" className="star-twinkle-3"/>
            <circle cx="195" cy="28" r="2" fill="currentColor" className="star-twinkle-1"/>
            {/* Lines */}
            <line x1="80" y1="80" x2="170" y2="140" stroke="currentColor" strokeWidth="0.8" opacity="0.3"/>
            <line x1="260" y1="72" x2="170" y2="140" stroke="currentColor" strokeWidth="0.8" opacity="0.3"/>
            <line x1="50" y1="175" x2="170" y2="140" stroke="currentColor" strokeWidth="0.8" opacity="0.3"/>
            <line x1="290" y1="178" x2="170" y2="140" stroke="currentColor" strokeWidth="0.8" opacity="0.3"/>
            <line x1="170" y1="230" x2="170" y2="140" stroke="currentColor" strokeWidth="0.8" opacity="0.3"/>
            <line x1="80" y1="80" x2="110" y2="40" stroke="currentColor" strokeWidth="0.8" opacity="0.3"/>
            <line x1="260" y1="72" x2="195" y2="28" stroke="currentColor" strokeWidth="0.8" opacity="0.3"/>
            <line x1="290" y1="178" x2="230" y2="195" stroke="currentColor" strokeWidth="0.8" opacity="0.3"/>
            <line x1="50" y1="175" x2="60" y2="120" stroke="currentColor" strokeWidth="0.8" opacity="0.3"/>
            <line x1="305" y1="105" x2="260" y2="72" stroke="currentColor" strokeWidth="0.8" opacity="0.3"/>
          </svg>
        </div>

          <div className="hero-content">
            <p className="hero-greeting">{t.home.greeting}</p>
          <h1 className="hero-title">{siteContent.brand.name}</h1>
          <p className="hero-subtitle">{t.home.subtitle}</p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => setPage('bots')}>
              {t.home.exploreBtn}
            </button>
            <button className="btn-secondary" onClick={() => setPage('tavern')}>
              {t.home.tavernBtn}
            </button>
          </div>
        </div>
      </section>

      {/* About polaroid */}
      <section className="about-section">
        <div className="polaroid polaroid-about">
          <div className="polaroid-img-area">
            <div className="polaroid-placeholder-art">
              <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="6" fill="currentColor" opacity="0.7"/>
                <circle cx="22" cy="30" r="4" fill="currentColor" opacity="0.5"/>
                <circle cx="78" cy="28" r="4" fill="currentColor" opacity="0.5"/>
                <circle cx="15" cy="62" r="4" fill="currentColor" opacity="0.5"/>
                <circle cx="85" cy="65" r="4" fill="currentColor" opacity="0.5"/>
                <circle cx="50" cy="82" r="4" fill="currentColor" opacity="0.5"/>
                <circle cx="35" cy="12" r="3" fill="currentColor" opacity="0.35"/>
                <circle cx="68" cy="74" r="3" fill="currentColor" opacity="0.35"/>
                <line x1="22" y1="30" x2="50" y2="50" stroke="currentColor" strokeWidth="1.2" opacity="0.25"/>
                <line x1="78" y1="28" x2="50" y2="50" stroke="currentColor" strokeWidth="1.2" opacity="0.25"/>
                <line x1="15" y1="62" x2="50" y2="50" stroke="currentColor" strokeWidth="1.2" opacity="0.25"/>
                <line x1="85" y1="65" x2="50" y2="50" stroke="currentColor" strokeWidth="1.2" opacity="0.25"/>
                <line x1="50" y1="82" x2="50" y2="50" stroke="currentColor" strokeWidth="1.2" opacity="0.25"/>
              </svg>
            </div>
          </div>
          <div className="polaroid-caption">
            <p className="about-text">{t.home.about}</p>
            <span className="polaroid-label">{siteContent.home.aboutCaption}</span>
          </div>
        </div>
      </section>

      {/* Social links polaroids */}
      <section className="socials-section">
        <div className="socials-grid">
          {siteContent.socialLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="polaroid polaroid-social"
              style={{ '--tilt': `${(i % 2 === 0 ? 1 : -1) * (1 + i * 0.5)}deg` } as React.CSSProperties}
            >
              <div className="polaroid-img-area social-img-area">
                <span className="social-letter" style={{ color: link.color }}>
                  {link.label.charAt(0)}
                </span>
              </div>
              <div className="polaroid-caption">
                <span className="polaroid-label">{link.label}</span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
