import React, { useState } from 'react';
import { Menu, X, Heart, Phone } from 'lucide-react';

interface NavbarProps {
    onNav: (page: string) => void;
}

const Navbar = ({ onNav }: NavbarProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleNav = (page: string) => {
        onNav(page);
        setIsOpen(false);
    }

    return (
        <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-rose-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    {/* Logo */}
                    <button onClick={() => handleNav('home')} className="flex items-center space-x-2 group">
                        <div className="bg-primary text-white p-2 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-md">
                            <Heart size={24} fill="currentColor" />
                        </div>
                        <span className="font-display font-bold text-2xl text-navy">Curavesta</span>
                    </button>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-2">
                        <NavButton onClick={() => handleNav('start')}>Assistent</NavButton>
                        <NavButton onClick={() => handleNav('search')}>Suche</NavButton>
                        <NavButton onClick={() => handleNav('checklist')}>Checkliste</NavButton>
                        <NavButton onClick={() => handleNav('costs')}>Kosten</NavButton>

                        <div className="ml-4 pl-4 border-l border-gray-200">
                            <button onClick={() => handleNav('contact')} className="flex items-center space-x-2 bg-navy text-white px-5 py-2.5 rounded-full font-medium hover:bg-opacity-90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                                <Phone size={18} />
                                <span>Hilfe anfragen</span>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-navy hover:text-primary transition-colors p-2"
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl animate-in slide-in-from-top-5">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        <MobileNavButton onClick={() => handleNav('start')}>Assistent starten</MobileNavButton>
                        <MobileNavButton onClick={() => handleNav('search')}>Anbieter suchen</MobileNavButton>
                        <MobileNavButton onClick={() => handleNav('checklist')}>Checkliste</MobileNavButton>
                        <MobileNavButton onClick={() => handleNav('costs')}>Kostenübersicht</MobileNavButton>
                        <div className="pt-4 mt-4 border-t border-gray-100">
                            <button onClick={() => handleNav('contact')} className="w-full flex justify-center items-center space-x-2 bg-navy text-white px-5 py-4 rounded-xl font-bold shadow-md">
                                <Phone size={20} />
                                <span>Hilfe anfragen</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

const NavButton = ({ children, onClick }: { children: React.ReactNode, onClick: () => void }) => (
    <button onClick={onClick} className="text-gray-600 hover:text-primary px-4 py-2 rounded-full hover:bg-rose-50 transition-all font-medium text-sm">
        {children}
    </button>
);

const MobileNavButton = ({ children, onClick }: { children: React.ReactNode, onClick: () => void }) => (
    <button
        onClick={onClick}
        className="block w-full text-left px-4 py-4 text-navy font-semibold hover:bg-rose-50 rounded-xl transition-colors"
    >
        {children}
    </button>
);

export default Navbar;
