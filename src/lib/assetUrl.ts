export function assetUrl(path: string): string {
  const base = import.meta.env.BASE_URL || "/"
  const normalizedBase = base.endsWith("/") ? base : `${base}/`
  const trimmed = path.replace(/^\//, "")
  return `${normalizedBase}${trimmed}`
}
