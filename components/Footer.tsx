import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-navy text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-8 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <span className="font-display font-bold text-2xl text-white block mb-4">
                            Cura<span className="text-primary">Vesta</span>
                        </span>
                        <p className="text-gray-400 max-w-sm">
                            Der führende Schweizer Pflegekompass. Wir verbinden Menschen mit den besten Pflegeeinrichtungen. Menschlich, Kompetent, Nah.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-4">Links</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-primary transition-colors">Über Uns</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Pflegeheime</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Für Einrichtungen</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Karriere</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-4">Rechtliches</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-primary transition-colors">Impressum</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Datenschutz</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">AGB</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-700 pt-8 text-center text-gray-500 text-sm">
                    &copy; {new Date().getFullYear()} Curavesta Schweiz. Alle Rechte vorbehalten.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
