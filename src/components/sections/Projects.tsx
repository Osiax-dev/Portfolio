import { ArrowUpRight } from 'lucide-react'
import { learning } from '../../data/content'
import { projects } from '../../data/projects'
import { useActiveSection } from '../../hooks/useActiveSection'
import { cn } from '../../lib/cn'
import { Picture } from '../ui/Picture'
import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'
import { ProjectCase } from './ProjectCase'

const projectIds = projects.map((p) => p.id)

function ProjectIndex() {
  const active = useActiveSection(projectIds)
  return (
    <nav aria-label="Réalisations" className="sticky top-28 hidden xl:block">
      <p className="label pb-3 text-fg-soft">Index</p>
      <ol>
        {projects.map((p) => (
          <li key={p.id}>
            <a
              href={`#${p.id}`}
              aria-current={active === p.id ? 'true' : undefined}
              className={cn(
                'flex items-baseline gap-3 border-t border-line py-2.5 transition-colors hover:text-fg',
                active === p.id ? 'text-fg' : 'text-fg-soft',
              )}
            >
              <span className="text-[0.8125rem] font-semibold text-accent">{p.number}</span>
              <span className="font-medium">{p.name}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

function Learning() {
  return (
    <div className="border-t border-line pt-8">
      <Reveal>
        <p className="label text-accent">En parallèle</p>
        <h3 className="display mt-3 text-[clamp(2rem,4.5vw,3.5rem)]">Apprentissages</h3>
        <p className="mt-3 max-w-[60ch] text-fg-soft">
          Des projets d’entraînement et de stage qui m’ont fait progresser, présentés à part des
          réalisations principales.
        </p>
      </Reveal>
      <ul className="mt-8 grid gap-6 md:grid-cols-2 md:items-start">
        {learning.map((item, i) => (
          <li key={item.name}>
            <Reveal
              delay={i * 0.08}
              className="flex flex-col overflow-hidden rounded-2xl border border-line bg-surface"
            >
              {item.image && (
                <div className="border-b border-line">
                  <Picture image={item.image} sizes="(min-width: 768px) 45vw, 100vw" />
                </div>
              )}
              <div className="flex flex-1 flex-col p-6">
                <p className="label text-accent">
                  {item.context} · {item.year}
                </p>
                <h4 className="mt-2 text-2xl font-extrabold tracking-tight">{item.name}</h4>
                <p className="mt-3 flex-1 text-fg-soft">{item.summary}</p>
                <p className="mt-4 text-[0.9375rem] text-fg-soft">{item.stack.join(' · ')}</p>
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex min-h-11 items-center gap-2 self-start font-semibold underline decoration-accent underline-offset-4 hover:text-accent"
                  >
                    Voir {item.name}
                    <ArrowUpRight aria-hidden="true" className="size-4" />
                  </a>
                )}
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Projects() {
  return (
    <section id="realisations" aria-labelledby="realisations-titre" className="py-20 md:py-32">
      <div className="container-site">
        <SectionHeader
          id="realisations"
          index="01"
          title="Réalisations"
          intro={
            <p>
              Cinq projets en ligne, du besoin à la mise en production. Pour chacun : le problème,
              la solution, les choix techniques et ce que j’ai fait.
            </p>
          }
        />
        <div className="mt-16 grid gap-10 md:mt-24 xl:grid-cols-[13rem_1fr] xl:gap-16">
          <div>
            <ProjectIndex />
          </div>
          <div>
            {projects.map((project) => (
              <ProjectCase key={project.id} project={project} />
            ))}
            <Learning />
          </div>
        </div>
      </div>
    </section>
  )
}
