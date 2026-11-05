import { useRef } from 'react'
import { m, useReducedMotion, useScroll } from 'motion/react'
import { method } from '../../data/content'
import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'

/** Section claire, comme un studio éclairé : la seule rupture de fond du site. */
export function Method() {
  const listRef = useRef<HTMLOListElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 80%', 'end 60%'] })

  return (
    <section
      id="methode"
      aria-labelledby="methode-titre"
      className="bg-light py-20 text-light-fg md:py-32"
    >
      <div className="container-site">
        <SectionHeader
          id="methode"
          index="04"
          title="Méthode"
          tone="light"
          intro={
            <p>
              Cinq étapes, appliquées à chaque projet. Ici illustrées par un cas réel :{' '}
              <a
                href="#dobi"
                className="font-semibold text-light-fg underline decoration-light-accent decoration-2 underline-offset-4"
              >
                DOBI
              </a>
              .
            </p>
          }
        />

        <div className="relative mt-16 md:mt-24">
          {/* Fil de progression qui se remplit au défilement (vertical sur mobile, horizontal sur grand écran). */}
          <span
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-[0.6875rem] w-px bg-light-line lg:hidden"
          />
          <m.span
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-[0.6875rem] w-0.5 origin-top bg-light-accent lg:hidden"
            style={reduce ? undefined : { scaleY: scrollYProgress }}
          />
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 hidden h-px bg-light-line lg:block"
          />
          <m.span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 hidden h-0.5 origin-left bg-light-accent lg:block"
            style={reduce ? undefined : { scaleX: scrollYProgress }}
          />
          <ol ref={listRef} className="lg:grid lg:grid-cols-5 lg:gap-8">
            {method.map((item, i) => (
              <li key={item.step} className="relative pb-12 pl-10 lg:pt-10 lg:pb-0 lg:pl-0">
                <span
                  aria-hidden="true"
                  className="absolute top-1 left-0 size-6 rounded-full border-2 border-light-accent bg-light lg:-top-3"
                />
                <Reveal delay={i * 0.06}>
                  <p
                    className="display text-[clamp(2.5rem,4.5vw,3.75rem)] text-light-accent"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mt-3 text-2xl font-bold tracking-tight">{item.step}</h3>
                  <p className="mt-2 text-light-soft">{item.text}</p>
                  <p className="mt-5 rounded-2xl bg-white/70 p-4 text-[0.9375rem]">
                    <span className="label block text-light-accent">Sur DOBI</span>
                    <span className="mt-1 block text-light-fg">{item.example}</span>
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
