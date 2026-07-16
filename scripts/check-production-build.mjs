import { gzipSync } from 'node:zlib';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const distDir = path.resolve('dist');
const buildDir = path.join(distDir, 'assets/build');
const indexHtml = await readFile(path.join(distDir, 'index.html'), 'utf8');
const buildFiles = await readdir(buildDir);
const textFiles = buildFiles.filter((file) => /\.(?:js|css)$/i.test(file));
const buildText = await Promise.all(textFiles.map((file) => readFile(path.join(buildDir, file), 'utf8')));
const combinedBuildText = `${indexHtml}\n${buildText.join('\n')}`;

const forbidden = [
  'cdn.tailwindcss.com',
  'esm.sh',
  '?dev',
  'createObjectURL(new Blob',
];

for (const marker of forbidden) {
  if (combinedBuildText.includes(marker)) throw new Error(`Forbidden production dependency found: ${marker}`);
}

if (/\b(?:src|href)="\/assets\/build\//.test(indexHtml)) {
  throw new Error('Build entry URLs must remain relative for GitHub project Pages and custom domains.');
}

const linkedAssets = [...indexHtml.matchAll(/(?:src|href)="([^"?#]+\.(?:js|css))"/g)]
  .map((match) => match[1].replace(/^\.\//, ''));
if (!linkedAssets.length) throw new Error('No production JS or CSS entry assets found.');

let linkedJsGzip = 0;
let linkedCssGzip = 0;
for (const relativePath of linkedAssets) {
  if (!/-[A-Za-z0-9_-]{8,}\.(?:js|css)$/.test(relativePath)) {
    throw new Error(`Production entry is not content-hashed: ${relativePath}`);
  }
  const bytes = await readFile(path.join(distDir, relativePath));
  const gzipBytes = gzipSync(bytes).byteLength;
  if (relativePath.endsWith('.js')) linkedJsGzip += gzipBytes;
  if (relativePath.endsWith('.css')) linkedCssGzip += gzipBytes;
}

const kb = (bytes) => (bytes / 1024).toFixed(1);
if (linkedJsGzip > 150 * 1024) {
  throw new Error(`Initial linked JS exceeds 150 KB gzip: ${kb(linkedJsGzip)} KB`);
}
if (linkedCssGzip > 40 * 1024) {
  throw new Error(`Initial CSS exceeds 40 KB gzip: ${kb(linkedCssGzip)} KB`);
}

const modernCoverCount = (await readdir(path.join(distDir, 'assets/portfolio'), { recursive: true }))
  .filter((file) => /\.w(?:480|960)\.(?:avif|webp)$/i.test(file)).length;
if (modernCoverCount < 60) throw new Error(`Expected optimized cover variants, found ${modernCoverCount}.`);

console.log(`Production bundle OK: linked JS ${kb(linkedJsGzip)} KB gzip, CSS ${kb(linkedCssGzip)} KB gzip, ${modernCoverCount} modern cover assets.`);
