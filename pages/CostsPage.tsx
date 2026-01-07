import React from 'react';

interface Props {
    onNav: (page: string) => void;
}

export function CostsPage({ onNav }: Props) {
    return (
        <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-display font-bold text-navy sm:text-4xl">Kosten verstehen</h1>
                <p className="mt-3 text-lg text-gray-600">
                    Eine einfache Übersicht. Preise variieren je nach Kanton und Pflegestufe.
                </p>
            </div>

            <div className="space-y-6">
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8">
                    <h3 className="text-xl font-bold text-navy mb-2">Pflegeheim</h3>
                    <div className="text-primary font-bold text-sm uppercase tracking-wider mb-4">Teuerste Option</div>
                    <p className="text-gray-700 leading-relaxed">
                        Die Kosten setzen sich aus <strong>Pflege</strong> (Krankenkasse/Staat), <strong>Betreuung</strong> und <strong>Hotellerie</strong> (Eigenanteil) zusammen.
                        <br /><br />
                        Relevant für Sie ist der monatliche Eigenanteil für Hotellerie & Betreuung. Dieser liegt oft zwischen <strong>CHF 6'000 und 9'000</strong> pro Monat, kann aber durch Ergänzungsleistungen (EL) unterstützt werden.
                    </p>
                </div>

                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8">
                    <h3 className="text-xl font-bold text-navy mb-2">Spitex (Zuhause)</h3>
                    <div className="text-green-600 font-bold text-sm uppercase tracking-wider mb-4">Flexibel</div>
                    <p className="text-gray-700 leading-relaxed">
                        Die Pflege zuhause wird meist stundenweise abgerechnet. Ärztlich verordnete Pflege zahlt grösstenteils die Krankenkasse.
                        <br /><br />
                        Hauswirtschaft und Betreuung müssen oft selbst bezahlt werden (ca. CHF 35 - 60 / Std.), es sei denn, Sie haben eine Zusatzversicherung.
                    </p>
                </div>

                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8">
                    <h3 className="text-xl font-bold text-navy mb-2">Seniorenwohnen</h3>
                    <div className="text-orange-500 font-bold text-sm uppercase tracking-wider mb-4">Miete + Service</div>
                    <p className="text-gray-700 leading-relaxed">
                        Sie zahlen eine Miete für die Wohnung plus eine Service-Pauschale (Notruf, Rezeption, Events).
                        <br /><br />
                        Pflegeleistungen werden bei Bedarf durch die interne oder externe Spitex erbracht und separat abgerechnet.
                    </p>
                    <div className="mt-6 flex gap-4">
                        <button onClick={() => onNav('search', { type: 'retirement_living' })} className="text-primary font-bold hover:underline">Seniorenwohnungen anzeigen →</button>
                    </div>
                </div>
            </div>
        </main>
    );
}
