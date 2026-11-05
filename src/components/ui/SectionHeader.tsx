import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { Reveal } from './Reveal'

type SectionHeaderProps = {
  id: string
  index: string
  title: string
  intro?: ReactNode
  tone?: 'dark' | 'light'
}

/** En-tête de section : repère numéroté, grand titre, introduction. */
export function SectionHeader({ id, index, title, intro, tone = 'dark' }: SectionHeaderProps) {
  const light = tone === 'light'
  return (
    <Reveal>
      <header className="grid gap-5 md:grid-cols-12 md:gap-10">
        <p
          aria-hidden="true"
          className={cn('label pt-3 md:col-span-3', light ? 'text-light-accent' : 'text-accent')}
        >
          {index} — {title}
        </p>
        <div className="md:col-span-9">
          <h2 id={`${id}-titre`} className="display text-[clamp(2.5rem,7.5vw,6.5rem)]">
            {title}
          </h2>
          {intro && (
            <div
              className={cn(
                'mt-6 max-w-[60ch] text-lg md:text-xl',
                light ? 'text-light-soft' : 'text-fg-soft',
              )}
            >
              {intro}
            </div>
          )}
        </div>
      </header>
    </Reveal>
  )
}
