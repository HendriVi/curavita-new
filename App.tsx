import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Footer from './components/Footer';

// Pages
import { StartWizard } from './pages/StartWizard';
import { SearchPage } from './pages/SearchPage';
import { ChecklistPage } from './pages/ChecklistPage';
import { CostsPage } from './pages/CostsPage';
import { ContactPage } from './pages/ContactPage';
import { AboutPage } from './pages/AboutPage';
import { LegalPage } from './pages/LegalPage';

function App() {
  const [page, setPage] = useState("home");
  const [navParams, setNavParams] = useState<any>({});

  const navigate = (targetPage: string, params: any = {}) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setPage(targetPage);
    setNavParams(params);
  };

  return (
    <div className="min-h-screen bg-rose-50/30 font-sans text-slate-900">
      <Navbar onNav={navigate} />

      {/* Page Routing Logic */}
      {page === 'home' && (
        <>
          <Hero onNav={navigate} />
          <Features />
        </>
      )}

      {page === 'start' && <StartWizard onNav={navigate} />}

      {page === 'search' && (
        // Key forces re-mount if params change
        <SearchPage key={JSON.stringify(navParams)} onNav={navigate} initialParams={navParams} />
      )}

      {page === 'checklist' && <ChecklistPage onNav={navigate} />}

      {page === 'costs' && <CostsPage onNav={navigate} />}

      {page === 'contact' && <ContactPage onNav={navigate} initialParams={navParams} />}

      {page === 'about' && <AboutPage onNav={navigate} />}

      {page === 'legal' && <LegalPage onNav={navigate} />}

      <Footer onNav={navigate} />
    </div>
  );
}

export default App;
