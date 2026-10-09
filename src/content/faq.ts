import type { ProjectConfig } from "../config/project.ts"
import { canCopyContract, displayFact, verifiedUrl } from "../lib/gates.ts"

export type FaqEntry = {
  question: string
  answer: string
}

export function buildFaq(config: ProjectConfig): FaqEntry[] {
  const verifiedAddress = canCopyContract(config.contractAddress, config.contractVerified)
    ? config.contractAddress
    : null
  const swap = verifiedUrl(config.links.swap, config.verifiedLinks.swap)
  const x = verifiedUrl(config.links.x, config.verifiedLinks.x)
  const telegram = verifiedUrl(config.links.telegram, config.verifiedLinks.telegram)

  const deploymentLine = config.deploymentConfirmed
    ? "Check the Token page for the verified contract before you interact."
    : "Deployment details have not yet been confirmed."

  const contractAnswer = verifiedAddress
    ? `The verified contract address is ${verifiedAddress}. Confirm it on this website before you interact. Do not substitute an address from search results or direct messages.`
    : "It has not been supplied. This page will show [CONTRACT_ADDRESS] until a verified address is available. Do not substitute an address from search results or direct messages."

  const networkAnswer = config.deploymentConfirmed
    ? "The intended network is Ethereum mainnet, and deployment on that network is confirmed. Confirm the network and deployed contract before interacting with any token. Other networks are not confirmed."
    : "The intended network is Ethereum mainnet. Confirm the network and deployed contract before interacting with any token. Other networks are not confirmed."

  const supply = displayFact(config.totalSupply)
  const tax = displayFact(config.buySellTax)
  const tokenomics = displayFact(config.tokenomics)
  const factsKnown = [config.totalSupply, config.buySellTax, config.tokenomics].some(
    (value) => typeof value === "string" && value.trim(),
  )
  const factsAnswer = factsKnown
    ? `Total supply: ${supply}. Buy / sell tax: ${tax}. Tokenomics: ${tokenomics}. Only the published facts above are confirmed.`
    : "These details have not been confirmed. Read the published facts and supporting contract information when available; do not assume zero tax or a fixed supply."

  const liquidityKnown = [config.liquidityStatus, config.ownershipStatus].some(
    (value) => typeof value === "string" && value.trim(),
  )
  const liquidityAnswer = liquidityKnown
    ? `Liquidity status: ${displayFact(config.liquidityStatus)}. Ownership / permissions: ${displayFact(config.ownershipStatus)}. Any future statement should link to evidence and explain the remaining permissions.`
    : "Neither claim is confirmed. Any future statement should link to evidence and explain the remaining permissions."

  const buyAnswer = swap
    ? "Start with the Home buying guide, then use the verified swap link published on this website. Match the full contract address before you confirm."
    : "Start with the Home buying guide, then verify the live contract and official swap destination. While those details are pending, there is no verified buying link here."

  const joined = [x ? "X" : null, telegram ? "Telegram" : null].filter((item): item is string => item !== null)
  const joinAnswer =
    joined.length === 0
      ? "The official X and Telegram destinations are placeholders until verified. Use links published on this website after they are confirmed."
      : `Official ${joined.join(" and ")} ${joined.length > 1 ? "destinations are" : "destination is"} published on this website. Use those confirmed links.`

  return [
    {
      question: "What is Elonerd?",
      answer: `Elonerd is an independent meme-token concept intended for Ethereum mainnet. Its fictional mascot wears a ridiculously large medal and celebrates everyday nerdy wins. ${deploymentLine}`,
    },
    {
      question: "Is this Elon Musk's token?",
      answer: "No. Elonerd is not created, endorsed or partnered with Elon Musk, Tesla, SpaceX, xAI or any government.",
    },
    {
      question: "What inspired the medal?",
      answer: `A White House release dated ${config.sourceDate} lists Elon Musk among National Medal of Science recipients. Our mascot and rocket medal are invented meme artwork. They do not reproduce the real medal.`,
    },
    {
      question: "Where is the contract address?",
      answer: contractAnswer,
    },
    {
      question: "What network should I use?",
      answer: networkAnswer,
    },
    {
      question: "What are the supply, taxes and tokenomics?",
      answer: factsAnswer,
    },
    {
      question: "Is liquidity locked or ownership renounced?",
      answer: liquidityAnswer,
    },
    {
      question: "How can I buy?",
      answer: buyAnswer,
    },
    {
      question: "Do I need a wallet to use this website?",
      answer: "No. Browsing, sticker downloads and the medal-card maker do not require a wallet connection.",
    },
    {
      question: "Where can I join?",
      answer: joinAnswer,
    },
    {
      question: "Can I use the stickers and medal cards?",
      answer:
        "Yes, they are supplied for playful community sharing. Keep the character independent and do not use it to imply endorsements, official awards or guaranteed returns.",
    },
    {
      question: "Does a medal card award tokens or money?",
      answer: "No. It is a just-for-fun image you make locally. It is not a prize, certification, contest entry or financial reward.",
    },
    {
      question: "Are gains or a huge audience guaranteed?",
      answer: "No. Attention and community growth are ambitions. Memecoins are speculative and can lose all value.",
    },
  ]
}
