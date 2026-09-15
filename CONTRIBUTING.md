# Contributing to web3-suite-defi-frontend

Thank you for your interest in contributing!

## Development Setup

### Prerequisites

- [Node.js](https://nodejs.org/) v20+
- [pnpm](https://pnpm.io/)
- Git

### Getting Started

```bash
git clone https://github.com/sudo-robi/web3-suite-defi-frontend.git
cd web3-suite-defi-frontend
pnpm install
pnpm dev
```

## Architecture

React + TypeScript + Vite with Tailwind CSS for styling and `@stellar/stellar-sdk` for wallet integration.

### Adding a New Page

1. Create a component in `src/components/`
2. Create a page in `src/pages/`
3. Add route in `src/App.tsx`
4. Add any hooks in `src/hooks/`

### Code Style

- TypeScript strict mode
- Functional components only (no class components)
- Hooks for state management
- Tailwind CSS for styling (no CSS modules)
- Named exports

```bash
pnpm lint
pnpm format
pnpm typecheck
```

## Pull Request Process

1. Fork and create a feature branch
2. Make changes
3. Run `pnpm lint && pnpm typecheck && pnpm build`
4. Submit PR

### Commit Messages

- `feat: add swap input form`
- `fix: correct balance display`
- `docs: update README`
- `style: improve button hover states`

## License

MIT
