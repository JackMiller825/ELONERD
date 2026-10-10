import { useState } from "react"
import { project } from "../config/project.ts"
import { meta, tokenPage } from "../content/website.ts"
import { canCopyContract, contractLabel, displayFact } from "../lib/gates.ts"
import { usePageMeta } from "../lib/meta.ts"
import { Button } from "../components/Button.tsx"
import { Icon } from "../components/Icon.tsx"

export function TokenPage() {
  usePageMeta(meta.token.title, meta.token.description, meta.token.path)
  const [copyStatus, setCopyStatus] = useState("")
  const addressReady = canCopyContract(project.contractAddress, project.contractVerified)
  const shownAddress = contractLabel(project.contractAddress, project.contractVerified)

  async function copyContract() {
    if (!addressReady) return
    try {
      await navigator.clipboard.writeText(project.contractAddress as string)
      setCopyStatus(tokenPage.copySuccess)
    } catch {
      setCopyStatus(tokenPage.copyFailure)
    }
  }

  const facts = [
    { label: tokenPage.facts[0].label, value: displayFact(project.totalSupply) },
    { label: tokenPage.facts[1].label, value: displayFact(project.buySellTax) },
    { label: tokenPage.facts[2].label, value: displayFact(project.liquidityStatus) },
    { label: tokenPage.facts[3].label, value: displayFact(project.ownershipStatus) },
  ]

  return (
    <section id="tokenomics" className="section section-plum tokenomics">
      <div className="container">
        <h1>{tokenPage.heading}</h1>
        <article className="token-contract">
          <div>
            <p className="fact-label">{tokenPage.contractLabel}</p>
            <p className="contract-address">{shownAddress}</p>
          </div>
          <Button variant="outline" className="copy-address" onClick={copyContract} disabled={!addressReady}>
            <Icon name="copy" />
            {addressReady ? tokenPage.copyEnabled : tokenPage.copyDisabled}
          </Button>
        </article>
        <p className="status" role="status" aria-live="polite">
          {copyStatus}
        </p>
        <div className="token-stats">
          {facts.map((fact) => (
            <article key={fact.label} className="token-stat">
              <h2>{fact.label}</h2>
              <p className="fact-value">{fact.value}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
