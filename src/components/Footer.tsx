import { useApp } from '../context/AppContext';

const SOCIAL_LINKS = [
  { label: 'Telegram', url: 'https://t.me/alhenas', icon: 'tg' },
  { label: 'Boosty', url: 'https://boosty.to/alhenas', icon: 'boosty' },
  { label: 'Chub.ai', url: 'https://chub.ai/alhenas', icon: 'chub' },
  { label: 'GitHub', url: 'https://github.com/alhenas', icon: 'gh' },
];

function SocialIcon({ icon }: { icon: string }) {
  if (icon === 'tg') return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L8.32 13.617l-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.537-.194 1.006.131.833.94z"/>
    </svg>
  );
  if (icon === 'gh') return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  );
  if (icon === 'boosty') return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>
  );
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
  );
}

export default function Footer() {
  const { t } = useApp();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <svg className="footer-star" width="20" height="20" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="4" fill="currentColor"/>
            <circle cx="22" cy="30" r="3" fill="currentColor"/>
            <circle cx="78" cy="28" r="3" fill="currentColor"/>
            <circle cx="15" cy="62" r="3" fill="currentColor"/>
            <circle cx="85" cy="65" r="3" fill="currentColor"/>
            <circle cx="50" cy="82" r="3" fill="currentColor"/>
            <line x1="22" y1="30" x2="50" y2="50" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
            <line x1="78" y1="28" x2="50" y2="50" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
            <line x1="15" y1="62" x2="50" y2="50" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
            <line x1="85" y1="65" x2="50" y2="50" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
            <line x1="50" y1="82" x2="50" y2="50" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
          </svg>
          <span>{t.footer.madeBy}</span>
        </div>
        <div className="footer-links">
          <span className="footer-links-label">{t.footer.links}:</span>
          {SOCIAL_LINKS.map(link => (
            <a
              key={link.icon}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
            >
              <SocialIcon icon={link.icon} />
              <span>{link.label}</span>
            </a>
          ))}
        </div>
        <div className="footer-copy">
          © 2025 alhenas · {t.footer.rights}
        </div>
      </div>
    </footer>
  );
}
