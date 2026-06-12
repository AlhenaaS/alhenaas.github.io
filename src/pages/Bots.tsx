import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { siteContent, type Lang } from '../content/siteContent';

interface Lorebook {
  name: string;
  nameEn: string;
  url: string;
}

interface Alt {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  image: string;
  downloadUrl: string;
}

interface Bot {
  id: string;
  name: string;
  nameEn: string;
  tags: string[];
  tagsEn: string[];
  universe: string;
  universeEn: string;
  gender: string;
  genderEn: string;
  description: string;
  descriptionEn: string;
  image: string;
  downloadUrl: string;
  lorebooks: Lorebook[];
  alts: Alt[];
}

interface AltModalProps {
  alt: Alt;
  lang: Lang;
  t: any;
  onClose: () => void;
}

function AltModal({ alt, lang, t, onClose }: AltModalProps) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-polaroid">
          <div className="modal-img-area">
            {alt.image ? (
              <img src={alt.image} alt={lang === 'ru' ? alt.name : alt.nameEn} className="modal-img" />
            ) : (
              <div className="modal-img-placeholder">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
              </div>
            )}
          </div>
          <div className="modal-info">
            <div className="modal-alt-badge">{t.bots.altLabel}</div>
            <h2 className="modal-title">{lang === 'ru' ? alt.name : alt.nameEn}</h2>
            <p className="modal-description">{lang === 'ru' ? alt.description : alt.descriptionEn}</p>
            <div className="modal-actions">
              {alt.downloadUrl ? (
                <a href={alt.downloadUrl} className="btn-download" target="_blank" rel="noopener noreferrer">
                  ↓ {t.bots.downloadAlt}
                </a>
              ) : (
                <span className="btn-disabled">↓ {t.bots.noLink}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface BotModalProps {
  bot: Bot;
  lang: Lang;
  t: any;
  onClose: () => void;
}

function BotModal({ bot, lang, t, onClose }: BotModalProps) {
  const [activeAlt, setActiveAlt] = useState<Alt | null>(null);

  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-card modal-card-bot" onClick={e => e.stopPropagation()}>
          <button className="modal-close" onClick={onClose}>✕</button>
          <div className="modal-polaroid">
            <div className="modal-img-area">
              {bot.image ? (
                <img src={bot.image} alt={lang === 'ru' ? bot.name : bot.nameEn} className="modal-img" />
              ) : (
                <div className="modal-img-placeholder">
                  <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                </div>
              )}
            </div>

            <div className="modal-info">
              <h2 className="modal-title">{lang === 'ru' ? bot.name : bot.nameEn}</h2>
              <div className="modal-meta">
                <span className="meta-chip">{lang === 'ru' ? bot.universe : bot.universeEn}</span>
                <span className="meta-chip meta-chip-gender">{lang === 'ru' ? bot.gender : bot.genderEn}</span>
              </div>
              <div className="modal-tags">
                {(lang === 'ru' ? bot.tags : bot.tagsEn).map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              <p className="modal-description">{lang === 'ru' ? bot.description : bot.descriptionEn}</p>

              <div className="modal-actions">
                {bot.downloadUrl ? (
                  <a href={bot.downloadUrl} className="btn-download" target="_blank" rel="noopener noreferrer">
                    ↓ {t.bots.download}
                  </a>
                ) : (
                  <span className="btn-disabled">↓ {t.bots.noLink}</span>
                )}
              </div>

              {bot.lorebooks && bot.lorebooks.length > 0 && (
                <div className="modal-section">
                  <h3 className="modal-section-title">{t.bots.lorebooks}</h3>
                  <div className="lorebook-list">
                    {bot.lorebooks.map((lb, i) => (
                      <div key={i} className="lorebook-item">
                        <span className="lorebook-name">{lang === 'ru' ? lb.name : lb.nameEn}</span>
                        {lb.url ? (
                          <a href={lb.url} className="btn-small" target="_blank" rel="noopener noreferrer">
                            ↓ {t.bots.downloadLorebook}
                          </a>
                        ) : (
                          <span className="btn-small-disabled">{t.bots.noLink}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {bot.alts && bot.alts.length > 0 && (
                <div className="modal-section">
                  <h3 className="modal-section-title">{t.bots.alts}</h3>
                  <div className="alts-list">
                    {bot.alts.map(alt => (
                      <button
                        key={alt.id}
                        className="alt-card"
                        onClick={() => setActiveAlt(alt)}
                      >
                        <div className="alt-polaroid-mini">
                          {alt.image ? (
                            <img src={alt.image} alt={lang === 'ru' ? alt.name : alt.nameEn} className="alt-img-mini" />
                          ) : (
                            <div className="alt-img-placeholder-mini">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <rect x="3" y="3" width="18" height="18" rx="2"/>
                                <circle cx="8.5" cy="8.5" r="1.5"/>
                                <polyline points="21 15 16 10 5 21"/>
                              </svg>
                            </div>
                          )}
                        </div>
                        <span className="alt-name">{lang === 'ru' ? alt.name : alt.nameEn}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {activeAlt && (
        <AltModal
          alt={activeAlt}
          lang={lang}
          t={t}
          onClose={() => setActiveAlt(null)}
        />
      )}
    </>
  );
}

export default function Bots() {
  const { t, lang } = useApp();
  const [bots, setBots] = useState<Bot[]>([]);
  const [search, setSearch] = useState('');
  const [filterGender, setFilterGender] = useState('');
  const [filterUniverse, setFilterUniverse] = useState('');
  const [filterTag, setFilterTag] = useState('');
  const [selectedBot, setSelectedBot] = useState<Bot | null>(null);

  useEffect(() => {
    fetch(siteContent.data.bots)
      .then(r => r.json())
      .then(setBots)
      .catch(() => setBots([]));
  }, []);

  const universes = [...new Set(bots.map(b => lang === 'ru' ? b.universe : b.universeEn))];
  const allTags = [...new Set(bots.flatMap(b => lang === 'ru' ? b.tags : b.tagsEn))];

  const filtered = bots.filter(bot => {
    const name = lang === 'ru' ? bot.name : bot.nameEn;
    const tags = lang === 'ru' ? bot.tags : bot.tagsEn;
    const universe = lang === 'ru' ? bot.universe : bot.universeEn;
    const gender = lang === 'ru' ? bot.gender : bot.genderEn;

    if (search && !name.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterGender && gender !== filterGender) return false;
    if (filterUniverse && universe !== filterUniverse) return false;
    if (filterTag && !tags.includes(filterTag)) return false;
    return true;
  });

  const genderOptions = siteContent.bots.genders.map(gender => ({
    value: gender.value[lang],
    label: t.bots[gender.labelKey],
  }));

  return (
    <main className="bots-page">
      <div className="page-header">
        <h1 className="page-title">{t.bots.title}</h1>
        <p className="page-subtitle">{t.bots.subtitle}</p>
      </div>

      <div className="filters-bar">
        <input
          type="text"
          className="search-input"
          placeholder={t.bots.search}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select
          className="filter-select"
          value={filterGender}
          onChange={e => setFilterGender(e.target.value)}
        >
          <option value="">{t.bots.filterGender}: {t.bots.all}</option>
          {genderOptions.map(g => (
            <option key={g.value} value={g.value}>{g.label}</option>
          ))}
        </select>

        <select
          className="filter-select"
          value={filterUniverse}
          onChange={e => setFilterUniverse(e.target.value)}
        >
          <option value="">{t.bots.filterUniverse}: {t.bots.all}</option>
          {universes.map(u => (
            <option key={u} value={u}>{u}</option>
          ))}
        </select>

        <select
          className="filter-select"
          value={filterTag}
          onChange={e => setFilterTag(e.target.value)}
        >
          <option value="">{t.bots.filterTag}: {t.bots.all}</option>
          {allTags.map(tag => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="no-results">{t.bots.noResults}</div>
      ) : (
        <div className="bots-grid">
          {filtered.map((bot, i) => (
            <button
              key={bot.id}
              className="polaroid polaroid-bot"
              style={{ '--tilt': `${(i % 3 === 0 ? -1 : i % 3 === 1 ? 1 : -0.5) * 1.2}deg` } as React.CSSProperties}
              onClick={() => setSelectedBot(bot)}
            >
              <div className="polaroid-img-area bot-img-area">
                {bot.image ? (
                  <img src={bot.image} alt={lang === 'ru' ? bot.name : bot.nameEn} className="bot-img" />
                ) : (
                  <div className="bot-img-placeholder">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <polyline points="21 15 16 10 5 21"/>
                    </svg>
                  </div>
                )}
                {bot.alts && bot.alts.length > 0 && (
                  <div className="alt-badge">{siteContent.bots.altBadgePrefix}{bot.alts.length}</div>
                )}
              </div>
              <div className="polaroid-caption">
                <span className="polaroid-label">{lang === 'ru' ? bot.name : bot.nameEn}</span>
                <span className="polaroid-sub">{lang === 'ru' ? bot.universe : bot.universeEn}</span>
                <div className="bot-tags-preview">
                  {(lang === 'ru' ? bot.tags : bot.tagsEn).slice(0, 2).map(tag => (
                    <span key={tag} className="tag tag-small">{tag}</span>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {selectedBot && (
        <BotModal
          bot={selectedBot}
          lang={lang}
          t={t}
          onClose={() => setSelectedBot(null)}
        />
      )}
    </main>
  );
}
