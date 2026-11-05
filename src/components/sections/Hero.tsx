import { useRef } from 'react'
import { m, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowDownRight, ArrowRight } from 'lucide-react'
import { profile } from '../../data/profile'
import { projects } from '../../data/projects'
import { ButtonLink } from '../ui/ButtonLink'

const ease = [0.25, 1, 0.5, 1] as const
const portraitBase = `${import.meta.env.BASE_URL}images/osiax-detoure`

/**
 * Hero « Studio » : le prénom passe derrière le portrait, le nom en contour passe devant.
 * Les grands éléments (prénom, portrait, phrase) ne sont animés qu'en déplacement, jamais
 * en opacité, pour s'afficher immédiatement (LCP).
 */
export function Hero() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const backY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%'])
  const portraitY = useTransform(scrollYProgress, [0, 1], ['0%', '8%'])

  const rise = (delay: number, y = 40) => ({
    initial: reduce ? false : { y },
    animate: { y: 0 },
    transition: { duration: 0.9, ease, delay },
  })
  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease, delay },
  })

  return (
    <section id="top" ref={ref} aria-labelledby="hero-titre" className="relative overflow-hidden">
      <div className="studio-light relative h-[min(128vw,44rem)] sm:h-[46rem] xl:h-[100svh] xl:max-h-[72rem] xl:min-h-[46rem]">
        <h1 id="hero-titre">
          <m.span
            aria-hidden="true"
            style={reduce ? undefined : { y: backY }}
            className="absolute inset-x-0 top-[17%] z-0 block text-center xl:top-[13%]"
          >
            <m.span
              {...rise(0)}
              className="display inline-block text-[clamp(5.5rem,24vw,19rem)] leading-[0.8] tracking-[-0.055em]"
            >
              {profile.firstName.toUpperCase()}
            </m.span>
          </m.span>
          <m.span
            {...fade(0.55)}
            aria-hidden="true"
            className="absolute inset-x-0 bottom-[9%] z-20 block text-center xl:bottom-[21%]"
          >
            <span className="display outline-text inline-block text-[clamp(3.25rem,14.5vw,8.5rem)] leading-[0.8] tracking-[-0.04em] xl:text-[min(9vw,8rem)]">
              {profile.lastName.toUpperCase()}
            </span>
          </m.span>
          <span className="sr-only">
            {profile.firstName} {profile.lastName} — {profile.role}
          </span>
        </h1>

        <m.div
          style={reduce ? undefined : { y: portraitY }}
          className="absolute bottom-0 left-1/2 z-10 h-[90%] -translate-x-[46%] xl:h-[93%]"
        >
          <m.picture {...rise(0.1, 60)} className="block h-full">
            <source
              type="image/avif"
              srcSet={`${portraitBase}-480.avif 480w, ${portraitBase}-960.avif 960w`}
              sizes="(min-width: 1280px) 40vw, 75vw"
            />
            <source
              type="image/webp"
              srcSet={`${portraitBase}-480.webp 480w, ${portraitBase}-960.webp 960w`}
              sizes="(min-width: 1280px) 40vw, 75vw"
            />
            <img
              src={`${portraitBase}-960.webp`}
              alt="Osiax Tcheoubi, bras croisés, portant un sweat noir marqué « </> Developer »."
              width={943}
              height={1327}
              fetchPriority="high"
              decoding="async"
              className="block h-full w-auto max-w-none"
            />
          </m.picture>
        </m.div>
        {/* Fondu vers le fond de page, pour enchaîner sans coupure. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 z-[15] h-24 bg-gradient-to-b from-transparent to-bg/70 xl:h-40"
        />
      </div>

      <div className="container-site relative z-30 grid gap-12 pt-10 pb-16 md:grid-cols-12 md:items-end xl:pointer-events-none xl:absolute xl:inset-x-0 xl:bottom-0 xl:pt-0 xl:pb-14">
        <div className="md:col-span-7 xl:pointer-events-auto xl:col-span-4">
          <m.p {...fade(0.45)} className="label text-accent">
            {profile.role}
            <span className="text-fg-soft xl:hidden"> · {profile.location}</span>
          </m.p>
          <p className="mt-3 max-w-[24ch] text-[clamp(1.5rem,2.3vw,1.75rem)] leading-[1.25] font-semibold tracking-tight xl:max-w-[18ch]">
            Je transforme des besoins réels en produits web : API, interfaces, mise en ligne.
          </p>
          <m.div {...fade(0.65)} className="mt-7 flex flex-wrap gap-3">
            <ButtonLink
              href="#realisations"
              className="w-full sm:w-auto"
              icon={<ArrowDownRight className="size-4" />}
            >
              Voir les réalisations
            </ButtonLink>
            <ButtonLink
              href="#contact"
              variant="outline"
              className="w-full sm:w-auto"
              icon={<ArrowRight className="size-4" />}
            >
              Me contacter
            </ButtonLink>
          </m.div>
        </div>

        <m.nav
          {...fade(0.8)}
          aria-label="Sommaire des réalisations"
          className="md:col-span-5 xl:pointer-events-auto xl:col-span-3 xl:col-start-10"
        >
          <p className="label mb-2 text-fg-soft xl:hidden">Réalisations</p>
          <ol>
            {projects.map((project) => (
              <li key={project.id} className="border-t border-line">
                <a
                  href={`#${project.id}`}
                  className="group flex min-h-11 items-center justify-between gap-4 py-2.5 transition-colors hover:text-accent"
                >
                  <span className="font-medium">{project.name}</span>
                  <span className="text-[0.8125rem] font-medium tracking-[0.1em] text-accent transition-transform group-hover:-translate-x-1">
                    {project.number}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </m.nav>
      </div>
    </section>
  )
}
