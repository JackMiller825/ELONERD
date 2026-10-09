import { assetUrl } from "../lib/assetUrl.ts"

export function ResponsiveImage({
  src,
  webp,
  alt,
  width,
  height,
  priority = false,
  className = "",
  onError,
}: {
  src: string
  webp?: string
  alt: string
  width: number
  height: number
  priority?: boolean
  className?: string
  onError?: () => void
}) {
  const image = (
    <img
      src={assetUrl(src)}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      onError={onError}
    />
  )
  if (!webp) return <picture className={className}>{image}</picture>
  return (
    <picture className={className}>
      <source srcSet={assetUrl(webp)} type="image/webp" />
      {image}
    </picture>
  )
}
