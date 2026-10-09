import type { ButtonHTMLAttributes, ReactNode } from "react"
import { Link } from "react-router-dom"
import { Icon } from "./Icon.tsx"

type Variant = "gold" | "turquoise" | "plum" | "outline"

export function Button({
  variant = "gold",
  className = "",
  children,
  type = "button",
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button type={type} className={`btn btn-${variant} ${className}`.trim()} {...rest}>
      {children}
    </button>
  )
}

export function LinkButton({
  to,
  variant = "gold",
  className = "",
  children,
  onClick,
}: {
  to: string
  variant?: Variant
  className?: string
  children: ReactNode
  onClick?: () => void
}) {
  return (
    <Link to={to} className={`btn btn-${variant} ${className}`.trim()} onClick={onClick}>
      {children}
    </Link>
  )
}

export function ExternalLink({
  href,
  variant = "outline",
  className = "",
  children,
}: {
  href: string
  variant?: Variant
  className?: string
  children: ReactNode
}) {
  return (
    <a className={`btn btn-${variant} ${className}`.trim()} href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <Icon name="external" />
      <span className="sr-only"> (opens an external website)</span>
    </a>
  )
}

export function ExternalTextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <Icon name="external" />
      <span className="sr-only"> (opens an external website)</span>
    </a>
  )
}
