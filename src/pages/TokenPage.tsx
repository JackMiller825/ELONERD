import { useState } from "react"
import { project } from "../config/project.ts"
import { meta, tokenPage } from "../content/website.ts"
import { canCopyContract, contractLabel, displayFact, explorerHref } from "../lib/gates.ts"
import { usePageMeta } from "../lib/meta.ts"
import { Button, ExternalLink } from "../components/Button.tsx"
import { Icon } from "../components/Icon.tsx"
import { PendingLink } from "../components/PendingLink.tsx"
import { ResponsiveImage } from "../components/ResponsiveImage.tsx"

export function TokenPage() {
  usePageMeta(meta.token.title, meta.token.description, meta.token.path)
  const [copyStatus, setCopyStatus] = useState("")
  const addressReady = canCopyContract(project.contractAddress, project.contractVerified)
  const shownAddress = contractLabel(project.contractAddress, project.contractVerified)
  const explorer = explorerHref({
    chainId: project.chainId,
    contractAddress: project.contractAddress,
    contractVerified: project.contractVerified,
    explorer: project.links.explorer,
    explorerVerified: project.verifiedLinks.explorer,
  })
  async function copyContract() {
    if (!addressReady) return
    try {
      await navigator.clipboard.writeText(project.contractAddress as string)
      setCopyStatus(tokenPage.copySuccess)
    } catch {
      setCopyStatus(tokenPage.copyFailure)
    }
  }

  const facts: { label: string; value: string }[] = [
    { label: tokenPage.facts[0].label, value: displayFact(project.totalSupply) },
    { label: tokenPage.facts[1].label, value: displayFact(project.buySellTax) },
    { label: tokenPage.facts[2].label, value: displayFact(project.liquidityStatus) },
    { label: tokenPage.facts[3].label, value: displayFact(project.ownershipStatus) },
    { label: tokenPage.facts[4].label, value: displayFact(project.tokenomics) },
    { label: tokenPage.facts[5].label, value: shownAddress },
  ]

  return (
    <>
      <section id="information" className="section">
        <div className="container">
          <div className="split">
            <div>
              <p className="eyebrow">{tokenPage.eyebrow}</p>
              <h1>{tokenPage.heading}</h1>
              <p className="lede">{tokenPage.intro}</p>
            </div>
            <ResponsiveImage
              className="helper-art"
              src="assets/elonerd/website/elonerd-token-guide-transparent.png"
              webp="assets/elonerd/website/optimized/elonerd-token-guide-transparent.webp"
              alt=""
              width={1024}
              height={1024}
            />
          </div>
          <div className="identity-grid">
            <article className="card">
              <p className="fact-label">{tokenPage.identity.name}</p>
              <p className="fact-value">{project.name}</p>
            </article>
            <article className="card">
              <p className="fact-label">{tokenPage.identity.ticker}</p>
              <p className="fact-value">{project.ticker}</p>
            </article>
            <article className="card">
              <p className="fact-label">
                <Icon name="ethereum" /> {tokenPage.identity.network}
              </p>
              <p className="fact-value">{project.intendedNetwork}</p>
            </article>
          </div>
          <article className="card contract-card">
            <div className="contract-top">
              <div>
                <p className="fact-label">{tokenPage.launchLabel}</p>
                <p className="fact-value">{displayFact(project.launchStatus)}</p>
              </div>
              <div>
                <p className="fact-label">{tokenPage.contractLabel}</p>
                <p className="contract-address">{shownAddress}</p>
                <p className="helper">{addressReady ? null : tokenPage.contractHelper}</p>
              </div>
            </div>
            <div className="action-row">
              <Button variant="gold" onClick={copyContract} disabled={!addressReady}>
                <Icon name="copy" />
                {addressReady ? tokenPage.copyEnabled : tokenPage.copyDisabled}
              </Button>
              {explorer ? (
                <ExternalLink href={explorer} variant="outline">
                  {tokenPage.explorer}
                </ExternalLink>
              ) : (
                <Button variant="outline" disabled>
                  {tokenPage.explorer}
                </Button>
              )}
              <PendingLink
                href={project.links.swap}
                verified={project.verifiedLinks.swap}
                label={tokenPage.swapEnabled}
                pendingLabel={tokenPage.swapPending}
                variant="turquoise"
              />
            </div>
            <p className="status" role="status" aria-live="polite">
              {copyStatus}
            </p>
          </article>
          <div className="facts">
            {facts.map((fact) => (
              <article key={fact.label} className="card">
                <h2>{fact.label}</h2>
                <p className="fact-value">{fact.value}</p>
              </article>
            ))}
          </div>
          <div className="action-row">
            <PendingLink
              href={project.links.chart}
              verified={project.verifiedLinks.chart}
              label={tokenPage.chart}
              pendingLabel={tokenPage.chartPending}
              variant="outline"
            />
          </div>
        </div>
      </section>
    </>
  )
}
