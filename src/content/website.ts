export const meta = {
  shareImage: "assets/elonerd/social/elonerd-social-share-1200x630.png",
  shareAlt: "Elonerd smiles with a giant rocket medal and a turquoise screwdriver.",
  home: {
    title: "Elonerd ($ELONERD) — Big medal. Bigger nerd.",
    description:
      "Meet Elonerd, an independent Ethereum meme project celebrating nerdy humor and tiny victories. Explore the story, token details and community tools.",
    path: "/",
  },
  token: {
    title: "Tokenomics — Elonerd",
    description: "Elonerd contract address, supply, buy and sell tax, LP status, and ownership.",
    path: "/token",
  },
  community: {
    title: "Tiny Victories & Reaction Stickers — Elonerd",
    description: "Download Elonerd reactions and make a just-for-fun medal card for your own tiny victory.",
    path: "/community",
  },
  notFound: {
    title: "Page not found — Elonerd",
    description: "Page not found.",
    path: "/",
  },
}

export const shared = {
  skip: "Skip to content",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  joinClub: "Join the Club",
  externalSuffix: "opens an external website",
  home: "Home",
  token: "Tokenomics",
  community: "Community",
}

export const hero = {
  eyebrow: "ELONERD · ETHEREUM MEME PROJECT",
  heading: "Big medal. Bigger nerd.",
  body: "Meet Elonerd: an independent Ethereum meme token for oversized brains and tiny victories.",
  primary: "Meet Elonerd",
  secondary: "Join the Club",
  medalLabel: "Celebrate a tiny victory",
  activated: "Certified tiny victory.",
  caption: "A fictional mascot. A very real love of nerdy wins.",
  heroAlt: "Elonerd smiles with a giant rocket medal and a turquoise screwdriver.",
}

export const story = {
  eyebrow: "THE ORIGIN",
  heading: "One headline. One enormous medal.",
  intro: "A real award announcement gave us a very silly idea: what if the medal was bigger than the nerd wearing it?",
  cards: [
    {
      heading: "The real headline",
      body: "A White House release dated October 8, 2026 lists Elon Musk among National Medal of Science recipients.",
      action: "Read the announcement",
      alt: "Elonerd reads a medal announcement.",
    },
    {
      heading: "The invented mascot",
      body: "We imagined Elonerd: a cheerful tinkerer with a giant gold medal and a screwdriver for every occasion. The character and rocket medal are our visual joke, not a depiction of the real award.",
      alt: "Elonerd struggles cheerfully with an oversized fictional medal.",
    },
    {
      heading: "Your tiny victory",
      body: "Fixed a printer? Finished a side project? Helped someone understand a hard thing? Around here, that deserves an imaginary medal.",
      alt: "Elonerd celebrates a small achievement with fellow nerds.",
    },
  ],
  closing: "The news is real. The giant medal is fiction. The club is yours to help shape.",
  sourceLabel: "White House announcement · October 8, 2026",
}

export const buy = {
  eyebrow: "START WITH THE FACTS",
  heading: "New to Ethereum? Take it one step at a time.",
  intro:
    "These are general steps for buying on Ethereum. Confirm the contract on the Tokenomics page before making a purchase. An official swap destination has not yet been supplied.",
  cards: [
    {
      heading: "Get your wallet ready",
      steps: [
        "Choose an Ethereum-compatible wallet from its official website or app store listing. Keep your recovery phrase private. Never type it into this website or send it to another person.",
        "Get ETH using a service available to you. If you transfer ETH to a wallet, confirm that the receiving address and network are Ethereum mainnet. Keep some ETH for network fees.",
      ],
    },
    {
      heading: "Check the token",
      steps: [
        "Open Tokenomics and confirm the published contract address.",
        "Use the verified swap link when it is published. Check that the swap interface is on Ethereum mainnet. Match the full contract address; a name or ticker alone is not enough.",
      ],
    },
    {
      heading: "Review before you confirm",
      steps: [
        "Enter your amount. Read the quote, price impact, fees, approval request and any token warnings. Slippage needs vary; do not use a suggested number blindly.",
        "Confirm only if you understand the transaction. Wait for the transaction result and check the token using the verified contract address. Do not repeat a pending swap without checking its status.",
      ],
    },
  ],
  primary: "Check Tokenomics",
  swapPending: "Swap link not published",
  smallPrint: "Memecoins can lose all value. Network fees apply. This guide does not promise returns.",
  help: [
    { label: "Ethereum wallet guide", href: "https://ethereum.org/guides/how-to-use-a-wallet/" },
    {
      label: "Uniswap network guide",
      href: "https://support.uniswap.org/hc/en-us/articles/11045742405517-How-to-switch-networks",
    },
  ],
}

export const invite = {
  eyebrow: "THE TINY-VICTORY CLUB",
  heading: "Bring your best nerd moment.",
  body: "Share a reaction, make a medal card, or help another human. You do not need a wallet to enjoy the artwork or join the conversation.",
  primary: "Explore the Club",
  small: "Make something. Laugh together. Celebrate the small stuff.",
  alt: "Elonerd celebrates a tiny victory.",
}

