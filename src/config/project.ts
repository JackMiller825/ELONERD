export const project = {
  name: "Elonerd",
  ticker: "$ELONERD",
  intendedNetwork: "Ethereum mainnet",
  chainId: 1,
  deploymentConfirmed: false,
  launchStatus: null as string | null,
  contractAddress: null as string | null,
  contractVerified: false,
  totalSupply: "1,000,000,000" as string | null,
  buySellTax: "0%" as string | null,
  liquidityStatus: "Burn" as string | null,
  ownershipStatus: "Renounce" as string | null,
  tokenomics: null as string | null,
  evidence: {
    totalSupply: null as string | null,
    buySellTax: null as string | null,
    liquidityStatus: null as string | null,
    ownershipStatus: null as string | null,
    tokenomics: null as string | null,
  },
  links: {
    x: "https://x.com/elonerd_eth" as string | null,
    telegram: "https://t.me/elonerd_eth" as string | null,
    swap: null as string | null,
    chart: null as string | null,
    explorer: null as string | null,
    website: "https://elonerd.site" as string | null,
  },
  verifiedLinks: {
    x: true,
    telegram: true,
    swap: false,
    chart: false,
    explorer: false,
  },
  sourceUrl:
    "https://www.whitehouse.gov/releases/2026/10/president-trump-presents-national-medals-of-science-and-national-medals-of-technology-and-innovation/",
  sourceDate: "October 8, 2026",
  hostingPlatform: "GitHub Pages" as string | null,
  copyrightYear: new Date().getFullYear(),
}

export type ProjectConfig = typeof project
