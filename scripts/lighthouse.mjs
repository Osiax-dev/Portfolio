// Audit Lighthouse sur la version de production (npm run build && npm run preview).
// Usage : node scripts/lighthouse.mjs [url] [--mobile]
import { execFileSync } from 'node:child_process'
import { mkdirSync, readFileSync } from 'node:fs'

const url = process.argv.find((a) => a.startsWith('http')) ?? 'http://localhost:4173'
const mobile = process.argv.includes('--mobile')
const chrome = process.env.CHROME_PATH
mkdirSync('reports', { recursive: true })
const out = `reports/lighthouse-${mobile ? 'mobile' : 'desktop'}`

const args = [
  'lighthouse',
  url,
  '--quiet',
  '--output=json',
  '--output=html',
  `--output-path=${out}`,
  '--only-categories=performance,accessibility,best-practices,seo',
  '--chrome-flags=--headless=new --no-sandbox',
]
if (!mobile) args.push('--preset=desktop')
execFileSync('npx', args, {
  stdio: 'inherit',
  env: { ...process.env, ...(chrome && { CHROME_PATH: chrome }) },
})

const report = JSON.parse(readFileSync(`${out}.report.json`, 'utf8'))
const min = { performance: 0.9, accessibility: 0.95, 'best-practices': 0.9, seo: 0.9 }
let ok = true
for (const [id, c] of Object.entries(report.categories)) {
  const score = Math.round(c.score * 100)
  const pass = c.score >= (min[id] ?? 0.9)
  ok &&= pass
  console.log(`${pass ? '✔' : '✘'} ${c.title.padEnd(16)} ${score}`)
}
console.log(`Rapport : ${out}.report.html`)
process.exit(ok ? 0 : 1)
