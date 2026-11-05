import { test, expect, type Page } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

/** Bloque les appels externes (Analytics) et simule Formspree pour des tests stables. */
async function prepare(page: Page) {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.route(/googletagmanager|google-analytics/, (route) =>
    route.fulfill({ status: 204, body: '' }),
  )
  await page.route('https://formspree.io/**', (route) =>
    route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' }),
  )
}

/** Fait défiler toute la page pour charger les images différées. */
async function scrollAll(page: Page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 30))
    }
    window.scrollTo(0, 0)
  })
}

test.beforeEach(async ({ page }) => {
  await prepare(page)
})

test('la page se charge sans erreur console, avec un seul h1', async ({ page }) => {
  const errors: string[] = []
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
  page.on('pageerror', (e) => errors.push(e.message))
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
  await scrollAll(page)
  await page.waitForTimeout(3000) // laisse passer le chargement différé d'Analytics
  expect(errors).toEqual([])
})

test('toutes les images sont chargées après défilement', async ({ page }) => {
  await page.goto('/')
  await scrollAll(page)
  await page.waitForLoadState('networkidle')
  const broken = await page.evaluate(() =>
    [...document.images]
      .filter((img) => !img.complete || img.naturalWidth === 0)
      .map((img) => img.currentSrc || img.src),
  )
  expect(broken).toEqual([])
})

test('accessibilité WCAG 2.1 AA (axe)', async ({ page }) => {
  await page.goto('/')
  await scrollAll(page)
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze()
  expect(
    results.violations.map(
      (v) => `${v.id} : ${v.nodes.map((n) => n.target.join(' ')).join(' | ')}`,
    ),
  ).toEqual([])
})

test('les ancres internes existent et les liens externes sont sûrs', async ({ page }) => {
  await page.goto('/')
  const report = await page.evaluate(() => {
    const missing: string[] = []
    const unsafe: string[] = []
    for (const a of document.querySelectorAll<HTMLAnchorElement>('a[href]')) {
      const href = a.getAttribute('href')!
      if (href.startsWith('#')) {
        if (!document.getElementById(href.slice(1))) missing.push(href)
      } else if (/^https?:/.test(href)) {
        if (!href.startsWith('https://')) unsafe.push(`${href} (pas en HTTPS)`)
        if (a.target !== '_blank' || !a.rel.includes('noopener'))
          unsafe.push(`${href} (target/rel)`)
      }
    }
    return { missing, unsafe }
  })
  expect(report).toEqual({ missing: [], unsafe: [] })
})

test('le CV est téléchargeable', async ({ request }) => {
  const res = await request.get('/cv-osiax-tcheoubi.pdf')
  expect(res.status()).toBe(200)
  expect(res.headers()['content-type']).toContain('pdf')
})

for (const width of [360, 390, 768, 1024, 1280, 1920]) {
  test(`aucun défilement horizontal à ${width} px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    await scrollAll(page)
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    )
    expect(overflow).toBe(0)
  })
}

test('menu mobile : ouverture, navigation et fermeture', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.getByRole('button', { name: 'Ouvrir le menu' }).click()
  const menu = page.getByRole('navigation', { name: 'Menu mobile' })
  await expect(menu).toBeVisible()
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  )
  expect(overflow).toBe(0)
  await menu.getByRole('link', { name: /Méthode/ }).click()
  await expect(menu).toBeHidden()
  await expect(page.locator('#methode')).toBeInViewport()
})

test('formulaire de contact : erreurs puis envoi réussi', async ({ page }) => {
  await page.goto('/#contact')
  const submit = page.getByRole('button', { name: /envoyer le message/i })
  await submit.click()
  await expect(page.getByText('Indiquez votre nom (2 caractères minimum).')).toBeVisible()
  await expect(page.getByLabel('Nom')).toBeFocused()

  await page.getByLabel('Nom').fill('Awa Test')
  await page.getByLabel('Adresse e-mail').fill('awa@exemple.bj')
  await page
    .getByRole('textbox', { name: 'Votre projet' })
    .fill('Je souhaite créer une application de gestion.')
  await submit.click()
  await expect(page.getByRole('status')).toContainText('Message envoyé')
})

test('le sommaire du hero mène aux projets', async ({ page }) => {
  await page.goto('/')
  await page
    .getByRole('navigation', { name: 'Sommaire des réalisations' })
    .getByRole('link', { name: /DOBI/ })
    .click()
  await expect(page.locator('#dobi h3')).toBeInViewport()
})
