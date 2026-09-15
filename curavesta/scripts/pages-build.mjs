// Root entry point: the same GitHub Pages workflow can deploy this small site.
// Live publication intentionally requires the verified production configuration.
import { execFileSync } from 'node:child_process';
import { mkdir, copyFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const production = !process.argv.includes('--preview');
execFileSync(process.execPath, [fileURLToPath(new URL('build.mjs', import.meta.url)), ...(production ? ['--production'] : [])], { stdio: 'inherit' });
await mkdir(new URL('../../dist/assets/', import.meta.url), { recursive: true });
for (const path of ['index.html', '404.html', '.nojekyll', 'styles.css', 'app.js', 'site-config.js', 'enquiry.js', 'assets/favicon.svg', 'assets/hero-illustration.png']) {
  await copyFile(new URL('../dist/' + path, import.meta.url), new URL('../../dist/' + path, import.meta.url));
}
console.log('GitHub Pages files prepared in repository-root dist/.');