export const tokenPage = {
  heading: "Tokenomics",
  contractLabel: "Contract address",
  pendingAddress: "Coming Soon..",
  copyEnabled: "Copy address",
  copySuccess: "Copied",
  facts: [
    { key: "totalSupply", label: "Supply" },
    { key: "buySellTax", label: "Buy / sell tax" },
    { key: "liquidityStatus", label: "LP status" },
    { key: "ownershipStatus", label: "Ownership" },
  ] as const,
}

export const hub = {
  eyebrow: "ALL NERDS WELCOME",
  heading: "Small wins. Big medal energy.",
  body: "Build a thing. Fix a thing. Explain a thing. The Elonerd club gives everyday effort a very silly spotlight.",
  telegram: "Join Telegram",
  telegramPending: "Telegram link pending",
  x: "Follow on X",
  xPending: "X link pending",
  helper: "Official community links have not yet been verified. These buttons stay inactive until the destinations are published.",
  activities: [
    {
      title: "Tiny Victory Wall",
      body: "Make a medal card for something you finally finished. Share it with the club when the official channels open.",
    },
    {
      title: "Medal Remix",
      body: "Pair an Elonerd reaction with a moment everyone understands. Keep it funny, welcoming and free of fake endorsements.",
    },
    {
      title: "Nerd Help Desk",
      body: "Turn “I have no idea” into “I get it now.” Celebrate helpful explanations, not price predictions.",
    },
  ],
  prompt: "Participation ideas, not an announced event schedule or promised rewards.",
}

export const galleryCopy = {
  eyebrow: "SAY IT WITH A NERD",
  heading: "One nerd. Twelve moods.",
  body: "Download the original 12 reaction stickers for your chats. Three bonus illustrations add building, medal overload and rocket-ready energy.",
  view: "View sticker",
  description: "Transparent artwork, ready for light or dark chat backgrounds.",
  download512: "Download 512 PNG",
  download1024: "Download 1024 PNG",
  close: "Close sticker preview",
  pack: "Download 12-Sticker Pack",
  empty: "No reactions in this filter. Try All.",
  downloadFailure: "Download unavailable. Try opening the image directly.",
  imageFailure: "Artwork unavailable.",
  bonusTag: "Bonus",
  showing: (count: number) => `Showing ${count} reactions.`,
}

export const awards = {
  eyebrow: "THE ELONERD AWARDS",
  heading: "Your tiny victory deserves a giant medal.",
  body: "No judges. No prizes. Just a good excuse to celebrate a small win.",
  categories: [
    {
      id: "printer",
      title: "Printer Whisperer",
      body: "For making the printer cooperate at last.",
      alt: "Elonerd celebrates getting a printer working.",
      png: "assets/elonerd/website/elonerd-award-printer-transparent.png",
      webp: "assets/elonerd/website/optimized/elonerd-award-printer-transparent.webp",
    },
    {
      id: "side",
      title: "Side-Project Finisher",
      body: "For shipping the thing instead of only talking about it.",
      alt: "Elonerd proudly presents a laptop project.",
      png: "assets/elonerd/website/elonerd-award-side-project-transparent.png",
      webp: "assets/elonerd/website/optimized/elonerd-award-side-project-transparent.webp",
    },
    {
      id: "help",
      title: "Helpful Human",
      body: "For making someone's day a little easier.",
      alt: "Elonerd offers a screwdriver and a helping hand.",
      png: "assets/elonerd/website/elonerd-award-helping-transparent.png",
      webp: "assets/elonerd/website/optimized/elonerd-award-helping-transparent.webp",
    },
  ],
  primary: "Make My Medal Card",
}

export const maker = {
  title: "What did you conquer today?",
  nameLabel: "Name or nickname (optional)",
  namePlaceholder: "A proud nerd",
  nameHelper: "Up to 30 characters. You can leave this blank.",
  victoryLabel: "Your tiny victory",
  victoryPlaceholder: "Finally fixed the printer.",
  victoryHelper: "Up to 80 characters. Keep private information out of your card.",
  categoryLabel: "Medal category",
  generate: "Preview My Card",
  resultTitle: "Certified tiny victory.",
  brand: "Elonerd · $ELONERD",
  smallPrint: "Just for fun. Independent meme project.",
  download: "Download Card",
  share: "Share Card",
  edit: "Edit My Card",
  reset: "Start Over",
  loading: "Creating your card…",
  success: "Your card is ready.",
  failure: "Could not create the image. Try again or take a screenshot of the preview.",
  shareFallback: "Sharing is not supported here. Download the card instead.",
  privacy: "The card is made in your browser. We do not send your text anywhere. Nothing is posted automatically.",
  staticAlternative: "You can download a blank medal-card template and add your own caption.",
  blank: "Download Blank Card",
  sharingInstruction: "Share it yourself when you are ready. Do not include personal details you would not want public.",
  filename: "elonerd-tiny-victory.png",
  blankPath: "assets/elonerd/website/elonerd-medal-card-template-1200x630.png",
}

export const footer = {
  brand: "Elonerd · $ELONERD",
  tagline: "Big medal. Bigger nerd.",
  resources: "Resources",
  explore: "Explore",
  social: "Social",
  story: "Story",
  howToBuy: "How to Buy",
  stickers: "Reaction Stickers",
  maker: "Medal Maker",
  x: "X",
  telegram: "Telegram",
  xPending: "X link pending",
  telegramPending: "Telegram link pending",
}

export const notFound = {
  heading: "Page not found.",
  action: "Back to Home",
}
