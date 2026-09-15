import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { gunzipSync } from 'node:zlib';

const partUrls = [1, 2, 3, 4].map((n) => new URL(`../public/site.part${n}`, import.meta.url));
const parts = await Promise.all(partUrls.map((url) => readFile(url)));

let html = gunzipSync(Buffer.concat(parts)).toString('utf8');

/*
 * Mobile timeline fix.
 * The original responsive rule reduces .time to two columns, but leaves the
 * paragraph on auto-placement. That places it in the narrow number column.
 * Keep every content element in column two and make the layout explicit.
 */
const responsiveFix = `
/* BetterHealth responsive fixes */
@media (max-width:860px){
  .time li{
    grid-template-columns:32px minmax(0,1fr);
    gap:10px 18px;
    align-items:start;
  }
  .time li > .num{
    grid-column:1;
    grid-row:1;
    padding-top:.45em;
  }
  .time li > h3{
    grid-column:2;
    grid-row:1;
    min-width:0;
  }
  .time li > p{
    grid-column:2;
    grid-row:2;
    min-width:0;
  }
  .time li > .when{
    grid-column:2;
    grid-row:3;
    margin-top:2px;
    white-space:normal;
  }
}
`;

html = html.replace('</style>', `${responsiveFix}\n</style>`);

const distDir = new URL('../dist/', import.meta.url);
await mkdir(distDir, { recursive: true });
await writeFile(new URL('index.html', distDir), html);
await writeFile(new URL('404.html', distDir), html);

console.log(`Built BetterHealth website (${Buffer.byteLength(html).toLocaleString()} bytes).`);
