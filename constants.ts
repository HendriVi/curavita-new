
import { CareType, AvailabilityStatus } from './types';

export const CANTONS = [
  'Zürich', 'Bern', 'Luzern', 'Uri', 'Schwyz', 'Obwalden', 'Nidwalden', 
  'Glarus', 'Zug', 'Freiburg', 'Solothurn', 'Basel-Stadt', 'Basel-Landschaft', 
  'Schaffhausen', 'Appenzell Ausserrhoden', 'Appenzell Innerrhoden', 
  'St. Gallen', 'Graubünden', 'Aargau', 'Thurgau', 'Tessin', 'Waadt', 
  'Wallis', 'Neuenburg', 'Genf', 'Jura'
];

export const CARE_NEEDS_OPTIONS = [
  { id: 'mobility', label: 'Mobilitätshilfe' },
  { id: 'dementia', label: 'Demenzerkrankung' },
  { id: 'adl', label: 'Alltagsbegleitung (ADL)' },
  { id: 'nursing', label: 'Medizinische Pflege' },
  { id: 'night', label: 'Nachtwache / Nachtdienst' },
  { id: 'medication', label: 'Medikamentenmanagement' },
  { id: 'rehab', label: 'Rehabilitation' },
  { id: 'diet', label: 'Spezialdiäten' },
  { id: 'accessibility', label: 'Barrierefreiheit' },
  { id: 'pets', label: 'Haustiere erlaubt' }
];

export const AVAILABILITY_LABELS: Record<AvailabilityStatus, { label: string; color: string }> = {
  [AvailabilityStatus.AVAILABLE]: { label: 'Verfügbar', color: 'bg-green-100 text-green-800' },
  [AvailabilityStatus.LIMITED]: { label: 'Begrenzt', color: 'bg-yellow-100 text-yellow-800' },
  [AvailabilityStatus.WAITLIST]: { label: 'Warteliste', color: 'bg-orange-100 text-orange-800' },
  [AvailabilityStatus.UNKNOWN]: { label: 'Unbekannt', color: 'bg-gray-100 text-gray-800' }
};

export const CARE_TYPE_LABELS: Record<CareType, string> = {
  [CareType.PFLEGEHEIM]: 'Pflegeheim',
  [CareType.SPITEX]: 'Spitex / Ambulant',
  [CareType.BETREUTES_WOHNEN]: 'Betreutes Wohnen'
};
