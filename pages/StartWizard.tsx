import React, { useState } from 'react';
import { cn } from '../lib/utils';

interface StartWizardProps {
    onNav: (page: string, params?: any) => void;
}

export function StartWizard({ onNav }: StartWizardProps) {
    const [step, setStep] = useState(1);
    const [need, setNeed] = useState<string | null>(null);
    const [place, setPlace] = useState("");
    const [urgency, setUrgency] = useState<string | null>(null);

    const finish = () => {
        const q = [place, urgency === "now" ? "Sofort verfügbar" : ""].filter(Boolean).join(" ");
        const availability = urgency === "now" ? "Sofort verfügbar" : "Alle";

        // Auto-navigate to SearchPage with filters pre-set
        onNav('search', { q, availability, type: need });
    };

    return (
        <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
            <div className="max-w-2xl mx-auto">
                <div className="mb-8 text-center">
                    <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-900 text-sm font-semibold mb-4">
                        Schritt {step} von 3
                    </span>
                    <h1 className="text-3xl font-display font-bold text-navy sm:text-4xl">Jetzt starten</h1>
                    <p className="mt-3 text-lg leading-relaxed text-gray-600">
                        Wir stellen drei einfache Fragen. Danach sehen Sie passende Optionen.
                    </p>
                </div>

                {step === 1 && (
                    <div className="bg-white rounded-3xl border border-rose-100 shadow-sm p-6 sm:p-8">
                        <div className="text-xl font-bold text-navy mb-6">Wobei brauchen Sie Hilfe?</div>
                        <div className="grid gap-3">
                            <WizardOption title="Pflegeheim" subtitle="Rund um die Uhr Betreuung" onClick={() => { setNeed("care_home"); setStep(2); }} />
                            <WizardOption title="Spitex & Betreuung" subtitle="Unterstützung zuhause" onClick={() => { setNeed("home_care"); setStep(2); }} />
                            <WizardOption title="Seniorenwohnen" subtitle="Selbstständig, aber sicher" onClick={() => { setNeed("retirement_living"); setStep(2); }} />
                            <button
                                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-left font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
                                onClick={() => onNav('contact')}
                            >
                                Ich bin nicht sicher — bitte helfen
                            </button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="bg-white rounded-3xl border border-rose-100 shadow-sm p-6 sm:p-8">
                        <div className="text-xl font-bold text-navy mb-2">Wo soll es sein?</div>
                        <div className="text-gray-500 mb-6">Ort oder Kanton genügt.</div>

                        <input
                            className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-4 text-lg outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                            placeholder="z. B. Aarau oder Aargau"
                            value={place}
                            onChange={(e) => setPlace(e.target.value)}
                            autoFocus
                        />

                        <div className="mt-8 grid gap-3 sm:grid-cols-2">
                            <button onClick={() => setStep(1)} className="px-6 py-3 rounded-full border border-gray-200 font-semibold text-gray-600 hover:bg-gray-50">Zurück</button>
                            <button onClick={() => setStep(3)} className="px-6 py-3 rounded-full bg-primary text-white font-semibold hover:bg-red-500 shadow-md transform hover:scale-[1.02] transition-all">Weiter</button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="bg-white rounded-3xl border border-rose-100 shadow-sm p-6 sm:p-8">
                        <div className="text-xl font-bold text-navy mb-6">Wie dringend ist es?</div>
                        <div className="grid gap-3">
                            <WizardOption title="So schnell wie möglich" subtitle="Ich brauche rasch Optionen" onClick={() => { setUrgency("now"); finish(); }} />
                            <WizardOption title="In den nächsten Wochen" subtitle="Ich plane, aber es eilt nicht" onClick={() => { setUrgency("soon"); finish(); }} />
                            <WizardOption title="Ich informiere mich nur" subtitle="Ich will den Markt verstehen" onClick={() => { setUrgency("later"); finish(); }} />
                        </div>
                        <div className="mt-8">
                            <button onClick={() => setStep(2)} className="px-6 py-3 rounded-full border border-gray-200 font-semibold text-gray-600 hover:bg-gray-50">Zurück</button>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}

function WizardOption({ title, subtitle, onClick }: { title: string, subtitle: string, onClick: () => void }) {
    return (
        <button
            className="w-full rounded-2xl border border-rose-100 bg-white px-6 py-5 text-left shadow-sm hover:shadow-md hover:border-rose-200 transition-all group"
            onClick={onClick}
        >
            <div className="text-lg font-bold text-navy group-hover:text-primary transition-colors">{title}</div>
            <div className="mt-1 text-gray-500">{subtitle}</div>
        </button>
    );
}
