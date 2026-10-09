import { useEffect } from "react"
import { project } from "../config/project.ts"
import { isSafeHttpUrl } from "./gates.ts"
import { assetUrl } from "./assetUrl.ts"
import { meta } from "../content/website.ts"

export function siteOrigin(): string | null {
  return isSafeHttpUrl(project.links.website) ? project.links.website : null
}

export function absoluteUrl(path: string): string | null {
  const origin = siteOrigin()
  if (!origin) return null
  return new URL(path, origin.endsWith("/") ? origin : `${origin}/`).href
}

function ensureMeta(attribute: "name" | "property", key: string, content: string | null) {
  const selector = `meta[${attribute}="${key}"]`
  let element = document.head.querySelector(selector)
  if (!content) {
    element?.remove()
    return
  }
  if (!element) {
    element = document.createElement("meta")
    element.setAttribute(attribute, key)
    document.head.append(element)
  }
  element.setAttribute("content", content)
}

function ensureCanonical(href: string | null) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!href) {
    link?.remove()
    return
  }
  if (!link) {
    link = document.createElement("link")
    link.rel = "canonical"
    document.head.append(link)
  }
  link.href = href
}

export function usePageMeta(title: string, description: string, path: string) {
  useEffect(() => {
    document.title = title
    const pageUrl = absoluteUrl(path)
    const imagePath = assetUrl(meta.shareImage)
    const imageUrl = absoluteUrl(imagePath) ?? imagePath
    ensureMeta("name", "description", description)
    ensureMeta("property", "og:type", "website")
    ensureMeta("property", "og:title", title)
    ensureMeta("property", "og:description", description)
    ensureMeta("property", "og:url", pageUrl)
    ensureMeta("property", "og:image", imageUrl)
    ensureMeta("property", "og:image:width", "1200")
    ensureMeta("property", "og:image:height", "630")
    ensureMeta("property", "og:image:alt", meta.shareAlt)
    ensureMeta("name", "twitter:card", "summary_large_image")
    ensureMeta("name", "twitter:title", title)
    ensureMeta("name", "twitter:description", description)
    ensureMeta("name", "twitter:image", imageUrl)
    ensureCanonical(pageUrl)
  }, [title, description, path])
}
