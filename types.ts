
export enum CareType {
  PFLEGEHEIM = 'PFLEGEHEIM',
  SPITEX = 'SPITEX',
  BETREUTES_WOHNEN = 'BETREUTES_WOHNEN'
}

export enum AvailabilityStatus {
  AVAILABLE = 'AVAILABLE',
  LIMITED = 'LIMITED',
  WAITLIST = 'WAITLIST',
  UNKNOWN = 'UNKNOWN'
}

export enum Urgency {
  IMMEDIATE = 'SOFORT',
  THIS_WEEK = 'DIESE_WOCHE',
  THIS_MONTH = 'DIESER_MONAT',
  FLEXIBLE = 'FLEXIBEL'
}

export interface Pricing {
  basePrice: number;
  unit: 'MONTH' | 'HOUR' | 'PACKAGE';
  careLevelComponents?: { level: number; cost: number }[];
  inclusions: string[];
  extras: string[];
}

export interface Location {
  address: string;
  zip: string;
  city: string;
  canton: string;
  coordinates: { lat: number; lng: number };
}

export interface Listing {
  id: string;
  providerId: string;
  name: string;
  type: CareType;
  description: string;
  location: Location;
  pricing: Pricing;
  availability: {
    status: AvailabilityStatus;
    lastVerified: string;
  };
  specialisms: string[];
  languages: string[];
  amenities: string[];
  verified: boolean;
  imageUrl: string;
}

export interface IntakeData {
  location: string;
  radius: number;
  careType: CareType;
  urgency: Urgency;
  startDate: string;
  careNeeds: string[];
  preferences: {
    roomType?: 'SINGLE' | 'SHARED';
    pets: boolean;
    religious?: string;
  };
}

export interface Inquiry {
  id: string;
  listingId: string;
  status: 'NEW' | 'CONTACTED' | 'SHORTLISTED' | 'PLACED' | 'CLOSED';
  userName: string;
  userEmail: string;
  message: string;
  timestamp: string;
}

export interface MatchResult {
  listing: Listing;
  score: number;
  reasons: string[];
}
