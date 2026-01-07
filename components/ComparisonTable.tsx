
import React from 'react';
import { Listing } from '../types';
import { CARE_TYPE_LABELS, AVAILABILITY_LABELS } from '../constants';

interface ComparisonTableProps {
  listings: Listing[];
  onRemove: (id: string) => void;
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({ listings, onRemove }) => {
  if (listings.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
        <h2 className="text-xl font-bold text-slate-800">Direktvergleich</h2>
        <span className="text-sm text-slate-500">{listings.length} Angebote ausgewählt</span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="p-4 bg-slate-50 w-48 sticky left-0 z-10 border-r border-slate-100">Kriterien</th>
              {listings.map(l => (
                <th key={l.id} className="p-4 min-w-[240px] border-l border-slate-100 relative">
                  <button 
                    onClick={() => onRemove(l.id)}
                    className="absolute top-2 right-2 p-1 text-slate-300 hover:text-red-500"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <img src={l.imageUrl} className="w-full h-24 object-cover rounded mb-2" />
                  <div className="font-bold text-slate-800 text-sm">{l.name}</div>
                  <div className="text-[10px] text-red-600 font-bold uppercase">{CARE_TYPE_LABELS[l.type]}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr>
              <td className="p-4 font-semibold text-slate-600 bg-slate-50 sticky left-0 z-10 border-r border-slate-100">Grundpreis</td>
              {listings.map(l => (
                <td key={l.id} className="p-4 border-l border-slate-100">
                  <span className="font-bold">CHF {l.pricing.basePrice.toLocaleString('de-CH')}</span>
                  <span className="text-[10px] text-slate-400 block">pro {l.pricing.unit === 'MONTH' ? 'Monat' : 'Stunde'}</span>
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-semibold text-slate-600 bg-slate-50 sticky left-0 z-10 border-r border-slate-100">Verfügbarkeit</td>
              {listings.map(l => (
                <td key={l.id} className="p-4 border-l border-slate-100">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${AVAILABILITY_LABELS[l.availability.status].color}`}>
                    {AVAILABILITY_LABELS[l.availability.status].label}
                  </span>
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-semibold text-slate-600 bg-slate-50 sticky left-0 z-10 border-r border-slate-100">Inbegriffen</td>
              {listings.map(l => (
                <td key={l.id} className="p-4 border-l border-slate-100">
                  <ul className="space-y-1">
                    {l.pricing.inclusions.map(inc => (
                      <li key={inc} className="flex items-center text-[10px]">
                        <span className="text-green-500 mr-1">✓</span> {inc}
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-semibold text-slate-600 bg-slate-50 sticky left-0 z-10 border-r border-slate-100">Spezialisierung</td>
              {listings.map(l => (
                <td key={l.id} className="p-4 border-l border-slate-100">
                   <div className="flex flex-wrap gap-1">
                    {l.specialisms.map(s => (
                      <span key={s} className="bg-slate-100 text-slate-600 text-[10px] px-1.5 py-0.5 rounded">{s}</span>
                    ))}
                  </div>
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 bg-slate-50 sticky left-0 z-10 border-r border-slate-100"></td>
              {listings.map(l => (
                <td key={l.id} className="p-4 border-l border-slate-100 text-center">
                  <button className="w-full bg-red-600 text-white py-2 rounded font-bold text-xs hover:bg-red-700 transition-all">Anfragen</button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonTable;
