import { academicSkills, skillGroups } from '../../data/content'
import { projects } from '../../data/projects'
import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'

const projectName = (id: string) => projects.find((p) => p.id === id)?.name ?? id

export function Skills() {
  return (
    <section id="competences" aria-labelledby="competences-titre" className="py-20 md:py-32">
      <div className="container-site">
        <SectionHeader
          id="competences"
          index="03"
          title="Compétences"
          intro={
            <p>
              Classées par ce qu’elles me permettent de faire, avec les projets où vous pouvez les
              voir à l’œuvre. Pas de pourcentages : les réalisations parlent mieux.
            </p>
          }
        />
        <ul className="mt-16 grid gap-5 md:mt-24 md:grid-cols-2">
          {skillGroups.map((group, i) => (
            <li key={group.title}>
              <Reveal
                delay={(i % 2) * 0.08}
                className="flex h-full flex-col rounded-3xl border border-line bg-surface p-6 transition-colors hover:border-line-strong md:p-8"
              >
                <span className="text-[0.875rem] font-semibold text-accent" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 text-[clamp(1.5rem,2.4vw,2rem)] leading-tight font-bold tracking-tight">
                  {group.title}
                </h3>
                <p className="mt-2 text-fg-soft">{group.text}</p>
                <ul className="mt-6 flex flex-wrap gap-2" aria-label={`Outils : ${group.title}`}>
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-line px-3.5 py-1.5 text-[0.9375rem]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-auto pt-6 text-[0.9375rem] text-fg-soft">
                  À voir dans :{' '}
                  {group.projects.map((id, j) => (
                    <span key={id}>
                      <a
                        href={`#${id}`}
                        className="font-medium text-fg underline decoration-accent underline-offset-4 hover:text-accent"
                      >
                        {projectName(id)}
                      </a>
                      {j < group.projects.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-fg-soft">
          Bases acquises en formation :{' '}
          <span className="text-fg">{academicSkills.join(' · ')}</span>
        </p>
      </div>
    </section>
  )
}
