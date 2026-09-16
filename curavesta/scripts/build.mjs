import { mkdir, copyFile, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { siteConfig } from '../site-config.js';
import { getLaunchIssues } from '../enquiry.js';

const root = new URL('../', import.meta.url);
const dist = new URL('dist/', root);
const production = process.argv.includes('--production');
if (production) {
  const issues = getLaunchIssues(siteConfig);
  if (issues.length) {
    console.error('Veröffentlichung noch nicht freigegeben:\n- ' + issues.join('\n- '));
    process.exit(1);
  }
}
await mkdir(new URL('assets/', dist), { recursive: true });
for (const path of ['styles.css', 'app.js', 'site-config.js', 'enquiry.js', 'assets/favicon.svg', 'assets/hero-illustration.png']) {
  await copyFile(new URL(path, root), new URL(path, dist));
}
let html = await readFile(new URL('index.html', root), 'utf8');
if (production) {
  // URL and operator details were explicitly verified in site-config.js.
  const safeUrl = new URL(siteConfig.websiteUrl).href.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
  html = html.replace('noindex, nofollow', 'index, follow');
  html = html.replace('</head>', '  <link rel="canonical" href="' + safeUrl + '">\n</head>');
}
await writeFile(new URL('index.html', dist), html);
await writeFile(new URL('404.html', dist), html);
await writeFile(new URL('.nojekyll', dist), '');
console.log('Curavesta ' + (production ? 'production' : 'preview') + ' built at ' + fileURLToPath(dist));
if (!production) console.log('Preview only: noindex enabled. Business/contact verification required for production.');
