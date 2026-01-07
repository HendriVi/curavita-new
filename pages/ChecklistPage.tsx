import React from 'react';

interface Props {
    onNav: (page: string) => void;
}

export function ChecklistPage({ onNav }: Props) {
    return (
        <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-display font-bold text-navy sm:text-4xl">Checkliste</h1>
                <p className="mt-3 text-lg text-gray-600">
                    Die wichtigsten Fragen, damit Sie schneller Klarheit bekommen.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <CheckCard title="1) Bedarf" items={[
                    "Welche Unterstützung ist wirklich nötig (Pflege, Betreuung, Haushalt)?",
                    "Gibt es Demenz, Sturzrisiko, Nachtdienst-Bedarf?",
                    "Welche Medikamente oder Hilfsmittel werden benötigt?"
                ]} />

                <CheckCard title="2) Ort & Alltag" items={[
                    "Wie weit darf es weg sein (Nähe zu Angehörigen, Arzt)?",
                    "Was ist wichtig im Alltag (Essen, Aktivitäten, Ruhe)?",
                    "Sind Haustiere oder eigene Möbel erlaubt?"
                ]} />

                <CheckCard title="3) Kosten & Vertrag" items={[
                    "Was ist der monatliche Eigenanteil?",
                    "Welche Leistungen sind inklusive, welche kosten extra?",
                    "Wie sind die Kündigungsfristen?"
                ]} />

                <div className="bg-rose-50 rounded-3xl border border-rose-100 p-8 flex flex-col justify-center items-center text-center">
                    <h3 className="text-xl font-bold text-navy mb-2">Nächster Schritt</h3>
                    <p className="text-gray-700 mb-6">Wenn Sie möchten, helfen wir beim Sortieren und Kontaktieren.</p>
                    <button onClick={() => onNav('contact')} className="px-6 py-3 bg-primary text-white font-bold rounded-2xl shadow-md hover:bg-red-500 transition-all w-full md:w-auto">
                        Hilfe anfragen
                    </button>
                </div>
            </div>
        </main>
    );
}

function CheckCard({ title, items }: { title: string, items: string[] }) {
    return (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8">
            <div className="text-xl font-bold text-navy mb-4">{title}</div>
            <ul className="space-y-3">
                {items.map((item, i) => (
                    <li key={i} className="flex gap-3 text-gray-700 leading-relaxed">
                        <span className="text-primary font-bold">•</span>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    )
}
