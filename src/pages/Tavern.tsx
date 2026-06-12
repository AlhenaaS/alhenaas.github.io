import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { siteContent, type Lang, type TavernTab } from '../content/siteContent';

interface TavernItem {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  downloadUrl?: string;
  repoUrl?: string;
  url?: string;
  version?: string;
  type?: string;
}

interface TavernData {
  presets: TavernItem[];
  extensions: TavernItem[];
  regex: TavernItem[];
  tutorials: TavernItem[];
  other: TavernItem[];
}

type TabKey = TavernTab;

const TAB_ICONS = Object.fromEntries(
  siteContent.tavern.tabs.map(tab => [tab.key, tab.icon])
) as Record<TabKey, string>;
const DEFAULT_TAB = siteContent.tavern.tabs[0].key;

function TavernCard({ item, lang, t, tabKey }: { item: TavernItem; lang: Lang; t: any; tabKey: TabKey }) {
  return (
    <div className="tavern-card polaroid polaroid-tavern">
      <div className="tavern-card-inner">
        <div className="tavern-card-icon">{TAB_ICONS[tabKey]}</div>
        <div className="tavern-card-content">
          <h3 className="tavern-card-title">{lang === 'ru' ? item.name : item.nameEn}</h3>
          {item.version && (
            <span className="tavern-version">{t.tavern.version} {item.version}</span>
          )}
          <p className="tavern-card-desc">{lang === 'ru' ? item.description : item.descriptionEn}</p>
          <div className="tavern-card-actions">
            {item.downloadUrl && (
              <a href={item.downloadUrl} className="btn-small" target="_blank" rel="noopener noreferrer">
                ↓ {t.tavern.download}
              </a>
            )}
            {item.repoUrl && (
              <a href={item.repoUrl} className="btn-small btn-outline" target="_blank" rel="noopener noreferrer">
                ↗ {t.tavern.viewRepo}
              </a>
            )}
            {item.url && (
              <a href={item.url} className="btn-small btn-outline" target="_blank" rel="noopener noreferrer">
                → {t.tavern.readMore}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Tavern() {
  const { t, lang } = useApp();
  const [data, setData] = useState<TavernData | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>(DEFAULT_TAB);

  useEffect(() => {
    fetch(siteContent.data.tavern)
      .then(r => r.json())
      .then(setData)
      .catch(() => setData(null));
  }, []);

  const tabs = siteContent.tavern.tabs.map(tab => ({
    key: tab.key,
    label: t.tavern[tab.labelKey],
  }));

  const currentItems = data ? data[activeTab] : [];

  return (
    <main className="tavern-page">
      <div className="page-header">
        <h1 className="page-title">{t.tavern.title}</h1>
        <p className="page-subtitle">{t.tavern.subtitle}</p>
      </div>

      <div className="tabs-bar">
        {tabs.map(tab => (
          <button
            key={tab.key}
            className={`tab-btn ${activeTab === tab.key ? 'tab-btn-active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            <span className="tab-icon">{TAB_ICONS[tab.key]}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="tavern-grid">
        {currentItems && currentItems.length > 0 ? (
          currentItems.map(item => (
            <TavernCard
              key={item.id}
              item={item}
              lang={lang}
              t={t}
              tabKey={activeTab}
            />
          ))
        ) : (
          <div className="no-results">{siteContent.tavern.emptyText}</div>
        )}
      </div>
    </main>
  );
}
