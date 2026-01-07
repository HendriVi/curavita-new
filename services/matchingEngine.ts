
import { Listing, IntakeData, MatchResult, AvailabilityStatus } from '../types';

export const calculateMatch = (listing: Listing, intake: IntakeData): MatchResult => {
  let score = 0;
  const reasons: string[] = [];

  // 1. Location & Radius (Simplified score for MVP)
  if (intake.location.toLowerCase().includes(listing.location.city.toLowerCase())) {
    score += 40;
    reasons.push('Liegt in Ihrer Wunschregion');
  }

  // 2. Care Type
  if (listing.type === intake.careType) {
    score += 20;
    reasons.push('Entspricht dem gewählten Pflegetyp');
  } else {
    // Should typically be filtered out before, but safe check
    score -= 50;
  }

  // 3. Availability
  if (listing.availability.status === AvailabilityStatus.AVAILABLE) {
    score += 20;
    reasons.push('Sofortige Verfügbarkeit bestätigt');
  } else if (listing.availability.status === AvailabilityStatus.WAITLIST) {
    score += 5;
    reasons.push('Warteliste verfügbar');
  }

  // 4. Care Needs
  const matchingNeeds = listing.specialisms.filter(s => 
    intake.careNeeds.some(need => s.toLowerCase().includes(need.toLowerCase()))
  );
  if (matchingNeeds.length > 0) {
    score += 15;
    reasons.push(`Unterstützt Ihre speziellen Bedürfnisse: ${matchingNeeds.join(', ')}`);
  }

  // Normalize score
  const finalScore = Math.min(Math.max(score, 0), 100);

  return {
    listing,
    score: finalScore,
    reasons
  };
};

export const rankListings = (listings: Listing[], intake: IntakeData): MatchResult[] => {
  return listings
    .map(l => calculateMatch(l, intake))
    .filter(r => r.score > 20) // Threshold for relevance
    .sort((a, b) => b.score - a.score);
};
