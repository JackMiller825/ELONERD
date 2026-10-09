import { Link, NavLink } from "react-router-dom"
import { project } from "../config/project.ts"
import { footer, shared } from "../content/website.ts"
import { assetUrl } from "../lib/assetUrl.ts"
import { PendingLink } from "./PendingLink.tsx"
import { ResponsiveImage } from "./ResponsiveImage.tsx"

const explore = [
  { to: "/", label: shared.home, end: true },
  { to: "/token", label: shared.token, end: false },
  { to: "/community", label: shared.community, end: false },
]

const resources = [
  { to: "/#story", label: footer.story },
  { to: "/#how-to-buy", label: footer.howToBuy },
  { to: "/token#faq", label: footer.faq },
  { to: "/community#reactions", label: footer.stickers },
  { to: "/community#maker", label: footer.maker },
]

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <NavLink to="/" className="brand" aria-label="Elonerd home">
            <img src={assetUrl("assets/elonerd/branding/elonerd-logo-transparent.png")} alt="" width={1024} height={1024} />
            <span>
              {footer.brand}
              <small>{footer.tagline}</small>
            </span>
          </NavLink>
        </div>
        <nav aria-label="Footer">
          <p className="footer-heading">{footer.explore}</p>
          <ul>
            {explore.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} end={link.end}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label={footer.resources}>
          <p className="footer-heading">{footer.resources}</p>
          <ul>
            {resources.map((link) => (
              <li key={link.to}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="footer-heading">{footer.social}</p>
          <div className="footer-social">
            <PendingLink
              href={project.links.x}
              verified={project.verifiedLinks.x}
              label={footer.x}
              pendingLabel={footer.xPending}
              variant="outline"
            />
            <PendingLink
              href={project.links.telegram}
              verified={project.verifiedLinks.telegram}
              label={footer.telegram}
              pendingLabel={footer.telegramPending}
              variant="turquoise"
            />
          </div>
        </div>
        <ResponsiveImage
          className="footer-rocket"
          src="assets/elonerd/website/elonerd-footer-rocket-transparent.png"
          webp="assets/elonerd/website/optimized/elonerd-footer-rocket-transparent.webp"
          alt=""
          width={600}
          height={900}
        />
      </div>
      <div className="container footer-notes">
        <p>{footer.independence}</p>
        <p>{footer.risk}</p>
        <p>{footer.privacy}</p>
        <p>{footer.copyright(project.copyrightYear)}</p>
      </div>
    </footer>
  )
}
