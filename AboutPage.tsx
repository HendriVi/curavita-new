import React from 'react';

interface Props {
    onNav: (page: string) => void;
}

export function AboutPage({ onNav }: Props) {
    return (
        <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
            <div className="text-center mb-12">
                <h1 className="text-3xl font-display font-bold text-navy sm:text-4xl">Über Curavesta</h1>
                <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                    Wir sind der Schweizer Pflegekompass. Unsere Mission ist es, Transparenz in den Pflegemarkt zu bringen und Familien in schwierigen Zeiten zu entlasten.
                </p>
            </div>

            <div className="space-y-12">
                {/* Mission Section */}
                <div className="bg-white rounded-3xl border border-rose-100 shadow-sm p-8 flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-navy mb-4">Warum wir das tun</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Die Suche nach einem Pflegeplatz ist oft von Zeitdruck und Unsicherheit geprägt. Wo gibt es freie Plätze? Was kostet es wirklich? Welche Betreuung ist die richtige?
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            Curavesta schliesst diese Lücke. Wir verbinden suchende Familien direkt mit geprüften Pflegeanbietern in der Schweiz. Kostenlos, unabhängig und menschlich.
                        </p>
                    </div>
                    <div className="w-full md:w-1/3 bg-rose-50 rounded-2xl p-6 text-center">
                        <div className="text-4xl font-bold text-primary mb-2">1'500+</div>
                        <div className="text-gray-600 font-medium">Geprüfte Anbieter</div>
                        <div className="mt-6 text-4xl font-bold text-navy mb-2">100%</div>
                        <div className="text-gray-600 font-medium">Kostenlos für Suchende</div>
                    </div>
                </div>

                {/* Team Section (Placeholder) */}
                <div>
                    <h2 className="text-2xl font-bold text-navy mb-6 text-center">Unser Team</h2>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                        <TeamMember name="Sarah Müller" role="Pflegefachfrau & Beratung" />
                        <TeamMember name="Thomas Frei" role="Geschäftsleitung" />
                        <TeamMember name="Elena Rossi" role="Partner Management" />
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center py-8">
                    <h3 className="text-xl font-bold text-navy mb-4">Haben Sie Fragen an uns?</h3>
                    <button onClick={() => onNav('contact')} className="px-8 py-3 bg-navy text-white font-bold rounded-2xl shadow-md hover:bg-primary transition-all">
                        Kontakt aufnehmen
                    </button>
                </div>
            </div>
        </main>
    );
}

function TeamMember({ name, role }: { name: string, role: string }) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 text-center hover:shadow-md transition-shadow">
            <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                <svg className="w-full h-full text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            </div>
            <div className="font-bold text-navy text-lg">{name}</div>
            <div className="text-primary text-sm font-medium">{role}</div>
        </div>
    )
}
