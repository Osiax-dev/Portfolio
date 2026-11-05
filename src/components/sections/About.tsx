import { languages, principles, timeline } from '../../data/content'
import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'

export function About() {
  return (
    <section id="parcours" aria-labelledby="parcours-titre" className="bg-surface py-20 md:py-32">
      <div className="container-site">
        <SectionHeader
          id="parcours"
          index="02"
          title="Parcours"
          intro={
            <p>
              Titulaire d’une licence en Informatique de Gestion de l’IUT de l’Université de
              Parakou, je construis des applications web complètes. Je pars d’un besoin concret, je
              conçois les données et l’API, puis l’interface, jusqu’à la mise en ligne.
            </p>
          }
        />

        <div className="mt-16 grid gap-16 md:mt-24 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <h3 className="label text-accent">Ma façon de travailler</h3>
            <ol className="mt-5">
              {principles.map((item, i) => (
                <li key={item.title} className="border-t border-line">
                  <Reveal
                    delay={i * 0.08}
                    className="grid gap-2 py-7 sm:grid-cols-[3.5rem_1fr] sm:gap-5"
                  >
                    <span className="text-[0.875rem] font-semibold text-accent" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <p className="text-[1.5rem] leading-tight font-bold tracking-tight">
                        {item.title}
                      </p>
                      <p className="mt-2 max-w-[56ch] text-fg-soft">{item.text}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <h3 className="label text-accent">Repères</h3>
            <ol className="mt-5">
              {timeline.map((item) => (
                <li key={item.title} className="border-t border-line py-5">
                  <p className="text-[0.9375rem] font-medium text-accent">{item.period}</p>
                  <p className="mt-1 text-lg font-bold">{item.title}</p>
                  <p className="text-fg-soft">{item.place}</p>
                </li>
              ))}
            </ol>
            <div className="border-t border-line pt-5">
              <h3 className="label text-accent">Langues</h3>
              <p className="mt-2">
                {languages.map((l, i) => (
                  <span key={l.name}>
                    {l.name} <span className="text-fg-soft">({l.level.toLowerCase()})</span>
                    {i < languages.length - 1 ? ' · ' : ''}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
