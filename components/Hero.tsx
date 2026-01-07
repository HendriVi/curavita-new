import React from 'react';

const Hero = () => {
    return (
        <section className="relative bg-cream overflow-hidden pt-10 pb-20 lg:pt-20 lg:pb-28">
            {/* Background blobs for "Lottie" feel */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-rose-100 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-orange-100 rounded-full blur-3xl opacity-50"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

                    {/* Text Content */}
                    <div className="text-center lg:text-left">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-white border border-rose-200 shadow-sm mb-6">
                            <span className="text-primary font-bold text-sm uppercase tracking-wider">🇨🇭 Der Schweizer Nummer 1</span>
                        </div>

                        <h1 className="text-4xl lg:text-6xl font-display font-bold text-navy leading-tight mb-6">
                            Finden Sie das perfekte <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">Zuhause im Alter</span>
                        </h1>

                        <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                            Wir begleiten Sie und Ihre Liebsten auf dem Weg zur passenden Betreuung. Persönlich, unabhängig und kostenlos.
                        </p>

                        {/* Search Box */}
                        <div className="bg-white p-2 rounded-2xl shadow-xl border border-rose-50 max-w-xl mx-auto lg:mx-0">
                            <div className="flex flex-col sm:flex-row gap-2">
                                <input
                                    type="text"
                                    placeholder="Postleitzahl oder Ort"
                                    className="flex-1 px-6 py-4 rounded-xl text-navy placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-gray-50"
                                />
                                <button className="bg-primary hover:bg-rose-500 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                                    Suchen
                                </button>
                            </div>
                        </div>

                        <p className="mt-4 text-sm text-gray-500 flex items-center justify-center lg:justify-start gap-2">
                            <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                            Über 1'500 geprüfte Pflegeheime
                        </p>
                    </div>

                    {/* Image */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-rose-200 to-transparent rounded-[3rem] transform rotate-3 scale-95 opacity-60"></div>
                        <img
                            src="/hero-illustration.png"
                            alt="Glückliches älteres Paar in der Schweiz"
                            className="relative rounded-[2.5rem] shadow-2xl border-4 border-white transform hover:scale-[1.01] transition-transform duration-500"
                        />

                        {/* Float Card */}
                        <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-lg border border-rose-50 hidden sm:block">
                            <div className="flex items-center gap-3">
                                <div className="bg-green-100 p-2 rounded-full">
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-bold uppercase">Kundenzufriedenheit</p>
                                    <p className="text-navy font-bold text-lg">98% Glücklich</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Hero;
