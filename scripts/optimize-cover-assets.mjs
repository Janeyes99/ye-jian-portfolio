import { access, mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { projectCardDetails } from '../src/data/project-card-details.js';

const widths = [480, 960];
const covers = [...new Set(projectCardDetails.map((project) => project.coverImage.split('?')[0]))];

const outputPath = (source, width, format) => {
  const parsed = path.parse(source);
  return path.join('dist', parsed.dir, `${parsed.name}.w${width}.${format}`);
};

const generateVariant = async (source, width, format, animated) => {
  const destination = outputPath(source, width, format);
  await mkdir(path.dirname(destination), { recursive: true });
  const pipeline = sharp(source, animated ? { animated: true, limitInputPixels: false } : undefined)
    .resize({ width, withoutEnlargement: false });

  if (format === 'avif') {
    await pipeline.avif({ quality: 52, effort: 2 }).toFile(destination);
  } else {
    await pipeline.webp({ quality: 82, effort: 4 }).toFile(destination);
  }
};

for (const cover of covers) {
  await access(cover);
  const animated = /\.gif$/i.test(cover);
  for (const width of widths) {
    await generateVariant(cover, width, 'webp', animated);
    if (!animated) await generateVariant(cover, width, 'avif', false);
  }
}
