import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { learning, skillGroups, upcoming } from './content'
import { profile } from './profile'
import { projects } from './projects'

const imageExists = (name: string, width: number, ext: string) =>
  existsSync(resolve(__dirname, `../../public/images/${name}-${width}.${ext}`))

describe('données du portfolio', () => {
  it('contient les 5 réalisations demandées, dans l’ordre', () => {
    expect(projects.map((p) => p.id)).toEqual([
      'agripredict',
      'dobi',
      'roserelais',
      'xmarket',
      'blackfriday',
    ])
  })

  it.each(projects)('$name : liens HTTPS et champs obligatoires', (p) => {
    expect(p.url).toMatch(/^https:\/\//)
    expect(p.url).toContain(p.displayUrl)
    expect(p.name.trim().length).toBeGreaterThan(1)
    for (const field of [p.tagline, p.need, p.solution, p.role]) {
      expect(field.trim().length).toBeGreaterThan(5)
    }
    expect(p.features.length).toBeGreaterThan(0)
    expect(p.image.alt.length).toBeGreaterThan(20)
  })

  it.each(projects)('$name : images optimisées présentes', (p) => {
    for (const w of [640, 1280]) {
      expect(imageExists(p.image.name, w, 'avif')).toBe(true)
      expect(imageExists(p.image.name, w, 'webp')).toBe(true)
    }
  })

  it('les apprentissages ont leurs images si elles sont déclarées', () => {
    for (const item of learning) {
      if (item.image) expect(imageExists(item.image.name, 640, 'webp')).toBe(true)
    }
  })

  it('les compétences renvoient vers des projets existants', () => {
    const ids = new Set(projects.map((p) => p.id))
    for (const group of skillGroups) for (const id of group.projects) expect(ids.has(id)).toBe(true)
  })

  it('l’atelier n’utilise que des statuts autorisés', () => {
    const allowed = ['En réflexion', 'En préparation', 'En cours', 'À venir']
    for (const item of upcoming) expect(allowed).toContain(item.status)
  })

  it('le CV et le numéro WhatsApp sont corrects', () => {
    expect(existsSync(resolve(__dirname, '../../public', profile.cvUrl.replace(/^.*\//, '')))).toBe(
      true,
    )
    expect(profile.whatsappUrl).toBe('https://wa.me/2290161879221')
  })
})
