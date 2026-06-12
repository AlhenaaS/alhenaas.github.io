import { useState } from 'react';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Bots from './pages/Bots';
import Tavern from './pages/Tavern';

type Page = 'home' | 'bots' | 'tavern';

function AppInner() {
  const [page, setPage] = useState<Page>('home');

  return (
    <div className="app-wrapper">
      <Navbar currentPage={page} setPage={setPage} />
      <div className="page-content">
        {page === 'home' && <Home setPage={setPage} />}
        {page === 'bots' && <Bots />}
        {page === 'tavern' && <Tavern />}
      </div>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  );
}
