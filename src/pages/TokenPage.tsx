import { useState } from "react"
import { project } from "../config/project.ts"
import { meta, tokenPage } from "../content/website.ts"
import { canCopyContract, displayFact } from "../lib/gates.ts"
import { usePageMeta } from "../lib/meta.ts"
import { Button } from "../components/Button.tsx"
import { Icon } from "../components/Icon.tsx"

export function TokenPage() {
  usePageMeta(meta.token.title, meta.token.description, meta.token.path)
  const [copied, setCopied] = useState(false)
  const addressReady = canCopyContract(project.contractAddress, project.contractVerified)
  const shownAddress = addressReady ? project.contractAddress : tokenPage.pendingAddress

  async function copyContract() {
    if (addressReady) {
      try {
        await navigator.clipboard.writeText(project.contractAddress as string)
      } catch {
        return
      }
    }
    setCopied(true)
  }

  const facts = [
    { label: tokenPage.facts[0].label, value: displayFact(project.totalSupply) },
    { label: tokenPage.facts[1].label, value: displayFact(project.buySellTax) },
    { label: tokenPage.facts[2].label, value: displayFact(project.liquidityStatus) },
    { label: tokenPage.facts[3].label, value: displayFact(project.ownershipStatus) },
  ]

  return (
    <section id="tokenomics" className="section tokenomics">
      <div className="container">
        <h1>{tokenPage.heading}</h1>
        <article className="token-contract">
          <div>
            <p className="fact-label">{tokenPage.contractLabel}</p>
            <p className={addressReady ? "contract-address" : "contract-pending"}>{shownAddress}</p>
          </div>
          <Button variant="gold" className="copy-address" onClick={copyContract} aria-live="polite">
            {copied ? null : <Icon name="copy" />}
            {copied ? tokenPage.copySuccess : tokenPage.copyEnabled}
          </Button>
        </article>
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
