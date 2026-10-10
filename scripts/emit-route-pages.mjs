import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"

const dist = "dist"
const source = readFileSync(join(dist, "index.html"), "utf8")
const origin = "https://elonerd.site"

const routes = [
  {
    file: "token/index.html",
    title: "Tokenomics — Elonerd",
    description: "Elonerd contract address, supply, buy and sell tax, LP status, and ownership.",
    url: `${origin}/token`,
  },
  {
    file: "community/index.html",
    title: "Tiny Victories & Reaction Stickers — Elonerd",
    description: "Download Elonerd reactions and make a just-for-fun medal card for your own tiny victory.",
    url: `${origin}/community`,
  },
  {
    file: "404.html",
    title: "Page not found — Elonerd",
    description: "Page not found.",
    url: `${origin}/`,
  },
]

function replaceTag(html, pattern, replacement) {
  if (!pattern.test(html)) {
    throw new Error(`Missing ${pattern}`)
  }
  return html.replace(pattern, replacement)
}

for (const route of routes) {
  let html = source
  html = replaceTag(html, /<title>[\s\S]*?<\/title>/, `<title>${route.title}</title>`)
  html = replaceTag(
    html,
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${route.description}" />`,
  )
  html = replaceTag(
    html,
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${route.title}" />`,
  )
  html = replaceTag(
    html,
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${route.description}" />`,
  )
  html = replaceTag(
    html,
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${route.url}" />`,
  )
  html = replaceTag(
    html,
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${route.title}" />`,
  )
  html = replaceTag(
    html,
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${route.description}" />`,
  )
  html = replaceTag(html, /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${route.url}" />`)
  const target = join(dist, route.file)
  mkdirSync(dirname(target), { recursive: true })
  writeFileSync(target, html)
  console.log(`wrote ${route.file}`)
}
