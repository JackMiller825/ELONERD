import { meta, notFound } from "../content/website.ts"
import { usePageMeta } from "../lib/meta.ts"
import { LinkButton } from "../components/Button.tsx"

export function NotFoundPage() {
  usePageMeta(meta.notFound.title, meta.notFound.description, meta.notFound.path)
  return (
    <section className="section not-found">
      <div className="container">
        <h1>{notFound.heading}</h1>
        <LinkButton to="/">{notFound.action}</LinkButton>
      </div>
    </section>
  )
}
