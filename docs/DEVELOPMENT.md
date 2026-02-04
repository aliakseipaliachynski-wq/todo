# Development Guide

## Environment Setup

1. **Node.js**: Use 18+ (LTS recommended).
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Husky**: Pre-commit hooks are installed via `npm run prepare` (runs after `npm install`). They run lint-staged (Prettier, ESLint, Jest for changed files) and `npm run type-check`.

## Development Workflow

1. Create a feature branch from `main`.
2. Implement following TDD when adding logic: write tests first, then implementation.
3. Keep components and hooks small; put business logic in domain/application layers.
4. Run before committing:
   ```bash
   npm run type-check
   npm run lint
   npm run test
   ```

## Coding Standards

- **TypeScript**: Strict mode; no `any`; explicit return types on public functions.
- **Naming**: Clear names; avoid generic names like `data`, `utils`, `handleStuff`.
- **Files**: One main responsibility per file; prefer composition over large “god” components.
- **Comments**: Explain “why” for non-obvious logic; use JSDoc for public APIs.

## Git Workflow

- Commit often with clear messages.
- Pre-commit runs:
  - Prettier (format)
  - ESLint (fix)
  - Jest for changed files
  - TypeScript check
- Push and open a PR; ensure CI (if any) passes.

## Adding a New Feature

1. **Domain**: Add or extend types in `entities/` and validation if needed.
2. **Infrastructure**: Add API route and/or repository method if needed.
3. **Application**: Add or extend hooks in `shared/hooks/` and wire API client.
4. **UI**: Add feature in `features/<feature-name>/` and optionally a widget in `widgets/`.
5. **Tests**: Unit tests for domain and repository; component tests for UI; E2E for critical flows.
6. **Docs**: Update README or ARCHITECTURE if the change affects structure or behavior.

## Running the App

- Dev: `npm run dev` → http://localhost:3000
- Build: `npm run build && npm start`

## Troubleshooting

- **Port in use**: Change port with `npm run dev -- -p 3001`.
- **Tests fail after refactor**: Run `npm run test -- --watch` and fix failing tests.
- **Type errors**: Run `npm run type-check` and fix reported files.
