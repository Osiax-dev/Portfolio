import type { ImageSet } from '../../data/types'
import { cn } from '../../lib/cn'

type PictureProps = {
  image: ImageSet
  sizes: string
  widths?: number[]
  priority?: boolean
  className?: string
}

/** Image responsive AVIF + WebP générée par scripts/optimize-images.mjs. */
export function Picture({ image, sizes, widths = [640, 1280], priority, className }: PictureProps) {
  const base = `${import.meta.env.BASE_URL}images/${image.name}`
  const srcSet = (ext: string) => widths.map((w) => `${base}-${w}.${ext} ${w}w`).join(', ')
  const fallback = `${base}-${widths[widths.length - 1]}.webp`

  return (
    <picture>
      <source type="image/avif" srcSet={srcSet('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet('webp')} sizes={sizes} />
      <img
        src={fallback}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        className={cn('block h-auto w-full', className)}
      />
    </picture>
  )
}
