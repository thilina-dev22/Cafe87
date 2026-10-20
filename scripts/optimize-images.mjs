// Generates responsive WebP variants (480w / 960w) next to each source JPG/PNG,
// plus a 1200x630 social-share image. Run: npm run images
import sharp from 'sharp';
import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const root = 'public/assets/images';
const WIDTHS = [480, 960];

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else yield p;
  }
}

let saved = 0;
for await (const file of walk(root)) {
  if (!/\.jpe?g$/i.test(file) || /-(480|960)\./.test(file) || /og-cover|cafe-menu/.test(file)) continue;
  const base = file.replace(/\.[^.]+$/, '');
  const meta = await sharp(file).metadata();
  for (const w of WIDTHS) {
    const width = Math.min(w, meta.width);
    await sharp(file).resize({ width }).webp({ quality: 74, effort: 5 }).toFile(`${base}-${w}.webp`);
  }
  saved += (await stat(file)).size - (await stat(`${base}-960.webp`)).size;
}

// 1200x630 Open Graph card from the hero photo
await sharp('public/assets/images/real/resort-property-landscape.jpg')
  .resize(1200, 630, { fit: 'cover', position: 'attention' })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile('public/assets/images/og-cover.jpg');

// PWA / touch icons from the square favicon
for (const [name, size] of [['favicon-32.png', 32], ['icon-192.png', 192], ['icon-512.png', 512], ['apple-touch-icon.png', 180]]) {
  await sharp('public/favicon.png').resize(size, size).png({ compressionLevel: 9 }).toFile(`public/${name}`);
}
console.log(`Done. ~${Math.round(saved / 1024)} KB saved at 960w vs. original JPGs.`);
