// Génère les images optimisées (AVIF + WebP, plusieurs largeurs) à partir de raw/.
// Usage : npm run images
// Ajouter une image : la placer dans raw/, ajouter une entrée dans SOURCES, relancer.
import { mkdirSync } from 'node:fs'
import sharp from 'sharp'

const OUT = 'public/images'

// crop : zone conservée de la capture d'origine (retire les bords et le filigrane Windows en bas).
const SOURCES = [
  { name: 'agripredict', crop: { left: 2, top: 2, width: 1354, height: 548 } },
  { name: 'dobi', crop: { left: 2, top: 2, width: 1340, height: 548 } },
  { name: 'xmarket', crop: { left: 2, top: 2, width: 1346, height: 548 } },
  { name: 'roserelais', crop: { left: 2, top: 2, width: 1346, height: 548 } },
  { name: 'blackfriday', crop: { left: 2, top: 2, width: 1346, height: 548 } },
  { name: 'velomax', crop: { left: 2, top: 2, width: 1347, height: 548 } },
  // Portrait détouré (fond retiré, couleurs d'origine conservées, aucune retouche de luminosité).
  {
    name: 'osiax-detoure',
    crop: { left: 150, top: 112, width: 943, height: 1327 },
    widths: [480, 960],
  },
]

const DEFAULT_WIDTHS = [640, 1280]

mkdirSync(OUT, { recursive: true })

for (const { name, crop, widths = DEFAULT_WIDTHS } of SOURCES) {
  const base = crop ? sharp(`raw/${name}.png`).extract(crop) : sharp(`raw/${name}.png`)
  const buffer = await base.png().toBuffer() // PNG : garde la transparence
  const meta = await sharp(buffer).metadata()
  for (const width of widths) {
    const resized = sharp(buffer).resize({ width, withoutEnlargement: true })
    await resized.clone().avif({ quality: 60 }).toFile(`${OUT}/${name}-${width}.avif`)
    await resized.clone().webp({ quality: 78 }).toFile(`${OUT}/${name}-${width}.webp`)
  }
  console.log(`${name} : ${meta.width}×${meta.height} → ${widths.join(', ')} px`)
}
