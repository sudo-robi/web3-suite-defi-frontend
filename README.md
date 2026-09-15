# Web3 Suite — DeFi Frontend

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Issues](https://img.shields.io/github/issues/web3-suite/defi-frontend)](https://github.com/web3-suite/defi-frontend/issues)
[![Stars](https://img.shields.io/github/stars/web3-suite/defi-frontend)](https://github.com/web3-suite/defi-frontend/stargazers)
[![React](https://img.shields.io/badge/React-18-61dafb)](https://react.dev)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com)

> React-based DeFi interface for Stellar/Soroban — token swaps, liquidity provision, and lending/borrowing with Freighter wallet integration.

---

## Overview

A modern, dark-themed DeFi frontend built with React, Vite, and Tailwind CSS. Connects to the Stellar testnet via Freighter wallet and interacts with Soroban smart contracts through the backend API.

### Features

- **Token Swap** — Real-time quotes, slippage settings, price impact warnings
- **Liquidity Pools** — View pools, add/remove concentrated liquidity positions
- **Lending Dashboard** — Supply assets, borrow against collateral, health factor monitoring
- **Wallet Integration** — Freighter browser extension connection, transaction signing
- **Responsive Design** — Mobile-first, works on all screen sizes
- **Dark Theme** — Custom Stellar/DeFi color palette

---

## Screenshots

```
┌─────────────────────────────────────────────────────────┐
│  [Swap Page]                                            │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  You pay                                         │   │
│  │  ┌──────────────────────┐  ┌──────────────┐    │   │
│  │  │ 0.0                  │  │ XLM        ▼ │    │   │
│  │  └──────────────────────┘  └──────────────┘    │   │
│  │                    ↕                             │   │
│  │  You receive                                     │   │
│  │  ┌──────────────────────┐  ┌──────────────┐    │   │
│  │  │ 0.0                  │  │ USDC       ▼ │    │   │
│  │  └──────────────────────┘  └──────────────┘    │   │
│  │                                                 │   │
│  │  Price Impact: 0.01%    Fee: 0.30%             │   │
│  │                                                 │   │
│  │  ┌─────────────────────────────────────────┐    │   │
│  │  │              Swap                       │    │   │
│  │  └─────────────────────────────────────────┘    │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | React 18 |
| Build Tool | Vite 5 |
| Language | TypeScript 5.3 |
| Styling | Tailwind CSS 3.4 |
| Routing | React Router 6 |
| Wallet | Freighter API 3.0 |
| Icons | Lucide React |
| Utilities | clsx |

---

## Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    Browser                                │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │                 React App                           │  │
│  │                                                     │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────────┐ │  │
│  │  │  Pages   │  │Components│  │     Hooks        │ │  │
│  │  │          │  │          │  │                   │ │  │
│  │  │  Swap    │  │  Header  │  │  useWallet       │ │  │
│  │  │  Liq.    │  │  Token   │  │  useSwapQuote    │ │  │
│  │  │  Lend    │  │  Input   │  │  useLendingRates │ │  │
│  │  └────┬─────┘  └──────────┘  └────────┬─────────┘ │  │
│  │       │                                │            │  │
│  │  ┌────▼────────────────────────────────▼─────────┐ │  │
│  │  │              Services Layer                    │ │  │
│  │  │  api.ts  →  fetch("/api/swap/quote")          │ │  │
│  │  └──────────────────┬────────────────────────────┘ │  │
│  └─────────────────────┼──────────────────────────────┘  │
│                        │                                  │
│  ┌─────────────────────▼──────────────────────────────┐  │
│  │              Freighter Extension                     │  │
│  │  signTransaction()  ·  getAddress()  ·  getNetwork()│  │
│  └────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
                        │
              ┌─────────▼─────────┐
              │   Backend API     │
              │   (localhost:3001)│
              └───────────────────┘
```

---

## Project Structure

```
frontend/
├── index.html                      # HTML entry point
├── package.json
├── vite.config.ts                  # Vite configuration + API proxy
├── tailwind.config.js              # Tailwind theme + custom colors
├── postcss.config.js               # PostCSS plugins
├── tsconfig.json                   # TypeScript config
├── tsconfig.node.json              # Vite/node TS config
├── src/
│   ├── main.tsx                    # React root mount
│   ├── App.tsx                     # Router setup
│   ├── index.css                   # Tailwind imports + custom styles
│   ├── vite-env.d.ts               # Vite type definitions
│   ├── pages/
│   │   ├── Swap.tsx                # Token swap interface
│   │   ├── Liquidity.tsx           # Liquidity pool management
│   │   └── Lending.tsx             # Supply/borrow dashboard
│   ├── components/
│   │   ├── Header.tsx              # Navigation + wallet connect
│   │   └── TokenInput.tsx          # Reusable token amount input
│   ├── hooks/
│   │   ├── useWallet.ts            # Freighter wallet hook
│   │   ├── useSwapQuote.ts         # Swap quote fetching
│   │   └── useLendingRates.ts      # Lending rates fetching
│   └── services/
│       └── api.ts                  # API client functions
├── README.md
├── CONTRIBUTING.md
├── LICENSE
└── .gitignore
```

---

## Setup Instructions

### Prerequisites

- Node.js >= 18.0.0
- npm or pnpm
- Freighter browser extension (Chrome/Firefox/Brave)

### 1. Install Dependencies

```bash
cd frontend/
npm install
```

### 2. Install Freighter

Install the Freighter browser extension from [freighter.app](https://freighter.app):

- [Chrome Web Store](https://chrome.google.com/webstore/detail/freighter/)
- [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/freighter/)
- [Brave Web Store](https://chrome.google.com/webstore/detail/freighter/)

### 3. Start Development Server

```bash
npm run dev
# Frontend runs on http://localhost:5173
```

The Vite dev server proxies `/api/*` requests to the backend at `http://localhost:3001`.

### 4. Production Build

```bash
npm run build
npm run preview
```

---

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_URL` | `""` (relative) | Backend API base URL |

---

## Pages

### Swap (`/swap`)

Token swap interface with:

- Token selection dropdown (XLM, USDC, BTC, ETH)
- Amount input with real-time quote
- Swap direction toggle (A→B / B→A)
- Price impact and fee display
- Slippage settings

### Liquidity (`/liquidity`)

Liquidity pool management:

- Pool list with TVL and fee tiers
- Add liquidity form (token pair, amounts, tick range)
- Remove liquidity form
- Position tracking with fee earnings

### Lending (`/lending`)

Lending/borrowing dashboard:

- Supply APY, Borrow APY, Utilization rate cards
- Supply panel — deposit assets, view position
- Borrow panel — deposit collateral, borrow amount, health factor
- Position overview — deposited, borrowed, interest, health

---

## Components

### Header

Navigation bar with:

- Logo and project name
- Page navigation (Swap, Liquidity, Lending)
- Wallet connect/disconnect button
- Active page highlighting

### TokenInput

Reusable token amount input:

- Numeric input with decimal support
- Token selection dropdown
- Balance display
- Max button

---

## Hooks

### useWallet

```typescript
const { isConnected, address, network, isLoading, error, connect, disconnect, signTransaction } = useWallet();
```

| Property | Type | Description |
|----------|------|-------------|
| `isConnected` | `boolean` | Wallet connected state |
| `address` | `string \| null` | Connected public key |
| `network` | `string \| null` | Current network (TESTNET/MAINNET) |
| `isLoading` | `boolean` | Connection in progress |
| `error` | `string \| null` | Error message |
| `connect` | `() => Promise<void>` | Connect wallet |
| `disconnect` | `() => void` | Disconnect wallet |
| `signTransaction` | `(xdr: string) => Promise<string \| null>` | Sign XDR |

### useSwapQuote

```typescript
const { quote, isLoading, error, fetchQuote } = useSwapQuote();
```

### useLendingRates

```typescript
const { rates, isLoading, error, refetch } = useLendingRates();
```

---

## Styling

### Custom Colors

The theme extends Tailwind with Stellar-branded colors:

```javascript
colors: {
  stellar: { 50-950 },  // Stellar blue palette
  defi: {
    green: "#00d4aa",   // Positive/success
    red: "#ff4757",     // Negative/danger
    yellow: "#ffc048",  // Warning
    purple: "#a855f7",  // Accent
  }
}
```

### Component Classes

Reusable utility classes defined in `index.css`:

| Class | Description |
|-------|-------------|
| `.card` | Rounded card with border and blur |
| `.btn-primary` | Primary action button |
| `.btn-secondary` | Secondary action button |
| `.input-field` | Form input field |
| `.stat-label` | Small gray label |
| `.stat-value` | Large mono value |
| `.glow-green` | Green glow shadow |
| `.glow-stellar` | Blue glow shadow |

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Write tests for new components
4. Ensure type safety: `npm run typecheck`
5. Lint: `npm run lint`
6. Format: `npm run format`
7. Submit a pull request

### Code Standards

- Use functional components with hooks
- All components must be TypeScript
- Use Tailwind utility classes — no inline styles
- Extract reusable logic into hooks
- Keep components under 200 lines
- Props must be typed with interfaces

---

## License

MIT License — see [LICENSE](LICENSE) for details.
