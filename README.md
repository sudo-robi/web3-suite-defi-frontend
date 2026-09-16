# Web3 Suite — DeFi Frontend

> Modern React + Vite + Tailwind frontend for token swaps, liquidity management, and lending on the Stellar network with Freighter wallet integration.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Issues](https://img.shields.io/github/issues/sudo-robi/web3-suite-defi-frontend)](https://github.com/sudo-robi/web3-suite-defi-frontend/issues)
[![Stars](https://img.shields.io/github/stars/sudo-robi/web3-suite-defi-frontend)](https://github.com/sudo-robi/web3-suite-defi-frontend/stargazers)

---

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running](#running)
- [Building](#building)
- [Testing](#testing)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

**Web3 Suite DeFi Frontend** is a single-page React application providing a polished, responsive interface for interacting with Stellar/Soroban DeFi protocols. It supports token swaps via constant-product AMM, concentrated liquidity position management, and decentralized lending/borrowing — all with native Freighter wallet integration.

### Why This Exists

DeFi protocols need accessible, trustworthy frontends. This application provides a clean, dark-themed UI that makes complex DeFi operations (swaps, liquidity provision, lending) intuitive for both new and experienced Stellar users. It integrates directly with Freighter for seamless wallet signing.

### Target Audience

- **Stellar users** looking to swap tokens or provide liquidity
- **DeFi liquidity providers** managing concentrated positions
- **Borrowers** accessing decentralized lending against collateral
- **Developers** building on Stellar/Soroban DeFi primitives

---

## Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                        Browser Runtime                           │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │                  React Application                       │    │
│  │                                                          │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐              │    │
│  │  │   Swap    │  │ Liquidity│  │ Lending  │  Pages       │    │
│  │  └────┬─────┘  └────┬─────┘  └────┬─────┘              │    │
│  │       │              │             │                     │    │
│  │  ┌────▼──────────────▼─────────────▼─────┐              │    │
│  │  │              Components                │              │    │
│  │  │  Header · Navbar · TokenInput ·        │              │    │
│  │  │  WalletButton                          │              │    │
│  │  └────────────────┬──────────────────────┘              │    │
│  │                   │                                      │    │
│  │  ┌────────────────▼──────────────────────┐              │    │
│  │  │               Hooks                    │              │    │
│  │  │  useSwapQuote · useLendingRates ·     │              │    │
│  │  │  useWallet                             │              │    │
│  │  └────────────────┬──────────────────────┘              │    │
│  │                   │                                      │    │
│  │  ┌────────────────▼──────────────────────┐              │    │
│  │  │            API Service                 │              │    │
│  │  │  swapApi · lendingApi · apiGet/apiPost │              │    │
│  │  └────────────────┬──────────────────────┘              │    │
│  │                   │                                      │    │
│  └───────────────────┼──────────────────────────────────────┘    │
│                      │                                           │
│  ┌───────────────────▼──────────────────────────────────────┐    │
│  │              Freighter Wallet Extension                   │    │
│  │  connect() · getAddress() · signTransaction()            │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                  │
├──────────────────────────────────────────────────────────────────┤
│  HTTP Proxy (Vite dev) / API URL (production)                    │
│  /api/* → http://localhost:3001                                  │
└─────────────────────┬────────────────────────────────────────────┘
                      │
                      ▼
┌──────────────────────────────────────────────────────────────────┐
│                Backend API (Express/TypeScript)                  │
│                http://localhost:3001                              │
└──────────────────────────────────────────────────────────────────┘
```

### Component Hierarchy

```
App
├── Header
│   ├── Logo (Link to /)
│   ├── Nav Items (Swap, Liquidity, Lending)
│   └── WalletButton
│       ├── Connect (Freighter)
│       ├── Connected (Address + Disconnect)
│       └── Loading State
│
├── Routes
│   ├── /swap → Swap
│   │   ├── TokenInput (from)
│   │   ├── TokenInput (to)
│   │   ├── SlippageSettings
│   │   ├── QuoteDetails
│   │   └── PoolInfo
│   │
│   ├── /liquidity → Liquidity
│   │   ├── Stats Cards (TVL, Fees, Positions)
│   │   ├── PositionsList
│   │   └── AddLiquidityForm
│   │
│   └── /lending → Lending
│       ├── RateCards (Supply APY, Borrow APY, Utilization)
│       ├── SupplyPanel
│       └── BorrowPanel
│
└── Footer
```

---

## Features

1. **Freighter Wallet Integration** — Connect/disconnect with Freighter browser extension
2. **Token Swap Interface** — Swap tokens via constant-product AMM with real-time quotes
3. **Slippage Settings** — Configurable slippage tolerance (0.1%, 0.5%, 1.0%)
4. **Price Impact Display** — Color-coded price impact warnings (green/red)
5. **Minimum Received** — Calculated minimum output based on slippage
6. **Token Selection Dropdown** — Switch between XLM, USDC, BTC, ETH with one click
7. **Concentrated Liquidity** — Add liquidity within specific tick ranges
8. **Position Management** — View and manage existing LP positions
9. **TVL & Fee Dashboard** — Total Value Locked and fees earned at a glance
10. **Lending Dashboard** — Supply APY, Borrow APY, and utilization rates
11. **Supply/Borrow Tabs** — Toggle between supply and borrow interfaces
12. **Health Factor Display** — Real-time health factor with infinity for no borrows
13. **Collateral Warning** — Visual alerts for collateral factor and liquidation thresholds
14. **Responsive Design** — Mobile-first layout with desktop navigation
15. **Dark Theme** — Custom dark UI with Stellar brand colors and glow effects

---

## Screenshots

> **Note**: Screenshots are conceptual. Run `npm run dev` to see the live application.

### Swap Page
- Two-sided token input with dropdown selection
- Real-time quote with price impact and fee display
- Slippage settings panel
- Pool information card

### Liquidity Page
- TVL, fees earned, and position count stats
- Position cards with token pair, fee tier, and value
- Add liquidity form with token pair, amounts, and tick range

### Lending Page
- Rate cards showing Supply APY, Borrow APY, and Utilization
- Supply panel with asset selection and amount input
- Borrow panel with collateral and borrow amount fields
- Health factor and interest tracking

---

## Tech Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| UI Framework | React | 18.2.0 | Component-based UI |
| Build Tool | Vite | 5.0.11 | Fast development and production builds |
| Language | TypeScript | 5.3.3 | Type-safe JavaScript |
| Routing | React Router | 6.21.1 | Client-side SPA routing |
| Styling | Tailwind CSS | 3.4.1 | Utility-first CSS framework |
| CSS Processing | PostCSS | 8.4.33 | CSS transformation pipeline |
| Autoprefixer | autoprefixer | 10.4.16 | CSS vendor prefixing |
| Wallet | @stellar/freighter-api | 3.0.0 | Freighter wallet browser extension API |
| Stellar SDK | @stellar/stellar-sdk | 12.0.0 | Stellar network types and utilities |
| Icons | lucide-react | 0.303.0 | Beautiful, consistent icon set |
| Classnames | clsx | 2.1.0 | Conditional CSS class joining |
| Plugin | @vitejs/plugin-react | 4.2.1 | Vite React support with Fast Refresh |
| Linting | ESLint | 8.56.0 | Code quality enforcement |
| Formatting | Prettier | 3.2.2 | Code formatting |

---

## Project Structure

```
web3-suite-defi-frontend/
├── index.html                              # HTML entry point (loads /src/main.tsx)
├── package.json                            # Dependencies and scripts
├── postcss.config.js                       # PostCSS config (Tailwind + Autoprefixer)
├── tsconfig.json                           # TypeScript configuration
├── vite.config.ts                          # Vite config with API proxy
├── LICENSE                                 # MIT License
│
└── src/
    ├── main.tsx                            # React root render with BrowserRouter
    ├── App.tsx                             # Route definitions and layout
    ├── index.css                           # Tailwind directives + custom components
    ├── vite-env.d.ts                       # Vite client type definitions
    │
    ├── components/
    │   ├── Header.tsx                      # Top nav bar with wallet connection
    │   ├── Navbar.tsx                      # Navigation component (alternative)
    │   ├── WalletButton.tsx                # Wallet connect/disconnect button
    │   └── TokenInput.tsx                  # Reusable token amount input with dropdown
    │
    ├── pages/
    │   ├── Swap.tsx                        # Token swap page (active)
    │   ├── SwapPage.tsx                    # Token swap page (alternate)
    │   ├── Liquidity.tsx                   # Liquidity pools page (active)
    │   ├── LiquidityPage.tsx               # Liquidity pools page (alternate)
    │   ├── Lending.tsx                     # Lending/borrowing page (active)
    │   └── LendingPage.tsx                 # Lending/borrowing page (alternate)
    │
    ├── hooks/
    │   ├── useSwapQuote.ts                 # Swap quote fetching with loading/error
    │   ├── useLendingRates.ts              # Lending rates polling (30s interval)
    │   └── useWallet.ts                    # Freighter wallet state management
    │
    └── services/
        └── api.ts                          # HTTP client (apiGet, apiPost, swapApi, lendingApi)
```

---

## Getting Started

### Prerequisites

- **Node.js** >= 20.0.0
- **npm** or **yarn**
- **Freighter browser extension** (for wallet interaction)
- **Backend API running** on `http://localhost:3001`

### Installation

```bash
# Clone the repository
git clone https://github.com/sudo-robi/web3-suite-defi-frontend.git
cd web3-suite-defi-frontend

# Install dependencies
npm install
```

### Configuration

1. Copy and configure environment:

```bash
# The default config proxies /api to localhost:3001
# For production, set VITE_API_URL in .env
```

2. Ensure the backend is running:

```bash
# In the backend directory
cd ../backend
npm install && npm run dev
```

### Running

```bash
# Development server (port 5173)
npm run dev

# Open in browser
open http://localhost:5173
```

The Vite dev server proxies `/api/*` requests to `http://localhost:3001` automatically.

### Building

```bash
# Type check
npm run typecheck

# Production build
npm run build

# Preview production build
npm run preview
```

Output goes to `dist/` directory.

### Testing

```bash
# Lint
npm run lint

# Lint with auto-fix
npm run lint:fix

# Format code
npm run format

# Type check
npm run typecheck
```

---

## Environment Variables

| Variable | Type | Default | Required | Description |
|----------|------|---------|----------|-------------|
| `VITE_API_URL` | `string` | `""` (empty) | No | Backend API base URL. Empty string uses Vite proxy in dev. |

### Vite Proxy Configuration

In development, Vite proxies API requests:

```typescript
// vite.config.ts
server: {
  port: 5173,
  proxy: {
    "/api": {
      target: "http://localhost:3001",
      changeOrigin: true,
    },
  },
},
```

### Supported Tokens

The frontend ships with these default token configurations:

| Symbol | Name | Address |
|--------|------|---------|
| XLM | Stellar Lumens | `CAS3J7HYLGSEL2VK4LW25QW2YMOHQYDWGD6Y6QSEZ3OZCNR6ESY5CCCP` |
| USDC | USD Coin | `CB6CH2QSS6FNEBNSNKRMZ2NC2RYQKQ3K5VMWQV4ZVD4YKPP3KQXSQAIS` |
| BTC | Wrapped Bitcoin | `GBTG2POJVVSRBQSZVA3IYJEZJQLPTIVVYOYRLTZEAEFBM67E2UPHOJ7A` |
| ETH | Wrapped Ether | `CAMMBLPKUOY5VTBLI7ELBXS54IS7VAZF4UO3UFE5LMTYQCDJELKRCRJ4` |

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

### Branch Naming

| Type | Pattern | Example |
|------|---------|---------|
| Feature | `feat/<description>` | `feat/add-price-chart` |
| Bug Fix | `fix/<description>` | `fix/wallet-disconnect-state` |
| Refactor | `refactor/<description>` | `refactor/extract-token-config` |
| Style | `style/<description>` | `style/improve-mobile-nav` |
| Docs | `docs/<description>` | `docs/api-integration-guide` |

### Commit Conventions

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add slippage settings panel to swap page
fix: prevent wallet reconnection on page reload
style: improve mobile responsive layout for lending page
refactor: extract token list to shared config
docs: add environment setup guide
```

### Code Style

- **TypeScript strict mode** — No implicit `any`
- **Functional components** — Use hooks, no class components
- **Custom hooks** — Extract reusable logic into `hooks/`
- **Tailwind utility classes** — Use existing design system components (`card`, `btn-primary`, `input-field`, etc.)
- **No inline styles** — Use Tailwind classes or custom CSS in `index.css`
- **Named exports** — Use `export function ComponentName()` pattern
- **Props interfaces** — Define TypeScript interfaces for all component props
- **Lucide icons** — Use `lucide-react` for all icons consistently

### Design System

Custom CSS classes available in `index.css`:

| Class | Description |
|-------|-------------|
| `.card` | Rounded card with border, background, and padding |
| `.btn-primary` | Stellar-blue primary action button |
| `.btn-secondary` | Gray secondary action button |
| `.input-field` | Text input with border, focus ring, and styling |
| `.stat-label` | Small gray text for labels |
| `.stat-value` | Mono font, large bold text for values |
| `.glow-green` | Green glow shadow effect |
| `.glow-stellar` | Stellar-blue glow shadow effect |

### Pull Request Process

1. Fork the repository
2. Create a feature branch from `main`
3. Ensure `npm run typecheck` and `npm run lint` pass
4. Test all pages manually in the browser
5. Verify wallet connection works with Freighter
6. Submit PR with screenshots of UI changes

---

## License

MIT License — see [LICENSE](LICENSE) for details.

---

<p align="center">
  <sub>Built with React, Vite, Tailwind CSS & Stellar</sub>
</p>
