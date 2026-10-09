export const NOT_CONFIRMED = "Not confirmed"
export const CONTRACT_PENDING = "[CONTRACT_ADDRESS]"

const ADDRESS = /^0x[0-9a-fA-F]{40}$/

export function isContractAddress(value: string | null): value is string {
  return typeof value === "string" && ADDRESS.test(value)
}

export function isSafeHttpUrl(value: string | null): value is string {
  if (!value || /\s/.test(value)) return false
  let url: URL
  try {
    url = new URL(value)
  } catch {
    return false
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") return false
  if (url.username || url.password) return false
  return true
}

export function canCopyContract(address: string | null, verified: boolean): address is string {
  return verified === true && isContractAddress(address)
}

export function verifiedUrl(url: string | null, verified: boolean): string | null {
  if (!verified || !isSafeHttpUrl(url)) return null
  return url
}

export function explorerHref(input: {
  chainId: number
  contractAddress: string | null
  contractVerified: boolean
  explorer: string | null
  explorerVerified: boolean
}): string | null {
  const custom = verifiedUrl(input.explorer, input.explorerVerified)
  if (custom) return custom
  if (input.chainId === 1 && canCopyContract(input.contractAddress, input.contractVerified)) {
    return `https://etherscan.io/address/${input.contractAddress}`
  }
  return null
}

export function displayFact(value: string | null): string {
  if (typeof value === "string" && value.trim()) return value.trim()
  return NOT_CONFIRMED
}

export function contractLabel(address: string | null, verified: boolean): string {
  if (canCopyContract(address, verified)) return address
  return CONTRACT_PENDING
}
