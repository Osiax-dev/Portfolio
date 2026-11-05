import { useRef, useState, type ReactNode } from 'react'
import { m, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowRight, ArrowUpRight, ChevronDown } from 'lucide-react'
import type { Project } from '../../data/types'
import { cn } from '../../lib/cn'
import { BrowserFrame } from '../ui/BrowserFrame'
import { ButtonLink } from '../ui/ButtonLink'
import { Picture } from '../ui/Picture'
import { Reveal } from '../ui/Reveal'

function Screenshot({ project, compact }: { project: Project; compact: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  // Profondeur légère : l'image glisse un peu moins vite que la page.
  const y = useTransform(scrollYProgress, [0, 1], ['-4%', '4%'])

  return (
    <div ref={ref}>
      <BrowserFrame url={project.displayUrl}>
        <m.div style={reduce ? undefined : { y, scale: 1.09 }}>
          <Picture
            image={project.image}
            sizes={compact ? '(min-width: 1024px) 45vw, 100vw' : '(min-width: 1280px) 62vw, 100vw'}
          />
        </m.div>
      </BrowserFrame>
    </div>
  )
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h4 className="label text-accent">{title}</h4>
      <div className="mt-3">{children}</div>
    </div>
  )
}

function FeatureList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span
            aria-hidden="true"
            className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-accent"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function Tags({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full border border-line px-3 py-1 text-[0.9375rem] text-fg-soft"
        >
          {item}
        </li>
      ))}
    </ul>
  )
}

export function ProjectCase({ project }: { project: Project }) {
  const [detailsOpen, setDetailsOpen] = useState(false)
  const compact = !project.challenges
  const detailsId = `${project.id}-details`

  return (
    <article
      id={project.id}
      aria-labelledby={`${project.id}-nom`}
      className="scroll-mt-24 border-t border-line pt-8 pb-20 md:pb-28"
    >
      <Reveal>
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 text-fg-soft">
          <span className="label">
            <span className="text-accent">{project.number}</span>
            <span className="ml-3">{project.kind}</span>
          </span>
          <span className="label">{project.year}</span>
        </div>
        <h3
          id={`${project.id}-nom`}
          className="display mt-5 text-[clamp(2.5rem,7vw,5.75rem)] break-words"
        >
          {project.name}
        </h3>
        <p className="mt-4 max-w-[36ch] text-[clamp(1.25rem,2.2vw,1.625rem)] leading-snug font-medium text-fg-soft">
          {project.tagline}
        </p>
      </Reveal>

      <div className={cn('mt-10 grid gap-10', compact && 'lg:grid-cols-12 lg:items-start')}>
        <Reveal className={cn(compact && 'lg:sticky lg:top-24 lg:col-span-7')}>
          <Screenshot project={project} compact={compact} />
        </Reveal>

        <div className={cn('grid gap-10', compact ? 'lg:col-span-5' : 'md:grid-cols-12')}>
          {project.figures && (
            <Reveal className="md:col-span-12">
              <dl
                className={cn(
                  'grid grid-cols-2 gap-x-6',
                  project.figures.length > 2 && 'md:grid-cols-4',
                )}
              >
                {project.figures.map((f) => (
                  <div key={f.label} className="flex flex-col border-t border-line py-4">
                    <dt className="order-2 mt-1 text-[0.9375rem] text-fg-soft">{f.label}</dt>
                    <dd className="order-1 text-[clamp(2.25rem,4.5vw,3.5rem)] leading-none font-extrabold tracking-[-0.04em] text-accent">
                      {f.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          )}

          <Reveal className={cn('space-y-8', !compact && 'md:col-span-6')}>
            <Block title="Le besoin">
              <p className="max-w-[62ch]">{project.need}</p>
            </Block>
            <Block title="La solution">
              <p className="max-w-[62ch]">{project.solution}</p>
            </Block>
          </Reveal>

          <Reveal className={cn('space-y-8', !compact && 'md:col-span-6')} delay={0.08}>
            <Block title="Fonctionnalités clés">
              <FeatureList items={project.features} />
            </Block>
            {compact && (
              <Block title="Mon rôle">
                <p>{project.role}</p>
              </Block>
            )}
          </Reveal>

          {project.architecture && (
            <Reveal className="md:col-span-12">
              <h4 className="label text-accent">{project.architecture.title}</h4>
              <ol className="mt-3 flex flex-col items-stretch gap-2 md:flex-row md:items-center">
                {project.architecture.blocks.map((b, i) => (
                  <li
                    key={b.name}
                    className="flex flex-col gap-2 md:flex-1 md:flex-row md:items-center"
                  >
                    <div className="flex-1 rounded-2xl border border-line bg-surface p-4">
                      <p className="text-lg font-bold">{b.name}</p>
                      <p className="text-[0.9375rem] text-fg-soft">{b.detail}</p>
                    </div>
                    {i < project.architecture!.blocks.length - 1 && (
                      <ArrowRight
                        aria-hidden="true"
                        className="mx-auto size-5 shrink-0 rotate-90 text-accent md:rotate-0"
                      />
                    )}
                  </li>
                ))}
              </ol>
            </Reveal>
          )}

          {project.flow && (
            <Reveal className={cn(!compact && 'md:col-span-12')}>
              <h4 className="label text-accent">{project.flow.title}</h4>
              <ol className="mt-3">
                {project.flow.steps.map((step, i) => (
                  <li key={step} className="flex items-baseline gap-4 border-t border-line py-3">
                    <span className="text-[0.875rem] font-semibold text-accent">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className={cn('font-medium', i === 2 && 'text-accent')}>{step}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
          )}

          {!compact && (
            <div className="md:col-span-12">
              <button
                type="button"
                className="flex min-h-12 w-full items-center justify-between border-y border-line text-[1rem] font-semibold md:hidden"
                aria-expanded={detailsOpen}
                aria-controls={detailsId}
                onClick={() => setDetailsOpen((v) => !v)}
              >
                Technologies, rôle et défis
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    'size-5 text-accent transition-transform',
                    detailsOpen && 'rotate-180',
                  )}
                />
              </button>
              <div
                id={detailsId}
                className={cn(
                  'grid gap-8 pt-6 md:grid md:grid-cols-12 md:pt-0',
                  detailsOpen ? 'grid' : 'hidden',
                )}
              >
                <div className="space-y-8 md:col-span-6">
                  {project.stack && (
                    <Block title="Technologies">
                      <Tags items={project.stack} />
                    </Block>
                  )}
                  <Block title="Mon rôle">
                    <p className="max-w-[62ch]">{project.role}</p>
                  </Block>
                </div>
                {project.challenges && (
                  <div className="md:col-span-6">
                    <Block title="Défis et choix techniques">
                      <ol className="space-y-3">
                        {project.challenges.map((c, i) => (
                          <li key={c} className="flex gap-3">
                            <span className="pt-0.5 text-[0.875rem] font-semibold text-accent">
                              {i + 1}.
                            </span>
                            <span>{c}</span>
                          </li>
                        ))}
                      </ol>
                    </Block>
                  </div>
                )}
              </div>
            </div>
          )}

          <div
            className={cn(
              'flex flex-wrap items-center gap-x-5 gap-y-3',
              !compact && 'md:col-span-12',
            )}
          >
            <ButtonLink
              href={project.url}
              target="_blank"
              icon={<ArrowUpRight className="size-4" />}
              aria-label={`${project.linkLabel} (nouvel onglet)`}
            >
              {project.linkLabel}
            </ButtonLink>
            {project.linkNote && (
              <span className="text-[0.9375rem] text-fg-soft">{project.linkNote}</span>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
