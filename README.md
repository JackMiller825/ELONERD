# Elonerd

Independent Ethereum meme project site for Elonerd (`$ELONERD`). The mascot and rocket medal are fictional. The site does not claim a launch, contract, supply, tax, liquidity, ownership, or official social account until those facts are entered in `src/config/project.ts`.

## Setup

```bash
npm ci
npm run dev -- --host 0.0.0.0
```

Other commands:

```bash
npm run typecheck
npm run lint
npm test
npm run build
npm run preview -- --host 0.0.0.0
```

Production output is `dist/`. The build typechecks, bundles with Vite, then writes `dist/token/index.html`, `dist/community/index.html`, and `dist/404.html`.

## Public assets

Production files from `branding/`, `website/`, and `social/` are served from `/assets/elonerd/…`, matching the archive-relative path. Display images use the supplied WebP files where they exist. Sticker downloads use the original PNG paths, and the 12-sticker pack is `website/downloads/elonerd-12-stickers.zip`.

Design inputs stay outside `public/`. Locally they are linked at `design-inputs/elonerd` (gitignored). The source archive is too large for GitHub’s file limit.

## Configuration

All token facts and official destinations live in `src/config/project.ts`. Unknown values are `null`. The site prints **Not confirmed** for missing facts and keeps contract, swap, chart, explorer, X, and Telegram controls inactive until a safe `https` URL is set and the matching verified flag is true. A contract copy control also requires a `0x` + 40 hex address and `contractVerified: true`.

Confirmed for this deployment:

- `links.website`: `https://elonerd.site`
- `hostingPlatform`: `GitHub Pages`

Still null or false: launch status, contract address, supply, buy/sell tax, liquidity, ownership, tokenomics, X, Telegram, swap, chart, and explorer.

## Hosting

GitHub Pages serves this repository from the `main` branch through `.github/workflows/pages.yml`. The publish directory is `dist/`. `public/CNAME` contains `elonerd.site`, so the custom domain is included in the Pages artifact.

GitHub Pages uses directory indexes for `/token/` and `/community/`. `404.html` is the app shell for unknown paths, and the client router normalizes trailing slashes. Asset requests are real files, not HTML fallbacks.

Pushing to `main` runs the Pages workflow. The live site updates after that workflow finishes.
