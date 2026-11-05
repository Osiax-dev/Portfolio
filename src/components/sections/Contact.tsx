import { ArrowUpRight, Download, Mail, MessageCircle } from 'lucide-react'
import { profile } from '../../data/profile'
import { Reveal } from '../ui/Reveal'
import { ContactForm } from './ContactForm'

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-titre" className="studio-light py-20 md:py-32">
      <div className="container-site">
        <Reveal>
          <p aria-hidden="true" className="label text-accent">
            06 — Contact
          </p>
          <h2
            id="contact-titre"
            className="display mt-5 max-w-[14ch] text-[clamp(2.75rem,8vw,7rem)]"
          >
            Parlons de votre projet<span className="text-accent">.</span>
          </h2>
          <p className="mt-6 max-w-[52ch] text-lg text-fg md:text-xl">
            Une application à créer, un site à reprendre, une idée à cadrer : écrivez-moi. Je
            réponds généralement sous 24 heures.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-12 md:mt-20 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <ul className="rounded-3xl border border-line bg-bg/80 p-6 backdrop-blur-sm md:p-8">
              <li className="pb-5">
                <p className="label flex items-center gap-2 text-accent">
                  <Mail aria-hidden="true" className="size-4" /> E-mail
                </p>
                <a
                  href={`mailto:${profile.email}`}
                  className="mt-2 inline-block text-[clamp(1.125rem,2.2vw,1.5rem)] font-bold break-all hover:text-accent"
                >
                  {profile.email}
                </a>
              </li>
              <li className="border-t border-line py-5">
                <p className="label flex items-center gap-2 text-accent">
                  <MessageCircle aria-hidden="true" className="size-4" /> WhatsApp
                </p>
                <a
                  href={profile.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-[clamp(1.125rem,2.2vw,1.5rem)] font-bold hover:text-accent"
                >
                  {profile.whatsappDisplay}
                </a>
              </li>
              <li className="border-t border-line py-5">
                <p className="label text-accent">Ailleurs</p>
                <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
                  {profile.socials.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center gap-1 text-lg font-semibold hover:text-accent"
                      >
                        {s.label}
                        <ArrowUpRight aria-hidden="true" className="size-4 text-accent" />
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="border-t border-line pt-5">
                <a
                  href={profile.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center gap-2 rounded-full border border-line-strong px-5 font-semibold transition-colors hover:border-fg hover:bg-fg hover:text-bg"
                >
                  <Download aria-hidden="true" className="size-4" />
                  Télécharger mon CV (PDF)
                </a>
              </li>
            </ul>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.1}>
            <div className="rounded-3xl border border-line bg-bg/80 p-6 backdrop-blur-sm md:p-8">
              <h3 className="text-2xl font-bold tracking-tight">Écrire un message</h3>
              <p className="mt-1 mb-6 text-fg-soft">
                Tous les champs sont obligatoires, sauf le sujet.
              </p>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
