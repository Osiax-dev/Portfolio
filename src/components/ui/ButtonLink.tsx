import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'

type Variant = 'solid' | 'outline' | 'ghost'

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant
  icon?: ReactNode
}

const variants: Record<Variant, string> = {
  solid: 'bg-fg text-bg border-fg hover:bg-accent hover:border-accent hover:text-on-accent',
  outline: 'bg-transparent text-fg border-line-strong hover:border-fg hover:bg-fg hover:text-bg',
  ghost:
    'bg-transparent text-fg border-transparent underline decoration-accent underline-offset-4 hover:text-accent',
}

/** Lien présenté comme un bouton pilule (cible tactile ≥ 48 px). */
export function ButtonLink({
  variant = 'solid',
  icon,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  const external = rest.target === '_blank'
  return (
    <a
      {...rest}
      rel={external ? 'noopener noreferrer' : rest.rel}
      className={cn(
        'group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border px-6 text-[0.9375rem] font-semibold transition-colors duration-200',
        variants[variant],
        className,
      )}
    >
      <span>{children}</span>
      {icon && (
        <span
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        >
          {icon}
        </span>
      )}
    </a>
  )
}
