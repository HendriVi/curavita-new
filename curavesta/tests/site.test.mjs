import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { execFileSync, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { careLabels, timingLabels, validateRegion, buildSummary, buildMailto, isContactEmail, getLaunchIssues } from '../enquiry.js';
import { siteConfig } from '../site-config.js';

const root = new URL('../', import.meta.url);
const html = await readFile(new URL('index.html', root), 'utf8');
const app = await readFile(new URL('app.js', root), 'utf8');
const css = await readFile(new URL('styles.css', root), 'utf8');
const example = { care: 'home', region: '5000', timing: 'weeks' };

test('Swiss town names and four-digit postcode formats work', () => {
  for (const value of ['5000', '8001', 'Aarau', 'Zürich', 'La Chaux-de-Fonds', 'St. Gallen', '5000 Aarau', 'Le Locle', '  Lugano  ']) {
    assert.equal(validateRegion(value), true, value);
  }
  // This is syntax validation, not a postcode directory or availability lookup.
});
test('Empty, malformed and unsafe regions are rejected', () => {
  for (const value of ['', ' ', '5', '500', '50000', '0000', '<script>alert(1)</script>', 'Zurich\nBcc: someone', 'x'.repeat(81)]) {
    assert.equal(validateRegion(value), false, value);
  }
});
test('All twelve care/timing combinations produce the correct summary', () => {
  for (const care of Object.keys(careLabels)) {
    for (const timing of Object.keys(timingLabels)) {
      const result = buildSummary({ care, timing, region: 'Zürich' });
      assert.ok(result.includes(careLabels[care]));
      assert.ok(result.includes(timingLabels[timing]));
      assert.ok(result.includes('Zürich'));
    }
  }
});
test('Summary cannot be generated from missing or unexpected answers', () => {
  for (const invalid of [{ ...example, care: '' }, { ...example, care: 'toString' }, { ...example, timing: 'tomorrow' }, { ...example, region: '' }]) {
    assert.throws(() => buildSummary(invalid));
  }
});
test('Summary trims values and contains no claim of message delivery', () => {
  const result = buildSummary({ ...example, region: '  Aarau  ' });
  assert.ok(result.includes('Gewünschte Region: Aarau\n'));
  assert.equal(result.includes('Anfrage versendet'), false);
});
test('Missing and injected email destinations fail closed', () => {
  for (const email of ['', 'not-an-email', 'person@example.org?bcc=other@example.org', 'person@example.org\nBcc:other@example.org', 'person%0d%0a@example.org']) {
    assert.equal(isContactEmail(email), false);
    assert.equal(buildMailto(email, 'hello'), null);
  }
});
test('Mailto encoding preserves German characters and escapes message fields', () => {
  const text = buildSummary({ ...example, region: 'Zürich' }) + '\nA & B ?';
  const mailto = buildMailto('test@example.org', text);
  const parsed = new URL(mailto);
  assert.equal(parsed.protocol, 'mailto:');
  assert.equal(parsed.pathname, 'test@example.org');
  assert.equal(parsed.searchParams.get('body'), text);
  assert.equal(parsed.searchParams.has('bcc'), false);
});
test('Default site is not approved for publication or contact transmission', () => {
  assert.equal(siteConfig.email, '');
  assert.ok(getLaunchIssues(siteConfig).length >= 7);
  assert.match(html, /name="robots" content="noindex, nofollow"/);
});
test('Production readiness requires verified operator, contact, terms and privacy', () => {
  const ready = { email: 'test@example.org', legalName: 'Test company', address: 'Test address', postalCodeAndCity: '5000 Aarau', websiteUrl: 'https://example.org/curavesta/', serviceTermsReviewed: true, privacyReviewed: true };
  assert.deepEqual(getLaunchIssues(ready), []);
  assert.ok(getLaunchIssues({ ...ready, privacyReviewed: false }).length);
  assert.ok(getLaunchIssues({ ...ready, websiteUrl: 'http://example.org' }).length);
});
test('All document IDs are unique and all internal links resolve', () => {
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, 'Duplicate ID found');
  for (const [, hash] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(hash), 'Missing target: ' + hash);
});
test('All application ID selectors exist in the document', () => {
  for (const [, id] of app.matchAll(/querySelector\('#([\w-]+)'\)/g)) assert.ok(html.includes('id="' + id + '"'), id);
});
test('All linked local assets exist and resolve relatively', async () => {
  for (const [, path] of html.matchAll(/(?:src|href)="\.\/([^"]+)"/g)) await access(new URL(path, root));
  assert.equal(/(?:src|href)="\/(?!\/)/.test(html), false, 'Root-relative path would break subpath hosting');
});
test('Content has one primary heading, a skip link and descriptive image alt text', () => {
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.match(html, /class="skip-link"/);
  assert.match(html, /<html lang="de-CH"/);
  for (const [, attributes] of html.matchAll(/<img\s([^>]+)>/g)) {
    assert.match(attributes, /alt="[^"]+"/);
    assert.match(attributes, /width="\d+"/);
    assert.match(attributes, /height="\d+"/);
  }
});
test('Guides and legal dialogs are named, closeable and have a no-JS fallback', () => {
  const dialogs = [...html.matchAll(/<dialog id="([^"]+)"[^>]*aria-labelledby="([^"]+)"/g)];
  assert.equal(dialogs.length, 5);
  for (const [, id, title] of dialogs) {
    assert.ok(html.includes('id="' + title + '"'), id + ' needs a title');
    assert.ok(html.includes('href="#' + id + '"'));
  }
  assert.equal((html.match(/data-close/g) || []).length, 5);
  assert.match(css, /\.no-js dialog:target/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /@media print/);
});
test('Wizard options and configured labels stay aligned', () => {
  for (const care of Object.keys(careLabels)) assert.ok(html.includes('name="care" value="' + care + '"'));
  for (const timing of Object.keys(timingLabels)) assert.ok(html.includes('name="timing" value="' + timing + '"'));
  assert.equal((html.match(/data-step="/g) || []).length, 3);
});
test('No trackers, automatic network submission, browser persistence or unsafe HTML insertion', () => {
  for (const pattern of [/\bfetch\s*\(/, /XMLHttpRequest/, /localStorage/, /sessionStorage/, /document\.cookie/, /\.innerHTML\s*=/, /sendBeacon/]) assert.equal(pattern.test(app), false, String(pattern));
  assert.equal(/<script[^>]+src="https?:/.test(html), false);
  assert.equal(/<form[^>]+action=/.test(html), false);
  assert.match(app, /event\.preventDefault\(\)/);
});
test('Old fabricated people, rankings and contact details are absent from the new site', () => {
  for (const value of ['Sarah Müller', 'Thomas Frei', 'Elena Rossi', "1'500+", 'Nummer 1', 'Musterstrasse', '+41 44 123 45 67', 'info@curavesta.ch', 'BetterHealth']) assert.equal(html.includes(value), false, value);
});
test('Production build stops before writing an unapproved public site', () => {
  const result = spawnSync(process.execPath, ['scripts/build.mjs', '--production'], { cwd: fileURLToPath(root), encoding: 'utf8' });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Veröffentlichung noch nicht freigegeben/);
});
test('Preview builds independently of the repository root and preserves noindex', async () => {
  execFileSync(process.execPath, ['scripts/build.mjs'], { cwd: fileURLToPath(root), stdio: 'pipe' });
  const output = await readFile(new URL('dist/index.html', root), 'utf8');
  assert.match(output, /noindex, nofollow/);
  assert.match(output, /Gute Pflege finden/);
  for (const path of ['assets/hero-illustration.png', 'assets/favicon.svg', 'app.js', 'enquiry.js', 'site-config.js', 'styles.css', '.nojekyll']) await access(new URL('dist/' + path, root));
});
test('Standalone preview embeds every asset and has no unresolved module imports', async () => {
  execFileSync(process.execPath, ['scripts/preview.mjs'], { cwd: fileURLToPath(root), stdio: 'pipe' });
  const output = await readFile(new URL('dist/curavesta-preview.html', root), 'utf8');
  assert.match(output, /src="data:image\/png;base64,/);
  assert.match(output, /<script type="module">/);
  assert.equal(output.includes('src="./app.js"'), false);
  assert.equal(output.includes('href="./styles.css"'), false);
  assert.equal(/^import .+;/m.test(output), false);
  assert.equal(/^export /m.test(output), false);
  assert.match(output, /noindex, nofollow/);
});
