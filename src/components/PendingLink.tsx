import { Button, ExternalLink } from "./Button.tsx"
import { verifiedUrl } from "../lib/gates.ts"

export function PendingLink({
  href,
  verified,
  label,
  pendingLabel,
  variant = "gold",
}: {
  href: string | null
  verified: boolean
  label: string
  pendingLabel: string
  variant?: "gold" | "turquoise" | "plum" | "outline"
}) {
  const url = verifiedUrl(href, verified)
  if (!url) {
    return (
      <Button variant={variant} disabled>
        {pendingLabel}
      </Button>
    )
  }
  return (
    <ExternalLink href={url} variant={variant}>
      {label}
    </ExternalLink>
  )
}
