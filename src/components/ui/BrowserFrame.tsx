import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

type BrowserFrameProps = {
  url: string
  children: ReactNode
  className?: string
}

/** Cadre de navigateur sobre autour d'une capture d'écran. */
export function BrowserFrame({ url, children, className }: BrowserFrameProps) {
  return (
    <figure
      className={cn(
        'overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_30px_80px_-30px_rgb(0_0_0/0.6)]',
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b border-line px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-fg-soft/40" />
          <span className="size-2.5 rounded-full bg-fg-soft/40" />
          <span className="size-2.5 rounded-full bg-accent" />
        </span>
        <figcaption className="truncate text-[0.875rem] text-fg-soft">{url}</figcaption>
      </div>
      <div className="overflow-hidden">{children}</div>
    </figure>
  )
}
