
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div 
              className="flex items-center cursor-pointer" 
              onClick={() => setActiveTab('home')}
            >
              <div className="w-8 h-8 bg-red-600 rounded-md flex items-center justify-center text-white font-bold mr-2">C</div>
              <span className="text-2xl font-serif font-bold tracking-tight text-slate-800">CuraVesta</span>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={() => setActiveTab('home')}
                className={`${activeTab === 'home' ? 'text-red-600 border-b-2 border-red-600' : 'text-slate-500 hover:text-slate-700'} px-1 py-4 text-sm font-medium transition-colors`}
              >
                Suche
              </button>
              <button 
                onClick={() => setActiveTab('advisor')}
                className={`${activeTab === 'advisor' ? 'text-red-600 border-b-2 border-red-600' : 'text-slate-500 hover:text-slate-700'} px-1 py-4 text-sm font-medium transition-colors`}
              >
                Berater-Konsole
              </button>
              <button 
                onClick={() => setActiveTab('provider')}
                className={`${activeTab === 'provider' ? 'text-red-600 border-b-2 border-red-600' : 'text-slate-500 hover:text-slate-700'} px-1 py-4 text-sm font-medium transition-colors`}
              >
                Anbieter-Portal
              </button>
            </nav>

            <div className="flex items-center">
              <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded border border-slate-200 uppercase tracking-widest font-semibold">CH Edition</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center text-white mb-4">
                <div className="w-6 h-6 bg-red-600 rounded flex items-center justify-center text-white font-bold mr-2 text-xs">C</div>
                <span className="text-xl font-serif font-bold">CuraVesta</span>
              </div>
              <p className="max-w-sm text-sm">
                Der unabhängige Wegweiser für Pflege und Wohnen im Alter in der Schweiz. Wir helfen Familien, die beste Entscheidung für ihre Liebsten zu treffen.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Über uns</a></li>
                <li><a href="#" className="hover:text-white">Ratgeber Pflegekosten</a></li>
                <li><a href="#" className="hover:text-white">Kontakt</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Rechtliches</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Impressum</a></li>
                <li><a href="#" className="hover:text-white">Datenschutz (FADP/DSG)</a></li>
                <li><a href="#" className="hover:text-white">AGB</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-800 text-xs text-center">
            <p>
              Haftungsausschluss: Die auf CuraVesta bereitgestellten Informationen dienen lediglich der allgemeinen Information und stellen keine medizinische, rechtliche oder versicherungstechnische Beratung dar. Kostenangaben sind Richtwerte.
            </p>
            <p className="mt-4">&copy; {new Date().getFullYear()} CuraVesta AG. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
