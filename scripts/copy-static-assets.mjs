import { cp, mkdir } from 'node:fs/promises';

await mkdir('dist/assets', { recursive: true });
await cp('assets', 'dist/assets', { recursive: true, force: true });
await import('./optimize-cover-assets.mjs');
