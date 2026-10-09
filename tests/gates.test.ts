import assert from "node:assert/strict"
import { test } from "node:test"
import { canCopyContract, explorerHref, isSafeHttpUrl, verifiedUrl } from "../src/lib/gates.ts"

const address = `0x${"ab".repeat(20)}`

test("contract copy requires a verified 40-hex address", () => {
  assert.equal(canCopyContract(null, false), false)
  assert.equal(canCopyContract(address, false), false)
  assert.equal(canCopyContract("0x1234", true), false)
  assert.equal(canCopyContract(address, true), true)
})

test("external urls reject scripts and accept http(s)", () => {
  assert.equal(isSafeHttpUrl("javascript:alert(1)"), false)
  assert.equal(isSafeHttpUrl("data:text/html,hi"), false)
  assert.equal(isSafeHttpUrl("https://elonerd.site"), true)
  assert.equal(isSafeHttpUrl("http://example.com/guide"), true)
  assert.equal(isSafeHttpUrl("not a url"), false)
  assert.equal(verifiedUrl("https://example.com", false), null)
  assert.equal(verifiedUrl("javascript:alert(1)", true), null)
  assert.equal(verifiedUrl("https://example.com/swap", true), "https://example.com/swap")
})

test("etherscan is derived only for a verified chain-1 contract", () => {
  assert.equal(
    explorerHref({
      chainId: 1,
      contractAddress: address,
      contractVerified: false,
      explorer: null,
      explorerVerified: false,
    }),
    null,
  )
  assert.equal(
    explorerHref({
      chainId: 1,
      contractAddress: address,
      contractVerified: true,
      explorer: null,
      explorerVerified: false,
    }),
    `https://etherscan.io/address/${address}`,
  )
  assert.equal(
    explorerHref({
      chainId: 1,
      contractAddress: address,
      contractVerified: true,
      explorer: "https://example.com/token",
      explorerVerified: true,
    }),
    "https://example.com/token",
  )
})
