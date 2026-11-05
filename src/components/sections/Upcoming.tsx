import { upcoming } from '../../data/content'
import type { UpcomingStatus } from '../../data/types'
import { cn } from '../../lib/cn'
import { Reveal } from '../ui/Reveal'

const statusStyle: Record<UpcomingStatus, string> = {
  'En réflexion': 'border-dashed',
  'En préparation': 'border-solid',
  'En cours': 'border-solid bg-accent text-on-accent border-accent',
  'À venir': 'border-dotted',
}

/**
 * « Atelier » : projets en préparation. Identité « plan de travail » (pointillés)
 * pour ne jamais les confondre avec les réalisations. Contenu : src/data/content.ts → upcoming.
 */
export function Upcoming() {
  return (
    <section id="atelier" aria-labelledby="atelier-titre" className="py-20 md:py-28">
      <div className="container-site">
        <Reveal>
          <div className="rounded-3xl border border-dashed border-line-strong p-6 md:p-10">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2
                id="atelier-titre"
                className="text-[clamp(1.75rem,3vw,2.5rem)] font-bold tracking-tight"
              >
                Atelier <span className="font-medium text-fg-soft">— prochains projets</span>
              </h2>
              <p className="label text-accent">05</p>
            </div>

            {upcoming.length === 0 ? (
              <p className="mt-5 max-w-[56ch] text-fg-soft">
                L’atelier se prépare. Les prochains projets apparaîtront ici dès qu’ils seront
                lancés, avec leur état d’avancement réel.
              </p>
            ) : (
              <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {upcoming.map((item) => (
                  <li
                    key={item.name}
                    className="rounded-2xl border border-dashed border-line-strong p-5"
                  >
                    <span
                      className={cn(
                        'inline-block rounded-full border border-line-strong px-3 py-0.5 text-[0.875rem] font-semibold',
                        statusStyle[item.status],
                      )}
                    >
                      {item.status}
                    </span>
                    <h3 className="mt-4 text-xl font-bold tracking-tight">{item.name}</h3>
                    <p className="mt-2 text-fg-soft">{item.summary}</p>
                    {item.stack && (
                      <p className="mt-4 text-[0.9375rem] text-fg-soft">
                        Envisagé : {item.stack.join(' · ')}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
