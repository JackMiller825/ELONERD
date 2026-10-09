import { assetUrl } from "../lib/assetUrl.ts"

const icons = ["arrow", "check", "close", "copy", "download", "ethereum", "external", "menu"] as const
export type IconName = (typeof icons)[number]

export function Icon({ name }: { name: IconName }) {
  const url = `url("${assetUrl(`assets/elonerd/website/icons/elonerd-icon-${name}.svg`)}")`
  return (
    <span
      className="icon"
      aria-hidden="true"
      style={{ maskImage: url, WebkitMaskImage: url }}
    />
  )
}
