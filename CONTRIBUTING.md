# Contributing

Thanks for your interest in contributing. This document explains how to get set up and follow the project’s workflow and standards.

## Getting Started

1. **Requirements**: Node.js 20.9+ and npm 9+ (see [README.md](./README.md)).
2. **Install**:
   ```bash
   npm install
   ```
3. **Run the app**: `npm run dev` → [http://localhost:3000](http://localhost:3000).

Pre-commit hooks (Husky) run after `npm install`. They format and lint changed files, run related tests, and type-check. See [docs/DEVELOPMENT.md](./docs/DEVELOPMENT.md) for full setup and troubleshooting.

## How to Contribute

1. **Branch**: Create a feature branch from `main`.
2. **Develop**: Follow TDD when adding logic—write tests first, then implementation.
3. **Check before committing**:
   ```bash
   npm run type-check
   npm run lint
   npm run test
   ```
4. **Commit**: Use clear commit messages. Pre-commit will run Prettier, ESLint, Jest (for changed files), and TypeScript check.
5. **Open a PR**: Push your branch and open a pull request. Ensure any CI checks pass.

## Code Standards

- **TypeScript**: Strict mode; no `any`; explicit return types on public functions.
- **Naming**: Clear, intent-revealing names. Avoid generic names like `data`, `utils`, `handleStuff`.
- **Structure**: One main responsibility per file. Prefer composition over large components.
- **Comments**: Explain _why_ for non-obvious logic; use JSDoc for public APIs.
- **Architecture**: UI only renders; business logic lives in hooks/domain. No fetch in components—use the shared API layer. See [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md).

## Adding a New Feature

1. **Domain**: Add or extend types in `entities/` and validation if needed.
2. **Infrastructure**: Add API route and/or repository method if needed.
3. **Application**: Add or extend hooks (e.g. in `shared/hooks/`) and wire the API client.
4. **UI**: Add the feature under `features/<feature-name>/` and optionally a widget in `widgets/`.
5. **Tests**: Unit tests for domain and repository; component tests for UI; E2E for critical flows.
6. **Docs**: Update README or ARCHITECTURE if the change affects structure or behavior. Add a short README in the feature folder if it helps.

## Documentation

- [README.md](./README.md) – Setup and scripts
- [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) – Architecture and layers
- [docs/DEVELOPMENT.md](./docs/DEVELOPMENT.md) – Development workflow and standards
- [docs/TESTING.md](./docs/TESTING.md) – Testing strategy
- [docs/API.md](./docs/API.md) – REST API reference

## Questions

If something is unclear, open an issue or ask in your PR. We aim for new contributors to understand a feature in under 10 minutes.
