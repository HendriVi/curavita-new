export const careLabels = Object.freeze({
  home: 'Spitex & Betreuung zu Hause',
  nursing: 'Alters- & Pflegeheim',
  living: 'Betreutes Wohnen',
  unsure: 'Ich möchte mich zuerst orientieren',
});

export const timingLabels = Object.freeze({
  soon: 'So bald wie möglich',
  weeks: 'In den nächsten Wochen',
  planning: 'Ich plane voraus',
});

export function validateRegion(value) {
  const region = value.trim();
  if (region.length < 2 || region.length > 80) return false;
  if (/^\d+$/.test(region)) return /^[1-9]\d{3}$/.test(region);
  return /^[\p{L}\p{M}\d][\p{L}\p{M}\d .,'’()/-]+$/u.test(region) && /\p{L}/u.test(region);
}

export function isContactEmail(value) {
  return typeof value === 'string' && /^[^\s@<>?&#%]+@[^\s@<>?&#%]+\.[^\s@<>?&#%]+$/.test(value);
}

export function buildSummary({ care, region, timing }) {
  if (!Object.hasOwn(careLabels, care) || !Object.hasOwn(timingLabels, timing) || !validateRegion(region)) {
    throw new Error('Bitte Anliegen, Region und Zeitraum vervollständigen.');
  }
  return [
    'Meine Pflegesuche – Curavesta',
    '',
    `Ich interessiere mich für: ${careLabels[care]}`,
    `Gewünschte Region: ${region.trim()}`,
    `Zeitraum: ${timingLabels[timing]}`,
    '',
    'Gerne möchte ich in einem Erstgespräch die nächsten Schritte klären.',
    '',
    'Meine Kontaktdaten ergänze ich bei der Kontaktaufnahme.',
    'Bitte keine Diagnosen oder medizinischen Unterlagen per unverschlüsselter E-Mail senden.',
  ].join('\n');
}

export function buildMailto(email, summary) {
  if (!isContactEmail(email)) return null;
  return `mailto:${email}?subject=${encodeURIComponent('Anfrage für ein Erstgespräch – Curavesta')}&body=${encodeURIComponent(summary)}`;
}

export function getLaunchIssues(config) {
  const issues = [];
  if (!isContactEmail(config.email)) issues.push('Eine bestätigte Kontakt-E-Mail fehlt.');
  for (const key of ['legalName', 'address', 'postalCodeAndCity']) {
    if (!config[key]?.trim()) issues.push(`Impressumsangabe fehlt: ${key}.`);
  }
  try {
    const url = new URL(config.websiteUrl);
    if (url.protocol !== 'https:') throw new Error();
  } catch {
    issues.push('Eine bestätigte öffentliche HTTPS-Website-Adresse fehlt.');
  }
  if (!config.serviceTermsReviewed) issues.push('Leistungsumfang und Kosten der Beratung müssen bestätigt werden.');
  if (!config.privacyReviewed) issues.push('Die Datenschutzinformationen müssen geprüft werden.');
  return issues;
}
