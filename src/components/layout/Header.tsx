import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, m, useReducedMotion } from 'motion/react'
import { Download, Menu, X } from 'lucide-react'
import { navLinks, profile } from '../../data/profile'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useHideOnScroll } from '../../hooks/useHideOnScroll'
import { cn } from '../../lib/cn'

const sectionIds = navLinks.map((link) => link.href.slice(1))

export function Header() {
  const [open, setOpen] = useState(false)
  const { hidden, scrolled } = useHideOnScroll()
  const active = useActiveSection(sectionIds)
  const reduce = useReducedMotion()
  const menuButton = useRef<HTMLButtonElement>(null)
  const firstLink = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    firstLink.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        menuButton.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <a
        href="#contenu"
        className="sr-only z-[60] rounded-full bg-accent px-5 py-3 font-semibold text-on-accent focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Aller au contenu
      </a>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-transform duration-300 ease-out',
          hidden && !open ? '-translate-y-full' : 'translate-y-0',
        )}
      >
        <div
          className={cn(
            'border-b transition-colors duration-300',
            scrolled || open ? 'border-line bg-bg/90 backdrop-blur-md' : 'border-transparent',
          )}
        >
          <div className="container-site flex h-[4.5rem] items-center justify-between gap-6">
            <a
              href="#top"
              className="text-[1.125rem] font-bold tracking-tight"
              onClick={() => setOpen(false)}
            >
              {profile.firstName} {profile.lastName}
            </a>

            <nav aria-label="Navigation principale" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {navLinks.map((link) => {
                  const isActive = active === link.href.slice(1)
                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        aria-current={isActive ? 'true' : undefined}
                        className={cn(
                          'relative block rounded-full px-4 py-2 text-[0.9375rem] transition-colors hover:text-fg',
                          isActive ? 'text-fg' : 'text-fg-soft',
                        )}
                      >
                        {link.label}
                        <span
                          aria-hidden="true"
                          className={cn(
                            'absolute bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-accent transition-opacity',
                            isActive ? 'opacity-100' : 'opacity-0',
                          )}
                        />
                      </a>
                    </li>
                  )
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <a
                href={profile.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden min-h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-[0.9375rem] font-medium transition-colors hover:border-fg hover:bg-fg hover:text-bg sm:inline-flex"
              >
                CV
                <Download aria-hidden="true" className="size-4" />
              </a>
              <button
                ref={menuButton}
                type="button"
                className="inline-flex size-11 items-center justify-center rounded-full border border-line-strong lg:hidden"
                aria-expanded={open}
                aria-controls="menu-mobile"
                aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
                onClick={() => setOpen((v) => !v)}
              >
                {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <m.nav
              id="menu-mobile"
              aria-label="Menu mobile"
              className="h-[calc(100dvh-4.5rem)] overflow-y-auto bg-bg lg:hidden"
              initial={reduce ? false : { opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
            >
              <ul className="container-site flex flex-col pt-6">
                {navLinks.map((link, i) => (
                  <li key={link.href} className="border-b border-line">
                    <a
                      ref={i === 0 ? firstLink : undefined}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline justify-between gap-4 py-5 transition-colors hover:text-accent"
                    >
                      <span className="display text-[clamp(2rem,9vw,3.5rem)]">{link.label}</span>
                      <span className="label text-accent">0{i + 1}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <div className="container-site flex flex-wrap gap-3 py-8">
                <a
                  href={profile.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center gap-2 rounded-full border border-line-strong px-5 font-semibold"
                >
                  <Download aria-hidden="true" className="size-4" />
                  Télécharger le CV
                </a>
                <a
                  href={profile.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center rounded-full bg-fg px-5 font-semibold text-bg"
                >
                  WhatsApp
                </a>
              </div>
            </m.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
