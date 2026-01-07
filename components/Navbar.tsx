import React, { useState } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Pflegeheim finden', href: '#' },
        { name: 'Ratgeber', href: '#' },
        { name: 'Über uns', href: '#' },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-cream/80 backdrop-blur-md border-b border-rose-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <span className="font-display font-bold text-2xl text-navy">
                            Cura<span className="text-primary">Vesta</span>
                        </span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-4">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="font-medium text-navy hover:text-primary transition-colors px-4 py-2 rounded-full hover:bg-white"
                            >
                                {link.name}
                            </a>
                        ))}
                        <button className="bg-primary hover:bg-rose-500 text-white font-bold py-2.5 px-6 rounded-full transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                            Kontakt
                        </button>
                    </div>

                    {/* Mobile Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-navy hover:text-primary focus:outline-none p-2"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-rose-100 absolute w-full shadow-xl">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="block px-3 py-3 rounded-xl text-base font-medium text-navy hover:bg-cream hover:text-primary"
                            >
                                {link.name}
                            </a>
                        ))}
                        <button className="w-full mt-4 bg-primary text-white font-bold py-3 rounded-xl shadow-md">
                            Kontakt aufnehmen
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
