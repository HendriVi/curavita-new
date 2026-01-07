import React from 'react';

const Features = () => {
    const features = [
        {
            title: "Geprüfte Qualität",
            description: "Jedes Pflegeheim wird von unseren Experten nach strengen Qualitätsstandards geprüft.",
            icon: (
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            color: "bg-primary"
        },
        {
            title: "Schweizer Expertise",
            description: "Wir kennen das Schweizer Gesundheitssystem und die lokalen Gegebenheiten genau.",
            icon: (
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-8a2 2 0 012-2h14a2 2 0 012 2v8M12 5l-7.76 6.55a.999.999 0 00.4 1.65h15.72a.999.999 0 00.41-1.65L12 5z" />
                </svg>
            ),
            color: "bg-secondary"
        },
        {
            title: "Kostenlose Beratung",
            description: "Unser Service ist für Sie komplett kostenlos und unverbindlich. Wir helfen gerne.",
            icon: (
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
            ),
            color: "bg-orange-400"
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-display font-bold text-navy mb-4">Warum Curavesta?</h2>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                        Wir machen die Suche nach dem passenden Pflegeplatz einfach, transparent und menschlich.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="group p-8 rounded-[2rem] border border-gray-100 bg-cream/30 hover:bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-navy mb-3">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
