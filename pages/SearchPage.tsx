import React, { useState, useMemo } from 'react';
import { cn, formatCHF } from '../lib/utils';
import { IconHomeCute, IconHandsCute, IconBuildingCute } from '../components/Icons';

// Demo Data (Moved here)
const PROVIDERS = [
    {
        id: "ch1",
        type: "care_home",
        name: "Haus am Fluss",
        location: "Aarau",
        canton: "Aargau",
        availability: "Sofort verfügbar",
        priceFromCHF: 7200,
        rating: 4.6,
        reviews: 112,
        summary: "Ruhige Lage, Erfahrung mit Demenz, klare Tagesstruktur und Aktivierungsangebote.",
        features: ["Demenz", "Kurzaufenthalt", "Physiotherapie"],
    },
    {
        id: "ch2",
        type: "care_home",
        name: "Seniorenzentrum Sonnenblick",
        location: "Baden",
        canton: "Aargau",
        availability: "Begrenzt",
        priceFromCHF: 7900,
        rating: 4.4,
        reviews: 86,
        summary: "Gute ÖV-Anbindung, moderne Zimmer, Fokus auf Mobilität und Sturzprävention.",
        features: ["Reha", "Ergo", "Einzelzimmer"],
    },
    {
        id: "ch3",
        type: "care_home",
        name: "Parkresidenz Zürich",
        location: "Zürich",
        canton: "Zürich",
        availability: "Warteliste",
        priceFromCHF: 9800,
        rating: 4.7,
        reviews: 144,
        summary: "Stadtnah, hoher Hotellerie-Standard, individuelle Betreuung und Angehörigenarbeit.",
        features: ["Demenz", "Garten", "Therapie"],
    },
    {
        id: "hc1",
        type: "home_care",
        name: "Spitex Nord",
        location: "Aarau",
        canton: "Aargau",
        availability: "Sofort verfügbar",
        priceFromCHF: 120,
        rating: 4.5,
        reviews: 210,
        summary: "Pflege und Betreuung zuhause, Koordination mit Arzt und Angehörigen, schnelle Einsatzplanung.",
        features: ["Grundpflege", "Wundpflege", "Medikation"],
    },
    {
        id: "hc2",
        type: "home_care",
        name: "Betreuung Zuhause GmbH",
        location: "Baden",
        canton: "Aargau",
        availability: "Begrenzt",
        priceFromCHF: 140,
        rating: 4.3,
        reviews: 74,
        summary: "Stundenweise Betreuung, Haushalt, Begleitung zu Terminen, flexible Zeiten.",
        features: ["Haushalt", "Begleitung", "Entlastung"],
    },
    {
        id: "rl1",
        type: "retirement_living",
        name: "Residenz Limmatblick",
        location: "Dietikon",
        canton: "Zürich",
        availability: "Sofort verfügbar",
        priceFromCHF: 3800,
        rating: 4.4,
        reviews: 58,
        summary: "Serviced Apartments, Notruf, Gemeinschaft, optional Spitex. Für aktive Seniorinnen und Senioren.",
        features: ["Notruf", "Service", "Gemeinschaft"],
    },
];

interface SearchPageProps {
    onNav: (page: string, params?: any) => void;
    initialParams?: any;
}

