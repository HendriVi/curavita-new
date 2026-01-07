
import React from 'react';
import { Listing, MatchResult } from '../types';
import { AVAILABILITY_LABELS, CARE_TYPE_LABELS } from '../constants';

interface ListingCardProps {
  match: MatchResult;
  onViewDetails: (id: string) => void;
  onToggleCompare: (id: string) => void;
  isComparing: boolean;
}

const ListingCard: React.FC<ListingCardProps> = ({ match, onViewDetails, onToggleCompare, isComparing }) => {
  const { listing, score, reasons } = match;
  const avail = AVAILABILITY_LABELS[listing.availability.status];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all flex flex-col md:flex-row">
      <div className="md:w-1/3 relative">
        <img src={listing.imageUrl} alt={listing.name} className="h-full w-full object-cover" />
        <div className="absolute top-4 left-4">
          <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${avail.color}`}>
            {avail.label}
          </span>
        </div>
        {listing.verified && (
          <div className="absolute bottom-4 left-4 bg-blue-600 text-white text-[10px] px-2 py-1 rounded-full font-bold">
            VERIFIZIERT
          </div>
        )}
      </div>

      <div className="p-6 md:w-2/3 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <div>
            <span className="text-xs text-red-600 font-bold uppercase tracking-widest">{CARE_TYPE_LABELS[listing.type]}</span>
            <h3 className="text-xl font-bold text-slate-800">{listing.name}</h3>
            <p className="text-sm text-slate-500">{listing.location.city}, {listing.location.canton}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-1 justify-end">
              <div className="w-12 h-12 rounded-full border-4 border-slate-100 flex items-center justify-center relative">
                 <svg className="w-10 h-10 absolute -rotate-90">
                    <circle cx="20" cy="20" r="18" fill="transparent" stroke="#fee2e2" strokeWidth="4" />
                    <circle 
                      cx="20" cy="20" r="18" fill="transparent" stroke="#dc2626" strokeWidth="4" 
                      strokeDasharray={113}
                      strokeDashoffset={113 - (113 * score) / 100}
                    />
                 </svg>
                 <span className="text-xs font-bold text-red-600">{score}%</span>
              </div>
            </div>
            <span className="text-[10px] text-slate-400 uppercase font-medium">Match Score</span>
          </div>
        </div>

        <p className="text-sm text-slate-600 line-clamp-2 mb-4">
          {listing.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {listing.specialisms.slice(0, 3).map(s => (
            <span key={s} className="bg-slate-100 text-slate-600 text-[10px] px-2 py-1 rounded uppercase font-bold">
              {s}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="text-slate-800">
            <span className="text-xs text-slate-500 block">Ab</span>
            <span className="text-lg font-bold">CHF {listing.pricing.basePrice.toLocaleString('de-CH')}</span>
            <span className="text-xs text-slate-500"> / {listing.pricing.unit === 'MONTH' ? 'Monat' : 'Std'}</span>
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={() => onToggleCompare(listing.id)}
              className={`p-2 rounded-lg border transition-all ${isComparing ? 'bg-red-50 border-red-200 text-red-600' : 'bg-white border-slate-200 text-slate-400 hover:text-slate-600'}`}
              title="Vergleichen"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 4a1 1 0 00-2 0v12a1 1 0 102 0V4zM9 4a1 1 0 00-2 0v12a1 1 0 102 0V4zM13 4a1 1 0 00-2 0v12a1 1 0 102 0V4zM17 4a1 1 0 00-2 0v12a1 1 0 102 0V4z" />
              </svg>
            </button>
            <button 
              onClick={() => onViewDetails(listing.id)}
              className="bg-slate-900 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-slate-800 transition-all"
            >
              Details ansehen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
