import React from 'react';

interface Props {
    onNav: (page: string) => void;
}

export function LegalPage({ onNav }: Props) {
    return (
        <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 text-gray-700 leading-relaxed">
            <h1 className="text-3xl font-display font-bold text-navy mb-8">Impressum & Datenschutz</h1>

            <section className="mb-8">
                <h2 className="text-xl font-bold text-navy mb-4">Kontaktadresse</h2>
                <p>
                    Curavesta Schweiz AG<br />
                    Musterstrasse 123<br />
                    8000 Zürich<br />
                    Schweiz
                </p>
                <p className="mt-4">
                    E-Mail: info@curavesta.ch<br />
                    Telefon: +41 44 123 45 67
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-bold text-navy mb-4">Haftungsausschluss</h2>
                <p>
                    Der Autor übernimmt keinerlei Gewähr hinsichtlich der inhaltlichen Richtigkeit, Genauigkeit, Aktualität, Zuverlässigkeit und Vollständigkeit der Informationen. Haftungsansprüche gegen den Autor wegen Schäden materieller oder immaterieller Art, welche aus dem Zugriff oder der Nutzung bzw. Nichtnutzung der veröffentlichten Informationen, durch Missbrauch der Verbindung oder durch technische Störungen entstanden sind, werden ausgeschlossen.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-bold text-navy mb-4">Urheberrechte</h2>
                <p>
                    Die Urheber- und alle anderen Rechte an Inhalten, Bildern, Fotos oder anderen Dateien auf der Website gehören ausschliesslich der Firma Curavesta Schweiz AG oder den speziell genannten Rechtsinhabern. Für die Reproduktion jeglicher Elemente ist die schriftliche Zustimmung der Urheberrechtsträger im Voraus einzuholen.
                </p>
            </section>

            <div className="mt-12 pt-8 border-t border-gray-200">
                <button onClick={() => onNav('home')} className="text-primary font-bold hover:underline">
                    ← Zurück zur Startseite
                </button>
            </div>
        </main>
    );
}
