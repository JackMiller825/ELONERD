import { useEffect, useState } from "react"
import { project } from "../config/project.ts"
import { buy, hero, invite, story } from "../content/website.ts"
import { meta } from "../content/website.ts"
import { isSafeHttpUrl } from "../lib/gates.ts"
import { assetUrl } from "../lib/assetUrl.ts"
import { usePageMeta } from "../lib/meta.ts"
import { ExternalTextLink, LinkButton } from "../components/Button.tsx"
import { Card } from "../components/Section.tsx"
import { MedalCelebrate } from "../components/MedalCelebrate.tsx"
import { PendingLink } from "../components/PendingLink.tsx"
import { ResponsiveImage } from "../components/ResponsiveImage.tsx"

function useMinWidth(width: number) {
  const [matches, setMatches] = useState(() => window.matchMedia(`(min-width: ${width}px)`).matches)
  useEffect(() => {
    const media = window.matchMedia(`(min-width: ${width}px)`)
    const onChange = () => setMatches(media.matches)
    media.addEventListener("change", onChange)
    return () => media.removeEventListener("change", onChange)
  }, [width])
  return matches
}

export function HomePage() {
  usePageMeta(meta.home.title, meta.home.description, meta.home.path)
  const desktop = useMinWidth(1024)
  const sourceOk = isSafeHttpUrl(project.sourceUrl)
  const originArt = [
    {
      png: "assets/elonerd/website/elonerd-origin-headline.png",
      webp: "assets/elonerd/website/optimized/elonerd-origin-headline.webp",
    },
    {
      png: "assets/elonerd/website/elonerd-origin-oversized-medal.png",
      webp: "assets/elonerd/website/optimized/elonerd-origin-oversized-medal.webp",
    },
    {
      png: "assets/elonerd/website/elonerd-origin-community-win.png",
      webp: "assets/elonerd/website/optimized/elonerd-origin-community-win.webp",
    },
  ] as const
  const buyArt = [
    {
      png: "assets/elonerd/website/elonerd-buy-wallet-transparent.png",
      webp: "assets/elonerd/website/optimized/elonerd-buy-wallet-transparent.webp",
    },
    {
      png: "assets/elonerd/website/elonerd-buy-contract-transparent.png",
      webp: "assets/elonerd/website/optimized/elonerd-buy-contract-transparent.webp",
    },
    {
      png: "assets/elonerd/website/elonerd-buy-review-transparent.png",
      webp: "assets/elonerd/website/optimized/elonerd-buy-review-transparent.webp",
    },
  ] as const

  return (
    <>
      <section id="hero" className="hero">
        {desktop ? (
          <img
            className="hero-workshop"
            src={assetUrl("assets/elonerd/website/optimized/elonerd-workshop-background.webp")}
            alt=""
            width={2400}
            height={1600}
          />
        ) : null}
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">{hero.eyebrow}</p>
            <h1>{hero.heading}</h1>
            <p className="lede">{hero.body}</p>
            <div className="action-row">
              <LinkButton to="/#story">{hero.primary}</LinkButton>
              <LinkButton to="/community" variant="turquoise">
                {hero.secondary}
              </LinkButton>
            </div>
            <p className="caption">{hero.caption}</p>
            <p className="note">{hero.independence}</p>
          </div>
          <div className="hero-art">
            <ResponsiveImage
              className="hero-character"
              src="assets/elonerd/website/elonerd-hero-character-transparent.png"
              webp="assets/elonerd/website/optimized/elonerd-hero-character-transparent.webp"
              alt={hero.heroAlt}
              width={1800}
              height={2200}
              priority
            />
            <ResponsiveImage
              className="hero-podium"
              src="assets/elonerd/website/elonerd-hero-podium-transparent.png"
              webp="assets/elonerd/website/optimized/elonerd-hero-podium-transparent.webp"
              alt=""
              width={1800}
              height={650}
              priority
            />
            <MedalCelebrate />
          </div>
        </div>
      </section>

      <section id="story" className="section section-ivory">
        <div className="container">
          <p className="eyebrow">{story.eyebrow}</p>
          <h2>{story.heading}</h2>
          <p className="lede">{story.intro}</p>
          <div className="card-grid">
            {story.cards.map((card, index) => {
              const art = originArt[index]
              if (!art) return null
              return (
                <Card key={card.heading}>
                  <ResponsiveImage src={art.png} webp={art.webp} alt={card.alt} width={1200} height={1200} />
                  <h3>{card.heading}</h3>
                  <p>{card.body}</p>
                  {"action" in card && sourceOk ? <ExternalTextLink href={project.sourceUrl}>{card.action}</ExternalTextLink> : null}
                  {"action" in card ? <p className="helper">{story.sourceLabel}</p> : null}
                </Card>
              )
            })}
          </div>
          <p className="closing">{story.closing}</p>
        </div>
      </section>

      <ResponsiveImage
        className="cloud-divider"
        src="assets/elonerd/website/elonerd-cloud-divider-transparent.png"
        webp="assets/elonerd/website/optimized/elonerd-cloud-divider-transparent.webp"
        alt=""
        width={2400}
        height={400}
      />

      <section id="how-to-buy" className="section">
        <div className="container">
          <p className="eyebrow">{buy.eyebrow}</p>
          <h2>{buy.heading}</h2>
          <p className="lede">{buy.intro}</p>
          <div className="card-grid">
            {buy.cards.map((card, index) => {
              const art = buyArt[index]
              if (!art) return null
              return (
              <Card key={card.heading}>
                <ResponsiveImage src={art.png} webp={art.webp} alt="" width={640} height={640} />
                <h3>{card.heading}</h3>
                <ol start={index * 2 + 1}>
                  {card.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </Card>
              )
            })}
          </div>
          <div className="action-row">
            <LinkButton to="/token">{buy.primary}</LinkButton>
            <PendingLink
              href={project.links.swap}
              verified={project.verifiedLinks.swap}
              label="Open Verified Swap"
              pendingLabel={buy.swapPending}
              variant="outline"
            />
          </div>
          <p className="note">{buy.smallPrint}</p>
          <ul className="help-links">
            {buy.help.map((item) => (
              <li key={item.href}>
                <ExternalTextLink href={item.href}>{item.label}</ExternalTextLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="community" className="section section-invite">
        <div className="container invite-grid">
          <ResponsiveImage
            className="invite-art"
            src="assets/elonerd/website/elonerd-reaction-celebrating-transparent.png"
            webp="assets/elonerd/website/optimized/elonerd-reaction-celebrating-transparent.webp"
            alt={invite.alt}
            width={1024}
            height={1024}
          />
          <div>
            <p className="eyebrow">{invite.eyebrow}</p>
            <h2>{invite.heading}</h2>
            <p className="lede">{invite.body}</p>
            <LinkButton to="/community">{invite.primary}</LinkButton>
            <p className="note">{invite.small}</p>
          </div>
        </div>
      </section>
    </>
  )
}
