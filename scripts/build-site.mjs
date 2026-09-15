import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { gunzipSync } from 'node:zlib';

const partUrls = [1, 2, 3, 4].map((n) => new URL(`../public/site.part${n}`, import.meta.url));
const parts = await Promise.all(partUrls.map((url) => readFile(url)));
const html = gunzipSync(Buffer.concat(parts));
const distDir = new URL('../dist/', import.meta.url);

await mkdir(distDir, { recursive: true });
await writeFile(new URL('index.html', distDir), html);
await writeFile(new URL('404.html', distDir), html);

console.log(`Built BetterHealth website (${html.length.toLocaleString()} bytes).`);
