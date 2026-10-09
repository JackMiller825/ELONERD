import assert from "node:assert/strict"
import { test } from "node:test"
import { project } from "../src/config/project.ts"
import { buildFaq } from "../src/content/faq.ts"

test("pending configuration keeps all 13 FAQ answers unfinished", () => {
  const faq = buildFaq(project)
  assert.equal(faq.length, 13)
  assert.match(faq[3].answer, /\[CONTRACT_ADDRESS\]/)
  assert.match(faq[5].answer, /have not been confirmed/)
  assert.match(faq[7].answer, /no verified buying link/)
  assert.match(faq[9].answer, /placeholders until verified/)
  assert.equal(project.contractAddress, null)
  assert.equal(project.links.x, null)
  assert.equal(project.links.telegram, null)
  assert.equal(project.links.swap, null)
})

test("configured facts replace contradictory pending FAQ wording", () => {
  const address = `0x${"cd".repeat(20)}`
  const faq = buildFaq({
    ...project,
    deploymentConfirmed: true,
    contractAddress: address,
    contractVerified: true,
    totalSupply: "1000000",
    buySellTax: "Not confirmed",
    tokenomics: null,
    links: { ...project.links, swap: "https://example.com/swap", telegram: "https://t.me/example" },
    verifiedLinks: { ...project.verifiedLinks, swap: true, telegram: true },
  })
  assert.match(faq[3].answer, new RegExp(address))
  assert.doesNotMatch(faq[3].answer, /has not been supplied/)
  assert.match(faq[5].answer, /1000000/)
  assert.match(faq[7].answer, /verified swap link/)
  assert.match(faq[9].answer, /Telegram/)
})
