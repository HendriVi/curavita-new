import React, { useState } from 'react';

interface Props {
    onNav: (page: string) => void;
    initialParams?: any;
}

export function ContactPage({ onNav, initialParams }: Props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [msg, setMsg] = useState(initialParams?.provider
        ? `Ich interessiere mich für: ${initialParams.provider}\n\nMeine Fragen:`
        : "");

    const handleSubmit = () => {
        alert("Vielen Dank! Ihre Anfrage wurde in dieser Demo simuliert.");
        onNav('home');
    }

    return (
        <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
            <div className="max-w-2xl mx-auto text-center mb-10">
                <h1 className="text-3xl font-display font-bold text-navy sm:text-4xl">Hilfe anfragen</h1>
                <p className="mt-3 text-lg text-gray-600">
                    Schreiben Sie kurz, was Sie brauchen. Wir antworten mit den nächsten Schritten.
                </p>
            </div>

            <div className="bg-white rounded-3xl border border-rose-100 shadow-lg p-6 sm:p-10 max-w-2xl mx-auto">
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-navy mb-2">Vor- und Nachname</label>
                        <input
                            className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-lg outline-none focus:border-primary focus:bg-white transition-all"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Ihr Name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-navy mb-2">E-Mail Adresse</label>
                        <input
                            className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-lg outline-none focus:border-primary focus:bg-white transition-all"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@email.ch"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-navy mb-2">Ihre Nachricht</label>
                        <textarea
                            className="w-full min-h-[150px] rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-lg outline-none focus:border-primary focus:bg-white transition-all"
                            value={msg}
                            onChange={(e) => setMsg(e.target.value)}
                            placeholder="Wie können wir helfen?"
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="w-full py-4 rounded-2xl bg-navy text-white text-lg font-bold shadow-md hover:bg-opacity-90 transition-all transform hover:scale-[1.01]"
                    >
                        Anfrage absenden
                    </button>

                    <p className="text-center text-gray-500 text-sm mt-4">
                        Kostenlos & Unverbindlich. Wir melden uns innert 24h.
                    </p>
                </div>
            </div>
        </main>
    );
}
