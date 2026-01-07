
import React, { useState } from 'react';
import { CareType, Urgency, IntakeData } from '../types';
import { CANTONS, CARE_NEEDS_OPTIONS } from '../constants';

interface IntakeWizardProps {
  onComplete: (data: IntakeData) => void;
}

const IntakeWizard: React.FC<IntakeWizardProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<IntakeData>>({
    careNeeds: [],
    preferences: { pets: false },
    radius: 10
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 5) {
      nextStep();
    } else {
      onComplete(formData as IntakeData);
    }
  };

  const toggleCareNeed = (id: string) => {
    setFormData(prev => ({
      ...prev,
      careNeeds: prev.careNeeds?.includes(id) 
        ? prev.careNeeds.filter(n => n !== id)
        : [...(prev.careNeeds || []), id]
    }));
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-slate-50 border-b border-slate-100 p-6 flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Schritt {step} von 5</span>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className={`h-1.5 w-8 rounded-full ${i <= step ? 'bg-red-600' : 'bg-slate-200'}`} />
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-8">
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800">Wo suchen Sie Unterstützung?</h2>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Ort oder Postleitzahl</label>
              <input 
                type="text" 
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                placeholder="z.B. 8001 oder Zürich"
                value={formData.location || ''}
                onChange={e => setFormData({...formData, location: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Umkreis ({formData.radius} km)</label>
              <input 
                type="range" 
                min="5" max="100" step="5"
                className="w-full accent-red-600"
                value={formData.radius || 10}
                onChange={e => setFormData({...formData, radius: parseInt(e.target.value)})}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800">Was für eine Pflege wird benötigt?</h2>
            <div className="grid grid-cols-1 gap-4">
              {[
                { id: CareType.PFLEGEHEIM, label: 'Pflegeheim', desc: 'Vollstationäre Langzeitpflege' },
                { id: CareType.SPITEX, label: 'Spitex / Ambulant', desc: 'Pflege in den eigenen vier Wänden' },
                { id: CareType.BETREUTES_WOHNEN, label: 'Betreutes Wohnen', desc: 'Barrierefreies Wohnen mit Service' }
              ].map(type => (
                <label key={type.id} className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${formData.careType === type.id ? 'border-red-600 bg-red-50 ring-1 ring-red-600' : 'border-slate-200 hover:bg-slate-50'}`}>
                  <input 
                    type="radio" 
                    name="careType"
                    required
                    className="hidden"
                    onChange={() => setFormData({...formData, careType: type.id})}
                    checked={formData.careType === type.id}
                  />
                  <div>
                    <span className="block font-bold text-slate-800">{type.label}</span>
                    <span className="text-sm text-slate-500">{type.desc}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800">Spezifische Bedürfnisse</h2>
            <div className="grid grid-cols-2 gap-3">
              {CARE_NEEDS_OPTIONS.map(need => (
                <button
                  key={need.id}
                  type="button"
                  onClick={() => toggleCareNeed(need.id)}
                  className={`p-3 text-sm text-left border rounded-lg transition-all ${formData.careNeeds?.includes(need.id) ? 'bg-red-600 text-white border-red-600' : 'bg-white text-slate-700 border-slate-200 hover:border-red-300'}`}
                >
                  {need.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800">Zeitpunkt & Dringlichkeit</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.values(Urgency).map(u => (
                <button
                  key={u}
                  type="button"
                  onClick={() => setFormData({...formData, urgency: u})}
                  className={`p-4 border rounded-xl font-medium transition-all ${formData.urgency === u ? 'border-red-600 bg-red-50 text-red-700 ring-1 ring-red-600' : 'border-slate-200 hover:bg-slate-50'}`}
                >
                  {u}
                </button>
              ))}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Frühestes Startdatum</label>
              <input 
                type="date"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500"
                onChange={e => setFormData({...formData, startDate: e.target.value})}
              />
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800">Zusammenfassung & Präferenzen</h2>
            <div className="bg-slate-50 p-4 rounded-lg space-y-2 text-sm text-slate-600">
              <p>📍 Region: <span className="text-slate-900 font-medium">{formData.location}</span></p>
              <p>🏥 Typ: <span className="text-slate-900 font-medium">{formData.careType}</span></p>
              <p>🧩 Bedürfnisse: <span className="text-slate-900 font-medium">{formData.careNeeds?.length || 0} ausgewählt</span></p>
            </div>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input 
                type="checkbox" 
                className="w-5 h-5 accent-red-600"
                checked={formData.preferences?.pets}
                onChange={e => setFormData({...formData, preferences: { ...formData.preferences, pets: e.target.checked }})}
              />
              <span className="text-slate-700">Haustiere sind ein wichtiger Faktor</span>
            </label>
          </div>
        )}

        <div className="mt-10 flex justify-between">
          {step > 1 && (
            <button 
              type="button" 
              onClick={prevStep}
              className="px-6 py-3 text-slate-600 font-medium hover:text-slate-900"
            >
              Zurück
            </button>
          )}
          <button 
            type="submit"
            className={`ml-auto px-8 py-3 bg-red-600 text-white font-bold rounded-lg shadow-lg hover:bg-red-700 transition-all ${step === 1 && !formData.location ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {step === 5 ? 'Vorschläge anzeigen' : 'Weiter'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default IntakeWizard;
