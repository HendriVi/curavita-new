import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

interface HeroProps {
    onNav: (page: string, params?: any) => void;
}

const Hero = ({ onNav }: HeroProps) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        onNav('search', { q: searchTerm });
    }

    return (
        <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Text Content */}
                    <div className="text-center lg:text-left lg:w-1/2">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-white border border-rose-200 shadow-sm mb-6">
                            <span className="text-primary font-bold text-sm uppercase tracking-wider">🇨🇭 Die Schweizer Nummer 1</span>
                        </div>

                        <h1 className="text-4xl lg:text-6xl font-display font-bold text-navy leading-tight mb-6">
                            Pflege finden, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                                ganz einfach.
                            </span>
                        </h1>

                        <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                            Wir helfen Ihnen, das passende Pflegeheim, die beste Spitex oder ideales Seniorenwohnen zu finden. Kostenlos & unabhängig.
                        </p>

                        {/* Search Box */}
                        <form onSubmit={handleSearch} className="bg-white p-2 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-rose-50 flex flex-col sm:flex-row gap-2 max-w-xl mx-auto lg:mx-0">
                            <div className="flex-1 flex items-center px-4 h-14 bg-gray-50 rounded-2xl border border-transparent focus-within:bg-white focus-within:border-primary transition-colors">
                                <MapPin className="text-gray-400 mr-3" size={20} />
                                <input
                                    type="text"
                                    placeholder="Ort oder PLZ eingeben..."
                                    className="bg-transparent w-full outline-none text-navy placeholder:text-gray-400 font-medium"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="h-14 px-8 bg-primary hover:bg-secondary text-white font-bold rounded-2xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                                <Search size={20} />
                                <span>Finden</span>
                            </button>
                        </form>

                        <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start text-sm font-semibold text-gray-500">
                            <button onClick={() => onNav('search', { type: 'care_home' })} className="hover:text-primary transition-colors">• Pflegeheim</button>
                            <button onClick={() => onNav('search', { type: 'home_care' })} className="hover:text-primary transition-colors">• Spitex</button>
                            <button onClick={() => onNav('search', { type: 'retirement_living' })} className="hover:text-primary transition-colors">• Betreutes Wohnen</button>
                        </div>
                    </div>

                    {/* Image / Illustration */}
                    <div className="lg:w-1/2 relative">
                        <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white transform rotate-1 hover:rotate-0 transition-transform duration-500">
                            <img
                                src="/hero_illustration.png"
                                alt="Seniorinnen und Senioren geniessen den Tag"
                                className="w-full h-auto"
                            />

                            {/* Floating Badge */}
                            <button onClick={() => onNav('start')} className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-rose-100 max-w-xs text-left hover:scale-105 transition-transform text-navy">
                                <div className="flex items-center gap-3 mb-1">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    <span className="font-bold text-xs uppercase tracking-wider text-gray-500">Assistent</span>
                                </div>
                                <div className="font-bold">Unsicher? Starten Sie hier.</div>
                                <div className="text-sm text-gray-500">In 3 Schritten zur Lösung →</div>
                            </button>
                        </div>

                        {/* Decor Dots */}
                        <div className="absolute -top-12 -right-12 text-rose-200">
                            <svg width="100" height="100" viewBox="0 0 100 100" fill="currentColor">
                                <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                                    <circle cx="2" cy="2" r="2" />
                                </pattern>
                                <rect width="100" height="100" fill="url(#dots)" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
