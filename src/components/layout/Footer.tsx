import { ArrowUp, MessageCircle } from 'lucide-react'
import { profile } from '../../data/profile'

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg">
      <div className="container-site flex flex-col gap-8 py-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="display text-[clamp(1.75rem,4vw,2.75rem)]">
            {profile.firstName} <span className="outline-text-thin">{profile.lastName}</span>
          </p>
          <p className="mt-3 text-fg-soft">
            {profile.role} · {profile.location}
          </p>
        </div>
        <div className="flex flex-col gap-3 md:items-end">
          <ul className="flex flex-wrap gap-x-6 gap-y-1">
            {profile.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center font-medium text-fg-soft transition-colors hover:text-accent"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="text-[0.9375rem] text-fg-soft">
            © {new Date().getFullYear()} {profile.firstName} {profile.lastName}
            <span aria-hidden="true"> · </span>
            <a
              href="#top"
              className="inline-flex min-h-11 items-center gap-1 text-fg hover:text-accent"
            >
              Haut de page <ArrowUp aria-hidden="true" className="size-4" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

/** Accès rapide à WhatsApp sur mobile. */
export function WhatsAppButton() {
  return (
    <a
      href={profile.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Discuter sur WhatsApp (nouvel onglet)"
      className="fixed right-4 bottom-4 z-40 inline-flex size-14 items-center justify-center rounded-full bg-accent text-on-accent shadow-[0_10px_30px_-8px_rgb(0_0_0/0.6)] transition-transform hover:-translate-y-0.5 md:hidden"
    >
      <MessageCircle aria-hidden="true" className="size-6" />
    </a>
  )
}
