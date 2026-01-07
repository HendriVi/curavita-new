
import { Listing, CareType, AvailabilityStatus } from '../types';

export const MOCK_LISTINGS: Listing[] = [
  {
    id: 'l1',
    providerId: 'p1',
    name: 'Seniorenresidenz am See',
    type: CareType.PFLEGEHEIM,
    description: 'Exklusive Pflege in direkter Seenähe mit Fokus auf individuelle Betreuung.',
    location: {
      address: 'Seestrasse 10',
      zip: '8008',
      city: 'Zürich',
      canton: 'Zürich',
      coordinates: { lat: 47.3686, lng: 8.5391 }
    },
    pricing: {
      basePrice: 6500,
      unit: 'MONTH',
      inclusions: ['Vollpension', 'Zimmerreinigung', '24h Notruf'],
      extras: ['Wäscheservice', 'Frisör', 'Ausflüge']
    },
    availability: {
      status: AvailabilityStatus.AVAILABLE,
      lastVerified: '2024-05-15T10:00:00Z'
    },
    specialisms: ['Demenzerkrankung', 'Palliativpflege'],
    languages: ['Deutsch', 'Englisch'],
    amenities: ['Garten', 'Bibliothek', 'Cafeteria'],
    verified: true,
    imageUrl: 'https://picsum.photos/seed/care1/800/400'
  },
  {
    id: 'l2',
    providerId: 'p2',
    name: 'Spitex Regio Bern',
    type: CareType.SPITEX,
    description: 'Professionelle ambulante Pflege in den eigenen vier Wänden.',
    location: {
      address: 'Hauptstrasse 42',
      zip: '3011',
      city: 'Bern',
      canton: 'Bern',
      coordinates: { lat: 46.948, lng: 7.4474 }
    },
    pricing: {
      basePrice: 85,
      unit: 'HOUR',
      inclusions: ['Grundpflege', 'Behandlungspflege'],
      extras: ['Hauswirtschaft', 'Begleitung zum Arzt']
    },
    availability: {
      status: AvailabilityStatus.LIMITED,
      lastVerified: '2024-05-14T15:30:00Z'
    },
    specialisms: ['Wundmanagement', 'Onkologische Pflege'],
    languages: ['Deutsch', 'Französisch'],
    amenities: [],
    verified: true,
    imageUrl: 'https://picsum.photos/seed/care2/800/400'
  },
  {
    id: 'l3',
    providerId: 'p3',
    name: 'Wohnpark Sonne',
    type: CareType.BETREUTES_WOHNEN,
    description: 'Modernes Wohnen mit Sicherheit und Gemeinschaft für aktive Senioren.',
    location: {
      address: 'Sonnenweg 5',
      zip: '4051',
      city: 'Basel',
      canton: 'Basel-Stadt',
      coordinates: { lat: 47.5596, lng: 7.5886 }
    },
    pricing: {
      basePrice: 3200,
      unit: 'MONTH',
      inclusions: ['Wohnungsmiete', 'Nebenkosten', 'Notruf'],
      extras: ['Mittagessen', 'Reinigungsservice']
    },
    availability: {
      status: AvailabilityStatus.WAITLIST,
      lastVerified: '2024-05-10T08:00:00Z'
    },
    specialisms: ['Altersgerechtes Wohnen'],
    languages: ['Deutsch'],
    amenities: ['Fitnessraum', 'Gemeinschaftsraum'],
    verified: false,
    imageUrl: 'https://picsum.photos/seed/care3/800/400'
  }
];
