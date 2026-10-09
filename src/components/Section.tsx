import type { ReactNode } from "react"

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className = "",
}: {
  id: string
  eyebrow?: string
  title: string
  intro?: string
  children: ReactNode
  className?: string
}) {
  return (
    <section id={id} className={`section ${className}`.trim()}>
      <div className="container">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2>{title}</h2>
        {intro ? <p className="lede">{intro}</p> : null}
        {children}
      </div>
    </section>
  )
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <article className={`card ${className}`.trim()}>{children}</article>
}
