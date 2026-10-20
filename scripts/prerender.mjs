// Injects server-rendered HTML into dist/index.html so crawlers, link previews and
// slow devices get real content before any JavaScript runs.
// Pipeline: vite build (client) -> vite build --ssr (this bundle) -> this script.
import { readFile, writeFile, rm } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const dist = path.resolve('dist');
const ssrDir = path.resolve('dist-ssr');

const { render } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);
const html = await readFile(path.join(dist, 'index.html'), 'utf8');

if (!html.includes('<div id="root"></div>')) throw new Error('Root placeholder not found in dist/index.html');
await writeFile(path.join(dist, 'index.html'), html.replace('<div id="root"></div>', `<div id="root">${render()}</div>`));
await rm(ssrDir, { recursive: true, force: true });
console.log('Prerendered dist/index.html');
