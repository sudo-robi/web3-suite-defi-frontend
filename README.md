<div align="center">

# web3-suite-defi-frontend

**React frontend for Stellar/Soroban DeFi operations**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18-61DAFB.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5-purple.svg)](https://vitejs.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.4-06B6D4.svg)](https://tailwindcss.com/)

</div>

---

## Overview

A modern, responsive React frontend for interacting with DeFi smart contracts on the Stellar network. Features wallet integration via Freighter, real-time swap quotes, liquidity pool management, and lending dashboards.

### Features

- **Token Swaps** — Swap tokens with real-time quotes and slippage protection
- **Liquidity Pools** — Manage concentrated liquidity positions across multiple fee tiers
- **Lending Dashboard** — Supply assets, borrow against collateral, monitor health factors
- **Wallet Integration** — Connect via Freighter browser extension
- **Responsive Design** — Works on desktop, tablet, and mobile
- **Dark Theme** — Stellar-branded dark UI with glowing accents

---

## Screenshots

> _Screenshots will be added after initial deployment_

| Swap | Liquidity | Lending |
|------|-----------|---------|
| ![Swap](docs/screenshots/swap.png) | ![Liquidity](docs/screenshots/liquidity.png) | ![Lending](docs/screenshots/lending.png) |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 18 |
| Language | TypeScript 5.3 |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS 3.4 |
| Routing | React Router 6 |
| Wallet | Freighter API |
| Blockchain | @stellar/stellar-sdk |
| Icons | Lucide React |
| Utilities | clsx |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                           Browser                                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │                        Vite + React                             │  │
│  │  ─────────────────────────────────────────────────────────── │  │
│  │                                                                │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐  │  │
│  │  │   App     │  │  Navbar   │  │ Wallet   │  │    Routes    │  │  │
│  │  │  Router   │  │          │  │  Button  │  │  /swap       │  │  │
│  │  └──────────┘  └──────────┘  └──────────┘  │  /liquidity   │  │  │
│  │                                              │  /lending     │  │  │
│  │  ┌────────────────────────────────────────┐  └──────────────┘  │  │
│  │  │              Pages                      │                    │  │
│  │  │  ──────────────────────────────────── │                    │  │
│  │  │  SwapPage  │ LiquidityPage │ LendingPage                  │  │
│  │  └────────────────────────────────────────┘                    │  │
│  │              │                                                   │  │
│  │              ▼                                                   │  │
│  │  ┌────────────────────────────────────────────────────────────┐ │  │
│  │  │                   Hooks + Services                         │ │  │
│  │  │  ──────────────────────────────────────────────────────── │ │  │
│  │  │  useWallet()    │ useSwapQuote()    │ useLendingRates()   │ │  │
│  │  │  swapApi        │ lendingApi        │ apiGet/apiPost      │ │  │
│  │  └────────────────────────────────────────────────────────────┘ │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                                                                      │
│                           │ HTTP / REST                              │
│                           ▼                                          │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │              Backend API (web3-suite-defi-backend)              │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                                                                      │
│                           │ Soroban RPC                              │
│                           ▼                                          │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │                 Stellar / Soroban Network                       │  │
│  └────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

### Project Structure

```
web3-suite-defi-frontend/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── README.md
├── LICENSE
├── CONTRIBUTING.md
├── .gitignore
└── src/
    ├── main.tsx               # React entry point
    ├── App.tsx                 # Root component with routing
    ├── index.css               # Tailwind base + custom utilities
    ├── vite-env.d.ts           # Vite type definitions
    ├── components/
    │   ├── Navbar.tsx          # Navigation bar with links
    │   └── WalletButton.tsx    # Freighter wallet connect/disconnect
    ├── pages/
    │   ├── SwapPage.tsx        # Token swap interface
    │   ├── LiquidityPage.tsx   # Liquidity pool dashboard
    │   └── LendingPage.tsx     # Lending supply/borrow dashboard
    ├── hooks/
    │   ├── useWallet.ts        # Freighter wallet state management
    │   ├── useSwapQuote.ts     # Real-time swap quote fetching
    │   └── useLendingRates.ts  # Lending rate polling
    └── services/
        └── api.ts              # Backend API client functions
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v20+
- [pnpm](https://pnpm.io/)
- [Freighter](https://freighter.app/) browser extension (for wallet)

### Installation

```bash
# Clone
git clone https://github.com/sudo-robi/web3-suite-defi-frontend.git
cd web3-suite-defi-frontend

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Configuration

Create a `.env` file:

```env
# Backend API URL (for local development, Vite proxy handles this)
VITE_API_URL=
```

### Build

```bash
# Production build
pnpm build

# Preview production build
pnpm preview
```

---

## Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start Vite dev server with HMR |
| `pnpm build` | TypeScript compile + Vite production build |
| `pnpm preview` | Preview production build locally |
| `pnpm lint` | ESLint check |
| `pnpm lint:fix` | ESLint auto-fix |
| `pnpm format` | Format with Prettier |
| `pnpm typecheck` | Type-check without emitting |

---

## Pages

### Swap (`/swap`)
- Select input/output tokens
- Enter swap amount
- Real-time quote with price impact and fee display
- Slippage protection via `minAmountOut`
- Execute swap via Freighter signing

### Liquidity (`/liquidity`)
- View TVL, fees earned, active positions
- Add liquidity with tick range selection
- Manage existing positions (add/remove)
- Fee tier overview

### Lending (`/lending`)
- Supply assets and earn interest
- Borrow against collateral
- View utilization rate and APYs
- Health factor monitoring
- Collateral factor and liquidation info

---

## Customization

### Theme

Edit `tailwind.config.js` to customize colors:

```js
theme: {
  extend: {
    colors: {
      stellar: { /* Stellar brand blues */ },
      defi: { /* Action colors: green, red, yellow, purple */ },
    },
  },
},
```

### API Proxy

The Vite dev server proxies `/api` requests to `http://localhost:3001`. Edit `vite.config.ts` to change the target.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## License

MIT License — see [LICENSE](LICENSE) for details.

---

## Acknowledgments

- [Stellar Development Foundation](https://stellar.org)
- [Freighter](https://freighter.app) for wallet integration
- [Tailwind CSS](https://tailwindcss.com) for styling
- [Lucide](https://lucide.dev) for icons
