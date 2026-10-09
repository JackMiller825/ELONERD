import { project } from "../config/project.ts"
import { awards, galleryCopy, hub, meta } from "../content/website.ts"
import { usePageMeta } from "../lib/meta.ts"
import { LinkButton } from "../components/Button.tsx"
import { Card } from "../components/Section.tsx"
import { MedalMaker } from "../components/MedalMaker.tsx"
import { PendingLink } from "../components/PendingLink.tsx"
import { ReactionGallery } from "../components/ReactionGallery.tsx"
import { ResponsiveImage } from "../components/ResponsiveImage.tsx"
import { hero } from "../content/website.ts"

export function CommunityPage() {
  usePageMeta(meta.community.title, meta.community.description, meta.community.path)
  const socialPending = !project.verifiedLinks.telegram && !project.verifiedLinks.x

  return (
    <>
      <section id="club" className="section">
        <div className="container hub-grid">
          <div>
            <p className="eyebrow">{hub.eyebrow}</p>
            <h1>{hub.heading}</h1>
            <p className="lede">{hub.body}</p>
            <div className="action-row">
              <PendingLink
                href={project.links.telegram}
                verified={project.verifiedLinks.telegram}
                label={hub.telegram}
                pendingLabel={hub.telegramPending}
                variant="turquoise"
              />
              <PendingLink
                href={project.links.x}
                verified={project.verifiedLinks.x}
                label={hub.x}
                pendingLabel={hub.xPending}
                variant="outline"
              />
            </div>
            {socialPending ? <p className="note">{hub.helper}</p> : null}
          </div>
          <ResponsiveImage
            className="hub-art"
            src="assets/elonerd/website/elonerd-hero-character-transparent.png"
            webp="assets/elonerd/website/optimized/elonerd-hero-character-transparent.webp"
            alt={hero.heroAlt}
            width={1800}
            height={2200}
          />
        </div>
        <div className="container">
          <div className="card-grid">
            {hub.activities.map((activity) => (
              <Card key={activity.title}>
                <h2>{activity.title}</h2>
                <p>{activity.body}</p>
              </Card>
            ))}
          </div>
          <p className="note">{hub.prompt}</p>
        </div>
      </section>

      <section id="reactions" className="section section-ivory">
        <div className="container">
          <p className="eyebrow">{galleryCopy.eyebrow}</p>
          <h2>{galleryCopy.heading}</h2>
          <p className="lede">{galleryCopy.body}</p>
          <ReactionGallery />
        </div>
      </section>

      <section id="awards" className="section section-plum">
        <div className="container">
          <p className="eyebrow">{awards.eyebrow}</p>
          <h2>{awards.heading}</h2>
          <p className="lede">{awards.body}</p>
          <div className="card-grid">
            {awards.categories.map((category) => (
              <Card key={category.id}>
                <ResponsiveImage src={category.png} webp={category.webp} alt={category.alt} width={800} height={800} />
                <h3>{category.title}</h3>
                <p>{category.body}</p>
              </Card>
            ))}
          </div>
          <LinkButton to="/community#maker">{awards.primary}</LinkButton>
          <div id="maker" className="maker-block">
            <MedalMaker />
          </div>
        </div>
      </section>
    </>
  )
}
