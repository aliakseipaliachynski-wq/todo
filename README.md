# Todo List Application

A fullstack Todo List application built with Next.js 16+, React 19.2+, TypeScript, and TailwindCSS. It follows Clean Architecture and Feature-Sliced Design.

## Features

- **CRUD operations**: Create, read, update, and delete tasks
- **Tabs**: Filter by All Tasks, Active, or Completed
- **Search**: Find tasks by title (client-side, debounced)
- **User identification**: Unique userId generated on first visit and stored in localStorage
- **Accessibility**: Semantic HTML, ARIA attributes, keyboard navigation

## Requirements

- Node.js 20.9+ (required for Next.js 16)
- npm 9+

## Installation

```bash
npm install
```

## Running the Project

- **Development** (Turbopack is default in Next.js 16):
  ```bash
  npm run dev
  ```
  Open [http://localhost:3000](http://localhost:3000).

- **Production build**:
  ```bash
  npm run build
  npm start
  ```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server (Turbopack) |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Run ESLint with auto-fix |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check formatting |
| `npm run type-check` | TypeScript check (no emit) |
| `npm run test` | Run unit/integration tests (Jest) |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run test:e2e` | Run E2E tests (Playwright) |
| `npm run prepare` | Install Husky hooks (runs after npm install) |

## Project Structure

```
src/
├── app/              # Next.js App Router (pages, API routes, layout)
├── entities/         # Domain entities (Todo, validation)
├── features/         # Feature modules (create-todo, update-todo, filter-todos)
├── shared/           # Shared UI, API client, hooks, lib
├── widgets/          # Composite UI (TodoListWidget)
└── providers/        # React context (User, QueryClient)
```

See [ARCHITECTURE.md](ARCHITECTURE.md) for details.

## Documentation

- [ARCHITECTURE.md](ARCHITECTURE.md) – Architecture overview and layer diagram
- [DEVELOPMENT.md](DEVELOPMENT.md) – Development workflow and standards
- [TESTING.md](TESTING.md) – Testing strategy and how to run tests
- [API.md](API.md) – REST API reference

## License

Private.