export function SearchPage({ onNav, initialParams }: SearchPageProps) {
    const [kind, setKind] = useState(initialParams?.type || 'care_home');
    const [query, setQuery] = useState(initialParams?.q || "");
    const [canton, setCanton] = useState("Alle");
    const [availability, setAvailability] = useState(initialParams?.availability || "Alle");
    const [limit, setLimit] = useState(5);

    const candidates = useMemo(() => PROVIDERS.filter((p) => p.type === kind), [kind]);
    const cantons = useMemo(() => ["Alle", ...Array.from(new Set(candidates.map((p) => p.canton))).sort()], [candidates]);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        let list = candidates.slice();

        if (canton !== "Alle") list = list.filter((p) => p.canton === canton);
        if (availability !== "Alle") list = list.filter((p) => p.availability === availability);

        if (q) {
            list = list.filter((p) => {
                const hay = [p.name, p.location, p.canton, p.summary, ...(p.features || [])].join(" ").toLowerCase();
                return hay.includes(q);
            });
        }

        return list;
    }, [candidates, canton, availability, query]);

    const shown = filtered.slice(0, limit);

    const getTitle = () => {
        if (kind === 'care_home') return 'Pflegeheim finden';
        if (kind === 'home_care') return 'Spitex finden';
        return 'Seniorenwohnen';
    }

    return (
        <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">

            {/* Header & Tabs */}
            <div className="mb-8">
                <h1 className="text-3xl font-display font-bold text-navy mb-4">{getTitle()}</h1>
                <div className="inline-flex bg-white p-1.5 rounded-2xl border border-gray-200 shadow-sm">
                    <TabButton active={kind === 'care_home'} onClick={() => setKind('care_home')} icon={<IconHomeCute />} label="Pflegeheim" />
                    <TabButton active={kind === 'home_care'} onClick={() => setKind('home_care')} icon={<IconHandsCute />} label="Spitex" />
                    <TabButton active={kind === 'retirement_living'} onClick={() => setKind('retirement_living')} icon={<IconBuildingCute />} label="Wohnen" />
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-4">
                {/* Sidebar Filters */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="bg-white p-5 rounded-3xl border border-rose-100 shadow-sm">
                        <label className="block text-sm font-bold text-navy mb-2">Suche</label>
                        <input
                            className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-primary"
                            placeholder="Ort oder Stichwort..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />

                        <label className="block text-sm font-bold text-navy mt-4 mb-2">Kanton</label>
                        <select
                            className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-primary bg-white"
                            value={canton}
                            onChange={(e) => setCanton(e.target.value)}
                        >
                            {cantons.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>

                        <label className="block text-sm font-bold text-navy mt-4 mb-2">Verfügbarkeit</label>
                        <select
                            className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-primary bg-white"
                            value={availability}
                            onChange={(e) => setAvailability(e.target.value)}
                        >
                            <option value="Alle">Alle</option>
                            <option value="Sofort verfügbar">Sofort verfügbar</option>
                            <option value="Begrenzt">Begrenzt</option>
                            <option value="Warteliste">Warteliste</option>
                        </select>

                        <button
                            onClick={() => { setQuery(""); setCanton("Alle"); setAvailability("Alle"); }}
                            className="w-full mt-6 py-2 text-sm font-semibold text-gray-500 hover:text-primary transition-colors"
                        >
                            Filter zurücksetzen
                        </button>
                    </div>

                    <div className="bg-rose-50 p-5 rounded-3xl border border-rose-100">
                        <h3 className="font-bold text-navy mb-2">Unsicher?</h3>
                        <p className="text-sm text-gray-700 mb-3">Wir helfen Ihnen kostenlos, die richtige Lösung zu finden.</p>
                        <button onClick={() => onNav('contact')} className="w-full py-2 bg-white rounded-xl text-sm font-bold text-primary shadow-sm hover:shadow-md transition-all">
                            Hilfe anfragen
                        </button>
                    </div>
                </div>

                {/* Results List */}
                <div className="lg:col-span-3 space-y-4">
                    <div className="text-sm text-gray-500 font-medium px-1">{shown.length} Treffer gefunden</div>

                    {shown.map((p) => (
                        <div key={p.id} className="bg-white rounded-3xl border border-rose-100 shadow-sm p-6 hover:shadow-md transition-shadow">
                            <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
                                <div>
                                    <h3 className="text-xl font-bold text-navy">{p.name}</h3>
                                    <div className="text-gray-600 mt-1">{p.location} ({p.canton}) • <span className={cn("font-medium", p.availability === 'Sofort verfügbar' ? 'text-green-600' : 'text-orange-600')}>{p.availability}</span></div>
                                    <p className="text-gray-500 mt-3 text-sm leading-relaxed max-w-xl">{p.summary}</p>
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        {p.features.map(f => (
                                            <span key={f} className="px-3 py-1 bg-gray-50 text-gray-600 rounded-full text-xs font-semibold border border-gray-100">{f}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-1 min-w-[140px]">
                                    <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Ab Preis</div>
                                    <div className="text-2xl font-bold text-navy">{formatCHF(p.priceFromCHF)}</div>
                                    <div className="text-xs text-gray-400 mb-4">{kind === 'home_care' ? '/ Stunde' : '/ Monat'}</div>

                                    <button onClick={() => onNav('contact', { provider: p.name })} className="w-full py-2.5 bg-primary text-white rounded-xl font-semibold shadow-md hover:bg-red-500 transition-colors">
                                        Kontakt
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {shown.length === 0 && (
                        <div className="text-center py-12 bg-gray-50 rounded-3xl border border-gray-100 border-dashed">
                            <div className="text-gray-500 text-lg">Keine Treffer für diese Filter.</div>
                            <button onClick={() => { setQuery(""); setCanton("Alle"); setAvailability("Alle"); }} className="mt-2 text-primary font-semibold hover:underline">
                                Alle anzeigen
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

function TabButton({ active, onClick, icon, label }: any) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all",
                active ? "bg-navy text-white shadow-md" : "text-gray-600 hover:bg-gray-50"
            )}
        >
            <span className={active ? "text-white" : "text-gray-400"}>{icon}</span>
            {label}
        </button>
    )
}
